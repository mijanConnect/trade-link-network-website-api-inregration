import Services from "@/app/components/categories/Services";
import { getMetadata } from "@/components/homeowners/MetadataConfig";

export const metadata = getMetadata("categories");

export default function Page() {
  return (
    <>
      <div className="container mx-auto px-4 my-6 lg:mt-15 lg:mb-30">
        <Services />
      </div>
    </>
  );
}
