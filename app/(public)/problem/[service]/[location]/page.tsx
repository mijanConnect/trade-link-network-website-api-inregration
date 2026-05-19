import Link from "next/link";

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

async function fetchProblemContent(service: string, location: string) {
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

export default async function ProblemLocationPage({ params }: Props) {
  const { service, location } = await params;
  const serviceName = toTitleCase(service);
  const locationName = toTitleCase(location);
  const dynamicData = await fetchProblemContent(service, location);

  return (
    <section className="min-h-screen bg-white">
      <div className="bg-slate-950 text-white">
        <div className="container mx-auto px-4 py-16 lg:py-24">
          <p className="text-sm uppercase tracking-[0.25em] text-slate-400">
            Dynamic problem page
          </p>
          <h1 className="mt-3 text-3xl font-bold lg:text-6xl">
            {serviceName} in {locationName}
          </h1>
          <p className="mt-4 max-w-3xl text-base text-slate-300 lg:text-lg">
            {dynamicData?.seo?.h1 ||
              `Problem content for ${serviceName.toLowerCase()} in ${locationName}.`}
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-10 lg:py-16">
        <div className="grid gap-6 lg:grid-cols-3">
          <article className="rounded-3xl border border-slate-200 bg-slate-50 p-6 lg:col-span-2">
            <h2 className="text-2xl font-semibold text-slate-900">
              What this page shows
            </h2>
            <p className="mt-3 text-slate-600">
              This route is driven by the service and location slug in the URL.
              Replace the fallback text with SEO copy or content blocks when
              the backend provides more fields.
            </p>
            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              <div className="rounded-2xl bg-white p-4 shadow-sm">
                <p className="text-sm text-slate-500">Service slug</p>
                <p className="mt-1 text-lg font-semibold text-slate-900">
                  {service}
                </p>
              </div>
              <div className="rounded-2xl bg-white p-4 shadow-sm">
                <p className="text-sm text-slate-500">Location slug</p>
                <p className="mt-1 text-lg font-semibold text-slate-900">
                  {location}
                </p>
              </div>
            </div>

            <div className="mt-6 rounded-2xl border border-slate-200 bg-white p-4">
              <h3 className="text-lg font-semibold text-slate-900">
                Dynamic summary
              </h3>
              <p className="mt-2 text-slate-600">
                {dynamicData?.content?.localNotes ||
                  `Showing dynamic problem content for ${serviceName} in ${locationName}.`}
              </p>
            </div>
          </article>

          <aside className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <h3 className="text-lg font-semibold text-slate-900">
              Next actions
            </h3>
            <ul className="mt-4 space-y-3 text-sm text-slate-600">
              <li>Use this route for service-specific SEO content.</li>
              <li>Render related services or locations here.</li>
              <li>Link back to the service step if needed.</li>
            </ul>
            <div className="mt-6">
              <Link
                href={`/problem/${service}`}
                className="inline-flex w-full items-center justify-center rounded-2xl bg-slate-900 px-4 py-3 text-sm font-semibold text-white transition hover:bg-slate-800"
              >
                Change location
              </Link>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}