import Link from "next/link";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import StaticFAQItem from "@/app/components/services/StaticFAQItem";
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

type ProblemGuideContent = {
  introduction?: string;
  commonCauses?: string;
  warningSigns?: string;
  possibleRepairSolutions?: string;
  whenToCallProfessional?: string;
};
type GuideRef = {
  _id: string;
  name: string;
  isActive?: boolean;
  slug?: string;
};

type ProblemGuidePage = {
  _id: string;
  title: string;
  type: string;
  serviceId?: GuideRef | string;
  locationId?: GuideRef | string;
  faqs?: FAQItem[];
  content?: ProblemGuideContent;
  metaTitle?: string;
  metaDescription?: string;
  slug?: string;
};

type ProblemGuideApiResponse = {
  success: boolean;
  message: string;
  data?: ProblemGuidePage;
};

type FAQItem = {
  question: string;
  answer: string;
};

async function fetchProblemGuide(service: string, location: string) {
  const apiBaseUrl =
    process.env.NEXT_PUBLIC_API_BASE_URL || process.env.NEXT_PUBLIC_BASE_URL;

  if (!apiBaseUrl) {
    return null;
  }

  try {
    const response = await fetch(
      `${apiBaseUrl}/guidePages/problems/${service}/${location}`,
      {
        next: { revalidate: 60 },
      },
    );

    if (!response.ok) {
      return null;
    }

    const result = (await response.json()) as ProblemGuideApiResponse;
    return result?.data ?? null;
  } catch {
    return null;
  }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { service, location } = await params;
  const guideData = await fetchProblemGuide(service, location);
  const serviceName =
    (guideData?.serviceId && typeof guideData.serviceId !== "string"
      ? guideData.serviceId.name
      : toTitleCase(service)) || toTitleCase(service);
  const locationName =
    (guideData?.locationId && typeof guideData.locationId !== "string"
      ? guideData.locationId.name
      : toTitleCase(location)) || toTitleCase(location);

  return {
    title:
      guideData?.metaTitle ||
      `${guideData?.title || "Problem"} in ${locationName}`,
    description:
      guideData?.metaDescription ||
      `Problem guide for ${serviceName} services in ${locationName}.`,
    robots: { index: true, follow: true },
  };
}

