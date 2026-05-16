import { StaticImageData } from "next/image";

import swopImg1 from "@/public/images/projects/swop/swop-thumb-12.png";
import swopImg2 from "@/public/images/projects/swop/swop-thumb-13.png";
import swopImg3 from "@/public/images/projects/swop/swop-thumb-11.png";

import nazaaraImg1 from "@/public/images/projects/nazaara/nazaara-1.png";
import nazaaraImg2 from "@/public/images/projects/nazaara/nazaara-2.png";
import nazaaraImg3 from "@/public/images/projects/nazaara/nazaara-3.png";

// ─── Types ────────────────────────────────────────────────────────────────────

export interface Project {
  id: number;
  slug: string;
  label: string;
  title: string;
  description: string;
  /** Short bullets shown on cards */
  highlights: string[];
  images: (string | StaticImageData)[];
  stack: string[];
  github: string | null;
  live: string | null;
  // ── Case study fields (used on detail page) ──
  role: string;
  duration: string;
  completedDate: string;
  overview: string;
  features: string[];
  challenges: string[];
  learnings: string[];
}

// ─── Data ─────────────────────────────────────────────────────────────────────

export const projects: Project[] = [
  {
    id: 1,
    slug: "swop",
    label: "Featured · Web2 & Web3",
    title: "SWOP Platform",
    description:
      "A full-stack Web2/Web3 social platform with a Twitter-style feed, SmartSite builder, on-chain tipping, and a peer-to-peer token swap. Built from scratch at Bayshore Communication.",
    highlights: [
      "Solana wallet integration & token transfers",
      "SmartSite builder — Linktree-style portfolio",
      "Reward & points system",
    ],
    images: [swopImg1, swopImg2, swopImg3],
    stack: [
      "Next.js",
      "TypeScript",
      "Express.js",
      "MongoDB",
      "Zustand",
      "Privy.io",
      "LI.FI SDK",
      "Framer Motion",
    ],
    github: null,
    live: "https://swopme.app",
    role: "Full-Stack Engineer",
    duration: "6 months",
    completedDate: "2024-06-01",
    overview:
      "SWOP is a next-generation social platform that bridges Web2 usability with Web3 capabilities. Built end-to-end at Bayshore Communication, it lets users post content, build a personal SmartSite (a customisable link-in-bio portfolio), tip creators on-chain, and swap tokens directly in the feed — all without leaving the app.",
    features: [
      "Twitter-style social feed with posts, likes & comments",
      "SmartSite builder — drag-and-drop personal portfolio pages",
      "On-chain tipping via Solana wallet (Privy.io auth)",
      "Peer-to-peer token swap powered by LI.FI SDK",
      "Reward & gamified points system",
      "Real-time notifications",
    ],
    challenges: [
      "Abstracting wallet complexity — most users aren't crypto-native, so Privy.io's embedded wallet UX was critical to adoption.",
      "Cross-chain token swap reliability — LI.FI routes can fail mid-transaction; building fallback states and clear error messaging took significant iteration.",
      "State sync between Web2 social actions and on-chain events — keeping the feed optimistic while waiting for transaction confirmations.",
      "Performance at scale — MongoDB aggregation pipelines for feed ranking had to stay under 100 ms for a smooth scroll experience.",
    ],
    learnings: [
      "Designing for non-crypto users first forces cleaner abstractions across the whole codebase.",
      "Optimistic UI updates are non-negotiable for any on-chain interaction in a social context.",
      "LI.FI SDK route quoting needs aggressive caching — calling it on every keystroke causes noticeable latency.",
      "Zustand's slice pattern scales surprisingly well for a mixed Web2/Web3 state model.",
    ],
  },
  {
    id: 2,
    slug: "ecommerce-platform",
    label: "Full-stack · E-Commerce",
    title: "E-Commerce Platform",
    description:
      "A production-grade e-commerce platform built from scratch — covering product management, checkout, SSL Commerce payment gateway, and an admin dashboard.",
    highlights: [
      "Full checkout & payment flow",
      "Admin dashboard with analytics",
      "Performance-optimised product pages",
    ],
    images: [nazaaraImg1, nazaaraImg2, nazaaraImg3],
    stack: [
      "Next.js",
      "Node.js",
      "MongoDB",
      "Tailwind CSS",
      "JWT",
      "SSL Commerce",
    ],
    github: null,
    live: null,
    role: "Full-Stack Engineer",
    duration: "3 months",
    completedDate: "2024-01-15",
    overview:
      "A complete e-commerce solution built from the ground up for a Bangladeshi retail client. The platform handles the full commerce lifecycle — product catalogue, cart, SSL Commerce payment integration, order tracking, and a rich admin dashboard with analytics — serving real customers from day one.",
    features: [
      "Product catalogue with category filtering & search",
      "Cart and multi-step checkout flow",
      "SSL Commerce payment gateway integration",
      "Order tracking & status updates",
      "Admin dashboard — sales analytics, inventory, orders",
      "JWT-based auth with refresh token rotation",
    ],
    challenges: [
      "SSL Commerce's sandbox environment has subtle differences from production — required careful integration testing before go-live.",
      "Handling payment callback verification securely to prevent order spoofing.",
      "Building an admin analytics dashboard that remains fast even with thousands of orders in MongoDB.",
      "Image optimisation for product pages — Next.js Image component with custom loader reduced LCP significantly.",
    ],
    learnings: [
      "Payment gateway integrations always take longer than estimated — build in extra time for edge cases.",
      "MongoDB aggregation is powerful for analytics but needs indexing strategy planned from day one.",
      "Server-side rendering product pages improved SEO and perceived performance noticeably.",
      "Role-based middleware on Express routes is simpler and more maintainable than per-endpoint checks.",
    ],
  },
  {
    id: 3,
    slug: "erp-system",
    label: "Frontend · ERP",
    title: "ERP System",
    description:
      "A modern ERP frontend for Peoples IT Solution covering account management, dealer management, product oversight, and labour tracking — reducing manual effort by 70–80%.",
    highlights: [
      "4 core modules — accounts, dealers, products, labour",
      "Automated complex business workflows",
      "70–80% reduction in manual operational effort",
    ],
    images: ["/images/erp-system.jpg"],
    stack: ["React", "Vite", "Redux", "Tailwind CSS", "REST API"],
    github: null,
    live: null,
    role: "Frontend Engineer",
    duration: "4 months",
    completedDate: "2024-03-10",
    overview:
      "An internal ERP system built for Peoples IT Solution to replace a patchwork of spreadsheets and manual processes. The frontend covers four core operational modules — accounts, dealer management, product oversight, and labour tracking — and was designed to be intuitive enough for non-technical staff to adopt with minimal training.",
    features: [
      "Account management — ledger, transactions, balance sheets",
      "Dealer management — onboarding, credit limits, order history",
      "Product module — stock levels, SKU management, reorder alerts",
      "Labour tracking — attendance, payroll, leave management",
      "Role-based access control per module",
      "Exportable reports (PDF/Excel)",
    ],
    challenges: [
      "Translating complex, undocumented business logic from spreadsheets into structured UI flows.",
      "Redux store architecture for four deeply interconnected modules without causing re-render storms.",
      "Designing data-dense table UIs that remain scannable and usable on smaller screens.",
      "Aligning with stakeholders on workflow priorities — the dealer and labour modules had conflicting requirements initially.",
    ],
    learnings: [
      "Domain modelling sessions with non-technical stakeholders upfront saves weeks of rework later.",
      "RTK Query dramatically reduced boilerplate for REST API integration compared to plain Redux thunks.",
      "Virtualised tables (react-window) are essential once row counts exceed a few hundred.",
      "Design system consistency matters more in ERP than anywhere — users spend 8 hours a day in the UI.",
    ],
  },
];

// ─── Helpers ──────────────────────────────────────────────────────────────────

/** Returns a single project by slug, or undefined if not found. */
export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}

/** Returns the 3 most recent projects for the homepage featured section. */
export function getFeaturedProjects(count = 3): Project[] {
  return projects.slice(0, count);
}

/**
 * Returns the previous and next projects relative to the given slug.
 * Wraps around — last project's next is first, first project's prev is last.
 */
export function getAdjacentProjects(slug: string): {
  prev: Project | null;
  next: Project | null;
} {
  const index = projects.findIndex((p) => p.slug === slug);
  if (index === -1) return { prev: null, next: null };

  const prev = index > 0 ? projects[index - 1] : null;
  const next = index < projects.length - 1 ? projects[index + 1] : null;

  return { prev, next };
}
