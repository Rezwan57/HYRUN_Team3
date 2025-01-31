import React from "react";
import Navbar from "@/components/Navbar";
import Headline from "@/components/Headline";
import Footer from "@/components/Homepage/Footer";

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
      <Footer />
    </main>
  );
}
