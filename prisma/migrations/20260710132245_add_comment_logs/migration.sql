-- CreateTable
CREATE TABLE "comment_logs" (
    "id" TEXT NOT NULL,
    "commentId" TEXT,
    "postSlug" TEXT NOT NULL,
    "authorId" TEXT NOT NULL,
    "body" TEXT NOT NULL,
    "action" TEXT NOT NULL DEFAULT 'create',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "comment_logs_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "comment_logs_commentId_idx" ON "comment_logs"("commentId");

-- CreateIndex
CREATE INDEX "comment_logs_authorId_idx" ON "comment_logs"("authorId");

-- CreateIndex
CREATE INDEX "comment_logs_postSlug_createdAt_idx" ON "comment_logs"("postSlug", "createdAt");
