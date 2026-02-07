"use client";

import JobCard from "./JobCard";
import ReviewModal from "./ReviewModal";
import ReviewViewModal from "./ReviewViewModal";
import { Star } from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  useGetHiredHistoryJobsQuery,
  useGetHiredRecentJobsQuery,
} from "@/store/slice/myJobsSlice";
import MyJobSkeleton from "../ui/skeleton/MyJobSkeleton";
import { formatDateTime } from "@/app/utils/TimeDateFormat";

type ReviewData = {
  rating: number;
  text: string;
  reviewer?: string;
  date?: string;
};

// interface HiredJobResponse {
//   success: boolean;
//   message: string;
//   pagination: {
//     total: number;
//     limit: number;
//     page: number;
//     totalPage: number;
//   };
//   data: HiredJob[];
// }

interface HiredJob {
  _id: string;
  id: string;

  jobPost: {
    _id: string;
    jobNumber: string;
    status: string;
    createdAt: string;
    updatedAt: string;

    service: {
      _id: string;
      name: string;
    };
  };

  sender: {
    _id: string;
    name: string;
    phone: string;
  };

  status: string;
  createdAt: string;
  updatedAt: string;
  completedAt: string | null;

  review?: {
    _id: string;
    jobRequest: string;
    rating: number;
    comment: string;
  };
}

export default function HiredJobs() {
  const router = useRouter();
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);
  const [isReviewViewModalOpen, setIsReviewViewModalOpen] = useState(false);
  const [selectedReview, setSelectedReview] = useState<ReviewData | null>(null);

  const {
    data: hiredRecentJobs,
    error: recentJobsError,
    isLoading: recentJobsLoading,
  } = useGetHiredRecentJobsQuery("COMPLETED");

  const {
    data: hiredHistoryJobs,
    error: historyJobsError,
    isLoading: historyJobsLoading,
  } = useGetHiredHistoryJobsQuery("COMPLETED");

  if (recentJobsLoading) {
    return (
      <div className="flex flex-col gap-6">
        <MyJobSkeleton />
      </div>
    );
  }

  if (recentJobsError) {
    return <div className="text-red-500">Error loading recent hired jobs</div>;
  }

  if (hiredRecentJobs?.length === 0) {
    return <div className="text-gray-500">No recent hired jobs yet</div>;
  }

  if (historyJobsLoading) {
    return (
      <div className="flex flex-col gap-6">
        <MyJobSkeleton />
      </div>
    );
  }

  if (historyJobsError) {
    return <div className="text-red-500">Error loading history hired jobs</div>;
  }

  if (hiredHistoryJobs?.length === 0) {
    return <div className="text-gray-500">No history hired jobs yet</div>;
  }

  const handleViewProfile = () => {
    router.push("/provider-profile");
  };

  const handleReviewClick = (review: ReviewData | null) => {
    if (review) {
      setSelectedReview(review);
      setIsReviewViewModalOpen(true);
    } else {
      setIsReviewModalOpen(true);
    }
  };

  const handleReviewSubmit = (rating: number, review: string) => {
    console.log("Review submitted:", { rating, review });
    // Add your submission logic here
  };

  return (
    <>
      <ReviewModal
        isOpen={isReviewModalOpen}
        onClose={() => setIsReviewModalOpen(false)}
        onSubmit={handleReviewSubmit}
      />
      <ReviewViewModal
        isOpen={isReviewViewModalOpen}
        onClose={() => {
          setIsReviewViewModalOpen(false);
          setSelectedReview(null);
        }}
        review={selectedReview}
      />
      <div className="flex flex-col gap-6">
        <h3 className="text-[22px] font-bold text-primaryText">Recent</h3>
        {(hiredRecentJobs ?? []).map((job: HiredJob) => (
          <JobCard
            key={job._id}
            id={job._id}
            title={job.jobPost?.service?.name}
            postedOn={`Interested on ${formatDateTime(job.createdAt)}`}
            description={
              "Your booking has been completed successfully. You can view details and contact your provider anytime from your dashboard."
            }
            actions={[
              {
                label: "View Profile",
                variant: "outline" as const,
                onClick: handleViewProfile,
              },
              {
                label: "Mark as Completed",
                variant: "primary" as const,
                onClick: () =>
                  console.log("Mark as Completed clicked for job:", job._id),
              },
            ]}
          />
        ))}
      </div>
      <div className="flex flex-col gap-6 mt-10 lg:mt-20">
        <h3 className="text-[22px] font-bold text-primaryText">History</h3>
        {(hiredHistoryJobs ?? []).map((job: HiredJob) => (
          <JobCard
            key={job._id}
            id={job._id}
            title={job.jobPost?.service?.name}
            postedOn={`Interested on ${formatDateTime(job.createdAt)}`}
            description={
              "Your booking has been completed successfully. You can view details and contact your provider anytime from your dashboard."
            }
            actions={[
              job.review
                ? {
                    id: `rating-${job._id}`,
                    label: job.review.rating.toString(),
                    icon: (
                      <Star className="h-4 w-4 fill-[#FF8D28] text-[#FF8D28] group-hover:fill-white group-hover:text-white" />
                    ),
                    variant: "outline" as const,
                    className:
                      "group border-[#FF8D28]! text-[#FF8D28]! hover:bg-[#FF8D28]! hover:text-white!",
                    onClick: () =>
                      handleReviewClick({
                        rating: job?.review?.rating ?? 0,
                        text: job?.review?.comment ?? "",
                        reviewer: "You",
                        date: formatDateTime(job.completedAt || job.updatedAt),
                      }),
                  }
                : {
                    id: `rating-${job._id}`,
                    label: "Review",
                    variant: "outline" as const,
                    className:
                      "group border-[#FF8D28]! text-[#FF8D28]! hover:bg-[#FF8D28]! hover:text-white!",
                    onClick: () => handleReviewClick(null),
                  },
              {
                label: "Completed",
                variant: "primary" as const,
                className:
                  "bg-[#4CAF50]! border-[#4CAF50]! hover:bg-[#4CAF50]/90! hover:text-white",
              },
            ]}
          />
        ))}
      </div>
    </>
  );
}
