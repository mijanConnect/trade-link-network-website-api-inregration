"use client";

import Link from "next/link";

type RelatedService = {
  key: string;
  label: string;
  slug: string;
  description: string;
};

type RelatedServicesProps = {
  services: RelatedService[];
  locationSlug: string;
  locationName: string;
  isError?: boolean;
};

export default function RelatedServices({
  services,
  locationSlug,
  locationName,
  isError,
}: RelatedServicesProps) {
  return (
    <div className="bg-white rounded-lg shadow-md p-4 lg:p-8 mb-8">
      <h2 className="text-2xl font-bold text-primaryText mb-4">
        Related Services in {locationName}
      </h2>
      <p className="text-primaryTextLight mb-6">
        Explore other services available in {locationName} that may be useful
        for your project.
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {services.map((relatedService) => (
          <Link
            key={relatedService.key}
            href={`/services/${relatedService.slug}/${locationSlug}`}
            className="group rounded-lg border border-gray-200 p-4 lg:p-5 transition-all duration-200 hover:border-primary hover:shadow-sm hover:bg-gray-50 block"
          >
            <div className="flex items-center justify-between gap-4">
              <div>
                <h3 className="text-lg font-semibold text-primaryText group-hover:text-primary">
                  {relatedService.label}
                </h3>
                <p className="mt-1 text-sm text-primaryTextLight">
                  {relatedService.description}
                </p>
              </div>
              <span className="text-primary text-xl transition-transform duration-200 group-hover:translate-x-1">
                →
              </span>
            </div>
          </Link>
        ))}
      </div>
      {isError ? (
        <p className="mt-4 text-sm text-red-600">
          Unable to load related services right now.
        </p>
      ) : null}
    </div>
  );
}
