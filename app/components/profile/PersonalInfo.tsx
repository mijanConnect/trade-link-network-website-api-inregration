"use client";

import InputField from "../ui/InputField";
import Button from "../ui/Button";
import ProfileImage from "./ProfileImage";
import { useState } from "react";
import { useUpdateUserProfileMutation, useProfileQuery } from "@/store/slice/authSlice";
import { toast } from "sonner";

export default function PersonalInfo() {
  const { data: profileData } = useProfileQuery({});
  const [updateUserProfile, { isLoading }] = useUpdateUserProfileMutation();

  const [formData, setFormData] = useState({
    name: profileData?.customer?.name || "",
    email: profileData?.customer?.email || "",
  });

  const [selectedImage, setSelectedImage] = useState<File | null>(null);

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleImageSelect = (file: File | null) => {
    setSelectedImage(file);
  };

  const handleSubmit = async () => {
    try {
      const payload: any = {
        name: formData.name,
        email: formData.email,
      };

      if (selectedImage) {
        payload.profileImage = selectedImage;
      }

      await updateUserProfile(payload).unwrap();
      toast.success("Profile updated successfully!");
    } catch (error: any) {
      toast.error(error?.data?.message || "Failed to update profile");
      console.error("Profile update error:", error);
    }
  };

  return (
    <>
      <div className="flex">
        <div className="w-1/4">
          <ProfileImage onImageSelect={handleImageSelect} />
        </div>
        <div className="w-3/4">
          <ProfileImage onImageSelect={handleImageSelect} />
          <div className="flex flex-col gap-4 md:gap-6 mt-6 md:mt-8 w-full">
            <InputField
              title="Name"
              type="text"
              placeholder="Enter name"
              initialValue={formData.name}
              onChange={(value) => handleChange("name", value)}
            />

            <InputField
              title="Email Address"
              type="email"
              placeholder="Enter email address"
              initialValue={formData.email}
              onChange={(value) => handleChange("email", value)}
            />
          </div>
          <div className="flex justify-start mt-6 md:mt-8 flex-col sm:flex-row gap-3 md:gap-4">
            <Button
              variant="primary"
              size="md"
              className="w-full sm:w-[150px]"
              onClick={handleSubmit}
              disabled={isLoading}
            >
              {isLoading ? "Updating..." : "Update"}
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}
