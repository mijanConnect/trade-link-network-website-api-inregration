"use client";

import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { useGetCategoriesQuery } from "@/store/slice/categoriesSlice";
import ServiceCategoryList from "./ServiceCategoryList";
import { Skeleton } from "@/components/ui/skeleton";

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
    return (
      <div>
        <h2 className="text-[24px] lg:text-[48px] font-semibold text-primaryText mb-4 lg:mb-6 text-center">
          Categories
        </h2>

        <h3 className="text-[20px] lg:text-[32px] font-bold text-center text-primaryTextLight max-w-[800px] mx-auto">
          Choose the category you need and get matched with trusted, verified
          local tradespeople.
        </h3>

        <div className="mt-4 lg:mt-10">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="flex flex-col gap-3">
                <Skeleton className="h-64 w-full rounded-lg" />
                <Skeleton className="h-5 w-3/4" />
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (isError) {
    return <p className="text-center py-10">Failed to load categories</p>;
  }

  return (
    <>
      <div>
        <h2
          data-aos="fade-up"
          className="text-[24px] lg:text-[48px] font-semibold text-primaryText mb-4 lg:mb-6 text-center"
        >
          Categories
        </h2>

        <h3
          data-aos="fade-up"
          data-aos-delay="100"
          className="text-[20px] lg:text-[32px] font-bold text-center text-primaryTextLight max-w-[800px] mx-auto"
        >
          Choose the category you need and get matched with trusted, verified
          local tradespeople.
        </h3>

        <div className="mt-4 lg:mt-10" data-aos="fade-up" data-aos-delay="200">
          <ServiceCategoryList categories={data || []} />
        </div>
      </div>
    </>
  );
}
