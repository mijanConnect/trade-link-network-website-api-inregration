"use client";
import PostService from "@/app/components/post-service/PostService";
import { Suspense } from "react";

// Note: This is a client component, so metadata won't apply here directly
// For metadata support, this should be converted to a server component
// or metadata should be added at the layout level

export default function Page() {
  return (
    <>
      <div className="container mx-auto px-4 my-6 lg:mt-15 lg:mb-30">
        <Suspense fallback={<p>Loading...</p>}>
          <PostService />
        </Suspense>
      </div>
    </>
  );
}
