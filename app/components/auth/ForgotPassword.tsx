"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import InputField from "@/app/components/ui/InputField";
import Button from "@/app/components/ui/Button";
import AuthLogo from "./AuthLogo";
import AuthLoginDescription from "./AuthLoginDescription";
import { useForgotPasswordMutation } from "@/store/slice/authSlice";
import { config } from "@/lib/config";

// Helper function to decode JWT and extract role
const getRoleFromToken = (token: string): string | null => {
  try {
    const parts = token.split(".");
    if (parts.length !== 3) return null;

    const decoded = JSON.parse(atob(parts[1]));
    return decoded?.role || null;
  } catch (error) {
    console.error("Error decoding token:", error);
    return null;
  }
};

export default function ForgotPasswordPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [forgotPassword, { isLoading }] = useForgotPasswordMutation();

  // Redirect already logged-in users
  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      const role = getRoleFromToken(token);
      if (role === "PROFESSIONAL") {
        window.location.href = config.TRADE_PERSON_REDIRECT_URL;
      } else if (role === "CUSTOMER") {
        router.push("/");
      }
    }
  }, [router]);

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
