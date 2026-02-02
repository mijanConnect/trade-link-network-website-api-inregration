import ServiceList from "../ui/ServiceList";
import { locations } from "./Location";

export default function Areas() {
  return (
    <>
      <div>
        <h2 className="text-[24px] lg:text-[48px] font-semibold text-primaryText mb-4 lg:mb-12 text-center">
          Area Covered
        </h2>

        <h3 className="text-[20px] lg:text-[32px] font-bold text-center text-primaryTextLight">
          Areas we cover for Services
        </h3>

        <div className="mt-4 lg:mt-8">
          <ServiceList locations={locations} route="areas" />
        </div>
      </div>
    </>
  );
}
