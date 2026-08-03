"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  FileText,
  FolderKanban,
  Briefcase,
  Mail,
  DatabaseZap,
  Upload,
} from "lucide-react";
import { cardCls, btnPrimaryCls } from "@/components/admin/ui";

export default function AdminDashboard() {
  const [postCount, setPostCount] = useState<number | null>(null);
  const [projectCount, setProjectCount] = useState<number | null>(null);
  const [experienceCount, setExperienceCount] = useState<number | null>(null);
  const [messageStats, setMessageStats] = useState<{
    total: number;
    unread: number;
  } | null>(null);
  const [dbConnected, setDbConnected] = useState<boolean | null>(null);
  const [seeding, setSeeding] = useState(false);
  const [seedResult, setSeedResult] = useState("");

  const load = async () => {
    const [postsRes, projectsRes, experiencesRes, messagesRes] =
      await Promise.all([
        fetch("/api/posts"),
        fetch("/api/projects"),
        fetch("/api/experiences"),
        fetch("/api/messages"),
      ]);
    if (postsRes.status === 503 || projectsRes.status === 503) {
      setDbConnected(false);
      return;
    }
    setDbConnected(true);
    if (postsRes.ok) setPostCount((await postsRes.json()).length);
    if (projectsRes.ok) setProjectCount((await projectsRes.json()).length);
    if (experiencesRes.ok)
      setExperienceCount((await experiencesRes.json()).length);
    if (messagesRes.ok) {
      const msgs = await messagesRes.json();
      setMessageStats({
        total: msgs.length,
        unread: msgs.filter((m: any) => !m.read).length,
      });
    }
  };

  useEffect(() => {
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSeed = async () => {
    setSeeding(true);
    setSeedResult("");
    const res = await fetch("/api/seed", { method: "POST" });
    const data = await res.json().catch(() => ({}));
    setSeeding(false);
    setSeedResult(data.message || data.error || "Done.");
    load();
  };

  return (
    <div>
      <h1 className="pf-serif text-3xl md:text-4xl font-normal text-gray-900 dark:text-white mb-8">
        Dashboard
      </h1>

      {dbConnected === false && (
        <div className={`${cardCls} p-6 mb-6 border-amber-300/50 dark:border-amber-500/30`}>
          <div className="flex items-start gap-3">
            <DatabaseZap size={18} className="text-amber-500 mt-0.5 flex-shrink-0" />
            <div>
              <h2 className="text-sm font-bold text-gray-900 dark:text-white mb-1">
                Database not connected
              </h2>
              <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
                Set <code className="text-teal-700 dark:text-teal-400 font-mono text-xs">MONGODB_URI</code> in{" "}
                <code className="font-mono text-xs">.env.local</code> (get a free
                cluster at MongoDB Atlas), restart the dev server, then come back
                here and click <strong>Import existing content</strong>. Until
                then the public site keeps serving the static content from{" "}
                <code className="font-mono text-xs">data/</code>.
              </p>
            </div>
          </div>
        </div>
      )}

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
        <Link href="/admin/posts" className={`${cardCls} p-6 hover:border-teal-300/50 dark:hover:border-teal-800/40 transition-colors`}>
          <div className="flex items-center gap-3 mb-2">
            <FileText size={16} className="text-teal-600" />
            <span className="text-[10px] font-mono tracking-[.15em] uppercase text-teal-600 dark:text-teal-400">
              Blog Posts
            </span>
          </div>
          <div className="pf-serif text-4xl text-gray-900 dark:text-white">
            {dbConnected === false ? "—" : (postCount ?? "…")}
          </div>
        </Link>

        <Link href="/admin/projects" className={`${cardCls} p-6 hover:border-teal-300/50 dark:hover:border-teal-800/40 transition-colors`}>
          <div className="flex items-center gap-3 mb-2">
            <FolderKanban size={16} className="text-teal-600" />
            <span className="text-[10px] font-mono tracking-[.15em] uppercase text-teal-600 dark:text-teal-400">
              Projects
            </span>
          </div>
          <div className="pf-serif text-4xl text-gray-900 dark:text-white">
            {dbConnected === false ? "—" : (projectCount ?? "…")}
          </div>
        </Link>

        <Link href="/admin/experiences" className={`${cardCls} p-6 hover:border-teal-300/50 dark:hover:border-teal-800/40 transition-colors`}>
          <div className="flex items-center gap-3 mb-2">
            <Briefcase size={16} className="text-teal-600" />
            <span className="text-[10px] font-mono tracking-[.15em] uppercase text-teal-600 dark:text-teal-400">
              Experience
            </span>
          </div>
          <div className="pf-serif text-4xl text-gray-900 dark:text-white">
            {dbConnected === false ? "—" : (experienceCount ?? "…")}
          </div>
        </Link>

        <Link href="/admin/messages" className={`${cardCls} p-6 hover:border-teal-300/50 dark:hover:border-teal-800/40 transition-colors`}>
          <div className="flex items-center gap-3 mb-2">
            <Mail size={16} className="text-teal-600" />
            <span className="text-[10px] font-mono tracking-[.15em] uppercase text-teal-600 dark:text-teal-400">
              Messages
            </span>
            {messageStats && messageStats.unread > 0 && (
              <span className="ml-auto px-1.5 py-0.5 rounded-full text-[10px] font-bold bg-teal-600 text-white leading-none">
                {messageStats.unread}
              </span>
            )}
          </div>
          <div className="pf-serif text-4xl text-gray-900 dark:text-white">
            {dbConnected === false ? "—" : (messageStats?.total ?? "…")}
          </div>
        </Link>
      </div>

      <div className={`${cardCls} p-6`}>
        <h2 className="text-sm font-bold text-gray-900 dark:text-white mb-2">
          Import existing content
        </h2>
        <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed mb-4">
          Copies the current static content (
          <code className="font-mono text-xs">data/blog.ts</code> and{" "}
          <code className="font-mono text-xs">data/projects.ts</code>) into
          MongoDB. Safe to run more than once — existing entries are never
          overwritten.
        </p>
        <button
          onClick={handleSeed}
          disabled={seeding || dbConnected === false}
          className={btnPrimaryCls}
        >
          <Upload size={14} />
          {seeding ? "Importing…" : "Import existing content"}
        </button>
        {seedResult && (
          <p className="mt-3 text-sm text-teal-700 dark:text-teal-400">
            {seedResult}
          </p>
        )}
      </div>
    </div>
  );
}
