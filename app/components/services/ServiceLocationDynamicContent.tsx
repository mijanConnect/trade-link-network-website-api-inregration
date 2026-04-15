"use client";

import { useMemo } from "react";
import StaticFAQItem, {
  staticFaqs,
} from "@/app/components/services/StaticFAQItem";
import RelatedServices from "@/app/components/services/RelatedServices";
import { useGetDynamicServiceLocationQuery } from "@/store/slice/servicesSlice";

type ServiceLocationDynamicContentProps = {
  serviceSlug: string;
  locationSlug: string;
};

const fallbackGuides = [
  {
    title: "How to prepare before requesting this service",
    content:
      "List your priorities, timeline, and expected budget. Clear details help professionals provide accurate quotes and realistic schedules.",
  },
  {
    title: "Questions to ask before hiring",
    content:
      "Ask about previous similar work, estimated completion time, materials included, and post-service support.",
  },
  {
    title: "How to compare quotes effectively",
    content:
      "Do not choose only by lowest price. Compare scope of work, quality promises, and communication clarity.",
  },
];

const fallbackRelatedServiceOptions = [
  { slug: "electrician", label: "Electrician" },
  { slug: "plumbing", label: "Plumbing" },
  { slug: "carpentry", label: "Carpentry" },
  { slug: "painting", label: "Painting" },
  { slug: "roofing", label: "Roofing" },
  { slug: "heating-cooling", label: "Heating & Cooling" },
];

const toDisplayText = (value: string) =>
  value
    .split("-")
    .filter(Boolean)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");

export default function ServiceLocationDynamicContent({
  serviceSlug,
  locationSlug,
}: ServiceLocationDynamicContentProps) {
  const { data, isLoading, isError } = useGetDynamicServiceLocationQuery({
    service: serviceSlug,
    location: locationSlug,
  });

  const locationName = data?.location.name ?? toDisplayText(locationSlug);

  const faqItems = data?.service.faqs?.length ? data.service.faqs : staticFaqs;
  const guideItems = data?.service.guides?.length
    ? data.service.guides
    : fallbackGuides;

  const relatedServices = useMemo(() => {
    const apiRelated = data?.content.relatedServices ?? [];

    if (apiRelated.length > 0) {
      return apiRelated.map((item) => ({
        key: item._id,
        label: item.name,
        slug: item.slug,
        description: `Find ${item.name.toLowerCase()} support in ${locationName}.`,
      }));
    }

    return fallbackRelatedServiceOptions
      .filter((item) => item.slug !== serviceSlug)
      .slice(0, 4)
      .map((item) => ({
        key: item.slug,
        label: item.label,
        slug: item.slug,
        description: `Find ${item.label.toLowerCase()} support in ${locationName}.`,
      }));
  }, [data, locationName, serviceSlug]);

  if (isLoading && !data) {
    return (
      <div className="space-y-8">
        <div className="bg-white rounded-lg shadow-md p-8">
          <p className="text-primaryTextLight">Loading service details...</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="bg-white rounded-lg shadow-md p-4 lg:p-8 mb-8">
        <h2 className="text-2xl font-bold text-primaryText mb-6">
          Frequently Asked Questions
        </h2>
        <StaticFAQItem items={faqItems} />
      </div>

      <RelatedServices
        services={relatedServices}
        locationSlug={locationSlug}
        locationName={locationName}
        isError={isError && !data}
      />

      <div className="bg-white rounded-lg shadow-md p-4 lg:p-8 mb-8">
        <h2 className="text-2xl font-bold text-primaryText mb-6">
          Helpful Guides
        </h2>
        <div className="space-y-5">
          {guideItems.map((guide) => (
            <article
              key={guide.title}
              className="border-b pb-4 last:border-b-0"
            >
              <h3 className="text-lg font-semibold text-primaryText mb-2">
                {guide.title}
              </h3>
              <p className="text-primaryTextLight">{guide.content}</p>
            </article>
          ))}
        </div>
      </div>
    </>
  );
}
