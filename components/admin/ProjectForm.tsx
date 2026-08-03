"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { inputCls, labelCls, cardCls, btnPrimaryCls, btnGhostCls } from "./ui";

export type ProjectFormData = {
  _id?: string;
  slug: string;
  label: string;
  title: string;
  description: string;
  highlights: string[];
  images: string[];
  stack: string[];
  github: string | null;
  live: string | null;
  role: string;
  duration: string;
  completedDate: string;
  overview: string;
  features: string[];
  challenges: string[];
  learnings: string[];
  sortOrder: number;
  published: boolean;
};

const empty: ProjectFormData = {
  slug: "",
  label: "",
  title: "",
  description: "",
  highlights: [],
  images: [],
  stack: [],
  github: null,
  live: null,
  role: "",
  duration: "",
  completedDate: "",
  overview: "",
  features: [],
  challenges: [],
  learnings: [],
  sortOrder: 0,
  published: true,
};

function slugify(s: string) {
  return s
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-");
}

const toLines = (arr: string[]) => arr.join("\n");
const fromLines = (text: string) =>
  text.split("\n").map((l) => l.trim()).filter(Boolean);

export default function ProjectForm({
  initial,
}: {
  initial?: ProjectFormData;
}) {
  const router = useRouter();
  const isEdit = Boolean(initial?._id);
  const [form, setForm] = useState<ProjectFormData>(initial ?? empty);
  const [lines, setLines] = useState({
    highlights: toLines(initial?.highlights ?? []),
    images: toLines(initial?.images ?? []),
    stack: (initial?.stack ?? []).join(", "),
    features: toLines(initial?.features ?? []),
    challenges: toLines(initial?.challenges ?? []),
    learnings: toLines(initial?.learnings ?? []),
  });
  const [slugTouched, setSlugTouched] = useState(isEdit);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const set = (key: keyof ProjectFormData, value: any) =>
    setForm((f) => ({ ...f, [key]: value }));
  const setLine = (key: keyof typeof lines, value: string) =>
    setLines((l) => ({ ...l, [key]: value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError("");
    const payload = {
      ...form,
      github: form.github || null,
      live: form.live || null,
      highlights: fromLines(lines.highlights),
      images: fromLines(lines.images),
      stack: lines.stack.split(",").map((s) => s.trim()).filter(Boolean),
      features: fromLines(lines.features),
      challenges: fromLines(lines.challenges),
      learnings: fromLines(lines.learnings),
    };
    const res = await fetch(
      isEdit ? `/api/projects/${initial!._id}` : "/api/projects",
      {
        method: isEdit ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      },
    );
    setSaving(false);
    if (res.ok) {
      router.push("/admin/projects");
      router.refresh();
    } else {
      const data = await res.json().catch(() => ({}));
      setError(data.error || "Failed to save.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className={`${cardCls} p-5 sm:p-7 space-y-5`}>
      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <label className={labelCls}>Title</label>
          <input
            required
            value={form.title}
            onChange={(e) => {
              set("title", e.target.value);
              if (!slugTouched) set("slug", slugify(e.target.value));
            }}
            placeholder="Project title"
            className={inputCls}
          />
        </div>
        <div>
          <label className={labelCls}>Slug</label>
          <input
            required
            value={form.slug}
            onChange={(e) => {
              setSlugTouched(true);
              set("slug", slugify(e.target.value));
            }}
            placeholder="project-slug"
            className={inputCls}
          />
        </div>
      </div>

      <div>
        <label className={labelCls}>Label (shown above the title)</label>
        <input
          value={form.label}
          onChange={(e) => set("label", e.target.value)}
          placeholder="Featured · Web2 & Web3"
          className={inputCls}
        />
      </div>

      <div>
        <label className={labelCls}>Card description</label>
        <textarea
          rows={3}
          value={form.description}
          onChange={(e) => set("description", e.target.value)}
          placeholder="Short description shown on project cards"
          className={`${inputCls} resize-none`}
        />
      </div>

      <div>
        <label className={labelCls}>Overview (case study intro)</label>
        <textarea
          rows={4}
          value={form.overview}
          onChange={(e) => set("overview", e.target.value)}
          className={`${inputCls} resize-none`}
        />
      </div>

      <div>
        <label className={labelCls}>Image URLs (one per line)</label>
        <textarea
          rows={3}
          value={lines.images}
          onChange={(e) => setLine("images", e.target.value)}
          placeholder={"/images/projects/my-project/shot-1.png"}
          className={`${inputCls} font-mono text-xs`}
        />
      </div>

      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <label className={labelCls}>Tech stack (comma separated)</label>
          <input
            value={lines.stack}
            onChange={(e) => setLine("stack", e.target.value)}
            placeholder="Next.js, TypeScript, MongoDB"
            className={inputCls}
          />
        </div>
        <div>
          <label className={labelCls}>Highlights (one per line)</label>
          <textarea
            rows={3}
            value={lines.highlights}
            onChange={(e) => setLine("highlights", e.target.value)}
            className={`${inputCls} resize-none`}
          />
        </div>
      </div>

      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <label className={labelCls}>GitHub URL (optional)</label>
          <input
            value={form.github ?? ""}
            onChange={(e) => set("github", e.target.value)}
            placeholder="https://github.com/…"
            className={inputCls}
          />
        </div>
        <div>
          <label className={labelCls}>Live URL (optional)</label>
          <input
            value={form.live ?? ""}
            onChange={(e) => set("live", e.target.value)}
            placeholder="https://…"
            className={inputCls}
          />
        </div>
      </div>

      <div className="grid sm:grid-cols-3 gap-4">
        <div>
          <label className={labelCls}>Role</label>
          <input
            value={form.role}
            onChange={(e) => set("role", e.target.value)}
            placeholder="Full-Stack Engineer"
            className={inputCls}
          />
        </div>
        <div>
          <label className={labelCls}>Duration</label>
          <input
            value={form.duration}
            onChange={(e) => set("duration", e.target.value)}
            placeholder="6+ months"
            className={inputCls}
          />
        </div>
        <div>
          <label className={labelCls}>Completed (empty = ongoing)</label>
          <input
            type="date"
            value={form.completedDate}
            onChange={(e) => set("completedDate", e.target.value)}
            className={inputCls}
          />
        </div>
      </div>

      <div>
        <label className={labelCls}>Key features (one per line)</label>
        <textarea
          rows={5}
          value={lines.features}
          onChange={(e) => setLine("features", e.target.value)}
          className={`${inputCls} resize-none`}
        />
      </div>

      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <label className={labelCls}>Challenges (one per line)</label>
          <textarea
            rows={5}
            value={lines.challenges}
            onChange={(e) => setLine("challenges", e.target.value)}
            className={`${inputCls} resize-none`}
          />
        </div>
        <div>
          <label className={labelCls}>Learnings (one per line)</label>
          <textarea
            rows={5}
            value={lines.learnings}
            onChange={(e) => setLine("learnings", e.target.value)}
            className={`${inputCls} resize-none`}
          />
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-6">
        <div className="w-32">
          <label className={labelCls}>Sort order</label>
          <input
            type="number"
            value={form.sortOrder}
            onChange={(e) => set("sortOrder", Number(e.target.value))}
            className={inputCls}
          />
        </div>
        <label className="flex items-center gap-2.5 cursor-pointer mt-5">
          <input
            type="checkbox"
            checked={form.published}
            onChange={(e) => set("published", e.target.checked)}
            className="accent-teal-600 w-4 h-4"
          />
          <span className="text-sm text-gray-700 dark:text-gray-300">
            Published (visible on the site)
          </span>
        </label>
      </div>

      {error && <p className="text-sm text-red-500 dark:text-red-400">{error}</p>}

      <div className="flex items-center gap-3 pt-2">
        <button type="submit" disabled={saving} className={btnPrimaryCls}>
          {saving ? "Saving…" : isEdit ? "Update project" : "Create project"}
        </button>
        <button
          type="button"
          onClick={() => router.push("/admin/projects")}
          className={btnGhostCls}
        >
          Cancel
        </button>
      </div>
    </form>
  );
}
