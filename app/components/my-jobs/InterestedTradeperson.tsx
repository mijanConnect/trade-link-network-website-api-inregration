"use client";

import { useRouter } from "next/navigation";
import JobCard from "./JobCard";

const jobs = [
  {
    id: "job-002",
    title: "Bathroom tiling + plumbing",
    postedOn: "Posted 12 Jan, 2026",
    description:
      "Complete bathroom tiling and plumbing services delivered with precision and care. We install wall and floor tiles, repair or replace plumbing lines, fit sanitary fixtures, and ensure proper water flow and drainage for a durable, clean, and modern finish.",
    actions: [
      { label: "View Profile", variant: "outline" as const },
      { label: "Accept Request", variant: "primary" as const },
    ],
  },
  {
    id: "job-003",
    title: "2-bedroom interior painting",
    postedOn: "Posted 10 Jan, 2026",
    description:
      "Painters notified. Expect interest soon; review color palette before confirming.",
    actions: [
      { label: "View Profile", variant: "outline" as const },
      { label: "Accept Request", variant: "primary" as const },
    ],
  },
  {
    id: "job-004",
    title: "Electrical safety inspection",
    postedOn: "Posted 08 Jan, 2026",
    description:
      "Licensed electricians will reach out to confirm appointment slots.",
    actions: [
      { label: "View Profile", variant: "outline" as const },
      { label: "Accept Request", variant: "primary" as const },
    ],
  },
  {
    id: "job-005",
    title: "Kitchen cabinetry install",
    postedOn: "Posted 05 Jan, 2026",
    description:
      "Share final measurements to speed up quoting from interested carpenters.",
    actions: [
      { label: "View Profile", variant: "outline" as const },
      { label: "Accept Request", variant: "primary" as const },
    ],
  },
];

export default function InterestedTradeperson() {
  const router = useRouter();

  const handleViewProfile = () => {
    router.push("/provider-profile");
  };

  return (
    <div className="flex flex-col gap-6">
      {jobs.map((job) => (
        <JobCard
          key={job.id}
          title={job.title}
          postedOn={job.postedOn}
          description={
            "Verified professionals have responded to your request. Compare their profiles and book with confidence."
          }
          actions={job.actions.map((action) =>
            action.label === "View Profile"
              ? { ...action, onClick: handleViewProfile }
              : action,
          )}
        />
      ))}
    </div>
  );
}
