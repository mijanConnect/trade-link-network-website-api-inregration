import Services from "@/app/components/services/Services";
import { getMetadata } from "@/components/homeowners/MetadataConfig";

export const metadata = getMetadata("services");

export default function Page() {
  return (
    <>
      <div className="container mx-auto px-4 my-6 lg:mt-15 lg:mb-30">
        <Services />
      </div>
    </>
  );
}
