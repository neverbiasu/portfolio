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
  nav: {
    home: string;
    blog: string;
    tools: string;
    socials: string;
    about: string;
  };
  // --- Terminal ---
  welcomeHint: string;
  helpIntro: string;
  commandNotFound: (cmd: string) => string;
  commands: {
    help: string;
    whoami: string;
    skills: string;
    projects: string;
    stats: string;
    blog: string;
    tools: string;
    socials: string;
    clear: string;
  };
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
    nav: {
      home: "Home",
      blog: "Blog",
      tools: "Tools",
      socials: "Socials",
      about: "About",
    },
    // --- Terminal ---
    welcomeHint: "Type 'help' to see a list of available commands.",
    helpIntro: "Here are the available commands:",
    commandNotFound: (cmd) => `command not found: ${cmd}`,
    commands: {
      help: "Show this help message",
      whoami: "Display my profile information",
      skills: "List my core technical skills",
      projects: "Show my selected projects",
      stats: "Display my coding statistics (Wakatime)",
      blog: "Read my technical blog",
      tools: "Browse my daily tools and software",
      socials: "View my social links and profiles",
      clear: "Clear the terminal screen",
    },
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
    nav: {
      home: "首页",
      blog: "博客",
      tools: "工具箱",
      socials: "社交",
      about: "关于",
    },
    // --- Terminal ---
    welcomeHint: "输入 'help' 查看可用命令列表.",
    helpIntro: "可用的命令如下:",
    commandNotFound: (cmd) => `找不到命令: ${cmd}`,
    commands: {
      help: "显示此帮助信息",
      whoami: "显示我的个人简介",
      skills: "列出我的核心技术栈",
      projects: "展示我的精选项目",
      stats: "显示我的编程统计 (Wakatime)",
      blog: "阅读我的技术博客",
      tools: "浏览我的日常工具和软件",
      socials: "查看我的社交链接和主页",
      clear: "清空终端屏幕",
    },
  },
};

export const getCopy = (locale: Locale) => copy[locale];
