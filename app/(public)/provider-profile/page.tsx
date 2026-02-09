"use client";

import { Suspense } from "react";
import ProviderContainer from "@/app/components/provider-profile/ProviderContainer";

export default function Page() {
  return (
    <>
      <div className="container mx-auto px-4 my-6 lg:mt-15 lg:mb-30">
        <Suspense fallback={<div className="flex justify-center items-center py-20"><div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div></div>}>
          <ProviderContainer />
        </Suspense>
      </div>
    </>
  );
}
