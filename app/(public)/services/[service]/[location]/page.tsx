import { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Button from "@/app/components/ui/Button";
import Breadcrumb from "@/app/components/services/Breadcrumb";
import ServiceLocationDynamicContent from "@/app/components/services/ServiceLocationDynamicContent";

export const dynamicParams = true;
export const revalidate = 60;

type Props = {
  params: Promise<{
    service: string;
    location: string;
  }>;
};

const toDisplayText = (value: string) =>
  value
    .split("-")
    .filter(Boolean)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");

function createStaticPageData(service: string, location: string) {
  const serviceName = toDisplayText(service);
  const locationName = toDisplayText(location);

  return {
    serviceName,
    locationName,
    title: `${serviceName} in ${locationName} | TradeLink Network`,
    description: `Find trusted ${serviceName.toLowerCase()} professionals in ${locationName}. Post your job, compare quotes, and hire with confidence.`,
    intro: `Looking for reliable ${serviceName.toLowerCase()} services in ${locationName}? TradeLink Network helps you connect with local professionals who match your project needs.`,
    coreDescription: `${serviceName} services on TradeLink Network are built to deliver reliable, high-quality solutions backed by skilled professionals and strong local expertise. Whether you require urgent assistance or are planning a project in advance, the platform makes it easy to connect with trusted specialists in ${locationName} who understand the specific requirements of your area. From initial consultation and assessment to completion, professionals focus on delivering efficient, safe, and long-lasting results using industry best practices and quality materials. With a commitment to transparency, timely service, and customer satisfaction, TradeLink Network ensures you can confidently find the right experts to handle your ${serviceName} needs with precision and care.`,
    detailedInfo: [
      "Provide a clear and detailed description of your requirements, including the scope of work, specific issues, and any expectations, so professionals can offer accurate quotes and tailored solutions.",
      "Review and compare multiple responses by considering timelines, pricing, scope of work, and verified customer feedback to make a well-informed decision.",
      "Communicate directly with professionals to discuss materials, project stages, deadlines, and expected outcomes, ensuring transparency and avoiding misunderstandings.",
      `Always choose professionals who are experienced and familiar with local standards, regulations, and property types in ${locationName} to ensure the work meets regional expectations.`,
      "Where possible, request examples of previous work or references to better understand the quality and reliability of the service provider.",
      "Confirm all details, including costs, timelines, and responsibilities, before starting the project to ensure a smooth and hassle-free experience.",
    ],
    localNotes: `${locationName} has varying property styles and service demands, so project complexity can differ by neighborhood. Sharing photos and exact requirements helps professionals provide better recommendations.`,
  };
}

async function fetchDynamicServiceLocationSeo(
  service: string,
  location: string,
) {
  const apiBaseUrl =
    process.env.NEXT_PUBLIC_API_BASE_URL || process.env.NEXT_PUBLIC_BASE_URL;

  if (!apiBaseUrl) {
    return null;
  }

  try {
    const response = await fetch(
      `${apiBaseUrl}/service-locations/dynamic/${service}/${location}`,
      {
        next: {
          revalidate: 60,
        },
      },
    );

    if (!response.ok) {
      return null;
    }

    const result = await response.json();
    return result?.data ?? null;
  } catch {
    return null;
  }
}

// 📊 Static Generation - Disabled for this high-cardinality route
// Since dynamicParams is true, routes will be rendered on-demand with ISR caching
export async function generateStaticParams() {
  // Return empty array to disable static generation for all combinations
  // This prevents build-time errors from generating too many routes
  console.log("ℹ️ Dynamic route - serving on-demand with ISR");
  return [];
}

// ⚡ SEO Meta Generation
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { service, location } = await params;
  const pageData = createStaticPageData(service, location);
  const dynamicData = await fetchDynamicServiceLocationSeo(service, location);

  const baseUrl =
    process.env.NEXT_PUBLIC_BASE_URL || "https://www.tradelinknetwork.co.uk";
  const canonicalPath =
    dynamicData?.seo?.canonical || `/services/${service}/${location}`;
  const canonicalUrl = canonicalPath.startsWith("http")
    ? canonicalPath
    : `${baseUrl}${canonicalPath}`;

  return {
    title: dynamicData?.seo?.metaTitle || pageData.title,
    description: dynamicData?.seo?.metaDescription || pageData.description,
    keywords: [
      pageData.serviceName,
      pageData.locationName,
      "local services",
      "tradesperson",
      "professionals",
    ],
    alternates: {
      canonical: canonicalUrl,
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-image-preview": "large",
        "max-snippet": -1,
        "max-video-preview": -1,
      },
    },
    openGraph: {
      title: dynamicData?.seo?.metaTitle || pageData.title,
      description: dynamicData?.seo?.metaDescription || pageData.description,
      type: "website",
      url: canonicalUrl,
      siteName: "TradeLink Network",
      locale: "en_GB",
      images: [
        {
          url: `${baseUrl}/og-image.jpg`,
          width: 1200,
          height: 630,
          alt: `${pageData.serviceName} in ${pageData.locationName}`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: dynamicData?.seo?.metaTitle || pageData.title,
      description: dynamicData?.seo?.metaDescription || pageData.description,
    },
  };
}

// 🔧 Dynamic Page Component
export default async function ServiceLocationPage({ params }: Props) {
  const { service, location } = await params;
  const pageData = createStaticPageData(service, location);
  const dynamicData = await fetchDynamicServiceLocationSeo(service, location);

  // Show not-found page if service/location combination doesn't exist
  if (!dynamicData) {
    notFound();
  }

  const baseUrl =
    process.env.NEXT_PUBLIC_BASE_URL || "https://www.tradelinknetwork.co.uk";

  return (
    <section className="min-h-screen">
      {/* Structured Data - JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@graph": [
              {
                "@type": "Service",
                name: dynamicData?.service?.name || pageData.serviceName,
                description:
                  dynamicData?.seo?.metaDescription || pageData.description,
                provider: {
                  "@type": "LocalBusiness",
                  name: "TradeLink Network",
                  url: "https://www.tradelinknetwork.co.uk",
                },
                areaServed: {
                  "@type": dynamicData?.location?.type || "AdministrativeArea",
                  name: dynamicData?.location?.name || pageData.locationName,
                },
                image: `${baseUrl}/assets/hero-2.webp`,
              },
              {
                "@type": "BreadcrumbList",
                itemListElement: [
                  {
                    "@type": "ListItem",
                    position: 1,
                    name: "Home",
                    item: `${process.env.NEXT_PUBLIC_BASE_URL || "https://www.tradelinknetwork.co.uk"}`,
                  },
                  {
                    "@type": "ListItem",
                    position: 2,
                    name: "Services",
                    item: `${baseUrl}/services`,
                  },
                  {
                    "@type": "ListItem",
                    position: 3,
                    name: pageData.serviceName,
                    item: `${baseUrl}/services/${service}/${location}`,
                  },
                  {
                    "@type": "ListItem",
                    position: 4,
                    name: pageData.locationName,
                    item: `${baseUrl}/services/${service}/${location}`,
                  },
                ],
              },
            ],
          }),
        }}
      />

      {/* Hero Section */}
      <div className="bg-primary">
        <div className="container mx-auto px-4 py-8 lg:py-24">
          <h1 className="text-2xl lg:text-5xl font-bold mb-4 text-center text-white">
            {dynamicData?.seo?.h1 ||
              `${pageData.serviceName} Services in ${pageData.locationName}`}
          </h1>
          <p className="text-md lg:text-lg opacity-90 max-w-4xl text-center text-white mx-auto">
            {pageData.intro}
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
              { label: "Services", href: "/services" },
              { label: pageData.serviceName },
              { label: pageData.locationName, current: true },
            ]}
          />
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-2 lg:gap-8">
          {/* Left Column - Info */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-sm shadow-[0_0_10px_rgba(0,0,0,0.05)] p-4 lg:p-8 mb-8">
              <h2 className="text-2xl font-bold text-primaryText mb-4">
                Trusted {pageData.serviceName} in {pageData.locationName}
              </h2>
              <p className="text-primaryTextLight">
                {dynamicData?.seo?.metaDescription || pageData.intro}
              </p>
            </div>

            <div className="bg-white rounded-sm shadow-[0_0_10px_rgba(0,0,0,0.05)] p-4 lg:p-8 mb-8 border-l-4 border-primary">
              <h2 className="text-2xl font-bold text-primaryText mb-3">
                Need {pageData.serviceName} Support Right Now?
              </h2>
              <p className="text-primaryTextLight mb-6">
                Share your requirements and receive responses from professionals
                serving {pageData.locationName}.
              </p>
              <Link href="/categories">
                <Button>Post Your Job Request</Button>
              </Link>
            </div>

            {dynamicData?.service?.description && (
              <div className="bg-white rounded-sm shadow-[0_0_10px_rgba(0,0,0,0.05)] p-4 lg:p-8 mb-8">
                <h2 className="text-2xl font-bold text-primaryText mb-4">
                  {pageData.serviceName} Description
                </h2>
                <p className="text-primaryTextLight">
                  {dynamicData.service.description}
                </p>
              </div>
            )}

            {dynamicData?.service?.detailedDescription &&
            dynamicData.service.detailedDescription.length > 0 ? (
              <div className="bg-white rounded-sm shadow-[0_0_10px_rgba(0,0,0,0.05)] p-4 lg:p-8 mb-8">
                <h2 className="text-2xl font-bold text-primaryText mb-4">
                  Detailed Service Information
                </h2>
                <ul className="space-y-3 text-primaryTextLight">
                  {dynamicData.service.detailedDescription.map(
                    (item: string) => (
                      <li key={item} className="flex items-start">
                        <span className="text-primary font-bold mr-3">•</span>
                        <span>{item}</span>
                      </li>
                    ),
                  )}
                </ul>
              </div>
            ) : (
              <div className="bg-white rounded-sm shadow-[0_0_10px_rgba(0,0,0,0.05)] p-4 lg:p-8 mb-8">
                <h2 className="text-2xl font-bold text-primaryText mb-4">
                  Core {pageData.serviceName} Service Description
                </h2>
                <p className="text-primaryTextLight">
                  {pageData.coreDescription}
                </p>
              </div>
            )}

            {!dynamicData?.service?.description && (
              <div className="bg-white rounded-sm shadow-[0_0_10px_rgba(0,0,0,0.05)] p-4 lg:p-8 mb-8">
                <h2 className="text-2xl font-bold text-primaryText mb-4">
                  Detailed Service Information
                </h2>
                <ul className="space-y-3 text-primaryTextLight">
                  {pageData.detailedInfo.map((item: string) => (
                    <li key={item} className="flex items-start">
                      <span className="text-primary font-bold mr-3">•</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <div className="bg-white rounded-sm shadow-[0_0_10px_rgba(0,0,0,0.05)] p-4 lg:p-8 mb-8">
              <h2 className="text-2xl font-bold text-primaryText mb-4">
                Local Notes for {pageData.locationName}
              </h2>
              <p className="text-primaryTextLight whitespace-pre-line">
                {dynamicData?.content?.localNotes || pageData.localNotes}
              </p>
            </div>

            <ServiceLocationDynamicContent
              serviceSlug={service}
              locationSlug={location}
            />
          </div>

          {/* Final call-to-action section */}
          <div>
            <div className="bg-white rounded-sm shadow-[0_0_10px_rgba(0,0,0,0.05)] p-4 lg:p-8 sticky top-4">
              <h2 className="text-2xl font-bold text-primaryText mb-4">
                Ready to Get Started?
              </h2>
              <p className="text-primaryTextLight mb-6">
                Post your {pageData.serviceName.toLowerCase()} job in{" "}
                {pageData.locationName} today and connect with trusted local
                professionals.
              </p>
              <Link href="/categories">
                <Button className="w-full mb-4">Post a Job Now</Button>
              </Link>

              <div className="mt-8 pt-8 border-t">
                <h3 className="font-semibold text-primaryText mb-4">
                  Need Help?
                </h3>
                <Link
                  href="/contact-us"
                  className="text-primary hover:underline block mb-2"
                >
                  Contact
                </Link>
                <Link
                  href="/faq"
                  className="text-primary hover:underline block"
                >
                  View FAQ
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
