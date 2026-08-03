"use client";

import Link from "next/link";
import { Github, Linkedin, Mail } from "lucide-react";
import Container from "./Container";

// ─── Site config — match with Navbar ─────────────────────────────────────────
const SITE = {
  first: "Nuruzaman",
  last: "Milon",
  tagline: "Full-stack engineer crafting Web2 & Web3 experiences.",
};

const navLinks = [
  { href: "#about", label: "About" },
  { href: "#skills", label: "Skills" },
  { href: "#projects", label: "Projects" },
  { href: "#blog", label: "Blog" },
  { href: "#contact", label: "Contact" },
];

const services = [
  "Web Development",
  "Full Stack Solutions",
  "API Development",
  "Web3 Integration",
  "Code Review",
];

const socials = [
  { icon: Mail, href: "mailto:nuruzaman.milon@gmail.com", label: "Email" },
  { icon: Github, href: "https://github.com/nuruzaman-milon", label: "GitHub" },
  {
    icon: Linkedin,
    href: "https://linkedin.com/in/nuruzaman-milon",
    label: "LinkedIn",
  },
];

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative overflow-hidden border-t border-gray-200/60 dark:border-white/[0.07] bg-white/60 dark:bg-[#0a0a0f] backdrop-blur-sm">
      {/* Subtle ambient orb */}
      <div
        className="absolute pointer-events-none opacity-20"
        style={{
          bottom: "-10%",
          left: "50%",
          transform: "translateX(-50%)",
          width: 500,
          height: 220,
          borderRadius: "50%",
          background:
            "radial-gradient(ellipse, rgba(13,148,136,.18) 0%, transparent 70%)",
        }}
      />

      <div className="relative">
        <Container className="pt-16 pb-8">
          {/* ── Top grid ── */}
          <div className="grid md:grid-cols-[2fr_1fr_1fr] gap-12 mb-14">
            {/* Brand col */}
            <div className="flex flex-col gap-5">
              {/* Logo — serif wordmark, same as Navbar */}
              <Link
                href="/"
                className="pf-serif text-xl leading-none text-gray-900 dark:text-white transition-opacity duration-200 hover:opacity-80 w-fit"
              >
                {SITE.first} <span className="em-g">{SITE.last}</span>
              </Link>

              <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed max-w-xs">
                {SITE.tagline}
              </p>

              {/* Social icons */}
              <div className="flex items-center gap-2 mt-1">
                {socials.map(({ icon: Icon, href, label }) => (
                  <a
                    key={label}
                    href={href}
                    aria-label={label}
                    className="w-9 h-9 rounded-lg border border-black/[0.08] bg-white/60 text-gray-500 hover:text-teal-700 hover:border-teal-700/40 dark:border-white/[0.08] dark:bg-white/[0.04] dark:text-gray-400 dark:hover:text-teal-400 dark:hover:border-teal-400/40 flex items-center justify-center transition-colors duration-200"
                    target={href.startsWith("http") ? "_blank" : undefined}
                    rel={
                      href.startsWith("http")
                        ? "noopener noreferrer"
                        : undefined
                    }
                  >
                    <Icon size={15} />
                  </a>
                ))}
              </div>
            </div>

            {/* Quick links */}
            <div>
              <p className="text-[10px] font-mono tracking-[.15em] uppercase text-teal-600 dark:text-teal-400 mb-5">
                Navigation
              </p>
              <ul className="space-y-3">
                {navLinks.map(({ href, label }) => (
                  <li key={label}>
                    <Link
                      href={href}
                      className="group flex items-center gap-1 text-sm text-gray-500 dark:text-gray-400 hover:text-teal-700 dark:hover:text-teal-400 transition-colors duration-200"
                    >
                      <span className="w-0 overflow-hidden group-hover:w-3 transition-all duration-200 text-teal-600">
                        ›
                      </span>
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Services */}
            <div>
              <p className="text-[10px] font-mono tracking-[.15em] uppercase text-teal-600 dark:text-teal-400 mb-5">
                Services
              </p>
              <ul className="space-y-3">
                {services.map((s) => (
                  <li
                    key={s}
                    className="flex items-start gap-2 text-sm text-gray-500 dark:text-gray-400"
                  >
                    <span className="mt-2 w-1 h-1 rounded-full bg-teal-400/60 flex-shrink-0" />
                    {s}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* ── Divider — same .hl class used across all sections ── */}
          <div className="hl w-full mb-7" />

          {/* ── Bottom bar ── */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-[11px] font-mono text-gray-400 dark:text-gray-600 tracking-wide">
              © {year} {SITE.first} {SITE.last}. All rights reserved.
            </p>

            <button
              onClick={() =>
                document
                  .getElementById("home")
                  ?.scrollIntoView({ behavior: "smooth" })
              }
              aria-label="Back to top"
              className="group flex items-center gap-2.5 px-4 py-2 rounded-md
             border border-gray-200/70 dark:border-white/[0.08]
             bg-white/70 dark:bg-white/[0.04]
             backdrop-blur-sm
             text-[11px] font-mono tracking-[.14em] uppercase
             text-gray-500 dark:text-gray-400
             hover:border-teal-400/60 dark:hover:border-teal-700/50
             hover:text-teal-700 dark:hover:text-teal-400
             hover:bg-teal-50/60 dark:hover:bg-teal-600/[0.06]
             transition-all duration-300"
            >
              <span
                className="flex items-center justify-center w-5 h-5 rounded
               bg-gray-100 dark:bg-white/[0.06]
               group-hover:bg-teal-100 dark:group-hover:bg-teal-600/20
               transition-colors duration-300"
              >
                {/* Arrow up icon inline — no extra import needed if ArrowUp already imported */}
                <svg
                  width="10"
                  height="10"
                  viewBox="0 0 10 10"
                  fill="none"
                  className="transition-transform duration-300 group-hover:-translate-y-0.5"
                >
                  <path
                    d="M5 8V2M5 2L2 5M5 2L8 5"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </span>
              Back to top
            </button>
          </div>
        </Container>
      </div>
    </footer>
  );
}
