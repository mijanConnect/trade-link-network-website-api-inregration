"use client";

import Link from "next/link";

type RelatedLocation = {
  key: string;
  label: string;
  slug: string;
  description: string;
};

type RelatedLocationsProps = {
  locations: RelatedLocation[];
  serviceSlug: string;
  serviceName: string;
  isError?: boolean;
};

export default function RelatedLocations({
  locations,
  serviceSlug,
  serviceName,
  isError,
}: RelatedLocationsProps) {
  return (
    <div className="bg-white rounded-sm shadow-[0_0_10px_rgba(0,0,0,0.05)] p-4 lg:p-8 mb-8">
      <h2 className="text-2xl font-bold text-primaryText mb-4">
        {serviceName} in Other Locations
      </h2>
      <p className="text-primaryTextLight mb-6">
        Looking for {serviceName.toLowerCase()} services in a different area?
        Explore {serviceName.toLowerCase()} professionals in nearby locations.
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {locations.map((relatedLocation) => (
          <Link
            key={relatedLocation.key}
            href={`/services/${serviceSlug}/${relatedLocation.slug}`}
            className="group rounded-sm border border-gray-200 p-4 lg:p-5 transition-all duration-200 hover:border-primary hover:shadow-sm hover:bg-gray-50 block"
          >
            <div className="flex items-center justify-between gap-4">
              <div>
                <h3 className="text-lg font-semibold text-primaryText group-hover:text-primary">
                  {relatedLocation.label}
                </h3>
                <p className="mt-1 text-sm text-primaryTextLight">
                  {relatedLocation.description}
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
          Unable to load related locations right now.
        </p>
      ) : null}
    </div>
  );
}
