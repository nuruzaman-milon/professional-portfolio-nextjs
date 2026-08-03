"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  LayoutDashboard,
  FileText,
  FolderKanban,
  Briefcase,
  Mail,
  LogOut,
} from "lucide-react";

const navItems = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/posts", label: "Posts", icon: FileText },
  { href: "/admin/projects", label: "Projects", icon: FolderKanban },
  { href: "/admin/experiences", label: "Experience", icon: Briefcase },
  { href: "/admin/messages", label: "Messages", icon: Mail },
];

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();

  // Login page renders without the admin chrome
  if (pathname === "/admin/login") return <>{children}</>;

  const handleLogout = async () => {
    await fetch("/api/auth/logout", { method: "POST" });
    router.replace("/admin/login");
    router.refresh();
  };

  return (
    <div className="pf-mesh pf-noise relative min-h-screen overflow-hidden pt-16">
      <div className="pf-grid absolute inset-0 z-0" />
      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Admin nav */}
        <div className="flex flex-wrap items-center justify-between gap-3 mb-10">
          <div className="flex flex-wrap items-center gap-2">
            {navItems.map(({ href, label, icon: Icon }) => {
              const active =
                href === "/admin"
                  ? pathname === "/admin"
                  : pathname.startsWith(href);
              return (
                <Link
                  key={href}
                  href={href}
                  className={`inline-flex items-center gap-2 px-3.5 py-2 rounded-lg text-sm transition-colors duration-200 border ${
                    active
                      ? "border-teal-400/60 dark:border-teal-700/50 text-teal-700 dark:text-teal-400 bg-teal-50/60 dark:bg-teal-600/[0.06] font-semibold"
                      : "border-gray-200/70 dark:border-white/[0.08] text-gray-600 dark:text-gray-300 bg-white/70 dark:bg-white/[0.04] hover:border-teal-300/50 hover:text-teal-700 dark:hover:text-teal-400"
                  }`}
                >
                  <Icon size={14} />
                  {label}
                </Link>
              );
            })}
          </div>
          <button
            onClick={handleLogout}
            className="inline-flex items-center gap-2 px-3.5 py-2 rounded-lg text-sm text-gray-500 dark:text-gray-400 border border-gray-200/70 dark:border-white/[0.08] bg-white/70 dark:bg-white/[0.04] hover:border-red-300/50 hover:text-red-500 transition-colors duration-200"
          >
            <LogOut size={14} />
            Logout
          </button>
        </div>

        {children}
      </div>
    </div>
  );
}
