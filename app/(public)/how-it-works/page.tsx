"use client";

import { useRouter } from "next/navigation";
import { useCallback, useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import Button from "@/app/components/ui/Button";

export default function HowItWorksPage() {
  const router = useRouter();

  useEffect(() => {
    AOS.init({
      duration: 600,
      once: true,
      easing: "ease-out",
      offset: 50,
      mirror: false,
    });
  }, []);

  const handleScrollToCategory = useCallback(() => {
    if (typeof window !== "undefined" && window.location.pathname === "/") {
      const target = document.getElementById("browse-category");
      if (target) {
        target.scrollIntoView({ behavior: "smooth", block: "start" });
        return;
      }
    }
    router.push("/#browse-category");
  }, [router]);

  const steps = [
    {
      number: 1,
      title: "Tell Us What You Need",
      description:
        "Submit a quick request describing your job, location, and preferred timing.",
      highlight: "It only takes a few minutes.",
    },
    {
      number: 2,
      title: "Get Matched With Trusted Tradespeople",
      description:
        "We connect you with experienced professionals who are suitable for your job and available in your area.",
      highlight: "All tradespeople are reviewed and vetted.",
    },
    {
      number: 3,
      title: "Compare Quotes",
      description: "Tradespeople contact you with quotes and availability.",
      highlight: "You can compare:",
      items: ["Prices", "Experience", "Reviews", "Availability"],
      footer: "No pressure — choose who you like.",
    },
    {
      number: 4,
      title: "Hire With Confidence",
      description:
        "Select the best professional for your needs and arrange the job directly.",
      highlight: "Clear communication. No hidden steps.",
    },
    {
      number: 5,
      title: "Job Completed",
      description: "Your work gets done — professionally and efficiently.",
      highlight:
        "After completion, you can leave a review to help future customers.",
    },
  ];

  const benefits = [
    "Saves time",
    "No endless searching",
    "Trusted professionals",
    "Multiple quotes",
    "Easy decision making",
  ];

  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className=" py-8 lg:py-16 px-4 bg-primary">
        <div className="container mx-auto text-center">
          <h1
            className="text-2xl lg:text-5xl font-bold text-white mb-2 lg:mb-4"
            data-aos="fade-up"
            data-aos-anchor-placement="top-bottom"
          >
            HOW IT WORKS
          </h1>
          <p
            className="text-md lg:text-2xl font-semibold text-white mb-2 lg:mb-6"
            data-aos="fade-up"
            data-aos-anchor-placement="top-bottom"
            data-aos-delay="100"
          >
            Simple. Fast. Stress-Free.
          </p>
          <p
            className="text-sm lg:text-lg text-white max-w-2xl mx-auto"
            data-aos="fade-up"
            data-aos-anchor-placement="top-bottom"
            data-aos-delay="200"
          >
            We make it easy to find trusted professionals for your job — without
            the hassle of searching, calling, and comparing endlessly.
          </p>
        </div>
      </section>

      {/* Steps Section */}
      <section className="py-8 lg:py-24 px-4">
        <div className="container mx-auto">
          <div className="space-y-6 lg:space-y-8">
            {steps.map((step) => (
              <div
                key={step.number}
                className="relative"
                data-aos="fade-up"
                data-aos-anchor-placement="top-bottom"
                data-aos-delay={step.number * 100}
              >
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-8 items-start bg-white rounded-sm shadow-[0_0_10px_rgba(0,0,0,0.05)] hover:shadow-lg hover:scale-101 transition-all duration-300 ease-out">
                  {/* Step Number Circle */}
                  <div className="lg:col-span-1 h-full flex justify-center lg:justify-start">
                    <div className="w-full bg-primary rounded-t-sm lg:rounded-l-sm flex items-start p-4 lg:pt-4 justify-center text-white font-bold text-2xl lg:text-5xl shadow-lg">
                      {String(step.number).padStart(2, "0")}
                    </div>
                  </div>

                  {/* Step Content */}
                  <div className="lg:col-span-11 p-4 lg:p-6">
                    <div className="">
                      <h3 className="text-xl lg:text-2xl font-bold text-gray-900 mb-2 lg:mb-3">
                        {step.title}
                      </h3>
                      <p className="text-gray-700 text-sm lg:text-md lg:text-lg mb-2 lg:mb-4">
                        {step.description}
                      </p>

                      {step.items ? (
                        <div className="mb-4">
                          <p className="font-semibold text-gray-900 mb-3">
                            {step.highlight}
                          </p>
                          <ul className="space-y-2 mb-4">
                            {step.items.map((item, idx) => (
                              <li
                                key={idx}
                                className="text-gray-700 flex items-center"
                              >
                                <svg
                                  className="w-5 h-5 text-green-500 mr-3 shrink-0"
                                  fill="currentColor"
                                  viewBox="0 0 20 20"
                                >
                                  <path
                                    fillRule="evenodd"
                                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                    clipRule="evenodd"
                                  />
                                </svg>
                                {item}
                              </li>
                            ))}
                          </ul>
                          <p className="text-gray-700 italic">{step.footer}</p>
                        </div>
                      ) : (
                        <p className="text-primary font-semibold">
                          {step.highlight}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SEO Content Section */}
      <section className="p-12 lg:p-28 px-4 bg-white">
        <div className="container mx-auto">
          <div className="">
            <h2
              className="text-2xl lg:text-4xl font-bold text-gray-900 mb-6 lg:mb-12 text-center"
              data-aos="fade-up"
              data-aos-anchor-placement="top-bottom"
            >
              How Trade Link Network Helps <br /> Homeowners Find Trusted
              Tradespeople
            </h2>
            <div className="space-y-6 lg:space-y-8 text-gray-700 text-md lg:text-lg mx-auto">
              <p
                className="leading-relaxed"
                data-aos="fade-up"
                data-aos-anchor-placement="top-bottom"
                data-aos-delay="100"
              >
                Trade Link Network makes it simple for homeowners across the UK
                to find trusted local tradespeople for a wide range of property
                services. Instead of spending time searching online and
                contacting multiple companies, homeowners can post their job
                once and receive responses from suitable professionals operating
                in their area.
              </p>
              <p
                className="leading-relaxed"
                data-aos="fade-up"
                data-aos-anchor-placement="top-bottom"
                data-aos-delay="200"
              >
                After submitting a job request, the platform shares the details
                with verified tradespeople who match the service and location
                requirements. Homeowners can then compare quotes, review
                responses, and choose the professional that best suits their
                project and budget.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Why Customers Love Section */}
      <section className="bg-linear-to-br from-gray-50 to-gray-100 py-10 lg:py-24 px-4">
        <div className="container mx-auto">
          <h2
            className="text-2xl lg:text-4xl font-bold text-center text-gray-900 mb-2 lg:mb-4"
            data-aos="fade-up"
            data-aos-anchor-placement="top-bottom"
          >
            Why Customers Love Our Process
          </h2>
          <p
            className="text-center text-gray-600 mb-6 lg:mb-12 text-sm lg:text-lg"
            data-aos="fade-up"
            data-aos-anchor-placement="top-bottom"
            data-aos-delay="100"
          >
            Discover what makes our service the preferred choice
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 lg:gap-6 mx-auto">
            {benefits.map((benefit, index) => (
              <div
                key={index}
                className="bg-white p-4 lg:p-6 rounded-sm shadow-sm hover:shadow-md transition-shadow duration-300 ease-out"
                data-aos="fade-up"
                data-aos-anchor-placement="top-bottom"
                data-aos-delay={index * 100}
              >
                <div className="flex items-start">
                  <div className="shrink-0">
                    <svg
                      className="w-6 h-6 text-primary mt-1"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                  <div className="ml-4">
                    <p className="text-lg font-semibold text-gray-900">
                      {benefit}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-primary py-10 lg:py-20 px-4">
        <div className="container mx-auto text-center flex flex-col items-center">
          <h2
            className="text-2xl lg:text-4xl font-bold text-white mb-2 lg:mb-4"
            data-aos="fade-up"
            data-aos-anchor-placement="top-bottom"
          >
            Ready to Get Started?
          </h2>
          <p
            className="text-md lg:text-xl text-blue-100 mb-4 lg:mb-8 max-w-2xl mx-auto"
            data-aos="fade-up"
            data-aos-anchor-placement="top-bottom"
            data-aos-delay="100"
          >
            Post your job today and connect with trusted professionals in your
            area.
          </p>
          <Button
            className="font-bold w-48"
            variant="secondary"
            onClick={handleScrollToCategory}
            data-aos="fade-up"
            data-aos-anchor-placement="top-bottom"
            data-aos-delay="200"
          >
            Post a Job Now
          </Button>
        </div>
      </section>
    </main>
  );
}
