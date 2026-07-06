"use client";

import { useState, useMemo } from "react";
import Button from "../ui/Button";
import ProfileImage from "./ProfileImage";
import InputField from "../ui/InputField";
import ChangePassword from "./ChangePassword";
import ChangeEmail from "./ChangeEmail";
import ChangePhone from "./ChangePhone";
import { toast } from "sonner";

import "react-phone-number-input/style.css";
import PhoneInput from "react-phone-number-input";
import {
  useProfileQuery,
  useUpdateUserProfileMutation,
} from "@/store/slice/authSlice";

type FormState = {
  name: string;
  email: string;
  phone: string;
  address: string;
};

type UpdateProfilePayload = FormState & {
  profileImage?: File;
};

export default function RightSide() {
  const [showChangePassword, setShowChangePassword] = useState(false);
  const [showChangeEmail, setShowChangeEmail] = useState(false);
  const [showChangePhone, setShowChangePhone] = useState(false);
  const [selectedImage, setSelectedImage] = useState<File | null>(null);

  const [formChanges, setFormChanges] = useState<FormState>({
    name: "",
    email: "",
    phone: "",
    address: "",
  });

  const { data: profileData } = useProfileQuery({});
  const [updateUserProfile, { isLoading }] = useUpdateUserProfileMutation();

  // ✅ FIXED: address comes from customer object
  const displayValues = useMemo(
    () => ({
      name: formChanges.name || profileData?.name || "",
      email: formChanges.email || profileData?.email || "",
      phone: formChanges.phone || profileData?.phone || "",
      address: formChanges.address || profileData?.customer?.address || "",
    }),
    [profileData, formChanges]
  );

  const handleInputChange = (field: keyof FormState, value: string) => {
    setFormChanges((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSaveChanges = async () => {
    try {
      const payload: UpdateProfilePayload = {
        name: formChanges.name || profileData?.name || "",
        email: formChanges.email || profileData?.email || "",
        phone: formChanges.phone || profileData?.phone || "",
        address: formChanges.address || profileData?.customer?.address || "",
      };

      if (selectedImage) {
        payload.profileImage = selectedImage;
      }

      if (!payload.name || !payload.email || !payload.phone) {
        toast.error("Name, Email, and Phone are required");
        return;
      }

      await updateUserProfile(payload).unwrap();

      setFormChanges({
        name: "",
        email: "",
        phone: "",
        address: "",
      });

      setSelectedImage(null);

      toast.success("Changes saved successfully!");
    } catch (error: any) {
      console.error(error);
      toast.error(error?.data?.message || "Failed to save changes");
    }
  };

  return (
    <div>
      <ProfileImage onImageSelect={setSelectedImage} />

      <div className="mt-6 lg:mt-12 flex flex-col gap-4 min-w-full lg:min-w-[600px] max-w-[650px]">
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
            value={displayValues.phone || ""}
            onChange={(value) => handleInputChange("phone", value ?? "")}
            placeholder="Enter your phone number"
            className="phone-input-no-focus disabled:cursor-not-allowed [&_input]:disabled:cursor-not-allowed"
            disabled
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
          disabled
        />

        <InputField
          title="Address"
          type="text"
          placeholder="Enter address"
          initialValue={displayValues.address}
          onChange={(value) => handleInputChange("address", value)}
        />
      </div>

      <Button
        className="mt-6 lg:mt-8 w-full"
        onClick={handleSaveChanges}
        disabled={isLoading}
      >
        {isLoading ? "Saving..." : "Save Changes"}
      </Button>

      <div className="flex flex-wrap gap-4 mt-6 lg:mt-8">
        <Button
          variant="outline"
          className="w-[200px]"
          onClick={() => {
            setShowChangePassword(!showChangePassword);
            setShowChangeEmail(false);
            setShowChangePhone(false);
          }}
        >
          {showChangePassword ? "Hide Password" : "Change Password"}
        </Button>

        <Button
          variant="outline"
          className="w-[200px]"
          onClick={() => {
            setShowChangeEmail(!showChangeEmail);
            setShowChangePassword(false);
            setShowChangePhone(false);
          }}
        >
          {showChangeEmail ? "Hide Email Change" : "Change Email"}
        </Button>

        <Button
          variant="outline"
          className="w-[200px]"
          onClick={() => {
            setShowChangePhone(!showChangePhone);
            setShowChangePassword(false);
            setShowChangeEmail(false);
          }}
        >
          {showChangePhone ? "Hide Phone Change" : "Change Phone"}
        </Button>
      </div>

      {showChangePassword && <ChangePassword />}
      {showChangeEmail && <ChangeEmail currentEmail={displayValues.email} />}
      {showChangePhone && <ChangePhone currentPhone={displayValues.phone} />}
    </div>
  );
}