/**
 * Request header the proxy uses to forward the incoming URL (pathname + search)
 * to server components. The root layout reads it to attribute a `?ref=` open,
 * because layouts don't receive `searchParams`.
 *
 * Kept in its own tiny, dependency-free module so proxy.ts can import it without
 * pulling in `server-only` or Prisma.
 */
export const REF_URL_HEADER = "x-ref-url";
