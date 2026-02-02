"use client";

import React from "react";
import InputField from "../ui/InputField";

export default function ChangePassword() {
  return (
    <>
      <div className="mt-6 lg:mt-12">
        <h3 className="text-[18px] text-primaryText font-bold">
          Change Password
        </h3>
        <div className="mt-4 flex flex-col gap-4 min-w-full lg:min-w-[600px] max-w-[600px]">
          <InputField
            title="Current Password"
            type="password"
            placeholder="Enter current password"
          />

          <InputField
            title="New Password"
            type="password"
            placeholder="Enter new password"
          />

          <InputField
            title="Confirm Password"
            type="password"
            placeholder="Confirm new password"
          />
        </div>
      </div>
    </>
  );
}
