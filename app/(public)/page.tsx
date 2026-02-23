import Category from "../components/home/Category";
import FAQ from "../components/home/FAQ";
// import Hero from "../components/home/Hero";
import Hero3 from "../components/home/Hero3";
import StepsHome from "../components/home/StepsHome";
import TrustPilot from "../components/home/TrustPilot";
import UseUs from "../components/home/UseUs";
import WorksFlow from "../components/home/WorksFlow";
import CTA from "../components/ui/CTA";

export default function Home() {
  return (
    <main>
      <>
        {/* <Hero /> */}
        <Hero3 />
        <Category />
        <WorksFlow />
        <UseUs />
        <StepsHome />
        <FAQ />
        <TrustPilot />
        <div className="pt-8 lg:pt-20">
          <CTA />
        </div>
      </>
    </main>
  );
}
