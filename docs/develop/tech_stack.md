# 技术选型总览

| 模块 | 选型 | 说明 |
| --- | --- | --- |
| 框架 | Next.js 14（App Router） | 面向 Edge，支持 React Server Components 与流式渲染，契合 Vercel 部署 |
| 语言 | TypeScript 5 | 提供强类型保障，利于复杂 UI 与 AI 集成调试 |
| 样式 | Tailwind CSS 3 | 原子化工具库，上手快，便于映射 Catppuccin 主题 |
| 字体 | Inter（正文）、JetBrains Mono（标题/输入） | 通过 `next/font/google` 引入，优化性能 |
| UI 组件 | 自研组件存放于 `components/` | 避免过度依赖组件库，保持定制化风格 |
| 状态管理 | 原生 React Hooks | 页面逻辑轻量，结合服务端组件即可 |
| 国际化 | 自定义语言切换（English/zh-CN） | 使用 `localStorage` 存储偏好，配合词典辅助 |
| 数据获取 | Next.js 路由处理器与 Server Actions | 适用于静态/动态混合场景，便于 AI 代理 |
| 部署 | Vercel | 提供 Edge 托管，CI/CD 集成顺畅 |
| AI 集成 | Vercel AI SDK + Edge Function (`/api/ai`) | 服务端代理隐藏密钥，延迟低 |
| 持久化 | `localStorage`（语言、AI 消息次数） | 无需额外数据库，满足 MVP |
| 测试 | Playwright（E2E）+ Vitest（可选单测） | 以端到端测试为先，后续补充单元测试 |
| 数据分析 | Plausible（规划中） | 注重隐私的分析方案，可按需接入 |
| 代码规范 | ESLint + Prettier | 确保团队一致的代码风格 |
