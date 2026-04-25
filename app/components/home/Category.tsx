"use client";

import { useEffect } from "react";
import AOS from "aos";
import { useGetCategoriesQuery } from "@/store/slice/categoriesSlice";
import CategoryList from "./CategoryList";
import { Skeleton } from "@/components/ui/skeleton";

type Category = {
  id: string;
  _id: string;
  name: string;
  image: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  slug: string;
  __v: number;
  link?: string;
  title?: string;
};

export default function Category() {
  const { data, isLoading, isError } = useGetCategoriesQuery({});

  useEffect(() => {
    AOS.init({
      duration: 600,
      once: true,
      easing: "ease-out",
      offset: 50,
      mirror: false,
    });
  }, []);

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 lg:px-0" id="browse-category">
        <div className="py-10 lg:py-[140px]">
          <h1 className="text-[22px] md:text-[40px] font-semibold text-primaryText mb-6 lg:mb-15 text-center">
            What do you need help with?
          </h1>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 lg:gap-6">
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="flex flex-col gap-3">
                <Skeleton className="h-32 w-full rounded-lg" />
                <Skeleton className="h-5 w-3/4" />
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <p className="text-center text-red-500 py-10">
        Failed to load categories!
      </p>
    );
  }

  const categories = data || [];

  return (
    <section>
      <div className="container mx-auto px-4 lg:px-0" id="browse-category">
        <div className="py-8 lg:py-24">
          <h1
            className="text-[22px] md:text-[40px] font-semibold text-primaryText mb-6 lg:mb-15 text-center"
            data-aos="fade-up"
            data-aos-anchor-placement="top-bottom"
          >
            What do you need help with?
          </h1>
          <div>
            <CategoryList categories={categories} />
          </div>
        </div>
      </div>
    </section>
  );
}
