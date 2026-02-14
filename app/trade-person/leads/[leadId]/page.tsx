"use client";

import { useParams, useRouter } from "next/navigation";
import { useEffect, useMemo, useRef, useState } from "react";
import LeadCard from "@/app/components/trade-person/LeadCard";
import LeadDetailPanel from "@/app/components/trade-person/LeadDetailPanel";
import LeadDetailLoading from "@/app/components/trade-person/LeadDetailLoading";
import LeadsFilterDrawer, {
  LeadsFilterButton,
} from "@/app/components/trade-person/LeadsFilterDrawer";
import { Briefcase, MapPin, ArrowLeft } from "lucide-react";
import { useGetAllLeadsQuery, useGetSingleLeadQuery, type Lead } from "@/store/slice/leadSlice";
import {
  transformApiLeadToMockLead,
  getDateBucketFromISO,
  getMinutesAgoFromISO,
} from "@/lib/trade-person/leadUtils";
import type { Lead as MockLead } from "@/lib/trade-person/mock";

export type SortOption = "all" | "date" | "responses" | "price";
export type DateFilterKey = "today" | "yesterday" | "last7";

function parsePrice(priceLabel: string): number {
  const numeric = parseFloat(priceLabel.replace(/[^0-9.]/g, ""));
  return Number.isNaN(numeric) ? 0 : numeric;
}

// Helper function to validate MongoDB ObjectId format
function isValidObjectId(id: string): boolean {
  // MongoDB ObjectId is 24 hex characters
  return /^[0-9a-fA-F]{24}$/.test(id);
}

