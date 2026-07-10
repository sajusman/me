"use client";

import { useState } from "react";
import { Loader2, MoreHorizontal, Trash2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { useDeleteComment } from "@/components/features/comments/use-delete-comment";

/**
 * Per-comment actions menu for the comment's author. Currently just deletion,
 * gated behind a confirmation dialog so a stray click can't destroy a thread.
 *
 * `isReply` tunes the confirmation copy (deleting a top-level comment also
 * removes its replies).
 */
export function CommentActions({
  commentId,
  isReply = false,
}: {
  commentId: string;
  isReply?: boolean;
}) {
  const [confirmOpen, setConfirmOpen] = useState(false);
  const { remove, isDeleting } = useDeleteComment();

  async function handleConfirm() {
    const ok = await remove(commentId);
    if (ok) setConfirmOpen(false);
  }

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger
          render={
            <Button
              variant="ghost"
              size="icon-xs"
              className="text-muted-foreground hover:text-foreground"
              aria-label="Comment actions"
            />
          }
        >
          <MoreHorizontal />
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem
            variant="destructive"
            className="cursor-pointer"
            onClick={() => setConfirmOpen(true)}
          >
            <Trash2 />
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <AlertDialog open={confirmOpen} onOpenChange={setConfirmOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              {isReply ? "Delete this reply?" : "Delete this comment?"}
            </AlertDialogTitle>
            <AlertDialogDescription>
              {isReply
                ? "This reply will be permanently removed. This cannot be undone."
                : "This comment and all of its replies will be permanently removed. This cannot be undone."}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={isDeleting}>Cancel</AlertDialogCancel>
            {/* Keep the dialog open until the action resolves. */}
            <Button
              variant="destructive"
              disabled={isDeleting}
              onClick={handleConfirm}
            >
              {isDeleting ? (
                <>
                  <Loader2 className="animate-spin" />
                  Deleting…
                </>
              ) : (
                "Delete"
              )}
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
