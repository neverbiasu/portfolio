| **网站** | **FCP(s)** | **性能分** | **SEO分** | **技术栈** | **视觉风格** | **导航结构** | **项目展示方式** | **微交互** | **AI集成** | **是否有博客** | **简历呈现** | **GitHub集成** |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| brittanychiang.com | 1.1 | 96 | 100 | Next.js + Tailwind + Vercel | ["极简", "深色", "技术感"] | 顶部锚点导航 | 卡片 + Archive 列表 | 滚动淡入 + hover高亮 | ❌ | ✅ | 在线页面 | ❌ |
| toukoum.fr | 0.3 | 100 | 100 | Next.js + shadcn/ui | ["动态", "暗色", "会话式"] | 对话入口引导 | 动态组件渲染 | 视差滚动 + 粒子动画 | ✅（疑似mock） | ❌ | 在线文本 | ✅ |
| amankumar.ai | 0.2 | 100 | 100 | Next.js + Tailwind + ShadCN | ["极简", "浅色", "现代"] | 顶部导航 | 卡片列表 | hover渐变 + 滚动显隐 | ❌ | ✅ | PDF下载 | ✅ |
| mohsinraz.me | 0.8 | 98 | 92 | Gatsby + GitHub API | ["简洁", "浅色", "技术感"] | 顶部导航 | 卡片列表 | 悬停高亮 + 数字计数动画 | ❌ | ✅ | 在线页面 | ✅ |
| leerob.io | 0.9 | 100 | 100 | Next.js + Tailwind + Vercel | ["极简", "内容优先"] | 顶部导航 | 卡片/列表 | hover渐变 + 滚动淡入 | ❌ | ✅ | 在线文本 | ❌ |
| mitchellsparrow.com | 1.6 | 98 | 67 | Next.js + Framer Motion + Tailwind + Sanity | ["现代", "动态", "浅色"] | 顶部导航 | 卡片+动画 | 入场缩放 + hover动效 | ❌ | ✅ | 在线页面 | ✅ |

### 1. brittanychiang.com

