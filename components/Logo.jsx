"use client";
import Link from "next/link";
import Image from "next/image";
import LogoBlack from "@/public/logoBlack.svg";
import logoWhite from "@/public/logoWhite.svg";
import { AspectRatio } from "./ui/aspect-ratio";
import { useTheme } from "next-themes";

function Logo() {
  const { theme } = useTheme();
  return (
    <Link href="/" prefetch={false} className="overflow-hidden">
      <div className="flex items-center w-72 h-18">
        <AspectRatio
          ratio={16 / 9}
          className="flex items-center justify-center"
        >
          <Image
            priority
            src={theme === "light" ? LogoBlack : logoWhite}
            alt="Logo"
            className="rounded-full"
          />
        </AspectRatio>
      </div>
    </Link>
  );
}

export default Logo;
