"use client";

import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { toast } from "sonner";

import { deleteCommentAction } from "@/server/comments/actions";

/**
 * Client hook that wraps the deleteCommentAction Server Action: submits, shows
 * a toast, and calls router.refresh() so the server-rendered comment list
 * re-renders without the deleted comment.
 *
 * `isDeleting` tracks the in-flight request (for disabling the confirm button),
 * while `isPending` covers the subsequent router refresh.
 */
export function useDeleteComment() {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [isDeleting, setIsDeleting] = useState(false);

  async function remove(commentId: string): Promise<boolean> {
    setIsDeleting(true);
    try {
      const result = await deleteCommentAction({ commentId });

      if (!result.ok) {
        toast.error(result.error);
        return false;
      }

      toast.success("Comment deleted.");
      startTransition(() => router.refresh());
      return true;
    } finally {
      setIsDeleting(false);
    }
  }

  return { remove, isDeleting, isPending };
}
