import JobCard from "./JobCard";

const jobs = [
  {
    id: "job-001",
    title: "Full garden renovation",
    postedOn: "Posted 14 Jan, 2026",
    description:
      "Transform your outdoor space from the ground up with our full garden renovation service. We handle everything from initial design and layout planning to soil preparation, planting, lawn installation, paving, lighting, and finishing touches. Whether you want a modern, low-maintenance garden or a lush green retreat, we create a beautiful, functional space tailored to your style and needs.",
    actions: [
      {
        label: "Close Post",
        variant: "outline" as const,
        className:
          "border-red-500 text-red-500 hover:bg-red-500 hover:text-white hover:border-red-500",
      },
      { label: "View Details", variant: "primary" as const },
    ],
  },
  {
    id: "job-002",
    title: "Bathroom tiling + plumbing",
    postedOn: "Posted 12 Jan, 2026",
    description:
      "Complete bathroom tiling and plumbing services delivered with precision and care. We install wall and floor tiles, repair or replace plumbing lines, fit sanitary fixtures, and ensure proper water flow and drainage for a durable, clean, and modern finish.",
    actions: [
      {
        label: "Close Post",
        variant: "outline" as const,
        className:
          "border-red-500 text-red-500 hover:bg-red-500 hover:text-white hover:border-red-500",
      },
      { label: "View Details", variant: "primary" as const },
    ],
  },
  {
    id: "job-003",
    title: "2-bedroom interior painting",
    postedOn: "Posted 10 Jan, 2026",
    description:
      "Painters notified. Expect interest soon; review color palette before confirming.",
    actions: [
      {
        label: "Close Post",
        variant: "outline" as const,
        className:
          "border-red-500 text-red-500 hover:bg-red-500 hover:text-white hover:border-red-500",
      },
      { label: "View Details", variant: "primary" as const },
    ],
  },
  {
    id: "job-004",
    title: "Electrical safety inspection",
    postedOn: "Posted 08 Jan, 2026",
    description:
      "Licensed electricians will reach out to confirm appointment slots.",
    actions: [
      {
        label: "Close Post",
        variant: "outline" as const,
        className:
          "border-red-500 text-red-500 hover:bg-red-500 hover:text-white hover:border-red-500",
      },
      { label: "View Details", variant: "primary" as const },
    ],
  },
];

export default function PendingJobs() {
  return (
    <div>
      <div className="flex flex-col gap-6">
        {jobs.map((job) => (
          <JobCard
            key={job.id}
            id={job.id}
            title={job.title}
            postedOn={job.postedOn}
            description={job.description}
            actions={job.actions}
          />
        ))}
      </div>
    </div>
  );
}
