"use client";

import { ChevronLeft } from "lucide-react";
// import Button from "../ui/Button";
import Link from "next/link";
import { useGetJobsDetailsQuery } from "@/store/slice/myJobsSlice";
import { useParams } from "next/navigation";
import { formatDateTime } from "@/app/utils/TimeDateFormat";

type DetailItem = { label: string; value: string };

type AnsweredQuestion = {
  questionText: string;
  answerText: string;
  _id: string;
};

type JobDetailsData = {
  _id: string;
  jobNumber: string;
  status: string;
  description: string;
  createdAt: string;
  updatedAt: string;
  service?: {
    _id: string;
    name: string;
  };
  creator?: {
    _id: string;
    name: string;
    email: string;
    phone: string;
  };
  postcode?: string;
  answeredQuestions?: AnsweredQuestion[];
};

type JobDetailsResponse = {
  success: boolean;
  message: string;
  data?: JobDetailsData;
};

function DetailTable({ items }: { items: DetailItem[] }) {
  return (
    <table className="w-full text-[16px] lg:text-base">
      <tbody>
        {items.map((item, index) => (
          <tr key={`${item.label}-${index}`}>
            <td className="w-1/4 py-1 lg:py-2 text-[14px] lg:text-[18px] text-primaryText align-top">
              {item.label}
            </td>
            <td className="w-8 py-1 lg:py-2 text-center text-[14px] lg:text-[18px] text-primaryText align-top">
              :
            </td>
            <td className="py-1 lg:py-2 text-[14px] lg:text-[18px] text-primaryText align-top">
              {item.value}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default function JobDetails() {
  const params = useParams();
  const id = params.id as string;

  const {
    data: response,
    error,
    isLoading,
  } = useGetJobsDetailsQuery({ id: id || "" });

  if (isLoading) {
    return <div className="text-gray-500">Loading job details...</div>;
  }

  if (error) {
    return <div className="text-red-500">Error loading job details</div>;
  }

  const jobDetails = (response as JobDetailsResponse)?.data;

  if (!jobDetails) {
    return <div className="text-gray-500">No job details available</div>;
  }

  // Transform API data to DetailItem format
  const apiDetails: DetailItem[] = [
    { label: "Job Number", value: jobDetails.jobNumber || "N/A" },
    { label: "Service Type", value: jobDetails.service?.name || "N/A" },
    { label: "Status", value: jobDetails.status || "N/A" },
    { label: "Work Description", value: jobDetails.description || "N/A" },
    ...(jobDetails.answeredQuestions?.map((q: AnsweredQuestion) => ({
      label: q.questionText,
      value: q.answerText,
    })) || []),
  ];

  const apiPersonalDetails: DetailItem[] = [
    { label: "Name", value: jobDetails.creator?.name || "N/A" },
    { label: "Email", value: jobDetails.creator?.email || "N/A" },
    { label: "Mobile Number", value: jobDetails.creator?.phone || "N/A" },
  ];

  const apiLocationDetails: DetailItem[] = [
    { label: "Postcode", value: jobDetails?.postcode || "N/A" },
  ];

  const displayTitle = jobDetails.service?.name || "Job Details";
  const displayPostedOn = jobDetails.createdAt
    ? `Posted on ${formatDateTime(jobDetails.createdAt)}`
    : "Posted date not available";

  return (
    <div>
      <Link href="/my-jobs" className="inline-block">
        <div className="flex items-center gap-2 mb-6 text-[20px] text-primaryText cursor-pointer hover:opacity-70 transition-opacity">
          <ChevronLeft />
          <p>View Details</p>
        </div>
      </Link>
      <h1 className="text-[18px] text-primaryText lg:text-[24px] font-semibold mt-0 lg:mt-8">
        {displayTitle}
      </h1>
      <p className="mb-4 lg:mb-8 mt-0 text-[14px] text-gray-400 lg:mt-2 lg:text-[16px]">
        {displayPostedOn}
      </p>

      <div className="space-y-4 lg:space-y-6">
        <section>
          <h4 className="mb-1 lg:mb-3 text-[16px] lg:text-[18px] font-bold text-primaryText">
            Details
          </h4>
          <DetailTable items={apiDetails} />
        </section>

        <section>
          <h4 className="mb-1 lg:mb-3 text-[16px] lg:text-[18px] font-bold text-primaryText">
            Location
          </h4>
          <DetailTable items={apiLocationDetails} />
        </section>

        <section>
          <h4 className="mb-1 lg:mb-3 text-[16px] lg:text-[18px] font-bold text-primaryText">
            Personal Details
          </h4>
          <DetailTable items={apiPersonalDetails} />
        </section>
      </div>

      {/* <Button variant="primary" size="md" className="mt-4 lg:mt-10">
        Edit Job Post
      </Button> */}
    </div>
  );
}
