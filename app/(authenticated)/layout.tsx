import NavigationBar from "@/components/profile/profile-bar";
import Sidebar from "@/components/ui/sidebar";

export default function AuthenticatedLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Sidebar />
      <main className="flex-grow min-h-dvh flex flex-col">
        <NavigationBar />
        {children}
      </main>
    </>
  );
}
