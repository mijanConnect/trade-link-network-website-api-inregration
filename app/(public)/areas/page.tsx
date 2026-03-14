import Areas from "@/app/components/area/Areas";
import AreaSEOContent from "@/app/components/area/AreaSEOContent";
import { getMetadata } from "@/components/homeowners/MetadataConfig";

export const metadata = getMetadata("areas");

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
