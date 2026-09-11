# Portfolio — Personal Branding Website Plan

> **ojhaprathmesh.in — Prathmesh Ojha's Personal Branding Portfolio**
>
> A premium, conversion-optimised personal branding website to establish
> a strong professional identity and convert visitors (recruiters, clients,
> collaborators) into meaningful opportunities.
>
> Live: **https://ojhaprathmesh.in**
> Stack: **Next.js · TypeScript · TailwindCSS · Framer Motion**

---

## 1. Project Purpose

This is not a simple portfolio. It is a **personal brand asset** with three
distinct audiences:

| Audience          | Primary Goal                                            |
| ----------------- | ------------------------------------------------------- |
| **Recruiters**    | Validate technical depth → trigger interview invite     |
| **Clients**       | Understand capabilities → initiate project conversation |
| **Collaborators** | Discover shared interests → start a conversation        |

Every design, content, and technical decision must serve at least one of
these three conversion goals.

---

## 2. Current State Audit

### What is already built ✅

| Area                  | Status        | Notes                                                  |
| --------------------- | ------------- | ------------------------------------------------------ |
| Next.js app structure | ✅ Complete   | App router, TypeScript, TailwindCSS, Framer Motion     |
| Loading screen        | ✅ Complete   | Animated ripple + fade-in transition                   |
| Custom cursor         | ✅ Complete   | Interactive cursor component                           |
| Navbar                | ✅ Complete   | 8 nav items, responsive                                |
| Hero + About scroll   | ✅ Complete   | `HeroAboutScroll` merged component                     |
| Experience section    | ✅ Complete   | Timeline with 2 entries (intern + volunteer)           |
| Projects section      | ✅ Complete   | 3 featured projects (Angel Five, Stray Haven, Beat.it) |
| Skills section        | ✅ Complete   | 8 skill groups with proficiency levels                 |
| Tech marquee          | ✅ Complete   | Scrolling tech + concept marquee                       |
| Achievements section  | ✅ Complete   | 3 items (IIT cert, 2nd place, ACM)                     |
| Coding profiles       | ✅ Complete   | `CodingProfiles` section                               |
| Resume section        | ✅ Complete   | Embedded viewer + download                             |
| Contact section       | ✅ Complete   | Links to GitHub, LinkedIn, email                       |
| Footer                | ✅ Complete   | Present                                                |
| Custom domain         | ✅ Deployed   | https://ojhaprathmesh.in live                          |
| Data layer            | ✅ Structured | Modular `data/` files; TypeScript types in `types/`    |
| SEO metadata          | ✅ Partial    | `siteMetadata` exists, needs full OG/Twitter cards     |

### What needs attention 🔧

| Area                | Gap                                                                  |
| ------------------- | -------------------------------------------------------------------- |
| Content depth       | Short bios, minimal About copy, no personal story arc                |
| Project detail      | No in-depth case study pages per project                             |
| Blog / writing      | No blog — misses thought-leadership signals                          |
| Testimonials        | No social proof from internship managers or collaborators            |
| Analytics           | No conversion tracking (form submits, resume downloads, link clicks) |
| Performance         | LCP / CLS / FID not formally measured against targets                |
| OG / Social preview | Full Open Graph + Twitter card images not confirmed                  |
| Sitemap / robots    | Not confirmed present for SEO                                        |
| Accessibility       | ARIA roles, keyboard navigation, focus management not audited        |
| Mobile polish       | Custom cursor, animations — behaviour on touch devices               |
| Contact form        | No server-side form; currently links only                            |

---

## 3. Project Goals

### Primary Goal

Make **ojhaprathmesh.in** a **polished, conversion-ready personal brand
asset** that earns a recruiter or client's trust within 30 seconds and
gives them a clear action to take.

### Secondary Goals

- Tell a clear personal story: student → builder → engineer.
- Demonstrate technical breadth _and_ depth through real shipped work.
- Establish a writing/thinking presence through a blog.
- Be technically excellent (performance, accessibility, SEO).
- Be maintainable: adding a new project or post should take < 15 minutes.

---

## 4. Audiences & Conversion Flows

```
Recruiter lands → Hero (role + availability) → Projects → Resume download
                                                         → Contact (email / LinkedIn)

Client lands   → Hero (tagline) → Projects (case studies) → Contact form
                                → Skills → Contact form

Collaborator   → Hero → About story → Coding Profiles → GitHub links
```

