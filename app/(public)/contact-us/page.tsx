"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

type EmailContact = {
  title: string;
  description: string;
  email: string;
};

const emailContacts: EmailContact[] = [
  {
    title: "General enquiries",
    description:
      "For general questions about our platform or services:",
    email: "info@tradelinknetwork.co.uk",
  },
  {
    title: "Customer support",
    description:
      "Help posting a job, receiving quotes, or using the platform:",
    email: "support@tradelinknetwork.co.uk",
  },
  {
    title: "Tradesperson support",
    description: "Help with your account, leads, or profile setup:",
    email: "admin@tradelinknetwork.co.uk",
  },
  {
    title: "Accounts & billing",
    description: "Invoices, payments, or financial queries:",
    email: "accounts@tradelinknetwork.co.uk",
  },
  {
    title: "Partnerships & business enquiries",
    description:
      "Suppliers, merchants, commercial opportunities, or collaborations:",
    email: "partnerships@tradelinknetwork.co.uk",
  },
  {
    title: "Sales & advertising enquiries",
    description:
      "Promotions, featured listings, or marketing opportunities:",
    email: "sales@tradelinknetwork.co.uk",
  },
  {
    title: "Complaints & compliance",
    description: "Report issues, disputes, or policy concerns:",
    email: "compliance@tradelinknetwork.co.uk",
  },
];

const whyContactPoints = [
  "UK registered company",
  "Dedicated support team",
  "Nationwide coverage",
  "Secure and trusted platform",
  "Fast response times",
];

