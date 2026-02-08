"use client";

import {
  useGetProfessionalProfileQuery,
  useGetProfessionalProfileReviewQuery,
} from "@/store/slice/professionalProfile";
import { useSearchParams } from "next/navigation";
import SingleReview from "./SingleReview";
import Button from "../ui/Button";

type ProfessionalProfile = {
  _id: string;
  professional: {
    about?: string;
  };
};

type ProfileResponse = {
  success: boolean;
  message: string;
  data?: ProfessionalProfile;
};

export default function RightSide() {
  const searchParams = useSearchParams();
  const id = searchParams.get("id") || "";
  const jobPostId = searchParams.get("jobPostId") || "";

  const {
    data: response,
    error,
    isLoading,
  } = useGetProfessionalProfileQuery(
    { id, jobPostId },
    { skip: !id || !jobPostId },
  );

  const {
    data: reviewResponse,
    error: reviewError,
    isLoading: reviewIsLoading,
  } = useGetProfessionalProfileReviewQuery(
    { id, jobPostId },
    { skip: !id || !jobPostId },
  );

  console.log(reviewResponse);

  const profile = response as ProfileResponse;

  if (!id || !jobPostId) {
    return null;
  }

  if (isLoading) {
    return <div className="text-gray-500">Loading...</div>;
  }

  if (error) {
    return <div className="text-red-500">Error loading about</div>;
  }

  const aboutText =
    profile?.data?.professional?.about ||
    "No information about this professional available at the moment.";

  return (
    <>
      <div>
        <div>
          <h2 className="text-[24px] lg:text-[32px] text-primaryText font-bold mb-1 lg:mb-4">
            About
          </h2>
          <p className="text-[14px] lg:text-[16px] text-primaryTextLight leading-6 lg:leading-7 mb-2">
            {aboutText}
          </p>
        </div>
        <div className="mt-6 lg:mt-12">
          <SingleReview reviewResponse={reviewResponse as any} />
        </div>
        <Button className="mt-6 lg:mt-8">View All Reviews</Button>
      </div>
    </>
  );
}
