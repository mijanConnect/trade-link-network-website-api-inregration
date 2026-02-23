"use client";

import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { useGetCategoriesQuery } from "@/store/slice/categoriesSlice";
import CategoryList from "./CategoryList";

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
    return <p className="text-center py-10">Loading categories..</p>;
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
    <>
      <div className="container mx-auto px-4 lg:px-0" id="browse-category">
        <div className="py-10 lg:py-[140px]">
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
    </>
  );
}
