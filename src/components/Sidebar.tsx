"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Radio, CirclePause, Settings, User, Film } from "lucide-react";
import { motion } from "framer-motion";
import Image from "next/image";

const items = [
  { href: "/channels", label: "Live Channels", icon: Radio },
  { href: "/movies", label: "Movies", icon: Film },
  { href: "/recordings", label: "Recordings", icon: CirclePause },
  { href: "/settings", label: "Settings", icon: Settings },
  { href: "/profile", label: "Profile", icon: User },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="hidden md:flex md:fixed md:inset-y-0 md:left-0 md:w-64 md:shrink-0 md:flex-col border-r border-zinc-800 bg-zinc-950/40 backdrop-blur-sm">
      <div className="px-4 py-4">
        <Link href="/" className="flex items-center">
          <Image
            src="/streamcore-logo.png"
            alt="StreamCore"
            width={200}
            height={40}
            className="max-w-full h-10 object-cover"
            priority
          />
        </Link>
      </div>
      <nav className="flex-1 px-2 py-2">
        <ul className="space-y-1">
          {items.map(({ href, label, icon: Icon }) => {
            const active = pathname === href;
            return (
              <li key={href}>
                <Link
                  href={href}
                  className={cn(
                    "group relative flex items-center gap-3 rounded-xl px-3 py-2 text-sm text-zinc-300 hover:text-zinc-100 transition-colors",
                    active
                      ? "bg-zinc-900 text-zinc-100"
                      : "hover:bg-zinc-900/60"
                  )}
                >
                  <Icon className="h-4 w-4" />
                  <span>{label}</span>
                  {active && (
                    <>
                      <motion.span
                        layoutId="active-pill"
                        className="absolute inset-0 -z-10 rounded-xl bg-zinc-900"
                        transition={{
                          type: "spring",
                          stiffness: 400,
                          damping: 30,
                        }}
                      />
                      <span className="pointer-events-none absolute -inset-px -z-20 rounded-xl bg-gradient-to-r from-teal-500/20 to-indigo-500/20 blur" />
                    </>
                  )}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </aside>
  );
}
