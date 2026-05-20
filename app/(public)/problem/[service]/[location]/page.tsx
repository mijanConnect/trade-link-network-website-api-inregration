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

  return (
    <section className="min-h-screen bg-gray-50">
      <div className="bg-primary text-white">
        <div className="container mx-auto px-4 py-16 lg:py-24">
          <p className="text-sm uppercase tracking-[0.25em] text-slate-400">
            Problem guide Details
          </p>
          <h1 className="mt-3 text-3xl font-bold lg:text-6xl">
            {`${guideData.title} in ${locationName}` ||
              `${serviceName} in ${locationName}`}
          </h1>
          <p className="mt-4 max-w-3xl text-base text-slate-300 lg:text-lg">
            {content?.introduction ||
              `View problem details for ${serviceName} in ${locationName}.`}
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-10 lg:py-16">
        <div className="mb-8 flex items-center gap-2 text-sm text-slate-500">
          <Link
            href="/problem"
            className="hover:text-slate-900 hover:underline"
          >
            Problem
          </Link>
          <span>/</span>
          <span>{serviceName}</span>
          <span>/</span>
          <span>{locationName}</span>
        </div>

        <div className="">
          <div className="">
            <article id="problem-details" className="scroll-mt-24">
              {/* <div className="mb-6 rounded-md border border-primary/20 bg-gray-100 p-4">
                <p className="text-[14px] font-medium text-primaryText">
                  Problem guide for{" "}
                  <span className="font-bold">{locationName}</span>
                </p>
              </div> */}

              <section className="mb-8 mt-8">
                <h3 className="mb-3 text-[20px] font-semibold text-primaryText">
                  Introduction
                </h3>
                <p className="text-primaryTextLight">
                  {content?.introduction || "No introduction available."}
                </p>
              </section>

              <section className="mb-8 mt-6">
                <h3 className="mb-3 text-[20px] font-semibold text-primaryText">
                  Common Causes
                </h3>
                <p className="text-primaryTextLight">
                  {content?.commonCauses || "No common causes information."}
                </p>
              </section>

              <section className="mb-8 mt-6">
                <h3 className="mb-3 text-[20px] font-semibold text-primaryText">
                  Warning Signs
                </h3>
                <p className="text-primaryTextLight">
                  {content?.warningSigns || "No warning signs available."}
                </p>
              </section>

              <section className="mb-8 mt-6">
                <h3 className="mb-3 text-[20px] font-semibold text-primaryText">
                  Possible Repair Solutions
                </h3>
                <p className="text-primaryTextLight">
                  {content?.possibleRepairSolutions ||
                    "No repair solutions listed."}
                </p>
              </section>

              <section className="mb-10 mt-6">
                <h3 className="mb-3 text-[20px] font-semibold text-primaryText">
                  When To Call A Professional
                </h3>
                <p className="text-primaryTextLight">
                  {content?.whenToCallProfessional ||
                    "No guidance on when to call a professional."}
                </p>
              </section>
            </article>
          </div>
        </div>
      </div>
    </section>
  );
}
