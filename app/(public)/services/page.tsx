import { Metadata } from "next";
import Breadcrumb from "@/app/components/services/Breadcrumb";
import CategoryServicesCard from "@/app/components/services/CategoryServicesCard";

// ISR: Revalidate every 1800 seconds (30 minutes)
export const revalidate = 1800;

type Category = {
  _id: string;
  name?: string;
  title?: string;
};

async function fetchCategories(): Promise<Category[]> {
  const apiBaseUrl =
    process.env.NEXT_PUBLIC_API_BASE_URL || process.env.NEXT_PUBLIC_BASE_URL;

  if (!apiBaseUrl) {
    console.warn("API base URL not configured");
    return [];
  }

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 5000); // 5 second timeout

  try {
    const response = await fetch(`${apiBaseUrl}/categories`, {
      method: "GET",
      signal: controller.signal,
      next: {
        revalidate: 1800, // Cache for 30 minutes
        tags: ["categories"],
      },
    });

    clearTimeout(timeoutId);

    if (!response.ok) {
      console.error("Failed to fetch categories:", response.status);
      return [];
    }

    const result = await response.json();
    return (result?.data ?? result) as Category[];
  } catch (error) {
    clearTimeout(timeoutId);
    console.error("Error fetching categories:", error);
    return [];
  }
}

export const metadata: Metadata = {
  title: "Services | TradeLink Network",
  description:
    "Find trusted, verified trade professionals for all your service needs. Get instant quotes and compare professionals in your area.",
  keywords: [
    "professional services",
    "trade professionals",
    "verified trades",
    "local services",
    "services",
    "uk services",
    "homeowners services",
    "service categories",
    "trusted professionals",
    "compare services",
  ],
  openGraph: {
    title: "Services | TradeLink Network",
    description:
      "Find trusted, verified trade professionals for all your service needs.",
    type: "website",
  },
};

export default async function ServicesPage() {
  const categories = await fetchCategories();
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div className="bg-primary">
        <div className="container mx-auto px-4 py-8 lg:py-24 text-center">
          <h1 className="text-2xl lg:text-5xl font-bold mb-4 text-white">
            Professional Services Near You
          </h1>
          <p className="text-md lg:text-xl opacity-90 max-w-2xl mx-auto text-white">
            Find trusted, verified trade professionals for all your service
            needs. Get instant quotes and compare professionals in your area.
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8 lg:py-16">
        {/* Breadcrumb Navigation */}
        <div className="mb-6">
          <Breadcrumb
            items={[
              { label: "Home", href: "/" },
              { label: "Services", current: true },
            ]}
          />
        </div>

        {/* Categories and Services Section */}
        <div>
          {categories && categories.length > 0 ? (
            <div className="flex flex-col gap-4 lg:gap-5 w-full">
              {categories.map((category, index) => (
                <CategoryServicesCard
                  key={category._id}
                  category={category}
                  index={index}
                />
              ))}
            </div>
          ) : (
            <LoadingFallback />
          )}
        </div>
      </div>
    </div>
  );
}

function LoadingFallback() {
  return (
    <div className="text-center py-12">
      <p className="text-gray-600 mb-4">Loading categories...</p>
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
    </div>
  );
}
