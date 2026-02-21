"use client";

import { useCallback, useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import Button from "../ui/Button";

export default function Hero2() {
  useEffect(() => {
    AOS.init({
      duration: 400,
      once: true,
      easing: "ease-out",
      offset: 100,
      delay: 100,
    });
  }, []);

  const handleScrollToCategory = useCallback(() => {
    const target = document.getElementById("browse-category");
    if (target) {
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, []);

  return (
    <>
      <div
        data-aos="fade-down"
        className="relative w-full h-[50vh] lg:h-[92vh] flex items-center justify-center overflow-hidden "
      >
        {/* Background Image */}
        <div className="absolute inset-0 bg-[url('/assets/hero.webp')]  bg-center bg-no-repeat object-contain" />
        
        {/* 30% Black Overlay */}
        <div className="absolute inset-0 bg-black/30" />
        
        {/* Gradient Overlay (Left to Right) */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-black/20 to-black/40" />
        
        {/* Content Container with Backdrop Blur */}
        <div
          className="relative z-10 container mx-auto px-4 mt-0 lg:-mt-12"
          data-aos="fade-up"
          data-aos-delay="200"
        >
          <div className="backdrop-blur-sm bg-black/10 rounded-lg p-6 lg:p-8 max-w-3xl">
            <h1
              className="text-[24px] md:text-[40px] lg:text-[60px] font-bold text-white leading-tight drop-shadow-lg"
              data-aos="fade-up"
              data-aos-delay="300"
            >
              Connect with trusted tradespeople <br /> across the UK — fast
            </h1>
            <p
              className="text-[18px] md:text-[24px] mt-4 lg:mt-10 text-white max-w-[600px] drop-shadow-md"
              data-aos="fade-up"
              data-aos-delay="400"
            >
              Tell us what you need and we&apos;ll match you with verified
              professionals near you
            </p>
            <div data-aos="fade-up" data-aos-delay="500">
              <Button
                className="mt-6 lg:mt-12 bg-primary hover:bg-primary/90 text-white font-semibold shadow-lg"
                variant="primary"
                onClick={handleScrollToCategory}
              >
                Post your job
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
