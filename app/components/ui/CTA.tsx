"use client";

import { useCallback, useEffect } from "react";
import { useRouter } from "next/navigation";
import AOS from "aos";
import "aos/dist/aos.css";
import Button from "./Button";

export default function CTA() {
  useEffect(() => {
    AOS.init({
      duration: 600,
      once: true,
      easing: "ease-out",
      offset: 100,
    });
  }, []);
  const router = useRouter();
  const handleScrollToCategory = useCallback(() => {
    const target = document.getElementById("browse-category");
    if (target) {
      target.scrollIntoView({ behavior: "smooth", block: "start" });
      return;
    }
    router.push("/#browse-category");
  }, [router]);

  return (
    <>
      <div
        className="container mx-auto px-4 lg:px-0 mb-10 lg:mb-[140px] mt-4 lg:mt-10"
        data-aos="fade-up"
      >
        <div className="relative overflow-hidden rounded-md bg-[url('/assets/cta-image.png')] bg-cover bg-center bg-no-repeat">
          <div className="absolute inset-0 bg-black/40" aria-hidden="true" />
          <div className="relative flex flex-col justify-center items-center py-10 lg:py-[250px] text-center">
            <h1
              className="text-[24px] md:text-[40px] font-semibold text-white mb-4 lg:mb-12"
              data-aos="fade-up"
              data-aos-delay="100"
            >
              Ready to get started?
            </h1>
            <div data-aos="zoom-in-up" data-aos-delay="200">
              <Button onClick={handleScrollToCategory}>Post a Job</Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
