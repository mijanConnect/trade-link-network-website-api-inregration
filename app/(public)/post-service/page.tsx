"use client";
import PostService from "@/app/components/post-service/PostService";
import { Suspense } from "react";

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
