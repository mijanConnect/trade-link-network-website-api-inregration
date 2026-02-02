import ServiceList from "../ui/ServiceList";

const categories = [
  { id: 1, name: "Outdoor & Landscaping", slug: "outdoor-landscaping" },
  { id: 2, name: "Driveways & Surfacing", slug: "driveways-surfacing" },
  { id: 3, name: "Building & Structural", slug: "building-structural" },
  { id: 4, name: "Roofing & Exterior Shell", slug: "roofing-exterior-shell" },
  {
    id: 5,
    name: "Home Renovation & Interiors",
    slug: "home-renovation-interiors",
  },
  {
    id: 6,
    name: "Electrical, Plumbing & Heating",
    slug: "electrical-plumbing-heating",
  },
  {
    id: 7,
    name: "Cleaning, Maintenance & Repairs",
    slug: "cleaning-maintenance-repairs",
  },
  { id: 8, name: "Windows, Doors & Security", slug: "windows-doors-security" },
  { id: 9, name: "Specialist Services", slug: "specialist-services" },
  { id: 10, name: "Moving Services", slug: "moving-services" },
];

export default function PopularServices() {
  return (
    <>
      <div>
        <div className="mt-6 lg:mt-8">
          <ServiceList categories={categories} route="services" />
        </div>
      </div>
    </>
  );
}
