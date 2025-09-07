export type Channel = {
  id: string;
  name: string;
  url: string;
  tvgLogo?: string;
  groupTitle?: string;
};

const M3U_EXTINF_REGEX = /#EXTINF:-?\d+\s*(.*?)\s*,\s*(.*)/;

function parseAttributes(attrText: string): Record<string, string> {
  const attrs: Record<string, string> = {};
  // First extract quoted attributes like tvg-logo="..."
  const quoted = /([A-Za-z0-9_-]+)="([^"]*?)"/g;
  let consumed = attrText;
  let m: RegExpExecArray | null;
  while ((m = quoted.exec(attrText))) {
    attrs[m[1]] = m[2];
    consumed = consumed.replace(m[0], "");
  }
  // Then unquoted attributes like group-title=Sports
  const unquoted = /([A-Za-z0-9_-]+)=([^\s"]+)/g;
  let um: RegExpExecArray | null;
  while ((um = unquoted.exec(consumed))) {
    attrs[um[1]] = um[2];
  }
  return attrs;
}

export function parseM3U(text: string): Channel[] {
  const lines = text.split(/\r?\n/);
  const channels: Channel[] = [];
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    if (line.startsWith("#EXTINF:")) {
      const match = line.match(M3U_EXTINF_REGEX);
      if (!match) continue;
      const attrText = match[1] ?? "";
      let nameAndMaybeUrl = match[2]?.trim() ?? "Unknown";
      const attrs = parseAttributes(attrText);
      // Some playlists place the URL on the same line after the title
      // Try to extract inline URL first, otherwise read the next line
      let inlineUrl: string | undefined;
      const urlMatch = nameAndMaybeUrl.match(/(https?:\/\/\S+)/);
      if (urlMatch) {
        inlineUrl = urlMatch[1];
        nameAndMaybeUrl = nameAndMaybeUrl.replace(urlMatch[1], "").trim();
      }
      const nextLineUrl = lines[i + 1]?.trim();
      const url = inlineUrl || nextLineUrl;
      if (!url || url.startsWith("#")) continue;
      const name = nameAndMaybeUrl || "Unknown";
      const id = `${name}-${url}`.slice(0, 180);
      channels.push({
        id,
        name,
        url,
        tvgLogo: attrs["tvg-logo"] || attrs["logo"] || attrs["tvg_logo"],
        groupTitle: attrs["group-title"],
      });
    }
  }
  return channels;
}
