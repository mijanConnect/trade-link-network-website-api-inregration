"use client";

import { useCallback, useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import Button from "../ui/Button";

export default function Hero() {
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
        className="w-full h-[50vh] lg:h-[92vh] bg-[url('/assets/hero-image.png')] bg-cover bg-center bg-no-repeat flex items-center justify-center"
      >
        <div
          className="container mx-auto px-4 mt-0 lg:-mt-12"
          data-aos="fade-up"
          data-aos-delay="200"
        >
          <h1
            className="text-[24px] md:text-[40px] lg:text-[60px] font-bold text-TextPrimary leading-tight"
            data-aos="fade-up"
            data-aos-delay="300"
          >
            Connect with trusted tradespeople <br /> across the UK — fast
          </h1>
          <p
            className="text-[18px] md:text-[24px] mt-4 lg:mt-10 text-primaryTextLight max-w-[600px]"
            data-aos="fade-up"
            data-aos-delay="400"
          >
            Tell us what you need and we&apos;ll match you with verified
            professionals near you
          </p>
          <div data-aos="fade-up" data-aos-delay="500">
            <Button
              className="mt-6 lg:mt-12"
              variant="primary"
              onClick={handleScrollToCategory}
            >
              Post your job
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}
