import Link from "next/link";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import DOMPurify from "isomorphic-dompurify";

type Props = {
  params: Promise<{
    service: string;
    location: string;
  }>;
};

const toTitleCase = (value = "") =>
  value
    .split("-")
    .filter(Boolean)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");

type CostGuideContent = {
  introduction?: string;
  averageCost?: string;
  whatAffectsPrice?: string;
  typicalProjectExamples?: string;
  typicalCostRange?: string;
  tipsBeforeHiring?: string;
};

type CostGuidePage = {
  _id: string;
  title: string;
  type: string;
  content?: CostGuideContent;
  metaTitle?: string;
  metaDescription?: string;
  slug?: string;
};

type CostGuideApiResponse = {
  success: boolean;
  message: string;
  data?: CostGuidePage;
};

async function fetchCostGuide(service: string, location: string) {
  const apiBaseUrl =
    process.env.NEXT_PUBLIC_API_BASE_URL || process.env.NEXT_PUBLIC_BASE_URL;

  if (!apiBaseUrl) {
    return null;
  }

  try {
    const response = await fetch(
      `${apiBaseUrl}/guidePages/cost/${service}/${location}`,
      {
        next: { revalidate: 60 },
      },
    );

    if (!response.ok) {
      return null;
    }

    const result = (await response.json()) as CostGuideApiResponse;
    return result?.data ?? null;
  } catch {
    return null;
  }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { service, location } = await params;
  const guideData = await fetchCostGuide(service, location);
  const serviceName = toTitleCase(service);
  const locationName = toTitleCase(location);

  return {
    title: guideData?.metaTitle || `${serviceName} Cost in ${locationName}`,
    description:
      guideData?.metaDescription ||
      `Cost guide for ${serviceName} services in ${locationName}.`,
    robots: { index: true, follow: true },
  };
}

