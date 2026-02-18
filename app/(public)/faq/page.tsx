"use client";

import { useState, useRef, useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

type FAQItemType = {
  id: number;
  question: string;
  answer: string;
};

type FAQSectionType = {
  title: string;
  items: FAQItemType[];
};

const faqSections: FAQSectionType[] = [
  {
    title: "FOR CUSTOMERS",
    items: [
      {
        id: 1,
        question: "How do I request a service?",
        answer:
          "Simply click Post a Job, choose the service you need, answer a few quick questions, and submit your request. Your job will then be shared with suitable local professionals.",
      },
      {
        id: 2,
        question: "Is posting a job free?",
        answer:
          "Yes. Posting a job is completely free and there is no obligation to hire anyone.",
      },
      {
        id: 3,
        question: "How do I receive quotes?",
        answer:
          "Once your job is posted, relevant tradespeople will review the details and contact you with quotes, availability, or questions.",
      },
      {
        id: 4,
        question: "How do I choose a tradesperson?",
        answer:
          "You can compare quotes, reviews, experience, and communication. You are free to choose the professional you feel most comfortable with. There is no obligation to hire anyone.",
      },
      {
        id: 5,
        question: "Do I pay through Trade Link Network?",
        answer:
          "No. Payment is arranged directly between you and the tradesperson unless otherwise agreed. Always confirm payment terms before work begins.",
      },
      {
        id: 6,
        question: "How long does it take to get responses?",
        answer:
          "Most customers receive responses within 1 to 3 days. This depends on your location, job type, and urgency.",
      },
      {
        id: 7,
        question: "What happens after I book someone?",
        answer:
          "You and the tradesperson arrange dates, pricing, and job details directly. After the work is complete, you may be invited to leave a review.",
      },
    ],
  },
  {
    title: "FOR TRADESPEOPLE",
    items: [
      {
        id: 8,
        question: "How do I join Trade Link Network?",
        answer:
          "Click Join as Tradesperson, create your profile, select your services and coverage area, and complete registration.",
      },
      {
        id: 9,
        question: "Are there any costs or fees?",
        answer:
          "Trades may pay to access leads or use certain platform features. Pricing depends on the service category and location. There is no monthly subscription. You only pay for the lead you want.",
      },
      {
        id: 10,
        question: "How do I receive leads?",
        answer:
          "When customers post jobs that match your services and location, you will be notified and can choose whether to respond.",
      },
      {
        id: 11,
        question: "How do I contact customers?",
        answer:
          "Once you accept or purchase a lead, you will receive the customer contact details to discuss the job directly.",
      },
      {
        id: 12,
        question: "How do reviews work?",
        answer:
          "Customers can leave reviews after work is completed. Reviews help build trust and improve your profile visibility.",
      },
    ],
  },
  {
    title: "PAYMENTS & PRICING",
    items: [
      {
        id: 13,
        question: "Who pays who?",
        answer:
          "Customers pay tradespeople directly for completed work unless otherwise arranged.",
      },
      {
        id: 14,
        question: "Are deposits required?",
        answer:
          "Some trades may request deposits depending on the job. Payment terms must always be agreed before work starts.",
      },
      {
        id: 15,
        question: "Is a quote the final price?",
        answer:
          "Quotes are estimates based on the information provided. Final pricing may change if job requirements change.",
      },
      {
        id: 16,
        question: "What payment methods are accepted?",
        answer:
          "Payment methods are agreed directly between the customer and tradesperson. Common methods include bank transfer, card payment, or cash.",
      },
    ],
  },
  {
    title: "PROBLEMS & COMPLAINTS",
    items: [
      {
        id: 17,
        question: "What if the work is poor quality?",
        answer:
          "Contact the tradesperson first to resolve the issue. If the problem remains unresolved, report it to Trade Link Network support.",
      },
      {
        id: 18,
        question: "What if someone cancels?",
        answer:
          "Cancellation policies are agreed between customer and tradesperson. Always confirm terms before booking.",
      },
      {
        id: 19,
        question: "How are disputes handled?",
        answer:
          "We aim to help mediate communication, but contracts and payments are between customer and tradesperson.",
      },
      {
        id: 20,
        question: "How do I report an issue?",
        answer:
          "Use the Contact Us page or email support to report concerns, misconduct, or safety issues.",
      },
      {
        id: 21,
        question: "How do I get support?",
        answer:
          "You can contact our support team by email or through the website contact form.",
      },
    ],
  },
  {
    title: "SAFETY & TRUST",
    items: [
      {
        id: 22,
        question: "Are tradespeople vetted?",
        answer:
          "We take reasonable steps to verify business details and encourage customers to check credentials before hiring.",
      },
      {
        id: 23,
        question: "Are reviews genuine?",
        answer:
          "Reviews come from real customers after completed work. We monitor suspicious activity.",
      },
      {
        id: 24,
        question: "Do tradespeople have insurance?",
        answer:
          "Many professionals carry insurance, but customers should always confirm this directly before hiring.",
      },
      {
        id: 25,
        question: "How do you prevent fraud?",
        answer:
          "We monitor activity, investigate reports, and remove accounts that breach our terms.",
      },
    ],
  },
  {
    title: "DATA & PRIVACY",
    items: [
      {
        id: 26,
        question: "How is my personal data used?",
        answer:
          "Your information is only used to connect you with relevant professionals and provide services.",
      },
      {
        id: 27,
        question: "Who can see my contact details?",
        answer:
          "Your contact details are only shared with tradespeople responding to your job request.",
      },
      {
        id: 28,
        question: "Is my data protected?",
        answer:
          "Yes. We follow UK data protection regulations and take steps to secure personal information.",
      },
    ],
  },
  {
    title: "GENERAL PROCESS",
    items: [
      {
        id: 29,
        question: "How does matching work?",
        answer:
          "Your job details are matched with tradespeople based on service type, location, and availability.",
      },
      {
        id: 30,
        question: "How quickly do trades respond?",
        answer:
          "Many respond within 1 to 3 days. Response time varies by job type and demand.",
      },
      {
        id: 31,
        question: "Where do you operate?",
        answer:
          "Trade Link Network covers most regions across England, Scotland, Wales, and Northern Ireland.",
      },
      {
        id: 32,
        question: "How do I contact Trade Link Network?",
        answer: "Visit the Contact Us page or email our support team.",
      },
    ],
  },
];

interface FAQItemProps {
  item: FAQItemType;
  isExpanded: boolean;
  onToggle: () => void;
}

function FAQItem({ item, isExpanded, onToggle }: FAQItemProps) {
  const contentRef = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState(0);

  useEffect(() => {
    if (contentRef.current) {
      const timer = setTimeout(() => {
        setHeight(isExpanded ? (contentRef.current?.scrollHeight ?? 0) : 0);
      }, 0);
      return () => clearTimeout(timer);
    }
  }, [isExpanded]);

  return (
    <div className="border-b border-stroke overflow-hidden">
      <button
        onClick={onToggle}
        className="w-full flex justify-between items-center py-3 transition-colors duration-200"
      >
        <p className="text-[16px] lg:text-[20px] text-left text-primaryText font-medium">
          {item.question}
        </p>
        <i
          className={`fa fa-chevron-down text-primaryText transition-transform duration-300 shrink-0 ml-4 ${
            isExpanded ? "rotate-180" : ""
          }`}
          aria-hidden="true"
        ></i>
      </button>
      <div
        style={{
          maxHeight: `${height}px`,
          transition: "max-height 0.3s ease-in-out",
          overflow: "hidden",
        }}
      >
        <div ref={contentRef} className="pb-4">
          <p className="text-[16px] text-gray-600">{item.answer}</p>
        </div>
      </div>
    </div>
  );
}

export default function Page() {
  const [expandedId, setExpandedId] = useState<number | null>(null);

  useEffect(() => {
    AOS.init({
      duration: 600,
      once: true,
      easing: "ease-out",
      offset: 50,
      mirror: false,
    });
  }, []);

  const toggleExpand = (id: number) => {
    setExpandedId(expandedId === id ? null : id);
  };

  return (
    <div>
      <div className="container mx-auto px-4 lg:px-0">
        <div className="pt-10 pb-15 lg:pt-15 lg:pb-40">
          <h2
            data-aos="fade-up"
            className="text-center text-[20px] md:text-[40px] font-semibold text-primaryText max-w-2xl mx-auto"
          >
            Trade Link Network – Frequently Asked Questions
          </h2>

          <div className="mt-8 lg:mt-16 space-y-8 lg:space-y-12 max-w-4xl mx-auto">
            {faqSections.map((section, index) => (
              <div
                key={section.title}
                data-aos="fade-up"
                data-aos-delay={index * 100}
              >
                <h3 className="text-[18px] lg:text-[24px] font-semibold text-primaryText mb- lg:mb-4">
                  {section.title}
                </h3>

                <div>
                  {section.items.map((item) => (
                    <FAQItem
                      key={item.id}
                      item={item}
                      isExpanded={expandedId === item.id}
                      onToggle={() => toggleExpand(item.id)}
                    />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
