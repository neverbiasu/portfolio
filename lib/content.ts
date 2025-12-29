
import type { Locale } from "./i18n";
// @ts-ignore
import generatedData from '../src/data/generated.json';

export type Localized<T = string> = Record<Locale, T>;

export type ProjectLink = {
  label: string;
  href: string;
};

export type Project = {
  title: Localized;
  summary: Localized;
  tech: string[];
  links: ProjectLink[];
  // Dynamic fields from GitHub
  stars?: number;
  forks?: number;
  lastUpdate?: string;
  createdAt?: string;
  language?: string;
  license?: string;
  openIssues?: number;
  size?: number; // in KB
  topics?: string[];
  homepage?: string; // Demo URL
};

export const profile = {
  name: "neverbiasu",
  avatar: "https://avatars.githubusercontent.com/u/90372299?v=4",
  role: {
    en: "AI App / Frontend Engineer",
    zh: "AI App / 前端工程师",
  } as Localized,
  passion: {
    en: "Keep learning and building open-source AI tools.",
    zh: "持续学习并打磨开源 AI 工具。",
  } as Localized,
  description: {
    en: "A student, AI app engineer, ComfyUI developer, and front-end engineer crafting AI-first experiences.",
    zh: "一个学生、AI 应用工程师、ComfyUI 开发者与前端工程师，专注打造 AI 原生体验。",
  } as Localized,
  openToCollab: true,
  skills: ["Vue.js", "Next.js", "TypeScript", "Node.js", "Python", "PyTorch", "ComfyUI"],
};

const staticProjects: Project[] = [
  {
    title: {
      en: "ComfyUI-SAM2",
      zh: "ComfyUI-SAM2 扩展",
    },
    summary: {
      en: "Segment-Anything 2 integration for ComfyUI, bringing high-fidelity region masks and promptable segmentation workflows.",
      zh: "将 Segment-Anything 2 高精度分割能力接入 ComfyUI，支持提示式分割与遮罩工作流。",
    },
    tech: ["Python", "ComfyUI", "Segment Anything 2"],
    links: [
      {
        label: "GitHub",
        href: "https://github.com/neverbiasu/ComfyUI-SAM2",
      },
    ],
  },
  {
    title: {
      en: "ComfyUI-BAGEL",
      zh: "ComfyUI-BAGEL 扩展",
    },
    summary: {
      en: "Unified multimodal BAGEL workflows inside ComfyUI with prompt routing and smart node defaults.",
      zh: "将 BAGEL 多模态模型封装进 ComfyUI，提供提示路由与智能节点默认配置。",
    },
    tech: ["Python", "ComfyUI", "Multimodal"],
    links: [
      {
        label: "GitHub",
        href: "https://github.com/neverbiasu/ComfyUI-BAGEL",
      },
    ],
  },
  {
    title: {
      en: "IELTSDuck",
      zh: "雅鸭 IELTSDuck",
    },
    summary: {
      en: "InternLM2 fine-tuned assistant helping IELTS learners plan essays, check grammar, and simulate scoring.",
      zh: "基于 InternLM2 QLoRA 微调的雅思写作助手，覆盖立意规划、语法校对与智能打分。",
    },
    tech: ["InternLM2", "QLoRA", "AI Tutor"],
    links: [
      {
        label: "GitHub",
        href: "https://github.com/neverbiasu/IELTSDuck",
      },
    ],
  },
  {
    title: {
      en: "Awesome Portrait Style Transfer",
      zh: "人像风格迁移精选",
    },
    summary: {
      en: "Curated reading list tracking the latest portrait style transfer papers and techniques.",
      zh: "持续整理人像风格迁移最新论文与技术的精选列表。",
    },
    tech: ["Research", "Curation", "Style Transfer"],
    links: [
      {
        label: "GitHub",
        href: "https://github.com/neverbiasu/Awesome-Portraits-Style-Transfer",
      },
    ],
  },
  {
    title: {
      en: "ComfyUI Image Captioner",
      zh: "ComfyUI 图像描述节点",
    },
    summary: {
      en: "Inference-ready image captioning workflow node delivering captions for downstream prompt engineering.",
      zh: "面向提示工程的图像描述节点，可直接在 ComfyUI 中生成高质量文本描述。",
    },
    tech: ["Python", "ComfyUI", "Vision"],
    links: [
      {
        label: "GitHub",
        href: "https://github.com/neverbiasu/ComfyUI-Image-Captioner",
      },
    ],
  },
  {
    title: {
      en: "hf-mirror-hub",
      zh: "HF Mirror Hub",
    },
    summary: {
      en: "Command-line tool for mirroring Hugging Face models and datasets through accelerated endpoints.",
      zh: "基于镜像站的 Hugging Face 模型与数据集下载 CLI，加速国内获取。",
    },
    tech: ["Python", "CLI", "Hugging Face"],
    links: [
      {
        label: "GitHub",
        href: "https://github.com/neverbiasu/hf-mirror-hub",
      },
    ],
  },
];

// Augment projects with dynamic data
export const projects = staticProjects.map(project => {
  const githubLink = project.links.find(l => l.href.includes('github.com'));
  if (githubLink) {
    const repoName = githubLink.href.split('/').pop();
    const dynamicRepo = (generatedData as any).github.find((r: any) => r.name === repoName);
    
    if (dynamicRepo) {
      return {
        ...project,
        stars: dynamicRepo.stargazers_count,
        forks: dynamicRepo.forks_count,
        lastUpdate: dynamicRepo.updated_at,
        createdAt: dynamicRepo.created_at,
        language: dynamicRepo.language,
        license: dynamicRepo.license,
        openIssues: dynamicRepo.open_issues_count,
        size: dynamicRepo.size,
        topics: dynamicRepo.topics,
        homepage: dynamicRepo.homepage,
      };
    }
  }
  return project;
});

export const socialLinks = [
  {
    id: "github",
    label: "GitHub",
    href: "https://github.com/neverbiasu",
  },
  {
    id: "codewithgpu",
    label: "Code with GPU",
    href: "https://www.codewithgpu.com/u/fayche",
  },
  {
    id: "modelscope",
    label: "ModelScope",
    href: "https://modelscope.cn/profile/ModelE",
  },
  {
    id: "civitai",
    label: "Civitai",
    href: "https://civitai.com/user/Fetch267",
  },
  {
    id: "openart",
    label: "OpenArt",
    href: "https://openart.ai/workflows/profile/faych",
  },
  {
    id: "linkedin",
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/feichi-chen-968907283/",
  },
] as const;

// Wakatime stats
export const wakatimeStats = (generatedData as any).wakatime || null;

