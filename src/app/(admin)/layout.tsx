import React from "react";
import Sidebar from "./components/Sidebar";
import Header from "./components/Header";
import Breadcrumb from "./components/Breadcrumb.jsx";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className="relative flex">
      <Sidebar />
      <div className="flex flex-col w-full">
        <Header />
        <Breadcrumb />
        {children}
      </div>
    </main>
  );
}