---

## 5. Section Architecture (Target State)

| #   | Section ID      | Current    | Target                                    |
| --- | --------------- | ---------- | ----------------------------------------- |
| 0   | Loading / Intro | ✅ Built   | Micro-polish (timing, accessibility)      |
| 1   | Hero            | ✅ Built   | Add typed-role animation, CTA button      |
| 2   | About           | ✅ Partial | Expand story, add photo, timeline         |
| 3   | Experience      | ✅ Built   | Add richer role descriptions, tags        |
| 4   | Projects        | ✅ Built   | Link to per-project case study pages      |
| 5   | Skills          | ✅ Built   | Add visual proficiency bars / skill radar |
| 6   | Tech Marquee    | ✅ Built   | Keep; minor speed/colour tuning           |
| 7   | Achievements    | ✅ Built   | Add metrics and external links            |
| 8   | Coding Profiles | ✅ Built   | Add live stats (LeetCode, GitHub graph)   |
| 9   | Blog / Writing  | ❌ Missing | New section + MDX blog route              |
| 10  | Testimonials    | ❌ Missing | New section with 2–3 quotes               |
| 11  | Resume          | ✅ Built   | Download tracking + inline viewer polish  |
| 12  | Contact         | ✅ Partial | Add server-side form with email delivery  |
| 13  | Footer          | ✅ Built   | Add sitemap links, last-updated date      |

---

## 6. Phased Execution Plan

---

### Phase 1 — Content Completeness & Polish _(Priority: CRITICAL)_

> Fix every "almost-there" issue so the site feels complete and
> professional when a recruiter lands today.

#### 1.1 Hero Section Enhancement

- [ ] Add a **typed/cycling role** animation cycling: `Full-Stack Engineer`
      → `AI/ML Developer` → `Mobile Engineer` → `Data Scientist`
- [ ] Add a **primary CTA button** ("View My Work" scrolls to Projects) and
      a **secondary CTA** ("Download Resume") with download tracking
- [ ] Verify `availability` badge renders correctly with pulsing dot
- [ ] Add **profile photo** (square, high-quality, dark background compatible)

**Files:** `components/hero.tsx`, `data/profile.ts`

---

#### 1.2 About Section Deepening

- [ ] Expand bio from bullet list → a **narrative arc** in 3 short paragraphs:
  1. _Origin_ — why CS / why AI?
  2. _Journey_ — what you've built and what you've learned
  3. _Now_ — what you're looking for / working toward
- [ ] Add **key stats row**: CGPA · Internship · Projects shipped · Hackathons
- [ ] Add photo or illustrated avatar if not already present
- [ ] Add education card with GPA, expected graduation, specialisation

**Files:** `components/about.tsx`, `data/profile.ts`

---

#### 1.3 Experience Section — Richer Entries

- [ ] Expand Getting Roots description to include **measurable outcomes**
      (app shipped, architecture choices, team size)
- [ ] Add `url` / company website links in `ExperienceItem` type
- [ ] Consider adding **university coursework projects** as "Academic" entries
      if they demonstrate additional skills (OS, Networks, DBMS projects)

**Files:** `data/experience.ts`, `types/index.ts`

---

#### 1.4 Projects — Depth & Discoverability

- [ ] Add a **4th project** (e.g., YogaSutra / current agentic AI project) to
      `data/projects.ts` once it reaches a shareable state
- [ ] Create `/projects/[slug]` **case study pages** for each project:
  - Problem statement
  - Architecture diagram or screenshot
  - Tech choices and why
  - Key metrics / outcome
  - Lessons learned
- [ ] Add **project category filter** (All / Full-Stack / Mobile / AI-ML / Finance)
- [ ] Ensure every project has a working `image` (screenshots in `/public/projects/`)

**Files:** `components/sections/Projects.tsx`, `app/projects/[slug]/page.tsx` _(new)_

---

#### 1.5 Achievements — Add External Proof

- [ ] Add **certificate links / credential URLs** to each achievement item
- [ ] Add a **4th achievement**: LeetCode / competitive programming rank if applicable
- [ ] Add metric badges (e.g., "Top 15%" on LeetCode) where verifiable

**Files:** `data/achievements.ts`, `types/index.ts`

---

#### 1.6 Contact Section — Add a Form

