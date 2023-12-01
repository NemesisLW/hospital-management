import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import Image from "next/image";

function UserAvatar({
  name,
  image,
  className,
}: {
  name?: string | null;
  image?: string | null;
  className?: string;
}) {
  return (
    <Avatar className={cn("bg-white text-black", className)}>
      {image ? (
        <Image
          src={image}
          alt={name || "image"}
          width={40}
          height={40}
          className="rounded-full"
          referrerPolicy="no-referrer"
        />
      ) : (
        <AvatarImage src="https://github.com/nemesisLW.png" alt="@nemesislw" />
      )}

      <AvatarFallback
        delayMs={1000}
        className="dark:bg-white text-black text-lg"
      >
        {(name || "Arghya Dutta")
          .split(" ")
          .map((n) => n[0])
          .join("")}{" "}
      </AvatarFallback>
    </Avatar>
  );
}

export default UserAvatar;
