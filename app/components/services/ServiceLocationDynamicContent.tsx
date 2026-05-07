"use client";

import { useMemo } from "react";
import StaticFAQItem, {
  staticFaqs,
} from "@/app/components/services/StaticFAQItem";
import RelatedServices from "@/app/components/services/RelatedServices";
import RelatedLocations from "@/app/components/services/RelatedLocations";
import { useGetDynamicServiceLocationQuery } from "@/store/slice/servicesSlice";

type ServiceLocationDynamicContentProps = {
  serviceSlug: string;
  locationSlug: string;
};

const fallbackGuides = [
  {
    title: "How to prepare before posting your job",
    content:
      "List your project priorities, preferred timeline, estimated budget, and any important details about the work required. Adding measurements, photos, material preferences, and access information can help professionals provide more accurate quotes and realistic timescales through the platform.",
  },
  {
    title: "Questions to ask before choosing a professional",
    content:
      "Ask about previous similar projects, estimated completion times, materials included, guarantees, insurance coverage, and whether preparation or waste removal is included within the quote. Comparing multiple responses can help you make a more informed decision.",
  },
  {
    title: "How to compare quotes effectively",
    content:
      "Do not choose based on price alone. Compare the scope of work, materials proposed, preparation included, estimated timelines, communication quality, reviews, and overall value offered by each professional responding to your job request.",
  },
  {
    title: "What can affect quote prices?",
    content:
      "Quote prices can vary depending on project size, property access, material choices, groundwork requirements, drainage conditions, labour needs, and installation complexity. Additional preparation work or specialist materials may also affect final pricing and project timelines.",
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

const fallbackRelatedLocationOptions = [
  { slug: "london", label: "London" },
  { slug: "manchester", label: "Manchester" },
  { slug: "birmingham", label: "Birmingham" },
  { slug: "leeds", label: "Leeds" },
  { slug: "bristol", label: "Bristol" },
  { slug: "edinburgh", label: "Edinburgh" },
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

  const activeControl = data?.activeControl ?? {
    isRelatedLocationActive: true,
    isRelatedServiceActive: true,
    isLocalNotesActive: true,
    isFaqActive: true,
  };

  const faqItems = data?.service.faqs?.length ? data.service.faqs : staticFaqs;
  const guideItems = data?.service.guides?.length
    ? data.service.guides
    : fallbackGuides;

  const relatedServices = useMemo(() => {
    const apiRelated = (data?.content.relatedServices ?? []).filter(
      (item) => item.name !== "Not sure yet – need advice",
    );

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

  const relatedLocations = useMemo(() => {
    const serviceName = data?.service.name ?? toDisplayText(serviceSlug);
    const apiRelated = data?.content.relatedLocations ?? [];

    if (apiRelated.length > 0) {
      return apiRelated.map((item) => ({
        key: item._id,
        label: item.name,
        slug: item.slug,
        description: `Find ${serviceName.toLowerCase()} support in ${item.name}.`,
      }));
    }

    return fallbackRelatedLocationOptions
      .filter((item) => item.slug !== locationSlug)
      .slice(0, 4)
      .map((item) => ({
        key: item.slug,
        label: item.label,
        slug: item.slug,
        description: `Find ${serviceName.toLowerCase()} support in ${item.label}.`,
      }));
  }, [data, serviceSlug, locationSlug]);

  if (isLoading && !data) {
    return (
      <div className="space-y-8">
        <div className="bg-white rounded-sm shadow-[0_0_10px_rgba(0,0,0,0.05)] p-8">
          <p className="text-primaryTextLight">Loading service details...</p>
        </div>
      </div>
    );
  }

  return (
    <>
      {activeControl.isRelatedServiceActive && (
        <RelatedServices
          services={relatedServices}
          locationSlug={locationSlug}
          locationName={locationName}
          isError={isError && !data}
        />
      )}

      {activeControl.isRelatedLocationActive && (
        <RelatedLocations
          locations={relatedLocations}
          serviceSlug={serviceSlug}
          serviceName={data?.service.name ?? toDisplayText(serviceSlug)}
          isError={isError && !data}
        />
      )}

      {activeControl.isLocalNotesActive && (
        <div className="bg-white rounded-sm shadow-[0_0_10px_rgba(0,0,0,0.05)] p-4 lg:p-8 mb-8">
          <h2 className="text-2xl font-bold text-primaryText mb-6">
            Helpful local guides
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
      )}

      {activeControl.isFaqActive && (
        <div className="bg-white rounded-sm shadow-[0_0_10px_rgba(0,0,0,0.05)] p-4 lg:p-8 mb-8">
          <h2 className="text-2xl font-bold text-primaryText mb-6">
            Frequently Asked Questions
          </h2>
          <StaticFAQItem items={faqItems} />
        </div>
      )}
    </>
  );
}
