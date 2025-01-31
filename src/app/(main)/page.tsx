import { Metadata } from "next";
import HeroSection from "@/components/Homepage/HeroSection";
import HotProducts from "@/components/Homepage/HotProducts";
import NewProduct from "@/components/Homepage/NewProduct"; 



export const metadata: Metadata = {
  title: "HYRUN - Home",
  description: "Explore quality sneakers from HYRUN",
};


export default function Home() {
  return (
    <main className="flex flex-col gap-20 mb-10">
      <HeroSection />
      <HotProducts />
      <NewProduct />
    </main>
  );
}
