"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useGetPendingJobsQuery } from "@/store/slice/myJobsSlice";
import JobCard from "./JobCard";
import { formatDateTime } from "@/app/utils/TimeDateFormat";
import MyJobSkeleton from "../ui/skeleton/MyJobSkeleton";
import { PaginationTradeLink } from "../ui/PaginationTradeLink";
import { ReactNode } from "react";

type JobAction = {
  id?: string;
  label: string;
  variant: "primary" | "outline";
  onClick?: () => void;
  className?: string;
  icon?: ReactNode;
};

interface Job {
  _id: string;
  service: {
    name: string;
  };
  jobPost: {
    jobNumber: string;
  };
  jobNumber?: string;
  description?: string;
  actions?: JobAction[];
  createdAt: string;
}

interface PaginationData {
  total: number;
  limit: number;
  page: number;
  totalPage: number;
}

interface PendingJobsResponse {
  data: Job[];
  pagination?: PaginationData;
}

export default function PendingJobs() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const currentPage = parseInt(searchParams.get("page") || "1");
  const limit = parseInt(searchParams.get("limit") || "10");

  const {
    data: response,
    error,
    isLoading,
  } = useGetPendingJobsQuery({ status: "OPEN", page: currentPage, limit });

  const pendingJobs = (response as PendingJobsResponse)?.data || [];
  const pagination = (response as PendingJobsResponse)?.pagination;

  if (isLoading) {
    return (
      <div className="flex flex-col gap-6">
        <MyJobSkeleton />
      </div>
    );
  }

  if (error) {
    return <div className="text-red-500">Error loading pending jobs</div>;
  }

  if (pendingJobs?.length === 0) {
    return <div className="text-gray-500">No pending jobs yet</div>;
  }

  return (
    <div>
      <div className="flex flex-col gap-6">
        {(pendingJobs ?? []).map((job: Job) => (
          <JobCard
            key={job._id}
            id={job._id}
            title={job?.service?.name}
            jobNumber={job?.jobPost?.jobNumber}
            postedOn={"Posted on " + formatDateTime(job?.createdAt)}
            description={
              "Suitable local tradespeople have been alerted about your job. As soon as one is interested we will let you know."
            }
            actions={job.actions}
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
    </div>
  );
}
