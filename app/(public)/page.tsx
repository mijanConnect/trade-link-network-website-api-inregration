import Category from "../components/home/Category";
import FAQ from "../components/home/FAQ";
// import Hero from "../components/home/Hero";
import Hero3 from "../components/home/Hero3";
import Maps from "../components/home/Maps";
import StepsHome from "../components/home/StepsHome";
import TrustPilot from "../components/home/TrustPilot";
import UseUs from "../components/home/UseUs";
import WorksFlow from "../components/home/WorksFlow";
import CTA from "../components/ui/CTA";
import { getMetadata } from "@/components/homeowners/MetadataConfig";

export const metadata = getMetadata("home");

export default function Home() {
  return (
    <>
      <Hero3 />
      <Category />
      <WorksFlow />
      <UseUs />
      <Maps />
      <StepsHome />
      <FAQ />
      <TrustPilot />
      <section className="pt-8 lg:pt-20">
        <CTA />
      </section>
    </>
  );
}
