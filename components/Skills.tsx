// "use client";

// import { useRef } from "react";
// import { motion, useInView, type Variants } from "framer-motion";

// // ─── Skill data — sourced from resume ────────────────────────────────────────
// const categories = [
//   {
//     index: "01",
//     title: "Languages",
//     description: "The foundation everything is built on",
//     skills: [
//       { name: "TypeScript", tier: "primary" },
//       { name: "JavaScript", tier: "primary" },
//       { name: "C / C++", tier: "secondary" },
//     ],
//   },
//   {
//     index: "02",
//     title: "Frontend",
//     description: "Interfaces that feel fast and considered",
//     skills: [
//       { name: "React", tier: "primary" },
//       { name: "Next.js", tier: "primary" },
//       { name: "Tailwind CSS", tier: "primary" },
//       { name: "Framer Motion", tier: "primary" },
//       { name: "shadcn/ui", tier: "secondary" },
//       { name: "Redux", tier: "secondary" },
//       { name: "Zustand", tier: "secondary" },
//     ],
//   },
//   {
//     index: "03",
//     title: "Backend",
//     description: "Reliable APIs and scalable data layers",
//     skills: [
//       { name: "Node.js", tier: "primary" },
//       { name: "Express.js", tier: "primary" },
//       { name: "REST API", tier: "primary" },
//       { name: "JWT Auth", tier: "secondary" },
//       { name: "MongoDB", tier: "primary" },
//       { name: "PostgreSQL", tier: "primary" },
//       { name: "MySQL", tier: "secondary" },
//     ],
//   },
//   {
//     index: "04",
//     title: "Web3 & Integrations",
//     description: "On-chain features and third-party services",
//     skills: [
//       { name: "Privy.io", tier: "primary" },
//       { name: "LI.FI SDK", tier: "primary" },
//       { name: "Solana Wallet", tier: "primary" },
//       { name: "SSL Commerce", tier: "secondary" },
//       { name: "SendGrid", tier: "secondary" },
//     ],
//   },
// ];

// const tools = [
//   "Git",
//   "GitHub",
//   "GitHub Actions",
//   "Docker",
//   "Vercel",
//   "CI/CD",
//   "Figma",
//   "VS Code",
// ];

// // ─── Animation variants ───────────────────────────────────────────────────────
// const fadeUp: Variants = {
//   hidden: { opacity: 0, y: 20 },
//   show: {
//     opacity: 1,
//     y: 0,
//     transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
//   },
// };

// const stagger: Variants = {
//   hidden: {},
//   show: { transition: { staggerChildren: 0.08 } },
// };

// const pillVariant: Variants = {
//   hidden: { opacity: 0, scale: 0.88, y: 8 },
//   show: {
//     opacity: 1,
//     scale: 1,
//     y: 0,
//     transition: { duration: 0.35, ease: [0.22, 1, 0.36, 1] },
//   },
// };

// export default function Skills() {
//   const ref = useRef<HTMLElement>(null);
//   const inView = useInView(ref, { once: true, margin: "-80px" });

//   return (
//     <section
//       ref={ref}
//       id="skills"
//       className="pf-mesh pf-noise relative overflow-hidden py-28 px-4 sm:px-6 lg:px-8"
//     >
//       {/* Subtle grid */}
//       <div className="pf-grid absolute inset-0 z-0" />

//       {/* Ambient orb */}
//       <div
//         className="absolute pointer-events-none z-0 opacity-40"
//         style={{
//           top: "30%",
//           right: "-5%",
//           width: 420,
//           height: 420,
//           borderRadius: "50%",
//           background:
//             "radial-gradient(circle, rgba(16,185,129,.15) 0%, transparent 70%)",
//         }}
//       />

