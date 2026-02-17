"use client";

import { useParams, useRouter } from "next/navigation";
import { useEffect, useMemo } from "react";
import { useGetMyLeadsQuery } from "@/store/slice/myLeadSlice";
import { transformMyLeadToJobCard } from "@/lib/trade-person/myResponsesUtils";

export default function MyResponsesTabPage() {
  const params = useParams();
  const router = useRouter();
  const tab = (params.tab as string) || "pending";
  const jobId = params.jobId as string | undefined;

  // Fetch all my leads
  const { data: myLeadsData, isLoading } = useGetMyLeadsQuery({});

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

  const isPending = tab === "pending";
  const isHired = tab === "hired";

  const currentJobs = isHired ? [...inProgressJobs, ...completedJobs] : pendingJobs;
  const defaultJobId = currentJobs[0]?.id;

  // Redirect invalid tabs to pending
  useEffect(() => {
    if (!isPending && !isHired) {
      router.replace("/trade-person/my-responses/pending");
    }
  }, [isPending, isHired, router]);

  // Redirect to default job if no job selected, or to a placeholder if no jobs available
  useEffect(() => {
    if (!isLoading && !jobId && (isPending || isHired)) {
      if (defaultJobId) {
        router.replace(`/trade-person/my-responses/${tab}/${defaultJobId}`);
      } else {
        // If no jobs available, redirect to a placeholder route to show "No data available"
        router.replace(`/trade-person/my-responses/${tab}/no-data`);
      }
    }
  }, [jobId, defaultJobId, tab, router, isPending, isHired, isLoading]);

  // const selectedJob = jobId ? jobCardsMock.find((j) => j.id === jobId) : null;
  // const selectedLead = selectedJob ? selectedJob.lead : null;

  if (!isPending && !isHired) {
    return null;
  }

  return (

    <div className="flex h-[calc(100vh-120px)] gap-4">


      {/* Left Sidebar */}
      {/* <aside className="flex w-1/3 flex-col overflow-hidden rounded-lg border border-slate-200 bg-white">

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



          <div className="mt-4 flex gap-2">
            <Link
              href="/trade-person/my-responses/pending"
              className={`flex-1 rounded-md px-4 py-2 text-center text-[13px] font-semibold transition ${isPending
                  ? "bg-white text-primary"
                  : "bg-white/20 text-white hover:bg-white/30"
                }`}
            >
              Pending
            </Link>
            <Link
              href="/trade-person/my-responses/hired"
              className={`flex-1 rounded-md px-4 py-2 text-center text-[13px] font-semibold transition ${isHired
                  ? "bg-white text-primary"
                  : "bg-white/20 text-white hover:bg-white/30"
                }`}
            >
              Hired
            </Link>
          </div>
        </div>


        <div className="flex-1 overflow-y-auto px-4 py-4">
          {isHired && (
            <>
              {inProgressJobs.length > 0 && (
                <div className="mb-4">
                  <h3 className="mb-2 text-[14px] font-semibold text-primaryText">
                    Job In Progress
                  </h3>
                  <div className="space-y-3">
                    {inProgressJobs.map((job) => (
                      <Link
                        key={job.id}
                        href={`/trade-person/my-responses/hired/${job.id}`}
                      >
                        <button
                          type="button"
                          className={`w-full rounded-lg border p-4 text-left transition ${job.id === jobId
                              ? "border-primary bg-primary/5"
                              : "border-slate-200 bg-white hover:bg-slate-50"
                            }`}
                        >
                          <div className="flex items-center justify-between">
                            <span className="text-[12px] text-slate-600">{job.title}</span>
                            <span className="text-[11px] text-slate-500">{job.dateLabel}</span>
                          </div>
                          <div className="mt-2 text-[14px] font-semibold text-primaryText">
                            You&apos;ve Been Hired!
                          </div>
                          <p className="mt-1 text-[12px] text-slate-600">
                            Congratulations! A customer has hired you for their request. Please check
                            the job details and prepare to proceed.
                          </p>
                        </button>
                      </Link>
                    ))}
                  </div>
                </div>
              )}

              {completedJobs.length > 0 && (
                <div>
                  <h3 className="mb-2 text-[14px] font-semibold text-primaryText">
                    Completed job
                  </h3>
                  <div className="space-y-3">
                    {completedJobs.map((job) => (
                      <Link
                        key={job.id}
                        href={`/trade-person/my-responses/hired/${job.id}`}
                      >
                        <button
                          type="button"
                          className={`w-full rounded-lg border p-4 text-left transition ${job.id === jobId
                              ? "border-primary bg-primary/5"
                              : "border-slate-200 bg-white hover:bg-slate-50"
                            }`}
                        >
                          <div className="flex items-center justify-between">
                            <span className="text-[12px] font-medium text-emerald-700">
                              {job.title}
                            </span>
                            <span className="text-[11px] text-slate-500">{job.dateLabel}</span>
                          </div>
                          <div className="mt-2 text-[14px] font-semibold text-primaryText">
                            You&apos;ve Been Hired!!
                          </div>
                          <p className="mt-1 text-[12px] text-slate-600">
                            Congratulations! A customer has hired you for their request. Please check
                            the job details and prepare to proceed.
                          </p>
                        </button>
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </>
          )}

          {isPending && (
            <>
              {pendingJobs.length > 0 ? (
                <div className="space-y-3">
                  {pendingJobs.map((job) => (
                    <Link
                      key={job.id}
                      href={`/trade-person/my-responses/pending/${job.id}`}
                    >
                      <button
                        type="button"
                        className={`w-full rounded-lg border p-4 text-left transition ${job.id === jobId
                            ? "border-primary bg-primary/5"
                            : "border-slate-200 bg-white hover:bg-slate-50"
                          }`}
                      >
                        <div className="flex items-center justify-between">
                          <span className="text-[12px] text-slate-600">{job.title}</span>
                          <span className="text-[11px] text-slate-500">{job.dateLabel}</span>
                        </div>
                        <div className="mt-2 text-[14px] font-semibold text-primaryText">
                          Waiting for Response
                        </div>
                        <p className="mt-1 text-[12px] text-slate-600">
                          Your response has been sent. Waiting for customer to review and respond.
                        </p>
                      </button>
                    </Link>
                  ))}
                </div>
              ) : (
                <div className="text-center text-slate-500">No pending jobs</div>
              )}
            </>
          )}
        </div>
      </aside> */}

      {/* Right Panel - Lead Details */}
      {/* <div className="flex-1 w-2/3 overflow-y-auto">
        {selectedLead ? (
          <LeadDetailPanel lead={selectedLead} source="my-responses" tab={tab as "pending" | "hired"} />
        ) : (
          <div className="flex h-[600px] items-center justify-center rounded-lg border border-slate-200 bg-white">
            <p className="text-slate-500">Select a job to view details</p>
          </div>
        )}
      </div> */}

    </div>
  );
}
