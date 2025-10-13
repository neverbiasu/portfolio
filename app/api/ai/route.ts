import { createOpenAI } from "@ai-sdk/openai";
import { streamText, type CoreMessage, type LanguageModel } from "ai";
import type { NextRequest } from "next/server";

export const runtime = "edge";

const modelName = process.env.OPENAI_MODEL ?? "gpt-4o-mini";

export async function POST(req: NextRequest) {
  if (!process.env.OPENAI_API_KEY) {
    return new Response(
      JSON.stringify({ error: "Missing OPENAI_API_KEY environment variable." }),
      {
        status: 500,
        headers: { "content-type": "application/json" },
      },
    );
  }

  const { messages, system } = (await req.json()) as {
    messages: CoreMessage[];
    system?: string;
  };

  const openai = createOpenAI({
    apiKey: process.env.OPENAI_API_KEY,
    baseURL: process.env.OPENAI_BASE_URL,
  });

  try {
    const result = await streamText({
      model: openai.chat(modelName) as unknown as LanguageModel,
      messages: messages ?? [],
      system,
      temperature: 0.7,
    });

    return result.toAIStreamResponse();
  } catch (error) {
    console.error("AI route error", error);
    return new Response(
      JSON.stringify({ error: "Unable to reach the upstream AI provider." }),
      {
        status: 502,
        headers: { "content-type": "application/json" },
      },
    );
  }
}