//       <div className="max-w-5xl mx-auto relative z-10">
//         {/* ── Header ── */}
//         <motion.div
//           animate={inView ? "show" : "hidden"}
//           variants={fadeUp}
//           initial="hidden"
//           className="mb-20 flex flex-col items-center text-center gap-3"
//         >
//           <span className="sec-label">Expertise</span>
//           <h2 className="pf-serif text-4xl md:text-5xl font-normal text-gray-900 dark:text-white leading-tight">
//             What I build
//             <br />
//             <span className="em-g italic">and how I build it</span>
//           </h2>
//           <p className="text-sm text-gray-400 dark:text-gray-500 max-w-sm leading-relaxed font-light mt-1">
//             3+ years across the full stack — from pixel-perfect UIs to
//             production APIs and on-chain integrations.
//           </p>
//         </motion.div>

//         {/* ── Category grid ── */}
//         <motion.div
//           animate={inView ? "show" : "hidden"}
//           variants={stagger}
//           initial="hidden"
//           className="grid sm:grid-cols-2 gap-px bg-gray-200/60 dark:bg-white/[0.06] rounded-xl overflow-hidden mb-px"
//         >
//           {categories.map((cat) => (
//             <motion.div
//               key={cat.index}
//               variants={fadeUp}
//               className="group bg-white/70 dark:bg-gray-900/60 backdrop-blur-sm p-8 hover:bg-emerald-50/40 dark:hover:bg-emerald-900/10 transition-colors duration-300"
//             >
//               {/* Category header */}
//               <div className="flex items-start justify-between mb-5">
//                 <div>
//                   <div className="text-[10px] font-mono text-emerald-500 dark:text-emerald-400 tracking-[.18em] mb-1">
//                     {cat.index}
//                   </div>
//                   <h3 className="text-lg font-bold text-gray-900 dark:text-white leading-tight">
//                     {cat.title}
//                   </h3>
//                   <p className="text-xs text-gray-400 dark:text-gray-500 font-light mt-0.5">
//                     {cat.description}
//                   </p>
//                 </div>
//                 {/* Accent line */}
//                 <div
//                   className="w-6 h-6 rounded-sm flex-shrink-0 opacity-20 group-hover:opacity-40 transition-opacity duration-300 mt-1"
//                   style={{
//                     background: "linear-gradient(135deg,#059669,#0d9488)",
//                   }}
//                 />
//               </div>

//               {/* Pills */}
//               <motion.div variants={stagger} className="flex flex-wrap gap-2">
//                 {cat.skills.map((skill) => (
//                   <motion.span
//                     key={skill.name}
//                     variants={pillVariant}
//                     className={`
//                       inline-flex items-center px-3 py-1.5 rounded-md text-xs font-medium
//                       transition-all duration-200 cursor-default
//                       ${
//                         skill.tier === "primary"
//                           ? "bg-emerald-50 dark:bg-emerald-900/20 text-emerald-700 dark:text-emerald-300 border border-emerald-200/60 dark:border-emerald-700/40 hover:border-emerald-400 dark:hover:border-emerald-500 hover:shadow-sm"
//                           : "bg-gray-100/80 dark:bg-white/[0.05] text-gray-600 dark:text-gray-400 border border-gray-200/60 dark:border-white/[0.08] hover:border-gray-400 dark:hover:border-white/20"
//                       }
//                     `}
//                   >
//                     {skill.name}
//                   </motion.span>
//                 ))}
//               </motion.div>
//             </motion.div>
//           ))}
//         </motion.div>

//         {/* ── Tools strip ── */}
//         <motion.div
//           animate={inView ? "show" : "hidden"}
//           variants={fadeUp}
//           initial="hidden"
//           transition={{ delay: 0.45 }}
//           className="bg-white/70 dark:bg-gray-900/60 backdrop-blur-sm rounded-b-xl border-t-0 px-8 py-6
//                      bg-gray-200/60 dark:bg-white/[0.06]"
//           style={{
//             background: undefined,
//             borderTop: "1px solid rgba(16,185,129,0.10)",
//           }}
//         >
//           <div className="flex flex-wrap items-center gap-x-6 gap-y-3">
//             <span className="text-[10px] font-mono tracking-[.18em] uppercase text-gray-400 dark:text-gray-500 flex-shrink-0">
//               Tools & DevOps
//             </span>
//             <div className="w-px h-4 bg-gray-200 dark:bg-white/10 flex-shrink-0" />
//             {tools.map((tool, i) => (
//               <motion.span
//                 key={tool}
//                 initial={{ opacity: 0, y: 6 }}
//                 animate={inView ? { opacity: 1, y: 0 } : {}}
//                 transition={{
//                   delay: 0.5 + i * 0.04,
//                   duration: 0.3,
//                   ease: "easeOut",
//                 }}
//                 className="text-xs text-gray-500 dark:text-gray-400 font-medium hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors duration-200 cursor-default"
//               >
//                 {tool}
//               </motion.span>
//             ))}
//           </div>
//         </motion.div>

