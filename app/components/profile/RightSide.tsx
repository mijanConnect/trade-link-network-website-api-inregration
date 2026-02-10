"use client";

import { useState, useMemo } from "react";
import Button from "../ui/Button";
import ProfileImage from "./ProfileImage";
import InputField from "../ui/InputField";
import ChangePassword from "./ChangePassword";
import { toast } from "sonner";

import "react-phone-number-input/style.css";
import PhoneInput from "react-phone-number-input";
import {
  useProfileQuery,
  useUpdateUserProfileMutation,
} from "@/store/slice/authSlice";

export default function RightSide() {
  const [showChangePassword, setShowChangePassword] = useState(false);
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [formChanges, setFormChanges] = useState({
    name: "",
    email: "",
    phone: "",
  });

  const { data: profileData } = useProfileQuery({});
  const [updateUserProfile, { isLoading }] = useUpdateUserProfileMutation();

  // Compute display values - use changes if edited, otherwise use profile data
  const displayValues = useMemo(
    () => ({
      name: formChanges.name || profileData?.name || "",
      email: formChanges.email || profileData?.email || "",
      phone: formChanges.phone || profileData?.phone || "",
    }),
    [profileData, formChanges],
  );

  const handleInputChange = (field: string, value: string) => {
    setFormChanges((prev: { name: string; email: string; phone: string }) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSaveChanges = async () => {
    try {
      // Prepare payload with current display values (actual values from input fields)
      const payload: any = {
        name: displayValues.name,
        email: displayValues.email,
        phone: displayValues.phone,
      };

      // Add profileImage if selected
      if (selectedImage) {
        payload.profileImage = selectedImage;
      }

      // Validate required fields
      if (!payload.name || !payload.email) {
        toast.error("Name and Email are required");
        return;
      }

      console.log("Sending payload:", payload);

      // Call the API
      await updateUserProfile(payload).unwrap();

      // Clear form changes after successful save
      setFormChanges({
        name: "",
        email: "",
        phone: "",
      });

      // Clear selected image after successful save
      setSelectedImage(null);

      toast.success("Changes saved successfully!");
    } catch (error: any) {
      console.error("Profile update error:", error);
      toast.error(error?.data?.message || "Failed to save changes");
    }
  };

  return (
    <>
      <div>
        <ProfileImage onImageSelect={setSelectedImage} />
        <div className="mt-6 lg:mt-12 flex flex-col gap-4 min-w-full lg:min-w-[600px] max-w-[600px]">
          <InputField
            title="Name"
            type="text"
            placeholder="Enter name"
            initialValue={displayValues.name}
            onChange={(value) => handleInputChange("name", value)}
          />

          <div>
            <p className="mb-2">Phone Number</p>
            <PhoneInput
              international
              countryCallingCodeEditable={false}
              countries={["GB"]}
              defaultCountry="GB"
              value={displayValues.phone}
              onChange={(value) => handleInputChange("phone", value || "")}
              placeholder="Enter your phone number"
              className="phone-input-no-focus"
              style={{
                height: 58,
                border: "1px solid #1f2933",
                borderRadius: "6px",
                paddingLeft: "12px",
                fontSize: "16px",
                fontFamily: "inherit",
              }}
            />
          </div>

          <InputField
            title="Email Address"
            type="email"
            placeholder="Enter email address"
            initialValue={displayValues.email}
            onChange={(value) => handleInputChange("email", value)}
          />
        </div>
        <Button
          className="mt-6 lg:mt-8 w-full"
          onClick={handleSaveChanges}
          disabled={isLoading}
        >
          {isLoading ? "Saving..." : "Save Changes"}
        </Button>

        <div>
          <Button
            variant="outline"
            className="mt-6 lg:mt-8 w-[200px]"
            onClick={() => setShowChangePassword(!showChangePassword)}
          >
            {showChangePassword ? "Hide Password" : "Change Password"}
          </Button>
          {showChangePassword && <ChangePassword />}
        </div>
      </div>
    </>
  );
}
