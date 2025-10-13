## neverbiasu • Portfolio (Next.js + Edge AI)

AI-native personal website for **neverbiasu**, highlighting frontend and ComfyUI work. Built on the Next.js App Router with Tailwind CSS, bilingual copy (EN/zh-CN), a collapsible AI assistant, and Vercel Edge streaming.

### ✨ Features
- Catppuccin Mocha dark theme mapped to Tailwind tokens.
- Hero with avatar, skills, and collaboration badge.
- Project grid (2-up responsive) and GitHub stats embed (`catppuccin_mocha`).
- Edge AI assistant (`/api/ai`) with 3-message session cap stored in `localStorage`.
- Language toggle (EN ⇄ 中文) persisted locally.
- Mobile optimizations: AI launcher moves to bottom-left modal entry.

### 🛠️ Tech Stack
- Next.js 14 App Router · React 18 · TypeScript
- Tailwind CSS 3 · lucide-react icons
- Vercel AI SDK (`ai`, `@ai-sdk/openai`) via Edge Route Handlers
- Deployed on Vercel (Edge Runtime for `/api/ai`)

### 📦 Setup
```bash
npm install
npm run dev
# http://localhost:3000
```

Run lint/build checks:
```bash
npm run lint
npm run build
```

### 🔐 Environment
Create `.env.local` with your provider keys (OpenAI shown as example):
```
OPENAI_API_KEY=sk-...
# Optional overrides
OPENAI_BASE_URL=https://api.openai.com/v1
OPENAI_MODEL=gpt-4o-mini
```

_Values are read by the Edge handler only; never expose keys client-side._

### 🚀 Deployment
1. Connect the repo to Vercel.
2. Set the environment variables above in the project settings.
3. Trigger production deploy (`npm run build` already passes locally).

If you prefer GitHub Actions, reuse your existing workflow to run `npm run build` and `npx vercel deploy --prod` (with `VERCEL_TOKEN`).

### 🧠 AI Assistant Notes
- Entry point: `> Say something` button (desktop edge, mobile bottom-left).
- Expands to a 320px sidebar (desktop) or full-screen modal (mobile).
- Limits each browser session to **3 outgoing messages** via `localStorage`.
- Update `ASSISTANT_SYSTEM_PROMPT` in `lib/constants.ts` to adjust persona.

### 🗂 Customize Content
- `lib/content.ts` — name, bio, skills, project metadata, social links.
- `lib/i18n.ts` — bilingual UI copy.
- `components/` — layout and assistant UI.
- `tailwind.config.ts` — Catppuccin palette overrides.

### ✅ Next Steps
- Replace placeholder social URLs/email if needed.
- Fill in real project repo/demo links.
- Wire GitHub Actions deploy pipeline (see `docs/product/prd.md`).

Questions or follow-ups? Ping the AI assistant or update the docs in `docs/`.
