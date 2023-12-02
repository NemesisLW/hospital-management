"use client";

import * as React from "react";

import { cn } from "@/lib/utils";
import { Icons } from "@/components/icons";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { useToast } from "./ui/use-toast";

import { redirect } from "next/navigation";

import { account, databases, ID } from "@/appwrite";

interface UserAuthFormProps extends React.HTMLAttributes<HTMLDivElement> {
  submitType: authType;
}

export function UserAuthForm({
  className,
  submitType,
  ...props
}: UserAuthFormProps) {
  const { toast } = useToast();

  const [isLoading, setIsLoading] = React.useState<boolean>(false);

  const [loggedInUser, setLoggedInUser] = React.useState<any>(null);
  const [email, setEmail] = React.useState<string>("");
  const [password, setPassword] = React.useState<string>("");
  const [name, setName] = React.useState<string>("");
  const [role, setRole] = React.useState<string>("");

  async function onSubmit(event: React.SyntheticEvent) {
    event.preventDefault();

    if (submitType === "login") {
      await login(email, password);
    } else if (submitType === "register") {
      await register();
    }
  }

  const login = async (email: any, password: any) => {
    const session = await account.createEmailSession(email, password);
    setLoggedInUser(await account.get());
  };

  const register = async () => {
    await account.create(ID.unique(), email, password, name);
    await databases.createDocument(
      process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID!,
      process.env.NEXT_PUBLIC_APPWRITE_USERS_COLLECTION_ID!,
      ID.unique(),
      {
        name: name,
        role: role,
      }
    );
    login(email, password);
  };

  if (loggedInUser) {
    toast({
      title: `Logged in as ${loggedInUser.name}`,
      description: "Redirecting to home page...",
    });

    redirect("/");
  }

  return (
    <div className={cn("grid gap-6", className)} {...props}>
      <form onSubmit={onSubmit}>
        <div className="grid gap-2">
          <div className="grid gap-2 pb-2">
            <Label className="sr-only" htmlFor="email">
              Email
            </Label>
            <Input
              id="email"
              placeholder="name@example.com"
              type="email"
              autoCapitalize="none"
              autoComplete="email"
              autoCorrect="off"
              disabled={isLoading}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <Label className="sr-only" htmlFor="email">
              Password
            </Label>
            <Input
              id="password"
              placeholder="Password"
              type="password"
              autoCapitalize="none"
              autoCorrect="off"
              disabled={isLoading}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            {submitType === "register" && (
              <>
                <Label className="sr-only" htmlFor="email">
                  Name
                </Label>
                <Input
                  id="name"
                  placeholder="Name"
                  type="name"
                  autoCapitalize="none"
                  autoCorrect="off"
                  disabled={isLoading}
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />

                <Label className="sr-only" htmlFor="email">
                  role
                </Label>
                <select
                  id="label"
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  className="flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  disabled={isLoading}
                >
                  <option
                    value=""
                    disabled
                    className="py-1.5 pl-8 pr-2 text-sm font-semibold"
                  >
                    Select a Role
                  </option>
                  <option
                    value="Doctor"
                    className=" absolute left-2 flex h-3.5 justify-center w-full cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50 "
                  >
                    Doctor
                  </option>
                  <option value="Patient">Patient</option>
                </select>
              </>
            )}
          </div>
          <Button disabled={isLoading}>
            {isLoading && (
              <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
            )}
            Sign In with Email
          </Button>
        </div>
      </form>
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t" />
        </div>
      </div>
    </div>
  );
}