export default function LeadDetailPage() {
  const params = useParams();
  const router = useRouter();
  const leadIdParam = params.leadId as string;
  const listRef = useRef<HTMLDivElement>(null);
  const mobileListRef = useRef<HTMLDivElement>(null);

  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [sortOption, setSortOption] = useState<SortOption>("all");
  const [dateFilter, setDateFilter] = useState<DateFilterKey | null>(null);
  const [showDetailOnMobile, setShowDetailOnMobile] = useState(false);
  const [mobileSelectedLeadId, setMobileSelectedLeadId] = useState<string | null>(
    leadIdParam || null,
  );
  // Local UI state for instant selection feedback (before URL update)
  const [activeLeadId, setActiveLeadId] = useState<string | null>(leadIdParam || null);
  const loadingTimerRef = useRef<NodeJS.Timeout | null>(null);
  const isLoadingMoreRef = useRef(false);
  const shouldRestoreScrollRef = useRef(true); // Only restore scroll on initial load
  const previousLeadIdRef = useRef<string | null>(null);
  
  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [allLeads, setAllLeads] = useState<Lead[]>([]);
  const [hasMore, setHasMore] = useState(true);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const limit = 10;

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
  const apiQueryParams = useMemo(() => {
    return {
      page: currentPage,
      limit,
      sortBy: getSortByValue(sortOption),
      filterByDate: getFilterByDateValue(dateFilter),
    };
  }, [currentPage, sortOption, dateFilter]);

  // Fetch leads with pagination and filters
  const {
    data: leadsData,
    isLoading: isLoadingLeads,
    error: leadsError,
  } = useGetAllLeadsQuery(apiQueryParams);

  // Reset pagination when filters change
  useEffect(() => {
    setCurrentPage(1);
    setAllLeads([]);
    setHasMore(true);
    setIsLoadingMore(false);
    isLoadingMoreRef.current = false;
  }, [sortOption, dateFilter]);

  // Validate leadId - if it's not a valid ObjectId (like "lead_1"), we'll skip the query
  const isValidLeadId = leadIdParam && isValidObjectId(leadIdParam);
  const leadId = isValidLeadId ? leadIdParam : null;

  // Fetch single lead for detail view - only if leadId is valid
  const {
    data: singleLeadData,
    isLoading: isLoadingSingleLead,
  } = useGetSingleLeadQuery(leadId || "", {
    skip: !leadId,
  });

  // Accumulate leads when new page data arrives
  // This effect syncs external API data with React state, which is a valid use case
  useEffect(() => {
    if (!leadsData?.data) return;
    
    setAllLeads((prev) => {
      if (currentPage === 1) {
        // First page - replace all leads
        return leadsData.data;
      } else {
        // Subsequent pages - append new leads (avoid duplicates)
        const existingIds = new Set(prev.map((l) => l._id));
        const newLeads = leadsData.data.filter((l) => !existingIds.has(l._id));
        return [...prev, ...newLeads];
      }
    });
    
    // Check if there are more pages - use strict comparison
    const pagination = leadsData.pagination;
    if (pagination) {
      const hasMorePages = pagination.page < pagination.totalPage;
      setHasMore(hasMorePages);
      // If no more pages, reset loading state
      if (!hasMorePages) {
        setIsLoadingMore(false);
        isLoadingMoreRef.current = false;
      }
    } else {
      setHasMore(false);
      setIsLoadingMore(false);
      isLoadingMoreRef.current = false;
    }
    
    // Reset loading more state after data is processed
    if (currentPage > 1) {
      setIsLoadingMore(false);
      isLoadingMoreRef.current = false;
    }
  }, [leadsData, currentPage]);

  // Transform accumulated leads to mock format
  const transformedLeads = useMemo(() => {
    if (!allLeads || allLeads.length === 0) return [];
    return allLeads.map(transformApiLeadToMockLead);
  }, [allLeads]);

  // Save scroll position before navigation and handle infinite scroll (Desktop)
  const handleScroll = () => {
    if (listRef.current) {
      sessionStorage.setItem("leadsScrollTop", listRef.current.scrollTop.toString());
      
      // Prevent multiple simultaneous requests
      if (isLoadingMoreRef.current || isLoadingLeads || isLoadingMore) return;
      
      // Check pagination directly from API response to prevent over-fetching
      const pagination = leadsData?.pagination;
      if (pagination && currentPage >= pagination.totalPage) {
        setHasMore(false);
        return;
      }
      
      // Infinite scroll: load more when near bottom
      const { scrollTop, scrollHeight, clientHeight } = listRef.current;
      const scrollPercentage = (scrollTop + clientHeight) / scrollHeight;
      
      // Load more when 80% scrolled, has more pages, and not already loading
      if (scrollPercentage > 0.8 && hasMore && pagination && currentPage < pagination.totalPage) {
        isLoadingMoreRef.current = true;
        setIsLoadingMore(true);
        setCurrentPage((prev) => {
          // Double check we're not exceeding total pages
          if (pagination && prev + 1 > pagination.totalPage) {
            isLoadingMoreRef.current = false;
            setIsLoadingMore(false);
            setHasMore(false);
            return prev;
          }
          return prev + 1;
        });
      }
    }
  };

  // Handle infinite scroll for mobile
  const handleMobileScroll = () => {
    if (mobileListRef.current) {
      // Prevent multiple simultaneous requests
      if (isLoadingMoreRef.current || isLoadingLeads || isLoadingMore) return;
      
      // Check pagination directly from API response to prevent over-fetching
      const pagination = leadsData?.pagination;
      if (pagination && currentPage >= pagination.totalPage) {
        setHasMore(false);
        return;
      }
      
      const { scrollTop, scrollHeight, clientHeight } = mobileListRef.current;
      const scrollPercentage = (scrollTop + clientHeight) / scrollHeight;
      
      // Load more when 80% scrolled, has more pages, and not already loading
      if (scrollPercentage > 0.8 && hasMore && pagination && currentPage < pagination.totalPage) {
        isLoadingMoreRef.current = true;
        setIsLoadingMore(true);
        setCurrentPage((prev) => {
          // Double check we're not exceeding total pages
          if (pagination && prev + 1 > pagination.totalPage) {
            isLoadingMoreRef.current = false;
            setIsLoadingMore(false);
            setHasMore(false);
            return prev;
          }
          return prev + 1;
        });
      }
    }
  };

  const filteredAndSortedLeads = useMemo(() => {
    const matchesDateFilter = (lead: MockLead) => {
      if (!dateFilter) return true;
      
      // Find the original API lead to get createdAt ISO string
      const apiLead = allLeads.find((l) => l._id === lead.id);
      if (!apiLead) return true;
      
      const bucket = getDateBucketFromISO(apiLead.createdAt);

      // Last 7 days should include today + yesterday + last7 bucket
      if (dateFilter === "last7") {
        if (bucket === "today" || bucket === "yesterday" || bucket === "last7") {
          return true;
        }
      }

      if (dateFilter === "today" && bucket === "today") return true;
      if (dateFilter === "yesterday" && bucket === "yesterday") return true;

      return false;
    };

    const sorted = [...transformedLeads]
      .filter(matchesDateFilter)
      .sort((a, b) => {
        if (sortOption === "date") {
          // Find original API leads for createdAt comparison
          const apiLeadA = allLeads.find((l) => l._id === a.id);
          const apiLeadB = allLeads.find((l) => l._id === b.id);
          
          if (!apiLeadA || !apiLeadB) return 0;
          
          const minsA = getMinutesAgoFromISO(apiLeadA.createdAt);
          const minsB = getMinutesAgoFromISO(apiLeadB.createdAt);
          return minsA - minsB;
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
  }, [sortOption, dateFilter, transformedLeads, allLeads]);

  // Transform single lead if available
  const selectedLeadTransformed = useMemo(() => {
    if (!singleLeadData) return null;
    return transformApiLeadToMockLead(singleLeadData);
  }, [singleLeadData]);

  // Use single lead if available, otherwise find from list (use activeLeadId for UI consistency)
  const selectedLead = selectedLeadTransformed || (activeLeadId ? filteredAndSortedLeads.find((l) => l.id === activeLeadId) : null);
  const defaultLeadId = filteredAndSortedLeads[0]?.id;
  const mobileSelectedLead =
    filteredAndSortedLeads.find((l) => l.id === mobileSelectedLeadId) ??
    selectedLead ??
    null;

  const isLoading = isLoadingLeads || isLoadingSingleLead;

  // Handle loading state with timer when lead changes - smooth experience
  useEffect(() => {
    // Clear any existing timer
    if (loadingTimerRef.current) {
      clearTimeout(loadingTimerRef.current);
      loadingTimerRef.current = null;
    }

    // If data is already loaded, don't show loading
    if (selectedLead || mobileSelectedLead || !leadId) {
      return;
    }

    // Start loading timer (200ms delay) - only show loading if data takes time
    const showLoadingTimer = setTimeout(() => {
      // Only show loading if data is not ready yet
      if (!selectedLead && !mobileSelectedLead && leadId) {
        // Loading is handled by RTK Query
      }
    }, 200);

    loadingTimerRef.current = showLoadingTimer;

    return () => {
      if (loadingTimerRef.current) {
        clearTimeout(loadingTimerRef.current);
        loadingTimerRef.current = null;
      }
    };
  }, [leadId, mobileSelectedLeadId, selectedLead, mobileSelectedLead]);

  // Redirect to default lead if no lead selected, invalid lead, or invalid leadId format
  useEffect(() => {
    // Wait for leads to load before redirecting
    if (isLoadingLeads) return;
    
    // If leadId is invalid (like "lead_1"), redirect to first valid lead
    if (leadIdParam && !isValidObjectId(leadIdParam)) {
      if (defaultLeadId) {
        router.replace(`/trade-person/leads/${defaultLeadId}`);
        return;
      }
    }
    
    // If no lead selected and we have a default, redirect
    if (!selectedLead && defaultLeadId && leadId !== defaultLeadId) {
      router.replace(`/trade-person/leads/${defaultLeadId}`);
    }
  }, [selectedLead, defaultLeadId, router, leadIdParam, leadId, isLoadingLeads]);

  // Restore scroll position only on initial page load, not when clicking leads
  useEffect(() => {
    // Only restore scroll once when leads are first loaded
    // Don't restore when leadId changes due to user clicks
    if (!shouldRestoreScrollRef.current || !listRef.current || allLeads.length === 0) return;
    
    // Only restore on the very first load (when previousLeadIdRef is null)
    if (previousLeadIdRef.current === null) {
      const saved = sessionStorage.getItem("leadsScrollTop");
      if (saved) {
        // Use setTimeout to ensure DOM is fully rendered
        setTimeout(() => {
          if (listRef.current) {
            listRef.current.scrollTop = Number(saved);
          }
        }, 100);
      }
      // Mark that we've done initial scroll restoration
      previousLeadIdRef.current = leadId || "";
      shouldRestoreScrollRef.current = false;
    }
  }, [allLeads.length, leadId]);

  const handleDateFilterChange = (key: DateFilterKey | null) => {
    setDateFilter(key);
  };

  const resetFilters = () => {
    setSortOption("all");
    setDateFilter(null);
    // Reset pagination when filters change
    setCurrentPage(1);
    setAllLeads([]);
    setHasMore(true);
    setIsLoadingMore(false);
    isLoadingMoreRef.current = false;
  };

  // Show loading state
  if (isLoadingLeads && transformedLeads.length === 0) {
    return (
      <div className="flex h-[calc(100vh-120px)] items-center justify-center">
        <div className="text-center">
          <p className="text-slate-500">Loading leads...</p>
        </div>
      </div>
    );
  }

  // Show error state
  if (leadsError) {
    return (
      <div className="flex h-[calc(100vh-120px)] items-center justify-center">
        <div className="text-center">
          <p className="text-red-500">Error loading leads. Please try again.</p>
        </div>
      </div>
    );
  }

  // Show empty state
  if (!selectedLead && !defaultLeadId && filteredAndSortedLeads.length === 0 && !isLoadingLeads) {
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
            <h1 className="text-[24px] font-bold">
              {leadsData?.pagination?.total || 0} matching leads
            </h1>
            <div className="mt-3 flex flex-col gap-2 text-[13px]">
              <div className="flex items-center gap-2">
                <Briefcase size={14} />
                <span>
                  {new Set(transformedLeads.map((l) => l.title)).size} Services
                </span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin size={14} />
                <span>
                  {transformedLeads[0]?.customerAddress.split("•")[1]?.trim() || "Multiple locations"}
                </span>
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
                Showing {filteredAndSortedLeads.length} of {leadsData?.pagination?.total || allLeads.length} leads
              </span>
              <LeadsFilterButton onClick={() => setIsFilterOpen(true)} />
            </div>

            <div className="space-y-4">
              {filteredAndSortedLeads.map((lead) => (
                <button
                  key={lead.id}
                  type="button"
                  onClick={() => {
                    // Prevent scroll restoration when clicking on a lead
                    shouldRestoreScrollRef.current = false;
                    
                    // 🔥 Instant UI feedback - update local state first
                    setActiveLeadId(lead.id);
                    
                    // Save current scroll position
                    if (listRef.current) {
                      sessionStorage.setItem(
                        "leadsScrollTop",
                        listRef.current.scrollTop.toString(),
                      );
                    }
                    
                    // URL update (non-blocking, happens after UI update)
                    requestAnimationFrame(() => {
                      router.push(`/trade-person/leads/${lead.id}`, { scroll: false });
                    });
                  }}
                  className="block w-full text-left transition-opacity duration-200"
                >
                  <LeadCard lead={lead} selected={lead.id === activeLeadId} />
                </button>
              ))}
              {/* Loading indicator for infinite scroll */}
              {isLoadingMore && (
                <div className="flex justify-center py-4">
                  <div className="text-sm text-slate-500">Loading more leads...</div>
                </div>
              )}
              {/* End of list indicator */}
              {!hasMore && filteredAndSortedLeads.length > 0 && (
                <div className="flex justify-center py-4">
                  <div className="text-sm text-slate-500">No more leads to load</div>
                </div>
              )}
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
              <h1 className="text-[20px] font-bold">
                {leadsData?.pagination?.total || 0} matching leads
              </h1>
              <div className="mt-3 flex flex-col gap-2 text-[12px]">
                <div className="flex items-center gap-2">
                  <Briefcase size={14} />
                  <span>
                    {new Set(transformedLeads.map((l) => l.title)).size} Services
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin size={14} />
                  <span>
                    {transformedLeads[0]?.customerAddress.split("•")[1]?.trim() || "Multiple locations"}
                  </span>
                </div>
              </div>
            </div>

            {/* Leads List */}
            <div
              ref={mobileListRef}
              onScroll={handleMobileScroll}
              className="flex-1 overflow-y-auto px-3 py-4"
            >
              <div className="mb-3 flex items-center justify-between rounded-md bg-white p-3">
                <span className="text-[12px] text-slate-600">
                  Showing {filteredAndSortedLeads.length} of {leadsData?.pagination?.total || allLeads.length} leads
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
                {/* Loading indicator for infinite scroll */}
                {isLoadingMore && (
                  <div className="flex justify-center py-4">
                    <div className="text-sm text-slate-500">Loading more leads...</div>
                  </div>
                )}
                {/* End of list indicator */}
                {!hasMore && filteredAndSortedLeads.length > 0 && (
                  <div className="flex justify-center py-4">
                    <div className="text-sm text-slate-500">No more leads to load</div>
                  </div>
                )}
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
        dateFilter={dateFilter}
        onClose={() => setIsFilterOpen(false)}
        onSortChange={setSortOption}
        onDateFilterChange={handleDateFilterChange}
        onReset={resetFilters}
      />
    </>
  );
}
