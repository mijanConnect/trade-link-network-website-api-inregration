"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { Briefcase, MapPin } from "lucide-react";

import { useState } from "react";
import { useGetAllLeadsQuery } from "@/store/slice/leadSlice";
import { useGetMyProfileQuery } from "@/store/slice/myProfileSlice";
import LeadsFilterDrawer, { LeadsFilterButton } from "@/app/components/trade-person/LeadsFilterDrawer";

export type SortOption = "all" | "date" | "responses" | "price";
export type DateFilterKey = "today" | "yesterday" | "last7";

export default function LeadsMainComponents() {
  const router = useRouter();
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [sortOption, setSortOption] = useState<SortOption>("all");
  const [dateFilter, setDateFilter] = useState<DateFilterKey | null>(null);

  // Map local sort option to API value
  const getSortByValue = (sort: SortOption): string | undefined => {
    if (sort === "all") return undefined;
    if (sort === "date") return "date";
    if (sort === "responses") return "lead_availability";
    if (sort === "price") return "price";
    return undefined;
  };

  // Map date filter to API value
  const getFilterByDateValue = (filter: DateFilterKey | null): string | undefined => {
    return filter || undefined;
  };

  // Prepare API query parameters
  const apiQueryParams = {
    page: 1,
    limit: 10,
    sortBy: getSortByValue(sortOption),
    filterByDate: getFilterByDateValue(dateFilter),
  };

  const { data: leadsData, isLoading } = useGetAllLeadsQuery(apiQueryParams);

  useEffect(() => {
    if (!isLoading && leadsData?.data && leadsData.data.length > 0) {
      // Use the actual API _id instead of mock id
      const firstLeadId = leadsData.data[0]._id;
      router.replace(`/trade-person/leads/${firstLeadId}`);
    }
  }, [leadsData, isLoading, router]);

  const handleDateFilterChange = (key: DateFilterKey | null) => {
    setDateFilter(key);
  };

  const resetFilters = () => {
    setSortOption("all");
    setDateFilter(null);
  };

  // Get profile data to show user's services count
  const { data: profileData } = useGetMyProfileQuery();
  
  // Get services count from user's profile (not from leads)
  const profileServices = profileData?.data?.professional?.services || [];
  const uniqueServices = Array.isArray(profileServices) ? profileServices.length : 0;
  
  // Get location from profile or from first lead
  const profileLocation = profileData?.data?.professional?.postcode 
    ? `${profileData.data.professional.postcode} • ${profileData.data.professional.address || ""}`
    : null;
  
  const firstLocation = leadsData?.data?.[0]?.locationName || "Please Provide Location";
  const firstPostcode = leadsData?.data?.[0]?.postcode || "";
  const leadsLocationDisplay = firstPostcode 
    ? `${firstPostcode} • ${firstLocation}` 
    : firstLocation;
  
  const locationDisplay = profileLocation || leadsLocationDisplay;

  // Show loading state
  if (isLoading) {
    return (
      <div className="flex h-[calc(100vh-120px)] items-center justify-center">
        <div className="text-center">
          <p className="text-slate-500">Loading leads...</p>
        </div>
      </div>
    );
  }

  // Show full layout even when no data
  return (
    <>
      {/* Desktop / Tablet layout (md+) */}
      <div className="hidden h-[calc(100vh-120px)] md:flex">
        {/* Left Sidebar */}
        <aside className="flex w-1/3 flex-col overflow-hidden border border-slate-200 bg-tradeBg">
          {/* Summary Header */}
          <div className="bg-primary px-5 py-6 text-white">
            <h1 className="text-[24px] font-bold">
              {leadsData?.pagination?.total || 0} matching leads
            </h1>
            <div className="mt-3 flex flex-col gap-2 text-[13px]">
              <div className="flex items-center gap-2">
                <Briefcase size={14} />
                <span>{uniqueServices} Services</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin size={14} />
                <span>{locationDisplay}</span>
              </div>
            </div>
          </div>

          {/* Leads List */}
          <div className="flex-1 overflow-y-auto px-4 py-4">
            <div className="mb-3 flex items-center justify-between rounded-md bg-white p-4">
              <span className="text-[13px] text-slate-600">
                Showing {leadsData?.data?.length || 0} of {leadsData?.pagination?.total || 0} leads
              </span>
              <LeadsFilterButton onClick={() => setIsFilterOpen(true)} />
            </div>

            <div className="space-y-4">
              {!leadsData?.data || leadsData.data.length === 0 ? (
                <div className="flex items-center justify-center py-8">
                  <p className="text-center text-slate-500">No data available</p>
                </div>
              ) : null}
            </div>
          </div>
        </aside>

        {/* Right Panel - Empty State */}
        <div className="w-2/3 flex-1 overflow-y-auto bg-background pl-4">
          <div className="flex h-[600px] items-center justify-center rounded-lg border border-slate-200 bg-white">
            <p className="text-slate-500">No data available</p>
          </div>
        </div>
      </div>

      {/* Mobile layout (under md) */}
      <div className="block h-[calc(100vh-120px)] md:hidden">
        <div className="flex h-full flex-col overflow-hidden border border-slate-200 bg-tradeBg">
          {/* Summary Header */}
          <div className="bg-primary px-4 py-5 text-white">
            <h1 className="text-[20px] font-bold">
              {leadsData?.pagination?.total || 0} matching leads
            </h1>
            <div className="mt-3 flex flex-col gap-2 text-[12px]">
              <div className="flex items-center gap-2">
                <Briefcase size={14} />
                <span>{uniqueServices} Services</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin size={14} />
                <span>{locationDisplay}</span>
              </div>
            </div>
          </div>

          {/* Leads List */}
          <div className="flex-1 overflow-y-auto px-3 py-4">
            <div className="mb-3 flex items-center justify-between rounded-md bg-white p-3">
              <span className="text-[12px] text-slate-600">
                Showing {leadsData?.data?.length || 0} of {leadsData?.pagination?.total || 0} leads
              </span>
              <LeadsFilterButton onClick={() => setIsFilterOpen(true)} />
            </div>

            <div className="space-y-3">
              {!leadsData?.data || leadsData.data.length === 0 ? (
                <div className="flex items-center justify-center py-8">
                  <p className="text-center text-slate-500">No data available</p>
                </div>
              ) : null}
            </div>
          </div>
        </div>
      </div>

      <LeadsFilterDrawer
        isOpen={isFilterOpen}
        sortOption={sortOption}
        dateFilter={dateFilter}
        onClose={() => setIsFilterOpen(false)}
        onSortChange={setSortOption}
        onDateFilterChange={handleDateFilterChange}
        onReset={resetFilters}
      />
    </>
  );
}
