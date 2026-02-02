"use client";

import JobCard from "./JobCard";
import ReviewModal from "./ReviewModal";
import ReviewViewModal from "./ReviewViewModal";
import { Star } from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";

type ReviewData = {
  rating: number;
  text: string;
  reviewer?: string;
  date?: string;
};

const RecentJobs = [
  {
    id: "job-004",
    title: "Electrical safety inspection",
    postedOn: "Posted 08 Jan, 2026",
    description:
      "A thorough inspection of your electrical system to identify potential hazards, faulty wiring, and code compliance issues. We ensure your home or workplace is safe, reliable, and up to current safety standards.",
    actions: [
      {
        label: "View Profile",
        variant: "outline" as const,
      },
      { label: "Mark as Completed", variant: "primary" as const },
    ],
  },
  {
    id: "job-005",
    title: "Kitchen cabinetry install",
    postedOn: "Posted 05 Jan, 2026",
    description:
      "A thorough inspection of your electrical system to identify potential hazards, faulty wiring, and code compliance issues. We ensure your home or workplace is safe, reliable, and up to current safety standards.",
    actions: [
      {
        label: "View Profile",
        variant: "outline" as const,
      },
      { label: "Mark as Completed", variant: "primary" as const },
    ],
  },
];

const HistoryJobs = [
  {
    id: "job-003",
    title: "2-bedroom interior painting",
    postedOn: "Posted 10 Jan, 2026",
    description:
      "Painters notified. Expect interest soon; review color palette before confirming.",
    review: null,
    actions: [
      {
        id: "rating-003",
        label: "Review",
        variant: "outline" as const,
        className:
          "group border-[#FF8D28]! text-[#FF8D28]! hover:bg-[#FF8D28]! hover:text-white!",
      },
      {
        label: "Completed",
        variant: "primary" as const,
        className:
          "bg-[#4CAF50]! border-[#4CAF50]! hover:bg-[#4CAF50]/90! hover:text-white",
      },
    ],
  },
  {
    id: "job-004",
    title: "Electrical safety inspection",
    postedOn: "Posted 08 Jan, 2026",
    description:
      "Licensed electricians will reach out to confirm appointment slots.",
    review: {
      rating: 4.5,
      text: "Great communication and punctual. Work was neat and to spec.",
      reviewer: "You",
      date: "12 Jan, 2026",
    } satisfies ReviewData,
    actions: [
      {
        id: "rating-004",
        label: "4.5",
        icon: (
          <Star className="h-4 w-4 fill-[#FF8D28] text-[#FF8D28] group-hover:fill-white group-hover:text-white" />
        ),
        variant: "outline" as const,
        className:
          "group border-[#FF8D28]! text-[#FF8D28]! hover:bg-[#FF8D28]! hover:text-white!",
      },
      {
        label: "Completed",
        variant: "primary" as const,
        className:
          "bg-[#4CAF50]! border-[#4CAF50]! hover:bg-[#4CAF50]/90! hover:text-white",
      },
    ],
  },
];

export default function HiredJobs() {
  const router = useRouter();
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);
  const [isReviewViewModalOpen, setIsReviewViewModalOpen] = useState(false);
  const [selectedReview, setSelectedReview] = useState<ReviewData | null>(null);

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
        {RecentJobs.map((job) => (
          <JobCard
            key={job.id}
            id={job.id}
            title={job.title}
            postedOn={job.postedOn}
            description={job.description}
            actions={job.actions.map((action) =>
              action.label === "View Profile"
                ? { ...action, onClick: handleViewProfile }
                : action,
            )}
          />
        ))}
      </div>
      <div className="flex flex-col gap-6 mt-10 lg:mt-20">
        <h3 className="text-[22px] font-bold text-primaryText">History</h3>
        {HistoryJobs.map((job) => (
          <JobCard
            key={job.id}
            id={job.id}
            title={job.title}
            postedOn={job.postedOn}
            description={job.description}
            actions={job.actions.map((action) =>
              action.label === "View Profile"
                ? { ...action, onClick: handleViewProfile }
                : action.id?.startsWith("rating-")
                  ? {
                      ...action,
                      onClick: () => handleReviewClick(job.review ?? null),
                    }
                  : action,
            )}
          />
        ))}
      </div>
    </>
  );
}
