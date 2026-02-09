"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import InputField from "@/app/components/ui/InputField";
import Button from "@/app/components/ui/Button";
import AuthLoginDescription from "./AuthLoginDescription";
import AuthLogo from "./AuthLogo";
import { useResetPasswordMutation } from "@/store/slice/authSlice";

export default function UpdatePasswordPage() {
  const router = useRouter();
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [resetPassword] = useResetPasswordMutation();

  const handleUpdatePassword = async () => {
    if (!newPassword || !confirmPassword) {
      setError("Please fill in all fields");
      return;
    }

    if (newPassword.length < 8) {
      setError("Password must be at least 8 characters long");
      return;
    }

    if (newPassword !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    setIsLoading(true);
    setError("");

    try {
      const resetToken =
        typeof window !== "undefined" ? localStorage.getItem("resetToken") : "";

      if (!resetToken) {
        setError("Reset token not found. Please request a new code.");
        return;
      }

      console.log(
        "Resetting password with token:",
        resetToken.substring(0, 20) + "...",
      );

      await resetPassword({
        newPassword,
        confirmPassword,
        resetToken,
      }).unwrap();

      if (typeof window !== "undefined") {
        localStorage.removeItem("resetToken");
        localStorage.removeItem("resetEmail");
      }

      // After password is updated, navigate to success page
      router.push("/login");
    } catch (error) {
      const apiError = error as { data?: { message?: string } };
      setError(apiError?.data?.message || "Failed to update password.");
    } finally {
      setIsLoading(false);
    }
  };

  const passwordsMatch =
    newPassword && confirmPassword && newPassword === confirmPassword;
  const passwordMismatch =
    newPassword && confirmPassword && newPassword !== confirmPassword;

  return (
    <div className="bg-background shadow-sm p-4 lg:p-8 rounded-lg w-full max-w-[525px] border border-gray-200">
      <AuthLogo />
      <AuthLoginDescription
        header="Forgot Password"
        description="Update your password below"
      />
      {error && (
        <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded text-red-700 text-[14px]">
          {error}
        </div>
      )}
      <div className="w-full space-y-4">
        <InputField
          title="New Password"
          type="password"
          placeholder="Enter your new password"
          initialValue={newPassword}
          onChange={(value) => {
            setNewPassword(value);
            setError("");
          }}
        />

        <div>
          <InputField
            title="Confirm Password"
            type="password"
            placeholder="Confirm your new password"
            initialValue={confirmPassword}
            onChange={(value) => {
              setConfirmPassword(value);
              setError("");
            }}
          />
          {passwordMismatch && (
            <p className="text-red-600 text-[12px] mt-1">
              Passwords do not match
            </p>
          )}
          {passwordsMatch && (
            <p className="text-green-600 text-[12px] mt-1">Passwords match</p>
          )}
        </div>
      </div>
      <div className="mt-8">
        <Button
          fullWidth
          variant="primary"
          size="md"
          onClick={handleUpdatePassword}
          disabled={isLoading}
        >
          {isLoading ? "Updating..." : "Update Password"}
        </Button>
      </div>
    </div>
  );
}
