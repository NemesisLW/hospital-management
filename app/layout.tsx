import "./globals.css";
import Header from "@/components/Header";
import { Toaster } from "@/components/ui/toaster";
import ClientProvider from "@/components/Providers/ClientProvider";
import { ThemeProvider } from "@/components/Providers/ThemeProvider";
import Modal from "@/components/Modal";

export const metadata = {
  title: "Hospital Management System",
  description:
    "Empowering Healthcare Excellence: Seamless Solutions for Tomorrow's Hospitals",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClientProvider>
      <html lang="en">
        <body className="flex flex-col min-h-screen">
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <Header />
            {children}
            <Modal />
            <Toaster />
          </ThemeProvider>
        </body>
      </html>
    </ClientProvider>
  );
}
