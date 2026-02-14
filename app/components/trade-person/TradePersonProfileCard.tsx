"use client";

import Image from "next/image";
import Stars from "@/app/components/trade-person/Stars";
import { useGetMyProfileQuery } from "@/store/slice/myProfileSlice";
import { getImageUrl } from "../ui/ImageURL";
// import { getImageUrl } from "@/app/components/ui/ImageURL";

export default function TradePersonProfileCard() {
  const { data: profileData, isLoading, error } = useGetMyProfileQuery();

  if (isLoading) {
    return (
      <aside className="p-10">
        <div className="flex flex-col items-center text-center">
          <div className="h-[160px] w-[160px] animate-pulse rounded-full bg-slate-200" />
          <div className="mt-4 h-5 w-32 animate-pulse rounded bg-slate-200" />
          <div className="mt-2 h-4 w-20 animate-pulse rounded bg-slate-200" />
          <div className="mt-6 flex flex-wrap justify-center gap-2 p-6">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="h-6 w-20 animate-pulse rounded bg-slate-200"
              />
            ))}
          </div>
        </div>
      </aside>
    );
  }

  if (error || !profileData?.data?.professional) {
    return (
      <aside className="p-10">
        <div className="flex flex-col items-center text-center">
          <div className="h-[160px] w-[160px] overflow-hidden rounded-full border border-slate-200 bg-slate-100" />
          <h2 className="mt-4 text-[18px] font-semibold text-primaryText">
            No profile data available
          </h2>
        </div>
      </aside>
    );
  }

  const professional = profileData.data.professional;
  console.log(professional);
  // const avatar = getImageUrl(professional?.businessImage);
  
  // Extract service names for tags
  const tags = Array.isArray(professional.services)
    ? professional.services.map((service) =>
        typeof service === "string" ? service : service.name || ""
      ).filter(Boolean)
    : [];
;
  const businessName = professional.businessName || "Business Name";
  const rating = professional.ratingAvg ?? 0;

  return (
    <aside className="p-10">
      <div className="flex flex-col items-center text-center">
        <div className="h-[160px] w-[160px] overflow-hidden rounded-full border border-slate-200">
          <Image
            src={getImageUrl(professional?.businessImage)}
            alt={`${businessName} avatar`}
            width={160}
            height={160}
            className="h-full w-full object-cover"
            unoptimized={true}
          />
        </div>
        <h2 className="mt-4 text-[18px] font-semibold text-primaryText">
          {businessName}
        </h2>
        <div className="mt-2 flex items-center gap-2">
          <Stars rating={rating} />
          <span className="text-[13px] text-slate-600">
            ({rating.toFixed(1)})
          </span>
        </div>

        {tags.length > 0 && (
          <div className="flex flex-wrap justify-center gap-2 p-6 w-96">
            {tags.map((tag, index) => (
              <span
                key={`${tag}-${index}`}
                className="rounded bg-slate-100 border border-primary/40 px-2 py-1 text-[12px] text-slate-700"
              >
                {tag}
              </span>
            ))}
          </div>
        )}

        {/* <div className="w-full flex justify-center">
          <Button variant="primary" size="md">
            Contact
          </Button>
        </div> */}
      </div>
    </aside>
  );
}

