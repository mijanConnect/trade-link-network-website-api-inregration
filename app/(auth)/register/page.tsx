import RegisterPage from "@/app/components/auth/Register";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Professional Register - Trade Link Network",
  description:
    "Create a new Trade Link Network account. Join thousands of homeowners and trade professionals connecting across the UK.",
  openGraph: {
    title: "Professional Register - Trade Link Network",
    description:
      "Create a new Trade Link Network account. Join thousands of homeowners and trade professionals connecting across the UK.",
    url: "https://www.tradelinknetwork.co.uk/register",
    type: "website",
    images: [
      {
        url: "https://www.tradelinknetwork.co.uk/assets/hero-2.webp",
        width: 1200,
        height: 630,
        alt: "Trade Link Network Professional Register",
      },
    ],
  },
};

export default function Register() {
  return <RegisterPage />;
}
