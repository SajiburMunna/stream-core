"use client";
import Image from "next/image";

import { useState } from "react";
import { motion } from "framer-motion";
import { Play, Users } from "lucide-react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

type Props = {
  title: string;
  thumbnail?: string;
  viewers: number;
};

export function ChannelCard({ title, thumbnail, viewers }: Props) {
  const placeholder = "/placeholder.png";
  const [imgSrc, setImgSrc] = useState<string>(thumbnail || placeholder);
  return (
    <motion.div
      whileHover={{ y: -4 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
    >
      <Card className="overflow-hidden border-zinc-800/80 shadow-[0_0_0_1px_rgba(24,24,27,0.6),0_8px_30px_rgba(0,0,0,0.2)]">
        <CardHeader className="p-0">
          <div className="relative aspect-video w-full">
            <Image
              src={imgSrc}
              alt={title}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="object-cover"
              unoptimized
              priority
              onError={() => setImgSrc(placeholder)}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
            <div className="pointer-events-none absolute inset-0 opacity-40 mix-blend-screen bg-[radial-gradient(60%_120%_at_50%_-20%,rgba(20,184,166,0.3),transparent),radial-gradient(40%_100%_at_80%_0%,rgba(99,102,241,0.25),transparent)]" />
          </div>
        </CardHeader>
        <CardContent className="pt-3">
          <CardTitle className="text-zinc-100">{title}</CardTitle>
          <div className="mt-1 flex items-center gap-1 text-xs text-zinc-400">
            <Users className="h-3.5 w-3.5" />
            <span>{new Intl.NumberFormat().format(viewers)} watching</span>
          </div>
        </CardContent>
        <CardFooter className="pt-2">
          <Button className="w-full" size="sm" variant="gradient">
            <Play className="mr-2 h-4 w-4" /> Watch Live
          </Button>
        </CardFooter>
      </Card>
    </motion.div>
  );
}
