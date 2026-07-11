-- CreateTable
CREATE TABLE "referrals" (
    "id" TEXT NOT NULL,
    "sessionId" TEXT NOT NULL,
    "ref" TEXT NOT NULL,
    "path" TEXT NOT NULL,
    "openCount" INTEGER NOT NULL DEFAULT 1,
    "firstOpenedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "lastOpenedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "referrals_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "referrals_ref_lastOpenedAt_idx" ON "referrals"("ref", "lastOpenedAt");

-- CreateIndex
CREATE UNIQUE INDEX "referrals_sessionId_ref_key" ON "referrals"("sessionId", "ref");
