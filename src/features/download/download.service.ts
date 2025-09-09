function safeFilename(input: string): string {
  const base = input.replace(/[^a-z0-9\-_.\s]/gi, "_").trim();
  return base.length ? base : "streamcore-file";
}

export class DownloadService {
  async downloadFile(url: string, name?: string): Promise<Response> {
    try {
      if (!url) {
        throw new Error("Missing url");
      }

      const parsed = new URL(url);
      if (!/^https?:$/.test(parsed.protocol)) {
        throw new Error("Invalid protocol");
      }

      const upstream = await fetch(url, {
        headers: {
          "User-Agent": "StreamCore/1.0 (Downloader)",
          Accept: "*/*",
        },
      });

      if (!upstream.ok || !upstream.body) {
        throw new Error("Upstream error");
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
    } catch (error) {
      throw new Error("Download failed");
    }
  }
}
