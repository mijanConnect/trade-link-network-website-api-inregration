"use client";

import Image from "next/image";
import { getImageUrl } from "../ui/ImageURL";

type Category = {
  id?: string;
  _id: string | number;
  name?: string;
  image?: string;
  isActive?: boolean;
  createdAt?: string;
  updatedAt?: string;
  slug: string;
  __v?: number;
  link?: string;
  title?: string;
  description?: string;
};

interface CategoryListProps {
  categories: Category[];
  imageErrors?: Record<string | number, boolean>;
  setImageErrors?: (
    errors:
      | Record<string | number, boolean>
      | ((
          prev: Record<string | number, boolean>,
        ) => Record<string | number, boolean>),
  ) => void;
}

export default function ServiceCategoryList({
  categories,
  imageErrors = {},
  setImageErrors = () => {},
}: CategoryListProps) {
  return (
    <>
      <ul className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-x-4 md:gap-x-6 gap-y-4 md:gap-y-15">
        {categories.map((category: Category, index: number) => (
          <li
            key={category._id}
            data-aos="fade-up"
            data-aos-anchor-placement="top-bottom"
            data-aos-delay={index * 10}
          >
            <a
              href={"/services/" + category.slug}
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

                <div className="p-3 lg:p-6">
                  <h2 className="text-[14px] lg:text-[20px] font-semibold text-primaryTextLight flex-1 flex items-start">
                    {category.title || category.name}
                  </h2>
                  {category.description && (
                    <p className="mt-2 lg:mt-3 text-[12px] lg:text-[14px] text-gray-500">
                      {category.description || "No description available"}
                    </p>
                  )}
                </div>
              </div>
            </a>
          </li>
        ))}
      </ul>
    </>
  );
}
