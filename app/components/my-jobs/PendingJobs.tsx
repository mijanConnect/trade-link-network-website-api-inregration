"use client";

import { useGetPendingJobsQuery } from "@/store/slice/myJobsSlice";
import JobCard from "./JobCard";
import { formatDateTime } from "@/app/utils/TimeDateFormat";
import MyJobSkeleton from "../ui/skeleton/MyJobSkeleton";

interface Job {
  _id: string;
  service: {
    name: string;
  };
  description?: string;
  actions: any;
  createdAt: string;
}

export default function PendingJobs() {
  const {
    data: pendingJobs,
    error,
    isLoading,
  } = useGetPendingJobsQuery("OPEN");

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
      </div>
    </div>
  );
}
