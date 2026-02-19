"use client";

import { useRouter } from "next/navigation";
import { useCallback } from "react";

export default function HowItWorksPage() {
  const router = useRouter();
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
      <section className=" py-12 lg:py-20 px-4">
        <div className="container mx-auto text-center">
          <h1 className="text-3xl lg:text-5xl font-bold text-gray-900 mb-2 lg:mb-4">
            HOW IT WORKS
          </h1>
          <p className="text-md lg:text-2xl font-semibold text-primary mb-2 lg:mb-6">
            Simple. Fast. Stress-Free.
          </p>
          <p className="text-sm lg:text-lg text-gray-700 max-w-2xl mx-auto">
            We make it easy to find trusted professionals for your job — without
            the hassle of searching, calling, and comparing endlessly.
          </p>
        </div>
      </section>

      {/* Steps Section */}
      <section className="py-8 lg:py-24 px-4 bg-white">
        <div className="container mx-auto">
          <div className="space-y-6 lg:space-y-12">
            {steps.map((step) => (
              <div key={step.number} className="relative">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-8 items-center">
                  {/* Step Number Circle */}
                  <div className="lg:col-span-1 flex justify-center lg:justify-start">
                    <div className="w-16 h-16 lg:w-20 lg:h-20 rounded-full bg-primary flex items-center justify-center text-white font-bold text-2xl lg:text-3xl shadow-lg">
                      {String(step.number).padStart(2, "0")}
                    </div>
                  </div>

                  {/* Step Content */}
                  <div className="lg:col-span-11">
                    <div className="bg-white rounded-md border border-gray-200 shadow-sm hover:shadow-md transition-shadow p-4 lg:p-8">
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

      {/* Why Customers Love Section */}
      <section className="bg-linear-to-br from-gray-50 to-gray-100 py-10 lg:py-24 px-4">
        <div className="container mx-auto">
          <h2 className="text-2xl lg:text-4xl font-bold text-center text-gray-900 mb-2 lg:mb-4">
            Why Customers Love Our Process
          </h2>
          <p className="text-center text-gray-600 mb-6 lg:mb-12 text-sm lg:text-lg">
            Discover what makes our service the preferred choice
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 lg:gap-6 max-w-4xl mx-auto">
            {benefits.map((benefit, index) => (
              <div
                key={index}
                className="bg-white rounded-lg p-4 lg:p-8 shadow-sm hover:shadow-md transition-shadow border border-gray-200"
              >
                <div className="flex items-start">
                  <div className="shrink-0">
                    <svg
                      className="w-6 h-6 text-green-500 mt-1"
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
        <div className="container mx-auto text-center">
          <h2 className="text-2xl lg:text-4xl font-bold text-white mb-2 lg:mb-4">
            Ready to Get Started?
          </h2>
          <p className="text-md lg:text-xl text-blue-100 mb-4 lg:mb-8 max-w-2xl mx-auto">
            Post your job today and connect with trusted professionals in your
            area.
          </p>
          <button
            className="bg-white text-primary font-bold px-4 py-2 lg:px-8 lg:py-4 rounded-md hover:bg-blue-50 transition-colors text-lg shadow-lg cursor-pointer"
            onClick={handleScrollToCategory}
          >
            Post a Job Now
          </button>
        </div>
      </section>
    </main>
  );
}
