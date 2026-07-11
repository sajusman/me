import { after } from "next/server";
import { headers } from "next/headers";

import { REF_URL_HEADER } from "@/lib/ref-header";
import { getSessionId } from "@/lib/session";
import { normalizeRef, recordReferralOpen } from "@/server/referrals/referral";

/**
 * Server-only component that records a referral open for the `?ref=` param.
 *
 * It renders nothing. It reads the incoming URL (forwarded by proxy.ts via the
 * REF_URL_HEADER, since layouts don't receive `searchParams`) and the session id
 * *during render* — request-time APIs like cookies/headers can't be called
 * inside `after`. It then schedules the DB write with `after()` so it runs after
 * the response is sent: never blocking paint, but reliably executed (the
 * platform keeps the invocation alive until the promise settles).
 *
 * Because it reads request data, it must be rendered inside a `<Suspense>`
 * boundary so the rest of the page can still be prerendered into a static shell
 * (Cache Components).
 *
 * Note: on a visitor's very first request the `sid` cookie is set on the
 * *response* by proxy.ts, so `getSessionId()` returns null and that first hit
 * isn't recorded. Subsequent requests are.
 */
export async function RefTracker() {
  const headerList = await headers();

  const url = headerList.get(REF_URL_HEADER);
  if (!url) return null;

  const search = url.includes("?") ? url.slice(url.indexOf("?")) : "";
  const raw = new URLSearchParams(search).get("ref");
  const ref = normalizeRef(raw);
  if (!ref) return null;

  const path = url.includes("?") ? url.slice(0, url.indexOf("?")) : url;

  const sessionId = await getSessionId();
  if (!sessionId) return null;

  after(() => recordReferralOpen({ sessionId, ref, path }));

  return null;
}
