# 🌌 Prathmesh Ojha — Premium 3D Developer Portfolio

<div align="center">

[![CI](https://github.com/ojhaprathmesh/portfolio_repo/actions/workflows/ci.yml/badge.svg)](https://github.com/ojhaprathmesh/portfolio_repo/actions/workflows/ci.yml)
[![Vercel](https://img.shields.io/badge/Deployed%20on-Vercel-black?style=flat-square&logo=vercel)](https://ojhaprathmesh.in)
[![License: MIT](https://img.shields.io/badge/License-MIT-green?style=flat-square)](LICENSE)
[![Last Commit](https://img.shields.io/github/last-commit/ojhaprathmesh/portfolio_repo?style=flat-square&color=blue)](https://github.com/ojhaprathmesh/portfolio_repo/commits)
[![Repo Size](https://img.shields.io/github/repo-size/ojhaprathmesh/portfolio_repo?style=flat-square&color=purple)](https://github.com/ojhaprathmesh/portfolio_repo)

<br/>

[![Next.js](https://img.shields.io/badge/Frontend-Next.js-black?style=flat-square&logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/Language-TypeScript-blue?style=flat-square&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Styling-Tailwind%20CSS-38BDF8?style=flat-square&logo=tailwind-css)](https://tailwindcss.com/)
[![Three.js](https://img.shields.io/badge/3D-Three.js-black?style=flat-square&logo=three.js)](https://threejs.org/)
[![React Three Fiber](https://img.shields.io/badge/3D-React%20Three%20Fiber-orange?style=flat-square&logo=react)](https://docs.pmnd.rs/react-three-fiber/getting-started/introduction)
[![Framer Motion](https://img.shields.io/badge/Animation-Framer%20Motion-purple?style=flat-square&logo=framer)](https://www.framer.com/motion/)

</div>

---

**Prathmesh Ojha's** personal portfolio website — a visually premium, single-page creative development showcase.

Designed for high-impact visual impressions, smooth interaction, and strong frontend engineering presentation.

👉 Live at: **[ojhaprathmesh.in](https://ojhaprathmesh.in)**

---

## 🚀 Why This Portfolio?

Recruiters and collaborators see hundreds of basic portfolio websites.  
This portfolio is built to stand out through **visual craft, interactive detail, and clean engineering**.

It combines:

- Interactive WebGL visuals
- Smooth scroll-based motion
- Premium dark aesthetic
- Type-safe content architecture
- SEO-ready metadata
- Responsive single-page storytelling

---

## ✨ Engineering Highlights

- 🧠 **WebGL & Three.js Interactions** — immersive 3D visuals using Three.js and React Three Fiber.
- 🌀 **Lenis Smooth Scrolling** — momentum-based scrolling for cinematic transitions.
- ⚡ **Next.js App Router** — modern React architecture with TypeScript.
- 🎬 **Framer Motion Animations** — smooth section transitions and scroll-based motion.
- 🏗️ **Feature-Isolated Components** — each section is independently structured and maintainable.
- 🎛️ **Typed Data Layer** — portfolio content is centralized in `data/` files for easier updates.
- 👁️ **SEO & Accessibility** — OpenGraph metadata, semantic HTML, and ARIA-friendly decorative elements.

---

## 🛠️ Tech Stack

| Category | Technologies |
|---|---|
| Framework | Next.js |
| Language | TypeScript |
| Styling | Tailwind CSS |
| Animation | Framer Motion, Lenis |
| 3D | Three.js, React Three Fiber, Drei |
| Icons | Lucide React |
| Analytics | Vercel Analytics |
| Package Manager | pnpm |
| Deployment | Vercel |

---

## 🧩 Core Sections

- Hero with 3D interactive background
- About section with cinematic scroll experience
- Experience timeline
- Featured projects
- Skills and tech stack
- Achievements
- Coding profiles
- Resume section
- Contact section

---

## ⚙️ Local Development

### 1. Clone the repository

```bash
git clone https://github.com/ojhaprathmesh/portfolio_repo.git
cd portfolio_repo
```

### 2. Install dependencies

```bash
pnpm install
```

### 3. Start development server

```bash
pnpm dev
```

### 4. Build for production

```bash
pnpm build
```

### 5. Start production server

```bash
pnpm start
```

---

## ✅ CI Pipeline

This repository uses GitHub Actions for basic quality checks.

The CI workflow should run:

```bash
pnpm install
pnpm lint
pnpm build
```

Recommended workflow path:

```txt
.github/workflows/ci.yml
```

Recommended workflow:

```yml
name: CI

on:
  push:
    branches:
      - main
      - master
  pull_request:
    branches:
      - main
      - master

jobs:
  build:
    name: Lint and Build
    runs-on: ubuntu-latest

    steps:
      - name: Checkout repository
        uses: actions/checkout@v4

      - name: Setup pnpm
        uses: pnpm/action-setup@v4
        with:
          version: 10

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: 22
          cache: pnpm

      - name: Install dependencies
        run: pnpm install --frozen-lockfile

      - name: Run lint
        run: pnpm lint

      - name: Build project
        run: pnpm build
```

---

## 📁 Project Structure

```txt
portfolio_repo/
├── app/
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx
├── components/
│   ├── about.tsx
│   ├── hero.tsx
│   ├── navbar.tsx
│   ├── works.tsx
│   ├── tech-marquee.tsx
│   └── ui/
├── data/
│   ├── achievements.ts
│   ├── coding.ts
│   ├── experience.ts
│   ├── navigation.ts
│   ├── profile.ts
│   ├── projects.ts
│   ├── site.ts
│   ├── skills.ts
│   └── socials.ts
├── hooks/
├── lib/
├── public/
├── types/
└── package.json
```

---

## 🧠 Architecture Notes

The portfolio follows a simple static frontend architecture:

```txt
data/*.ts → components/*.tsx → app/page.tsx
```

Most portfolio content is stored in typed data files, making it easier to update:

- profile details
- projects
- skills
- experience
- achievements
- social links
- coding profiles

This keeps UI components reusable and prevents content from being scattered across the codebase.

---

## 🚧 Current Improvement Roadmap

- Add CI/CD workflow
- Add missing public assets like resume PDF and OG image
- Remove unused dependencies
- Re-enable strict production build checks
- Add security headers
- Add performance monitoring
- Add project detail pages
- Add blog or engineering notes section

---

## 🛡️ License

This repository is licensed under the [MIT License](LICENSE).

---

<div align="center">

Built with care by **Prathmesh Ojha**

</div>