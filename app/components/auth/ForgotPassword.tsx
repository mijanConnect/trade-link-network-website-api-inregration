"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import InputField from "@/app/components/ui/InputField";
import Button from "@/app/components/ui/Button";
import AuthLogo from "./AuthLogo";
import AuthLoginDescription from "./AuthLoginDescription";

export default function ForgotPasswordPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");

  const handleSendOTP = () => {
    // Handle send OTP logic here
    console.log("Sending OTP to:", email);
    // After OTP is sent, navigate to verify-otp page
    router.push("/verify-otp");
  };

  return (
    <div className="bg-background shadow-sm p-4 lg:p-8 rounded-lg w-full max-w-[525px] border border-gray-200">
      <AuthLogo />
      <AuthLoginDescription
        header="Forgot Password"
        description="Enter your email to send an OTP for verification"
      />
      <div className="w-full space-y-8">
        <InputField
          title="Email"
          type="email"
          placeholder="Enter your email"
          initialValue={email}
          onChange={(value) => setEmail(value)}
        />

        <Button fullWidth variant="primary" size="md" onClick={handleSendOTP}>
          Send OTP
        </Button>
      </div>
    </div>
  );
}
