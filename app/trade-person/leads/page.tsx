"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useGetAllLeadsQuery } from "@/store/slice/leadSlice";

export default function LeadsIndexPage() {
  const router = useRouter();
  const { data: leadsData, isLoading } = useGetAllLeadsQuery();

  useEffect(() => {
    if (!isLoading && leadsData?.data && leadsData.data.length > 0) {
      // Use the actual API _id instead of mock id
      const firstLeadId = leadsData.data[0]._id;
      router.replace(`/trade-person/leads/${firstLeadId}`);
    }
  }, [leadsData, isLoading, router]);

  // Show loading or empty state
  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <p className="text-slate-500">Loading leads...</p>
      </div>
    );
  }

  if (!leadsData?.data || leadsData.data.length === 0) {
    return (
      <div className="flex h-screen items-center justify-center">
        <p className="text-slate-500">No leads found</p>
      </div>
    );
  }

  return null;
}
