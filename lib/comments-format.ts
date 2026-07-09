/**
 * Client-safe formatting helpers for the comments UI. No server-only imports —
 * this module is bundled for the browser.
 */

/** Compact relative time, e.g. "just now", "3m", "2h", "5d", then a date. */
export function relativeTime(iso: string): string {
  const then = new Date(iso).getTime();
  const seconds = Math.max(0, Math.round((Date.now() - then) / 1000));

  if (seconds < 45) return "just now";
  const minutes = Math.round(seconds / 60);
  if (minutes < 60) return `${minutes}m`;
  const hours = Math.round(minutes / 60);
  if (hours < 24) return `${hours}h`;
  const days = Math.round(hours / 24);
  if (days < 7) return `${days}d`;

  const date = new Date(iso);
  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year:
      date.getFullYear() === new Date().getFullYear() ? undefined : "numeric",
  });
}

/** Two-letter initials from a username like "Swift-Falcon-4821". */
export function initials(username: string): string {
  const parts = username.split("-").filter(Boolean);
  if (parts.length >= 2) return (parts[0][0] + parts[1][0]).toUpperCase();
  return username.slice(0, 2).toUpperCase();
}

// A palette that reads well in both light and dark themes.
const AVATAR_COLORS = [
  "oklch(0.72 0.15 25)", "oklch(0.72 0.15 60)", "oklch(0.72 0.14 140)",
  "oklch(0.70 0.14 200)", "oklch(0.68 0.16 260)", "oklch(0.70 0.16 320)",
  "oklch(0.74 0.13 100)", "oklch(0.70 0.15 300)",
];

/** Deterministic avatar background color from a seed. */
export function avatarColor(seed: string): string {
  let hash = 0;
  for (let i = 0; i < seed.length; i++) {
    hash = (hash * 31 + seed.charCodeAt(i)) >>> 0;
  }
  return AVATAR_COLORS[hash % AVATAR_COLORS.length];
}
