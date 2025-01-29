import { Metadata } from "next";
import Image from "next/image";
import HeroSection from "@/components/Homepage/HeroSection";


export const metadata: Metadata = {
  title: "HYRUN - Home",
  description: "Explore quality sneakers from HYRUN",
};


export default function Home() {
  return (
    <main className="flex min-h-screen flex-col">
      <HeroSection />
    </main>
  );
}
