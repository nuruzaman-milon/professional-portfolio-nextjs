"use client";

import type React from "react";
import { useState } from "react";
import { motion, useInView, type Variants } from "framer-motion";
import { useRef } from "react";
import { Mail, Phone, MapPin, Send, ArrowUpRight } from "lucide-react";
import Container from "./Container";
import Button from "./Button";

// ─── Variants — identical to Projects & Blog ──────────────────────────────────
const fadeUp: Variants = {
  hidden: { opacity: 0, y: 22 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] },
  },
};

const stagger: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12 } },
};

const contactItems = [
  {
    icon: Mail,
    label: "Email",
    value: "nuruzaman.milon@gmail.com",
    href: "mailto:nuruzaman.milon@gmail.com",
  },
  {
    icon: Phone,
    label: "Phone",
    value: "+880 1303746940",
    href: "tel:+8801303746940",
  },
  {
    icon: MapPin,
    label: "Location",
    value: "Dhaka, Bangladesh",
    href: "https://www.google.com/maps?q=Dhaka,+Bangladesh",
  },
];

export default function Contact() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSending(true);
    setError("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json().catch(() => ({}));

      if (res.ok) {
        setSent(true);
      } else {
        setError(
          data.error || "Something went wrong. Please try again later.",
        );
      }
    } catch {
      setError("Network error. Please check your connection and try again.");
    } finally {
      setSending(false);
    }
  };

  return (
    <section
      ref={ref}
      id="contact"
      className="pf-mesh pf-noise relative overflow-hidden py-14"
    >
      <div className="pf-grid absolute inset-0 z-0" />

      {/* Ambient orb */}
      <div
        className="absolute pointer-events-none z-0 opacity-30"
        style={{
          bottom: "10%",
          right: "-6%",
          width: 460,
          height: 460,
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(13,148,136,.15) 0%, transparent 70%)",
        }}
      />

      <div className="relative z-10">
        <Container>
          {/* ── Header ── */}
          <motion.div
            animate={inView ? "show" : "hidden"}
            variants={fadeUp}
            initial="hidden"
            className="mb-12"
          >
            <span className="sec-label">Contact</span>
            <h2 className="pf-serif font-normal leading-[1.08] text-gray-900 dark:text-white text-5xl md:text-6xl mt-3 mb-5">
              Let's build
              <br />
              <span className="em-g">something</span>{" "}
              <span className="pf-script font-medium text-4xl md:text-5xl relative inline-block -rotate-2 align-middle ml-1">
                together.
                {/* hand-drawn underline swoosh */}
                <svg
                  className="absolute -bottom-1.5 left-0 w-full text-teal-500 dark:text-teal-400"
                  viewBox="0 0 120 8"
                  fill="none"
                  preserveAspectRatio="none"
                  aria-hidden
                >
                  <path
                    d="M2 6 C 30 2, 62 7, 118 3"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                </svg>
              </span>
            </h2>
            <p className="text-base text-gray-600 dark:text-gray-300 leading-[1.85] max-w-md">
              Have a project in mind or want to collaborate? I'd love to hear
              from you.
            </p>
          </motion.div>

          {/* ── Main grid ── */}
          <motion.div
            animate={inView ? "show" : "hidden"}
            variants={stagger}
            initial="hidden"
            className="grid lg:grid-cols-[2fr_3fr] gap-6"
          >
            {/* ── Left — contact info ── */}
            <motion.div variants={fadeUp} className="flex flex-col gap-4">
              {contactItems.map(({ icon: Icon, label, value, href }) => (
                <a
                  key={label}
                  href={href}
                  {...(href.startsWith("http")
                    ? { target: "_blank", rel: "noopener noreferrer" }
                    : {})}
                  className="group flex items-center gap-4 rounded-xl border border-gray-200/60 dark:border-white/[0.07] bg-white/60 dark:bg-white/[0.03] backdrop-blur-sm p-5 hover:border-teal-300/50 dark:hover:border-teal-800/40 transition-all duration-300"
                >
                  {/* Icon — round teal chip, About quick-facts style */}
                  <div className="flex-shrink-0 w-10 h-10 rounded-full bg-teal-600/10 dark:bg-teal-400/10 flex items-center justify-center text-teal-700 dark:text-teal-400 group-hover:bg-teal-600 group-hover:text-white transition-all duration-300">
                    <Icon size={16} />
                  </div>

                  {/* Text */}
                  <div className="min-w-0">
                    <div className="text-[10px] font-semibold tracking-[.15em] uppercase text-gray-400 dark:text-gray-500 mb-0.5">
                      {label}
                    </div>
                    <div className="text-sm font-medium text-gray-900 dark:text-white truncate">
                      {value}
                    </div>
                  </div>

                  <ArrowUpRight
                    size={13}
                    className="ml-auto flex-shrink-0 text-gray-300 dark:text-gray-600 group-hover:text-teal-600 transition-colors"
                  />
                </a>
              ))}

              {/* Availability badge */}
              <div className="mt-2 rounded-xl border border-gray-200/60 dark:border-white/[0.07] bg-white/60 dark:bg-white/[0.03] backdrop-blur-sm p-5">
                <div className="flex items-center gap-2 mb-2">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-teal-400 opacity-75" />
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-teal-600" />
                  </span>
                  <span className="text-[10px] font-mono tracking-[.15em] uppercase text-teal-600 dark:text-teal-400">
                    Available for work
                  </span>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
                  Currently open to full-time roles and freelance projects.
                  Response time is typically within 24 hours.
                </p>
              </div>
            </motion.div>

            {/* ── Right — form ── */}
            <motion.div
              variants={fadeUp}
              className="rounded-xl border border-gray-200/60 dark:border-white/[0.07] bg-white/60 dark:bg-white/[0.03] backdrop-blur-sm p-5 sm:p-7"
            >
              {sent ? (
                <div className="h-full flex flex-col items-center justify-center gap-4 text-center py-12">
                  <div className="w-12 h-12 rounded-full bg-teal-50 dark:bg-teal-600/10 border border-teal-200 dark:border-teal-600/20 flex items-center justify-center text-teal-600">
                    <Send size={18} />
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                    Message sent!
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300 max-w-xs">
                    Thanks for reaching out. I'll get back to you within 24
                    hours.
                  </p>
                  <button
                    onClick={() => {
                      setSent(false);
                      setFormData({
                        name: "",
                        email: "",
                        subject: "",
                        message: "",
                      });
                    }}
                    className="cta-link mt-2"
                  >
                    Send another <ArrowUpRight size={13} />
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  {/* No honeypot input here — Chrome autofill kept filling the
                      hidden field, which made the API silently drop real
                      messages. The server still rejects payloads that include
                      a filled "website" key (bots POSTing the API directly). */}

                  {/* Name + Email row */}
                  <div className="grid sm:grid-cols-2 gap-4">
                    {[
                      {
                        id: "name",
                        label: "Name",
                        type: "text",
                        placeholder: "Your Name",
                      },
                      {
                        id: "email",
                        label: "Email",
                        type: "email",
                        placeholder: "your@email.com",
                      },
                    ].map(({ id, label, type, placeholder }) => (
                      <div key={id}>
                        <label
                          htmlFor={id}
                          className="block text-[10px] font-mono tracking-[.15em] uppercase text-gray-400 dark:text-gray-500 mb-2"
                        >
                          {label}
                        </label>
                        <input
                          id={id}
                          name={id}
                          type={type}
                          required
                          value={formData[id as keyof typeof formData]}
                          onChange={handleChange}
                          placeholder={placeholder}
                          className="w-full rounded-lg border border-gray-200/80 dark:border-white/[0.08] bg-gray-50/80 dark:bg-white/[0.04] px-3.5 py-2.5 text-sm text-gray-900 dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-600 focus:outline-none focus:border-teal-400 dark:focus:border-teal-700 transition-colors duration-200"
                        />
                      </div>
                    ))}
                  </div>

                  {/* Subject */}
                  <div>
                    <label
                      htmlFor="subject"
                      className="block text-[10px] font-mono tracking-[.15em] uppercase text-gray-400 dark:text-gray-500 mb-2"
                    >
                      Subject
                    </label>
                    <input
                      id="subject"
                      name="subject"
                      type="text"
                      required
                      value={formData.subject}
                      onChange={handleChange}
                      placeholder="Project Discussion"
                      className="w-full rounded-lg border border-gray-200/80 dark:border-white/[0.08] bg-gray-50/80 dark:bg-white/[0.04] px-3.5 py-2.5 text-sm text-gray-900 dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-600 focus:outline-none focus:border-teal-400 dark:focus:border-teal-700 transition-colors duration-200"
                    />
                  </div>

                  {/* Message */}
                  <div>
                    <label
                      htmlFor="message"
                      className="block text-[10px] font-mono tracking-[.15em] uppercase text-gray-400 dark:text-gray-500 mb-2"
                    >
                      Message
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      required
                      rows={5}
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Tell me about your project..."
                      className="w-full rounded-lg border border-gray-200/80 dark:border-white/[0.08] bg-gray-50/80 dark:bg-white/[0.04] px-3.5 py-2.5 text-sm text-gray-900 dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-600 focus:outline-none focus:border-teal-400 dark:focus:border-teal-700 transition-colors duration-200 resize-none"
                    />
                  </div>

                  {/* Error */}
                  {error && (
                    <p className="text-sm text-red-500 dark:text-red-400">
                      {error}
                    </p>
                  )}

                  {/* Submit */}
                  <Button
                    type="submit"
                    disabled={sending}
                    className="w-full disabled:opacity-60 disabled:cursor-not-allowed"
                  >
                    {sending ? (
                      <>
                        <span className="w-4 h-4 rounded-full border-2 border-current border-t-transparent animate-spin" />
                        Sending…
                      </>
                    ) : (
                      <>
                        Send message <Send size={14} />
                      </>
                    )}
                  </Button>
                </form>
              )}
            </motion.div>
          </motion.div>

          {/* ── Divider — consistent with other sections ── */}
          <motion.div
            animate={inView ? "show" : "hidden"}
            variants={fadeUp}
            initial="hidden"
            transition={{ delay: 0.45 }}
            className="mt-14"
          >
            <div className="hl w-full" />
          </motion.div>
        </Container>
      </div>
    </section>
  );
}
