"use client";

import { useState } from "react";
import { Reply } from "lucide-react";

import { CommentAvatar } from "@/components/features/comments/comment-avatar";
import { CommentComposer } from "@/components/features/comments/comment-composer";
import { usePostComment } from "@/components/features/comments/use-post-comment";
import { relativeTime } from "@/lib/comments-format";
import type { CommentThread, CommentView, Viewer } from "@/types/comments";

function SingleComment({
  comment,
  onReply,
  isReply = false,
}: {
  comment: CommentView;
  onReply?: () => void;
  isReply?: boolean;
}) {
  return (
    <div className="flex gap-3">
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
        </div>
        <p className="mt-1 text-sm leading-relaxed whitespace-pre-wrap break-words text-foreground/90">
          {comment.body}
        </p>
        {onReply && (
          <button
            type="button"
            onClick={onReply}
            className="mt-1.5 inline-flex items-center gap-1 text-xs font-medium text-muted-foreground transition-colors hover:text-foreground"
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
        onReply={viewer ? () => setReplying((v) => !v) : undefined}
      />

      {(thread.replies.length > 0 || replying) && (
        <div className="mt-4 space-y-4 border-l border-border/60 pl-4 sm:ml-11">
          {thread.replies.map((reply) => (
            <SingleComment key={reply.id} comment={reply} isReply />
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
