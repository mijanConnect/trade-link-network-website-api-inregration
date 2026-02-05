"use client";

import { useRouter } from "next/navigation";
import JobCard from "./JobCard";
import { useGetInterestedJobsQuery } from "@/store/slice/myJobsSlice";
import { formatDateTime } from "@/app/utils/TimeDateFormat";

interface InterestedTradeperson {
  _id: string;
  jobPost: {
    _id: string;
    service: {
      _id: string;
      name: string;
    };
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
}

export default function InterestedTradeperson() {
  const router = useRouter();

  const {
    data: interestedJobs,
    error,
    isLoading,
  } = useGetInterestedJobsQuery({});

  // The data is already transformed by the API, so it's either an array or an object with data property
  const interestedJobsData = Array.isArray(interestedJobs)
    ? interestedJobs
    : interestedJobs?.data || [];

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return (
      <div className="text-red-500">Error loading interested tradespeople</div>
    );
  }

  if (interestedJobsData.length === 0) {
    return <div className="text-gray-500">No interested tradespeople yet</div>;
  }

  const handleViewProfile = () => {
    router.push("/provider-profile");
  };

  return (
    <div className="flex flex-col gap-6">
      {(interestedJobsData ?? []).map((interested: InterestedTradeperson) => (
        <JobCard
          key={interested._id}
          id={interested._id}
          title={interested?.jobPost?.service?.name}
          postedOn={`Interested on ${formatDateTime(interested.createdAt)}`}
          description={`${interested.sender.name} is interested in your ${interested.jobPost.service.name} job. Compare their profiles and book with confidence.`}
          actions={[
            {
              label: "View Profile",
              variant: "outline" as const,
              onClick: handleViewProfile,
            },
            {
              label: "Accept Request",
              variant: "primary" as const,
            },
          ]}
        />
      ))}
    </div>
  );
}
