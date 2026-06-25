"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function NotFound() {
  const router = useRouter();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-linear-to-b from-gray-50 to-gray-100">
      <div className="text-center flex flex-col items-center">
        <Image
          src="/assets/404.png"
          alt="404 Not Found"
          width={900}
          height={600}
          className="mb-8"
        />
        <div className="flex gap-4 justify-center">
          <button
            onClick={() => router.back()}
            className="px-8 py-3 bg-primary text-white rounded-md hover:bg-primary/90 transition w-[200px]"
          >
            Go Back
          </button>
          <Link
            href="/categories"
            className="px-8 py-3 bg-gray-800 text-white rounded-md hover:bg-gray-900 transition w-[200px]"
          >
            Browse Services
          </Link>
        </div>
      </div>
    </div>
  );
}
