"use client";

import { useState } from "react";
import Button from "../ui/Button";
import ProfileImage from "./ProfileImage";
import InputField from "../ui/InputField";
import ChangePassword from "./ChangePassword";

import "react-phone-number-input/style.css";
import PhoneInput from "react-phone-number-input";

export default function RightSide() {
  const [showChangePassword, setShowChangePassword] = useState(false);
  const [phoneValue, setPhoneValue] = useState<string | undefined>("");

  return (
    <>
      <div>
        <ProfileImage />

        <div className="mt-6 lg:mt-12 flex flex-col gap-4 min-w-full lg:min-w-[600px] max-w-[600px]">
          <InputField
            title="Name"
            type="text"
            placeholder="Enter name"
            // initialValue={formData.firstName}
            // onChange={(value) => handleChange("firstName", value)}
          />

          <p>Phone Number</p>
          <PhoneInput
            international
            countryCallingCodeEditable={false}
            countries={["GB"]}
            defaultCountry="GB"
            value={phoneValue}
            onChange={setPhoneValue}
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

          <InputField
            title="Email Address"
            type="email"
            placeholder="Enter email address"
            // initialValue={formData.email}
            // onChange={(value) => handleChange("email", value)}
          />
        </div>
        {showChangePassword && <ChangePassword />}
        <Button
          variant="outline"
          className="mt-6 lg:mt-8 w-[200px]"
          onClick={() => setShowChangePassword(!showChangePassword)}
        >
          {showChangePassword ? "Hide Password" : "Change Password"}
        </Button>
        <Button className="mt-6 lg:mt-8 w-[200px]">Save Changes</Button>
      </div>
    </>
  );
}
