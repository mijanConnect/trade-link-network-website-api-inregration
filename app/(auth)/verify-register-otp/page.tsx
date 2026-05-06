import VerifyRegisterOTPPage from "@/app/components/auth/VerifyRegisterOTP";
import type { Metadata } from "next";

export const metadata: Metadata = {
  metadataBase: new URL("https://www.tradelinknetwork.co.uk"),
  alternates: {
    canonical: "https://www.tradelinknetwork.co.uk/verify-register-otp",
  },
  title: "Verify Registration OTP - Trade Link Network",
  description:
    "Verify your OTP to complete your Trade Link Network registration.",
  robots: { index: false, follow: false },
};

export default function Page() {
  return (
    <>
      <VerifyRegisterOTPPage />
    </>
  );
}
