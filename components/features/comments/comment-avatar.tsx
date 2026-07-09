import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { avatarColor, initials } from "@/lib/comments-format";

export function CommentAvatar({
  username,
  seed,
  size = "default",
}: {
  username: string;
  seed: string;
  size?: "default" | "sm" | "lg";
}) {
  return (
    <Avatar size={size}>
      <AvatarFallback
        className="font-semibold text-white"
        style={{ backgroundColor: avatarColor(seed) }}
      >
        {initials(username)}
      </AvatarFallback>
    </Avatar>
  );
}
