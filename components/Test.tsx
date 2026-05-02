"use client";

import { useRef } from "react";
import { motion, useInView, type Variants } from "framer-motion";

// ─── Capability-based groups (upgraded) ───────────────────────────────────────
const deliverables = [
  {
    index: "01",
    capability: "Build scalable full-stack systems",
    tagline:
      "From idea to production — handling real users, data, and performance",
    highlight:
      "Built SWOP — a Web2/Web3 social platform with social feed, wallet integration, and reward system",
    skills: [
      {
        name: "React",
        context: "3 yrs · complex UI systems (SWOP, ERP, e-commerce)",
      },
      {
        name: "Next.js",
        context: "App Router, SSR, performance optimization (SWOP)",
      },
      {
        name: "TypeScript",
        context: "Strict typing across frontend & backend systems",
      },
      {
        name: "Node.js",
        context: "REST APIs, business logic, reward system (SWOP)",
      },
      {
        name: "Express.js",
        context: "Routing, middleware, scalable API structure",
      },
      {
        name: "MongoDB",
        context: "Aggregation, indexing for feed & analytics",
      },
      {
        name: "PostgreSQL",
        context: "Relational data, joins, structured workflows",
      },
    ],
  },
  {
    index: "02",
    capability: "Engineer modern frontend experiences",
    tagline:
      "High-performance UI with state management, animation, and accessibility",
    highlight:
      "Delivered responsive, animation-driven UIs for SaaS, ERP, and marketing platforms",
    skills: [
      {
        name: "Tailwind CSS",
        context: "Utility-first scalable UI across all projects",
      },
      {
        name: "Framer Motion",
        context: "Page transitions, micro-interactions, UX polish",
      },
      {
        name: "shadcn/ui",
        context: "Accessible component system & theming",
      },
      {
        name: "Zustand",
        context: "Lightweight state for social feed & builder (SWOP)",
      },
      {
        name: "Redux",
        context: "Complex state management in ERP modules",
      },
    ],
  },
  {
    index: "03",
    capability: "Develop Web3-enabled applications",
    tagline:
      "Wallet auth, on-chain actions, and cross-chain integrations in production",
    highlight:
      "Integrated Solana wallet, token transfers, swaps, and on-chain tipping in SWOP",
    skills: [
      {
        name: "Privy",
        context: "Authentication + wallet connection (SWOP)",
      },
      {
        name: "LI.FI SDK",
        context: "Cross-chain token swaps (SWOP)",
      },
      {
        name: "Solana",
        context: "Wallet actions, transfers, on-chain interactions",
      },
      {
        name: "SSL Commerce",
        context: "Payment gateway integration (e-commerce)",
      },
      {
        name: "SendGrid",
        context: "Transactional email & notifications",
      },
    ],
  },
  {
    index: "04",
    capability: "Design production-ready backend systems",
    tagline: "Secure APIs, authentication, and scalable architecture design",
    highlight:
      "Designed REST APIs with JWT auth, validation, and modular architecture",
    skills: [
      {
        name: "REST API Design",
        context: "Versioning, error handling, scalable endpoints",
      },
      {
        name: "JWT Auth",
        context: "Secure authentication & session handling",
      },
      {
        name: "API Architecture",
        context: "Modular services, middleware layering",
      },
    ],
  },
  {
    index: "05",
    capability: "Ship with DevOps & reliability",
    tagline:
      "CI/CD pipelines, deployments, and production environment management",
    highlight: "Automated deployments and ensured stable production releases",
    skills: [
      {
        name: "Git & GitHub",
        context: "Branching, PRs, collaborative workflows",
      },
      {
        name: "Docker",
        context: "Containerised environments, local parity",
      },
      {
        name: "Vercel",
        context: "Deployment, previews, edge configuration",
      },
      {
        name: "GitHub Actions",
        context: "CI/CD pipelines & automation",
      },
    ],
  },
];

// ─── Animation variants ───────────────────────────────────────────────────────
const ease = [0.22, 1, 0.36, 1] as const;

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease },
  },
};

const stagger: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.06 } },
};

const rowVariant: Variants = {
  hidden: { opacity: 0, x: -10 },
  show: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.35, ease },
  },
};

export default function Tests() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      ref={ref}
      id="tests"
      className="ab-bg pf-noise relative overflow-hidden py-28 px-4 sm:px-6 lg:px-8"
    >
      <div className="ab-grid absolute inset-0 z-0" />

      <div className="max-w-5xl mx-auto relative z-10">
        {/* Header */}
        <motion.div
          animate={inView ? "show" : "hidden"}
          variants={fadeUp}
          initial="hidden"
          className="mb-20 text-center"
        >
          <span className="sec-label">Tests</span>
          <h2 className="pf-serif text-4xl md:text-5xl">
            What I can <span className="em-g italic">deliver</span>
          </h2>
        </motion.div>

        {/* Groups */}
        <div className="space-y-5">
          {deliverables.map((group, gi) => (
            <motion.div
              key={group.index}
              variants={fadeUp}
              initial="hidden"
              animate={inView ? "show" : "hidden"}
              transition={{ delay: gi * 0.08 }}
              className="rounded-xl border bg-white/60 dark:bg-white/[0.03] backdrop-blur-sm overflow-hidden"
            >
              {/* Header */}
              <div className="px-6 pt-5 pb-4 border-b">
                <div className="flex justify-between items-center">
                  <h3 className="text-sm font-bold">{group.capability}</h3>
                  <span className="text-xs text-gray-400">
                    {group.skills.length} skills
                  </span>
                </div>

                <p className="text-xs text-gray-400 mt-1">{group.tagline}</p>

                {/* 🔥 Highlight */}
                <p className="text-xs text-emerald-500 mt-2">
                  {group.highlight}
                </p>
              </div>

              {/* Skills */}
              <motion.div
                variants={stagger}
                initial="hidden"
                animate={inView ? "show" : "hidden"}
              >
                {group.skills.map((skill) => (
                  <motion.div
                    key={skill.name}
                    variants={rowVariant}
                    className="flex gap-4 px-6 py-3 border-t"
                  >
                    <span className="text-sm font-semibold w-36">
                      {skill.name}
                    </span>
                    <span className="text-xs text-gray-400">
                      {skill.context}
                    </span>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
