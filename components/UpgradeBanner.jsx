"use client";

import { useSubscriptionStore } from "@/store/SubscriptionStore";
import { useRouter } from "next/navigation";
import { Button } from "./ui/button";

function UpgradeBanner() {
  const subscription = useSubscriptionStore((state) => state.subscription);
  //   const isPro = subscription?.role === "pro";
  const router = useRouter();

  //   if (subscription === undefined || isPro) return null;

  return (
    <Button
      onClick={() => router.push("/register")}
      className="w-full rounded-none text-center text-white px-5 py-2 bg-gradient-to-r from-[#5cb6fc] to-[#dccca3] hover:from-[#dccca3] hover:to-[#5cb6fc] hover:shadow-md hover:opacity-75 transition-all"
    >
      Don't Upgrade if you want to fall behind!
    </Button>
  );
}

export default UpgradeBanner;