- [ ] Replace links-only contact with a **working contact form**:
  - Fields: Name · Email · Message
  - Backend: Next.js API route (`app/api/contact/route.ts`) using Resend / Nodemailer
  - Validation: client-side (zod/react-hook-form) + server-side
  - Feedback: success / error toast notification
- [ ] Add **Calendly embed** or link for scheduling calls (optional but high-impact)

**Files:** `components/sections/Contact.tsx`, `app/api/contact/route.ts` _(new)_

---

### Phase 2 — New High-Impact Sections _(Priority: HIGH)_

> Add sections that differentiate the site from a basic portfolio and
> signal thought-leadership to senior engineers and hiring managers.

#### 2.1 Testimonials Section

**Why:** Social proof is the single highest-trust signal after shipped work.

- [ ] Request **2–3 LinkedIn recommendations** or short quotes from:
  - Manager at Getting Roots (mobile/Flutter work)
  - A university professor or project evaluator (Beat.it 2nd place)
  - A collaborator from ACM technical team
- [ ] Build `Testimonials` component with quote cards, name, role, company
- [ ] Add to `data/testimonials.ts` and insert between Achievements and Resume

**Files:** `components/sections/Testimonials.tsx` _(new)_, `data/testimonials.ts` _(new)_

---

#### 2.2 Blog / Writing Section

**Why:** Writing about what you build demonstrates depth engineers rarely
show. It also drives organic SEO.

- [ ] Set up **MDX blog** in Next.js:
  - Route: `app/blog/page.tsx` (list) + `app/blog/[slug]/page.tsx` (post)
  - Frontmatter: `title`, `date`, `tags`, `excerpt`, `readingTime`
  - MDX rendering with syntax highlighting (Shiki / Prism)
- [ ] Write **3 launch posts**:
  1. _"How I built Angel Five: Financial Analytics with LSTM Forecasting"_
  2. _"Clean Architecture in Flutter: What I Learned Building a Real App"_
  3. _"From Idea to 2nd Place: Building Beat.it, a Full-Stack Music Platform"_
- [ ] Add **Blog preview section** on homepage (3 latest posts, "Read All" link)
- [ ] Add `blog` to navbar

**Files:** `app/blog/` _(new directory)_, `components/sections/BlogPreview.tsx` _(new)_

---

#### 2.3 Live Coding Stats Widget

**Why:** Concrete activity signals show you're actively practising, not
just listing skills.

- [ ] Integrate **GitHub Contribution Graph** (SVG embed or `react-github-calendar`)
- [ ] Add **LeetCode stats** card (problems solved, contest rating) via
      unofficial LeetCode stats API
- [ ] Display **WakaTime** weekly coding hours badge if account is set up
- [ ] Integrate into existing `CodingProfiles` section or as its own widget

**Files:** `components/sections/CodingProfiles.tsx`

---

### Phase 3 — SEO, Performance & Accessibility _(Priority: HIGH)_

> A slow, inaccessible, or poorly-indexed site loses opportunities even
> if the content is great.

#### 3.1 SEO Completeness

- [ ] **Dynamic Open Graph images** per page using `next/og` ImageResponse:
  - Homepage OG: Name + role + tagline on branded background
  - Blog post OG: Post title + date
- [ ] Add `sitemap.ts` route (`app/sitemap.ts`) with all pages + blog posts
- [ ] Add `robots.ts` route (`app/robots.ts`) allowing crawl of all public routes
- [ ] Add **JSON-LD structured data** on homepage:
  - `Person` schema: name, jobTitle, url, sameAs (GitHub, LinkedIn)
  - `WebSite` schema with SearchAction
- [ ] Set `<title>`, `description`, `og:*`, `twitter:*` on every page
- [ ] Verify **canonical URLs** for all pages

**Files:** `app/layout.tsx`, `app/sitemap.ts` _(new)_, `app/robots.ts` _(new)_, `app/opengraph-image.tsx` _(new)_

---

#### 3.2 Core Web Vitals

Target thresholds:

| Metric             | Target  |
| ------------------ | ------- |
| LCP                | < 2.5s  |
| CLS                | < 0.1   |
| FID/INP            | < 200ms |
| PageSpeed (mobile) | ≥ 90    |

