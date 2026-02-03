"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { useGetCategoriesQuery } from "@/store/slice/categoriesSlice";
import { getImageUrl } from "../ui/ImageURL";

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
  const [imageErrors, setImageErrors] = useState<Record<string, boolean>>({});

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
    return <p className="text-center py-10">Loading categories</p>;
  }

  if (isError) {
    return <p className="text-center py-10">Failed to load categories</p>;
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
          <ul className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-x-4 md:gap-x-6 gap-y-4 md:gap-y-15">
            {categories.map((category: Category, index: number) => (
              <li
                key={category._id}
                data-aos="fade-up"
                data-aos-anchor-placement="top-bottom"
                data-aos-delay={index * 10}
              >
                <a
                  href={"/post-service/" + category.slug}
                  className="group block h-full"
                >
                  <div className="bg-white rounded-sm shadow-sm hover:shadow-md transition-shadow duration-300 ease-out h-full flex flex-col">
                    <div className="relative w-full h-[100px] sm:h-[265px] overflow-hidden rounded-t-sm bg-gray-100">
                      {imageErrors[category._id] ? (
                        <div className="absolute inset-0 flex items-center justify-center text-gray-400">
                          <span className="text-sm">Image unavailable</span>
                        </div>
                      ) : (
                        <Image
                          src={getImageUrl(category.image)}
                          alt={category.title || "Category image"}
                          fill
                          style={{ objectFit: "cover" }}
                          className="rounded-t-sm transition-transform duration-300 ease-out group-hover:scale-105"
                          onError={() => {
                            setImageErrors((prev) => ({
                              ...prev,
                              [category._id]: true,
                            }));
                          }}
                          unoptimized
                        />
                      )}
                    </div>

                    <h2 className="p-3 md:p-6 text-[14px] lg:text-[20px] font-semibold text-primaryTextLight flex-1 flex items-start">
                      {category.title || category.name}
                    </h2>
                  </div>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
}
