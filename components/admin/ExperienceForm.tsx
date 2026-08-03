"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { inputCls, labelCls, cardCls, btnPrimaryCls, btnGhostCls } from "./ui";

export type ExperienceFormData = {
  _id?: string;
  company: string;
  role: string;
  period: string;
  desc: string;
  sortOrder: number;
  published: boolean;
};

const empty: ExperienceFormData = {
  company: "",
  role: "",
  period: "",
  desc: "",
  sortOrder: 0,
  published: true,
};

export default function ExperienceForm({
  initial,
}: {
  initial?: ExperienceFormData;
}) {
  const router = useRouter();
  const isEdit = Boolean(initial?._id);
  const [form, setForm] = useState<ExperienceFormData>(initial ?? empty);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const set = (key: keyof ExperienceFormData, value: any) =>
    setForm((f) => ({ ...f, [key]: value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError("");
    const res = await fetch(
      isEdit ? `/api/experiences/${initial!._id}` : "/api/experiences",
      {
        method: isEdit ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      },
    );
    setSaving(false);
    if (res.ok) {
      router.push("/admin/experiences");
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
          <label className={labelCls}>Company</label>
          <input
            required
            value={form.company}
            onChange={(e) => set("company", e.target.value)}
            placeholder="Bayshore Communication"
            className={inputCls}
          />
        </div>
        <div>
          <label className={labelCls}>Role</label>
          <input
            required
            value={form.role}
            onChange={(e) => set("role", e.target.value)}
            placeholder="Software Engineer"
            className={inputCls}
          />
        </div>
      </div>

      <div>
        <label className={labelCls}>Period</label>
        <input
          required
          value={form.period}
          onChange={(e) => set("period", e.target.value)}
          placeholder="Mar 2023 – Present"
          className={inputCls}
        />
      </div>

      <div>
        <label className={labelCls}>Description</label>
        <textarea
          rows={4}
          value={form.desc}
          onChange={(e) => set("desc", e.target.value)}
          placeholder="What you built and achieved in this role"
          className={`${inputCls} resize-none`}
        />
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
          {saving ? "Saving…" : isEdit ? "Update experience" : "Add experience"}
        </button>
        <button
          type="button"
          onClick={() => router.push("/admin/experiences")}
          className={btnGhostCls}
        >
          Cancel
        </button>
      </div>
    </form>
  );
}
