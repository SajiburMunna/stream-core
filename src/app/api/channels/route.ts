import { NextResponse } from "next/server";
import { parseM3U, type Channel } from "@/lib/m3u";

const SOURCES = [
  //   "https://raw.githubusercontent.com/abusaeeidx/IPTV-Scraper-Zilla/refs/heads/main/CricHD.m3u",
  //   "https://raw.githubusercontent.com/abusaeeidx/Toffee-playlist/refs/heads/main/ott_navigator.m3u",
  "https://raw.githubusercontent.com/abusaeeidx/T-Sports-Playlist-Auto-Update/refs/heads/main/combine_playlist.m3u",
  "https://raw.githubusercontent.com/FunctionError/PiratesTv/refs/heads/main/combined_playlist.m3u",
  "https://raw.githubusercontent.com/abusaeeidx/Ayna-Playlists-free-Version/refs/heads/main/playlist.m3u",
];

export async function GET() {
  try {
    const texts = await Promise.all(
      SOURCES.map(async (u) => {
        const res = await fetch(u, { next: { revalidate: 3600 } });
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

    return NextResponse.json({ channels: unique });
  } catch {
    return NextResponse.json(
      { error: "Failed to load channels" },
      { status: 500 }
    );
  }
}
