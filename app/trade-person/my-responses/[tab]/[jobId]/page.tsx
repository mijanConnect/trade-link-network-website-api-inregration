"use client";

import { useParams, useRouter } from "next/navigation";
import { useEffect, useState, useRef, useMemo } from "react";
import LeadDetailPanel from "@/app/components/trade-person/LeadDetailPanel";
import LeadDetailLoading from "@/app/components/trade-person/LeadDetailLoading";
import type { Lead } from "@/lib/trade-person/mock";
import { Briefcase, MapPin, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { useGetMyLeadsQuery, useGetMyLeadDetailsQuery } from "@/store/slice/myLeadSlice";
import { transformMyLeadToJobCard, transformMyLeadDetailToLead } from "@/lib/trade-person/myResponsesUtils";

export default function MyResponsesJobPage() {
  const params = useParams();
  const router = useRouter();
  const tab = (params.tab as string) || "pending";
  const jobId = params.jobId as string;

  // Fetch all my leads
  const { data: myLeadsData, isLoading: isLoadingMyLeads } = useGetMyLeadsQuery({});

  // Transform API data to JobCard format
  const jobCards = useMemo(() => {
    if (!myLeadsData?.data) return [];
    return myLeadsData.data.map(transformMyLeadToJobCard);
  }, [myLeadsData]);

  // Filter jobs by type
  const inProgressJobs = useMemo(
    () => jobCards.filter((j) => j.type === "in-progress"),
    [jobCards]
  );
  const completedJobs = useMemo(
    () => jobCards.filter((j) => j.type === "completed"),
    [jobCards]
  );
  const pendingJobs = useMemo(
    () => jobCards.filter((j) => j.type === "pending"),
    [jobCards]
  );

  const isNoDataPlaceholder = jobId === "no-data";
  const selectedJob = isNoDataPlaceholder ? null : jobCards.find((j) => j.id === jobId);

  // Fetch job request details for the selected job
  const {
    data: jobRequestData,
    isLoading: isLoadingLead,
  } = useGetMyLeadDetailsQuery(jobId || "", {
    skip: !jobId || isNoDataPlaceholder,
  });

  // Transform job request to Lead format
  const selectedLead = useMemo(() => {
    if (!jobRequestData) return null;
    return transformMyLeadDetailToLead(jobRequestData);
  }, [jobRequestData]);

  const isPending = tab === "pending";
  const isHired = tab === "hired";

  // Mobile state: start with current URL job id if present
  const [showDetailOnMobile, setShowDetailOnMobile] = useState(false);
  const [mobileSelectedJobId, setMobileSelectedJobId] = useState<string | null>(
    jobId || null,
  );
  const [isTabChanging, setIsTabChanging] = useState(false);
  const tabChangeTimerRef = useRef<NodeJS.Timeout | null>(null);
  const prevTabRef = useRef<string>(tab);

  // Fetch job request details for mobile selected job
  const {
    data: mobileJobRequestData,
    isLoading: isLoadingMobileLead,
  } = useGetMyLeadDetailsQuery(mobileSelectedJobId || "", {
    skip: !mobileSelectedJobId,
  });

  const mobileSelectedLead: Lead | null = useMemo(() => {
    if (!mobileJobRequestData) return null;
    return transformMyLeadDetailToLead(mobileJobRequestData);
  }, [mobileJobRequestData]);
  
  // Derive loading state from query states
  const isLoading = isLoadingLead || isLoadingMobileLead;

  useEffect(() => {
    if (!isLoadingMyLeads && (!isPending && !isHired)) {
      // Redirect invalid tabs to pending
      router.replace("/trade-person/my-responses/pending");
      return;
    }
    // If selected job not found but tab has jobs, redirect to first available job
    if (!isLoadingMyLeads && !selectedJob && (isPending || isHired)) {
      const currentJobs = isHired ? [...inProgressJobs, ...completedJobs] : pendingJobs;
      const firstJob = currentJobs[0];
      if (firstJob) {
        router.replace(`/trade-person/my-responses/${tab}/${firstJob.id}`);
      }
      // If no jobs available, stay on current page to show "No data available" message
    }
  }, [selectedJob, isPending, isHired, router, isLoadingMyLeads, inProgressJobs, completedJobs, pendingJobs, tab]);

  // Handle tab change with smooth loading - no UI jump
  useEffect(() => {
    // Check if tab actually changed
    if (prevTabRef.current !== tab) {
      // Clear any existing timers
      if (tabChangeTimerRef.current) {
        clearTimeout(tabChangeTimerRef.current);
        tabChangeTimerRef.current = null;
      }

      // Don't show loading immediately - let content transition smoothly
      // Only show a brief loading overlay if needed
      tabChangeTimerRef.current = setTimeout(() => {
        setIsTabChanging(false);
        tabChangeTimerRef.current = null;
      }, 150); // Quick transition, no visible loading needed

      // Update previous tab immediately
      prevTabRef.current = tab;

      return () => {
        if (tabChangeTimerRef.current) {
          clearTimeout(tabChangeTimerRef.current);
          tabChangeTimerRef.current = null;
        }
      };
    }

    return () => {
      if (tabChangeTimerRef.current) {
        clearTimeout(tabChangeTimerRef.current);
        tabChangeTimerRef.current = null;
      }
    };
  }, [tab]);


  if (isLoadingMyLeads) {
    return (
      <div className="flex h-[calc(100vh-120px)] items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
      </div>
    );
  }

  // Check if current tab has any jobs
  const currentTabJobs = isHired ? [...inProgressJobs, ...completedJobs] : pendingJobs;
  const hasJobsInTab = currentTabJobs.length > 0;

  return (
    <>
      {/* Desktop / Tablet layout (md+) */}
      <div className="hidden h-[calc(100vh-120px)]  md:flex">
        {/* Left Sidebar */}
        <aside className="flex w-1/3 flex-col overflow-hidden rounded-lg border border-slate-200 bg-white">
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

          <div >
               {/* Tabs */}
               <div className="p-4 flex gap-2 bg-tradeBg">
              <Link
                href="/trade-person/my-responses/pending"
                className={`flex-1 rounded px-4 py-6 text-center cursor-pointer text-[14px] font-semibold transition-all duration-200 ${isPending
                    ? "bg-primary text-white font-semibold"
                    : "bg-white text-black "
                  }`}
              >
                Pending
              </Link>
              <Link
                href="/trade-person/my-responses/hired"
                className={`flex-1 rounded px-4 py-6 text-center cursor-pointer text-[14px] transition-all duration-200 ${isHired
                    ? "bg-primary text-white font-semibold"
                    : "bg-white text-black "
                  }`}
              >
                Hired
              </Link>
            </div>
          </div>

          {/* Job List */}
          <div className="relative flex-1 overflow-y-auto px-4 py-4 bg-tradeBg">
            {/* Loading overlay - doesn't affect layout */}
            {isTabChanging && (
              <div className="absolute inset-0 z-10 flex items-center justify-center bg-tradeBg/80 backdrop-blur-sm transition-opacity duration-200">
                <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
              </div>
            )}
            {/* Content with smooth opacity transition */}
            <div className={`transition-opacity duration-200 ${isTabChanging ? "opacity-50" : "opacity-100"}`}>
            {isHired && (
              <>
                {inProgressJobs.length > 0 && (
                  <div className="mb-4">
                    <h3 className="mb-2 text-[14px] font-semibold text-primaryText">
                      Job In Progress
                    </h3>
                    <div className="space-y-3">
                      {inProgressJobs.map((job) => {
                        return (
                          <div key={job.id} className="space-y-4">
                            <Link
                              key={job.id}
                              href={`/trade-person/my-responses/hired/${job.id}`}
                            >
                              <button
                                type="button"
                                className={`w-full rounded-md p-4 text-left transition ${job.id === jobId
                                    ? "border-primary bg-background  border-2"
                                    : "border-slate-200 bg-white "
                                  }`}
                              >
                                <div className="flex items-center justify-between">
                                  <span className="text-[12px] text-slate-600">
                                    {job.title}
                                  </span>
                                  <span className="text-[11px] text-slate-500">
                                    {job.dateLabel}
                                  </span>
                                </div>
                                <div className="mt-2 text-[14px] font-semibold text-primaryText">
                                  You`ve Been Hired!
                                </div>
                                <p className="mt-1 text-[12px] text-slate-600">
                                  Congratulations! A customer has hired you for their
                                  request. Please check the job details and prepare to
                                  proceed.
                                </p>
                              </button>
                            </Link>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}

                {completedJobs.length > 0 && (
                  <div>
                    <h3 className="mb-2 text-[14px] font-semibold text-primaryText">
                      Completed job
                    </h3>
                    <div className="space-y-3">
                      {completedJobs.map((job) => {
                        return (
                          <div key={job.id} className="space-y-4">
                            <Link
                              key={job.id}
                              href={`/trade-person/my-responses/hired/${job.id}`}
                              className="transition-opacity duration-200"
                            >
                              <button
                                type="button"
                                className={`w-full rounded-md p-4 text-left transition ${job.id === jobId
                                    ? "border-primary bg-background  border-2"
                                    : "border-slate-200 bg-white "
                                  }`}
                              >
                                <div className="flex items-center justify-between">
                                  <span className="text-[12px] font-medium text-emerald-700">
                                    {job.title}
                                  </span>
                                  <span className="text-[11px] text-slate-500">
                                    {job.completedAt ? `Completed: ${job.dateLabel}` : job.dateLabel}
                                  </span>
                                </div>
                                <div className="mt-2 text-[14px] font-semibold text-primaryText">
                                  You&apos;ve Been Hired!!
                                </div>
                                <p className="mt-1 text-[12px] text-slate-600">
                                  Congratulations! A customer has hired you for their
                                  request. Please check the job details and prepare to
                                  proceed.
                                </p>
                              </button>
                            </Link>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}

                {inProgressJobs.length === 0 && completedJobs.length === 0 && (
                  <div className="flex items-center justify-center py-8">
                    <p className="text-center text-slate-500">No data available</p>
                  </div>
                )}
              </>
            )}

            {isPending && (
              <>
                {pendingJobs.length > 0 ? (
                  <div className="space-y-3">
                      {pendingJobs.map((job) => {
                        return (
                        <div key={job.id} className="space-y-4">
                          <Link
                            key={job.id}
                            href={`/trade-person/my-responses/pending/${job.id}`}
                            className="transition-opacity duration-200"
                          >
                            <button
                              type="button"
                              className={`w-full rounded-md p-4 text-left transition ${job.id === jobId
                                  ? "border-primary bg-background  border-2"
                                  : "border-slate-200 bg-white hover:bg-slate-50"
                                }`}
                            >
                              <div className="flex items-center justify-between">
                                <span className="text-[12px] text-slate-600">
                                  {job.title}
                                </span>
                                <span className="text-[11px] text-slate-500">
                                  {job.dateLabel}
                                </span>
                              </div>
                              <div className="mt-2 text-[14px] font-semibold text-primaryText">
                                Waiting for Response
                              </div>
                              <p className="mt-1 text-[12px] text-slate-600">
                                Your response has been sent. Waiting for customer to
                                review and respond.
                              </p>
                            </button>
                          </Link>
                        </div>
                      );
                    })}
                  </div>
                ) : (
                  <div className="flex items-center justify-center py-8">
                    <p className="text-center text-slate-500">No data available</p>
                  </div>
                )}
              </>
            )}
            </div>
          </div>
        </aside>

        {/* Right Panel - Lead Details */}
        <div className="flex-1 w-2/3 overflow-y-auto bg-background pl-4">
          <div className="relative min-h-[600px] transition-opacity duration-300">
            {isLoading ? (
              <div className="absolute inset-0 animate-fadeIn">
                <LeadDetailLoading />
              </div>
            ) : !hasJobsInTab ? (
              <div className="flex h-[600px] items-center justify-center rounded-lg border border-slate-200 bg-white">
                <p className="text-slate-500">No data available</p>
              </div>
            ) : selectedLead ? (
              <div className="animate-fadeIn">
                <LeadDetailPanel 
                  lead={selectedLead} 
                  source="my-responses" 
                  tab={tab as "pending" | "hired"}
                  createdAt={jobRequestData?.createdAt}
                  jobId={selectedLead?.id}
                />
              </div>
            ) : (
              <div className="flex h-[600px] items-center justify-center rounded-lg border border-slate-200 bg-white">
                <p className="text-slate-500">No data available</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile layout (under md) */}
      <div className="block h-[calc(100vh-120px)] md:hidden">
        {/* List view (default) */}
        {!showDetailOnMobile && (
          <div className="flex h-full flex-col overflow-hidden border border-slate-200 bg-white">
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

              {/* Tabs */}
              <div className="mt-4 flex gap-2">
                <Link
                  href="/trade-person/my-responses/pending"
                  className={`flex-1 rounded-md px-3 py-2 text-center text-[12px] font-semibold transition-all duration-200 ${isPending
                      ? "bg-white text-primary"
                      : "bg-white/20 text-white hover:bg-white/30"
                    }`}
                >
                  Pending
                </Link>
                <Link
                  href="/trade-person/my-responses/hired"
                  className={`flex-1 rounded-md px-3 py-2 text-center text-[12px] font-semibold transition-all duration-200 ${isHired
                      ? "bg-white text-primary"
                      : "bg-white/20 text-white hover:bg-white/30"
                    }`}
                >
                  Hired
                </Link>
              </div>
            </div>

            {/* Job List */}
            <div className="relative flex-1 overflow-y-auto px-3 py-4">
              {/* Loading overlay - doesn't affect layout */}
              {isTabChanging && (
                <div className="absolute inset-0 z-10 flex items-center justify-center bg-white/80 backdrop-blur-sm transition-opacity duration-200">
                  <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
                </div>
              )}
              {/* Content with smooth opacity transition */}
              <div className={`transition-opacity duration-200 ${isTabChanging ? "opacity-50" : "opacity-100"}`}>
              {isHired && (
                <>
                  {inProgressJobs.length > 0 && (
                    <div className="mb-4">
                      <h3 className="mb-2 text-[13px] font-semibold text-primaryText">
                        Job In Progress
                      </h3>
                      <div className="space-y-3">
                        {inProgressJobs.map((job) => {
                          return (
                            <button
                              key={job.id}
                              type="button"
                              onClick={() => {
                                // Don't set loading immediately - let useEffect handle it smoothly
                                setMobileSelectedJobId(job.id);
                                setShowDetailOnMobile(true);
                              }}
                              className={`w-full rounded-lg border p-3 text-left transition-opacity duration-200 ${job.id === mobileSelectedJobId
                                  ? "border-primary bg-primary/5"
                                  : "border-slate-200 bg-white hover:bg-slate-50"
                                }`}
                            >
                              <div className="flex items-center justify-between">
                                <span className="text-[12px] text-slate-600">
                                  {job.title}
                                </span>
                                <span className="text-[11px] text-slate-500">
                                  {job.dateLabel}
                                </span>
                              </div>
                              <div className="mt-2 text-[13px] font-semibold text-primaryText">
                                You&apos;ve Been Hired!
                              </div>
                              <p className="mt-1 text-[11px] text-slate-600">
                                Congratulations! A customer has hired you for their
                                request.
                              </p>
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  )}

                  {completedJobs.length > 0 && (
                    <div>
                      <h3 className="mb-2 text-[13px] font-semibold text-primaryText">
                        Completed job
                      </h3>
                      <div className="space-y-3">
                        {completedJobs.map((job) => {
                          return (
                            <button
                              key={job.id}
                              type="button"
                              onClick={() => {
                                // Don't set loading immediately - let useEffect handle it smoothly
                                setMobileSelectedJobId(job.id);
                                setShowDetailOnMobile(true);
                              }}
                              className={`w-full rounded-lg border p-3 text-left transition-opacity duration-200 ${job.id === mobileSelectedJobId
                                  ? "border-primary bg-primary/5"
                                  : "border-slate-200 bg-white hover:bg-slate-50"
                                }`}
                            >
                              <div className="flex items-center justify-between">
                                <span className="text-[12px] font-medium text-emerald-700">
                                  {job.title}
                                </span>
                                <span className="text-[11px] text-slate-500">
                                  {job.completedAt ? `Completed: ${job.dateLabel}` : job.dateLabel}
                                </span>
                              </div>
                              <div className="mt-2 text-[13px] font-semibold text-primaryText">
                                You&apos;ve Been Hired!!
                              </div>
                              <p className="mt-1 text-[11px] text-slate-600">
                                Congratulations! A customer has hired you for their
                                request.
                              </p>
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  )}

                  {inProgressJobs.length === 0 && completedJobs.length === 0 && (
                    <div className="flex items-center justify-center py-8">
                      <p className="text-center text-slate-500">No data available</p>
                    </div>
                  )}
                </>
              )}

              {isPending && (
                <>
                  {pendingJobs.length > 0 ? (
                    <div>
                      <div className="space-y-3">
                      {pendingJobs.map((job) => {
                        return (
                          <button
                            key={job.id}
                            type="button"
                            onClick={() => {
                              setMobileSelectedJobId(job.id);
                              setShowDetailOnMobile(true);
                            }}
                            className={`w-full rounded-lg border p-3 text-left transition ${job.id === mobileSelectedJobId
                                ? "border-primary bg-primary/5"
                                : "border-slate-200 bg-white hover:bg-slate-50"
                              }`}
                          >
                            <div className="flex items-center justify-between">
                              <span className="text-[12px] text-slate-600">
                                {job.title}
                              </span>
                              <span className="text-[11px] text-slate-500">
                                {job.dateLabel}
                              </span>
                            </div>
                            <div className="mt-2 text-[13px] font-semibold text-primaryText">
                              Waiting for Response
                            </div>
                            <p className="mt-1 text-[11px] text-slate-600">
                              Your response has been sent. Waiting for customer to
                              review and respond.
                            </p>
                          </button>
                        );
                      })}
                    </div>
                    </div>
                  ) : (
                    <div className="flex items-center justify-center py-8">
                      <p className="text-center text-slate-500">No data available</p>
                    </div>
                  )}
                </>
              )}
              </div>
            </div>
          </div>
        )}

        {/* Detail view */}
        {showDetailOnMobile && mobileSelectedLead && (
          <div className="flex h-full flex-col overflow-hidden bg-background">
            {/* Back button */}
            <div className="flex items-center gap-2 border-b border-slate-200 bg-white px-4 py-3">
              <button
                type="button"
                onClick={() => setShowDetailOnMobile(false)}
                className="flex items-center gap-2 text-sm font-medium text-primary"
              >
                <ArrowLeft className="h-4 w-4" />
                <span>{mobileSelectedLead.customerName}</span>
              </button>
            </div>

            <div className="flex-1 overflow-y-auto px-3 py-4">
              <div className="relative min-h-[400px] transition-opacity duration-300">
                {isLoading ? (
                  <div className="absolute inset-0 animate-fadeIn">
                    <LeadDetailLoading />
                  </div>
                ) : mobileSelectedLead ? (
                  <div className="animate-fadeIn">
                    <LeadDetailPanel 
                      lead={mobileSelectedLead} 
                      source="my-responses" 
                      tab={tab as "pending" | "hired"}
                      createdAt={mobileJobRequestData?.createdAt}
                      jobId={mobileSelectedLead?.id}
                    />
                  </div>
                ) : (
                  <div className="flex h-[400px] items-center justify-center rounded-lg border border-slate-200 bg-white">
                    <p className="text-slate-500">No data available</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
