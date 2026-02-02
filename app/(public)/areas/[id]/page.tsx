import AreaDetails from "@/app/components/area/AreaDetails";
import CTA from "@/app/components/ui/CTA";

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return (
    <>
      <div className="my-6 lg:mt-15 lg:mb-30">
        <AreaDetails areaId={id} />
        <div className="mt-8 lg:mt-30">
          <CTA />
        </div>
      </div>
    </>
  );
}
