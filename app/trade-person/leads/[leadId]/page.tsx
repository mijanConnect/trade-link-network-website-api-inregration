"use client";

import { useParams, useRouter } from "next/navigation";
import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import LeadCard from "@/app/components/trade-person/LeadCard";
import LeadDetailPanel from "@/app/components/trade-person/LeadDetailPanel";
import LeadDetailLoading from "@/app/components/trade-person/LeadDetailLoading";
import LeadsFilterDrawer, {
  LeadsFilterButton,
} from "@/app/components/trade-person/LeadsFilterDrawer";
import { leadsMock } from "@/lib/trade-person/mock";
import { Briefcase, MapPin, ArrowLeft } from "lucide-react";

export type SortOption = "date" | "responses" | "price";
export type DateFilterKey = "today" | "yesterday" | "last7";

function getMinutesAgo(label: string): number {
  const match = label.match(/(\d+)\s*(h|d)\s+ago/i);
  if (!match) return Number.MAX_SAFE_INTEGER;
  const value = Number(match[1]);
  const unit = match[2]?.toLowerCase();
  if (unit === "h") return value * 60;
  if (unit === "d") return value * 24 * 60;
  return Number.MAX_SAFE_INTEGER;
}

function getDateBucket(label: string): "today" | "yesterday" | "last7" | "older" {
  const match = label.match(/(\d+)\s*(h|d)\s+ago/i);
  if (!match) return "older";
  const value = Number(match[1]);
  const unit = match[2]?.toLowerCase();

  if (unit === "h") {
    return "today";
  }

  if (unit === "d") {
    if (value === 1) return "yesterday";
    if (value <= 7) return "last7";
  }

  return "older";
}

function parsePrice(priceLabel: string): number {
  const numeric = parseFloat(priceLabel.replace(/[^0-9.]/g, ""));
  return Number.isNaN(numeric) ? 0 : numeric;
}

