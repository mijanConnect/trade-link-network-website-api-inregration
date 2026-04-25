import UpdatePasswordPage from "@/app/components/auth/UpdatePassword";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Update Password - Trade Link Network",
  description:
    "Update your Trade Link Network account password. Secure your account with a new password.",
  openGraph: {
    title: "Update Password - Trade Link Network",
    description:
      "Update your Trade Link Network account password. Secure your account with a new password.",
    url: "https://www.tradelinknetwork.co.uk/update-password",
    type: "website",
    images: [
      {
        url: "https://www.tradelinknetwork.co.uk/assets/hero-2.webp",
        width: 1200,
        height: 630,
        alt: "Trade Link Network Update Password",
      },
    ],
  },
};

export default function UpdatePassword() {
  return <UpdatePasswordPage />;
}
