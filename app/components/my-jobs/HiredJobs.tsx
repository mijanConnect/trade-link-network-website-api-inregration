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
  useCompleteJobPostMutation,
  useCreateJobReviewMutation,
} from "@/store/slice/myJobsSlice";
import MyJobSkeleton from "../ui/skeleton/MyJobSkeleton";
import { formatDateTime } from "@/app/utils/TimeDateFormat";
import ConfirmationModal from "@/components/ui/confirmation-modal";
import { toast } from "sonner";

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
  const [selectedReviewJobRequestId, setSelectedReviewJobRequestId] = useState<
    string | null
  >(null);
  const [isCompleteModalOpen, setIsCompleteModalOpen] = useState(false);
  const [selectedJobPostId, setSelectedJobPostId] = useState<string | null>(
    null,
  );
  const [completeJobPost, { isLoading: isCompleting }] =
    useCompleteJobPostMutation();
  const [createJobReview, { isLoading: isSubmittingReview }] =
    useCreateJobReviewMutation();

  const {
    data: hiredRecentJobs,
    error: recentJobsError,
    isLoading: recentJobsLoading,
  } = useGetHiredRecentJobsQuery("NOT_COMPLETED");

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

  const handleReviewClick = (
    review: ReviewData | null,
    jobRequestId?: string,
  ) => {
    if (review) {
      setSelectedReview(review);
      setIsReviewViewModalOpen(true);
      return;
    }

    if (!jobRequestId) {
      toast.error("Job request ID is missing");
      return;
    } else {
      setSelectedReviewJobRequestId(jobRequestId);
      setIsReviewModalOpen(true);
    }
  };

  const handleReviewSubmit = async (rating: number, review: string) => {
    if (!selectedReviewJobRequestId) {
      toast.error("Job request ID is missing");
      return;
    }

    try {
      await createJobReview({
        jobRequestId: selectedReviewJobRequestId,
        rating,
        comment: review,
      }).unwrap();
      toast.success("Review submitted successfully");
      setSelectedReviewJobRequestId(null);
      setIsReviewModalOpen(false);
    } catch (error: any) {
      console.error("Error submitting review:", error);
      const errorMessage = error?.data?.message || "Failed to submit review";
      toast.error(errorMessage);
    }
  };

  const handleOpenCompleteModal = (jobPostId?: string) => {
    if (!jobPostId) {
      toast.error("Job post ID is missing");
      return;
    }

    setSelectedJobPostId(jobPostId);
    setIsCompleteModalOpen(true);
  };

  const handleConfirmComplete = async () => {
    if (!selectedJobPostId) {
      toast.error("Job post ID is missing");
      setIsCompleteModalOpen(false);
      return;
    }

    try {
      await completeJobPost(selectedJobPostId).unwrap();
      toast.success("Job marked as completed");
      setIsCompleteModalOpen(false);
      setSelectedJobPostId(null);
    } catch (error) {
      console.error("Error completing job post:", error);
      toast.error("Failed to mark job as completed");
    }
  };

  return (
    <>
      <ConfirmationModal
        isOpen={isCompleteModalOpen}
        title="Mark as Completed?"
        description="Are you sure you want to mark this job as completed?"
        confirmLabel="Mark as Completed"
        cancelLabel="Cancel"
        isDangerous={false}
        isLoading={isCompleting}
        onConfirm={handleConfirmComplete}
        onCancel={() => {
          setIsCompleteModalOpen(false);
          setSelectedJobPostId(null);
        }}
      />
      <ReviewModal
        isOpen={isReviewModalOpen}
        onClose={() => {
          setIsReviewModalOpen(false);
          setSelectedReviewJobRequestId(null);
        }}
        onSubmit={handleReviewSubmit}
        isLoading={isSubmittingReview}
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
                onClick: () =>
                  router.push(
                    `/provider-profile?id=${job.sender._id}&jobPostId=${job.jobPost._id}`,
                  ),
              },
              {
                label: "Mark as Completed",
                variant: "primary" as const,
                onClick: () => handleOpenCompleteModal(job.jobPost?._id),
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
                      handleReviewClick(
                        {
                          rating: job?.review?.rating ?? 0,
                          text: job?.review?.comment ?? "",
                          reviewer: "You",
                          date: formatDateTime(
                            job.completedAt || job.updatedAt,
                          ),
                        },
                        job._id,
                      ),
                  }
                : {
                    id: `rating-${job._id}`,
                    label: "Review",
                    variant: "outline" as const,
                    className:
                      "group border-[#FF8D28]! text-[#FF8D28]! hover:bg-[#FF8D28]! hover:text-white!",
                    onClick: () => handleReviewClick(null, job._id),
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
