import Link from "next/link";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import StaticFAQItem from "@/app/components/services/StaticFAQItem";

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

const buildFaqItems = (
  serviceName: string,
  locationName: string,
): FAQItem[] => [
  {
    question: `How do I know if I need a ${serviceName.toLowerCase()} professional?`,
    answer: `If the issue is recurring, getting worse, or affecting safety or function, it is usually worth speaking with a ${serviceName.toLowerCase()} professional in ${locationName}.`,
  },
  {
    question: `What should I include when posting a job for ${serviceName.toLowerCase()} help?`,
    answer: `Share the problem details, how long it has been happening, any visible symptoms, photos if possible, and your preferred timeline. Clear information helps professionals respond accurately.`,
  },
  {
    question: `Can I compare more than one quote?`,
    answer: `Yes. Posting a job lets you review multiple responses and compare experience, cost, and availability before choosing.`,
  },
  {
    question: `Is it free to post a job?`,
    answer: `Posting a job is typically free, so you can request help and compare professionals without committing straight away.`,
  },
  {
    question: `What if I am not sure what the problem is?`,
    answer: `That is fine. Describe the symptoms as clearly as you can, and a professional can help diagnose the issue and suggest the next step.`,
  },
];

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
  const faqItems = buildFaqItems(serviceName, locationName);

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
          <p className="mt-4 max-w-3xl text-base leading-7 text-slate-200/90 lg:text-lg">
            {content?.introduction ||
              `View problem details for ${serviceName} in ${locationName}.`}
          </p>
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
                <p className="space-y-3 text-primaryTextLight">
                  {content?.introduction ? (
                    content.introduction
                  ) : (
                    <span className="text-sm italic text-gray-400">
                      No introduction available.
                    </span>
                  )}
                </p>
              </section>

              <section className="bg-white rounded-sm shadow-[0_0_10px_rgba(0,0,0,0.05)] p-4 lg:p-8 mb-8">
                <div className="text-2xl font-bold text-primaryText mb-4">
                  Common Causes
                </div>
                <p className="space-y-3 text-primaryTextLight">
                  {content?.commonCauses ? (
                    content.commonCauses
                  ) : (
                    <span className="text-sm italic text-gray-400">
                      No common causes information available.
                    </span>
                  )}
                </p>
              </section>

              <section className="bg-white rounded-sm shadow-[0_0_10px_rgba(0,0,0,0.05)] p-4 lg:p-8 mb-8">
                <div className="text-2xl font-bold text-primaryText mb-4">
                  Warning Signs
                </div>
                <p className="space-y-3 text-primaryTextLight">
                  {content?.warningSigns ? (
                    content.warningSigns
                  ) : (
                    <span className="text-sm italic text-gray-400">
                      No warning signs available.
                    </span>
                  )}
                </p>
              </section>

              <section className="bg-white rounded-sm shadow-[0_0_10px_rgba(0,0,0,0.05)] p-4 lg:p-8 mb-8">
                <div className="text-2xl font-bold text-primaryText mb-4">
                  Possible Repair Solutions
                </div>
                <p className="space-y-3 text-primaryTextLight">
                  {content?.possibleRepairSolutions ? (
                    content.possibleRepairSolutions
                  ) : (
                    <span className="text-sm italic text-gray-400">
                      No repair solutions listed.
                    </span>
                  )}
                </p>
              </section>

              <section className="bg-white rounded-sm shadow-[0_0_10px_rgba(0,0,0,0.05)] p-4 lg:p-8 mb-8">
                <div className="text-2xl font-bold text-primaryText mb-4">
                  When to Call a Professional
                </div>
                <p className="space-y-3 text-primaryTextLight">
                  {content?.whenToCallProfessional ? (
                    content.whenToCallProfessional
                  ) : (
                    <span className="text-sm italic text-gray-400">
                      No guidance on when to call a professional.
                    </span>
                  )}
                </p>
              </section>

              <div className="bg-white rounded-sm shadow-[0_0_10px_rgba(0,0,0,0.05)] p-4 lg:p-8 mb-8">
                <h2 className="text-2xl font-bold text-primaryText mb-6">
                  Frequently Asked Questions
                </h2>
                <StaticFAQItem items={faqItems} />
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
