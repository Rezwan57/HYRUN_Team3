import React from "react";
import Navbar from "@/components/Navbar";
import Headline from "@/components/Headline";
import Footer from "@/components/Homepage/Footer";
import { CartProvider } from "@/app/context/CartContext";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <CartProvider>
      <main className="relative flex flex-col">
        <Headline />
        <Navbar />
        {children}
        <Footer />
      </main>
    </CartProvider>
  );
}
