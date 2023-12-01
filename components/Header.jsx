import UserButton from "./Buttons/UserButton";
import DarkModeToggle from "./DarkModeToggle";
import Logo from "./Logo";
import { getServerSession } from "next-auth";
import { authOptions } from "@/auth";
import Link from "next/link";
import { MessageSquare } from "lucide-react";
import CreateChatButton from "./Chat/CreateChat";
import UpgradeBanner from "./UpgradeBanner";

async function Header() {
  const session = await getServerSession(authOptions);
  return (
    <header className="sticky top-0 z-50 bg-white dark:bg-gray-900">
      <nav className="flex flex-col sm:flex-row items-center p-5 pl-2 bg-white dark:bg-gray-900 max-w-7xl mx-auto">
        <Logo />

        <div className="flex-1 flex items-center justify-end space-x-4">
          {/* Language Select */}

          {/* Loggedin */}
          {session ? (
            <>
              <Link href="/chat" prefetch={false}>
                <MessageSquare className="text-black dark:text-white" />
              </Link>
              <CreateChatButton />
            </>
          ) : (
            <Link href="pricing"> Pricing</Link>
          )}
          {/* DarkModeToggle & Avatar Button */}
          <DarkModeToggle />
          <UserButton session={session} />
        </div>
      </nav>
      {/* Upgrade Banner */}
      <UpgradeBanner />
    </header>
  );
}

export default Header;