//         {/* ── Divider + footnote ── */}
//         <motion.div
//           animate={inView ? "show" : "hidden"}
//           variants={fadeUp}
//           initial="hidden"
//           transition={{ delay: 0.6 }}
//           className="mt-14 flex flex-col sm:flex-row items-center justify-between gap-4"
//         >
//           <div className="hl flex-1" />
//           <p className="text-xs text-gray-400 dark:text-gray-500 font-light px-4 text-center flex-shrink-0">
//             <span className="em-g font-semibold">Primary</span> — daily use
//             &nbsp;·&nbsp;
//             <span className="text-gray-400">Secondary</span> — proficient
//           </p>
//           <div className="hl flex-1" />
//         </motion.div>
//       </div>
//     </section>
//   );
// }

"use client";

import { useRef } from "react";
import { motion, useInView, type Variants } from "framer-motion";
import { Sparkles } from "lucide-react";
import Container from "./Container";

// ─── Deliverable-based groups ─────────────────────────────────────────────────
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
      { name: "shadcn/ui", context: "Accessible component system & theming" },
      {
        name: "Zustand",
        context: "Lightweight state for social feed & builder (SWOP)",
      },
      { name: "Redux", context: "Complex state management in ERP modules" },
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
      { name: "Privy", context: "Authentication + wallet connection (SWOP)" },
      { name: "LI.FI SDK", context: "Cross-chain token swaps (SWOP)" },
      {
        name: "Solana",
        context: "Wallet actions, transfers, on-chain interactions",
      },
      {
        name: "SSL Commerce",
        context: "Payment gateway integration (e-commerce)",
      },
      { name: "SendGrid", context: "Transactional email & notifications" },
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
      { name: "JWT Auth", context: "Secure authentication & session handling" },
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
      { name: "Docker", context: "Containerised environments, local parity" },
      { name: "Vercel", context: "Deployment, previews, edge configuration" },
      { name: "GitHub Actions", context: "CI/CD pipelines & automation" },
    ],
  },
];

// ─── Variants ─────────────────────────────────────────────────────────────────
const fadeUp: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
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
    transition: { duration: 0.35, ease: [0.22, 1, 0.36, 1] },
  },
};

