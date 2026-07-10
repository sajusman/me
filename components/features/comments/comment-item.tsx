"use client";

import { useState } from "react";
import { Reply } from "lucide-react";

import { CommentActions } from "@/components/features/comments/comment-actions";
import { CommentAvatar } from "@/components/features/comments/comment-avatar";
import { CommentComposer } from "@/components/features/comments/comment-composer";
import { usePostComment } from "@/components/features/comments/use-post-comment";
import { relativeTime } from "@/lib/comments-format";
import type { CommentThread, CommentView, Viewer } from "@/types/comments";

function SingleComment({
  comment,
  viewer,
  onReply,
  isReply = false,
}: {
  comment: CommentView;
  viewer: Viewer | null;
  onReply?: () => void;
  isReply?: boolean;
}) {
  const isOwn = viewer?.id === comment.author.id;

  return (
    <div className="group/comment flex gap-3">
      <div className="pt-0.5">
        <CommentAvatar
          username={comment.author.username}
          seed={comment.author.avatarSeed}
          size={isReply ? "sm" : "default"}
        />
      </div>
      <div className="flex-1">
        <div className="flex flex-wrap items-center gap-x-2 gap-y-0.5">
          <span className="text-sm font-medium">{comment.author.username}</span>
          <span className="text-xs text-muted-foreground">
            {relativeTime(comment.createdAt)}
          </span>
          {isOwn && (
            <span className="ml-auto">
              <CommentActions commentId={comment.id} isReply={isReply} />
            </span>
          )}
        </div>
        <p className="mt-1 text-sm leading-relaxed whitespace-pre-wrap wrap-break-word text-foreground/90">
          {comment.body}
        </p>
        {onReply && (
          <button
            type="button"
            onClick={onReply}
            className="mt-1.5 inline-flex cursor-pointer items-center gap-1 text-xs font-medium text-muted-foreground transition-colors hover:text-foreground"
          >
            <Reply className="size-3.5" />
            Reply
          </button>
        )}
      </div>
    </div>
  );
}

export function CommentItem({
  thread,
  viewer,
}: {
  thread: CommentThread;
  viewer: Viewer | null;
}) {
  const [replying, setReplying] = useState(false);
  const { submit } = usePostComment(thread.postSlug);

  return (
    <div className="py-5">
      <SingleComment
        comment={thread}
        viewer={viewer}
        onReply={viewer ? () => setReplying((v) => !v) : undefined}
      />

      {(thread.replies.length > 0 || replying) && (
        <div className="mt-4 space-y-4 border-l border-border/60 pl-4 sm:ml-11">
          {thread.replies.map((reply) => (
            <SingleComment
              key={reply.id}
              comment={reply}
              viewer={viewer}
              isReply
            />
          ))}

          {replying && (
            <CommentComposer
              viewer={viewer}
              compact
              autoFocus
              submitLabel="Reply"
              placeholder={`Reply to ${thread.author.username}…`}
              onCancel={() => setReplying(false)}
              onSubmit={async (body) => {
                const ok = await submit(body, thread.id);
                if (ok) setReplying(false);
                return ok;
              }}
            />
          )}
        </div>
      )}
    </div>
  );
}
