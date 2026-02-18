"use client";

import { useGetDisclaimerQuery } from "@/store/slice/categoriesSlice";

export default function Page() {
  const { data, isLoading, error } = useGetDisclaimerQuery(
    "terms-and-conditions",
  );

  return (
    <>
      <div className="container mx-auto px-4 my-6 lg:mt-15 lg:mb-30">
        <div className="">
          <h2 className="text-[24px] lg:text-[48px] font-semibold text-primaryTextmb-4 lg:mb-15 text-center">
            Terms and Conditions
          </h2>

          {isLoading && (
            <div className="flex justify-center items-center py-10">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
            </div>
          )}

          {error && (
            <div className="text-red-600 text-center py-10">
              Failed to load review policy. Please try again later.
            </div>
          )}

          {data?.content && (
            <div
              className="text-primaryText text-[14px] lg:text-[18px]"
              dangerouslySetInnerHTML={{ __html: data.content }}
            />
          )}
        </div>
      </div>
    </>
  );
}
