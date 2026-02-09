"use client";

import { useCallback, useEffect, useState } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { StepFour4, StepOne1, StepThree3, StepTwo2 } from "../Svg";
import Button from "./Button";
import { useRouter } from "next/navigation";

export default function Steps() {
  const [iconSize, setIconSize] = useState(40);
  const router = useRouter();
  const handleScrollToCategory = useCallback(() => {
    if (typeof window !== "undefined" && window.location.pathname === "/") {
      const target = document.getElementById("browse-category");
      if (target) {
        target.scrollIntoView({ behavior: "smooth", block: "start" });
        return;
      }
    }
    router.push("/#browse-category");
  }, [router]);

  useEffect(() => {
    AOS.init({
      duration: 600,
      once: true,
      easing: "ease-out",
      offset: 1200,
    });

    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIconSize(120);
      } else {
        setIconSize(40);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <>
      <div className="bg-[#E9EBEF] pt-6 md:pt-10 lg:pt-[130px]" id="steps">
        <div className="container mx-auto px-4 lg:px-0">
          <h1
            className="text-[20px] md:text-[40px] font-semibold text-primaryText mb-4 md:mb-6 lg:mb-20 text-center"
            data-aos="fade-up"
            data-aos-anchor-placement="top-bottom"
          >
            How it Works
          </h1>
          <div className="flex flex-wrap justify-center gap-4 md:gap-6 lg:gap-8">
            <div
              className="w-[calc(50%-0.75rem)] lg:w-[calc(25%-1.5rem)] flex flex-col items-center"
              data-aos="fade-left"
              data-aos-anchor="#steps"
              data-aos-offset="200"
              data-aos-duration="500"
            >
              <div className="p-4 md:p-16 lg:p-10 bg-[#c4d0e0] rounded-full inline-block">
                <StepOne1 width={iconSize} height={iconSize} />
              </div>
              <p className="text-[12px] md:text-[14px] lg:text-[16px] font-semibold text-primaryTextLight mt-2 md:mt-6 lg:mt-7">
                Step 1
              </p>
              <h2 className="text-[10px] px-4 md:text-[18px] lg:text-[22px] font-semibold mt-1 md:mt-4 text-center leading-4 md:leading-8.5 lg:leading-9.5">
                Choose Outdoor & Landscaping and answer a few quick questions
              </h2>
            </div>
            <div
              className="w-[calc(50%-0.75rem)] lg:w-[calc(25%-1.5rem)] flex flex-col items-center"
              data-aos="fade-left"
              data-aos-anchor="#steps"
              data-aos-offset="200"
              data-aos-duration="500"
              data-aos-delay="200"
            >
              <div className="p-4 md:p-16 lg:p-10 bg-[#c4d0e0] rounded-full inline-block">
                <StepTwo2 width={iconSize} height={iconSize} />
              </div>
              <p className="text-[12px] md:text-[14px] lg:text-[16px] font-semibold text-primaryTextLight mt-2 md:mt-6 lg:mt-7">
                Step 2
              </p>
              <h2 className="text-[10px] px-4 md:text-[18px] lg:text-[22px] font-semibold mt-1 md:mt-4 text-center leading-4 md:leading-8.5 lg:leading-9.5">
                Your job is shared with suitable local professionals
              </h2>
            </div>
            <div
              className="w-[calc(50%-0.75rem)] lg:w-[calc(25%-1.5rem)] flex flex-col items-center"
              data-aos="fade-left"
              data-aos-anchor="#steps"
              data-aos-offset="200"
              data-aos-duration="500"
              data-aos-delay="400"
            >
              <div className="p-4 md:p-16 lg:p-10 bg-[#c4d0e0] rounded-full inline-block">
                <StepThree3 width={iconSize} height={iconSize} />
              </div>
              <p className="text-[12px] md:text-[14px] lg:text-[16px] font-semibold text-primaryTextLight mt-2 md:mt-6 lg:mt-7">
                Step 3
              </p>
              <h2 className="text-[10px] px-4 md:text-[18px] lg:text-[22px] font-semibold mt-1 md:mt-4 text-center leading-4 md:leading-8.5 lg:leading-9.5">
                Compare responses from up to 3 verified trades
              </h2>
            </div>
            <div
              className="w-[calc(50%-0.75rem)] lg:w-[calc(25%-1.5rem)] flex flex-col items-center"
              data-aos="fade-left"
              data-aos-anchor="#steps"
              data-aos-offset="200"
              data-aos-duration="500"
              data-aos-delay="600"
            >
              <div className="p-4 md:p-16 lg:p-10 bg-[#c4d0e0] rounded-full inline-block">
                <StepFour4 width={iconSize} height={iconSize} />
              </div>
              <p className="text-[12px] md:text-[14px] lg:text-[16px] font-semibold text-primaryTextLight mt-2 md:mt-6 lg:mt-7">
                Step 4
              </p>
              <h2 className="text-[10px] px-4 md:text-[18px] lg:text-[22px] font-semibold mt-1 md:mt-4 text-center leading-4 md:leading-8.5 lg:leading-9.5">
                Choose the right professional and get the job done
              </h2>
            </div>
          </div>
        </div>

        <div className="flex justify-center">
          <Button
            className="mt-6 lg:mt-15 mb-10 lg:mb-20"
            onClick={handleScrollToCategory}
          >
            Post a Job
          </Button>
        </div>
      </div>
    </>
  );
}
