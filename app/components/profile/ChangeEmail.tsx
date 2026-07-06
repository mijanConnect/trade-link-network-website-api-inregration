"use client";

import { useState, useEffect } from "react";
import InputField from "../ui/InputField";
import Button from "../ui/Button";
import { toast } from "sonner";
import {
  useRequestEmailChangeMutation,
  useVerifyEmailChangeOtpMutation,
  useResendEmailChangeOtpMutation,
} from "@/store/slice/authSlice";

export default function ChangeEmail({ currentEmail }: { currentEmail: string }) {
  const [step, setStep] = useState<"request" | "verify">("request");
  const [newEmail, setNewEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [timeLeft, setTimeLeft] = useState(0);
  
  const [requestEmailChange, { isLoading: isRequesting }] = useRequestEmailChangeMutation();
  const [verifyOtp, { isLoading: isVerifying }] = useVerifyEmailChangeOtpMutation();
  const [resendOtp, { isLoading: isResending }] = useResendEmailChangeOtpMutation();

  useEffect(() => {
    if (timeLeft <= 0) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft]);

  const handleRequestOTP = async () => {
    if (!newEmail) {
      toast.error("Please enter a new email address");
      return;
    }
    if (newEmail === currentEmail) {
      toast.error("New email cannot be the same as current email");
      return;
    }

    try {
      await requestEmailChange({ newEmail }).unwrap();
      toast.success("OTP sent to your new email address");
      setStep("verify");
      setTimeLeft(60);
    } catch (err: any) {
      toast.error(err?.data?.message || "Failed to request email change");
    }
  };

  const handleVerifyOTP = async () => {
    if (!otp) {
      toast.error("Please enter the OTP");
      return;
    }

    try {
      await verifyOtp({ otp }).unwrap();
      toast.success("Email changed successfully!");
      setStep("request");
      setNewEmail("");
      setOtp("");
      setTimeLeft(0);
    } catch (err: any) {
      toast.error(err?.data?.message || "Invalid OTP");
    }
  };

  const handleResendOTP = async () => {
    try {
      await resendOtp({ newEmail }).unwrap();
      toast.success("OTP resent successfully!");
      setTimeLeft(60);
    } catch (err: any) {
      toast.error(err?.data?.message || "Failed to resend OTP");
    }
  };

  return (
    <div className="mt-6 lg:mt-8">
      <h3 className="text-[18px] text-primaryText font-bold mb-4">
        Change Email
      </h3>

      <div className="flex flex-col gap-4 min-w-full lg:min-w-[600px] max-w-[600px]">
        <InputField
          title="New Email Address"
          type="email"
          placeholder="Enter new email address"
          initialValue={newEmail}
          onChange={(value) => setNewEmail(value)}
        />
        <Button
          className="mt-4 w-full"
          onClick={handleRequestOTP}
          disabled={isRequesting}
        >
          {isRequesting ? "Sending OTP..." : "Send OTP"}
        </Button>
      </div>

      {step === "verify" && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-transparent backdrop-blur-xs bg-opacity-50 px-4">
          <div className="bg-white rounded-lg p-6 lg:p-8 w-full max-w-md relative">
            <h3 className="text-[20px] font-bold text-primaryText mb-4">
              Verify OTP
            </h3>
            <p className="text-[14px] text-gray-600 mb-6">
              Please enter the OTP sent to <strong>{newEmail}</strong>
            </p>
            
            <InputField
              title="Enter OTP"
              type="text"
              placeholder="Enter 6-digit OTP"
              initialValue={otp}
              onChange={(value) => setOtp(value)}
            />
            
            <div className="flex flex-col gap-3 mt-6">
              <Button
                className="w-full"
                onClick={handleVerifyOTP}
                disabled={isVerifying}
              >
                {isVerifying ? "Verifying..." : "Verify OTP"}
              </Button>
              <Button
                variant="outline"
                className="w-full"
                onClick={handleResendOTP}
                disabled={isResending || timeLeft > 0}
              >
                {timeLeft > 0 
                  ? `Resend OTP in ${timeLeft}s` 
                  : isResending 
                    ? "Resending..." 
                    : "Resend OTP"}
              </Button>
            </div>
            
            <button
              onClick={() => setStep("request")}
              className="text-primary text-[14px] underline mt-4 text-center block w-full"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
