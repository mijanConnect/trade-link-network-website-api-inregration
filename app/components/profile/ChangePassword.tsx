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
  const [passwordError, setPasswordError] = useState<string>("");

  const [changePassword, { isLoading }] = useChangePasswordMutation();

  const validatePassword = (pwd: string): string | null => {
    if (pwd.length < 8) {
      return "Password must be at least 8 characters long";
    }
    if (!/[A-Z]/.test(pwd)) {
      return "Password must include at least 1 uppercase letter";
    }
    if (!/[a-z]/.test(pwd)) {
      return "Password must include at least 1 lowercase letter";
    }
    if (!/[0-9]/.test(pwd)) {
      return "Password must include at least 1 number";
    }
    if (!/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(pwd)) {
      return "Password must include at least 1 special character";
    }
    return null;
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    setError(null);
    if (field === "newPassword") {
      const validation = validatePassword(value);
      setPasswordError(validation || "");
    }
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

    const passwordValidationError = validatePassword(formData.newPassword);
    if (passwordValidationError) {
      setError(passwordValidationError);
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

          <div>
            <InputField
              title="New Password"
              type="password"
              placeholder="Enter new password"
              initialValue={formData.newPassword}
              onChange={(value) => handleInputChange("newPassword", value)}
            />
            {passwordError && (
              <p className="text-red-600 text-[12px] mt-1">{passwordError}</p>
            )}
          </div>

          <div>
            <InputField
              title="Confirm Password"
              type="password"
              placeholder="Confirm new password"
              initialValue={formData.confirmPassword}
              onChange={(value) => handleInputChange("confirmPassword", value)}
            />
            {formData.newPassword &&
              formData.confirmPassword &&
              formData.newPassword === formData.confirmPassword && (
                <p className="text-green-600 text-[12px] mt-1">
                  Passwords match
                </p>
              )}
            {formData.newPassword &&
              formData.confirmPassword &&
              formData.newPassword !== formData.confirmPassword && (
                <p className="text-red-600 text-[12px] mt-1">
                  Passwords do not match
                </p>
              )}
          </div>
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
