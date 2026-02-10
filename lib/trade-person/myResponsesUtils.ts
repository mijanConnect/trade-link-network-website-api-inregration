import type { MyLeadResponse } from "@/store/slice/myLeadSlice";
import type { Lead, LeadHighlight } from "@/lib/trade-person/mock";
import { formatDateTime } from "@/app/utils/TimeDateFormat";
import { formatTimeAgo } from "./leadUtils";

const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || "";

export type JobCard = {
  id: string;
  type: "in-progress" | "completed" | "pending";
  title: string;
  dateLabel: string;
  leadId: string; // jobPost._id to fetch full lead details
  completedAt: string | null;
  createdAt: string;
};

/**
 * Transform MyLeadResponse to JobCard format
 */
export function transformMyLeadToJobCard(myLead: MyLeadResponse): JobCard {
  const isPending = myLead.status === "PENDING";
  const isAccepted = myLead.status === "ACCEPTED";
  const isCompleted = isAccepted && myLead.completedAt !== null;
  const isInProgress = isAccepted && myLead.completedAt === null;

  let type: "in-progress" | "completed" | "pending" = "pending";
  let title = "Response Sent";
  let dateLabel = formatDateTime(myLead.createdAt);

  if (isPending) {
    type = "pending";
    title = "Response Sent";
    dateLabel = formatDateTime(myLead.createdAt);
  } else if (isCompleted) {
    type = "completed";
    title = "Successfully Completed";
    dateLabel = formatDateTime(myLead.completedAt!);
  } else if (isInProgress) {
    type = "in-progress";
    title = "Job Request Accepted";
    dateLabel = formatDateTime(myLead.createdAt);
  }

  return {
    id: myLead._id,
    type,
    title,
    dateLabel,
    leadId: myLead.jobPost._id,
    completedAt: myLead.completedAt,
    createdAt: myLead.createdAt,
  };
}

/**
 * Transform MyLeadResponse (with creator) to Lead format for display
 * This is used when fetching a single job request detail
 */
export function transformMyLeadDetailToLead(myLead: MyLeadResponse): Lead {
  const jobDetails = myLead.jobPost.answeredQuestions.map((q) => ({
    label: q.questionText,
    value: q.answerText,
  }));

  // Build highlights
  const highlights: LeadHighlight[] = [];
  if (myLead.creator?.isPhoneVerified) {
    highlights.push("Verified Phone");
  }
  // Note: isFrequent and isUrgent are not available in MyLeadResponse
  // They would need to be added to the API response if needed

  // Get customer info from creator
  const customerName = myLead.creator?.name || "Customer";
  const customerAddress = myLead.creator?.customer?.address || "";
  const profileImage = myLead.creator?.customer?.profileImage;
  const customerAvatar = profileImage
    ? `${baseUrl}${profileImage}`
    : "/assets/avatar.png";

  // Determine status
  let status: "locked" | "unlocked" | "hired" | "completed" = "unlocked";
  if (myLead.status === "ACCEPTED") {
    status = myLead.completedAt ? "completed" : "hired";
  } else if (myLead.status === "PENDING") {
    status = "unlocked";
  }

  // Format budget from answered questions
  const budgetAnswer = jobDetails.find((d) =>
    d.label.toLowerCase().includes("budget")
  )?.value || "Not specified";

  // Create summary from job details
  const summary = jobDetails
    .slice(0, 3)
    .map((d) => `${d.label}: ${d.value}`)
    .join(" / ");

  return {
    id: myLead.jobPost._id,
    customerName,
    customerAddress,
    customerAvatar,
    createdAtLabel: formatTimeAgo(myLead.createdAt),
    title: myLead.jobPost.service.name,
    summary,
    budgetLabel: budgetAnswer,
    status,
    priceLabel: "£0.00", // Price not available in job request response
    highlights,
    jobDetails,
    responsesCount: 0, // Not available in job request response
  };
}

/**
 * Create a minimal Lead object from MyLeadResponse for display
 * Note: This is a temporary solution. In production, you should fetch
 * the full lead details using jobPost._id via getSingleLeadQuery
 */
export function createMinimalLeadFromMyLead(
  myLead: MyLeadResponse,
  fullLead?: Lead
): Lead {
  // If we have full lead data, use it
  if (fullLead) {
    return fullLead;
  }

  // If creator is available, use the detailed transformation
  if (myLead.creator) {
    return transformMyLeadDetailToLead(myLead);
  }

  // Otherwise, create minimal lead from available data
  const jobDetails = myLead.jobPost.answeredQuestions.map((q) => ({
    label: q.questionText,
    value: q.answerText,
  }));

  return {
    id: myLead.jobPost._id,
    customerName: "Customer", // Will be replaced when full lead is fetched
    customerAddress: "", // Will be replaced when full lead is fetched
    customerAvatar: "/assets/avatar.png",
    createdAtLabel: formatTimeAgo(myLead.createdAt),
    title: myLead.jobPost.service.name,
    summary: jobDetails.map((d) => `${d.label}: ${d.value}`).join(", "),
    budgetLabel: jobDetails.find((d) =>
      d.label.toLowerCase().includes("budget")
    )?.value || "Not specified",
    status: myLead.status === "PENDING" ? "unlocked" : "hired",
    priceLabel: "£0.00",
    highlights: [],
    jobDetails,
    responsesCount: 0,
  };
}
