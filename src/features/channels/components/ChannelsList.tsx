"use client";

import { useEffect, useMemo, useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { PageHeader } from "@/features/shared/components/PageHeader";
import { ChannelCard } from "@/features/shared/components/ChannelCard";
import { Button } from "@/components/ui/button";

type Channel = {
  id: string;
  name: string;
  url: string;
  tvgLogo?: string;
};

function ChannelsListContent() {
  const [channels, setChannels] = useState<Channel[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const searchParams = useSearchParams();
  const [page, setPage] = useState(1);
  const pageSize = 12;
  const router = useRouter();

  useEffect(() => {
    async function load() {
      try {
        const res = await fetch("/api/channels");
        if (!res.ok) throw new Error("Failed to fetch channels");
        const data = await res.json();
        setChannels(data.channels ?? []);
      } catch (e: any) {
        setError(e?.message || "Failed to load channels");
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  const q = (searchParams.get("q") ?? "").toLowerCase();
  const filtered = useMemo(() => {
    if (!q) return channels;
    return channels.filter((c) => c.name?.toLowerCase().includes(q));
  }, [channels, q]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize));
  const currentPage = Math.min(page, totalPages);
  const paged = useMemo(() => {
    const start = (currentPage - 1) * pageSize;
    return filtered.slice(start, start + pageSize);
  }, [filtered, currentPage]);

  return (
    <div className="space-y-6">
      <PageHeader
        title="Live Channels"
        subtitle="Browse all available streams"
      />
      {error ? <div className="text-sm text-red-400">{error}</div> : null}
      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {Array.from({ length: pageSize }).map((_, i) => (
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
        <>
          <div className="text-xs text-zinc-500">{filtered.length} results</div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {paged.map((c) => (
              <div
                key={c.id}
                onClick={() =>
                  router.push(
                    `/watch?url=${encodeURIComponent(
                      c.url
                    )}&name=${encodeURIComponent(c.name)}`
                  )
                }
                className="cursor-pointer"
              >
                <ChannelCard
                  title={c.name}
                  thumbnail={
                    c.tvgLogo ||
                    `https://picsum.photos/seed/${encodeURIComponent(
                      c.url
                    )}/800/450`
                  }
                  viewers={Math.floor(Math.random() * 20000) + 1000}
                />
              </div>
            ))}
          </div>
          <div className="flex items-center justify-center gap-2 pt-2">
            <Button
              variant="secondary"
              size="sm"
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={currentPage === 1}
            >
              Prev
            </Button>
            <div className="text-xs text-zinc-400">
              Page {currentPage} of {totalPages}
            </div>
            <Button
              variant="secondary"
              size="sm"
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
            >
              Next
            </Button>
          </div>
        </>
      )}
    </div>
  );
}

export function ChannelsList() {
  return (
    <Suspense
      fallback={
        <div className="space-y-6">
          <PageHeader
            title="Live Channels"
            subtitle="Browse all available streams"
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {Array.from({ length: 12 }).map((_, i) => (
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
        </div>
      }
    >
      <ChannelsListContent />
    </Suspense>
  );
}
