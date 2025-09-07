"use client";

import { useEffect, useMemo, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { HlsPlayer } from "@/components/HlsPlayer";
import { PageHeader } from "@/components/PageHeader";
import { Button } from "@/components/ui/button";

type Channel = {
  id: string;
  name: string;
  url: string;
  tvgLogo?: string;
};

export default function WatchPage() {
  const search = useSearchParams();
  const router = useRouter();
  const url = search.get("url");
  const name = search.get("name") ?? "Stream";
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!url) setError("No stream URL provided.");
  }, [url]);

  const title = useMemo(() => `Watching: ${name}`, [name]);

  return (
    <div className="space-y-6">
      <PageHeader
        title={title}
        right={<Button onClick={() => router.back()}>Back</Button>}
      />
      {error ? (
        <div className="text-sm text-red-400">{error}</div>
      ) : (
        <div className="overflow-hidden rounded-2xl border border-zinc-800 bg-black">
          {url ? <HlsPlayer src={url} className="w-full aspect-video" /> : null}
        </div>
      )}
    </div>
  );
}
