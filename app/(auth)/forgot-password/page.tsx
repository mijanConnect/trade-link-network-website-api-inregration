import ForgotPasswordComponent from "@/app/components/auth/ForgotPassword";
import React from "react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Forgot Password - Trade Link Network",
  description:
    "Reset your Trade Link Network password. Enter your email to receive password reset instructions.",
  openGraph: {
    title: "Forgot Password - Trade Link Network",
    description:
      "Reset your Trade Link Network password. Enter your email to receive password reset instructions.",
    url: "https://www.tradelinknetwork.co.uk/forgot-password",
    type: "website",
    images: [
      {
        url: "https://www.tradelinknetwork.co.uk/assets/hero-2.webp",
        width: 1200,
        height: 630,
        alt: "Trade Link Network Forgot Password",
      },
    ],
  },
};

export default function ForgotPassword() {
  return <ForgotPasswordComponent />;
}
