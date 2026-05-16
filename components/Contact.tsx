"use client";

import type React from "react";
import { useState } from "react";
import { motion, useInView, type Variants } from "framer-motion";
import { useRef } from "react";
import { Mail, Phone, MapPin, Send, ArrowUpRight } from "lucide-react";
import Container from "./Container";

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
    mono: "mail://",
  },
  {
    icon: Phone,
    label: "Phone",
    value: "+880 1303746940",
    href: "tel:+8801303746940",
    mono: "tel://",
  },
  {
    icon: MapPin,
    label: "Location",
    value: "Dhaka, Bangladesh",
    href: "https://www.google.com/maps?q=Dhaka,+Bangladesh",
    mono: "loc://",
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

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSending(true);

    const res = await fetch("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });

    setSending(false);
    if (res.ok) setSent(true);
    else alert("Something went wrong. Try again.");
  };

  return (
    <section
      ref={ref}
      id="contact"
      className="pf-mesh pf-noise relative overflow-hidden py-28 px-4 sm:px-6 lg:px-8"
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
            "radial-gradient(circle, rgba(16,185,129,.15) 0%, transparent 70%)",
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
            <span className="sec-label">Contact</span>
            <h2 className="pf-serif text-4xl md:text-5xl font-normal text-gray-900 dark:text-white leading-tight">
              Let's build
              <br />
              <span className="em-g italic">something together</span>
            </h2>
            <p className="text-sm text-gray-400 dark:text-gray-500 max-w-sm leading-relaxed font-light mt-1">
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
              {contactItems.map(({ icon: Icon, label, value, href, mono }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  className="group flex items-center gap-4 rounded-xl border border-gray-200/60 dark:border-white/[0.07] bg-white/60 dark:bg-white/[0.03] backdrop-blur-sm p-5 hover:border-emerald-300/50 dark:hover:border-emerald-700/40 transition-all duration-300"
                >
                  {/* Icon */}
                  <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-emerald-50 dark:bg-emerald-500/10 border border-emerald-200/60 dark:border-emerald-500/20 flex items-center justify-center text-emerald-600 dark:text-emerald-400 group-hover:bg-emerald-500 group-hover:text-white group-hover:border-emerald-500 transition-all duration-300">
                    <Icon size={16} />
                  </div>

                  {/* Text */}
                  <div className="min-w-0">
                    <div className="text-[10px] font-mono tracking-[.15em] uppercase text-emerald-500 dark:text-emerald-400 mb-0.5">
                      {mono}
                      {label}
                    </div>
                    <div className="text-sm font-medium text-gray-900 dark:text-white truncate">
                      {value}
                    </div>
                  </div>

                  <ArrowUpRight
                    size={13}
                    className="ml-auto flex-shrink-0 text-gray-300 dark:text-gray-600 group-hover:text-emerald-500 transition-colors"
                  />
                </a>
              ))}

              {/* Availability badge */}
              <div className="mt-2 rounded-xl border border-gray-200/60 dark:border-white/[0.07] bg-white/60 dark:bg-white/[0.03] backdrop-blur-sm p-5">
                <div className="flex items-center gap-2 mb-2">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
                  </span>
                  <span className="text-[10px] font-mono tracking-[.15em] uppercase text-emerald-500 dark:text-emerald-400">
                    Available for work
                  </span>
                </div>
                <p className="text-xs text-gray-500 dark:text-gray-400 font-light leading-relaxed">
                  Currently open to full-time roles and freelance projects.
                  Response time is typically within 24 hours.
                </p>
              </div>
            </motion.div>

            {/* ── Right — form ── */}
            <motion.div
              variants={fadeUp}
              className="rounded-xl border border-gray-200/60 dark:border-white/[0.07] bg-white/60 dark:bg-white/[0.03] backdrop-blur-sm p-7"
            >
              {sent ? (
                <div className="h-full flex flex-col items-center justify-center gap-4 text-center py-12">
                  <div className="w-12 h-12 rounded-full bg-emerald-50 dark:bg-emerald-500/10 border border-emerald-200 dark:border-emerald-500/20 flex items-center justify-center text-emerald-500">
                    <Send size={18} />
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                    Message sent!
                  </h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400 font-light max-w-xs">
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
                          className="w-full rounded-lg border border-gray-200/80 dark:border-white/[0.08] bg-gray-50/80 dark:bg-white/[0.04] px-3.5 py-2.5 text-sm text-gray-900 dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-600 focus:outline-none focus:border-emerald-400 dark:focus:border-emerald-600 transition-colors duration-200"
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
                      className="w-full rounded-lg border border-gray-200/80 dark:border-white/[0.08] bg-gray-50/80 dark:bg-white/[0.04] px-3.5 py-2.5 text-sm text-gray-900 dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-600 focus:outline-none focus:border-emerald-400 dark:focus:border-emerald-600 transition-colors duration-200"
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
                      className="w-full rounded-lg border border-gray-200/80 dark:border-white/[0.08] bg-gray-50/80 dark:bg-white/[0.04] px-3.5 py-2.5 text-sm text-gray-900 dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-600 focus:outline-none focus:border-emerald-400 dark:focus:border-emerald-600 transition-colors duration-200 resize-none"
                    />
                  </div>

                  {/* Submit */}
                  <button
                    type="submit"
                    disabled={sending}
                    className="btn-g w-full flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed"
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
                  </button>
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
