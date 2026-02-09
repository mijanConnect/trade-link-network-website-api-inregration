"use client";

import { useState } from "react";
import InputField from "../ui/InputField";
import Button from "../ui/Button";
import { useChangePasswordMutation } from "@/store/slice/authSlice";
import { toast } from "sonner";

export default function ChangePassword() {
  const [formData, setFormData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [error, setError] = useState<string | null>(null);

  const [changePassword, { isLoading }] = useChangePasswordMutation();

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    setError(null);
  };

  const handleSaveChanges = async () => {
    // Validation
    if (
      !formData.currentPassword ||
      !formData.newPassword ||
      !formData.confirmPassword
    ) {
      setError("All fields are required");
      return;
    }

    if (formData.newPassword !== formData.confirmPassword) {
      setError("New password and confirm password do not match");
      return;
    }

    if (formData.newPassword.length < 6) {
      setError("New password must be at least 6 characters");
      return;
    }

    try {
      await changePassword({
        currentPassword: formData.currentPassword,
        newPassword: formData.newPassword,
        confirmPassword: formData.confirmPassword,
      }).unwrap();

      toast.success("Password changed successfully!");
      // Reset form
      setFormData({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      });
      setError(null);
    } catch (err: unknown) {
      const error = err as { data?: { message?: string } };
      const errorMessage = error?.data?.message || "Failed to change password";
      setError(errorMessage);
      toast.error(errorMessage);
    }
  };
  return (
    <>
      <div className="mt-6 lg:mt-8">
        <h3 className="text-[18px] text-primaryText font-bold">
          Change Password
        </h3>

        {error && <p className="text-red-500 text-[14px] mt-3 mb-3">{error}</p>}

        <div className="mt-4 flex flex-col gap-4 min-w-full lg:min-w-[600px] max-w-[600px]">
          <InputField
            title="Current Password"
            type="password"
            placeholder="Enter current password"
            initialValue={formData.currentPassword}
            onChange={(value) => handleInputChange("currentPassword", value)}
          />

          <InputField
            title="New Password"
            type="password"
            placeholder="Enter new password"
            initialValue={formData.newPassword}
            onChange={(value) => handleInputChange("newPassword", value)}
          />

          <InputField
            title="Confirm Password"
            type="password"
            placeholder="Confirm new password"
            initialValue={formData.confirmPassword}
            onChange={(value) => handleInputChange("confirmPassword", value)}
          />
        </div>

        <Button
          className="mt-6 lg:mt-8 w-full"
          onClick={handleSaveChanges}
          disabled={isLoading}
        >
          {isLoading ? "Saving..." : "Save Changes"}
        </Button>
      </div>
    </>
  );
}
