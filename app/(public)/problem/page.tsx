import Link from "next/link";

const sampleProblems = [
  {
    service: "plumbing",
    label: "Plumbing in London",
    exampleLocation: "london",
  },
  {
    service: "electrician",
    label: "Electrician in Manchester",
    exampleLocation: "manchester",
  },
  {
    service: "roofing",
    label: "Roofing in Birmingham",
    exampleLocation: "birmingham",
  },
];

export default function ProblemLandingPage() {
  return (
    <section className="min-h-screen bg-linear-to-b from-slate-50 to-white">
      <div className="bg-slate-900 text-white">
        <div className="container mx-auto px-4 py-16 lg:py-24">
          <p className="mb-3 text-sm uppercase tracking-[0.25em] text-slate-300">
            Problem guide
          </p>
          <h1 className="max-w-3xl text-3xl font-bold leading-tight lg:text-6xl">
            Browse service and location problem pages.
          </h1>
          <p className="mt-4 max-w-2xl text-base text-slate-300 lg:text-lg">
            This is a temporary dynamic structure for now. It will later be
            replaced with real problem data, filters, and SEO content.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12 lg:py-16">
        <div className="mb-8">
          <h2 className="text-2xl font-semibold text-slate-900">
            Sample dynamic routes
          </h2>
          <p className="mt-2 text-slate-600">
            Click one to preview the nested slug-based page.
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          {sampleProblems.map((item) => (
            <Link
              key={item.service}
              href={`/problem/${item.service}`}
              className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
            >
              <p className="text-sm font-medium uppercase tracking-wide text-slate-500">
                Select service
              </p>
              <h3 className="mt-2 text-xl font-semibold text-slate-900">
                {item.label}
              </h3>
              <p className="mt-2 text-sm text-slate-600">
                Continue to choose a location for {item.service}.
              </p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