| 分析维度 | 内容 |
| --- | --- |
| 1. 性能表现 | /no_think |
| 2. 视觉设计 | 页面页脚明确声明 **All text is set in the Inter typeface**；其同时标注站点由 Next.js + Tailwind 构建并部署在 Vercel（属于设计与实现一致性信息的一部分）。 [[brittanychiang.com]](https://brittanychiang.com/) |
| 3. 信息架构 | 顶部主导航包含 **About / Experience / Projects**，为单页式锚点跳转结构；另提供 **Archive** 页面汇总历年项目与所用技术栈。 [[brittanychiang.com]](https://brittanychiang.com/), [[brittanychiang.com]](https://brittanychiang.com/archive) |
| 4. 内容策略 | 站点提供 **Archive**（项目归档）页，按年份列出项目、所属机构与技术栈，并附外链，体现以项目为主的内容策略；文章更新频率 /no_think。 [[brittanychiang.com]](https://brittanychiang.com/archive) |
| 5. 技术实现 | 页脚公开：**Built with Next.js and Tailwind CSS, deployed with Vercel**（可视为当前线上版本的技术栈与部署信息）。早期 v4 迭代为 **Gatsby + Netlify**（历史迭代引述，不代表当前实现）。 [[brittanychiang.com]](https://brittanychiang.com/), [[github.com]](https://github.com/bchiang7/v4) |
| 6. 微交互与动效 | /no_think |
| 7. AI 集成情况 | /no_think |
| 8. GitHub 集成 | /no_think |
| 9. SEO 表现 | 标题与描述 /no_think；**Archive** 页面存在（利于爬虫发现深层内容）；是否提供 `sitemap.xml` 与 `robots.txt` /no_think。 [[brittanychiang.com]](https://brittanychiang.com/archive) |
| 10. 可访问性 | 页内内容自述其在工作中专注 **accessibility**（可访问性），但站点本身的 aria/对比度/键盘操作未经核验。/no_think（理念来源于站点自介）。 [[brittanychiang.com]](https://brittanychiang.com/) |
| 11. 可借鉴点 | （1）**Archive** 全量项目清单含技术栈与外链，便于快速评估能力边界；（2）页脚公开 **技术栈 + 部署 + 字体**，提高透明度与可复制性。 [[brittanychiang.com]](https://brittanychiang.com/archive), [[brittanychiang.com]](https://brittanychiang.com/) |
| 12. 待验证项 | Lighthouse 指标、是否含 `sitemap.xml`、`robots.txt`、是否实现结构化数据、具体动效细节均未验证 /no_think。 |

---

### 2. amankumar.ai

| 分析维度 | 内容 |
| --- | --- |
| 1. 性能表现 | /no_think |
| 2. 视觉设计 | 站点首页呈现标准个人站信息分栏与显著导航区块；详细配色规范 /no_think。 [[amankumar.ai]](https://amankumar.ai/) |
| 3. 信息架构 | 顶部主导航包含 **Home / Experience / Projects / Blogs / About / Contact / Tools**，为典型顶部导航 + 多页面结构。 [[amankumar.ai]](https://amankumar.ai/) |
| 4. 内容策略 | 导航中存在 **Blogs** 与 **Projects**，项目与博客并重；更新频率 /no_think。 [[amankumar.ai]](https://amankumar.ai/) |
| 5. 技术实现 | 官方项目页公开其个人站技术栈：**Next.js, TailwindCSS, ShadCN；部署/边缘使用 Cloudflare**。 [[amankumar.ai]](https://amankumar.ai/projects/amankumarai-website) |
| 6. 微交互与动效 | /no_think |
| 7. AI 集成情况 | /no_think |
| 8. GitHub 集成 | 首页 **Connect** 区包含 GitHub 外链（社交/工具入口），未见站内动态拉取 Star/提交数等证据。 [[amankumar.ai]](https://amankumar.ai/) |
| 9. SEO 表现 | 标题/描述 /no_think；是否有 `sitemap.xml`、`robots.txt` /no_think。 |
| 10. 可访问性 | /no_think |
| 11. 可借鉴点 | 在 **Projects** 中为个人站单独撰写项目页，明确技术与部署信息（为招聘/评审提供可核验证据）。 [[amankumar.ai]](https://amankumar.ai/projects/amankumarai-website) |
| 12. 待验证项 | Lighthouse 指标、站内是否加载 GitHub API、站点地图与 robots、交互动效与可访问性细节 /no_think。 |

---

### 3. leerob.io

| 分析维度 | 内容 |
| --- | --- |
| 1. 性能表现 | /no_think |
| 2. 视觉设计 | /no_think |
| 3. 信息架构 | /no_think |
| 4. 内容策略 | /no_think |
| 5. 技术实现 | 公开派生仓库（基于 **leerob.io**）显示站点框架为 **Next.js**，样式 **Tailwind CSS**，部署 **Vercel**，并配置 **Sanity**（CMS）与 **Prisma/PlanetScale**（历史实现）；同时包含 `pages/sitemap.xml.tsx`、`pages/feed.xml.tsx` 等路由（自动生成 Sitemap/RSS）。以上为公开仓库结构，不等同于实时线上实现。 [[github.com]](https://github.com/andriancyns/web-leerob), [[github.com]](https://github.com/Master-Dipankar/leerob.io) |
| 6. 微交互与动效 | /no_think |
| 7. AI 集成情况 | /no_think |
| 8. GitHub 集成 | 个人 GitHub 主页展示其开源生态与模板（如 **next-mdx-blog**），但 **leerob.io** 是否在站内动态展示 GitHub 数据 /no_think。 [[github.com]](https://github.com/leerob), [[github.com]](https://github.com/leerob/next-mdx-blog) |
| 9. SEO 表现 | 依据派生仓库结构，存在 **自动生成 `sitemap.xml`** 的实现（源代码层面）；线上可达性 /no_think。 [[github.com]](https://github.com/andriancyns/web-leerob) |
| 10. 可访问性 | /no_think |
| 11. 可借鉴点 | 以开源仓库结构示范 **内容型个人站的工程化实践**（Sitemap/RSS/MDX 等配套）。 [[github.com]](https://github.com/andriancyns/web-leerob) |
| 12. 待验证项 | 线上站点当前内容结构、设计风格、性能指标与 SEO 实测、是否仍采用上述技术栈 /no_think。 |

---

### 4. mitchellsparrow.com

| 分析维度 | 内容 |
| --- | --- |
| 1. 性能表现 | /no_think |
| 2. 视觉设计 | 页面为浅色、分区清晰的个人简历/作品集风格；更细致的配色/字重体系 /no_think。 [[mitchellsparrow.com]](https://www.mitchellsparrow.com/) |
| 3. 信息架构 | 顶部导航 + 分区（About / Experience / Skills / Projects），为标准单页/锚点式结构。 [[mitchellsparrow.com]](https://www.mitchellsparrow.com/) |
| 4. 内容策略 | **Projects** 区对关键项目（含 **Portfolio Website**）进行叙述，强调动机与技术栈；自身简历与经历板块较完整。 [[mitchellsparrow.com]](https://www.mitchellsparrow.com/) |
| 5. 技术实现 | 站点源码公开：**Next.js + Tailwind + Framer Motion + Sanity**；仓库 README 也说明使用 Sanity 作为后台以便更新无需重建。 [[github.com]](https://github.com/MitchellSparrow/portfolioWebsite) |
| 6. 微交互与动效 | /no_think |
| 7. AI 集成情况 | /no_think |
| 8. GitHub 集成 | 作者 GitHub 主页与仓库明确指向该站点，并开放 **portfolioWebsite** 源码（可复现与验证）。 [[github.com]](https://github.com/MitchellSparrow/), [[github.com]](https://github.com/MitchellSparrow/portfolioWebsite) |
| 9. SEO 表现 | 标题/描述 /no_think；`sitemap.xml`、`robots.txt` /no_think。 |
| 10. 可访问性 | /no_think |
| 11. 可借鉴点 | （1）**源码开源 + 线上站点互证**，利于用人方审阅；（2）使用 **Sanity** 作为 CMS，使作品集信息可配置、可扩展。 [[github.com]](https://github.com/MitchellSparrow/portfolioWebsite) |
| 12. 待验证项 | Lighthouse 实测、Sitemap/robots/结构化数据与可访问性细节、动效对性能影响 /no_think。 |

---

### 5. toukoum.fr

| 分析维度 | 内容 |
| --- | --- |
| 1. 性能表现 | /no_think |
| 2. 视觉设计 | /no_think |
| 3. 信息架构 | 官方仓库定位为“**AI 原生作品集**”，交互以对话式问答为入口（与传统顶部导航不同），但线上信息架构未实测。/no_think（交互理念来自仓库自述）。 [[github.com]](https://github.com/toukoum/portfolio) |
| 4. 内容策略 | /no_think |
| 5. 技术实现 | 公开仓库声明框架为 **Next.js**（`next.config.ts` 等），并要求设置 `OPENAI_API_KEY` 与 `GITHUB_TOKEN` 环境变量（用于聊天与 GitHub 集成功能）。 [[github.com]](https://github.com/toukoum/portfolio) |
| 6. 微交互与动效 | /no_think |
| 7. AI 集成情况 | 仓库层面声明需要 **OpenAI API Key**；线上是否真实调用 LLM API（如 `openai` 域名请求）/no_think。 [[github.com]](https://github.com/toukoum/portfolio) |
| 8. GitHub 集成 | 仓库说明涉及 GitHub 集成（需 `GITHUB_TOKEN`），线上是否动态展示 /no_think。 [[github.com]](https://github.com/toukoum/portfolio) |
| 9. SEO 表现 | `title/description`、`sitemap.xml`、`robots.txt` /no_think。 |
| 10. 可访问性 | /no_think |
| 11. 可借鉴点 | 将作品集转化为对话式信息架构的探索（仓库自述层面）。 [[github.com]](https://github.com/toukoum/portfolio) |
| 12. 待验证项 | 线上是否启用 HTTPS、实际 Network 是否出现 LLM/API 请求、是否存在 Sitemap/robots、性能与可访问性等 /no_think。 [[sur.ly]](https://sur.ly/i/toukoum.fr/) |
