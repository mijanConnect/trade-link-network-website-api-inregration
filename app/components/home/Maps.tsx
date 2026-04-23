"use client";

import Image from "next/image";
import { useEffect } from "react";
import AOS from "aos";

export default function Maps() {
  useEffect(() => {
    AOS.init({
      duration: 600,
      once: true,
      easing: "ease-out",
      offset: 50,
      mirror: false,
    });
  }, []);

  return (
    <>
      <div className="bg-white py-8 lg:py-24 px-4">
        <div className="container mx-auto">
          <h1
            className="text-[18px] lg:text-3xl text-center font-bold mb-4 lg:mb-12 max-w-3xl mx-auto"
            data-aos="fade-up"
            data-aos-anchor-placement="top-bottom"
          >
            We connect customers with trusted local professionals across
            England, Scotland, Wales and Northern Ireland.
          </h1>
          <div
            className="flex justify-center"
            data-aos="fade-up"
            data-aos-anchor-placement="top-bottom"
            data-aos-delay="200"
          >
            <Image
              src="/assets/map.png"
              alt="Map of the UK showing our coverage"
              width={400}
              height={300}
              className="h-auto rounded-sm shadow-[0_0_10px_rgba(0,0,0,0.05)] max-w-full"
              unoptimized
            />
          </div>
        </div>
      </div>
    </>
  );
}
