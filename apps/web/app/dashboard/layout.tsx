"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useAuth } from "~/providers/auth-provider";
import { isAuthenticated } from "~/lib/auth";
import { useTheme } from "~/providers/theme-provider";
import {
  Sun,
  Moon,
  LayoutDashboard,
  FileText,
  BarChart3,
  Settings,
  LogOut,
  Plus,
  Loader2,
  ShieldCheck,
  BookOpen,
} from "lucide-react";
import { cn } from "~/lib/utils";
import { Logo } from "~/components/brand/logo";

const nav = [
  { href: "/dashboard", label: "Overview", icon: LayoutDashboard, exact: true },
  { href: "/dashboard/forms/new", label: "New draft", icon: Plus },
  { href: "/dashboard/analytics", label: "Analytics", icon: BarChart3 },
  { href: "/explore", label: "Library", icon: BookOpen },
  { href: "/dashboard/settings", label: "Settings", icon: Settings },
];

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user, isLoading, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const router = useRouter();
  const pathname = usePathname();
  const [tokenChecked, setTokenChecked] = useState(false);

  useEffect(() => {
    setTokenChecked(true);
    if (!isAuthenticated()) {
      router.push("/auth/login");
    }
  }, [router]);

  useEffect(() => {
    if (tokenChecked && !isLoading && !user && !isAuthenticated()) {
      router.push("/auth/login");
    }
  }, [user, isLoading, tokenChecked, router]);

  if (!tokenChecked || isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <Loader2 className="w-5 h-5 animate-spin text-foreground" />
      </div>
    );
  }

  if (!user) return null;

  const isActive = (href: string, exact?: boolean) =>
    exact ? pathname === href : pathname.startsWith(href);

  return (
    <div className="min-h-screen bg-background text-foreground flex">
      {/* Sidebar */}
      <aside className="w-64 bg-sidebar border-r border-sidebar-border flex flex-col fixed h-full">
        <div className="px-6 py-5 border-b border-sidebar-border">
          <Logo />
        </div>

        <div className="px-6 pt-6 pb-3">
          <span className="ef-eyebrow">Workspace</span>
        </div>

        <nav className="px-3 flex-1 space-y-0.5">
          {nav.map((item) => {
            const active = isActive(item.href, item.exact);
            const Icon = item.icon;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center gap-3 px-3 py-2.5 rounded-md text-sm transition-colors",
                  active
                    ? "bg-sidebar-accent text-sidebar-accent-foreground font-medium"
                    : "text-muted-foreground hover:bg-sidebar-accent/60 hover:text-sidebar-accent-foreground",
                )}
              >
                <Icon className="w-4 h-4" />
                {item.label}
                {active && (
                  <span className="ml-auto h-1.5 w-1.5 rounded-full bg-[color:var(--color-sandstone)]" />
                )}
              </Link>
            );
          })}
          {user.role === "admin" && (
            <Link
              href="/dashboard/admin"
              className={cn(
                "flex items-center gap-3 px-3 py-2.5 rounded-md text-sm transition-colors",
                pathname.startsWith("/dashboard/admin")
                  ? "bg-sidebar-accent text-sidebar-accent-foreground font-medium"
                  : "text-muted-foreground hover:bg-sidebar-accent/60 hover:text-sidebar-accent-foreground",
              )}
            >
              <ShieldCheck className="w-4 h-4" />
              Admin
            </Link>
          )}
        </nav>

        <div className="p-4 border-t border-sidebar-border">
          <div className="flex items-center gap-3 mb-4 px-2">
            <div className="w-9 h-9 rounded-md bg-foreground text-background flex items-center justify-center text-sm font-serif">
              {user.fullName[0]}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium truncate">{user.fullName}</p>
              <p className="text-xs text-muted-foreground truncate">
                {user.email}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-1">
            <button
              onClick={toggleTheme}
              className="flex-1 flex items-center justify-center gap-1.5 text-xs text-muted-foreground hover:text-foreground px-2 py-2 rounded-md hover:bg-sidebar-accent/60 transition-colors"
            >
              {theme === "dark" ? (
                <Sun className="w-3.5 h-3.5" />
              ) : (
                <Moon className="w-3.5 h-3.5" />
              )}
              {theme === "dark" ? "Light" : "Dark"}
            </button>
            <button
              onClick={logout}
              className="flex-1 flex items-center justify-center gap-1.5 text-xs text-muted-foreground hover:text-destructive px-2 py-2 rounded-md hover:bg-sidebar-accent/60 transition-colors"
            >
              <LogOut className="w-3.5 h-3.5" />
              Sign out
            </button>
          </div>
        </div>
      </aside>

      {/* Main */}
      <main className="flex-1 ml-64 p-8 min-h-screen">{children}</main>
    </div>
  );
}
