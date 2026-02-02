"use client";

import Image from "next/image";
import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

const categories = [
  {
    id: 1,
    title: "Outdoor & Landscaping",
    image: "/assets/category/category-1.png",
    alt: "Outdoor & Landscaping",
    link: "/post-service",
  },
  {
    id: 2,
    title: "Driveways & Surfacing",
    image: "/assets/category/category-2.png",
    alt: "Driveways & Surfacing",
    link: "/post-service",
  },
  {
    id: 3,
    title: "Building & Structural",
    image: "/assets/category/category-3.png",
    alt: "Building & Structural",
    link: "/post-service",
  },
  {
    id: 4,
    title: "Home Renovation & Interiors",
    image: "/assets/category/category-4.png",
    alt: "Home Renovation & Interiors",
    link: "/post-service",
  },
  {
    id: 5,
    title: "Electrical, Plumbing & Heating",
    image: "/assets/category/category-5.png",
    alt: "Electrical, Plumbing & Heating",
    link: "/post-service",
  },
  {
    id: 6,
    title: "Roofing & Exterior Shell",
    image: "/assets/category/category-6.png",
    alt: "Roofing & Exterior Shell",
    link: "/post-service",
  },
  {
    id: 7,
    title: "Windows, Doors & Security",
    image: "/assets/category/category-7.png",
    alt: "Windows, Doors & Security",
    link: "/post-service",
  },
  {
    id: 8,
    title: "Cleaning, Maintenance & Repairs",
    image: "/assets/category/category-8.png",
    alt: "Cleaning, Maintenance & Repairs",
    link: "/post-service",
  },
  {
    id: 9,
    title: "Specialist Service",
    image: "/assets/category/category-9.png",
    alt: "Specialist Service",
    link: "/post-service",
  },
  {
    id: 10,
    title: "Locksmith",
    image: "/assets/category/category-10.png",
    alt: "Locksmith",
    link: "/post-service",
  },
  {
    id: 11,
    title: "Drainage",
    image: "/assets/category/category-11.png",
    alt: "Drainage",
    link: "/post-service",
  },
  {
    id: 12,
    title: "All Moving Services",
    image: "/assets/category/category-12.png",
    alt: "All Moving Services",
    link: "/post-service",
  },
];

export default function Category() {
  useEffect(() => {
    AOS.init({
      duration: 600,
      once: true,
      easing: "ease-out",
      offset: 50,
      mirror: false,
    });
  }, []);

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
            {categories.map((category, index) => (
              <li
                key={`${category.title}-${index}`}
                className=""
                data-aos="fade-up"
                data-aos-anchor-placement="top-bottom"
                data-aos-delay={index * 10}
              >
                <a href={category.link} className="group block h-full">
                  <div className="bg-white rounded-sm shadow-sm hover:shadow-md transition-shadow duration-300 ease-out h-full flex flex-col">
                    <div className="relative w-full h-[100px] sm:h-[265px] overflow-hidden rounded-t-sm">
                      <Image
                        src={category.image}
                        alt={category.alt}
                        fill
                        style={{ objectFit: "cover" }}
                        className="rounded-t-sm transition-transform duration-300 ease-out group-hover:scale-105"
                      />
                    </div>
                    <h2 className="p-3 md:p-6 text-[14px] lg:text-[20px] font-semibold text-primaryTextLight flex-1 flex items-start">
                      {category.title}
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
