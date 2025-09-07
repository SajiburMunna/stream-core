"use client";
import { useEffect, useState } from "react";
import { ChannelCard } from "@/components/ChannelCard";

const demo = [
  {
    title: "News 24 / Global",
    thumbnail:
      "https://images.unsplash.com/photo-1581056771100-24ca5f033842?q=80&w=1280&auto=format&fit=crop",
    viewers: 12450,
  },
  {
    title: "Nature Live",
    thumbnail:
      "https://images.unsplash.com/photo-1528821154947-1aa3d1b7495e?q=80&w=1280&auto=format&fit=crop",
    viewers: 8450,
  },
  {
    title: "Sports Central",
    thumbnail:
      "https://images.unsplash.com/photo-1517649763962-0c623066013b?q=80&w=1280&auto=format&fit=crop",
    viewers: 23120,
  },
  {
    title: "Cinema Max",
    thumbnail:
      "https://images.unsplash.com/photo-1524985069026-dd778a71c7b4?q=80&w=1280&auto=format&fit=crop",
    viewers: 5320,
  },
  {
    title: "Retro TV",
    thumbnail:
      "https://images.unsplash.com/photo-1517867065801-079eba6028ce?q=80&w=1280&auto=format&fit=crop",
    viewers: 1920,
  },
  {
    title: "Space Watch",
    thumbnail:
      "https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?q=80&w=1280&auto=format&fit=crop",
    viewers: 11040,
  },
];

export default function Home() {
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 600);
    return () => clearTimeout(t);
  }, []);
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl md:text-3xl font-semibold tracking-tight text-zinc-100">
          Featured Live Channels
        </h1>
        <p className="mt-1 text-sm text-zinc-400">
          Curated picks trending right now on StreamCore.
        </p>
      </div>
      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {Array.from({ length: 6 }).map((_, i) => (
            <div
              key={i}
              className="rounded-2xl border border-zinc-800 bg-zinc-900/40 overflow-hidden"
            >
              <div className="aspect-video w-full skeleton" />
              <div className="p-4 space-y-2">
                <div className="h-4 w-2/3 rounded-md skeleton" />
                <div className="h-3 w-1/3 rounded-md skeleton" />
                <div className="mt-3 h-8 w-full rounded-lg skeleton" />
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {demo.map((c) => (
            <ChannelCard
              key={c.title}
              title={c.title}
              thumbnail={c.thumbnail}
              viewers={c.viewers}
            />
          ))}
        </div>
      )}
    </div>
  );
}
