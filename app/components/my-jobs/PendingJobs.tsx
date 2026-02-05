"use client";

import { useGetPendingJobsQuery } from "@/store/slice/myJobsSlice";
import JobCard from "./JobCard";

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

  return (
    <div>
      <div className="flex flex-col gap-6">
        {error && (
          <p className="text-red-500">
            An error occurred while fetching pending jobs.
          </p>
        )}
        {isLoading && <p>Loading pending jobs...</p>}
        {(pendingJobs ?? []).map((job: Job) => (
          <JobCard
            key={job._id}
            id={job._id}
            title={job?.service?.name}
            postedOn={job?.createdAt}
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
