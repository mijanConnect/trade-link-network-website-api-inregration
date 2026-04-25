import LoginPage from "@/app/components/auth/Login";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Login - Trade Link Network",
  description:
    "Sign in to your Trade Link Network account. Access your profile, leads, and services.",
  openGraph: {
    title: "Login - Trade Link Network",
    description:
      "Sign in to your Trade Link Network account. Access your profile, leads, and services.",
    url: "https://www.tradelinknetwork.co.uk/login",
    type: "website",
    images: [
      {
        url: "https://www.tradelinknetwork.co.uk/assets/hero-2.webp",
        width: 1200,
        height: 630,
        alt: "Trade Link Network Login",
      },
    ],
  },
};

export default function Login() {
  return <LoginPage />;
}
