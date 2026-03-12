import Areas from "@/app/components/area/Areas";
import AreaSEOContent from "@/app/components/area/AreaSEOContent";

export default function Page() {
  return (
    <>
      <div className="container mx-auto px-4 my-6 lg:mt-15 lg:mb-30">
        <Areas />
        <AreaSEOContent />
      </div>
    </>
  );
}
