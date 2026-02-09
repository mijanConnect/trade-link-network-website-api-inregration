"use client";

import { useState, useMemo } from "react";
import Button from "../ui/Button";
import ProfileImage from "./ProfileImage";
import InputField from "../ui/InputField";
import ChangePassword from "./ChangePassword";
import { toast } from "sonner";

import "react-phone-number-input/style.css";
import PhoneInput from "react-phone-number-input";
import { useProfileQuery } from "@/store/slice/authSlice";

export default function RightSide() {
  const [showChangePassword, setShowChangePassword] = useState(false);
  const [formChanges, setFormChanges] = useState({
    name: "",
    email: "",
    phone: "",
  });

  const { data: profileData } = useProfileQuery({});

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
    // TODO: Add API call to update profile
    toast.success("Changes saved successfully!");
  };

  return (
    <>
      <div>
        <ProfileImage />
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
        <Button className="mt-6 lg:mt-8 w-full" onClick={handleSaveChanges}>
          Save Changes
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
