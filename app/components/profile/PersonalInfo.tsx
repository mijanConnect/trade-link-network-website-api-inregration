"use client";

import InputField from "../ui/InputField";
import Button from "../ui/Button";
import ProfileImage from "./ProfileImage";
import { useState } from "react";

export default function PersonalInfo() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    birthDate: "",
    phone: "",
    gender: "",
    street: "",
    postalCode: "",
    country: "",
    city: "",
  });

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <>
      <div className="flex">
        <div className="w-1/4">
          <ProfileImage />
        </div>
        <div className="w-3/4">
          <ProfileImage />
          <div className="flex flex-col gap-4 md:gap-6 mt-6 md:mt-8 w-full">
            <InputField
              title="Name"
              type="text"
              placeholder="Enter name"
              initialValue={formData.firstName}
              onChange={(value) => handleChange("firstName", value)}
            />

            <InputField
              title="Phone Number"
              type="tel"
              placeholder="Enter phone number"
              initialValue={formData.phone}
              onChange={(value) => handleChange("phone", value)}
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
            <Button variant="primary" size="md" className="w-full sm:w-[150px]">
              Update
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}
