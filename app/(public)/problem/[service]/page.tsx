import Link from "next/link";

type Props = {
  params: Promise<{
    service: string;
  }>;
};

const toTitleCase = (value: string) =>
  value
    .split("-")
    .filter(Boolean)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");

const dummyLocations = ["london", "manchester", "birmingham", "leeds"];

export default async function ProblemServicePage({ params }: Props) {
  const { service } = await params;
  const serviceName = toTitleCase(service);

  return (
    <section className="min-h-screen bg-slate-50">
      <div className="bg-white border-b border-slate-200">
        <div className="container mx-auto px-4 py-12 lg:py-16">
          <p className="text-sm font-medium uppercase tracking-[0.25em] text-slate-500">
            Select a location
          </p>
          <h1 className="mt-3 text-3xl font-bold text-slate-900 lg:text-5xl">
            {serviceName}
          </h1>
          <p className="mt-4 max-w-2xl text-slate-600">
            Choose a location to open the dynamic problem page for this service.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-10 lg:py-14">
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {dummyLocations.map((locationSlug) => (
            <Link
              key={locationSlug}
              href={`/problem/${service}/${locationSlug}`}
              className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
            >
              <p className="text-sm text-slate-500">Location slug</p>
              <h2 className="mt-2 text-xl font-semibold text-slate-900">
                {toTitleCase(locationSlug)}
              </h2>
              <p className="mt-2 text-sm text-slate-600">
                Open /problem/{service}/{locationSlug}
              </p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}