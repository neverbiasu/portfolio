export type Locale = "en" | "zh";

export type SectionCopy = {
  aboutTitle: string;
  aboutDescription: string;
  skillsLabel: string;
  passionLabel: string;
  collabLabel: string;
  projectsTitle: string;
  projectsSubtitle: string;
  statsTitle: string;
  assistantGreeting: string;
  assistantPlaceholder: string;
  assistantLimit: (remaining: number) => string;
  assistantLimitReached: string;
  assistantError: string;
  assistantEmpty: string;
  assistantSend: string;
  assistantTitle: string;
  languageToggle: string;
};

type CopyMap = Record<Locale, SectionCopy>;

export const copy: CopyMap = {
  en: {
    aboutTitle: "About",
    aboutDescription:
      "Building AI-native interfaces with reliable frontend foundations and composable workflows.",
    skillsLabel: "Core Skills",
    passionLabel: "Focus",
    collabLabel: "Open to collaboration",
    projectsTitle: "Selected Projects",
    projectsSubtitle: "What I have been experimenting with recently",
    statsTitle: "GitHub Activity",
    assistantGreeting: "Hi, I'm neverbiasu's AI. Ask about projects, stack, or collaboration ideas.",
    assistantPlaceholder: "Ask about my work…",
    assistantLimit: (remaining) =>
      remaining > 0
        ? `${remaining} message${remaining === 1 ? "" : "s"} left this session`
        : "No messages left for now",
    assistantLimitReached: "You reached today's message limit. Ping me again later!",
    assistantError: "Something went wrong. Please try again in a moment.",
    assistantEmpty: "No messages yet. Start the conversation!",
    assistantSend: "Send",
    assistantTitle: "AI Assistant",
    languageToggle: "中文",
  },
  zh: {
    aboutTitle: "关于我",
    aboutDescription: "构建 AI 原生界面，结合可靠的前端基座与可组合工作流。",
    skillsLabel: "核心技能",
    passionLabel: "关注领域",
    collabLabel: "开放协作",
    projectsTitle: "精选项目",
    projectsSubtitle: "近期持续打磨的作品",
    statsTitle: "GitHub 活跃度",
    assistantGreeting: "你好，我是 neverbiasu 的 AI 助理，可以聊项目、技术栈或合作想法。",
    assistantPlaceholder: "聊聊我的项目…",
    assistantLimit: (remaining) =>
      remaining > 0 ? `本次对话还剩 ${remaining} 条消息` : "本次对话额度已用完",
    assistantLimitReached: "本次对话额度已用完，稍后再来继续吧。",
    assistantError: "服务暂时不可用，请稍后再试。",
    assistantEmpty: "还没有消息，先打个招呼吧！",
    assistantSend: "发送",
    assistantTitle: "AI 助理",
    languageToggle: "EN",
  },
};

export const getCopy = (locale: Locale) => copy[locale];
