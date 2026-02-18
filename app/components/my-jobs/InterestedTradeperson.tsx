"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import JobCard from "./JobCard";
import {
  useGetInterestedJobsQuery,
  useAcceptJobRequestMutation,
} from "@/store/slice/myJobsSlice";
import { formatDateTime } from "@/app/utils/TimeDateFormat";
import MyJobSkeleton from "../ui/skeleton/MyJobSkeleton";
import { PaginationTradeLink } from "../ui/PaginationTradeLink";
import ConfirmationModal from "@/components/ui/confirmation-modal";
import { toast } from "sonner";

interface InterestedTradeperson {
  _id: string;
  jobPost: {
    _id: string;
    service: {
      _id: string;
      name: string;
    };
    jobNumber: string;
  };
  sender: {
    _id: string;
    name: string;
    email: string;
    phone: string;
  };
  receiver: string;
  status: string;
  completedAt: string | null;
  createdAt: string;
  updatedAt: string;
  pagination?: PaginationData;
}

interface PaginationData {
  total: number;
  limit: number;
  page: number;
  totalPage: number;
}

interface InterestedJobsResponse {
  data: InterestedTradeperson[];
  pagination?: PaginationData;
}

export default function InterestedTradeperson() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [acceptJobRequest, { isLoading: isAccepting }] =
    useAcceptJobRequestMutation();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedJobRequestId, setSelectedJobRequestId] = useState<
    string | null
  >(null);

  const currentPage = parseInt(searchParams.get("page") || "1");
  const limit = parseInt(searchParams.get("limit") || "10");

  const handleOpenAcceptModal = (jobRequestId: string) => {
    setSelectedJobRequestId(jobRequestId);
    setIsModalOpen(true);
  };

  const handleAcceptRequest = async () => {
    if (!selectedJobRequestId) {
      toast.error("Job request ID is missing");
      setIsModalOpen(false);
      return;
    }

    try {
      await acceptJobRequest(selectedJobRequestId).unwrap();
      toast.success("Job request accepted successfully");
      setIsModalOpen(false);
      setSelectedJobRequestId(null);
    } catch (error) {
      console.error("Error accepting job request:", error);
      toast.error("Failed to accept job request");
    }
  };

  const {
    data: interestedJobs,
    error,
    isLoading,
  } = useGetInterestedJobsQuery({ page: currentPage, limit });

  // The data is already transformed by the API, so it's either an array or an object with data property
  const interestedJobsData = Array.isArray(interestedJobs)
    ? interestedJobs
    : (interestedJobs as InterestedJobsResponse)?.data || [];
  const pagination = (interestedJobs as InterestedJobsResponse)?.pagination;

  if (isLoading) {
    return (
      <div className="flex flex-col gap-6">
        <MyJobSkeleton />
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-red-500">Error loading interested tradespeople</div>
    );
  }

  if (interestedJobsData.length === 0) {
    return <div className="text-gray-500">No interested tradespeople yet</div>;
  }

  return (
    <>
      <ConfirmationModal
        isOpen={isModalOpen}
        title="Accept Job Request?"
        description="Are you sure you want to accept this job request? This will notify the tradesperson."
        confirmLabel="Accept Request"
        cancelLabel="Cancel"
        isDangerous={false}
        isLoading={isAccepting}
        onConfirm={handleAcceptRequest}
        onCancel={() => {
          setIsModalOpen(false);
          setSelectedJobRequestId(null);
        }}
      />
      <div className="flex flex-col gap-6">
        {(interestedJobsData ?? []).map((interested: InterestedTradeperson) => (
          <JobCard
            key={interested._id}
            id={interested._id}
            title={interested?.jobPost?.service?.name}
            jobNumber={interested?.jobPost?.jobNumber}
            postedOn={`Interested on ${formatDateTime(interested.createdAt)}`}
            description={`${interested.sender.name} is interested in your ${interested.jobPost.service.name} job. Compare their profiles and book with confidence.`}
            actions={[
              {
                label: "View Profile",
                variant: "outline" as const,
                onClick: () =>
                  router.push(
                    `/provider-profile?id=${interested.sender._id}&jobPostId=${interested.jobPost._id}`,
                  ),
              },
              {
                label: "Accept Request",
                variant: "primary" as const,
                onClick: () => handleOpenAcceptModal(interested._id),
              },
            ]}
          />
        ))}
        {pagination && (
          <PaginationTradeLink
            currentPage={currentPage}
            totalPages={pagination.totalPage}
            limit={limit}
            onPageChange={(page) => {
              const params = new URLSearchParams(searchParams.toString());
              params.set("page", page.toString());
              router.push(`?${params.toString()}`);
            }}
            onLimitChange={(newLimit) => {
              const params = new URLSearchParams(searchParams.toString());
              params.set("limit", newLimit.toString());
              params.set("page", "1");
              router.push(`?${params.toString()}`);
            }}
          />
        )}
      </div>
    </>
  );
}
