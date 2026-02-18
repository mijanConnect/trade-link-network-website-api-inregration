import type { Metadata } from "next";
import type { ReactNode } from "react";
import TradePersonHeader from "@/app/components/trade-person/TradePersonHeader";
import Footer from "../components/Footer";
import ProfileCheckModal from "@/app/components/trade-person/ProfileCheckModal";

export const metadata: Metadata = {
  title: "Tradeperson Dashboard | TradeLink Network",
  description:
    "Manage leads, responses, and your trade profile on TradeLink Network.",
  robots: { index: false, follow: false },
};

export default function TradePersonLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-[#F7F9FB]">
      <ProfileCheckModal />
      <div className=" ">
        <TradePersonHeader />
        <div className="mt-">{children}</div>
        <Footer />
      </div>
    </div>
  );
}
