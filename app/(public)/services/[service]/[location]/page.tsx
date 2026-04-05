import { Metadata } from "next";
import Link from "next/link";
import Button from "@/app/components/ui/Button";
import Breadcrumb from "@/app/components/services/Breadcrumb";

// Ensure Server-Side Rendering (SSR)
export const dynamic = "force-dynamic";
export const dynamicParams = true;

type Props = {
  params: Promise<{
    service: string;
    location: string;
  }>;
};

// Service Location Data Response Type
interface ServiceLocationData {
  success: boolean;
  message: string;
  data: {
    service: {
      name: string;
      slug: string;
      faqs: Array<{
        question: string;
        answer: string;
      }>;
      guides: Array<{
        title: string;
        content: string;
      }>;
    };
    location: {
      name: string;
      slug: string;
      type: string;
      hierarchy: Array<{
        name: string;
        slug: string;
        type: string;
      }>;
    };
    seo: {
      metaTitle: string;
      metaDescription: string;
      canonical: string;
      h1: string;
    };
    content: {
      localNotes: string;
      relatedServices: Array<{
        _id: string;
        name: string;
        slug: string;
      }>;
    };
  };
}

// Fetch service-location data from API
async function fetchServiceLocationData(
  service: string,
  location: string,
): Promise<ServiceLocationData | null> {
  try {
    const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
    if (!apiBaseUrl) {
      console.error("NEXT_PUBLIC_API_BASE_URL is not set");
      return null;
    }

    const normalizedBaseUrl = apiBaseUrl.replace(/\/$/, "");
    const url = `${normalizedBaseUrl}/service-locations/dynamic/${service}/${location}`;

    console.log("[ServiceLocationPage] Fetching URL:", url);

    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      next: { revalidate: 3600 }, // Revalidate every 1 hour
    });

    console.log("[ServiceLocationPage] Response status:", response.status);

    if (!response.ok) {
      const errorText = await response.text();
      console.error(
        `[ServiceLocationPage] Failed to fetch service location data: ${response.status}`,
        errorText,
      );
      return null;
    }

    const data = (await response.json()) as ServiceLocationData;

    if (!data.success) {
      console.error(
        "[ServiceLocationPage] API returned success=false",
        data.message,
      );
      return null;
    }

    console.log(
      "[ServiceLocationPage] Successfully fetched data for:",
      service,
      location,
    );
    return data;
  } catch (error) {
    console.error(
      "[ServiceLocationPage] Error fetching service location data:",
      error instanceof Error ? error.message : String(error),
    );
    return null;
  }
}

// 📊 Static Generation - Pre-generate popular service + location combinations
export async function generateStaticParams() {
  const serviceLocationCombos = [
    { service: "roofing", location: "essex" },
    { service: "roofing", location: "chelmsford" },
    { service: "roofing", location: "manchester" },
    { service: "electrician", location: "essex" },
    { service: "electrician", location: "manchester" },
    { service: "plumbing", location: "essex" },
    { service: "plumbing", location: "manchester" },
    { service: "carpentry", location: "essex" },
    { service: "painting", location: "manchester" },
    { service: "heating-cooling", location: "essex" },
  ];

  return serviceLocationCombos;
}

