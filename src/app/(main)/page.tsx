import { Metadata } from "next";
import Image from "next/image";
import HeroSection from "@/components/Homepage/HeroSection";


export const metadata: Metadata = {
  title: "HYRUN - Home",
  description: "Explore quality sneakers from HYRUN",
};


export default function Home() {
  return (
    <main className="flex flex-col gap-20 mb-10">
      <HeroSection />
    </main>
  );
}
