"use client";

import { useParams, useRouter } from "next/navigation";
import { leadsMock } from "@/lib/trade-person/mock";

export default function LeadCheckoutPage() {
  const params = useParams();
  const router = useRouter();
  const leadId = params.leadId as string;

  const lead = leadsMock.find((l) => l.id === leadId);

  if (!lead) {
    return (
      <div className="rounded-lg bg-white p-6 shadow-sm">
        <p className="text-sm text-slate-600">Lead not found.</p>
      </div>
    );
  }

  const isLeadAvailable = lead.responsesCount < 3;

  return (
    <div className="flex gap-6">
      <div className="w-full max-w-xl rounded-lg bg-white p-6 shadow-sm">
        <h1 className="text-xl font-semibold text-primaryText">Checkout lead</h1>
        <p className="mt-1 text-sm text-slate-600">
          Review the details below and confirm to unlock this lead.
        </p>

        <div className="mt-4 rounded-lg bg-slate-50 p-4">
          <div className="text-sm font-semibold text-primaryText">{lead.title}</div>
          <div className="mt-1 text-xs text-slate-600">{lead.summary}</div>
          <div className="mt-1 text-xs text-slate-500">{lead.budgetLabel}</div>
        </div>

        <div className="mt-4 space-y-2 text-sm text-slate-700">
          <div className="flex justify-between">
            <span>Lead price</span>
            <span className="font-semibold">{lead.priceLabel}</span>
          </div>
          <div className="flex justify-between text-xs text-slate-500">
            <span>Responses allowed</span>
            <span>{lead.responsesCount}/3 taken</span>
          </div>
        </div>

        <button
          type="button"
          disabled={!isLeadAvailable}
          className={`mt-6 w-full rounded-md px-4 py-2 text-sm font-semibold text-white transition ${
            isLeadAvailable
              ? "bg-slate-900 hover:bg-slate-800"
              : "cursor-not-allowed bg-slate-400"
          }`}
          onClick={() => {
            if (!isLeadAvailable) return;
            // In real app, integrate payment here
            router.push("/trade-person/my-responses");
          }}
        >
          {isLeadAvailable ? "Confirm & get lead" : "Lead not available"}
        </button>

        <button
          type="button"
          className="mt-3 w-full rounded-md border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50"
          onClick={() => router.back()}
        >
          Cancel
        </button>
      </div>
    </div>
  );
}

