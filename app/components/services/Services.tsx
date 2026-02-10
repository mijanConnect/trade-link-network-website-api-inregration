"use client";

import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { useGetCategoriesQuery } from "@/store/slice/categoriesSlice";
import ServiceList from "../ui/ServiceList";

export default function Services() {
  useEffect(() => {
    AOS.init({
      duration: 600,
      once: true,
      easing: "ease-out",
      offset: 50,
      mirror: false,
    });
  }, []);
  const { data, isLoading, isError } = useGetCategoriesQuery({});

  if (isLoading) {
    return <p className="text-center py-10">Loading categories</p>;
  }

  if (isError) {
    return <p className="text-center py-10">Failed to load categories</p>;
  }

  return (
    <>
      <div>
        <h2
          data-aos="fade-up"
          className="text-[24px] lg:text-[48px] font-semibold text-primaryText mb-4 lg:mb-12 text-center"
        >
          Services
        </h2>

        <h3
          data-aos="fade-up"
          data-aos-delay="100"
          className="text-[20px] lg:text-[32px] font-bold text-center text-primaryTextLight max-w-[800px] mx-auto"
        >
          Choose the service you need and get matched with trusted, verified
          local tradespeople.
        </h3>

        <div className="mt-4 lg:mt-8" data-aos="fade-up" data-aos-delay="200">
          <ServiceList categories={data || []} route="services" />
        </div>
      </div>
    </>
  );
}
