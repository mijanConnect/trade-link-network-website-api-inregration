import { Star } from "lucide-react";
import Image from "next/image";
import { getImageUrl } from "../ui/ImageURL";
import { formatDateTime } from "@/app/utils/TimeDateFormat";

type Review = {
  _id: string;
  rating: number;
  comment: string;
  createdAt: string;
  customer: {
    _id: string;
    name: string;
    customer: {
      _id: string;
      profileImage: string;
    };
    phone: string;
  };
};

type SingleReviewProps = {
  reviewResponse?: {
    success: boolean;
    message: string;
    data: Review[];
    pagination: {
      total: number;
      limit: number;
      page: number;
      totalPage: number;
    };
  };
};

export default function SingleReview({ reviewResponse }: SingleReviewProps) {
  if (!reviewResponse?.data || reviewResponse.data.length === 0) {
    return (
      <div className="text-gray-500">No reviews available at the moment.</div>
    );
  }

  return (
    <>
      {reviewResponse.data.map((review) => (
        <div key={review._id}>
          <div className="flex gap-4 lg:gap-6 items-start max-w-xl min-w-xl border-b border-stroke pb-4 mb-4 lg:mb-6 lg:pb-6">
            {review.customer?.customer?.profileImage ? (
              <Image
                src={getImageUrl(review.customer.customer.profileImage)}
                alt={review.customer.name}
                width={60}
                height={60}
                unoptimized
                className="rounded-full object-cover"
              />
            ) : (
              <div className="w-[60px] h-[60px] rounded-full bg-primary text-white flex items-center justify-center text-xl font-bold">
                {review.customer.name
                  ? review.customer.name.charAt(0).toUpperCase()
                  : "U"}
              </div>
            )}
            <div className="w-full">
              <div className="flex justify-between items-start w-full">
                <div className="flex flex-col">
                  <h3 className="text-[18px] text-primaryText font-semibold">
                    {review.customer.name}
                  </h3>
                  <div className="flex gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`h-4 w-4 ${
                          i < review.rating
                            ? "fill-yellow-500 text-yellow-500"
                            : "fill-gray-300 text-gray-300"
                        }`}
                      />
                    ))}
                  </div>
                </div>
                <p className="text-sm text-gray-500">
                  {formatDateTime(review.createdAt)}
                </p>
              </div>
              <p className="mt-2 lg:mt-4 text-primaryText text-[14px] lg:text-[16px] leading-6 lg:leading-7">
                {review.comment}
              </p>
            </div>
          </div>
        </div>
      ))}
    </>
  );
}
