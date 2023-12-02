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
import { StarIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { Icons } from "../icons";
import Link from "next/link";

import { account, ID } from "@/appwrite";

function UserButton({ session }: { session: Session | null }) {
  const [loggedInUser, setLoggedInUser] = useState<any>(null);

  useEffect(() => {
    const fetchLoggedInUser = async () => {
      if (!session && !loggedInUser) {
        setLoggedInUser(await account.get());
      }
    };

    fetchLoggedInUser();
  }, [session, loggedInUser]);

  const logout = async () => {
    await account.deleteSession("current");
    setLoggedInUser(null);
  };

  if (!session && !loggedInUser) {
    return (
      <DropdownMenu>
        <DropdownMenuTrigger> Sign In</DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel>
            <Link href="/login">
              <Button variant={"outline"}>
                <Icons.logo className="mr-2 h-4 w-4" />
                Sign in with Email{" "}
              </Button>
            </Link>
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuLabel>
            <Button variant={"outline"} onClick={() => signIn()}>
              <Icons.google className="mr-2 h-4 w-4" /> Sign in with Google
            </Button>
          </DropdownMenuLabel>
        </DropdownMenuContent>
      </DropdownMenu>
    );
  }

  return (
    <>
      {session ? (
        <DropdownMenu>
          <DropdownMenuTrigger>
            <UserAvatar
              name={session?.user?.name}
              image={session?.user?.image}
            />
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuLabel>{session?.user?.name}</DropdownMenuLabel>
            <DropdownMenuSeparator />

            <DropdownMenuLabel className="text-xs flex items-center justify-center space-x-1 text-"></DropdownMenuLabel>
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
            <DropdownMenuItem onClick={() => signOut()}>
              Sign Out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ) : (
        <DropdownMenu>
          <DropdownMenuTrigger>Hello, {loggedInUser.name}</DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuLabel>{loggedInUser.email}</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={logout}>Logout</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )}
    </>
  );
}

export default UserButton;
