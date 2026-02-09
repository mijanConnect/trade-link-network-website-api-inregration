import { useProfileQuery } from "@/store/slice/authSlice";
import { Mail, MapPin, Phone } from "lucide-react";
import Image from "next/image";
import { getImageUrl } from "../ui/ImageURL";

export default function LeftPart() {
  const { data: profileData } = useProfileQuery({});

  return (
    <>
      <div className="max-w-sm min-w-full lg:min-w-[400px] p-4 lg:p-6 border rounded-lg border-stroke">
        {/* Profile Image or Avatar */}
        <div className="w-[150px] h-[150px]">
          {profileData?.customer?.profileImage ? (
            <Image
              src={getImageUrl(profileData?.customer?.profileImage)}
              alt="Profile"
              width={150}
              height={150}
              className="rounded-full object-cover w-full h-full"
              unoptimized
            />
          ) : (
            <div className="w-full h-full rounded-full bg-primary text-white flex items-center justify-center text-6xl font-bold">
              {profileData?.name
                ? profileData.name.charAt(0).toUpperCase()
                : "U"}
            </div>
          )}
        </div>
        <h2 className="text-[22px] text-primaryText font-semibold mt-4">
          {profileData?.name || "User Profile"}
        </h2>
        <div className="flex flex-col gap-3 mt-4">
          <div className="flex gap-3 items-center">
            <Mail className="w-5 h-5 text-primaryTextLight" />
            <p>{profileData?.email || "N/A"}</p>
          </div>
          <div className="flex gap-3 items-center">
            <Phone className="w-5 h-5 text-primaryTextLight" />
            <p className="text-[16px] text-primaryText">
              {profileData?.phone || "N/A"}
            </p>
          </div>
          <div className="flex gap-3 items-center">
            <MapPin className="w-5 h-5 text-primaryTextLight" />
            <p className="text-[16px] text-primaryText">
              {profileData?.location || "N/A"}
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
