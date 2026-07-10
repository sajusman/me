"use client";

import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { toast } from "sonner";

import { postCommentAction, postReplyAction } from "@/server/comments/actions";

/**
 * Client hook that wraps the postComment / postReply Server Actions: submits,
 * shows a toast, and calls router.refresh() so the server-rendered comment list
 * re-renders with the new comment.
 */
export function usePostComment(postSlug: string) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  async function submit(
    body: string,
    parentId: string | null,
  ): Promise<boolean> {
    const result = parentId
      ? await postReplyAction({ postSlug, body, parentId })
      : await postCommentAction({ postSlug, body });

    if (!result.ok) {
      toast.error(result.error);
      return false;
    }

    toast.success(parentId ? "Reply posted." : "Comment posted.");
    // Re-render the server components (the list) to include the new comment.
    startTransition(() => router.refresh());
    return true;
  }

  return { submit, isPending };
}
