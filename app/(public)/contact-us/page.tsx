"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import AOS from "aos";
import "aos/dist/aos.css";
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

  useEffect(() => {
    AOS.init({
      duration: 600,
      once: true,
      easing: "ease-out",
      offset: 50,
      mirror: false,
    });
  }, []);

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
      alert("Please accept the privacy consent to continue.");
      return;
    }
    setIsSubmitting(true);
    // TODO: Implement form submission logic
    setTimeout(() => {
      setIsSubmitting(false);
      alert("Message sent successfully!");
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
    <div>
      <div className="container mx-auto px-4 lg:px-0">
        <div className="pt-10 pb-15 lg:pt-15 lg:pb-40">
          {/* Hero Section */}
          <div
            data-aos="fade-up"
            className="text-center mb-8 lg:mb-16"
          >
            <h1 className="text-[20px] md:text-[40px] font-semibold text-primaryText max-w-2xl mx-auto mb-4">
              📞 Contact Trade Link Network
            </h1>
            <p className="text-[16px] lg:text-[20px] text-gray-700 max-w-2xl mx-auto">
              We&apos;re here to help. Whether you&apos;re a homeowner, tradesperson, or
              business partner, our team is ready to assist.
            </p>
          </div>

          {/* Email Contact Section */}
          <section
            data-aos="fade-up"
            className="mb-8 lg:mb-16 max-w-4xl mx-auto"
          >
            <h2 className="text-[18px] lg:text-[24px] font-semibold text-primaryText mb-6 lg:mb-8">
              ✉️ Contact by Email
            </h2>
            <div className="space-y-6">
              {emailContacts.map((contact, index) => (
                <div
                  key={index}
                  data-aos="fade-up"
                  data-aos-delay={index * 50}
                  className="bg-white rounded-md border border-gray-200 shadow-sm hover:shadow-md transition-shadow p-4 lg:p-6"
                >
                  <h3 className="text-[16px] lg:text-[18px] font-semibold text-primaryText mb-2">
                    {contact.title}
                  </h3>
                  <p className="text-[14px] lg:text-[16px] text-gray-700 mb-3">
                    {contact.description}
                  </p>
                  <div className="flex items-center gap-3">
                    <a
                      href={`mailto:${contact.email}`}
                      className="text-primary font-medium text-[14px] lg:text-[16px] hover:underline"
                    >
                      📧 {contact.email}
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
              ))}
            </div>
          </section>

          {/* Phone Support Section */}
          <section
            data-aos="fade-up"
            className="mb-8 lg:mb-16 max-w-4xl mx-auto"
          >
            <h2 className="text-[18px] lg:text-[24px] font-semibold text-primaryText mb-4 lg:mb-6">
              📞 Phone Support
            </h2>
            <div className="bg-white rounded-md border border-gray-200 shadow-sm p-4 lg:p-6">
              <p className="text-[14px] lg:text-[16px] text-gray-700 mb-2">
                <span className="font-semibold">📱 Phone number</span> — to be
                confirmed (waiting on one, maybe a landline number)
              </p>
              <p className="text-[14px] lg:text-[16px] text-gray-600 italic">
                (Email is currently the fastest way to contact us.)
              </p>
            </div>
          </section>

          {/* Company Information Section */}
          <section
            data-aos="fade-up"
            className="mb-8 lg:mb-16 max-w-4xl mx-auto"
          >
            <h2 className="text-[18px] lg:text-[24px] font-semibold text-primaryText mb-4 lg:mb-6">
              📍 Company Information
            </h2>
            <div className="bg-white rounded-md border border-gray-200 shadow-sm p-4 lg:p-6">
              <p className="text-[16px] lg:text-[18px] font-semibold text-primaryText mb-2">
                Trade Link Network Ltd
              </p>
              <p className="text-[14px] lg:text-[16px] text-gray-700 mb-1">
                United Kingdom
              </p>
              <p className="text-[14px] lg:text-[16px] text-gray-700">
                Indecon Building, South Hanningfield Road, Wickford, United
                Kingdom, SS11 7PF
              </p>
            </div>
          </section>

          {/* Support Hours Section */}
          <section
            data-aos="fade-up"
            className="mb-8 lg:mb-16 max-w-4xl mx-auto"
          >
            <h2 className="text-[18px] lg:text-[24px] font-semibold text-primaryText mb-4 lg:mb-6">
              🕒 Support Hours
            </h2>
            <div className="bg-white rounded-md border border-gray-200 shadow-sm p-4 lg:p-6">
              <p className="text-[14px] lg:text-[16px] text-gray-700 mb-2">
                <span className="font-semibold">Monday – Friday:</span> 9:00 AM
                – 17:00 PM
              </p>
              <p className="text-[14px] lg:text-[16px] text-gray-700">
                <span className="font-semibold">Weekend:</span> Limited support
                email only
              </p>
            </div>
          </section>

          {/* Contact Form Section */}
          <section
            data-aos="fade-up"
            className="mb-8 lg:mb-16 max-w-4xl mx-auto"
          >
            <h2 className="text-[18px] lg:text-[24px] font-semibold text-primaryText mb-6 lg:mb-8">
              💬 Send Us a Message
            </h2>
            <form
              onSubmit={handleSubmit}
              className="bg-white rounded-md border border-gray-200 shadow-sm p-4 lg:p-8"
            >
              <div className="space-y-4 lg:space-y-6">
                {/* Full Name */}
                <div>
                  <label
                    htmlFor="fullName"
                    className="block text-[14px] lg:text-[16px] font-medium text-primaryText mb-2"
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
                    className="w-full px-4 py-2 lg:py-3 border border-stroke rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-[14px] lg:text-[16px]"
                    placeholder="Enter your full name"
                  />
                </div>

                {/* Email */}
                <div>
                  <label
                    htmlFor="email"
                    className="block text-[14px] lg:text-[16px] font-medium text-primaryText mb-2"
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
                    className="w-full px-4 py-2 lg:py-3 border border-stroke rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-[14px] lg:text-[16px]"
                    placeholder="Enter your email address"
                  />
                </div>

                {/* Phone */}
                <div>
                  <label
                    htmlFor="phone"
                    className="block text-[14px] lg:text-[16px] font-medium text-primaryText mb-2"
                  >
                    Phone number <span className="text-gray-500">(optional)</span>
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 lg:py-3 border border-stroke rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-[14px] lg:text-[16px]"
                    placeholder="Enter your phone number"
                  />
                </div>

                {/* Subject */}
                <div>
                  <label
                    htmlFor="subject"
                    className="block text-[14px] lg:text-[16px] font-medium text-primaryText mb-2"
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
                    className="w-full px-4 py-2 lg:py-3 border border-stroke rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-[14px] lg:text-[16px]"
                    placeholder="Enter message subject"
                  />
                </div>

                {/* Message */}
                <div>
                  <label
                    htmlFor="message"
                    className="block text-[14px] lg:text-[16px] font-medium text-primaryText mb-2"
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
                    className="w-full px-4 py-2 lg:py-3 border border-stroke rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-[14px] lg:text-[16px] resize-vertical"
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
                    className="mt-1 mr-3 w-4 h-4 text-primary border-stroke rounded focus:ring-primary"
                  />
                  <label
                    htmlFor="privacyConsent"
                    className="text-[14px] lg:text-[16px] text-gray-700"
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
                  className="w-full bg-primary text-white font-semibold px-6 py-3 lg:py-4 rounded-md hover:bg-opacity-90 transition-colors text-[16px] lg:text-[18px] disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? "Sending..." : "Send Message"}
                </button>
              </div>
            </form>
          </section>

          {/* Privacy Section */}
          <section
            data-aos="fade-up"
            className="mb-8 lg:mb-16 max-w-4xl mx-auto"
          >
            <h2 className="text-[18px] lg:text-[24px] font-semibold text-primaryText mb-4 lg:mb-6">
              🔒 Your Privacy
            </h2>
            <div className="bg-white rounded-md border border-gray-200 shadow-sm p-4 lg:p-6">
              <p className="text-[14px] lg:text-[16px] text-gray-700">
                Your details are used only to respond to your enquiry and are
                handled securely in line with UK data protection regulations.
              </p>
            </div>
          </section>

          {/* Why Contact Section */}
          <section
            data-aos="fade-up"
            className="mb-8 lg:mb-16 max-w-4xl mx-auto"
          >
            <h2 className="text-[18px] lg:text-[24px] font-semibold text-primaryText mb-6 lg:mb-8">
              ⭐ Why Contact Trade Link Network?
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">
              {whyContactPoints.map((point, index) => (
                <div
                  key={index}
                  data-aos="fade-up"
                  data-aos-delay={index * 50}
                  className="bg-white rounded-md border border-gray-200 shadow-sm hover:shadow-md transition-shadow p-4 lg:p-6"
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
                      <p className="text-[14px] lg:text-[16px] font-semibold text-primaryText">
                        {point}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* FAQ Link Section */}
          <section
            data-aos="fade-up"
            className="mb-8 lg:mb-16 max-w-4xl mx-auto text-center"
          >
            <h2 className="text-[18px] lg:text-[24px] font-semibold text-primaryText mb-4 lg:mb-6">
              ❓ Need Quick Answers?
            </h2>
            <div className="bg-white rounded-md border border-gray-200 shadow-sm p-4 lg:p-6">
              <p className="text-[14px] lg:text-[16px] text-gray-700 mb-4">
                Visit our Frequently Asked Questions page for common queries and
                guidance.
              </p>
              <button
                onClick={() => router.push("/faq")}
                className="bg-primary text-white font-semibold px-6 py-3 lg:py-4 rounded-md hover:bg-opacity-90 transition-colors text-[14px] lg:text-[16px]"
              >
                Visit FAQ Page
              </button>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
