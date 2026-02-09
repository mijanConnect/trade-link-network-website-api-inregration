"use client";

import { Suspense } from "react";
import JobsContainer from "@/app/components/my-jobs/JobsContainer";

export default function Page() {
  return (
    <>
      <div className="container mx-auto px-4 my-6 lg:mt-15 lg:mb-30">
        <Suspense
          fallback={
            <div className="flex justify-center items-center py-20">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
            </div>
          }
        >
          <JobsContainer />
        </Suspense>
      </div>
    </>
  );
}
