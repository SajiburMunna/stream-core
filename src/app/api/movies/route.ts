import { NextResponse } from "next/server";
import { parseM3U, type Channel } from "@/lib/m3u";

const MOVIE_SOURCES = [
  "https://raw.githubusercontent.com/abusaeeidx/Movie-Playlist-Auto-update/refs/heads/main/Bangla_Movies_Playlist.m3u",
  "https://raw.githubusercontent.com/abusaeeidx/Movie-Playlist-Auto-update/refs/heads/main/Bangla_Movies_Only.m3u",
];

export async function GET() {
  try {
    const texts = await Promise.all(
      MOVIE_SOURCES.map(async (u) => {
        const res = await fetch(u, {
          next: { revalidate: 3600 },
          headers: {
            // Some CDNs/GitHub raw endpoints require a UA to avoid 403/429
            "User-Agent": "StreamCore/1.0 (MoviesFetcher)",
          },
        });
        if (!res.ok) return "";
        return res.text();
      })
    );

    const all: Channel[] = texts
      .flatMap((t) => parseM3U(t))
      .filter((c) => c.url?.startsWith("http"));

    // Deduplicate by URL
    const seen = new Set<string>();
    const unique = all.filter((c) => {
      if (seen.has(c.url)) return false;
      seen.add(c.url);
      return true;
    });

    return NextResponse.json({ movies: unique });
  } catch {
    return NextResponse.json(
      { error: "Failed to load movies" },
      { status: 500 }
    );
  }
}
