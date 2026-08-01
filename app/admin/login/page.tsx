"use client";

import { useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Lock } from "lucide-react";
import { inputCls, labelCls, cardCls, btnPrimaryCls } from "@/components/admin/ui";

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    const res = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password }),
    });
    setLoading(false);
    if (res.ok) {
      router.replace(searchParams.get("from") || "/admin");
      router.refresh();
    } else {
      const data = await res.json().catch(() => ({}));
      setError(data.error || "Login failed.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className={`${cardCls} w-full max-w-sm p-7`}>
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-lg bg-emerald-50 dark:bg-emerald-500/10 border border-emerald-200/60 dark:border-emerald-500/20 flex items-center justify-center text-emerald-600 dark:text-emerald-400">
          <Lock size={16} />
        </div>
        <div>
          <h1 className="text-base font-bold text-gray-900 dark:text-white">
            Admin Login
          </h1>
          <p className="text-xs text-gray-500 dark:text-gray-400">
            Content management panel
          </p>
        </div>
      </div>

      <label htmlFor="password" className={labelCls}>
        Password
      </label>
      <input
        id="password"
        type="password"
        required
        autoFocus
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="••••••••"
        className={inputCls}
      />

      {error && (
        <p className="mt-3 text-xs text-red-500 dark:text-red-400">{error}</p>
      )}

      <button type="submit" disabled={loading} className={`${btnPrimaryCls} w-full mt-5`}>
        {loading ? "Signing in…" : "Sign in"}
      </button>
    </form>
  );
}

export default function AdminLoginPage() {
  return (
    <div className="pf-mesh pf-noise relative min-h-screen overflow-hidden flex items-center justify-center px-4 pt-16">
      <div className="pf-grid absolute inset-0 z-0" />
      <div className="relative z-10 w-full flex justify-center">
        <Suspense>
          <LoginForm />
        </Suspense>
      </div>
    </div>
  );
}
