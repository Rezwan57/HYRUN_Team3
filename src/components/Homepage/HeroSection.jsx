import React from "react";
import Carousel from "./Carousel";

function HeroSection() {
  return (
    <section className="flex w-full">

      <div className="w-full h-[86vh] flex items-center">
        <Carousel />
      </div>

    </section>
  );
}

export default HeroSection;
