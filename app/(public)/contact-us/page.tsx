"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { z } from "zod";
import AOS from "aos";
import { useUserDataSendAdminMutation } from "@/store/slice/contactUsSlice";
import Button from "@/app/components/ui/Button";
import InputField from "@/app/components/ui/InputField";

type EmailContact = {
  title: string;
  description: string;
  email: string;
};

const emailContacts: EmailContact[] = [
  {
    title: "General enquiries",
    description: "For general questions about our platform or services:",
    email: "info@tradelinknetwork.co.uk",
  },
  {
    title: "Customer support",
    description: "Help posting a job, receiving quotes, or using the platform:",
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
    description: "Promotions, featured listings, or marketing opportunities:",
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

// Zod validation schema
const contactUsSchema = z.object({
  body: z
    .object({
      name: z
        .string()
        .min(1, "Name is required")
        .min(2, "Name must be at least 2 characters long"),
      email: z
        .string()
        .min(1, "Email is required")
        .email("Invalid email address"),
      phone: z.string().optional(),
      subject: z
        .string()
        .min(1, "Subject is required")
        .min(2, "Subject must be at least 2 characters long"),
      message: z
        .string()
        .min(1, "Message is required")
        .min(2, "Message must be at least 2 characters long"),
    })
    .strict(),
});

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
  const [userDataSendAdmin, { isLoading }] = useUserDataSendAdminMutation();
  const [validationErrors, setValidationErrors] = useState<
    Record<string, string>
  >({});

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
    >,
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

    // Clear previous validation errors
    setValidationErrors({});

    if (!formData.privacyConsent) {
      toast.error("Please accept the privacy consent to continue.");
      return;
    }

    // Prepare data for validation (map fullName to name)
    const submitData = {
      body: {
        name: formData.fullName,
        email: formData.email,
        phone: formData.phone || undefined,
        subject: formData.subject,
        message: formData.message,
      },
    };

    // Validate with Zod
    try {
      contactUsSchema.parse(submitData);
    } catch (error) {
      if (error instanceof z.ZodError) {
        const errors: Record<string, string> = {};
        error.issues.forEach((issue) => {
          const path = issue.path.join(".");
          if (path.startsWith("body.")) {
            const field = path.replace("body.", "");
            errors[field] = issue.message;
          }
        });
        setValidationErrors(errors);

        // Show first error in toast
        const firstError = error.issues[0];
        if (firstError) {
          toast.error(firstError.message);
        }
        return;
      }
    }

    setIsSubmitting(true);

    try {
      await userDataSendAdmin(submitData).unwrap();

      toast.success("Message sent successfully!");
      setFormData({
        fullName: "",
        email: "",
        phone: "",
        subject: "",
        message: "",
        privacyConsent: false,
      });
      setValidationErrors({});
    } catch (error: unknown) {
      console.error("Contact form submission error:", error);
      const err = error as { data?: { message?: string }; message?: string };
      toast.error(
        err?.data?.message ||
          err?.message ||
          "Failed to send message. Please try again.",
      );
    } finally {
      setIsSubmitting(false);
    }
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
      <section className="py-8 lg:py-20 px-4 bg-primary">
        <div className="container mx-auto text-center">
          <h1
            className="text-2xl lg:text-5xl font-bold text-white mb-2 lg:mb-4"
            data-aos="fade-up"
            data-aos-anchor-placement="top-bottom"
          >
            CONTACT TRADE LINK NETWORK
          </h1>
          <p
            className="text-md lg:text-2xl font-semibold text-white mb-2 lg:mb-4"
            data-aos="fade-up"
            data-aos-anchor-placement="top-bottom"
            data-aos-delay="100"
          >
            We&apos;re here to help.
          </p>
          <p
            className="text-sm lg:text-lg text-white max-w-xl mx-auto"
            data-aos="fade-up"
            data-aos-anchor-placement="top-bottom"
            data-aos-delay="200"
          >
            Whether you&apos;re a homeowner, tradesperson, or business partner,
            our team is ready to assist.
          </p>
        </div>
      </section>

      {/* Email Contact Section */}
      <section className="py-8 lg:py-24 px-4">
        <div className="container mx-auto max-w-5xl">
          <h2
            className="text-2xl lg:text-4xl font-bold text-center text-gray-900 mb-2 lg:mb-4"
            data-aos="fade-up"
            data-aos-anchor-placement="top-bottom"
          >
            Contact by Email
          </h2>
          <p
            className="text-center text-gray-600 mb-6 lg:mb-12 text-sm lg:text-lg"
            data-aos="fade-up"
            data-aos-anchor-placement="top-bottom"
            data-aos-delay="100"
          >
            Choose the right contact for your enquiry
          </p>

          <div className="space-y-6 lg:space-y-12 mx-auto">
            {emailContacts.map((contact, index) => (
              <div
                key={index}
                className="relative"
                data-aos="fade-up"
                data-aos-anchor-placement="top-bottom"
                data-aos-delay={index * 100}
              >
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-8 items-start bg-white rounded-sm shadow-[0_0_10px_rgba(0,0,0,0.05)] hover:shadow-lg hover:scale-103 transition-all duration-300 ease-out">
                  {/* Step Number Circle */}
                  <div className="lg:col-span-2 h-full flex justify-center lg:justify-start">
                    <div className="w-full bg-primary rounded-t-sm lg:rounded-l-sm flex items-start p-4 lg:pt-4 justify-center text-white font-bold text-2xl lg:text-5xl shadow-lg">
                      {String(index + 1).padStart(2, "0")}
                    </div>
                  </div>

                  {/* Contact Content */}
                  <div className="lg:col-span-10">
                    <div className="py-4 lg:py-6 px-4 lg:px-0">
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
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6 lg:gap-8  mx-auto">
            {/* Phone Support */}
            <div
              className="bg-white rounded-sm shadow-[0_0_10px_rgba(0,0,0,0.05)] hover:shadow-md transition-shadow p-4 lg:p-8"
              data-aos="fade-up"
              data-aos-anchor-placement="top-bottom"
              data-aos-delay="0"
            >
              <h3 className="text-xl lg:text-2xl font-bold text-gray-900 mb-2 lg:mb-3">
                Phone Support
              </h3>
              <p className="text-gray-700 text-sm lg:text-md lg:text-lg mb-2">
                <span className="font-semibold">Phone number: </span>
                0330 160 2233
              </p>
              <p className="text-gray-600 italic text-sm lg:text-md lg:text-lg">
                (Email is currently the fastest way to contact us.)
              </p>
            </div>

            {/* Company Information */}
            <div
              className="bg-white rounded-sm shadow-[0_0_10px_rgba(0,0,0,0.05)] hover:shadow-md transition-shadow p-4 lg:p-8"
              data-aos="fade-up"
              data-aos-anchor-placement="top-bottom"
              data-aos-delay="100"
            >
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

            <div
              className="bg-white rounded-sm shadow-[0_0_10px_rgba(0,0,0,0.05)] hover:shadow-md transition-shadow p-4 lg:p-8"
              data-aos="fade-up"
              data-aos-anchor-placement="top-bottom"
              data-aos-delay="200"
            >
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
      <section className="py-8 lg:py-24 px-4">
        <div className="container mx-auto">
          <h2
            className="text-2xl lg:text-4xl font-bold text-center text-gray-900 mb-2 lg:mb-4"
            data-aos="fade-up"
            data-aos-anchor-placement="top-bottom"
          >
            Send Us a Message
          </h2>
          <p
            className="text-center text-gray-600 mb-6 lg:mb-12 text-sm lg:text-lg"
            data-aos="fade-up"
            data-aos-anchor-placement="top-bottom"
            data-aos-delay="100"
          >
            Fill out the form below and we&apos;ll get back to you soon
          </p>

          <div
            className="max-w-4xl mx-auto"
            data-aos="fade-up"
            data-aos-anchor-placement="top-bottom"
            data-aos-delay="200"
          >
            <form
              onSubmit={handleSubmit}
              className="bg-white rounded-sm shadow-[0_0_10px_rgba(0,0,0,0.05)] p-4 lg:p-12"
            >
              <div className="space-y-4 lg:space-y-6">
                <div>
                  <InputField
                    title="Full name"
                    name="fullName"
                    placeholder="Enter your full name"
                    type="text"
                    initialValue={formData.fullName}
                    onChange={(value) =>
                      setFormData((prev) => ({ ...prev, fullName: value }))
                    }
                    required
                  />
                  {validationErrors.name && (
                    <p className="mt-1 text-sm text-red-500">
                      {validationErrors.name}
                    </p>
                  )}
                </div>

                {/* Email */}
                <div>
                  <InputField
                    title="Email address"
                    name="email"
                    placeholder="Enter your email address"
                    type="email"
                    initialValue={formData.email}
                    onChange={(value) =>
                      setFormData((prev) => ({ ...prev, email: value }))
                    }
                    required
                  />
                  {validationErrors.email && (
                    <p className="mt-1 text-sm text-red-500">
                      {validationErrors.email}
                    </p>
                  )}
                </div>

                {/* Phone */}
                <div>
                  <InputField
                    title="Phone number (optional)"
                    name="phone"
                    placeholder="Enter your phone number"
                    type="tel"
                    initialValue={formData.phone}
                    onChange={(value) =>
                      setFormData((prev) => ({ ...prev, phone: value }))
                    }
                  />
                </div>

                {/* Subject */}
                <div>
                  <InputField
                    title="Subject"
                    name="subject"
                    placeholder="Enter message subject"
                    type="text"
                    initialValue={formData.subject}
                    onChange={(value) =>
                      setFormData((prev) => ({ ...prev, subject: value }))
                    }
                    required
                  />
                  {validationErrors.subject && (
                    <p className="mt-1 text-sm text-red-500">
                      {validationErrors.subject}
                    </p>
                  )}
                </div>

                {/* Message */}
                <div>
                  <label
                    htmlFor="message"
                    className="block text-[14px] lg:text-[16px] font-medium text-primaryText mb-1"
                  >
                    Message <span className="text-red-500 ml-1">*</span>
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    rows={6}
                    value={formData.message}
                    onChange={handleInputChange}
                    className="w-full rounded-sm border border-primaryTextLight bg-transparent px-5 py-3 text-[16px] lg:text-[14px] text-primaryText outline-none transition focus:border-primary focus:ring-1 focus:ring-primary/20 disabled:cursor-not-allowed disabled:bg-gray-100 resize-vertical"
                    placeholder="Enter your message"
                  />
                  {validationErrors.message && (
                    <p className="mt-1 text-sm text-red-500">
                      {validationErrors.message}
                    </p>
                  )}
                </div>

                {/* Privacy Consent */}
                <div className="w-full space-y-3 -mt-6 mb-5 lg:mb-10">
                  <div className="flex items-start gap-3">
                    <input
                      type="checkbox"
                      id="privacyConsent"
                      name="privacyConsent"
                      required
                      checked={formData.privacyConsent}
                      onChange={handleInputChange}
                      className="mt-3 w-4 h-4 rounded border-primaryTextLight bg-transparent text-primary focus:ring-1 focus:ring-primary/20 cursor-pointer"
                    />
                    <label
                      htmlFor="privacyConsent"
                      className="text-[14px] lg:text-[16px] text-primaryText leading-relaxed flex-1 pt-2"
                    >
                      I consent to the processing of my personal data in
                      accordance with the privacy policy.
                      <span className="text-red-500 ml-1">*</span>
                    </label>
                  </div>
                </div>

                {/* Submit Button */}
                <Button
                  type="submit"
                  disabled={isSubmitting || isLoading}
                  className="font-bold w-full lg:w-full"
                >
                  {isSubmitting || isLoading ? "Sending..." : "Send Message"}
                </Button>
              </div>
            </form>
          </div>
        </div>
      </section>

      {/* Why Contact Section */}
      <section className="py-8 lg:py-24 px-4 bg-white">
        <div className="container mx-auto">
          <h2 className="text-2xl lg:text-4xl font-bold text-center text-gray-900 mb-2 lg:mb-4">
            Why Contact Trade Link Network?
          </h2>
          <p className="text-center text-gray-600 mb-6 lg:mb-12 text-sm lg:text-lg">
            Discover what makes our service the preferred choice
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 lg:gap-6 mx-auto">
            {whyContactPoints.map((point, index) => (
              <div
                key={index}
                className="bg-white rounded-sm p-4 lg:p-6 shadow-[0_0_10px_rgba(0,0,0,0.05)] hover:shadow-md transition-shadow"
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
                      {point}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Privacy Section */}
      <section className="py-8 lg:py-24 px-4">
        <div className="container mx-auto">
          <div className="max-w-5xl mx-auto">
            <div className="bg-white rounded-sm shadow-[0_0_10px_rgba(0,0,0,0.05)] hover:shadow-md transition-shadow p-4 lg:p-8">
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

      {/* CTA Section */}
      <section className="bg-primary py-10 lg:py-20 px-4">
        <div className="container mx-auto text-center flex flex-col items-center">
          <h2 className="text-2xl lg:text-4xl font-bold text-white mb-2 lg:mb-4">
            Need Quick Answers?
          </h2>
          <p className="text-md lg:text-xl text-blue-100 mb-4 lg:mb-8 max-w-2xl mx-auto">
            Visit our Frequently Asked Questions page for common queries and
            guidance.
          </p>
          <Button
            className="font-bold w-48"
            variant="secondary"
            onClick={() => router.push("/faq")}
          >
            Visit FAQ Page
          </Button>
        </div>
      </section>
    </main>
  );
}
