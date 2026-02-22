"use client";

import Image from "next/image";
import type { Lead } from "@/lib/trade-person/mock";
// import TradePersonBadge from "@/app/components/trade-person/TradePersonBadge";
// import { CheckCircle2, User, AlertCircle } from "lucide-react";
import { FrequentUserIcon, UrgentIcon, VerifyIcon } from "./Svg";
// import { useLeadPurchaseMutation } from "@/store/slice/leadSlice";
// import { useState } from "react";
import React from "react";
// import { toast } from "sonner";

type Props = {
  lead: Lead;
  selected?: boolean;
  onClick?: () => void;
};

function highlightIcon(h: Lead["highlights"][0]) {
  if (h === "Verified Phone") return <VerifyIcon />;
  if (h === "Frequent User") return <FrequentUserIcon />;
  return <UrgentIcon />;
}

function getResponseStatus(responsesCount: number): string {
  if (responsesCount === 0) return "1st to respond";
  if (responsesCount >= 3) return "3/3";
  return `${responsesCount}/3`;
}

function LeadCard({ lead, selected, onClick }: Props) {
  // const [purchaseLead, { isLoading: isPurchasing }] = useLeadPurchaseMutation();
  // const [isProcessing, setIsProcessing] = useState(false);
  const isLeadAvailable = lead.responsesCount < 3;

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if ((e.key === 'Enter' || e.key === ' ') && onClick) {
      e.preventDefault();
      onClick();
    }
  };

  // const handleCheckoutClick = async (e: React.MouseEvent<HTMLButtonElement>) => {
  //   e.preventDefault();
  //   e.stopPropagation();
  //   if (!isLeadAvailable || isPurchasing || isProcessing) return;

  //   try {
  //     setIsProcessing(true);
  //     const result = await purchaseLead(lead.id).unwrap() as { checkOutUrl: string | null; payment?: string };

  //     if (result.checkOutUrl) {
  //       // Navigate to Stripe checkout
  //       window.location.href = result.checkOutUrl;
  //     } else if (result.payment === "WALLET") {
  //       // Payment successful via wallet
  //       toast.success("Quick payment via your wallet");
  //       setIsProcessing(false);
  //       // Optionally refresh the page or update the lead status
  //     } else {
  //       toast.error("Failed to get checkout URL");
  //       setIsProcessing(false);
  //     }
  //   } catch (error) {
  //     console.error("Purchase error:", error);
  //     toast.error((error as { data?: { message?: string } })?.data?.message || "Failed to purchase lead. Please try again.");
  //     setIsProcessing(false);
  //   }
  // };

  return (
    <div className="overflow-hidden rounded-sm  bg-white shadow-sm cursor-pointer" >
      <div
        className={`w-full p-4 text-left transition ${selected ? "bg-white border-2 border-primary" : ""}`}
        onClick={onClick}
        onKeyDown={handleKeyDown}
        role="button"
        tabIndex={0}
      >
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-start gap-3">
            <div className="h-10 w-10 overflow-hidden rounded-full border border-slate-200">
              <Image
                src={lead.customerAvatar}
                alt={`${lead.customerName} avatar`}
                width={40}
                height={40}
                className="h-full w-full object-cover"
              />
            </div>
            <div>
              <div className="text-[13px] font-semibold text-primaryText">{lead.customerName}</div>
              <div className="text-[11px] text-slate-500">{lead.customerAddress}</div>
            </div>
          </div>
          <div className="text-[11px] text-slate-500">{lead.createdAtLabel}</div>
        </div>

        <div className="mt-3 rounded-lg bg-[#F7F9FB] px-3 py-3">
          <div className="text-[14px] font-semibold text-primaryText">{lead.title}</div>
          <div className="mt-1 text-[12px] text-slate-600">{lead.summary}</div>
          <div className="mt-1 text-[12px] text-slate-500">{lead.budgetLabel}</div>
        </div>

        {/* Highlights */}
        {lead.highlights.length > 0 && (
          <div className="mt-3 flex flex-col gap-2">
            {lead.highlights.map((h) => (
              <div key={h} className="flex items-center gap-1.5 text-sm font-semibold text-primaryText">
                {highlightIcon(h)}
                <span>{h}</span>
              </div>
            ))}
          </div>
        )}



        <div
          className={`flex w-full items-center justify-between bg-primary px-4 mt-4 py-5 text-left text-white transition pointer-events-none ${isLeadAvailable ? "hover:bg-slate-800" : "opacity-60"}`}
        >
          <div className="flex items-center gap-3">
            {/* three vertical lines icon */}
            <div className="flex  gap-[3px]">
              <span className="w-0.5 h-4 rounded-full bg-white" />
              <span className="w-0.5 h-4 rounded-full bg-white" />
              <span className="w-0.5 h-4 rounded-full bg-white" />
            </div>
            <div className="text-[12px] font-semibold">
              { isLeadAvailable
                  ? getResponseStatus(lead.responsesCount)
                  : "Lead not available"}
            </div>
          </div>

          <div className="text-[13px] font-semibold">{lead.priceLabel}</div>
        </div>
      </div>

      {/* Bottom checkout bar - similar to design */}
      {/* <button
        type="button"
        onClick={handleCheckoutClick}
        disabled={!isLeadAvailable || isPurchasing || isProcessing}
        className={`flex w-full items-center justify-between bg-primary px-4 py-5 text-left text-white transition ${isLeadAvailable && !isPurchasing && !isProcessing ? "hover:bg-slate-800 cursor-pointer" : "cursor-not-allowed opacity-60"}`}
      >
        <div className="flex items-center gap-3">
   
          <div className="flex  gap-[3px]">
            <span className="w-0.5 h-4 rounded-full bg-white" />
            <span className="w-0.5 h-4 rounded-full bg-white" />
            <span className="w-0.5 h-4 rounded-full bg-white" />
          </div>
          <div className="text-[12px] font-semibold">
            {isPurchasing || isProcessing
              ? "Processing..."
              : isLeadAvailable
                ? getResponseStatus(lead.responsesCount)
                : "Lead not available"}
          </div>
        </div>

        <div className="text-[13px] font-semibold">{lead.priceLabel}</div>
      </button> */}
    </div>
  );
}

// Memoize to prevent unnecessary re-renders when parent re-renders
export default React.memo(LeadCard);