- [ ] Run **Lighthouse audit** on current production build; document baseline scores
- [ ] Audit and lazy-load all images (`next/image` with explicit dimensions)
- [ ] Split heavy animation components with `dynamic(() => import(...), { ssr: false })`
- [ ] Audit and remove unused TailwindCSS classes (PurgeCSS / built-in treeshake)
- [ ] Add `<link rel="preload">` for hero fonts and critical assets
- [ ] Enable **Next.js App Router streaming** for above-the-fold sections
- [ ] Verify no layout shift from loading screen → landing transition

**Files:** `next.config.mjs`, `app/layout.tsx`, `components/loading-screen.tsx`

---

#### 3.3 Accessibility (a11y)

- [ ] Audit with **axe DevTools** or Lighthouse; fix all critical and serious issues
- [ ] Ensure all interactive elements have `aria-label` or visible text labels
- [ ] Keyboard navigation: Tab order, focus-visible rings, skip-to-content link
- [ ] Colour contrast: All text must meet WCAG AA (4.5:1 for normal, 3:1 for large)
- [ ] Custom cursor: must not break pointer behaviour on touch/keyboard
- [ ] Reduced-motion: Wrap all Framer Motion animations with `useReducedMotion()` hook
- [ ] Add `lang="en"` to `<html>` (verify in `layout.tsx`)

**Files:** `app/layout.tsx`, `components/custom-cursor.tsx`, all section components

---

### Phase 4 — Analytics & Conversion Tracking _(Priority: MEDIUM)_

> You can't improve what you don't measure.

#### 4.1 Analytics Setup

- [ ] Add **Vercel Analytics** (already on Vercel — zero-config, GDPR-friendly)
- [ ] Add **Vercel Speed Insights** for real-user Core Web Vitals monitoring
- [ ] Optionally add **Plausible Analytics** as privacy-first GA alternative

**Files:** `app/layout.tsx`

---

#### 4.2 Conversion Event Tracking

Track every meaningful action:

| Event                  | Trigger                                 |
| ---------------------- | --------------------------------------- |
| `resume_download`      | Resume download button click            |
| `contact_form_submit`  | Contact form successful submission      |
| `project_link_click`   | GitHub / demo link in Projects section  |
| `blog_post_view`       | Any blog post page view                 |
| `coding_profile_click` | LeetCode / GitHub / CodeChef link click |

- [ ] Implement with Vercel Analytics `track()` calls or Plausible events
- [ ] Set up a weekly review habit: which projects get the most clicks?

**Files:** `components/sections/Projects.tsx`, `components/sections/Contact.tsx`, `components/sections/Resume.tsx`

---

### Phase 5 — Content Maintenance & Growth _(Priority: ONGOING)_

> A personal brand site must grow with you. Stale content signals inactivity.

#### 5.1 Content Update Cadence

| Trigger             | Action                                        |
| ------------------- | --------------------------------------------- |
| New project shipped | Add to `data/projects.ts` + write a blog post |
| New internship      | Update `data/experience.ts` within 1 week     |
| New certification   | Add to `data/achievements.ts`                 |
| Monthly             | Review resume, update availability status     |
| Quarterly           | Write 1 new blog post                         |

---

#### 5.2 Future Sections to Consider

| Section                       | Value                                              | Effort   |
| ----------------------------- | -------------------------------------------------- | -------- |
| **Case Study deep pages**     | High — clients/recruiters love narrative           | Medium   |
| **Open Source contributions** | Signal of community engagement                     | Low      |
| **Speaking / Events**         | Shows confidence and communication skill           | Low      |
| **Uses / Stack page**         | Shows opinionated thinking; popular in indie space | Low      |
| **Now page**                  | What are you working on this month?                | Very low |
| **Dark/light toggle**         | User preference; accessibility win                 | Low      |

---

#### 5.3 Domain & Infrastructure

- [ ] Set up **email forwarding** via custom domain (e.g., hello@ojhaprathmesh.in)
      to use in contact form reply-to and public-facing email
- [ ] Enable **Vercel preview deployments** for every PR via GitHub Actions
- [ ] Add **Lighthouse CI** to GitHub Actions to block regressions on key metrics
- [ ] Set up **domain renewal reminders** (ojhaprathmesh.in) — never let it lapse

---

## 7. Execution Priority Matrix

