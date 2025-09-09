"use client";

import { useSearchParams } from "next/navigation";
import { Suspense } from "react";
import { HlsPlayer } from "./HlsPlayer";

function VideoPlayerContent() {
  const searchParams = useSearchParams();
  const url = searchParams.get("url");
  const name = searchParams.get("name") || "Stream";

  if (!url) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="text-center">
          <h2 className="text-xl font-semibold text-zinc-100 mb-2">
            No stream selected
          </h2>
          <p className="text-zinc-400">
            Please select a channel or movie to start watching.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="bg-zinc-900/50 rounded-lg p-4">
        <h1 className="text-xl font-semibold text-zinc-100 mb-2">{name}</h1>
        <div className="aspect-video bg-black rounded-lg overflow-hidden">
          <HlsPlayer
            src={url}
            className="w-full h-full object-contain"
            autoPlay={true}
            controls={true}
          />
        </div>
      </div>
    </div>
  );
}

export function VideoPlayer() {
  return (
    <Suspense
      fallback={
        <div className="space-y-4">
          <div className="bg-zinc-900/50 rounded-lg p-4">
            <h1 className="text-xl font-semibold text-zinc-100 mb-2">
              Loading...
            </h1>
            <div className="aspect-video bg-black rounded-lg overflow-hidden flex items-center justify-center">
              <div className="text-zinc-400">Loading player...</div>
            </div>
          </div>
        </div>
      }
    >
      <VideoPlayerContent />
    </Suspense>
  );
}
