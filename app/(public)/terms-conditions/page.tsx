"use client";

import { useGetDisclaimerQuery } from "@/store/slice/termsSlice";

export default function Page() {
  const { data, isLoading, error } = useGetDisclaimerQuery(
    "terms-and-conditions",
  );

  return (
    <>
      <div className="py-6 lg:py-15">
        <div className="max-w-4xl mx-auto p-4 lg:p-8 bg-white rounded-lg shadow-xl border border-gray-200">
          <h2 className="text-2xl font-semibold text-gray-800 mb-6">
            Terms and Conditions
          </h2>

          {isLoading && (
            <div className="flex justify-center items-center py-10">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
            </div>
          )}

          {error && (
            <div className="text-red-600 text-center py-10">
              Failed to load terms and conditions. Please try again later.
            </div>
          )}

          {data?.content && (
            <div
              className="prose prose-lg max-w-none text-gray-700"
              dangerouslySetInnerHTML={{ __html: data.content }}
            />
          )}
        </div>
      </div>
    </>
  );
}
