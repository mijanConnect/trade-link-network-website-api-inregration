"use client";

import Image from "next/image";
import TradePersonProfileCard from "@/app/components/trade-person/TradePersonProfileCard";
// import TradePersonPanel from "@/app/components/trade-person/TradePersonPanel";
import Stars from "@/app/components/trade-person/Stars";
import Button from "@/app/components/ui/Button";
import { useMyReviewsQuery } from "@/store/slice/myProfileSlice";

const formatReviewDate = (dateString: string) => {
  if (!dateString) return "";
  const date = new Date(dateString);
  if (Number.isNaN(date.getTime())) return "";

  return date.toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
};

export default function ReviewsPage() {
  const { data: reviewsData, isLoading } = useMyReviewsQuery({
    page: 1,
    limit: 10,
  });

  const reviews = reviewsData?.data ?? [];
  const totalCount = reviewsData?.pagination?.total ?? reviews.length;

  return (
    <div className="flex flex-col gap-6 md:flex-row">
      {/* Left Column - Profile Card */}
      <aside className="w-full md:w-1/3">
        <TradePersonProfileCard />
      </aside>

      {/* Right Column - Reviews */}
      <div className="w-full flex-1 md:w-2/3 bg-background p-12">
        <div className="mb-6 flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
          <h1 className="text-2xl font-bold text-primaryText md:text-[32px]">
            Reviews ({totalCount})
          </h1>
        </div>


        <div className="bg-background">
          {isLoading ? (
            <div className="flex justify-center py-8">
              <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
            </div>
          ) : reviews.length === 0 ? (
            <p className="text-sm text-slate-500">No reviews yet.</p>
          ) : (
            <div className="space-y-6 max-w-2xl">
              {reviews.map((review) => (
                <div
                  key={review._id}
                  className="border-b border-slate-200 pb-6 last:border-0"
                >
                  <div className="flex items-start gap-4">
                    <div className="h-12 w-12 overflow-hidden rounded-full border border-slate-200">
                      <Image
                        src="/assets/avatar.png"
                        alt="Customer avatar"
                        width={48}
                        height={48}
                        className="h-full w-full object-cover"
                      />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-start justify-between">
                        <div>
                          <div className="text-[14px] font-semibold text-primaryText">
                            Customer
                          </div>
                          <div className="mt-1 flex items-center gap-2">
                            <Stars rating={review.rating} />
                          </div>
                        </div>
                        <div className="text-[12px] text-slate-500">
                          {formatReviewDate(review.createdAt)}
                        </div>
                      </div>
                      <p className="mt-3 text-[14px] leading-relaxed text-slate-700 whitespace-pre-line">
                        {review.comment}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          <div className="mt-6 w-full flex justify-center">
            <Button variant="primary" size="md">
              View All Reviews
            </Button>
          </div>
        </div>

      </div>
    </div>
  );
}
