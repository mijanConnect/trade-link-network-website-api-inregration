"use client";

import { useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import AOS from "aos";
import Button from "../ui/Button";
import {
  useGetCategoriesQuery,
  useGetCategoriesServicesQuery,
  useGetCategoryDetailsQuery,
} from "@/store/slice/categoriesSlice";
import { skipToken } from "@reduxjs/toolkit/query";

export default function ServiceDetails() {
  useEffect(() => {
    AOS.init({
      duration: 600,
      once: true,
      easing: "ease-out",
      offset: 50,
      mirror: false,
    });
  }, []);
  const router = useRouter();
  const params = useParams();
  const serviceId = params?.id as string | undefined;
  const { data, isLoading, isError } = useGetCategoriesQuery({});
  const categories = data || [];
  const selectedCategory =
    categories.find(
      (c: { slug: string; name: string }) => c.slug === serviceId,
    ) || ({ name: "Selected" } as { name: string });

  // Ensure we have a valid ObjectId, not a slug
  const categoryId = selectedCategory?._id;

  console.log("Category Id: " + categoryId);

  // Only fetch services if we have a valid categoryId - use skipToken to skip the query
  const { data: servicesData } = useGetCategoriesServicesQuery(
    categoryId || skipToken,
  );

  // Fetch category details for descriptions
  const { data: categoryDetailsData } = useGetCategoryDetailsQuery(
    categoryId || skipToken,
  );

  const services =
    (servicesData as { _id: string; name: string }[] | undefined) || [];

  return (
    <>
      <div className="container mx-auto px-4">
        <div className="mb-8 lg:mb-25">
          <h2
            data-aos="fade-up"
            className="text-[22px] lg:text-[40px] font-bold text-primaryText"
          >
            Find Trusted{" "}
            {isLoading
              ? "Loading"
              : isError
                ? "Category"
                : selectedCategory.name}{" "}
            Professionals <br /> Across the UK
          </h2>
          <p
            data-aos="fade-up"
            data-aos-delay="100"
            className="text-[14px] lg:text-[18px] text-primaryTextLight mt-4 lg:mt-10"
          >
            {categoryDetailsData?.servicesDetailsDescription1}
          </p>

          <div data-aos="fade-up" data-aos-delay="200">
            <Button
              className="mt-6 lg:mt-10"
              onClick={() =>
                router.push("/post-service/" + selectedCategory.slug)
              }
            >
              Post a {selectedCategory.name} Job
            </Button>
          </div>

          <div data-aos="fade-up" data-aos-delay="300">
            <h3 className="text-[22px] lg:text-[24px] font-semibold text-primaryText mt-6 mb-2 lg:mt-12 lg:mb-6">
              What’s Included
            </h3>
            <h4 className="text-[18px] lg:text-[20px] font-semibold text-primaryText mb-4 lg:mb-6">
              {isLoading
                ? "Loading"
                : isError
                  ? "Category"
                  : selectedCategory.name}{" "}
              Jobs include:
            </h4>
            <ul className="list-disc list-inside text-[14px] lg:text-[18px] text-primaryTextLight space-y-4 lg:space-y-5">
              {services.length > 0 ? (
                services.map((service) => (
                  <li key={service._id}>{service.name}</li>
                ))
              ) : (
                <li>No services available.</li>
              )}
            </ul>
            <p
              data-aos="fade-up"
              data-aos-delay="100"
              className="text-[14px] lg:text-[18px] text-primaryTextLight mt-4 lg:mt-10"
            >
              {categoryDetailsData?.servicesDetailsDescription2}
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