export default async function CostServiceLocationPage({ params }: Props) {
  const { service, location } = await params;
  const serviceName = toTitleCase(service);
  const locationName = toTitleCase(location);
  const guideData = await fetchCostGuide(service, location);
  const content = guideData?.content;

  if (!guideData) {
    notFound();
  }

  return (
    <section className="min-h-screen">
      <div className="bg-primary text-white shadow-[0_12px_40px_rgba(15,23,42,0.15)]">
        <div className="container mx-auto px-4 py-16 lg:py-24">
          <p className="text-sm uppercase tracking-[0.25em] text-slate-300/80">
            Cost guide details
          </p>
          <h1 className="mt-3 max-w-4xl text-3xl font-semibold leading-tight lg:text-6xl">
            {guideData.title || `${serviceName} Cost in ${locationName}`}
          </h1>
          <div className="mt-4 max-w-3xl text-base leading-7 text-slate-200/90 lg:text-lg">
            {content?.introduction ? (
              <div
                className="prose prose-invert max-w-none"
                dangerouslySetInnerHTML={{
                  __html: DOMPurify.sanitize(content.introduction),
                }}
              />
            ) : (
              <p>
                View cost details for {serviceName} in {locationName}.
              </p>
            )}
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-10 lg:py-16">
        <div className="mb-8 flex flex-wrap items-center gap-2 text-sm text-slate-500">
          <Link
            href="/cost"
            className="transition hover:text-slate-900 hover:underline"
          >
            Cost
          </Link>
          <span>/</span>
          <span>{serviceName}</span>
          <span>/</span>
          <span>{locationName}</span>
        </div>

        <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_340px] xl:grid-cols-[minmax(0,1fr)_380px]">
          <main className="min-w-0">
            <article id="cost-details" className="space-y-6 scroll-mt-24">
              <section className="bg-white rounded-sm shadow-[0_0_10px_rgba(0,0,0,0.05)] p-4 lg:p-8 mb-8">
                <div className="text-2xl font-bold text-primaryText mb-4">
                  Average Cost
                </div>
                <div className="space-y-3 text-primaryTextLight">
                  {content?.averageCost ? (
                    <div
                      dangerouslySetInnerHTML={{
                        __html: DOMPurify.sanitize(content.averageCost),
                      }}
                    />
                  ) : (
                    <span className="text-sm italic text-gray-400">
                      No average cost information available.
                    </span>
                  )}
                </div>
              </section>

              <section className="bg-white rounded-sm shadow-[0_0_10px_rgba(0,0,0,0.05)] p-4 lg:p-8 mb-8">
                <div className="text-2xl font-bold text-primaryText mb-4">
                  What Affects the Price
                </div>
                <div className="space-y-3 text-primaryTextLight">
                  {content?.whatAffectsPrice ? (
                    <div
                      dangerouslySetInnerHTML={{
                        __html: DOMPurify.sanitize(content.whatAffectsPrice),
                      }}
                    />
                  ) : (
                    <span className="text-sm italic text-gray-400">
                      No information available.
                    </span>
                  )}
                </div>
              </section>

              <section className="bg-white rounded-sm shadow-[0_0_10px_rgba(0,0,0,0.05)] p-4 lg:p-8 mb-8">
                <div className="text-2xl font-bold text-primaryText mb-4">
                  Typical Cost Range
                </div>
                <div className="space-y-3 text-primaryTextLight">
                  {content?.typicalCostRange ? (
                    <div
                      dangerouslySetInnerHTML={{
                        __html: DOMPurify.sanitize(content.typicalCostRange),
                      }}
                    />
                  ) : (
                    <span className="text-sm italic text-gray-400">
                      No typical cost range information available.
                    </span>
                  )}
                </div>
              </section>

              <section className="bg-white rounded-sm shadow-[0_0_10px_rgba(0,0,0,0.05)] p-4 lg:p-8 mb-8">
                <div className="text-2xl font-bold text-primaryText mb-4">
                  Typical Project Examples
                </div>
                <div className="space-y-3 text-primaryTextLight">
                  {content?.typicalProjectExamples ? (
                    <div
                      dangerouslySetInnerHTML={{
                        __html: DOMPurify.sanitize(
                          content.typicalProjectExamples,
                        ),
                      }}
                    />
                  ) : (
                    <span className="text-sm italic text-gray-400">
                      No project examples available.
                    </span>
                  )}
                </div>
              </section>

              <section className="bg-white rounded-sm shadow-[0_0_10px_rgba(0,0,0,0.05)] p-4 lg:p-8 mb-8">
                <div className="text-2xl font-bold text-primaryText mb-4">
                  Tips Before Hiring a Contractor
                </div>
                <div className="space-y-3 text-primaryTextLight">
                  {content?.tipsBeforeHiring ? (
                    <div
                      dangerouslySetInnerHTML={{
                        __html: DOMPurify.sanitize(content.tipsBeforeHiring),
                      }}
                    />
                  ) : (
                    <span className="text-sm italic text-gray-400">
                      No hiring tips available.
                    </span>
                  )}
                </div>
              </section>
            </article>
          </main>

          <aside className="lg:sticky lg:top-24 lg:self-start">
            <div className="space-y-6 rounded-sm bg-white p-4 shadow-[0_0_10px_rgba(0,0,0,0.05)] lg:p-8">
              <h2 className="mb-4 text-2xl font-bold text-primaryText">
                Ready to Get Started?
              </h2>
              <p className="mb-6 text-primaryTextLight">
                Post your {serviceName.toLowerCase()} job in {locationName} on
                Trade Link Network to compare local contractor quotes.
              </p>

              <Link
                href="/categories"
                className="inline-flex w-full items-center justify-center rounded-md bg-primary px-5 py-3 text-sm font-semibold text-white transition hover:opacity-90"
              >
                Post a Job Now
              </Link>

              <div className="mt-4 border-t pt-8">
                <h3 className="mb-4 font-semibold text-primaryText">
                  Need Help?
                </h3>
                <Link
                  href="/contact-us"
                  className="mb-2 block text-primary hover:underline"
                >
                  Contact
                </Link>
                <Link
                  href="/faq"
                  className="block text-primary hover:underline"
                >
                  View FAQ
                </Link>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}
