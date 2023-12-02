import UserButton from "./Buttons/UserButton";
import DarkModeToggle from "./DarkModeToggle";
import Logo from "./Logo";
import { getServerSession } from "next-auth";
import { authOptions } from "@/auth";
import Link from "next/link";
import { FileStack } from "lucide-react";
import CreateAppointmentButton from "./Appointment/CreateAppointment";

async function Header() {
  const session = await getServerSession(authOptions);
  return (
    <header className="sticky top-0 z-50 bg-white dark:bg-gray-900">
      <nav className="flex flex-col sm:flex-row items-center p-5 pl-2 bg-white dark:bg-gray-900 max-w-7xl mx-auto">
        <Logo />

        <div className="flex-1 flex items-center justify-end space-x-4">
          {/* Loggedin */}
          {session ? (
            <>
              <Link href="/history" prefetch={false} title="Medical History">
                <FileStack className="text-black dark:text-white" />
              </Link>
              <CreateAppointmentButton />
            </>
          ) : (
            <Link href="/doctors"> Doctors</Link>
          )}
          {/* DarkModeToggle & Avatar Button */}
          <DarkModeToggle />
          <UserButton session={session} />
        </div>
      </nav>
    </header>
  );
}

export default Header;
