"use client";

import Link from "next/link";

export default function HowTradepersonWorkPage() {
  const steps = [
    {
      number: 1,
      title: "Apply to Join",
      description: "Fill in our quick registration form.",
    },
    {
      number: 2,
      title: "Get Approved",
      description:
        "We verify your details and make sure you meet our standards.",
    },
    {
      number: 3,
      title: "Receive Job Leads",
      description:
        "Customers submit requests — we match them to suitable tradespeople.",
    },
    {
      number: 4,
      title: "Quote the Job",
      description:
        "Contact the customer and provide your price and availability.",
    },
    {
      number: 5,
      title: "Win More Work",
      description: "Complete the job and grow your reputation.",
    },
  ];

  const benefits = [
    {
      title: "Consistent job opportunities",
      description: "Receive leads from customers who are ready to hire.",
    },
    {
      title: "Work in your local area",
      description: "Only get matched with jobs near where you operate.",
    },
    {
      title: "Save time on marketing",
      description:
        "We bring the customers to you — no need to advertise or hunt for work.",
    },
    {
      title: "Build your reputation",
      description: "Collect reviews and grow your credibility.",
    },
    {
      title: "Flexible and scalable",
      description: "Take on as much or as little work as you want.",
    },
  ];

  const professions = [
    "Builders",
    "Electricians",
    "Plumbers",
    "Decorators",
    "Roofers",
    "Landscapers",
    "Cleaning specialists",
    "And many more",
  ];

  const requirements = [
    "Be legally registered to operate",
    "Have relevant qualifications or experience",
    "Hold appropriate insurance (where required)",
    "Provide reliable communication",
    "Deliver professional service to customers",
  ];

  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="py-16 lg:py-20 px-4">
        <div className="container mx-auto text-center">
          <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            Grow Your Business With <br /> Quality Job Leads
          </h1>
          <p className="text-lg text-gray-700 max-w-3xl mx-auto mb-2">
            Join our network and connect with customers actively looking for
            trusted professionals in your area. No cold calling. No chasing
            work. Just real opportunities delivered to you.
          </p>
          <p className="text-lg text-gray-700 max-w-3xl mx-auto">
            Whether you&apos;re a sole trader or an established company, we help
            you find more jobs and grow your reputation.
          </p>
        </div>
      </section>

      {/* Why Join Us Section */}
      <section className="bg-white py-16 lg:py-24 px-4">
        <div className="container mx-auto">
          <h2 className="text-3xl lg:text-4xl font-bold text-center text-gray-900 mb-12">
            Why Join Us?
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mx-auto">
            {benefits.map((benefit, index) => (
              <div
                key={index}
                className="rounded-md p-8 border hover:shadow-md transition-shadow"
              >
                <div className="flex items-start gap-4">
                  <svg
                    className="w-6 h-6 text-primary shrink-0 mt-1"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <div>
                    <h3 className="text-lg font-bold text-gray-900 mb-2">
                      {benefit.title}
                    </h3>
                    <p className="text-gray-700">{benefit.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="bg-linear-to-br from-gray-50 to-gray-100 py-16 lg:py-24 px-4">
        <div className="container mx-auto">
          <h2 className="text-3xl lg:text-4xl font-bold text-center text-gray-900 mb-4">
            How It Works for Tradespeople
          </h2>
          <p className="text-center text-gray-600 mb-12 text-lg">
            Five simple steps to start receiving job leads
          </p>

          <div className="space-y-8">
            {steps.map((step) => (
              <div key={step.number} className="relative">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center max-w-4xl mx-auto">
                  {/* Step Number Circle */}
                  <div className="lg:col-span-2 flex justify-center lg:justify-start">
                    <div className="w-16 h-16 lg:w-20 lg:h-20 rounded-full bg-primary flex items-center justify-center text-white font-bold text-2xl lg:text-3xl shadow-lg">
                      {String(step.number).padStart(2, "0")}
                    </div>
                  </div>

                  {/* Step Content */}
                  <div className="lg:col-span-10">
                    <div className="bg-white rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow p-8">
                      <h3 className="text-2xl font-bold text-gray-900 mb-3">
                        {step.title}
                      </h3>
                      <p className="text-gray-700 text-lg">
                        {step.description}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Who Can Join Section */}
      <section className="py-16 lg:py-24 px-4 bg-white">
        <div className="container mx-auto max-w-4xl">
          <h2 className="text-3xl lg:text-4xl font-bold text-center text-gray-900 mb-4">
            Who Can Join?
          </h2>
          <p className="text-center text-gray-600 mb-12 text-lg">
            We welcome qualified and reliable professionals, including:
          </p>

          <div className="bg-linear-to-br from-gray-50 to-gray-100 rounded-md p-8 lg:p-12 border">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {professions.map((profession, index) => (
                <div key={index} className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-primary rounded-full shrink-0"></div>
                  <p className="text-gray-800 font-medium">{profession}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Requirements Section */}
      <section className="bg-linear-to-br from-gray-50 to-gray-100 py-16 lg:py-24 px-4">
        <div className="container mx-auto max-w-4xl">
          <h2 className="text-3xl lg:text-4xl font-bold text-center text-gray-900 mb-4">
            Requirements
          </h2>
          <p className="text-center text-gray-600 mb-12 text-lg">
            To maintain high service standards, you must:
          </p>

          <div className="space-y-4">
            {requirements.map((requirement, index) => (
              <div
                key={index}
                className="bg-white rounded-lg p-6 border flex items-start gap-4 hover:shadow-sm transition-shadow"
              >
                <svg
                  className="w-6 h-6 text-primary shrink-0 mt-0.5"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
                <p className="text-gray-800 text-lg font-medium">
                  {requirement}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-primary py-16 lg:py-20 px-4">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">
            Ready to Get Started?
          </h2>
          <p className="text-xl text-green-100 mb-8 max-w-2xl mx-auto">
            Join today and start receiving new job opportunities.
          </p>
          <Link href="/professional-register">
            <button className="bg-white text-primary font-bold px-10 py-4 rounded-lg hover:bg-gray-50 transition-colors text-lg shadow-lg inline-flex items-center gap-2 cursor-pointer">
              Sign Up
            </button>
          </Link>
        </div>
      </section>
    </main>
  );
}
