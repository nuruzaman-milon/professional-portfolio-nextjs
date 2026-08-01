"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Plus, Pencil, Trash2 } from "lucide-react";
import { cardCls, btnPrimaryCls } from "@/components/admin/ui";

type Row = {
  _id: string;
  company: string;
  role: string;
  period: string;
  sortOrder: number;
  published: boolean;
};

export default function AdminExperiencesPage() {
  const [experiences, setExperiences] = useState<Row[] | null>(null);
  const [error, setError] = useState("");

  const load = async () => {
    const res = await fetch("/api/experiences");
    if (!res.ok) {
      const data = await res.json().catch(() => ({}));
      setError(data.error || "Failed to load experiences.");
      setExperiences([]);
      return;
    }
    setExperiences(await res.json());
  };

  useEffect(() => {
    load();
  }, []);

  const handleDelete = async (row: Row) => {
    if (!confirm(`Delete "${row.company} — ${row.role}"?`)) return;
    const res = await fetch(`/api/experiences/${row._id}`, {
      method: "DELETE",
    });
    if (res.ok) load();
    else alert("Failed to delete.");
  };

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-3 mb-8">
        <h1 className="pf-serif text-3xl md:text-4xl font-normal text-gray-900 dark:text-white">
          Work Experience
        </h1>
        <Link href="/admin/experiences/new" className={btnPrimaryCls}>
          <Plus size={14} /> Add experience
        </Link>
      </div>

      {error && (
        <div className={`${cardCls} p-5 mb-5 text-sm text-amber-600 dark:text-amber-400`}>
          {error}
        </div>
      )}

      {experiences === null ? (
        <p className="text-sm text-gray-500 dark:text-gray-400">Loading…</p>
      ) : experiences.length === 0 && !error ? (
        <div className={`${cardCls} p-8 text-center text-sm text-gray-500 dark:text-gray-400`}>
          No experiences in the database yet. Use{" "}
          <Link href="/admin" className="text-emerald-500 hover:underline">
            Import existing content
          </Link>{" "}
          or add one.
        </div>
      ) : (
        <div className="space-y-3">
          {experiences.map((exp) => (
            <div
              key={exp._id}
              className={`${cardCls} p-4 sm:p-5 flex flex-wrap items-center gap-3`}
            >
              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-center gap-2 mb-1">
                  <h2 className="text-sm font-bold text-gray-900 dark:text-white">
                    {exp.company}
                  </h2>
                  <span className="text-xs font-mono text-emerald-600 dark:text-emerald-400">
                    {exp.role}
                  </span>
                  {!exp.published && (
                    <span className="px-2 py-0.5 rounded text-[10px] font-mono uppercase tracking-wide bg-amber-100 dark:bg-amber-500/10 text-amber-600 dark:text-amber-400">
                      Hidden
                    </span>
                  )}
                </div>
                <p className="text-xs text-gray-500 dark:text-gray-400 font-mono">
                  {exp.period}
                </p>
              </div>
              <div className="flex items-center gap-2 flex-shrink-0">
                <Link
                  href={`/admin/experiences/${exp._id}`}
                  aria-label="Edit"
                  className="soc !w-8 !h-8"
                >
                  <Pencil size={13} />
                </Link>
                <button
                  onClick={() => handleDelete(exp)}
                  aria-label="Delete"
                  className="soc !w-8 !h-8 hover:!text-red-500 hover:!border-red-300/50"
                >
                  <Trash2 size={13} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