export default function ContactUsPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
    privacyConsent: false,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value, type } = e.target;
    if (type === "checkbox") {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData((prev) => ({ ...prev, [name]: checked }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.privacyConsent) {
      toast.error("Please accept the privacy consent to continue.");
      return;
    }
    setIsSubmitting(true);
    // TODO: Implement form submission logic
    setTimeout(() => {
      setIsSubmitting(false);
      toast.success("Message sent successfully!");
      setFormData({
        fullName: "",
        email: "",
        phone: "",
        subject: "",
        message: "",
        privacyConsent: false,
      });
    }, 1000);
  };

  const copyEmail = async (email: string) => {
    try {
      // Check if clipboard API is available
      if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(email);
        toast.success(`Email copied: ${email}`);
      } else {
        // Fallback for browsers that don't support clipboard API
        const textArea = document.createElement("textarea");
        textArea.value = email;
        textArea.style.position = "fixed";
        textArea.style.left = "-999999px";
        textArea.style.top = "-999999px";
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
        try {
          document.execCommand("copy");
          toast.success(`Email copied: ${email}`);
        } catch (err) {
          console.error("Failed to copy email:", err);
          toast.error(`Please copy manually: ${email}`);
        }
        document.body.removeChild(textArea);
      }
    } catch (err) {
      console.error("Failed to copy email:", err);
      toast.error(`Please copy manually: ${email}`);
    }
  };

  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="py-12 lg:py-20 px-4">
        <div className="container mx-auto text-center">
          <h1 className="text-3xl lg:text-5xl font-bold text-gray-900 mb-2 lg:mb-4">
            CONTACT TRADE LINK NETWORK
          </h1>
          <p className="text-md lg:text-2xl font-semibold text-primary mb-2 lg:mb-6">
            We&apos;re here to help.
          </p>
          <p className="text-sm lg:text-lg text-gray-700 max-w-2xl mx-auto">
            Whether you&apos;re a homeowner, tradesperson, or business partner,
            our team is ready to assist.
          </p>
        </div>
      </section>

      {/* Email Contact Section */}
      <section className="py-8 lg:py-24 px-4 bg-white">
        <div className="container mx-auto">
          <h2 className="text-2xl lg:text-4xl font-bold text-center text-gray-900 mb-2 lg:mb-4">
            Contact by Email
          </h2>
          <p className="text-center text-gray-600 mb-6 lg:mb-12 text-sm lg:text-lg">
            Choose the right contact for your enquiry
          </p>

          <div className="space-y-6 lg:space-y-12 mx-auto">
            {emailContacts.map((contact, index) => (
              <div key={index} className="relative">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-8 items-center">
                  {/* Step Number Circle */}
                  <div className="lg:col-span-1 flex justify-center lg:justify-start">
                    <div className="w-16 h-16 lg:w-20 lg:h-20 rounded-full bg-primary flex items-center justify-center text-white font-bold text-2xl lg:text-3xl shadow-lg">
                      {String(index + 1).padStart(2, "0")}
                    </div>
                  </div>

                  {/* Contact Content */}
                  <div className="lg:col-span-11">
                    <div className="bg-white rounded-md border border-gray-200 shadow-sm hover:shadow-md transition-shadow p-4 lg:p-8">
                      <h3 className="text-xl lg:text-2xl font-bold text-gray-900 mb-2 lg:mb-3">
                        {contact.title}
                      </h3>
                      <p className="text-gray-700 text-sm lg:text-md lg:text-lg mb-2 lg:mb-4">
                        {contact.description}
                      </p>
                      <div className="flex items-center gap-3">
                        <a
                          href={`mailto:${contact.email}`}
                          className="text-primary font-semibold text-sm lg:text-lg hover:underline"
                        >
                          {contact.email}
                        </a>
                        <button
                          onClick={() => copyEmail(contact.email)}
                          className="text-gray-500 hover:text-primary text-sm"
                          title="Copy email"
                        >
                          <i className="fa fa-copy"></i>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Phone & Company Info Section */}
      <section className="py-8 lg:py-24 px-4 bg-white">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8  mx-auto">
            {/* Phone Support */}
            <div className="bg-white rounded-md border border-gray-200 shadow-sm hover:shadow-md transition-shadow p-4 lg:p-8">
              <h3 className="text-xl lg:text-2xl font-bold text-gray-900 mb-2 lg:mb-3">
                Phone Support
              </h3>
              <p className="text-gray-700 text-sm lg:text-md lg:text-lg mb-2">
                <span className="font-semibold">Phone number</span> — to be
                confirmed (waiting on one, maybe a landline number)
              </p>
              <p className="text-gray-600 italic text-sm lg:text-md lg:text-lg">
                (Email is currently the fastest way to contact us.)
              </p>
            </div>

            {/* Company Information */}
            <div className="bg-white rounded-md border border-gray-200 shadow-sm hover:shadow-md transition-shadow p-4 lg:p-8">
              <h3 className="text-xl lg:text-2xl font-bold text-gray-900 mb-2 lg:mb-3">
                Company Information
              </h3>
              <p className="text-gray-700 text-sm lg:text-md lg:text-lg mb-2 font-semibold">
                Trade Link Network Ltd
              </p>
              <p className="text-gray-700 text-sm lg:text-md lg:text-lg mb-2">
                United Kingdom
              </p>
              <p className="text-gray-700 text-sm lg:text-md lg:text-lg">
                Indecon Building, South Hanningfield Road, Wickford, United
                Kingdom, SS11 7PF
              </p>
            </div>


           
            <div className="bg-white rounded-md border border-gray-200 shadow-sm hover:shadow-md transition-shadow p-4 lg:p-8">
              <h3 className="text-xl lg:text-2xl font-bold text-gray-900 mb-2 lg:mb-3">
                Support Hours
              </h3>
              <p className="text-gray-700 text-sm lg:text-md lg:text-lg mb-2">
                <span className="font-semibold">Monday – Friday:</span> 9:00 AM
                – 17:00 PM
              </p>
              <p className="text-gray-700 text-sm lg:text-md lg:text-lg">
                <span className="font-semibold">Weekend:</span> Limited support
                email only
              </p>
            </div>
          </div>
        </div>
      </section>

  
      {/* Contact Form Section */}
      <section className="py-8 lg:py-24 px-4 bg-white">
        <div className="container mx-auto">
          <h2 className="text-2xl lg:text-4xl font-bold text-center text-gray-900 mb-2 lg:mb-4">
            Send Us a Message
          </h2>
          <p className="text-center text-gray-600 mb-6 lg:mb-12 text-sm lg:text-lg">
            Fill out the form below and we&apos;ll get back to you soon
          </p>

          <div className="max-w-4xl mx-auto">
            <form
              onSubmit={handleSubmit}
              className="bg-white rounded-md border border-gray-200 shadow-sm p-4 lg:p-8"
            >
              <div className="space-y-4 lg:space-y-6">
                {/* Full Name */}
                <div>
                  <label
                    htmlFor="fullName"
                    className="block text-sm lg:text-lg font-medium text-gray-900 mb-2"
                  >
                    Full name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="fullName"
                    name="fullName"
                    required
                    value={formData.fullName}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 lg:py-3 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-sm lg:text-lg"
                    placeholder="Enter your full name"
                  />
                </div>

                {/* Email */}
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm lg:text-lg font-medium text-gray-900 mb-2"
                  >
                    Email address <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 lg:py-3 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-sm lg:text-lg"
                    placeholder="Enter your email address"
                  />
                </div>

                {/* Phone */}
                <div>
                  <label
                    htmlFor="phone"
                    className="block text-sm lg:text-lg font-medium text-gray-900 mb-2"
                  >
                    Phone number <span className="text-gray-500">(optional)</span>
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 lg:py-3 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-sm lg:text-lg"
                    placeholder="Enter your phone number"
                  />
                </div>

                {/* Subject */}
                <div>
                  <label
                    htmlFor="subject"
                    className="block text-sm lg:text-lg font-medium text-gray-900 mb-2"
                  >
                    Subject <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    required
                    value={formData.subject}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 lg:py-3 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-sm lg:text-lg"
                    placeholder="Enter message subject"
                  />
                </div>

                {/* Message */}
                <div>
                  <label
                    htmlFor="message"
                    className="block text-sm lg:text-lg font-medium text-gray-900 mb-2"
                  >
                    Message <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    rows={6}
                    value={formData.message}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 lg:py-3 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-sm lg:text-lg resize-vertical"
                    placeholder="Enter your message"
                  />
                </div>

                {/* Privacy Consent */}
                <div className="flex items-start">
                  <input
                    type="checkbox"
                    id="privacyConsent"
                    name="privacyConsent"
                    required
                    checked={formData.privacyConsent}
                    onChange={handleInputChange}
                    className="mt-1 mr-3 w-4 h-4 text-primary border-gray-200 rounded focus:ring-primary"
                  />
                  <label
                    htmlFor="privacyConsent"
                    className="text-sm lg:text-lg text-gray-700"
                  >
                    I consent to the processing of my personal data in
                    accordance with the privacy policy.{" "}
                    <span className="text-red-500">*</span>
                  </label>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-primary text-white font-bold px-4 py-2 lg:px-8 lg:py-4 rounded-md hover:bg-opacity-90 transition-colors text-lg shadow-lg cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? "Sending..." : "Send Message"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>

      {/* Privacy Section */}
      <section className="py-8 lg:py-24 px-4 bg-white">
        <div className="container mx-auto">
          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-md border border-gray-200 shadow-sm hover:shadow-md transition-shadow p-4 lg:p-8">
              <h3 className="text-xl lg:text-2xl font-bold text-gray-900 mb-2 lg:mb-3">
                Your Privacy
              </h3>
              <p className="text-gray-700 text-sm lg:text-md lg:text-lg">
                Your details are used only to respond to your enquiry and are
                handled securely in line with UK data protection regulations.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Why Contact Section */}
      <section className="bg-linear-to-br from-gray-50 to-gray-100 py-10 lg:py-24 px-4">
        <div className="container mx-auto">
          <h2 className="text-2xl lg:text-4xl font-bold text-center text-gray-900 mb-2 lg:mb-4">
            Why Contact Trade Link Network?
          </h2>
          <p className="text-center text-gray-600 mb-6 lg:mb-12 text-sm lg:text-lg">
            Discover what makes our service the preferred choice
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 lg:gap-6 max-w-4xl mx-auto">
            {whyContactPoints.map((point, index) => (
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
                      {point}
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
            Need Quick Answers?
          </h2>
          <p className="text-md lg:text-xl text-blue-100 mb-4 lg:mb-8 max-w-2xl mx-auto">
            Visit our Frequently Asked Questions page for common queries and
            guidance.
          </p>
          <button
            onClick={() => router.push("/faq")}
            className="bg-white text-primary font-bold px-4 py-2 lg:px-8 lg:py-4 rounded-md hover:bg-blue-50 transition-colors text-lg shadow-lg cursor-pointer"
          >
            Visit FAQ Page
          </button>
        </div>
      </section>
    </main>
  );
}
