"use client";

import { useEffect, useState } from "react";
import CategoryServicesCard from "./CategoryServicesCard";

type Category = {
  _id: string;
  name?: string;
  title?: string;
};

export default function ClientCategoriesLoader() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCategories = async () => {
      const apiBaseUrl =
        process.env.NEXT_PUBLIC_API_BASE_URL ||
        process.env.NEXT_PUBLIC_BASE_URL;

      if (!apiBaseUrl) {
        setError("API configuration missing");
        setIsLoading(false);
        return;
      }

      try {
        const response = await fetch(`${apiBaseUrl}/categories`, {
          method: "GET",
        });

        if (!response.ok) {
          throw new Error(`Failed to fetch: ${response.status}`);
        }

        const result = await response.json();
        const data = (result?.data ?? result) as Category[];
        setCategories(data || []);
      } catch (err) {
        console.error("Error fetching categories:", err);
        setError("Failed to load categories");
      } finally {
        setIsLoading(false);
      }
    };

    fetchCategories();
  }, []);

  if (isLoading) {
    return (
      <div className="flex flex-col gap-4 lg:gap-5 w-full">
        {[...Array(5)].map((_, i) => (
          <div
            key={i}
            className="bg-white rounded-lg shadow-md p-6 lg:p-8 animate-pulse"
          >
            <div className="h-6 bg-gray-200 rounded w-1/3 mb-4"></div>
            <div className="space-y-3">
              <div className="h-4 bg-gray-200 rounded"></div>
              <div className="h-4 bg-gray-200 rounded w-5/6"></div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <p className="text-red-500 font-semibold mb-2">{error}</p>
        <p className="text-gray-600">Please try refreshing the page</p>
      </div>
    );
  }

  if (categories.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-600">No categories available at the moment.</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4 lg:gap-5 w-full">
      {categories.map((category, index) => (
        <CategoryServicesCard
          key={category._id}
          category={category}
          index={index}
        />
      ))}
    </div>
  );
}
