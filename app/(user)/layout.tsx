import Header from "@/components/Header";

export default function UsersLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex-1 w-full flex flex-col max-w-6xl mx-auto">
      <Header />
      {children}
    </div>
  );
}
