import JobDetails from "@/app/components/my-jobs/JobDetails";
import { notFound } from "next/navigation";

type ViewJobDetailsPageProps = {
  params: Promise<{ id: string }>;
};

export default async function ViewJobDetailsPage({
  params,
}: ViewJobDetailsPageProps) {
  const { id } = await params;

  if (!id) {
    notFound();
  }

  return (
    <div className="container mx-auto px-4 my-6 lg:mt-15 lg:mb-30">
      <h1 className="text-[28px] md:text-[40px] font-bold text-primaryText mb-4 lg:mb-6">
        My Jobs
      </h1>
      <JobDetails />
    </div>
  );
}
