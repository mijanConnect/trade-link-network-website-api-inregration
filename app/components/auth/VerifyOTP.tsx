"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Button from "@/app/components/ui/Button";
import AuthLogo from "./AuthLogo";
import AuthLoginDescription from "./AuthLoginDescription";
import {
  useForgotPasswordMutation,
  useVerifyEmailMutation,
} from "@/store/slice/authSlice";

export default function VerifyOTPPage() {
  const router = useRouter();
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [isLoading, setIsLoading] = useState(false);
  const [resendTimer, setResendTimer] = useState(60);
  const [error, setError] = useState("");
  const [verifyEmail] = useVerifyEmailMutation();
  const [forgotPassword] = useForgotPasswordMutation();

  const handleOtpChange = (index: number, value: string) => {
    const numericValue = value.replace(/\D/g, "");
    if (numericValue.length <= 1) {
      const newOtp = [...otp];
      newOtp[index] = numericValue;
      setOtp(newOtp);

      // Auto-focus next input
      if (numericValue && index < 5) {
        const nextInput = document.getElementById(`otp-${index + 1}`);
        nextInput?.focus();
      }
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      const prevInput = document.getElementById(`otp-${index - 1}`);
      prevInput?.focus();
    }
  };

  const handleVerifyOTP = async () => {
    const otpString = otp.join("");
    if (!otpString || otpString.length < 6) {
      setError("Please enter the 6-digit code");
      return;
    }

    setIsLoading(true);
    setError("");
    try {
      const email =
        typeof window !== "undefined" ? localStorage.getItem("resetEmail") : "";

      if (!email) {
        setError("Email not found. Please request a new code.");
        return;
      }

      const result = await verifyEmail({
        email,
        oneTimeCode: Number(otpString),
      }).unwrap();

      const resultAny = result as
        | string
        | { resetToken?: string; data?: { data?: string } | string }
        | null;

      const resetToken =
        typeof resultAny === "string"
          ? resultAny
          : (resultAny?.resetToken ??
            (typeof resultAny?.data === "string"
              ? resultAny?.data
              : resultAny?.data?.data));

      if (!resetToken) {
        setError("Reset token missing. Please request a new code.");
        return;
      }

      if (typeof window !== "undefined") {
        localStorage.setItem("resetToken", resetToken);
      }

      // After OTP is verified, navigate to update-password page
      router.push("/update-password");
    } catch (error) {
      const apiError = error as { data?: { message?: string } };
      setError(apiError?.data?.message || "OTP verification failed.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleResendOTP = async () => {
    const email =
      typeof window !== "undefined" ? localStorage.getItem("resetEmail") : "";

    if (!email) {
      setError("Email not found. Please request a new code.");
      return;
    }

    setError("");
    try {
      await forgotPassword({ email }).unwrap();
      setOtp(["", "", "", "", "", ""]);
      setResendTimer(60);
    } catch (err) {
      const apiError = err as { data?: { message?: string } };
      setError(apiError?.data?.message || "Failed to resend code.");
    }
  };

  useEffect(() => {
    if (resendTimer <= 0) return;

    const interval = setInterval(() => {
      setResendTimer((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [resendTimer]);

  return (
    <div className="bg-background shadow-sm p-4 lg:p-8 rounded-lg w-full max-w-[525px] border border-gray-200">
      <AuthLogo />
      <AuthLoginDescription
        header="Verify OTP"
        description="Enter the code sent to your email"
      />
      {error && (
        <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded text-red-700 text-[14px]">
          {error}
        </div>
      )}
      <div className="w-full">
        <div className="flex flex-col items-center gap-4">
          <p>Enter Code</p>
          <div className="flex gap-3 justify-center">
            {otp.map((digit, index) => (
              <input
                key={index}
                id={`otp-${index}`}
                type="text"
                maxLength={1}
                value={digit}
                onChange={(e) => handleOtpChange(index, e.target.value)}
                onKeyDown={(e) => handleKeyDown(index, e)}
                placeholder="-"
                className="w-12 h-12 text-center text-lg font-semibold border border-gray-300 rounded-lg focus:border-primary focus:outline-none"
              />
            ))}
          </div>
        </div>

        <div className="text-center mb-8">
          <p className="text-[15px] text-primaryParagraph">
            <button
              onClick={handleResendOTP}
              disabled={resendTimer > 0}
              className={`font-semibold hover:underline mt-4 ${
                resendTimer > 0
                  ? "text-gray-400 cursor-not-allowed"
                  : "text-primary hover:underline"
              }`}
            >
              Resend code in{" "}
              {String(Math.floor(resendTimer / 60)).padStart(2, "0")}:{" "}
              {String(resendTimer % 60).padStart(2, "0")}
            </button>
          </p>
        </div>

        <Button
          fullWidth
          variant="primary"
          size="md"
          onClick={handleVerifyOTP}
          disabled={isLoading || otp.join("").length < 6}
        >
          {isLoading ? "Verifying..." : "Verify OTP"}
        </Button>
      </div>
    </div>
  );
}
