// filepath: data/projects.ts
import type { Project } from "@/types"

export const projects: Project[] = [
  {
    id: "angel-five",
    title: "Angel Five",
    date: "2024",
    description:
      "A financial analytics platform for tracking angel investments, portfolio performance, and deal flow intelligence.",
    longDescription:
      "Angel Five is a full-stack financial analytics dashboard built for early-stage investors and founders. It aggregates deal flow data, tracks portfolio company performance over time, and surfaces insights using data visualisations and ML-backed trend analysis. The platform features secure authentication, real-time data pipelines, and an intuitive interface designed for non-technical investors.",
    stack: [
      "Next.js",
      "TypeScript",
      "Python",
      "FastAPI",
      "PostgreSQL",
      "Tailwind CSS",
      "Recharts",
      "Framer Motion",
    ],
    highlights: [
      "Real-time portfolio valuation tracking with historical trend charts",
      "ML-backed deal scoring using scikit-learn regression models",
      "Secure multi-tenant auth with role-based access control",
      "Interactive dashboards with drill-down analytics",
      "REST API backend with FastAPI and async SQLAlchemy",
    ],
    github: "https://github.com/ojhaprathmesh/angelfive_repo",
    demo: undefined,
    image: "/projects/angel-five.png",
    category: "finance",
    featured: true,
    status: "shipped",
  },
  {
    id: "stray-haven",
    title: "Stray Haven",
    date: "2024",
    description:
      "A community-driven mobile app connecting stray animal rescuers, shelters, and adopters across cities.",
    longDescription:
      "Stray Haven is a cross-platform mobile application built with React Native that tackles stray animal welfare through technology. The app enables users to report stray animals with geo-tagged photos, connect them with nearby shelters, and facilitates adoption matching. A real-time notification system alerts volunteers and NGOs about new rescues in their area.",
    stack: [
      "React Native",
      "Expo",
      "TypeScript",
      "Node.js",
      "Express",
      "MongoDB",
      "Firebase",
      "Google Maps API",
    ],
    highlights: [
      "Geo-tagged rescue reporting with image upload and animal profiling",
      "Real-time push notifications for nearby rescue alerts",
      "Shelter discovery map with availability and capacity data",
      "Adoption matching flow with foster network integration",
      "Offline-first architecture with sync on reconnect",
    ],
    github: "https://github.com/ojhaprathmesh/stray_haven_repo",
    demo: undefined,
    image: "/projects/stray-haven.png",
    category: "mobile",
    featured: true,
    status: "shipped",
  },
  {
    id: "beat-it",
    title: "Beat.it",
    date: "2023",
    description:
      "An AI-powered music discovery and playlist curation app that learns from your listening moods and patterns.",
    longDescription:
      "Beat.it is a full-stack music intelligence platform that uses collaborative filtering and mood-based ML models to recommend tracks. Users log their listening sessions tagged with mood and context, and the system learns over time to generate personalised playlists. It integrates with the Spotify API and features an ambient audio visualiser built with Web Audio API and Three.js.",
    stack: [
      "React",
      "TypeScript",
      "Python",
      "Flask",
      "scikit-learn",
      "Spotify API",
      "Three.js",
      "PostgreSQL",
      "Redis",
    ],
    highlights: [
      "Mood-aware playlist generation using collaborative filtering",
      "Spotify OAuth integration for real listening history",
      "3D audio visualiser using Three.js and Web Audio API",
      "Session tagging system for mood and activity labelling",
      "Redis-powered caching for near-instant recommendations",
    ],
    github: "https://github.com/ojhaprathmesh/beat.it_repo",
    demo: undefined,
    image: "/projects/beat-it.png",
    category: "ai-ml",
    featured: true,
    status: "shipped",
  },
]

export const featuredProjects = projects.filter((p) => p.featured)
