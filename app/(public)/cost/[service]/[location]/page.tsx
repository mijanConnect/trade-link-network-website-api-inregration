import Link from "next/link";
import { notFound } from "next/navigation";
import { Metadata } from "next";

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
    <section className="min-h-screen bg-gray-50">
      <div className="bg-primary text-white">
        <div className="container mx-auto px-4 py-16 lg:py-24">
          <p className="text-sm uppercase tracking-[0.25em] text-slate-400">
            Cost guide details
          </p>
          <h1 className="mt-3 text-3xl font-bold lg:text-6xl">
            {`${guideData.title} in ${locationName}` ||
              `${serviceName} in ${locationName}`}
          </h1>
          <p className="mt-4 max-w-3xl text-base text-slate-300 lg:text-lg">
            {content?.introduction ||
              `View cost details for ${serviceName} in ${locationName}.`}
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-10 lg:py-16">
        <div className="mb-8 flex items-center gap-2 text-sm text-slate-500">
          <Link href="/cost" className="hover:text-slate-900 hover:underline">
            Cost
          </Link>
          <span>/</span>
          <span>{serviceName}</span>
          <span>/</span>
          <span>{locationName}</span>
        </div>

        <div className="">
          <div className="">
            <article id="cost-details" className="scroll-mt-24">
              {/* <div className="mb-6 rounded-md border border-primary/20 bg-gray-100 p-4">
                <p className="text-[14px] font-medium text-primaryText">
                  Cost guide for{" "}
                  <span className="font-bold">{locationName}</span>
                </p>
              </div> */}

              <section className="mb-8 mt-8">
                <h3 className="mb-3 text-[20px] font-semibold text-primaryText">
                  Average Cost
                </h3>
                <p className="text-primaryTextLight">
                  {content?.averageCost ||
                    "No average cost information available."}
                </p>
              </section>

              <section className="mb-8 mt-6">
                <h3 className="mb-3 text-[20px] font-semibold text-primaryText">
                  What Affects the Price
                </h3>
                <p className="text-primaryTextLight">
                  {content?.whatAffectsPrice ||
                    "No pricing factors information available."}
                </p>
              </section>

              <section className="mb-8 mt-6">
                <h3 className="mb-3 text-[20px] font-semibold text-primaryText">
                  Typical Project Examples
                </h3>
                <p className="text-primaryTextLight">
                  {content?.typicalProjectExamples ||
                    "No project examples available."}
                </p>
              </section>

              <section className="mb-10 mt-6">
                <h3 className="mb-3 text-[20px] font-semibold text-primaryText">
                  Tips Before Hiring
                </h3>
                <p className="text-primaryTextLight">
                  {content?.tipsBeforeHiring || "No hiring tips available."}
                </p>
              </section>
            </article>
          </div>
        </div>
      </div>
    </section>
  );
}
