import VerifyOTPPage from "@/app/components/auth/VerifyOTP";
import type { Metadata } from "next";

export const metadata: Metadata = {
  metadataBase: new URL("https://www.tradelinknetwork.co.uk"),
  alternates: {
    canonical: "https://www.tradelinknetwork.co.uk/verify-otp",
  },
  title: "Verify OTP - Trade Link Network",
  description:
    "Verify your OTP to complete the authentication process on Trade Link Network.",
  robots: { index: false, follow: false },
};

export default function VerifyOTP() {
  return <VerifyOTPPage />;
}
