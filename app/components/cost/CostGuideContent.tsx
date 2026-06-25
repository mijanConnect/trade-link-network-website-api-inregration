import Link from "next/link";
import Button from "@/app/components/ui/Button";

export type CostGuideServiceData = {
  title: string;
  intro: string;
  averageCost: string;
  costNotes?: string[];
  examples: Array<{ title: string; description: string; cost?: string }>;
  tips: string[];
};

export const COST_GUIDE_SERVICES = [
  { slug: "resin-driveway", title: "Resin Driveway" },
  { slug: "loft-conversion", title: "Loft Conversion" },
  { slug: "new-roof", title: "New Roof" },
];

export const COST_GUIDE_SERVICE_DATA: Record<string, CostGuideServiceData> = {
  "resin-driveway": {
    title: "Resin Driveway",
    intro:
      "A resin driveway is a low-maintenance, attractive surface made from aggregate and resin. Costs vary by size, preparation required, and chosen finish.",
    averageCost: "£2,000 - £5,000",
    costNotes: [
      "Price depends on driveway size (m²)",
      "Sub-base preparation and drainage affect cost",
      "Higher-grade aggregates and coloured resins increase price",
    ],
    examples: [
      {
        title: "Small front driveway (20m²)",
        description: "Basic preparation and resin finish",
        cost: "£1,800 - £2,500",
      },
      {
        title: "Medium driveway with drainage (40m²)",
        description: "Includes additional sub-base work",
        cost: "£3,000 - £4,500",
      },
    ],
    tips: [
      "Ask for examples of previous resin driveways",
      "Confirm sub-base and drainage work is included",
      "Get a written guarantee for the resin finish",
    ],
  },
  "loft-conversion": {
    title: "Loft Conversion",
    intro:
      "A loft conversion increases living space by converting roof space into usable rooms. Structural works, insulation and access affect the budget.",
    averageCost: "£25,000 - £60,000",
    costNotes: [
      "Dormer or mansard conversions cost more than simple rooflight conversions",
      "Planning permission and structural works add to cost",
    ],
    examples: [
      {
        title: "Velux rooflight conversion",
        description: "Minimal external change, internal works only",
        cost: "£20,000 - £35,000",
      },
      {
        title: "Full dormer conversion",
        description: "Increases headroom and floor area",
        cost: "£35,000 - £60,000",
      },
    ],
    tips: [
      "Check if planning permission is required",
      "Ask for structural engineer reports",
      "Confirm insulation and ventilation meet building regs",
    ],
  },
  "new-roof": {
    title: "New Roof",
    intro:
      "Replacing a roof can range widely depending on roof size, materials (tiles, slate, metal) and whether roofline elements are replaced.",
    averageCost: "£4,000 - £12,000",
    costNotes: [
      "Tile and slate options vary in price and longevity",
      "Complex roofs with valleys and multiple planes cost more",
    ],
    examples: [
      {
        title: "Small terraced house (roof only)",
        description: "Strip and re-tile with standard tiles",
        cost: "£4,000 - £7,000",
      },
      {
        title: "Large detached house",
        description: "Includes new felt, battens and ridge work",
        cost: "£8,000 - £16,000",
      },
    ],
    tips: [
      "Ask for a materials specification",
      "Check warranties for both labour and materials",
      "Request a detailed schedule of works",
    ],
  },
};

export function CostGuideDetails({
  serviceSlug,
  location,
}: {
  serviceSlug: string;
  location?: string;
}) {
  const data = COST_GUIDE_SERVICE_DATA[serviceSlug];

  if (!data) {
    return null;
  }

  return (
    <article id="cost-details" className="scroll-mt-24">
      {location && (
        <div className="mb-6 rounded-md border border-primary/20 bg-primary/10 p-4">
          <p className="text-[14px] font-medium text-primaryText">
            Cost guide for <span className="font-bold">{location}</span>
          </p>
        </div>
      )}

      <header className="mb-6">
        <h2 className="text-[24px] font-bold text-primaryText mb-4 md:text-[40px]">
          {data.title} Cost Guide
          {location && (
            <span className="block text-[18px] font-normal text-primary mt-2 md:text-[28px]">
              in {location}
            </span>
          )}
        </h2>
        <p className="text-[16px] text-primaryTextLight md:text-[18px]">
          {data.intro}
        </p>
      </header>

      <section className="mb-8 mt-8">
        <h3 className="mb-3 text-[20px] font-semibold text-primaryText">Average Cost</h3>
        <p className="mb-2 text-[18px] font-bold text-primary">{data.averageCost}</p>
        {data.costNotes && (
          <ul className="mt-3 list-inside list-disc space-y-2 text-primaryTextLight">
            {data.costNotes.map((note, index) => (
              <li key={index}>{note}</li>
            ))}
          </ul>
        )}
      </section>

      <section className="mb-8 mt-6">
        <h3 className="mb-3 text-[20px] font-semibold text-primaryText">What Affects the Price</h3>
        <ul className="list-inside list-disc space-y-2 text-primaryTextLight">
          <li>Project size and complexity</li>
          <li>Materials and finishes</li>
          <li>Site access and preparation</li>
          <li>Local labour rates and scheduling</li>
        </ul>
      </section>

      <section className="mb-8 mt-6">
        <h3 className="mb-3 text-[20px] font-semibold text-primaryText">Typical Project Examples</h3>
        <div className="grid gap-4 md:grid-cols-2">
          {data.examples.map((example, index) => (
            <div key={index} className="rounded-sm bg-white p-4 shadow">
              <h4 className="font-semibold text-primaryText">{example.title}</h4>
              <p className="mt-2 text-primaryTextLight">{example.description}</p>
              {example.cost && <p className="mt-3 font-semibold">{example.cost}</p>}
            </div>
          ))}
        </div>
      </section>

      <section className="mb-10 mt-6">
        <h3 className="mb-3 text-[20px] font-semibold text-primaryText">Tips Before Hiring a Contractor</h3>
        <ul className="list-inside list-disc space-y-2 text-primaryTextLight">
          {data.tips.map((tip, index) => (
            <li key={index}>{tip}</li>
          ))}
        </ul>
      </section>

      <section className="mt-8">
        <div className="relative overflow-hidden rounded-md bg-[url('/assets/cta-image.png')] bg-cover bg-center">
          <div className="absolute inset-0 bg-black/40" />
          <div className="relative p-8 text-center md:p-12">
            <h3 className="mb-4 text-[22px] font-semibold text-white md:text-[36px]">
              Ready to get started?
            </h3>
            <p className="mx-auto mb-6 max-w-2xl text-white/90">
              Post your job now and get responses from trusted local professionals.
            </p>
            <Link href="/post-service">
              <Button>Post a Job</Button>
            </Link>
          </div>
        </div>
      </section>
    </article>
  );
}