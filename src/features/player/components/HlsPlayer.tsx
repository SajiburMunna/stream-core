"use client";

import { useEffect, useRef } from "react";
import Hls from "hls.js";

type Props = {
  src: string;
  autoPlay?: boolean;
  controls?: boolean;
  className?: string;
};

export function HlsPlayer({
  src,
  autoPlay = true,
  controls = true,
  className,
}: Props) {
  const videoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    const isHls = /\.m3u8(\?|$)/i.test(src);

    if (isHls) {
      if (video.canPlayType("application/vnd.apple.mpegurl")) {
        video.src = src;
        return;
      }
      if (Hls.isSupported()) {
        const hls = new Hls({ maxLiveSyncPlaybackRate: 1.5 });
        hls.loadSource(src);
        hls.attachMedia(video);
        return () => {
          hls.destroy();
        };
      }
    }
    // Non-HLS or no HLS support: use native playback
    video.src = src;
  }, [src]);

  return (
    <video
      ref={videoRef}
      className={className}
      autoPlay={autoPlay}
      controls={controls}
      playsInline
      muted={false}
    />
  );
}
