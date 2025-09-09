"use client";

import { useRouter } from "next/navigation";
import { VideoPlayer } from "@/features/player/components/VideoPlayer";
import { PageHeader } from "@/features/shared/components/PageHeader";
import { Button } from "@/components/ui/button";

export default function WatchPage() {
  const router = useRouter();

  return (
    <div className="space-y-6">
      <PageHeader
        title="Watch"
        right={<Button onClick={() => router.back()}>Back</Button>}
      />
      <VideoPlayer />
    </div>
  );
}
