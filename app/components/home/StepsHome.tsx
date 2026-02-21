"use client";

import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { StepHome1, StepHome2, StepHome3, StepHome4, StepHome5 } from "../Svg";
import { useRouter } from "next/navigation";
import Button from "../ui/Button";

export default function StepsHome() {
  const router = useRouter();

  useEffect(() => {
    AOS.init({
      duration: 600,
      once: true,
      easing: "ease-out",
      offset: 1200,
    });
  }, []);

  return (
    <>
      <div className="bg-[#E9EBEF] pt-6 md:pt-10 lg:pt-[130px]" id="steps">
        <div className="container mx-auto px-4 lg:px-0">
          <h1
            className="text-[20px] md:text-[40px] font-semibold text-primaryText mb-4 md:mb-8 lg:mb-1 text-center"
            data-aos="fade-up"
            data-aos-anchor-placement="top-bottom"
          >
            For Trades & Service Providers
          </h1>
          <h2
            className="text-center font-bold text-[22px]"
            data-aos="fade-up"
            data-aos-delay="100"
          >
            Grow your business with Trade Link Network
          </h2>
          <p
            className="text-center text-primaryText mt-2 mb-10 md:mb-15 lg:mb-20 text-[14px] md:text-[16px] max-w-[600px] mx-auto"
            data-aos="fade-up"
            data-aos-delay="200"
          >
            Get matched with customers actively looking for your services in
            your area. Choose the work you want, build your reputation, and
            manage enquiries in one place.
          </p>
          <div className="flex flex-wrap justify-center gap-x-4 md:gap-x-6 lg:gap-x-12 gap-y-4 md:gap-y-12 lg:gap-y-18">
            <div
              className="w-[calc(50%-0.75rem)] lg:w-[calc(25%-1.5rem)] flex flex-col items-center"
              data-aos="fade-left"
              data-aos-anchor="#steps"
              data-aos-offset="200"
              data-aos-duration="500"
            >
              <div className="p-4 md:p-16 lg:p-6 bg-[#c4d0e0] rounded-full inline-block">
                <StepHome1 />
              </div>
              <h2 className="text-[10px] px-4 md:text-[18px] lg:text-[22px] font-semibold mt-1 md:mt-4 text-center leading-4 md:leading-8.5 lg:leading-9.5">
                Receive real local job leads
              </h2>
              {/* <p className="text-[10px] px-4 md:text-base font-semibold mt-1 md:mt-4 text-center leading-4 md:leading-8.5 lg:leading-9.5">
              Only customers in your chosen service area.
              </p> */}
            </div>
            <div
              className="w-[calc(50%-0.75rem)] lg:w-[calc(25%-1.5rem)] flex flex-col items-center"
              data-aos="fade-left"
              data-aos-anchor="#steps"
              data-aos-offset="200"
              data-aos-duration="500"
              data-aos-delay="200"
            >
              <div className="p-4 md:p-16 lg:p-6 bg-[#c4d0e0] rounded-full inline-block">
                <StepHome2 />
              </div>
              <h2 className="text-[10px] px-4 md:text-[18px] lg:text-[22px] font-semibold mt-1 md:mt-4 text-center leading-4 md:leading-8.5 lg:leading-9.5">
                Choose the work that suits you
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
              <div className="p-4 md:p-16 lg:p-6 bg-[#c4d0e0] rounded-full inline-block">
                <StepHome3 />
              </div>
              <h2 className="text-[10px] px-4 md:text-[18px] lg:text-[22px] font-semibold mt-1 md:mt-4 text-center leading-4 md:leading-8.5 lg:leading-9.5">
                Build verified reviews
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
              <div className="p-4 md:p-16 lg:p-6 bg-[#c4d0e0] rounded-full inline-block">
                <StepHome4 />
              </div>
              <h2 className="text-[10px] px-4 md:text-[18px] lg:text-[22px] font-semibold mt-1 md:mt-4 text-center leading-4 md:leading-8.5 lg:leading-9.5">
                Set your service radius
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
              <div className="p-4 md:p-16 lg:p-6 bg-[#c4d0e0] rounded-full inline-block">
                <StepHome5 />
              </div>
              <h2 className="text-[10px] px-4 md:text-[18px] lg:text-[22px] font-semibold mt-1 md:mt-4 text-center leading-4 md:leading-8.5 lg:leading-9.5">
                Manage enquiries easily
              </h2>
            </div>
          </div>
        </div>

        <div className="flex justify-center">
          <Button
            className="mt-6 lg:mt-15 mb-10 lg:mb-20"
            onClick={() => router.push("/register")}
          >
            Join as a Tradeperson
          </Button>
        </div>
      </div>
    </>
  );
}
