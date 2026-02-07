"use client";

import { useState } from "react";
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
  const [currentPage, setCurrentPage] = useState(1);
  const [limit, setLimit] = useState(2);

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
            onPageChange={setCurrentPage}
            onLimitChange={(newLimit) => {
              setLimit(newLimit);
              setCurrentPage(1);
            }}
          />
        )}
      </div>
    </div>
  );
}
