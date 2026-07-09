import "server-only";

import { PrismaPg } from "@prisma/adapter-pg";

import { PrismaClient } from "@/lib/generated/prisma/client";

/**
 * A single, shared PrismaClient instance.
 *
 * Prisma 7 requires a driver adapter (no more connection URL in the client).
 * We use the `pg` adapter with the pooled Supabase connection (DATABASE_URL,
 * pgbouncer). Migrations use the direct URL — see prisma.config.ts.
 *
 * In dev we cache the client on `globalThis` so Next.js hot-reloads don't open
 * a new connection pool on every reload.
 */
const globalForPrisma = globalThis as unknown as {
  prisma?: PrismaClient;
};

function createPrismaClient(): PrismaClient {
  const connectionString = process.env.DATABASE_URL;
  if (!connectionString) {
    throw new Error("Missing DATABASE_URL environment variable.");
  }
  const adapter = new PrismaPg({ connectionString });
  return new PrismaClient({ adapter });
}

export const prisma = globalForPrisma.prisma ?? createPrismaClient();

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}
