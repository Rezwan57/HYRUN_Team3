import React from "react";
import Carousel from "./Carousel";

function HeroSection() {
  return (
    <section className="flex w-full">

      <div className="w-full h-[75vh] lg:h-[86vh] flex items-start lg:items-center">
        <Carousel />
      </div>

    </section>
  );
}

export default HeroSection;
