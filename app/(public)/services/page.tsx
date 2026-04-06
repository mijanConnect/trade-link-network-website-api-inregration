"use client";

import { useEffect } from "react";
import AOS from "aos";
import Breadcrumb from "@/app/components/services/Breadcrumb";
import { useGetCategoriesQuery } from "@/store/slice/categoriesSlice";
import CategoryServicesCard from "@/app/components/services/CategoryServicesCard";

type Category = {
  _id: string;
  name?: string;
  title?: string;
};

export default function ServicesPage() {
  const {
    data: categoriesData,
    isLoading,
    isError,
  } = useGetCategoriesQuery({});
  const categories = (categoriesData || []) as Category[];

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
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gray-100">
        <div className="container mx-auto px-4 py-16 lg:py-24 text-center">
          <h1
            data-aos="fade-up"
            className="text-3xl lg:text-5xl font-bold mb-4 text-black"
          >
            Professional Services Near You
          </h1>
          <p
            data-aos="fade-up"
            data-aos-delay="100"
            className="text-lg lg:text-xl opacity-90 max-w-2xl mx-auto text-primary"
          >
            Find trusted, verified trade professionals for all your service
            needs. Get instant quotes and compare professionals in your area.
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-16">
        {/* Breadcrumb Navigation */}
        <div className="mb-6">
          <Breadcrumb
            items={[
              { label: "Home", href: "/" },
              { label: "Services", current: true },
            ]}
          />
        </div>
        {/* Categories and Services Section */}
        <div className="mb-16">
          {/* <h2
            data-aos="fade-up"
            className="text-3xl lg:text-4xl font-bold text-primaryText mb-4 text-center"
          >
            All the Services by Categories
          </h2>
          <p
            data-aos="fade-up"
            data-aos-delay="100"
            className="text-center text-primaryTextLight mb-12 max-w-2xl mx-auto"
          >
            Browse categories and see available services under each category
          </p> */}

          {isLoading ? (
            <p className="text-center text-gray-600">Loading categories...</p>
          ) : isError ? (
            <p className="text-center text-red-500">
              Failed to load categories.
            </p>
          ) : (
            <div className="flex flex-col gap-4 lg:gap-5 w-full">
              {categories.map((category, index) => (
                <CategoryServicesCard
                  key={category._id}
                  category={category}
                  index={index}
                />
              ))}
            </div>
          )}
        </div>

        {/* How It Works Section */}
        {/* <div className="bg-white rounded-lg shadow-md p-8 lg:p-12 my-16">
          <h2
            data-aos="fade-up"
            className="text-3xl lg:text-4xl font-bold text-primaryText mb-12 text-center"
          >
            How It Works
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div
              data-aos="fade-up"
              data-aos-delay="100"
              className="text-center"
            >
              <div className="bg-blue-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl font-bold text-blue-600">1</span>
              </div>
              <h3 className="text-xl font-semibold text-primaryText mb-2">
                Choose Your Service
              </h3>
              <p className="text-gray-600">
                Select the service type and your location to find professionals
              </p>
            </div>

            <div
              data-aos="fade-up"
              data-aos-delay="200"
              className="text-center"
            >
              <div className="bg-blue-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl font-bold text-blue-600">2</span>
              </div>
              <h3 className="text-xl font-semibold text-primaryText mb-2">
                Post Your Job
              </h3>
              <p className="text-gray-600">
                Describe your specific needs and get instant quotes from
                verified professionals
              </p>
            </div>

            <div
              data-aos="fade-up"
              data-aos-delay="300"
              className="text-center"
            >
              <div className="bg-blue-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl font-bold text-blue-600">3</span>
              </div>
              <h3 className="text-xl font-semibold text-primaryText mb-2">
                Compare & Book
              </h3>
              <p className="text-gray-600">
                Review profiles, compare quotes, and book your preferred
                professional
              </p>
            </div>
          </div>
        </div> */}

        {/* CTA Section */}
        {/* <div
          data-aos="fade-up"
          className="bg-primary text-white rounded-lg p-8 lg:p-12 text-center"
        >
          <h2 className="text-3xl lg:text-4xl font-bold mb-4">
            Ready to Get Started?
          </h2>
          <p className="text-lg opacity-90 mb-8 max-w-2xl mx-auto">
            Post your job now and connect with trusted professionals in your
            area
          </p>
          <Link href="/post-service">
            <Button className="bg-white text-blue-600 hover:bg-gray-100 font-semibold px-8 py-3">
              Post a Job Now
            </Button>
          </Link>
        </div> */}
      </div>
    </div>
  );
}
