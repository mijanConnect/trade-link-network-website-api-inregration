import Image from "next/image";
import type { Lead } from "@/lib/trade-person/mock";
// import TradePersonBadge from "@/app/components/trade-person/TradePersonBadge";
// import { CheckCircle2, User, AlertCircle } from "lucide-react";
import { useRouter } from "next/navigation";
import { FrequentUserIcon, UrgentIcon, VerifyIcon } from "./Svg";

type Props = {
  lead: Lead;
  selected?: boolean;
  onClick?: () => void;
};

function highlightIcon(h: Lead["highlights"][0]) {
  if (h === "Verified Phone") return <VerifyIcon  />;
  if (h === "Frequent User") return <FrequentUserIcon />;
  return <UrgentIcon />;
}

function getResponseStatus(responsesCount: number): string {
  if (responsesCount === 0) return "1st to respond";
  if (responsesCount >= 3) return "3/3";
  return `${responsesCount}/3`;
}

export default function LeadCard({ lead, selected }: Props) {
  const router = useRouter();
  const isLeadAvailable = lead.responsesCount < 3;

  const handleCheckoutClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();
    if (!isLeadAvailable) return;
    router.push(`/trade-person/checkout/${lead.id}`);
  };

  return (
    <div className="overflow-hidden rounded-sm border border-slate-200 bg-white shadow-sm">
      <div
        className={`w-full p-4 text-left transition ${selected ? "bg-white border-2 border-primary" : ""}`}
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
      </div>

      {/* Bottom checkout bar - similar to design */}
      <button
        type="button"
        onClick={handleCheckoutClick}
        disabled={!isLeadAvailable}
        className={`flex w-full items-center justify-between bg-primary px-4 py-5 text-left text-white transition ${isLeadAvailable ? "hover:bg-slate-800 cursor-pointer" : "cursor-not-allowed opacity-60"}`}
      >
        <div className="flex items-center gap-3">
          {/* three vertical lines icon */}
          <div className="flex  gap-[3px]">
            <span className="w-0.5 h-4 rounded-full bg-white" />
            <span className="w-0.5 h-4 rounded-full bg-white" />
            <span className="w-0.5 h-4 rounded-full bg-white" />
          </div>
          <div className="text-[12px] font-semibold">
            {isLeadAvailable ? getResponseStatus(lead.responsesCount) : "Lead not available"}
          </div>
        </div>

        <div className="text-[13px] font-semibold">{lead.priceLabel}</div>
      </button>
    </div>
  );
}

