"use client";

import PopularServices from "./PopularServices";
import { locations } from "./Location";
import Button from "../ui/Button";
import { useRouter } from "next/navigation";
import Steps from "../ui/Steps";

export default function AreaDetails({ areaId }: { areaId: string }) {
  const selectedLocation = locations.find((loc) => loc.slug === areaId);
  const areas = selectedLocation?.areas || [];
  const router = useRouter();
  const popularTowns = [
    "Mansfield",
    "Chesterfield",
    "Loughborough",
    "Kettering",
    "Corby",
    "Grantham",
    "Newark-on-Trent",
  ];

  return (
    <>
      <div className="container mx-auto px-4">
        <div className="mb-8 lg:mb-25">
          <h2 className="text-[22px] lg:text-[40px] font-bold text-primaryText">
            Find Trusted Tradespeople in {selectedLocation?.name || "Your Area"}
          </h2>
          <p className="text-[14px] lg:text-[18px] text-primaryTextLight mt-4 lg:mt-10">
            Trade Link Network is a UK-wide marketplace that connects homeowners
            with verified tradespeople across{" "}
            {selectedLocation?.name || "your area"}. Whether you need
            landscaping, building work, repairs, or specialist services, our
            platform helps you reach suitable professionals in your area and
            manage everything online
          </p>

          <div className="mt-6">
            <h4 className="text-[22px] lg:text-[24px] font-semibold text-primaryText mb-2 lg:mb-2">
              Areas included in {selectedLocation?.name || "Your Area"}:
            </h4>
            <ul className="flex flex-col gap-2">
              {areas.map((area) => (
                <li
                  key={area.id}
                  className="text-[14px] lg:text-[18px] text-primaryText font-bold list-disc list-inside"
                >
                  {area.name}
                </li>
              ))}
            </ul>
          </div>
          <p className="text-[14px] lg:text-[18px] text-primaryTextLight mt-4 lg:mt-10">
            We work with homeowners and tradespeople across the{" "}
            {selectedLocation?.name || "your area"}, including major centres
            such as Nottingham, Leicester, Derby and Northampton, as well as
            surrounding towns and rural areas.
          </p>

          <div className="mt-6">
            <h4 className="text-[22px] lg:text-[24px] font-semibold text-primaryText mb-2 lg:mb-2">
              Popular towns we commonly see jobs from include:
            </h4>
            <ul className="flex flex-col gap-2">
              {popularTowns.map((town) => (
                <li
                  key={town}
                  className="text-[14px] lg:text-[18px] text-primaryText font-bold list-disc list-inside"
                >
                  {town}
                </li>
              ))}
            </ul>
          </div>

          <Button
            className="mt-6 lg:mt-10"
            onClick={() => router.push("/post-service")}
          >
            Post a Job in {selectedLocation?.name || "your area"}
          </Button>

          <div>
            <h3 className="text-[22px] lg:text-[24px] font-semibold text-primaryText mt-6 mb-2 lg:mt-12 lg:mb-6">
              Services Available in This Region
            </h3>
            <h4 className="text-[18px] lg:text-[20px] font-medium text-primaryText mb-4 lg:mb-6">
              Popular services requested in{" "}
              {selectedLocation?.name || "your area"} include:
            </h4>
            <PopularServices />
          </div>

          {/* <div className="flex justify-center">
            <Button
              className="mt-6 lg:mt-10"
              onClick={() => router.push("/post-service")}
            >
              Post a Job in {selectedLocation?.name || "your area"}
            </Button>
          </div> */}
        </div>
      </div>
      <Steps />
    </>
  );
}
