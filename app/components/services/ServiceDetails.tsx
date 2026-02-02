"use client";

import { useRouter, useParams } from "next/navigation";
import Button from "../ui/Button";
import { categories } from "./Categories";

export default function ServiceDetails() {
  const router = useRouter();
  const params = useParams();
  const serviceId = params?.id as string | undefined;
  const selectedCategory = categories.find((c) => c.slug === serviceId) || {
    name: "Selected",
  };

  return (
    <>
      <div className="container mx-auto px-4">
        <div className="mb-8 lg:mb-25">
          <h2 className="text-[22px] lg:text-[40px] font-bold text-primaryText">
            Find Trusted {selectedCategory.name} Professionals <br /> Across the
            UK
          </h2>
          <p className="text-[14px] lg:text-[18px] text-primaryTextLight mt-4 lg:mt-10">
            Find trusted, verified tradespeople across Greater London for
            landscaping, building work, repairs and specialist services.Trade
            Link Network connects homeowners with suitable local professionals,
            making it easy to compare options and manage everything online
          </p>

          <Button
            className="mt-6 lg:mt-10"
            onClick={() => router.push("/post-service")}
          >
            Post a {selectedCategory.name} Job
          </Button>

          <div>
            <h3 className="text-[22px] lg:text-[24px] font-semibold text-primaryText mt-6 mb-2 lg:mt-12 lg:mb-6">
              What’s Included
            </h3>
            <h4 className="text-[18px] lg:text-[20px] font-semibold text-primaryText mb-4 lg:mb-6">
              Outdoor & Landscape Jobs include:
            </h4>
            <ul className="list-disc list-inside text-[14px] lg:text-[18px] text-primaryTextLight space-y-4 lg:space-y-5">
              <li>Access to a network of trusted, verified tradespeople</li>
              <li>Easy online comparison of quotes and services</li>
              <li>Secure online booking and payment options</li>
              <li>Customer reviews and ratings for informed decisions</li>
              <li>Dedicated customer support for assistance</li>
              <li>Access to a network of trusted, verified tradespeople</li>
              <li>Easy online comparison of quotes and services</li>
              <li>Secure online booking and payment options</li>
              <li>Customer reviews and ratings for informed decisions</li>
              <li>Dedicated customer support for assistance</li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}
