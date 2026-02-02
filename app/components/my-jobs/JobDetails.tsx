"use client";

import { ChevronLeft } from "lucide-react";
import Button from "../ui/Button";
import Link from "next/link";

type DetailItem = { label: string; value: string };

type JobDetailsProps = {
  title?: string;
  postedOn?: string;
  details?: DetailItem[];
  locationDetails?: DetailItem[];
  personalDetails?: DetailItem[];
};

const defaultDetails: DetailItem[] = [
  { label: "Category", value: "Outdoor & Landscaping" },
  { label: "Service Type", value: "Landscaping" },
  {
    label: "Work Description",
    value:
      "Landscaping involves the process of designing, arranging, and maintaining outdoor spaces to enhance their aesthetic appeal, functionality, and environmental sustainability. It encompasses various tasks such as planting trees, shrubs, flowers, and grass; constructing hardscapes like pathways, patios, and retaining walls; installing irrigation systems; and maintaining garden beds. Landscaping also involves the management of natural features like water bodies, soil quality, and terrain, creating outdoor environments that are both beautiful and practical.",
  },
  { label: "Garden Size", value: "Medium" },
  { label: "Include Groundwork or Drainage", value: "Yes" },
  { label: "Property Type", value: "Residential" },
  { label: "Approximate Budget", value: "$500 - $1000" },
];

const defaultLocation: DetailItem[] = [{ label: "Post Code", value: "00263" }];

const defaultPersonal: DetailItem[] = [
  { label: "Email", value: "user@example.com" },
  { label: "Mobile Number", value: "+263 71 234 5678" },
];

function DetailTable({ items }: { items: DetailItem[] }) {
  return (
    <table className="w-full text-[16px] lg:text-base">
      <tbody>
        {items.map((item, index) => (
          <tr key={`${item.label}-${index}`}>
            <td className="w-1/4 py-1 lg:py-2 text-[14px] lg:text-[18px] text-primaryText align-top">
              {item.label}
            </td>
            <td className="w-8 py-1 lg:py-2 text-center text-[14px] lg:text-[18px] text-primaryText align-top">
              :
            </td>
            <td className="py-1 lg:py-2 text-[14px] lg:text-[18px] text-primaryText align-top">
              {item.value}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default function JobDetails({
  title = "Full garden renovation",
  postedOn = "Posted 14 Jan, 2026",
  details = defaultDetails,
  locationDetails = defaultLocation,
  personalDetails = defaultPersonal,
}: JobDetailsProps) {
  return (
    <div>
      <Link href="/my-jobs" className="inline-block">
        <div className="flex items-center gap-2 mb-6 text-[20px] text-primaryText cursor-pointer hover:opacity-70 transition-opacity">
          <ChevronLeft />
          <p>View Details</p>
        </div>
      </Link>
      <h1 className="text-[18px] text-primaryText lg:text-[24px] font-semibold mt-0 lg:mt-8">
        {title}
      </h1>
      <p className="mb-4 lg:mb-8 mt-0 text-[14px] text-gray-400 lg:mt-2 lg:text-[16px]">
        {postedOn}
      </p>

      <div className="space-y-4 lg:space-y-6">
        <section>
          <h4 className="mb-1 lg:mb-3 text-[16px] lg:text-[18px] font-bold text-primaryText">
            Details
          </h4>
          <DetailTable items={details} />
        </section>

        <section>
          <h4 className="mb-1 lg:mb-3 text-[16px] lg:text-[18px] font-bold text-primaryText">
            Location
          </h4>
          <DetailTable items={locationDetails} />
        </section>

        <section>
          <h4 className="mb-1 lg:mb-3 text-[16px] lg:text-[18px] font-bold text-primaryText">
            Personal Details
          </h4>
          <DetailTable items={personalDetails} />
        </section>
      </div>

      <Button variant="primary" size="md" className="mt-4 lg:mt-10">
        Edit Job Post
      </Button>
    </div>
  );
}
