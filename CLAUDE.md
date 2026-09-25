# CLAUDE.md

Personal portfolio for John Carlo Garado (Database Operations Analyst). React 19 + Vite + TypeScript, static site, no backend.

## Commands

- `npm run dev` — local dev server
- `npm run build` — type-check (`tsc -b`) and build to `dist/`
- `npm run lint` — oxlint

Run `npm run build` and `npm run lint` after every change; both must pass cleanly.

## Structure

- `src/data/portfolio.ts` — all content: profile, links, stats, projects, skills, themes, assistant replies. Edit copy here, not in components.
- `src/components/` — `Header` (nav + theme switcher + mobile menu), `Sections` (Hero, About, Projects, Skills, Footer), `Contact`, `Assistant`, `PageLoader`, `icons`.
- `src/hooks/usePortfolioEffects.ts` — theme tokens applied to `<html>`, scroll reveal, active-section nav, scrolled header.
- `src/index.css` — base styles and design tokens. `src/App.css` — component styles.

## Features to preserve

- Page loader (~1.2s) before the site renders.
- Five themes (Blue, Midnight, Sage, Forest, Sunset), saved to localStorage. Colors come from CSS variables (`--primary`, `--bg`, `--surface`, `--text`, `--muted`, `--border`); never hard-code colors in components.
- Contact form: honeypot field, required fields, email format check, 20-character minimum message, opens a `mailto:` draft, then locks for 15 seconds.
- Floating "Assist" chat: canned replies from `getAssistantReply`, quick prompts, thinking indicator.

## Design rules

- Luxury-minimal: generous spacing, hairline borders, restrained color. Polished UX over flashy effects.
- Typography: Geist for everything (Geist Mono only for small labels). Do not use serif or display fonts. The owner rejected a serif look as ugly.
- Headings are solid and confident. The name in the hero is plain, on one line where it fits, with no italic or color split.
- Never phrase experience in a way that reads like an age (e.g. a "4+ yrs" badge next to the photo). Say "4+ years of professional experience".
- Keep animation subtle and respect `prefers-reduced-motion`.
- Must work at phone width (390px) with no horizontal scroll.

## Copy and tone

- Interview-ready and professional, written in first person on the page.
- No AI-generic wording ("passionate", "leveraging", "cutting-edge", "seamless", etc.).
- Do not invent facts, employers, numbers or project details. Use only what is in `src/data/portfolio.ts` or what the owner provides.

## Workflow

- Ask before large visual changes. The owner reviews the look and gives direct feedback.
- To check visuals, run `npx vite preview` and take headless Chrome screenshots. Headless Chrome has a minimum window width, so test phone layouts inside a 390px-wide iframe served from the same origin.
- Git remote: `https://github.com/JC-Garads/JC-Garado` (branch `main`). Commit author: John Carlo Garado <carlogarado24@gmail.com>. Only commit or push when asked.
