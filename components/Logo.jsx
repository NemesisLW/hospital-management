"use client";
import Link from "next/link";
import { AspectRatio } from "./ui/aspect-ratio";
import { useTheme } from "next-themes";
import { Montserrat } from "next/font/google";

const montserrat = Montserrat({ weight: ["700"], subsets: ["latin"] });

function Logo() {
  const { theme } = useTheme();
  return (
    <Link href="/" prefetch={false} className="overflow-hidden">
      <div className="flex items-center w-72 h-18">
        <AspectRatio
          ratio={16 / 9}
          className="flex items-center justify-center"
        >
          <p
            class="text-7xl font-bold text-gray-900 dark:text-white"
            className={montserrat.className}
          >
            HMS
          </p>
        </AspectRatio>
      </div>
    </Link>
  );
}

export default Logo;
