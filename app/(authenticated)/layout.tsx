import Sidebar from "@/components/ui/sidebar";

interface Props {
  children: React.ReactNode;
}

export function AuthenticatedPagesLayout({ children }: Props) {
  return (
    <>
      <Sidebar />
      <main className="flex-grow min-h-dvh">{children}</main>
    </>
  );
}
