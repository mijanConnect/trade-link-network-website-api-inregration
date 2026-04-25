"use client";

import Link from "next/link";
import { skipToken } from "@reduxjs/toolkit/query";
import { useGetCategoriesServicesQuery } from "@/store/slice/categoriesSlice";

type Category = {
  _id: string;
  name?: string;
  title?: string;
};

type CategoryService = {
  _id: string;
  name?: string;
  slug?: string;
};

type CategoryServicesCardProps = {
  category: Category;
  index: number;
};

export default function CategoryServicesCard({
  category,
}: CategoryServicesCardProps) {
  const { data: servicesData, isLoading } = useGetCategoriesServicesQuery(
    category?._id || skipToken,
  );

  const services = ((servicesData || []) as CategoryService[]).filter(
    (service) => service.name !== "Not sure yet – need advice",
  );

  const toSlug = (value: string) =>
    value
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9\s-]/g, "")
      .replace(/\s+/g, "-");

  return (
    <div className="group bg-white rounded-sm p-5 lg:p-6 w-full transition-all duration-300 shadow-[0_0_10px_rgba(0,0,0,0.05)] border hover:border-primary hover:shadow-md">
      <div className="flex items-start justify-between gap-3 mb-5">
        <h3 className="font-semibold text-primaryText text-lg leading-snug">
          {category?.title || category?.name || "Category"}
        </h3>
        <span className="shrink-0 text-xs font-medium px-2.5 py-1 rounded-full bg-primary/10 text-primary border border-primary/20">
          {services.length} services
        </span>
      </div>

      {isLoading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2">
          <div className="h-9 bg-gray-100 rounded-sm animate-pulse" />
          <div className="h-9 bg-gray-100 rounded-sm animate-pulse" />
          <div className="h-9 bg-gray-100 rounded-sm animate-pulse" />
          <div className="h-9 bg-gray-100 rounded-sm animate-pulse" />
          <div className="h-9 bg-gray-100 rounded-sm animate-pulse" />
          <div className="h-9 bg-gray-100 rounded-sm animate-pulse" />
          <div className="h-9 bg-gray-100 rounded-sm animate-pulse" />
          <div className="h-9 bg-gray-100 rounded-sm animate-pulse" />
          <div className="h-9 bg-gray-100 rounded-sm animate-pulse" />
          <div className="h-9 bg-gray-100 rounded-sm animate-pulse" />
          <div className="h-9 bg-gray-100 rounded-sm animate-pulse" />
          <div className="h-9 bg-gray-100 rounded-sm animate-pulse" />
        </div>
      ) : services.length > 0 ? (
        <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2">
          {services.map((service) => (
            <li key={service._id}>
              <Link
                href={`/services/${service?.slug || toSlug(service?.name || "service")}`}
                className="flex items-center justify-between rounded-sm px-3 py-2 text-sm text-gray-700 bg-gray-50 border border-gray-100 hover:border-primary hover:bg-gray-100 hover:text-primary transition-all duration-200"
              >
                <span>{service?.name || "Service"}</span>
                <svg
                  className="h-4 w-4"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  aria-hidden="true"
                >
                  <path
                    d="M5 12H19M19 12L13 6M19 12L13 18"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </Link>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-sm text-gray-500">No services found.</p>
      )}
    </div>
  );
}