export default function LeadDetailPage() {
  const params = useParams();
  const router = useRouter();
  const leadId = params.leadId as string;
  const listRef = useRef<HTMLDivElement>(null);

  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [sortOption, setSortOption] = useState<SortOption>("date");
  const [dateFilters, setDateFilters] = useState<DateFilterKey[]>([]);
  const [showDetailOnMobile, setShowDetailOnMobile] = useState(false);
  const [mobileSelectedLeadId, setMobileSelectedLeadId] = useState<string | null>(
    leadId || null,
  );
  const [isLoading, setIsLoading] = useState(false);
  const loadingTimerRef = useRef<NodeJS.Timeout | null>(null);

  // Save scroll position before navigation
  const handleScroll = () => {
    if (listRef.current) {
      sessionStorage.setItem("leadsScrollTop", listRef.current.scrollTop.toString());
    }
  };

  const filteredAndSortedLeads = useMemo(() => {
    const matchesDateFilter = (label: string) => {
      if (dateFilters.length === 0) return true;
      const bucket = getDateBucket(label);

      // Last 7 days should include today + yesterday + last7 bucket
      if (dateFilters.includes("last7")) {
        if (bucket === "today" || bucket === "yesterday" || bucket === "last7") {
          return true;
        }
      }

      if (dateFilters.includes("today") && bucket === "today") return true;
      if (dateFilters.includes("yesterday") && bucket === "yesterday") return true;

      return false;
    };

    const sorted = [...leadsMock]
      .filter((lead) => matchesDateFilter(lead.createdAtLabel))
      .sort((a, b) => {
        if (sortOption === "date") {
          return getMinutesAgo(a.createdAtLabel) - getMinutesAgo(b.createdAtLabel);
        }
        if (sortOption === "responses") {
          // 0 responses first, 3/3 last
          return a.responsesCount - b.responsesCount;
        }
        if (sortOption === "price") {
          return parsePrice(a.priceLabel) - parsePrice(b.priceLabel);
        }
        return 0;
      });

    return sorted;
  }, [sortOption, dateFilters]);

  const selectedLead = filteredAndSortedLeads.find((l) => l.id === leadId);
  const defaultLeadId = filteredAndSortedLeads[0]?.id;
  const mobileSelectedLead =
    filteredAndSortedLeads.find((l) => l.id === mobileSelectedLeadId) ??
    selectedLead ??
    null;

  // Handle loading state with timer when lead changes - smooth experience
  useEffect(() => {
    // Clear any existing timer
    if (loadingTimerRef.current) {
      clearTimeout(loadingTimerRef.current);
      loadingTimerRef.current = null;
    }

    // Start loading timer (200ms delay) - only show loading if data takes time
    // This prevents UI jerk for fast data loads
    const showLoadingTimer = setTimeout(() => {
      // Only show loading if data is not ready yet
      if (!selectedLead && !mobileSelectedLead) {
        setIsLoading(true);
      }
    }, 200);

    loadingTimerRef.current = showLoadingTimer;

    // Simulate data loading delay (in real app, this would be an API call)
    // If data is ready quickly, hide loading immediately
    const dataLoadTimer = setTimeout(() => {
      setIsLoading(false);
      if (loadingTimerRef.current) {
        clearTimeout(loadingTimerRef.current);
        loadingTimerRef.current = null;
      }
    }, 300); // Simulate 300ms data load time

    return () => {
      if (loadingTimerRef.current) {
        clearTimeout(loadingTimerRef.current);
        loadingTimerRef.current = null;
      }
      clearTimeout(dataLoadTimer);
      // Reset loading state on cleanup
      setIsLoading(false);
    };
  }, [leadId, mobileSelectedLeadId, selectedLead, mobileSelectedLead]);

  // Redirect to default lead if no lead selected or invalid lead
  useEffect(() => {
    if (!selectedLead && defaultLeadId) {
      router.replace(`/trade-person/leads/${defaultLeadId}`);
    }
  }, [selectedLead, defaultLeadId, router]);

  // Restore scroll position when lead changes
  useEffect(() => {
    const saved = sessionStorage.getItem("leadsScrollTop");
    if (saved && listRef.current) {
      // Use requestAnimationFrame to ensure DOM is ready
      requestAnimationFrame(() => {
        if (listRef.current) {
          listRef.current.scrollTop = Number(saved);
        }
      });
    }
  }, [leadId]);

  const toggleDateFilter = (key: DateFilterKey) => {
    setDateFilters((prev) =>
      prev.includes(key) ? prev.filter((k) => k !== key) : [...prev, key],
    );
  };

  const resetFilters = () => {
    setSortOption("date");
    setDateFilters([]);
  };

  if (!selectedLead && !defaultLeadId && filteredAndSortedLeads.length === 0) {
    return (
      <div className="flex h-[calc(100vh-120px)] items-center justify-center">
        <p className="text-slate-500">No leads found</p>
      </div>
    );
  }

  return (
    <>
      {/* Desktop / Tablet layout (md+) */}
      <div className="hidden h-[calc(100vh-120px)] md:flex">
        {/* Left Sidebar */}
        <aside className="flex w-1/3 flex-col overflow-hidden border border-slate-200 bg-tradeBg">
          {/* Summary Header */}
          <div className="bg-primary px-5 py-6 text-white">
            <h1 className="text-[24px] font-bold">1,050 matching leads</h1>
            <div className="mt-3 flex flex-col gap-2 text-[13px]">
              <div className="flex items-center gap-2">
                <Briefcase size={14} />
                <span>02 Services</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin size={14} />
                <span>Avondale, Harare</span>
              </div>
            </div>
          </div>

          {/* Leads List */}
          <div
            ref={listRef}
            onScroll={handleScroll}
            className="flex-1 overflow-y-auto px-4 py-4"
          >
            <div className="mb-3 flex items-center justify-between rounded-md bg-white p-4">
              <span className="text-[13px] text-slate-600">
                Showing {filteredAndSortedLeads.length} of {leadsMock.length} leads
              </span>
              <LeadsFilterButton onClick={() => setIsFilterOpen(true)} />
            </div>

            <div className="space-y-4">
              {filteredAndSortedLeads.map((lead) => (
                <Link
                  key={lead.id}
                  href={`/trade-person/leads/${lead.id}`}
                  onClick={() => {
                    // Save scroll position before navigation
                    if (listRef.current) {
                      sessionStorage.setItem(
                        "leadsScrollTop",
                        listRef.current.scrollTop.toString(),
                      );
                    }
                    // Don't set loading immediately - let useEffect handle it smoothly
                  }}
                  className="block transition-opacity duration-200"
                >
                  <LeadCard lead={lead} selected={lead.id === leadId} />
                </Link>
              ))}
            </div>
          </div>
        </aside>

        {/* Right Panel - Lead Details */}
        <div className="w-2/3 flex-1 overflow-y-auto bg-background pl-4">
          <div className="relative min-h-[600px] transition-opacity duration-300">
            {isLoading ? (
              <div className="absolute inset-0 animate-fadeIn">
                <LeadDetailLoading />
              </div>
            ) : (
              <div className="animate-fadeIn">
                <LeadDetailPanel lead={selectedLead ?? null} source="leads" />
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile layout (under md) */}
      <div className="block h-[calc(100vh-120px)] md:hidden">
        {/* List view (default) */}
        {!showDetailOnMobile && (
          <div className="flex h-full flex-col overflow-hidden border border-slate-200 bg-tradeBg">
            {/* Summary Header */}
            <div className="bg-primary px-4 py-5 text-white">
              <h1 className="text-[20px] font-bold">1,050 matching leads</h1>
              <div className="mt-3 flex flex-col gap-2 text-[12px]">
                <div className="flex items-center gap-2">
                  <Briefcase size={14} />
                  <span>02 Services</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin size={14} />
                  <span>Avondale, Harare</span>
                </div>
              </div>
            </div>

            {/* Leads List */}
            <div className="flex-1 overflow-y-auto px-3 py-4">
              <div className="mb-3 flex items-center justify-between rounded-md bg-white p-3">
                <span className="text-[12px] text-slate-600">
                  Showing {filteredAndSortedLeads.length} of {leadsMock.length} leads
                </span>
                <LeadsFilterButton onClick={() => setIsFilterOpen(true)} />
              </div>

              <div className="space-y-3">
                {filteredAndSortedLeads.map((lead) => (
                  <button
                    key={lead.id}
                    type="button"
                    className="block w-full text-left transition-opacity duration-200"
                    onClick={() => {
                      // Don't set loading immediately - let useEffect handle it smoothly
                      setMobileSelectedLeadId(lead.id);
                      setShowDetailOnMobile(true);
                    }}
                  >
                    <LeadCard
                      lead={lead}
                      selected={lead.id === mobileSelectedLeadId}
                    />
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Detail view */}
        {showDetailOnMobile && mobileSelectedLead && (
          <div className="flex h-full flex-col overflow-hidden bg-background">
            {/* Back to leads button */}
            <div className="flex items-center gap-2 border-b border-slate-200 bg-white px-4 py-3">
              <button
                type="button"
                onClick={() => setShowDetailOnMobile(false)}
                className="flex items-center gap-2 text-sm font-medium text-primary"
              >
                <ArrowLeft className="h-4 w-4" />
                <span>Back to leads</span>
              </button>
            </div>

            <div className="flex-1 overflow-y-auto px-3 py-4">
              <div className="relative min-h-[400px] transition-opacity duration-300">
                {isLoading ? (
                  <div className="absolute inset-0 animate-fadeIn">
                    <LeadDetailLoading />
                  </div>
                ) : (
                  <div className="animate-fadeIn">
                    <LeadDetailPanel lead={mobileSelectedLead} source="leads" />
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>

      <LeadsFilterDrawer
        isOpen={isFilterOpen}
        sortOption={sortOption}
        dateFilters={dateFilters}
        onClose={() => setIsFilterOpen(false)}
        onSortChange={setSortOption}
        onToggleDateFilter={toggleDateFilter}
        onReset={resetFilters}
      />
    </>
  );
}
