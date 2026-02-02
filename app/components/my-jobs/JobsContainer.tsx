"use client";

import { useState } from "react";
import PendingJobs from "./PendingJobs";
import InterestedTradeperson from "./InterestedTradeperson";
import HiredJobs from "./HiredJobs";

const tabs = [
  { id: "pending", label: "Pending Jobs" },
  { id: "interested", label: "Interested Tradepeople" },
  { id: "hired", label: "Hired" },
];

export default function JobsContainer() {
  const [activeTab, setActiveTab] = useState<string>("pending");
  return (
    <>
      <h1 className="text-[28px] md:text-[40px] font-bold text-primaryText mb-4 lg:mb-6">
        My Jobs
      </h1>

      <div className="w-full overflow-hidden">
        <div className="flex gap-8 lg:gap-12 overflow-x-auto whitespace-nowrap scrollbar-hide">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`relative rounded-md py-1 text-[18px] lg:text-[20px] font-semibold text-nowrap transition-all duration-300 cursor-pointer ${
                activeTab === tab.id
                  ? "text-primaryText"
                  : "text-primaryTextLight hover:text-primaryText"
              }`}
            >
              {tab.label}

              {activeTab === tab.id && (
                <span className="absolute left-0 -bottom-px h-0.75 w-full bg-primary" />
              )}
            </button>
          ))}
        </div>

        <div className="mt-6 lg:mt-8">
          {activeTab === "pending" && <PendingJobs />}
          {activeTab === "interested" && <InterestedTradeperson />}
          {activeTab === "hired" && <HiredJobs />}
        </div>
      </div>
    </>
  );
}
