import { NextResponse } from "next/server";

function safeFilename(input: string): string {
  const base = input.replace(/[^a-z0-9\-_.\s]/gi, "_").trim();
  return base.length ? base : "streamcore-file";
}

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const url = searchParams.get("url");
    const name = searchParams.get("name") ?? "";
    if (!url) {
      return NextResponse.json({ error: "Missing url" }, { status: 400 });
    }
    const parsed = new URL(url);
    if (!/^https?:$/.test(parsed.protocol)) {
      return NextResponse.json({ error: "Invalid protocol" }, { status: 400 });
    }

    const upstream = await fetch(url, {
      headers: {
        "User-Agent": "StreamCore/1.0 (Downloader)",
        Accept: "*/*",
      },
    });
    if (!upstream.ok || !upstream.body) {
      return NextResponse.json({ error: "Upstream error" }, { status: 502 });
    }

    const contentType =
      upstream.headers.get("content-type") ?? "application/octet-stream";
    const dispositionName = safeFilename(
      name || parsed.pathname.split("/").pop() || "streamcore-file"
    );
    const headers = new Headers();
    headers.set("Content-Type", contentType);
    headers.set(
      "Content-Disposition",
      `attachment; filename="${dispositionName}"`
    );
    // Prevent caching to avoid stale or blocked downloads
    headers.set("Cache-Control", "no-store");

    return new Response(upstream.body, {
      status: 200,
      headers,
    });
  } catch {
    return NextResponse.json({ error: "Download failed" }, { status: 500 });
  }
}