```
               HIGH IMPACT
                    |
     Blog ──────────┼──── Contact Form
     Case Studies   │     OG / SEO
     Testimonials   │     Hero CTA
                    │
LOW EFFORT ─────────┼───────────────── HIGH EFFORT
                    │
     Now Page       │     Live Coding Stats Widget
     Achievements   │     Dark/Light Toggle
     links          │
                    |
               LOW IMPACT
```

**Start here (top-left: high impact, low effort):**

1. Hero CTA buttons + typing animation
2. Contact form (API route + Resend)
3. OG images + sitemap + robots.txt
4. Achievements external links

**Do next (top-right: high impact, worth the effort):** 5. Blog + 3 launch posts 6. Project case study pages 7. Testimonials

---

## 8. Technical Decisions & Constraints

| Decision             | Choice & Rationale                                      |
| -------------------- | ------------------------------------------------------- |
| Styling              | TailwindCSS — already in use; keep consistent           |
| Animation            | Framer Motion — already in use; don't mix libraries     |
| Blog engine          | MDX (`@next/mdx` or `contentlayer2`) — zero DB needed   |
| Contact form backend | Resend (free tier, great DX) or Nodemailer + Gmail SMTP |
| Analytics            | Vercel Analytics (zero-friction, already on Vercel)     |
| OG images            | `next/og` ImageResponse — no external service needed    |
| Image hosting        | `/public/` for project screenshots (Git-tracked, fast)  |
| CMS                  | None for now — data files in `data/` are sufficient     |
| Internationalisation | English-only (not needed for target audience)           |

---

## 9. File Structure — Target State

```
portfolio_repo/
├── app/
│   ├── page.tsx                    # Homepage (existing)
│   ├── layout.tsx                  # Root layout + metadata
│   ├── sitemap.ts                  # NEW: Dynamic sitemap
│   ├── robots.ts                   # NEW: Robots directives
│   ├── opengraph-image.tsx         # NEW: OG image for homepage
│   ├── blog/
│   │   ├── page.tsx                # NEW: Blog post list
│   │   └── [slug]/
│   │       └── page.tsx            # NEW: Individual blog post
│   ├── projects/
│   │   └── [slug]/
│   │       └── page.tsx            # NEW: Project case study
│   ├── resume/
│   │   └── route.ts                # Existing resume download
│   └── api/
│       └── contact/
│           └── route.ts            # NEW: Contact form handler
├── components/
│   ├── sections/
│   │   ├── BlogPreview.tsx         # NEW: Homepage blog preview
│   │   ├── Testimonials.tsx        # NEW: Testimonials section
│   │   └── ... (existing)
│   └── ... (existing)
├── content/
│   └── blog/                       # NEW: MDX blog posts
│       ├── angel-five-case-study.mdx
│       ├── flutter-clean-architecture.mdx
│       └── beat-it-full-stack.mdx
├── data/
│   ├── testimonials.ts             # NEW: Testimonial quotes
│   └── ... (existing)
└── public/
    ├── projects/                   # Existing screenshots
    └── og/                         # NEW: Static OG fallback images
```

---

## 10. Personal Brand Voice & Tone Guidelines

These rules ensure the site feels coherent and professional:

- **Confident, not arrogant.** Use first person. Lead with what you built,
  not with job titles.
- **Concrete, not vague.** "4 time-series models up to 85% accuracy" beats
  "used ML for forecasting". Numbers always win.
- **Builder mentality.** Headline tagline — "Build. Ship. Improve. Repeat."
  — should permeate copy throughout the site.
- **Available, not desperate.** "Open to Opportunities" badge is good.
  Over-explaining availability is not.
- **Show, don't just tell.** Every skill claim needs a project that
  demonstrates it.

---

## 11. Success Metrics

| Metric                                | Target               |
| ------------------------------------- | -------------------- |
| Lighthouse Performance (mobile)       | ≥ 90                 |
| Lighthouse Accessibility              | ≥ 95                 |
| Lighthouse SEO                        | 100                  |
| LCP                                   | < 2.5s               |
| CLS                                   | < 0.1                |
| Resume downloads / week (post-launch) | ≥ 5                  |
| Contact form submissions / month      | ≥ 2                  |
| Blog posts published (launch)         | 3                    |
| Google index coverage                 | All pages indexed    |
| PageSpeed Insights — mobile           | Green on all metrics |

---

_Plan created: 2026-09-29 · Owner: Prathmesh Ojha · Live site: https://ojhaprathmesh.in_
