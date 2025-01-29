import React from "react";
import Navbar from "@/components/Navbar";
import Headline from "@/components/Headline";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className="flex flex-col min-h-screen">
      <Headline />
      <Navbar />
      {children}
    </main>
  );
}
