"use client";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import UserAvatar from "../UserAvatar";
import { Session } from "next-auth";
import { Button } from "../ui/button";
import { signIn, signOut } from "next-auth/react";
import { useSubscriptionStore } from "@/store/SubscriptionStore";
import LoadingSpinner from "../LoadingSpinner";
import { StarIcon } from "lucide-react";

function UserButton({ session }: { session: Session | null }) {
  // Subscription Listener
  const subscription = useSubscriptionStore((state) => state.subscription);

  if (!session)
    return (
      <Button variant={"outline"} onClick={() => signIn()}>
        Sign In
      </Button>
    );
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <UserAvatar name={session?.user?.name} image={session?.user?.image} />
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>{session?.user?.name}</DropdownMenuLabel>
        <DropdownMenuSeparator />

        {subscription === undefined && (
          <DropdownMenuItem>
            <LoadingSpinner />
          </DropdownMenuItem>
        )}

        <DropdownMenuLabel className="text-xs flex items-center justify-center space-x-1 text-"></DropdownMenuLabel>
        {/* subscription?.role === "Pro"  */}
        {true && (
          <>
            <DropdownMenuLabel className="text-xs flex items-center justify-center space-x-1 text-[#2563EB] animate-pulse">
              <StarIcon fill="#2563EB" />
              <p>PRO</p>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Profile</DropdownMenuItem>
            <DropdownMenuItem>Billing</DropdownMenuItem>
            <DropdownMenuItem>Subscription</DropdownMenuItem>
          </>
        )}
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={() => signOut()}>Sign Out</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default UserButton;
