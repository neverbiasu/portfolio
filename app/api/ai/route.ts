import OpenAI from "openai";
import { OpenAIStream, StreamingTextResponse } from "ai";
import type { NextRequest } from "next/server";
// @ts-ignore
import generatedData from "@/src/data/generated.json"; // Direct import for Edge compatibility

export const runtime = "edge";

// ModelScope configuration
const MODELSCOPE_BASE_URL = "https://api-inference.modelscope.cn/v1";
// Using Qwen 2.5 Coder for better technical responses
const MODEL_NAME = "Qwen/Qwen2.5-Coder-32B-Instruct"; 

// Profile Data (Hardcoded for RAG context)
const PROFILE_CONTEXT = `
Name: Faych Chen (neverbiasu)
Role: Student, AI Engineer, Frontend Developer
Bio: Building AI-native interfaces with reliable frontend foundations and composable workflows.
Skills: Vue, Next.js, TypeScript, Python, PyTorch, ComfyUI, LLM Integration.
GitHub: https://github.com/neverbiasu
`;

export async function POST(req: NextRequest) {
  const apiKey = process.env.MODELSCOPE_API_TOKEN;

  if (!apiKey) {
    return new Response(JSON.stringify({ error: "Missing API Key" }), { status: 500 });
  }

  const { messages, locale = 'en' } = await req.json();
  const lastMessage = messages[messages.length - 1]?.content || "";

  // --- Keyword RAG Logic ---
  const query = lastMessage.toLowerCase();
  
  // 1. Find relevant projects based on keywords
  const relevantProjects = generatedData.github.filter((repo: any) => {
    const content = `${repo.name} ${repo.description} ${repo.language}`.toLowerCase();
    // Check if any significant word from query appears in repo content
    // This is a naive keyword match
    return content.includes(query) || (query.length > 3 && query.includes(repo.name.toLowerCase()));
  }).slice(0, 3); // Limit to top 3 relevant

  // 2. Fallback: If no specific match, provide top starred projects
  const contextProjects = relevantProjects.length > 0 
    ? relevantProjects 
    : generatedData.github.sort((a: any, b: any) => b.stargazers_count - a.stargazers_count).slice(0, 3);

  const projectContext = contextProjects.map((p: any) => 
    `- ${p.name} (${p.stargazers_count} stars): ${p.description || "No description"} (Stack: ${p.language})`
  ).join("\n");

  // --- System Prompt Construction ---
  const systemPrompt = `
You are Faych Chen (neverbiasu), the owner of this portfolio website.
Answer the user's questions in first person ("I", "my").
Be professional, friendly, and enthusiastic about technology.
Current Language: ${locale === 'zh' ? 'Chinese (中文)' : 'English'}

## Context
${PROFILE_CONTEXT}

## Relevant Projects
${projectContext}

## Guidelines
- Answer concisely.
- If asked about projects, prioritize the ones in 'Relevant Projects'.
- If the user greets you, say hi using your name Faych.
- If you don't know something, admit it gracefully.
`.trim();

  // --- Native OpenAI Client (bypassing AI SDK wrapper issues) ---
  const openai = new OpenAI({
    apiKey: apiKey,
    baseURL: MODELSCOPE_BASE_URL,
  });

  try {
    const response = await openai.chat.completions.create({
      model: MODEL_NAME,
      stream: true,
      messages: [
        { role: "system", content: systemPrompt },
        ...messages
      ] as any, // Cast to satisfy OpenAI types vs AI SDK types
      temperature: 0.7,
      max_tokens: 500,
    });

    // Create a manual ReadableStream to return raw text
    const encoder = new TextEncoder();
    const readable = new ReadableStream({
      async start(controller) {
        for await (const chunk of response) {
          const content = chunk.choices[0]?.delta?.content || "";
          if (content) {
            controller.enqueue(encoder.encode(content));
          }
        }
        controller.close();
      },
    });

    return new Response(readable, {
      headers: { "Content-Type": "text/plain; charset=utf-8" },
    });
    
  } catch (error) {
    console.error("AI route error:", error);
    return new Response(
      JSON.stringify({ error: "Failed to connect to AI service." }), 
      { status: 502, headers: { "Content-Type": "application/json" } }
    );
  }
}
