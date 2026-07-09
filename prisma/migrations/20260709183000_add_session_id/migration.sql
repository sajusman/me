-- AlterTable
ALTER TABLE "profiles" ADD COLUMN "sessionId" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "profiles_sessionId_key" ON "profiles"("sessionId");
