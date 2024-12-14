import type { Metadata } from "next";
import "./globals.css";
import { Toaster } from "react-hot-toast";
import { mainFont } from "@/config/fontConfiguration";
import AuthenticationContextProvider from "@/context/AuthenticationContext";

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
        <AuthenticationContextProvider>{children}</AuthenticationContextProvider>
        <Toaster position="top-center" containerStyle={{ fontSize: "12px", textAlign: "center" }} />
      </body>
    </html>
  );
}
