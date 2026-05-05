import ProfessionalRefister from "@/app/components/auth/ProfessionalRegister";
import type { Metadata } from "next";

export const metadata: Metadata = {
  metadataBase: new URL("https://www.tradelinknetwork.co.uk"),
  alternates: {
    canonical: "https://www.tradelinknetwork.co.uk/professional-register",
  },
  title: "Professional Register - Trade Link Network",
  description:
    "Register as a trade professional on Trade Link Network. Start getting leads and growing your business today.",
  openGraph: {
    title: "Professional Register - Trade Link Network",
    description:
      "Register as a trade professional on Trade Link Network. Start getting leads and growing your business today.",
    url: "https://www.tradelinknetwork.co.uk/professional-register",
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

export default function Page() {
  return (
    <>
      <ProfessionalRefister />
    </>
  );
}
