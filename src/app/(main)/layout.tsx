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
    <main className="relative flex flex-col">
      <Headline />
      <Navbar />
      {children}
      <Footer />
    </main>
  );
}
