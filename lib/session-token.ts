/**
 * Signs and verifies the session cookie value using HMAC-SHA256 via the Web
 * Crypto API.
 *
 * This module is intentionally free of `server-only` and of any Node-specific
 * or global state so it can run in BOTH proxy.ts and normal server code. The
 * signing secret is passed in by the caller (read from env at the edge).
 *
 * Cookie value shape: `<sessionId>.<base64url(hmac)>`. Because the HMAC is keyed
 * by a server-only secret, a client cannot forge a session id.
 */

export const SESSION_COOKIE = "sid";
// ~1 year — the identity should feel sticky across sessions on this device.
export const SESSION_COOKIE_MAX_AGE = 60 * 60 * 24 * 365;

function toBase64Url(bytes: ArrayBuffer): string {
  const arr = new Uint8Array(bytes);
  let binary = "";
  for (const b of arr) binary += String.fromCharCode(b);
  return btoa(binary).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}

async function hmac(secret: string, value: string): Promise<string> {
  const key = await crypto.subtle.importKey(
    "raw",
    new TextEncoder().encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"],
  );
  const sig = await crypto.subtle.sign(
    "HMAC",
    key,
    new TextEncoder().encode(value),
  );
  return toBase64Url(sig);
}

/** Generates a fresh random session id. */
export function newSessionId(): string {
  return crypto.randomUUID();
}

/** Builds the signed cookie value for a session id. */
export async function signSession(
  sessionId: string,
  secret: string,
): Promise<string> {
  const signature = await hmac(secret, sessionId);
  return `${sessionId}.${signature}`;
}

/**
 * Verifies a signed cookie value and returns the session id, or null if it is
 * missing, malformed, or the signature does not match. Uses a constant-time
 * comparison to avoid signature timing attacks.
 */
export async function verifySession(
  raw: string | undefined,
  secret: string,
): Promise<string | null> {
  if (!raw) return null;

  const separator = raw.lastIndexOf(".");
  if (separator <= 0) return null;

  const sessionId = raw.slice(0, separator);
  const provided = raw.slice(separator + 1);

  if (!/^[0-9a-f-]{36}$/i.test(sessionId)) return null;

  const expected = await hmac(secret, sessionId);
  if (!timingSafeEqual(provided, expected)) return null;

  return sessionId;
}

function timingSafeEqual(a: string, b: string): boolean {
  if (a.length !== b.length) return false;
  let mismatch = 0;
  for (let i = 0; i < a.length; i++) {
    mismatch |= a.charCodeAt(i) ^ b.charCodeAt(i);
  }
  return mismatch === 0;
}
