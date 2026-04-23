import { Metadata } from "next";
import Breadcrumb from "@/app/components/services/Breadcrumb";
import ServiceLocationSelector from "@/app/components/services/ServiceLocationSelector";

type Props = {
  params: Promise<{
    service: string;
  }>;
};

const toTitleCase = (value: string) =>
  value
    .split("-")
    .filter(Boolean)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { service } = await params;
  const serviceName = toTitleCase(service);

  return {
    title: `${serviceName} Services by Location | TradeLink Network`,
    description: `Choose a location to find trusted ${serviceName.toLowerCase()} professionals near you.`,
    robots: { index: true, follow: true },
  };
}

export default async function ServiceLocationsPage({ params }: Props) {
  const { service } = await params;
  const serviceName = toTitleCase(service);

  return (
    <div className="min-h-screen">
      <div className="bg-primary text-white">
        <div className="container mx-auto px-4 py-8 lg:py-18 text-center">
          <h1 className="text-2xl lg:text-5xl font-bold mb-3 text-white">
            {serviceName} Services
          </h1>
          <p className="text-base lg:text-lg opacity-90 max-w-3xl text-white text-center mx-auto">
            Select your location to view trusted professionals for{" "}
            {serviceName.toLowerCase()} services.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8 lg:py-16">
        {/* Breadcrumb Navigation */}
        <div className="bg-gray-50 mb-6">
          <Breadcrumb
            items={[
              { label: "Home", href: "/" },
              { label: "Services", href: "/services" },
              { label: serviceName, current: true },
            ]}
          />
        </div>
        <ServiceLocationSelector serviceSlug={service} />
      </div>
    </div>
  );
}