export default async function ProblemServiceLocationPage({ params }: Props) {
  const { service, location } = await params;
  const guideData = await fetchProblemGuide(service, location);
  const content = guideData?.content;

  const serviceName =
    (guideData?.serviceId && typeof guideData.serviceId !== "string"
      ? guideData.serviceId.name
      : toTitleCase(service)) || toTitleCase(service);
  const locationName =
    (guideData?.locationId && typeof guideData.locationId !== "string"
      ? guideData.locationId.name
      : toTitleCase(location)) || toTitleCase(location);
  if (!guideData) {
    notFound();
  }

  const pageTitle =
    guideData.title || `${serviceName} Problem in ${locationName}`;
  const faqItems = guideData.faqs ?? [];

  return (
    <section className="min-h-screen">
      <div className="bg-primary text-white shadow-[0_12px_40px_rgba(15,23,42,0.15)]">
        <div className="container mx-auto px-4 py-16 lg:py-24">
          <p className="text-sm uppercase tracking-[0.25em] text-slate-300/80">
            Problem guide details
          </p>
          <h1 className="mt-3 max-w-4xl text-3xl font-semibold leading-tight lg:text-6xl">
            {pageTitle}
          </h1>
          <div className="mt-4 max-w-3xl text-base leading-7 text-slate-200/90 lg:text-lg">
            {guideData.metaDescription ||
              `Learn about common causes, warning signs, and repair solutions for ${serviceName} issues in ${locationName}. Get expert advice on when to call a professional.`}
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-10 lg:py-16">
        <div className="mb-8 flex flex-wrap items-center gap-2 text-sm text-slate-500">
          <Link
            href="/problem"
            className="transition hover:text-slate-900 hover:underline"
          >
            Problem
          </Link>
          <span>/</span>
          <span>{serviceName}</span>
          <span>/</span>
          <span>{locationName}</span>
        </div>

        <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_340px] xl:grid-cols-[minmax(0,1fr)_380px]">
          <main className="min-w-0">
            <article id="problem-details" className="scroll-mt-24">
              <section className="bg-white rounded-sm shadow-[0_0_10px_rgba(0,0,0,0.05)] p-4 lg:p-8 mb-8">
                <div className="text-2xl font-bold text-primaryText mb-4">
                  Introduction
                </div>
                <div className="text-primaryTextLight">
                  {content?.introduction ? (
                    <div
                      dangerouslySetInnerHTML={{
                        __html: DOMPurify.sanitize(content.introduction),
                      }}
                    />
                  ) : (
                    <span className="text-sm italic text-gray-400">
                      No introduction available.
                    </span>
                  )}
                </div>
              </section>

              <section className="bg-white rounded-sm shadow-[0_0_10px_rgba(0,0,0,0.05)] p-4 lg:p-8 mb-8">
                <div className="text-2xl font-bold text-primaryText mb-4">
                  Common Causes
                </div>
                <div className="space-y-3 text-primaryTextLight">
                  {content?.commonCauses ? (
                    <div
                      dangerouslySetInnerHTML={{
                        __html: DOMPurify.sanitize(content.commonCauses),
                      }}
                    />
                  ) : (
                    <span className="text-sm italic text-gray-400">
                      No common causes information available.
                    </span>
                  )}
                </div>
              </section>

              <section className="bg-white rounded-sm shadow-[0_0_10px_rgba(0,0,0,0.05)] p-4 lg:p-8 mb-8">
                <div className="text-2xl font-bold text-primaryText mb-4">
                  Warning Signs
                </div>
                <div className="space-y-3 text-primaryTextLight">
                  {content?.warningSigns ? (
                    <div
                      dangerouslySetInnerHTML={{
                        __html: DOMPurify.sanitize(content.warningSigns),
                      }}
                    />
                  ) : (
                    <span className="text-sm italic text-gray-400">
                      No warning signs available.
                    </span>
                  )}
                </div>
              </section>

              <section className="bg-white rounded-sm shadow-[0_0_10px_rgba(0,0,0,0.05)] p-4 lg:p-8 mb-8">
                <div className="text-2xl font-bold text-primaryText mb-4">
                  Possible Repair Solutions
                </div>
                <div className="space-y-3 text-primaryTextLight">
                  {content?.possibleRepairSolutions ? (
                    <div
                      dangerouslySetInnerHTML={{
                        __html: DOMPurify.sanitize(
                          content.possibleRepairSolutions,
                        ),
                      }}
                    />
                  ) : (
                    <span className="text-sm italic text-gray-400">
                      No repair solutions listed.
                    </span>
                  )}
                </div>
              </section>

              <section className="bg-white rounded-sm shadow-[0_0_10px_rgba(0,0,0,0.05)] p-4 lg:p-8 mb-8">
                <div className="text-2xl font-bold text-primaryText mb-4">
                  When to Call a Professional
                </div>
                <div className="space-y-3 text-primaryTextLight">
                  {content?.whenToCallProfessional ? (
                    <div
                      dangerouslySetInnerHTML={{
                        __html: DOMPurify.sanitize(
                          content.whenToCallProfessional,
                        ),
                      }}
                    />
                  ) : (
                    <span className="text-sm italic text-gray-400">
                      No guidance on when to call a professional.
                    </span>
                  )}
                </div>
              </section>

              <div className="bg-white rounded-sm shadow-[0_0_10px_rgba(0,0,0,0.05)] p-4 lg:p-8 mb-8">
                <h2 className="text-2xl font-bold text-primaryText mb-6">
                  Frequently Asked Questions
                </h2>
                {faqItems.length ? (
                  <StaticFAQItem items={faqItems} />
                ) : (
                  <p className="text-sm italic text-gray-400">
                    No frequently asked questions available.
                  </p>
                )}
              </div>
            </article>
          </main>

          <aside className="lg:sticky lg:top-24 lg:self-start">
            <div className="space-y-6 rounded-sm bg-white p-4 shadow-[0_0_10px_rgba(0,0,0,0.05)] lg:p-8">
              <h2 className="mb-4 text-2xl font-bold text-primaryText">
                Ready to Get Started?
              </h2>
              <p className="mb-6 text-primaryTextLight">
                Post your {serviceName.toLowerCase()} job in {locationName}{" "}
                today and connect with trusted local professionals.
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
