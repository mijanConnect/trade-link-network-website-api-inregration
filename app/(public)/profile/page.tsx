"use client";

// import { useState } from "react";
// import DrivingInfo from "@/app/components/profile/DrivingInfo";
import ProviderContainer from "@/app/components/profile/ProviderContainer";

export default function Page() {
  // const [activeTab, setActiveTab] = useState<"personal" | "driving">(
  //   "personal"
  // );

  return (
    // <div className="my-5 lg:my-12">
    //   <div className="flex gap-4 border-b border-gray-200 mb-8">
    //     <button
    //       onClick={() => setActiveTab("personal")}
    //       className={`pb-1 px-2 font-semibold text-[16px] transition ${
    //         activeTab === "personal"
    //           ? "text-primary border-b-2 border-primary"
    //           : "text-primaryParagraph hover:text-primaryText"
    //       }`}
    //     >
    //       Personal Information
    //     </button>
    //     <button
    //       onClick={() => setActiveTab("driving")}
    //       className={`pb-1 px-2 font-semibold text-[16px] transition ${
    //         activeTab === "driving"
    //           ? "text-primary border-b-2 border-primary"
    //           : "text-primaryParagraph hover:text-primaryText"
    //       }`}
    //     >
    //       Driving Information
    //     </button>
    //   </div>

    //   {activeTab === "personal" && <PersonalInfo />}
    //   {activeTab === "driving" && <DrivingInfo />}
    // </div>
    <div className="container mx-auto px-4 my-6 lg:mt-15 lg:mb-20">
      <ProviderContainer />
    </div>
  );
}
