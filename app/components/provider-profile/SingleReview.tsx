import { Star } from "lucide-react";
import Image from "next/image";
import React from "react";

export default function SingleReview() {
  return (
    <>
      <div>
        <div className="flex gap-4 lg:gap-6 items-start max-w-xl border-b border-stroke pb-4 mb-4 lg:mb-6 lg:pb-6">
          <Image
            src="/assets/avatar.png"
            alt="Left Part Image"
            width={60}
            height={60}
            className="rounded-full object-cover"
          />
          <div>
            <div className="flex justify-between items-start w-full">
              <div className="">
                <h3 className="text-[18px] text-primaryText font-semibold">
                  Josh Peter
                </h3>
                <div className="flex gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`h-4 w-4 ${
                        i < 4
                          ? "fill-yellow-500 text-yellow-500"
                          : "fill-gray-300 text-gray-300"
                      }`}
                    />
                  ))}
                </div>
              </div>
              <p className="text-sm text-gray-500">5 February 2026</p>
            </div>
            <p className="mt-2 lg:mt-4 text-primaryText text-[14px] lg:text-[16px] leading-6 lg:leading-7">
              I have used 263 Pros twice now for two completely different
              services and I’ve had a fantastic experience both times!
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
