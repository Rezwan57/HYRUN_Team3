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
    <div className="flex">
      <Sidebar />

      <main className="flex flex-col w-screen">
        <Header />

        <section className="flex flex-col flex-wrap p-0 w-full">
          <Breadcrumb />
          {children}
        </section>
      </main>
    </div>
  );
}
