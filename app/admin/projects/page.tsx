"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Plus, Pencil, Trash2, ExternalLink } from "lucide-react";
import { cardCls, btnPrimaryCls } from "@/components/admin/ui";

type Row = {
  _id: string;
  title: string;
  slug: string;
  label: string;
  sortOrder: number;
  published: boolean;
};

export default function AdminProjectsPage() {
  const [projects, setProjects] = useState<Row[] | null>(null);
  const [error, setError] = useState("");

  const load = async () => {
    const res = await fetch("/api/projects");
    if (!res.ok) {
      const data = await res.json().catch(() => ({}));
      setError(data.error || "Failed to load projects.");
      setProjects([]);
      return;
    }
    setProjects(await res.json());
  };

  useEffect(() => {
    load();
  }, []);

  const handleDelete = async (row: Row) => {
    if (!confirm(`Delete "${row.title}"? This cannot be undone.`)) return;
    const res = await fetch(`/api/projects/${row._id}`, { method: "DELETE" });
    if (res.ok) load();
    else alert("Failed to delete.");
  };

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-3 mb-8">
        <h1 className="pf-serif text-3xl md:text-4xl font-normal text-gray-900 dark:text-white">
          Projects
        </h1>
        <Link href="/admin/projects/new" className={btnPrimaryCls}>
          <Plus size={14} /> New project
        </Link>
      </div>

      {error && (
        <div className={`${cardCls} p-5 mb-5 text-sm text-amber-600 dark:text-amber-400`}>
          {error}
        </div>
      )}

      {projects === null ? (
        <p className="text-sm text-gray-500 dark:text-gray-400">Loading…</p>
      ) : projects.length === 0 && !error ? (
        <div className={`${cardCls} p-8 text-center text-sm text-gray-500 dark:text-gray-400`}>
          No projects in the database yet. Use{" "}
          <Link href="/admin" className="text-teal-600 hover:underline">
            Import existing content
          </Link>{" "}
          or create a new project.
        </div>
      ) : (
        <div className="space-y-3">
          {projects.map((project) => (
            <div
              key={project._id}
              className={`${cardCls} p-4 sm:p-5 flex flex-wrap items-center gap-3`}
            >
              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-center gap-2 mb-1">
                  <h2 className="text-sm font-bold text-gray-900 dark:text-white truncate">
                    {project.title}
                  </h2>
                  {!project.published && (
                    <span className="px-2 py-0.5 rounded text-[10px] font-mono uppercase tracking-wide bg-amber-100 dark:bg-amber-500/10 text-amber-600 dark:text-amber-400">
                      Hidden
                    </span>
                  )}
                </div>
                <p className="text-xs text-gray-500 dark:text-gray-400 font-mono">
                  {project.label || "—"} · /projects/{project.slug}
                </p>
              </div>
              <div className="flex items-center gap-2 flex-shrink-0">
                <Link
                  href={`/projects/${project.slug}`}
                  target="_blank"
                  aria-label="View"
                  className="soc !w-8 !h-8"
                >
                  <ExternalLink size={13} />
                </Link>
                <Link
                  href={`/admin/projects/${project._id}`}
                  aria-label="Edit"
                  className="soc !w-8 !h-8"
                >
                  <Pencil size={13} />
                </Link>
                <button
                  onClick={() => handleDelete(project)}
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
