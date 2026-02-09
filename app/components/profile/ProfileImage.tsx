"use client";

import Image from "next/image";
import { Camera } from "lucide-react";
import { useState, useMemo } from "react";
import { useProfileQuery } from "@/store/slice/authSlice";
import { getImageUrl } from "../ui/ImageURL";

export default function ProfileImage() {
  const { data: profileData } = useProfileQuery({});
  const [uploadedPreview, setUploadedPreview] = useState<string | null>(null);

  const displayPreview = useMemo(() => {
    if (uploadedPreview) return uploadedPreview;
    if (profileData?.customer?.profileImage) {
      return getImageUrl(profileData.customer.profileImage);
    }
    return null;
  }, [profileData, uploadedPreview]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const imageUrl = URL.createObjectURL(file);
    setUploadedPreview(imageUrl);
  };

  return (
    <div className="relative w-35 h-35">
      {/* Profile Image or Avatar */}
      {displayPreview ? (
        <Image
          src={displayPreview}
          alt="Profile Image"
          fill
          className="rounded-full object-cover border"
          unoptimized
        />
      ) : (
        <div className="w-full h-full rounded-full bg-primary text-white flex items-center justify-center text-6xl font-bold">
          {profileData?.name ? profileData.name.charAt(0).toUpperCase() : "U"}
        </div>
      )}

      {/* Upload Button */}
      <label className="absolute bottom-1 right-1 bg-primary p-2 rounded-full cursor-pointer shadow-md hover:bg-green-600 transition">
        <Camera className="w-4 h-4 text-white" />
        <input
          type="file"
          accept="image/*"
          className="hidden"
          onChange={handleImageChange}
        />
      </label>
    </div>
  );
}
