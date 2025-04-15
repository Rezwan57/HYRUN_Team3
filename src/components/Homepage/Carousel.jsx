"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "./style.css";
import "swiper/css/pagination";
import { Pagination, Autoplay } from "swiper/modules";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

function Carousel() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [sneakers, setSneakers] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch("/api/edithome");
      const data = await res.json();
      setSneakers(data);
    };
    fetchData();
  }, []);

  return (
    <div className="pt-1 w-full h-[78vh] lg:h-full overflow-hidden">
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
            <motion.div
              key={`text-${activeIndex}`}
              initial={{ x: "-200%", opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: "-200%", opacity: 0 }}
              transition={{ duration: 1.5 }}
              className="relative flex flex-col-reverse lg:flex-row items-center justify-end lg:justify-start h-[75vh] lg:h-full overflow-hidden lg:mt-0 mt-0 lg:m-5 m-5 bg-gradient-to-br from-[#f5f5f5] to-[#dddddd] rounded-3xl"
            >
              {/* Text Section */}
              <motion.div
                key={`text-${activeIndex}`}
                initial={{ x: "-200%", opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: "-200%", opacity: 0 }}
                transition={{ duration: 1.5 }}
                className="flex flex-col items-center lg:items-start justify-end lg:justify-start w-4/5 lg:w-2/3 h-full lg:py-32 py-8 lg:pl-24 text-center lg:text-left gap-0 lg:gap-2 z-10"
              >
                <h2 className="text-xl lg:text-[3.5rem]  leading-none font-GostekBoldItalic">
                  {sneaker.name}
                </h2>
                <p className="text-[12px] lg:text-xl mt-5 lg:mt-4 max-w-full lg:max-w-2xl lg:leading-relaxed leading-normal">
                  {sneaker.shortDescription}
                </p>
                <Link href="/products" className="bg-prime text-white text-sm lg:text-base py-2 px-8 lg:py-4 lg:px-14 rounded-full mt-6 lg:mt-10 hover:bg-sky-600">
                  Shop Now
                </Link>
              </motion.div>

              <h2 className="absolute top-[30%] lg:top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-[6rem] lg:text-[26rem]  w-full text-center uppercase text-white text-opacity-50 z-1 font-GostekBoldItalic">
                {sneaker.brand}
              </h2>

              <motion.div
                key={`image-${activeIndex}`}
                initial={{ scale: 0.25, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.25, opacity: 0 }}
                transition={{ duration: 1 }}
                className="productImage"
              >
                <Image
                  src={sneaker.image}
                  alt={sneaker.name}
                  width={450}
                  height={450}
                  className="productShadow"
                />
              </motion.div>
            </motion.div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}

export default Carousel;

