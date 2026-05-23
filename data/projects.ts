// filepath: data/projects.ts
import type { Project } from "@/types"

export const projects: Project[] = [
  {
    id: "angel-five",
    title: "Angel Five",
    date: "Sep 2025 – Dec 2025",
    description:
      "Full-stack financial analytics platform with real-time NSE data, DSFM analytics, and ML-powered forecasting.",
    longDescription:
      "Angel Five is a monorepo-based financial dashboard supporting 30+ equities with real-time NSE data, JWT + 2FA authentication, and Firebase-backed user workflows. It integrates a Flask ML microservice for time-series forecasting and NLP market sentiment, with quantitative tooling for portfolio optimization and volatility modeling.",
    stack: [
      "Next.js",
      "Express",
      "TypeScript",
      "Firebase",
      "Flask",
      "PyTorch",
      "HuggingFace",
      "TensorFlow",
    ],
    highlights: [
      "Monorepo dashboard with real-time NSE data and JWT + 2FA authentication for 30+ equities",
      "DSFM analytics: correlation matrices, PCA, and MPT-based portfolio optimization",
      "4 time-series models (LSTM, ARIMA, SARIMA, GARCH) via Flask microservice — up to 85% forecast accuracy",
      "PyTorch LSTM price forecasting and HuggingFace FinBERT for real-time NLP market sentiment",
      "Zero-trust backend routing to secure API access across microservices",
    ],
    github: "https://github.com/ojhaprathmesh/angelfive_repo",
    demo: "https://angelfive.vercel.app/",
    image: "/projects/angel-five.png",
    category: "finance",
    featured: true,
    status: "shipped",
  },
  {
    id: "stray-haven",
    title: "Stray Haven",
    date: "Feb 2025 – Apr 2025",
    description:
      "Native Android rescue-to-adoption platform connecting stray animal reporters, NGOs, and adopters.",
    longDescription:
      "Stray Haven is a native Android application with 10+ activities, 4 adapters, and 2 fragments, enabling stray animal reporting, NGO fundraising, and adoption workflows. It uses Firebase Authentication (email + Google Sign-In) and Firestore with structured data models and real-time user flows.",
    stack: [
      "Android",
      "Java",
      "Firebase Auth",
      "Firestore",
      "Material Design",
      "Google Identity Services",
    ],
    highlights: [
      "10+ activities and 4 adapters integrating Firebase Auth and Firestore for rescue, donation, and adoption workflows",
      "Real-time user flows with structured data models and Google Sign-In authentication",
      "Radial floating action menu, auto-scrolling carousel, and shared element transitions for fluid navigation",
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
    date: "2024 – 2025",
    description:
      "Full-stack music streaming platform with search, favourites, play-tracking, and role-based admin controls.",
    longDescription:
      "Beat.it is a full-stack music platform managing 18 songs across 6 albums with search, favourites, and play-tracking via Firestore. It implements role-based access control with 3+ auth flows and secures 8+ admin REST endpoints with session-based middleware and modular API design.",
    stack: [
      "Node.js",
      "Express",
      "Firebase",
      "Firestore",
    ],
    highlights: [
      "18 songs across 6 albums with search, favourites, and play-tracking via Firestore",
      "Role-based access control with 3+ auth flows and 8+ secured admin REST endpoints",
      "Modular REST APIs with session-based middleware and structured database collections",
      "Ranked 2nd in university project evaluation",
    ],
    github: "https://github.com/ojhaprathmesh/beat.it_repo",
    demo: undefined,
    image: "/projects/beat-it.png",
    category: "full-stack",
    featured: true,
    status: "shipped",
  },
]

export const featuredProjects = projects.filter((p) => p.featured)
