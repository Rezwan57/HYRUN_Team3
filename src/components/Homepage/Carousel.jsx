"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination, Autoplay } from "swiper/modules";
import { motion } from "framer-motion";
import Image from "next/image";
import sneakers from "@/data/HeroSectionData";
import { useState } from "react";

function Carousel() {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <div className="w-full overflow-hidden">
      <Swiper
        modules={[Pagination, Autoplay]}
        pagination={{ clickable: true }}
        autoplay={{ delay: 10000 }}
        loop={true}
        spaceBetween={0}
        slidesPerView={1}
        className="h-full overflow-hidden"
        onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
      >
        {sneakers.map((sneaker, index) => (
          <SwiperSlide key={index}>
            <div className="flex flex-col-reverse lg:flex-row items-center justify-center h-auto lg:h-[75vh] overflow-hidden">
              {/* Text Section */}
              <motion.div
                key={`text-${activeIndex}`}
                initial={{ x: "-200%", opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: "-200%", opacity: 0 }}
                transition={{ duration: 1.5 }}
                className="flex flex-col items-center lg:items-start justify-center w-full lg:w-2/3 h-full p-10 lg:p-20 text-center lg:text-left"
              >
                <h2 className="text-3xl lg:text-[5rem] font-bold">{sneaker.name}</h2>
                <p className="text-base lg:text-xl mt-5 lg:mt-12 max-w-full lg:max-w-2xl">
                  {sneaker.shortDescription}
                </p>
                <button className="bg-yellow-400 py-3 px-8 lg:py-4 lg:px-14 rounded-full mt-6 lg:mt-10">
                  Shop Now
                </button>
              </motion.div>



              <motion.div
                key={`image-${activeIndex}`}
                initial={{ x: "200%", opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: "200%", opacity: 0 }}
                transition={{ duration: 1 }}
                className="relative flex items-center justify-center w-[90vw] lg:w-1/2 h-[40vh] lg:h-full rounded-[2.5rem] lg:rounded-s-[3.5rem] lg:rounded-e-none"
                style={{ backgroundColor: sneaker.bgColor }}
              >
                <motion.div
                  key={`image-${activeIndex}`}
                  initial={{ x: "300%", opacity: 0 }}
                  animate={{ x: 10, opacity: 1 }}
                  exit={{ x: "300%", opacity: 0 }}
                  transition={{ duration: 1.5 }}
                  className=" lg:absolute top-0  -left-40 -lg:translate-x-60  flex flex-col items-center justify-center w-full h-full"
                >
                  <Image
                    src={sneaker.image}
                    alt={sneaker.name}
                    width={400}
                    height={400}
                    className="w-[80vw] h-auto object-contain mb-6 -rotate-[20deg] drop-shadow-2xl scale-[1.25] lg:scale-100"
                  />
                </motion.div>
              </motion.div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}

export default Carousel;
