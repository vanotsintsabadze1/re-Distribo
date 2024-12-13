import type { Metadata } from "next";
import "./globals.css";
import { Toaster } from "react-hot-toast";
import { mainFont } from "@/config/fontConfiguration";
import Sidebar from "@/components/ui/sidebar";

export const metadata: Metadata = {
  title: "Distribo",
  description: "Official application of Distribo",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${mainFont.className} antialiased flex min-h-dvh`}>
        <Sidebar />
        <main className="flex-grow min-h-dvh">{children}</main>
        <Toaster
          position="top-center"
          containerStyle={{ fontSize: "12px", textAlign: "center" }}
        />
      </body>
    </html>
  );
}
