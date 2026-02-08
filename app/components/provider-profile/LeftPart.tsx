"use client";

import { Mail, MapPin, Phone, Star } from "lucide-react";
import Image from "next/image";
import Button from "../ui/Button";
import { useGetProfessionalProfileQuery } from "@/store/slice/professionalProfile";
import { useSearchParams } from "next/navigation";
import { getImageUrl } from "../ui/ImageURL";

type Service = {
  _id?: string;
  name: string;
};

type ProfessionalProfile = {
  _id: string;
  email: string;
  phone: string;
  location?: string;
  professional: {
    _id: string;
    businessName: string;
    businessImage: string;
    about?: string;
    services: Service[];
    address: string;
    ratingAvg: number;
  };
};

type ProfileResponse = {
  success: boolean;
  message: string;
  data?: ProfessionalProfile;
};

export default function LeftPart() {
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

  const profile = response as ProfileResponse;

  if (!id) {
    return <div className="text-red-500">No provider ID specified</div>;
  }

  if (!jobPostId) {
    return <div className="text-red-500">No job post ID specified</div>;
  }

  if (isLoading) {
    return <div className="text-gray-500">Loading provider profile...</div>;
  }

  if (error) {
    return <div className="text-red-500">Error loading provider profile</div>;
  }

  return (
    <>
      <div className="max-w-sm min-w-full lg:min-w-[400px] p-4 lg:p-6 border rounded-lg border-stroke">
        {profile?.data?.professional?.businessImage ? (
          <Image
            src={getImageUrl(profile.data.professional.businessImage)}
            alt="Profile"
            width={150}
            height={150}
            unoptimized
            className="rounded-full object-cover w-36 h-36"
          />
        ) : (
          <div className="w-36 h-36 rounded-full bg-primary text-white flex items-center justify-center text-4xl font-bold">
            {profile?.data?.professional?.businessName
              ? profile.data.professional.businessName.charAt(0).toUpperCase()
              : "U"}
          </div>
        )}
        <h2 className="text-[22px] text-primaryText font-semibold mt-4">
          {profile?.data?.professional?.businessName || "ABC Company"}
        </h2>
        <div className="flex gap-2 items-center">
          <div className="flex gap-1 mt-1">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`h-5 w-5 ${
                  i < Math.round(profile?.data?.professional?.ratingAvg || 0)
                    ? "fill-yellow-500 text-yellow-500"
                    : "fill-gray-300 text-gray-300"
                }`}
              />
            ))}
          </div>
          <p className="text-[20px] font-semibold text-primaryText">
            ({profile?.data?.professional?.ratingAvg || "0"})
          </p>
        </div>
        <div className="mt-4">
          <ul className="flex gap-2 items-center flex-wrap">
            {profile?.data?.professional?.services &&
            profile.data.professional.services.length > 0 ? (
              profile.data.professional.services.map(
                (service: Service, index: number) => (
                  <li
                    key={service._id || index}
                    className="border px-2 py-1 inline-block rounded-sm border-stroke"
                  >
                    {service.name}
                  </li>
                ),
              )
            ) : (
              <li className="border px-2 py-1 inline-block rounded-sm border-stroke text-gray-400">
                No services available
              </li>
            )}
          </ul>
        </div>
        <div className="flex flex-col gap-3 mt-4">
          <div className="flex gap-3 items-center">
            <Mail className="w-5 h-5 text-primaryTextLight" />
            <p>{profile?.data?.email || "N/A"}</p>
          </div>
          <div className="flex gap-3 items-center">
            <Phone className="w-5 h-5 text-primaryTextLight" />
            <p className="text-[16px] text-primaryText">
              {profile?.data?.phone || "N/A"}
            </p>
          </div>
          <div className="flex gap-3 items-center">
            <MapPin className="w-5 h-5 text-primaryTextLight" />
            <p className="text-[16px] text-primaryText">
              {profile?.data?.professional?.address || "N/A"}
            </p>
          </div>
        </div>
        <Button variant="primary" size="md" className="mt-6">
          Contact
        </Button>
      </div>
    </>
  );
}
