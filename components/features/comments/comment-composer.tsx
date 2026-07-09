"use client";

import { useState } from "react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { CommentAvatar } from "@/components/features/comments/comment-avatar";
import type { Viewer } from "@/types/comments";
import { MAX_BODY_LENGTH } from "@/server/comments/limits";

export function CommentComposer({
  viewer,
  compact = false,
  autoFocus = false,
  submitLabel = "Comment",
  placeholder = "Add a comment…",
  onCancel,
  onSubmit,
}: {
  viewer: Viewer | null;
  compact?: boolean;
  autoFocus?: boolean;
  submitLabel?: string;
  placeholder?: string;
  onCancel?: () => void;
  onSubmit: (body: string) => Promise<boolean>;
}) {
  const [value, setValue] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const remaining = MAX_BODY_LENGTH - value.length;
  const disabled = submitting || value.trim().length === 0 || remaining < 0;

  async function handleSubmit() {
    if (disabled) return;
    setSubmitting(true);
    try {
      const ok = await onSubmit(value.trim());
      if (ok) setValue("");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="flex gap-3">
      {viewer && (
        <div className="pt-0.5">
          <CommentAvatar
            username={viewer.username}
            seed={viewer.avatarSeed}
            size={compact ? "sm" : "default"}
          />
        </div>
      )}

      <div className="flex-1">
        <textarea
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onKeyDown={(e) => {
            if ((e.metaKey || e.ctrlKey) && e.key === "Enter") {
              e.preventDefault();
              void handleSubmit();
            }
            if (e.key === "Escape" && onCancel) onCancel();
          }}
          autoFocus={autoFocus}
          placeholder={placeholder}
          rows={compact ? 2 : 3}
          maxLength={MAX_BODY_LENGTH + 100}
          className={cn(
            "w-full resize-y rounded-lg border border-border bg-background px-3 py-2 text-sm outline-none transition-colors",
            "placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50",
          )}
        />

        <div className="mt-2 flex items-center justify-between gap-3">
          <span
            className={cn(
              "text-xs tabular-nums",
              remaining < 0 ? "text-destructive" : "text-muted-foreground",
            )}
          >
            {remaining < 200 ? `${remaining} left` : ""}
          </span>
          <div className="flex items-center gap-2">
            {onCancel && (
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={onCancel}
                disabled={submitting}
              >
                Cancel
              </Button>
            )}
            <Button
              type="button"
              size="sm"
              onClick={handleSubmit}
              disabled={disabled}
            >
              {submitting ? "Posting…" : submitLabel}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
