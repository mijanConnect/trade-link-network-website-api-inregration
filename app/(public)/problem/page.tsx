"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import Button from "@/app/components/ui/Button";
import { CustomSelect } from "@/app/components/ui/CustomSelect";
import {
  useGetGuideDropdownLocationsQuery,
  useGetGuideDropdownServicesQuery,
} from "@/store/slice/costSlice";

const GUIDE_TYPE = "problem";

export default function ProblemLandingPage() {
  const router = useRouter();
  const [selectedServiceId, setSelectedServiceId] = useState("");
  const [selectedServiceSlug, setSelectedServiceSlug] = useState("");
  const [selectedLocationSlug, setSelectedLocationSlug] = useState("");

  const { data: serviceOptions = [], isLoading: isLoadingServices } =
    useGetGuideDropdownServicesQuery({ type: GUIDE_TYPE });

  const { data: locationOptions = [], isLoading: isLoadingLocations } =
    useGetGuideDropdownLocationsQuery(
      { type: GUIDE_TYPE, serviceId: selectedServiceId },
      { skip: !selectedServiceId },
    );

  const canContinue = Boolean(selectedServiceSlug && selectedLocationSlug);

  const selectedServiceLabel = useMemo(
    () =>
      serviceOptions.find((item) => item._id === selectedServiceId)?.name ?? "",
    [serviceOptions, selectedServiceId],
  );

  const selectedLocationLabel = useMemo(
    () =>
      locationOptions.find((item) => item.slug === selectedLocationSlug)
        ?.name ?? "",
    [locationOptions, selectedLocationSlug],
  );

  return (
    <section className="min-h-screen bg-gray-50">
      <div className="bg-primary text-white">
        <div className="container mx-auto px-4 py-16 lg:py-24">
          <p className="mb-3 text-sm uppercase tracking-[0.25em] text-slate-300">
            Problem guide
          </p>
          <h1 className="max-w-4xl text-3xl font-bold leading-tight lg:text-6xl">
            Select service and location to view problem details.
          </h1>
          <p className="mt-4 max-w-4xl text-base text-slate-300 lg:text-lg">
            Choose a service and a location, then press{" "}
            <span className="font-semibold">View Problem Guide</span> to open
            the problem page.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12 lg:py-16">
        <div className="bg-white rounded-sm p-5 lg:p-10 shadow-[0_0_10px_rgba(0,0,0,0.05)]">
          <h2 className="text-xl lg:text-2xl font-semibold text-primaryText mb-6">
            Select Problem Guide Step by Step
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <CustomSelect
              label="Service"
              placeholder="Select service"
              searchPlaceholder="Search services..."
              searchable
              value={selectedServiceId || null}
              disabled={isLoadingServices}
              dropdownLayout="overlay"
              options={serviceOptions.map((item) => ({
                value: item._id,
                label: item.name,
              }))}
              onChange={(value) => {
                const selectedService = serviceOptions.find(
                  (item) => item._id === value,
                );
                setSelectedServiceId(value);
                setSelectedServiceSlug(selectedService?.slug ?? "");
                setSelectedLocationSlug("");
              }}
            />

            <CustomSelect
              label="Location"
              placeholder="Select location"
              searchPlaceholder="Search locations..."
              searchable
              value={selectedLocationSlug || null}
              disabled={!selectedServiceId || isLoadingLocations}
              dropdownLayout="overlay"
              options={locationOptions.map((item) => ({
                value: item.slug,
                label: item.name,
              }))}
              onChange={(value) => {
                setSelectedLocationSlug(value);
              }}
            />
          </div>

          <div className="mt-6 rounded-lg border border-primary bg-gray-100 p-4">
            <p className="text-sm text-primaryTextLight">
              <span className="font-semibold">Selected:</span>{" "}
              {[selectedServiceLabel, selectedLocationLabel]
                .filter(Boolean)
                .join(" / ") || "Please select service"}
            </p>
          </div>

          <div className="mt-6 lg:mt-10 flex flex-wrap items-center gap-3">
            <Button
              disabled={!canContinue}
              onClick={() => {
                if (!canContinue) return;
                router.push(
                  `/problem/${selectedServiceSlug}/${selectedLocationSlug}`,
                );
              }}
              className={`inline-flex h-13 items-center justify-center gap-2 rounded-md px-5 text-sm font-semibold transition-colors w-full ${
                canContinue
                  ? "bg-primary text-white hover:bg-[#122a4a]"
                  : "bg-primary/70 text-white pointer-events-none"
              }`}
            >
              View Problem Guide
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
