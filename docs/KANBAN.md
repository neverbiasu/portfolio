# 项目看板 (Project Kanban Board)

> **最后更新**: 2025-12-30
> **状态**: Phase 3 进行中

## ✅ 已完成 (Phase 1 & Phase 2)

### 1. 项目初始化与样式配置
- [x] **项目初始化**: Next.js 14 + TypeScript
- [x] **Tailwind 配置**: 完整 Catppuccin Mocha 调色板
- [x] **字体设置**: JetBrains Mono & Inter

### 2. 终端 UI 基础
- [x] **布局实现**: Hybrid Terminal + Grid Layout
- [x] **启动序列**: whoami 自动执行
- [x] **光标效果**: 闪烁块状光标 (█)

### 3. 核心命令系统
- [x] **命令实现**: `help`, `whoami`, `skills`, `projects`, `stats`, `clear`
- [x] **Tab 自动补全**: useTabCompletion hook + ghost text
- [x] **命令历史**: 上下箭头切换历史命令
- [x] **终端滚动条**: macOS 强制可见 + 样式优化

### 4. 数据流水线
- [x] **GitHub API**: stars, forks, license, topics, created_at, size 等
- [x] **Wakatime API**: languages, editors, OS, total_seconds, best_day
- [x] **自动更新**: GitHub Actions 每日运行

### 5. 项目展示功能
- [x] **组件开发**: ProjectCard 游戏卡片风格
- [x] **正面**: 语言色条 + Stars/Forks 徽章 + Topics
- [x] **背面**: STATS/INFO/LINKS 分区
- [x] **语言颜色**: GitHub Linguist 官方配色

---

## 📅 进行中 (Phase 3)

### 6. 终端增强
- [ ] **AI 助手 (faych)**: 终端集成 ModelScope LLM (当前使用关键词检索 RAG)

---

## 🎨 待开发 (Phase 4: Design & Polish)

- [ ] **导航栏**: 为未来多页面准备
- [ ] **移动端适配**: 处理虚拟键盘等问题
- [ ] **SEO**: 添加 Metadata 和 OpenGraph 标签
- [ ] **性能优化**: 懒加载重组件

---

## 🧊 积压 / 想法 (Backlog)

- [ ] **高级 RAG**: 使用向量检索 (Embedding) 替代关键词匹配
- [ ] **博客系统**: 集成 MDX 博客
- [ ] **音乐播放器**: `music play` 命令
- [ ] **彩蛋**: `sudo`, 黑客帝国数字雨
