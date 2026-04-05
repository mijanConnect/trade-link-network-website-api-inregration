"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { CustomSelect } from "@/app/components/ui/CustomSelect";
import {
  useGetRegionsQuery,
  useGetCountiesByRegionQuery,
  useGetCitiesByCountyQuery,
  useGetTownsByCityQuery,
} from "@/store/slice/locationSlice";

type ServiceLocationSelectorProps = {
  serviceSlug: string;
};

export default function ServiceLocationSelector({
  serviceSlug,
}: ServiceLocationSelectorProps) {
  const [selectedRegion, setSelectedRegion] = useState("");
  const [selectedCounty, setSelectedCounty] = useState("");
  const [selectedCity, setSelectedCity] = useState("");
  const [selectedTown, setSelectedTown] = useState("");

  // Fetch regions (always enabled)
  const { data: regionsData, isLoading: isLoadingRegions } =
    useGetRegionsQuery({});
  const regions = useMemo(() => regionsData?.data ?? [], [regionsData?.data]);

  // Fetch counties based on selected region
  const { data: countiesData, isLoading: isLoadingCounties } =
    useGetCountiesByRegionQuery(
      { regionId: selectedRegion },
      { skip: !selectedRegion },
    );
  const counties = useMemo(() => countiesData?.data ?? [], [countiesData?.data]);

  // Fetch cities based on selected county
  const { data: citiesData, isLoading: isLoadingCities } =
    useGetCitiesByCountyQuery(
      { countyId: selectedCounty },
      { skip: !selectedCounty },
    );
  const cities = useMemo(() => citiesData?.data ?? [], [citiesData?.data]);

  // Fetch towns based on selected city
  const { data: townsData, isLoading: isLoadingTowns } = useGetTownsByCityQuery(
    { cityId: selectedCity },
    { skip: !selectedCity },
  );
  const towns = useMemo(() => townsData?.data ?? [], [townsData?.data]);

  const region = useMemo(
    () => regions.find((item) => item._id === selectedRegion),
    [regions, selectedRegion],
  );

  const county = useMemo(
    () => counties.find((item) => item._id === selectedCounty),
    [counties, selectedCounty],
  );

  const city = useMemo(
    () => cities.find((item) => item._id === selectedCity),
    [cities, selectedCity],
  );

  const town = useMemo(
    () => towns.find((item) => item._id === selectedTown),
    [towns, selectedTown],
  );

  const selectedLocation = town ?? city ?? county ?? region;
  const selectedLocationSlug = selectedLocation
    ? selectedLocation.slug
    : "";
  const canContinue = Boolean(region);

  return (
    <div className="bg-white border border-primary rounded-xl p-5 lg:p-6">
      <h2 className="text-xl lg:text-2xl font-semibold text-primaryText mb-6">
        Select Location Step by Step
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <CustomSelect
          label="Region"
          placeholder="Select region"
          searchPlaceholder="Search regions..."
          searchable
          value={selectedRegion || null}
          disabled={isLoadingRegions}
          dropdownLayout="overlay"
          options={regions.map((item) => ({
            value: item._id,
            label: item.name,
          }))}
          onChange={(value) => {
            setSelectedRegion(value);
            setSelectedCounty("");
            setSelectedCity("");
            setSelectedTown("");
          }}
        />

        <CustomSelect
          label="County"
          placeholder="Select county"
          searchPlaceholder="Search counties..."
          searchable
          value={selectedCounty || null}
          disabled={!region || isLoadingCounties}
          dropdownLayout="overlay"
          options={counties.map((item) => ({
            value: item._id,
            label: item.name,
          }))}
          onChange={(value) => {
            setSelectedCounty(value);
            setSelectedCity("");
            setSelectedTown("");
          }}
        />

        <CustomSelect
          label="City"
          placeholder="Select city"
          searchPlaceholder="Search cities..."
          searchable
          value={selectedCity || null}
          disabled={!county || isLoadingCities}
          dropdownLayout="overlay"
          options={cities.map((item) => ({
            value: item._id,
            label: item.name,
          }))}
          onChange={(value) => {
            setSelectedCity(value);
            setSelectedTown("");
          }}
        />

        <CustomSelect
          label="Town"
          placeholder="Select town"
          searchPlaceholder="Search towns..."
          searchable
          value={selectedTown || null}
          disabled={!city || isLoadingTowns}
          dropdownLayout="overlay"
          options={towns.map((item) => ({
            value: item._id,
            label: item.name,
          }))}
          onChange={(value) => setSelectedTown(value)}
        />
      </div>

      <div className="mt-6 rounded-lg border border-blue-100 bg-blue-50 p-4">
        <p className="text-sm text-blue-800">
          <span className="font-semibold">Selected:</span>{" "}
          {[region?.name, county?.name, city?.name, town?.name]
            .filter(Boolean)
            .join(" / ") || "Please select region, county, city and town"}
        </p>
      </div>

      <div className="mt-5 flex flex-wrap items-center gap-3">
        <Link
          href={
            canContinue
              ? `/services/${serviceSlug}/${selectedLocationSlug}`
              : "#"
          }
          className={`inline-flex h-11 items-center justify-center rounded-md px-5 text-sm font-semibold transition-colors ${
            canContinue
              ? "bg-primary text-white hover:opacity-90"
              : "bg-gray-200 text-gray-500 pointer-events-none"
          }`}
        >
          Continue with this location
        </Link>
        <Link
          href="/services"
          className="text-sm text-blue-600 hover:underline"
        >
          Back to all services
        </Link>
      </div>
    </div>
  );
}