// ⚡ SEO Meta Generation
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { service, location } = await params;
  const data = await fetchServiceLocationData(service, location);

  const baseUrl =
    process.env.NEXT_PUBLIC_BASE_URL || "https://tradelink.network";
  const canonicalUrl = `${baseUrl}/services/${service}/${location}`;

  if (!data) {
    return {
      title: "Service Location | TradeLink Network",
      description: "Find trusted professionals for your service needs.",
      alternates: {
        canonical: canonicalUrl,
      },
    };
  }

  const { seo, service: serviceData, location: locationData } = data.data;

  return {
    title: seo.metaTitle,
    description: seo.metaDescription,
    keywords: [
      serviceData.name,
      locationData.name,
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
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
    openGraph: {
      title: seo.metaTitle,
      description: seo.metaDescription,
      type: "website",
      url: canonicalUrl,
      siteName: "TradeLink Network",
      locale: "en_GB",
      images: [
        {
          url: `${baseUrl}/og-image.jpg`,
          width: 1200,
          height: 630,
          alt: seo.h1,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: seo.metaTitle,
      description: seo.metaDescription,
    },
  };
}

// 🔧 Dynamic Page Component
export default async function ServiceLocationPage({ params }: Props) {
  const { service, location } = await params;
  const data = await fetchServiceLocationData(service, location);

  if (!data) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-primaryText mb-4">
            Service Not Found
          </h1>
          <p className="text-primaryTextLight mb-6">
            The service or location you&apos;re looking for is not available.
          </p>
          <Link href="/services" className="text-blue-600 hover:underline">
            Back to Services
          </Link>
        </div>
      </div>
    );
  }

  const {
    service: serviceData,
    location: locationData,
    seo,
    content,
  } = data.data;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Structured Data - JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@graph": [
              {
                "@type": "Service",
                name: serviceData.name,
                description: seo.metaDescription,
                provider: {
                  "@type": "LocalBusiness",
                  name: "TradeLink Network",
                  url: "https://tradelink.network",
                },
                areaServed: {
                  "@type": "AdministrativeArea",
                  name: locationData.name,
                },
                image: `${process.env.NEXT_PUBLIC_BASE_URL || "https://tradelink.network"}/og-image.jpg`,
              },
              {
                "@type": "BreadcrumbList",
                itemListElement: [
                  {
                    "@type": "ListItem",
                    position: 1,
                    name: "Home",
                    item: `${process.env.NEXT_PUBLIC_BASE_URL || "https://tradelink.network"}`,
                  },
                  {
                    "@type": "ListItem",
                    position: 2,
                    name: "Services",
                    item: `${process.env.NEXT_PUBLIC_BASE_URL || "https://tradelink.network"}/services`,
                  },
                  ...(locationData.hierarchy
                    ? locationData.hierarchy.map((item, index) => ({
                        "@type": "ListItem",
                        position: 3 + index,
                        name: item.name,
                        item: `${process.env.NEXT_PUBLIC_BASE_URL || "https://tradelink.network"}/areas/${item.slug}`,
                      }))
                    : []),
                  {
                    "@type": "ListItem",
                    position: (locationData.hierarchy?.length || 0) + 3,
                    name: serviceData.name,
                    item: `${process.env.NEXT_PUBLIC_BASE_URL || "https://tradelink.network"}/services/${service}/${location}`,
                  },
                ],
              },
            ],
          }),
        }}
      />

      {/* Hero Section */}
      <div className="bg-primary text-white">
        <div className="container mx-auto px-4 py-16 lg:py-24">
          <h1 className="text-3xl lg:text-5xl font-bold mb-4">{seo.h1}</h1>
          <p className="text-lg lg:text-xl opacity-90 max-w-2xl">
            {seo.metaDescription}
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-16">
        {/* Breadcrumb Navigation */}
        <div className="mb-6">
          <Breadcrumb
            items={[
              { label: "Home", href: "/" },
              { label: "Services", href: "/services" },
              // ...(locationData.hierarchy?.map((item) => ({
              //   label: item.name,
              // })) || []),
              { label: serviceData.name },
              { label: locationData.name, current: true },
            ]}
          />
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Info */}
          <div className="lg:col-span-2">
            {/* Service Overview */}
            <div className="bg-white rounded-lg shadow-md p-8 mb-8">
              <h2 className="text-2xl font-bold text-primaryText mb-4">
                Why Choose Our {serviceData.name} Services?
              </h2>
              <ul className="space-y-4 text-primaryTextLight">
                <li className="flex items-start">
                  <span className="text-blue-600 font-bold mr-3">✓</span>
                  <span>
                    All professionals are verified and have proven track records
                  </span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-600 font-bold mr-3">✓</span>
                  <span>Get up to 3 competitive quotes for comparison</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-600 font-bold mr-3">✓</span>
                  <span>Post your job for free - no hidden charges</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-600 font-bold mr-3">✓</span>
                  <span>Local professionals - serving {locationData.name}</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-600 font-bold mr-3">✓</span>
                  <span>
                    Customer reviews and ratings help you choose the best
                  </span>
                </li>
              </ul>
            </div>

            {/* How It Works */}
            <div className="bg-white rounded-lg shadow-md p-8 mb-8">
              <h2 className="text-2xl font-bold text-primaryText mb-4">
                How It Works
              </h2>
              <div className="space-y-4 text-primaryTextLight">
                <div className="flex gap-4">
                  <div className="bg-blue-100 rounded-full w-10 h-10 flex items-center justify-center shrink-0 font-bold text-blue-600">
                    1
                  </div>
                  <div>
                    <h3 className="font-semibold text-primaryText mb-1">
                      Post Your Job
                    </h3>
                    <p>
                      Tell us about your {serviceData.name.toLowerCase()} needs
                      in {locationData.name}
                    </p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="bg-blue-100 rounded-full w-10 h-10 flex items-center justify-center shrink-0 font-bold text-blue-600">
                    2
                  </div>
                  <div>
                    <h3 className="font-semibold text-primaryText mb-1">
                      Receive Quotes
                    </h3>
                    <p>Get up to 3 quotes from verified professionals</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="bg-blue-100 rounded-full w-10 h-10 flex items-center justify-center shrink-0 font-bold text-blue-600">
                    3
                  </div>
                  <div>
                    <h3 className="font-semibold text-primaryText mb-1">
                      Choose & Book
                    </h3>
                    <p>Compare quotes and book the best professional</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Local Notes */}
            {content.localNotes && (
              <div className="bg-white rounded-lg shadow-md p-8 mb-8">
                <h2 className="text-2xl font-bold text-primaryText mb-4">
                  About {serviceData.name} in {locationData.name}
                </h2>
                <p className="text-primaryTextLight whitespace-pre-line">
                  {content.localNotes}
                </p>
              </div>
            )}

            {/* Related Services */}
            {content.relatedServices && content.relatedServices.length > 0 && (
              <div className="bg-white rounded-lg shadow-md p-8 mb-8">
                <h2 className="text-2xl font-bold text-primaryText mb-4">
                  Related Services in {locationData.name}
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {content.relatedServices.map((relatedService) => (
                    <Link
                      key={relatedService._id}
                      href={`/services/${relatedService.slug}/${locationData.slug}`}
                      className="p-4 border border-gray-200 rounded-lg hover:border-primary hover:shadow-md transition"
                    >
                      <p className="text-primaryText font-semibold hover:text-primary">
                        {relatedService.name}
                      </p>
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {/* FAQs */}
            {serviceData.faqs && serviceData.faqs.length > 0 && (
              <div className="bg-white rounded-lg shadow-md p-8 mb-8">
                <h2 className="text-2xl font-bold text-primaryText mb-6">
                  Frequently Asked Questions
                </h2>
                <div className="space-y-4">
                  {serviceData.faqs.map((faq, index) => (
                    <details
                      key={index}
                      className="border border-gray-200 rounded-lg p-4 cursor-pointer hover:bg-gray-50"
                    >
                      <summary className="font-semibold text-primaryText">
                        {faq.question}
                      </summary>
                      <p className="mt-3 text-primaryTextLight">{faq.answer}</p>
                    </details>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Right Column - CTA */}
          <div>
            <div className="bg-blue-50 rounded-lg shadow-md p-8 sticky top-4">
              <h2 className="text-2xl font-bold text-primaryText mb-4">
                Ready to Get Started?
              </h2>
              <p className="text-primaryTextLight mb-6">
                Post your {serviceData.name.toLowerCase()} job in{" "}
                {locationData.name} today and connect with trusted
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
                  className="text-blue-600 hover:underline block mb-2"
                >
                  Contact Support
                </Link>
                <Link
                  href="/faq"
                  className="text-blue-600 hover:underline block"
                >
                  View FAQ
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