export default function Skills() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      ref={ref}
      id="skills"
      className="ab-bg pf-noise relative overflow-hidden py-28 px-4 sm:px-6 lg:px-8"
    >
      <div className="ab-grid absolute inset-0 z-0" />

      {/* Ambient orb */}
      <div
        className="absolute pointer-events-none z-0 opacity-30"
        style={{
          bottom: "10%",
          left: "-8%",
          width: 500,
          height: 500,
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(16,185,129,.18) 0%, transparent 65%)",
        }}
      />

      <div className="relative z-10">
        <Container>
          {/* ── Header ── */}
          <motion.div
            animate={inView ? "show" : "hidden"}
            variants={fadeUp}
            initial="hidden"
            className="mb-20 flex flex-col items-center text-center gap-3"
          >
            <span className="sec-label">Skills</span>
            <h2 className="pf-serif text-4xl md:text-5xl font-normal text-gray-900 dark:text-white leading-tight">
              What I can
              <br />
              <span className="em-g italic">deliver for you</span>
            </h2>
            <p className="text-sm text-gray-400 dark:text-gray-500 max-w-sm leading-relaxed font-light mt-1">
              Not just a list of tools — but what I've actually built with them,
              in production, for real users.
            </p>
          </motion.div>

          {/* ── Groups ── */}
          <div className="space-y-4">
            {deliverables.map((group, gi) => (
              <motion.div
                key={group.index}
                animate={inView ? "show" : "hidden"}
                variants={fadeUp}
                initial="hidden"
                transition={{ delay: gi * 0.09 }}
                className="rounded-xl border border-gray-200/60 dark:border-white/[0.07]
                         bg-white/60 dark:bg-white/[0.03] backdrop-blur-sm overflow-hidden
                         hover:border-emerald-300/50 dark:hover:border-emerald-700/40
                         transition-colors duration-300"
              >
                {/* ── Group header ── */}
                <div className="px-6 pt-5 pb-4 border-b border-gray-100/80 dark:border-white/[0.05]">
                  <div className="flex items-start justify-between gap-4 mb-3">
                    <div className="flex items-center gap-3 min-w-0">
                      <span className="text-[10px] font-mono tracking-[.18em] text-emerald-500 dark:text-emerald-400 flex-shrink-0">
                        {group.index}
                      </span>
                      <div className="min-w-0">
                        <h3 className="text-sm font-bold text-gray-900 dark:text-white leading-snug">
                          {group.capability}
                        </h3>
                        <p className="text-xs text-gray-400 dark:text-gray-500 font-light mt-0.5">
                          {group.tagline}
                        </p>
                      </div>
                    </div>
                    <span className="text-[10px] font-mono text-gray-300 dark:text-gray-600 flex-shrink-0 mt-0.5">
                      {group.skills.length} skills
                    </span>
                  </div>

                  {/* Highlight callout */}
                  <div className="flex items-start gap-2 px-3 py-2 rounded-md bg-emerald-50/60 dark:bg-emerald-900/15 border border-emerald-100 dark:border-emerald-800/30">
                    <Sparkles
                      size={11}
                      className="text-emerald-500 dark:text-emerald-400 flex-shrink-0 mt-0.5"
                    />
                    <p className="text-[11px] text-emerald-700 dark:text-emerald-300 font-medium leading-relaxed">
                      {group.highlight}
                    </p>
                  </div>
                </div>

                {/* ── Skill rows ── */}
                <motion.div
                  variants={stagger}
                  animate={inView ? "show" : "hidden"}
                  initial="hidden"
                  className="divide-y divide-gray-100/60 dark:divide-white/[0.04]"
                >
                  {group.skills.map((skill) => (
                    <motion.div
                      key={skill.name}
                      variants={rowVariant}
                      className="flex items-center gap-4 px-6 py-3
                               hover:bg-emerald-50/25 dark:hover:bg-emerald-900/10
                               transition-colors duration-150"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400/60 dark:bg-emerald-500/50 flex-shrink-0" />

                      <span className="text-sm font-semibold text-gray-800 dark:text-gray-100 w-36 flex-shrink-0">
                        {skill.name}
                      </span>

                      <span className="hidden sm:block w-px h-3 bg-gray-200 dark:bg-white/10 flex-shrink-0" />

                      <span className="text-xs text-gray-400 dark:text-gray-500 font-light">
                        {skill.context}
                      </span>
                    </motion.div>
                  ))}
                </motion.div>
              </motion.div>
            ))}
          </div>

          {/* ── Footer note ── */}
          <motion.div
            animate={inView ? "show" : "hidden"}
            variants={fadeUp}
            initial="hidden"
            transition={{ delay: 0.6 }}
            className="mt-12 flex items-center gap-4"
          >
            <div className="hl flex-1" />
            <p className="text-xs text-gray-400 dark:text-gray-500 font-light flex-shrink-0">
              All skills used in{" "}
              <a
                href="#projects"
                className="text-emerald-600 dark:text-emerald-400 hover:underline underline-offset-2"
              >
                production projects
              </a>
            </p>
            <div className="hl flex-1" />
          </motion.div>
        </Container>
      </div>
    </section>
  );
}
