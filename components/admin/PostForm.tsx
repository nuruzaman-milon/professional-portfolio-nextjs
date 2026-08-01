"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { inputCls, labelCls, cardCls, btnPrimaryCls, btnGhostCls } from "./ui";

export type PostFormData = {
  _id?: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  image: string;
  date: string;
  readTime: string;
  category: string;
  tags: string[];
  author: string;
  published: boolean;
};

const empty: PostFormData = {
  title: "",
  slug: "",
  excerpt: "",
  content: "",
  image: "",
  date: new Date().toISOString().slice(0, 10),
  readTime: "5 min read",
  category: "General",
  tags: [],
  author: "Nuruzaman Milon",
  published: true,
};

function slugify(s: string) {
  return s
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-");
}

export default function PostForm({ initial }: { initial?: PostFormData }) {
  const router = useRouter();
  const isEdit = Boolean(initial?._id);
  const [form, setForm] = useState<PostFormData>(initial ?? empty);
  const [tagsText, setTagsText] = useState((initial?.tags ?? []).join(", "));
  const [slugTouched, setSlugTouched] = useState(isEdit);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const set = (key: keyof PostFormData, value: any) =>
    setForm((f) => ({ ...f, [key]: value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError("");
    const payload = {
      ...form,
      tags: tagsText.split(",").map((t) => t.trim()).filter(Boolean),
    };
    const res = await fetch(
      isEdit ? `/api/posts/${initial!._id}` : "/api/posts",
      {
        method: isEdit ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      },
    );
    setSaving(false);
    if (res.ok) {
      router.push("/admin/posts");
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
            placeholder="Post title"
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
            placeholder="post-slug"
            className={inputCls}
          />
        </div>
      </div>

      <div>
        <label className={labelCls}>Excerpt</label>
        <textarea
          rows={2}
          value={form.excerpt}
          onChange={(e) => set("excerpt", e.target.value)}
          placeholder="Short summary shown on cards and in search results"
          className={`${inputCls} resize-none`}
        />
      </div>

      <div>
        <label className={labelCls}>Content (HTML)</label>
        <textarea
          rows={16}
          value={form.content}
          onChange={(e) => set("content", e.target.value)}
          placeholder="<h2>Introduction</h2>\n<p>…</p>"
          className={`${inputCls} font-mono text-xs leading-relaxed`}
        />
      </div>

      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <label className={labelCls}>Cover image URL</label>
          <input
            value={form.image}
            onChange={(e) => set("image", e.target.value)}
            placeholder="/images/blogs/my-post.png"
            className={inputCls}
          />
        </div>
        <div>
          <label className={labelCls}>Date</label>
          <input
            type="date"
            required
            value={form.date}
            onChange={(e) => set("date", e.target.value)}
            className={inputCls}
          />
        </div>
      </div>

      <div className="grid sm:grid-cols-3 gap-4">
        <div>
          <label className={labelCls}>Category</label>
          <input
            value={form.category}
            onChange={(e) => set("category", e.target.value)}
            placeholder="React"
            className={inputCls}
          />
        </div>
        <div>
          <label className={labelCls}>Read time</label>
          <input
            value={form.readTime}
            onChange={(e) => set("readTime", e.target.value)}
            placeholder="8 min read"
            className={inputCls}
          />
        </div>
        <div>
          <label className={labelCls}>Author</label>
          <input
            value={form.author}
            onChange={(e) => set("author", e.target.value)}
            className={inputCls}
          />
        </div>
      </div>

      <div>
        <label className={labelCls}>Tags (comma separated)</label>
        <input
          value={tagsText}
          onChange={(e) => setTagsText(e.target.value)}
          placeholder="React, TypeScript, Architecture"
          className={inputCls}
        />
      </div>

      <label className="flex items-center gap-2.5 cursor-pointer w-fit">
        <input
          type="checkbox"
          checked={form.published}
          onChange={(e) => set("published", e.target.checked)}
          className="accent-emerald-500 w-4 h-4"
        />
        <span className="text-sm text-gray-700 dark:text-gray-300">
          Published (visible on the site)
        </span>
      </label>

      {error && <p className="text-sm text-red-500 dark:text-red-400">{error}</p>}

      <div className="flex items-center gap-3 pt-2">
        <button type="submit" disabled={saving} className={btnPrimaryCls}>
          {saving ? "Saving…" : isEdit ? "Update post" : "Create post"}
        </button>
        <button
          type="button"
          onClick={() => router.push("/admin/posts")}
          className={btnGhostCls}
        >
          Cancel
        </button>
      </div>
    </form>
  );
}
