import NavigationBar from "@/components/navigation/navigation-bar";
import Sidebar from "@/components/ui/sidebar";

export default function RootLayout({
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