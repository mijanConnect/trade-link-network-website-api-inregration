"use client";

import Image from "next/image";
import TradePersonProfileCard from "@/app/components/trade-person/TradePersonProfileCard";
// import TradePersonPanel from "@/app/components/trade-person/TradePersonPanel";
import Stars from "@/app/components/trade-person/Stars";
import Button from "@/app/components/ui/Button";
import { tradePersonProfile, reviewsMock } from "@/lib/trade-person/mock";

export default function ReviewsPage() {
  return (
    <div className="flex flex-col gap-6 md:flex-row">
      {/* Left Column - Profile Card */}
      <aside className="w-full md:w-1/3">
        <TradePersonProfileCard profile={tradePersonProfile} />
      </aside>

      {/* Right Column - Reviews */}
      <div className="w-full flex-1 md:w-2/3 bg-background p-12">
        <div className="mb-6 flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
          <h1 className="text-2xl font-bold text-primaryText md:text-[32px]">
            Reviews ({reviewsMock.length})
          </h1>
        </div>


        <div className="bg-background">
          <div className="space-y-6  max-w-2xl">
            {reviewsMock.map((review) => (
              <div key={review.id} className="border-b  border-slate-200 pb-6 last:border-0">
                <div className="flex items-start gap-4">
                  <div className="h-12 w-12 overflow-hidden rounded-full border border-slate-200">
                    <Image
                      src={review.reviewerAvatar}
                      alt={`${review.reviewerName} avatar`}
                      width={48}
                      height={48}
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-start justify-between">
                      <div>
                        <div className="text-[14px] font-semibold text-primaryText">
                          {review.reviewerName}
                        </div>
                        <div className="mt-1 flex items-center gap-2">
                          <Stars rating={review.rating} />
                        </div>
                      </div>
                      <div className="text-[12px] text-slate-500">{review.dateLabel}</div>
                    </div>
                    <p className="mt-3 text-[14px] leading-relaxed text-slate-700">
                      {review.text}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6 w-full flex justify-center">
            <Button variant="primary" size="md" >
              View All Reviews
            </Button>
          </div>
        </div>

      </div>
    </div>
  );
}
