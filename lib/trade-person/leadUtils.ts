import type { Lead as ApiLead } from "@/store/slice/leadSlice";
import type { Lead as MockLead, LeadStatus, LeadHighlight } from "@/lib/trade-person/mock";

/**
 * Format ISO date string to "Xh ago" or "Xd ago" format
 */
export function formatTimeAgo(isoString: string): string {
  if (!isoString) return "";
  
  const date = new Date(isoString);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffMins = Math.floor(diffMs / 60000);
  const diffHours = Math.floor(diffMins / 60);
  const diffDays = Math.floor(diffHours / 24);

  if (diffMins < 60) {
    return `${diffMins}m ago`;
  } else if (diffHours < 24) {
    return `${diffHours}h ago`;
  } else if (diffDays === 1) {
    return "1d ago";
  } else {
    return `${diffDays}d ago`;
  }
}

/**
 * Get date bucket for filtering
 */
export function getDateBucketFromISO(isoString: string): "today" | "yesterday" | "last7" | "older" {
  if (!isoString) return "older";
  
  const date = new Date(isoString);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffHours = Math.floor(diffMs / 3600000);
  const diffDays = Math.floor(diffHours / 24);

  if (diffHours < 24) {
    return "today";
  } else if (diffDays === 1) {
    return "yesterday";
  } else if (diffDays <= 7) {
    return "last7";
  }
  return "older";
}

/**
 * Get minutes ago from ISO string for sorting
 */
export function getMinutesAgoFromISO(isoString: string): number {
  if (!isoString) return Number.MAX_SAFE_INTEGER;
  
  const date = new Date(isoString);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  return Math.floor(diffMs / 60000);
}

/**
 * Transform API Lead to Mock Lead format for UI components
 */
export function transformApiLeadToMockLead(apiLead: ApiLead): MockLead {
  const highlights: LeadHighlight[] = [];
  
  if (apiLead.creator?.isPhoneVerified) {
    highlights.push("Verified Phone");
  }
  if (apiLead.isFrequent) {
    highlights.push("Frequent User");
  }
  if (apiLead.isUrgent) {
    highlights.push("Urgent");
  }

  // Determine status based on API data
  let status: LeadStatus = "locked";
  if (apiLead.status === "COMPLETED") {
    status = "completed";
  } else if (apiLead.hiredProfessional) {
    status = "hired";
  } else if (apiLead.purchasedCount > 0) {
    // Check if current user has purchased (this would need user context)
    status = "unlocked";
  }

  // Format price
  const priceLabel = apiLead.leadPrice > 0 
    ? `£${apiLead.leadPrice.toFixed(2)}` 
    : "Free";

  // Format budget from answered questions
  const answeredQuestions = apiLead.answeredQuestions || [];
  const budgetAnswer = answeredQuestions.find(
    (q) => q.questionText?.toLowerCase().includes("budget")
  )?.answerText || "Not specified";

  // Format urgency
  const urgencyLabel = apiLead.isUrgent ? "Urgent" : "Normal";
  const budgetLabel = `${budgetAnswer} / ${urgencyLabel}`;

  // Create job details from answered questions
  const jobDetails = answeredQuestions.map((q) => ({
    label: q.questionText || "",
    value: q.answerText || "",
  }));

  // Get customer avatar
  const customerAvatar = apiLead.creator?.customer?.profileImage 
    ? `${process.env.NEXT_PUBLIC_API_BASE_URL || ""}${apiLead.creator.customer.profileImage}`
    : "/assets/avatar.png";

  // Format customer address
  const customerAddress = apiLead.postcode 
    ? `${apiLead.postcode} • ${apiLead.locationName || ""}`
    : apiLead.locationName || "";

  // Create summary from description (first 100 chars)
  const description = apiLead.description || "";
  const summary = description.length > 100
    ? `${description.substring(0, 100)}...`
    : description;

  return {
    id: apiLead._id || "",
    customerName: apiLead.creator?.name || "",
    customerAddress,
    customerAvatar,
    customerEmail: apiLead.creator?.email || "",
    createdAtLabel: formatTimeAgo(apiLead.createdAt || ""),
    title: apiLead.service?.name || "",
    summary,
    budgetLabel,
    status,
    priceLabel,
    highlights,
    jobDetails,
    responsesCount: apiLead.purchasedCount || 0,
  };
}
