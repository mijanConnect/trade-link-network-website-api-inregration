"use client";

import Image from "next/image";
import Button from "@/app/components/ui/Button";
import TradePersonPanel from "@/app/components/trade-person/TradePersonPanel";
import TradePersonBadge from "@/app/components/trade-person/TradePersonBadge";
import type { Lead } from "@/lib/trade-person/mock";
// import { CheckCircle2, User, AlertCircle, VerifiedIcon } from "lucide-react";
import { FrequentUserIcon, UrgentIcon, VerifyIcon } from "./Svg";

type Props = {
  lead: Lead | null;
  source?: "leads" | "my-responses"; // "leads" = locked view with masked data, "my-responses" = unlocked view with full data
  tab?: "pending" | "hired"; // Tab from my-responses page to determine which banner to show
};

function highlightIcon(h: Lead["highlights"][0]) {
  if (h === "Verified Phone") return <VerifyIcon />;
  if (h === "Frequent User") return <FrequentUserIcon />;
  return <UrgentIcon />;
}

function statusBanner(status: Lead["status"], source?: "leads" | "my-responses", tab?: "pending" | "hired") {
  // When viewing from my-responses page, prioritize tab over lead status
  if (source === "my-responses") {
    if (tab === "pending") {
      return (
        <div className="mb-4 rounded-sm bg-[#F4A2611A] px-4 py-3">
          <div className="text-[14px] font-medium text-black">
            You`ve successfully unlocked this customer request.
          </div>
          <div className="mt-2">
            <span className="text-[14px] text-amber-700">Request Status</span>
            <div className="mt-1 bg-[#F4A261] text-white px-2 py-2 rounded-md w-28 text-center">
             Pending
            </div>
          </div>
        </div>
      );
    }
    if (tab === "hired") {
      return (
        <div className="mb-4 rounded-sm bg-[#3E6B5B1A] px-4 py-3">
          <div className="text-[14px] font-medium text-black">
            Congratulations! A customer has hired you for their request.
          </div>
          <div className="mt-2">
            <span className="text-[14px] text-[#34C759]">Service Status</span>
            <div className="mt-1">
              <button   className="text-[14px] bg-[#34C759] py-3 px-6 rounded-md text-white">
                Mark as Complete
              </button>
            </div>
          </div>
        </div>
      );
    }
  }

  // Fallback to lead status for leads page or when tab is not provided
  if (status === "unlocked") {
    return (
      <div className="mb-4 rounded-lg bg-amber-50 px-4 py-3">
        <div className="text-[13px] font-medium text-amber-900">
          You`ve successfully unlocked this customer request.
        </div>
        <div className="mt-2">
          <span className="text-[12px] text-amber-700">Request Status</span>
          <div className="mt-1">
            <TradePersonBadge label="Pending" tone="warning" />
          </div>
        </div>
      </div>
    );
  }
  if (status === "hired") {
    return (
      <div className="mb-4 rounded-lg bg-emerald-50 px-4 py-3">
        <div className="text-[13px] font-medium text-emerald-900">
          Congratulations! A customer has hired you for their request.
        </div>
        <div className="mt-2">
          <span className="text-[12px] text-emerald-700">Service Status</span>
          <div className="mt-1">
            <Button variant="primary" size="sm" className="text-[12px]">
              Mark as Complete
            </Button>
          </div>
        </div>
      </div>
    );
  }
  if (status === "completed") {
    return (
      <div className="mb-4 rounded-lg bg-emerald-50 px-4 py-3">
        <div className="text-[13px] font-medium text-emerald-900">
          The service has been marked as completed successfully
        </div>
        <div className="mt-2">
          <Button variant="primary" size="sm" className="text-[12px] bg-emerald-600 hover:bg-emerald-700">
            Completed
          </Button>
        </div>
      </div>
    );
  }
  return null;
}

export default function LeadDetailPanel({ lead, source = "leads", tab }: Props) {
  if (!lead) {
    return (
      <div className="flex h-[600px] items-center justify-center rounded-lg border border-slate-200 bg-white">
        <p className="text-slate-500">Select a lead to view details</p>
      </div>
    );
  }

  const isUnlocked = source === "my-responses";
  const showUnlockButton = source === "leads" && lead.status === "locked";
  
  // Mock phone and email - in real app, these would come from the lead data
  const fullPhone = "+44 789 123 4567";
  const fullEmail = "example.customer21@gmail.com";
  const maskedPhone = "+44 789 *** *** 24";
  const maskedEmail = "example*****21@gmail.com";

  const displayPhone = isUnlocked ? fullPhone : maskedPhone;
  const displayEmail = isUnlocked ? fullEmail : maskedEmail;

  return (
    <div className="space-y-4 bg-background">
      {statusBanner(lead.status, source, tab)}

      <TradePersonPanel title="Profile information  " >
        <div className="space-y-4 ">
          <div className="flex items-start gap-3">
            <div className="h-12 w-12 overflow-hidden rounded-full border border-slate-200">
              <Image
                src={lead.customerAvatar}
                alt={`${lead.customerName} avatar`}
                width={48}
                height={48}
                className="h-full w-full object-cover"
              />
            </div>
            <div>
              <div className="text-[14px] font-semibold text-primaryText">
                {lead.customerName}
              </div>
              <div className="text-[12px] text-slate-600">{lead.customerAddress}</div>
            </div>
          </div>

          <div className="space-y-2 text-[13px]">
            <div className="flex items-center gap-2">
              <span className="text-slate-600">Phone:</span>
              <span className="font-medium text-primaryText">{displayPhone}</span>
              <TradePersonBadge label="Verified" tone="success" />
            </div>
            <div className="flex items-center gap-2">
              <span className="text-slate-600">Email:</span>
              <span className="font-medium text-primaryText">{displayEmail}</span>
            </div>
            <div className="flex items-center gap-2 text-slate-600">
              <span>{lead.responsesCount} Tradepeople have responded</span>
            </div>
          </div>

          {showUnlockButton ? (
            <div>
              <Button 
                variant="primary" 
                size="md" 
                
                disabled={lead.responsesCount >= 3}
                className="cursor-pointer w-[100px]!"
              
              >
                Unlock
              </Button>
              <p className="mt-2 text-[14px] text-orange-500">
                You only pay to unlock this lead. No subscription or ongoing fees.
              </p>
            </div>
          ) : (
            <Button variant="primary" size="md" >
              Contact {lead.customerName.split(" ")[0]}
            </Button>
          )}
        </div>
      </TradePersonPanel>

      <TradePersonPanel title="Highlights">
        <div className="flex flex-col gap-2">
          {lead.highlights.map((h) => (
            <div
              key={h}
              className="flex items-center gap-1.5 text-sm font-semibold text-primaryText"
            >
              {highlightIcon(h)}
              <span>{h}</span>
            </div>
          ))}
        </div>
      </TradePersonPanel>

      <TradePersonPanel title={`${lead.title} job Details`}>
        <div className="space-y-3">
          {lead.jobDetails.map((detail, idx) => (
            <div key={idx} className="flex flex-col gap-1">
              <span className="text-[12px] text-slate-600">{detail.label}</span>
              <span className="text-[13px] font-medium text-primaryText">{detail.value}</span>
            </div>
          ))}
        </div>
      </TradePersonPanel>
    </div>
  );
}
