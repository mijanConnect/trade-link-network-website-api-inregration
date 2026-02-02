import ServiceDetails from "@/app/components/services/ServiceDetails";
import WhyUs from "@/app/components/services/WhyUs";
import CTA from "@/app/components/ui/CTA";
import Steps from "@/app/components/ui/Steps";

export default function Page() {
  return (
    <>
      <div className="my-6 lg:mt-15 lg:mb-30">
        <ServiceDetails />
        <Steps />
        <WhyUs />
        <CTA />
      </div>
    </>
  );
}
