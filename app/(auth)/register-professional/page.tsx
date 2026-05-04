import ProfessionalRegisterConsolidated from "@/app/components/auth/ProfessionalRegisterConsolidated";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Professional Register - Trade Link Network",
  description:
    "Create a new Trade Link Network professional account. Register with all your business information in one step.",
  openGraph: {
    title: "Professional Register - Trade Link Network",
    description:
      "Create a new Trade Link Network professional account. Register with all your business information in one step.",
    url: "https://www.tradelinknetwork.co.uk/register-professional",
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

export default function RegisterProfessional() {
  return <ProfessionalRegisterConsolidated />;
}
