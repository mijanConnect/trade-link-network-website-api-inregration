"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import InputField from "@/app/components/ui/InputField";
import Button from "@/app/components/ui/Button";
import AuthLogo from "./AuthLogo";
import AuthLoginDescription from "./AuthLoginDescription";
import { useForgotPasswordMutation } from "@/store/slice/authSlice";

export default function ForgotPasswordPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [forgotPassword, { isLoading }] = useForgotPasswordMutation();

  const handleSendOTP = async () => {
    if (!email) {
      setError("Please enter your email");
      return;
    }

    setError("");

    try {
      await forgotPassword({ email }).unwrap();
      if (typeof window !== "undefined") {
        localStorage.setItem("resetEmail", email);
      }
      router.push("/verify-otp");
    } catch (err) {
      const apiError = err as { data?: { message?: string } };
      setError(apiError?.data?.message || "Failed to send OTP. Try again.");
    }
  };

  return (
    <div className="bg-background shadow-sm p-4 lg:p-8 rounded-lg w-full max-w-[525px] border border-gray-200">
      <AuthLogo />
      <AuthLoginDescription
        header="Forgot Password"
        description="Enter your email to send an OTP for verification"
      />
      {error && (
        <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded text-red-700 text-[14px]">
          {error}
        </div>
      )}
      <div className="w-full space-y-8">
        <InputField
          title="Email"
          type="email"
          placeholder="Enter your email"
          initialValue={email}
          onChange={(value) => {
            setEmail(value);
            setError("");
          }}
        />

        <Button
          fullWidth
          variant="primary"
          size="md"
          onClick={handleSendOTP}
          disabled={isLoading}
        >
          {isLoading ? "Sending..." : "Send OTP"}
        </Button>
      </div>
    </div>
  );
}
