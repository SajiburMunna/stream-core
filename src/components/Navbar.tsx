"use client";

import { useEffect, useState, Suspense } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Search, Bell, Sun, Moon } from "lucide-react";
import { useTheme } from "next-themes";
import Image from "next/image";
import { Button } from "@/components/ui/button";

function NavbarContent() {
  const pathname = usePathname();
  const router = useRouter();
  const params = useSearchParams();
  const currentQ = params.get("q") ?? "";
  const [value, setValue] = useState(currentQ);
  const { theme, setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setValue(currentQ);
  }, [currentQ]);

  useEffect(() => {
    const t = setTimeout(() => {
      const q = value.trim();
      const isChannels = pathname.startsWith("/channels");
      const isMovies = pathname.startsWith("/movies");
      if (!q) {
        if (isChannels || isMovies) {
          const sp = new URLSearchParams(params.toString());
          sp.delete("q");
          const base = isMovies ? "/movies" : "/channels";
          router.replace(`${base}${sp.size ? `?${sp.toString()}` : ""}`);
        }
        return;
      }
      if (isChannels || isMovies) {
        const sp = new URLSearchParams(params.toString());
        sp.set("q", q);
        const base = isMovies ? "/movies" : "/channels";
        router.replace(`${base}?${sp.toString()}`);
      } else {
        router.push(`/channels?q=${encodeURIComponent(q)}`);
      }
    }, 300);
    return () => clearTimeout(t);
  }, [value, pathname, router, params]);

  useEffect(() => {
    setMounted(true);
  }, []);
  const currentTheme = (theme === "system" ? resolvedTheme : theme) as
    | "light"
    | "dark"
    | undefined;

  return (
    <header className="sticky top-0 z-20 border-b border-zinc-800 bg-zinc-950/50 backdrop-blur supports-[backdrop-filter]:bg-zinc-950/40">
      <div className="mx-auto max-w-7xl px-4 md:px-6">
        <div className="flex h-14 items-center justify-between gap-4">
          <div className="flex items-center gap-2 md:hidden">
            <Image
              src="/streamcore-logo.png"
              alt="StreamCore"
              width={24}
              height={24}
              className="rounded-sm"
            />
          </div>
          <div className="hidden md:flex items-center gap-2">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-500" />
              <input
                value={value}
                onChange={(e) => setValue(e.target.value)}
                placeholder="Search channels..."
                className="w-[280px] rounded-xl bg-zinc-900/70 border border-zinc-800 pl-9 pr-3 py-2 text-sm text-zinc-200 placeholder:text-zinc-500 outline-none focus:ring-2 focus:ring-teal-500/40"
              />
            </div>
          </div>
          <div className="ml-auto flex items-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              aria-label="Toggle theme"
              onClick={() =>
                setTheme(currentTheme === "dark" ? "light" : "dark")
              }
            >
              {!mounted ? (
                <span className="block h-5 w-5" />
              ) : currentTheme === "dark" ? (
                <Sun className="h-5 w-5 text-zinc-400" />
              ) : (
                <Moon className="h-5 w-5 text-zinc-400" />
              )}
            </Button>
            <Button variant="ghost" size="icon" aria-label="Notifications">
              <Bell className="h-5 w-5 text-zinc-400" />
            </Button>
            <div className="h-8 w-8 overflow-hidden rounded-full border border-zinc-800">
              <Image
                src="/vercel.svg"
                alt="avatar"
                width={32}
                height={32}
                className="object-cover invert"
              />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

export function Navbar() {
  return (
    <Suspense
      fallback={
        <header className="sticky top-0 z-20 border-b border-zinc-800 bg-zinc-950/50 backdrop-blur supports-[backdrop-filter]:bg-zinc-950/40">
          <div className="mx-auto max-w-7xl px-4 md:px-6">
            <div className="flex h-14 items-center justify-between gap-4">
              <div className="flex items-center gap-2 md:hidden">
                <div className="h-6 w-6 rounded-sm bg-zinc-800 animate-pulse" />
              </div>
              <div className="hidden md:flex items-center gap-2">
                <div className="w-[280px] h-9 rounded-xl bg-zinc-800 animate-pulse" />
              </div>
              <div className="ml-auto flex items-center gap-2">
                <div className="h-9 w-9 rounded-md bg-zinc-800 animate-pulse" />
                <div className="h-9 w-9 rounded-md bg-zinc-800 animate-pulse" />
                <div className="h-8 w-8 rounded-full bg-zinc-800 animate-pulse" />
              </div>
            </div>
          </div>
        </header>
      }
    >
      <NavbarContent />
    </Suspense>
  );
}
