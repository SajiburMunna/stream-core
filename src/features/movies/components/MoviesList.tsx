"use client";

import { useEffect, useMemo, useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { PageHeader } from "@/features/shared/components/PageHeader";
import { ChannelCard } from "@/features/shared/components/ChannelCard";
import { Button } from "@/components/ui/button";

type Movie = {
  id: string;
  name: string;
  url: string;
  tvgLogo?: string;
};

function MoviesListContent() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const searchParams = useSearchParams();
  const q = (searchParams.get("q") ?? "").toLowerCase();
  const [page, setPage] = useState(1);
  const pageSize = 12;
  const router = useRouter();

  useEffect(() => {
    async function load() {
      try {
        const res = await fetch("/api/movies");
        if (!res.ok) throw new Error("Failed to fetch movies");
        const data = await res.json();
        setMovies(data.movies ?? []);
      } catch (e) {
        setError(e instanceof Error ? e.message : "Failed to load movies");
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  const filtered = useMemo(() => {
    if (!q) return movies;
    return movies.filter((m) => m.name?.toLowerCase().includes(q));
  }, [movies, q]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize));
  const currentPage = Math.min(page, totalPages);
  const paged = useMemo(() => {
    const start = (currentPage - 1) * pageSize;
    return filtered.slice(start, start + pageSize);
  }, [filtered, currentPage]);

  return (
    <div className="space-y-6">
      <PageHeader title="Movies" subtitle="Bangla Movies playlists" />
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
          {filtered.length === 0 ? (
            <div className="text-sm text-zinc-400">
              No movies found. Try a different search.
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {paged.map((m) => (
                <div
                  key={m.id}
                  onClick={() =>
                    router.push(
                      `/watch?url=${encodeURIComponent(
                        m.url
                      )}&name=${encodeURIComponent(m.name)}`
                    )
                  }
                  className="cursor-pointer"
                >
                  <ChannelCard
                    title={m.name}
                    thumbnail={
                      m.tvgLogo ||
                      `https://picsum.photos/seed/${encodeURIComponent(
                        m.url
                      )}/800/450`
                    }
                    viewers={Math.floor(Math.random() * 20000) + 1000}
                  />
                  <div className="mt-2 flex items-center justify-end">
                    <a
                      href={`/api/download?url=${encodeURIComponent(
                        m.url
                      )}&name=${encodeURIComponent(m.name)}.mp4`}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <Button variant="outline" size="sm">
                        Download
                      </Button>
                    </a>
                  </div>
                </div>
              ))}
            </div>
          )}
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

export function MoviesList() {
  return (
    <Suspense
      fallback={
        <div className="space-y-6">
          <PageHeader title="Movies" subtitle="Bangla Movies playlists" />
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
      <MoviesListContent />
    </Suspense>
  );
}
