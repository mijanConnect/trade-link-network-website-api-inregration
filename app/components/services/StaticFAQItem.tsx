"use client";

import { useState, useRef, useEffect } from "react";

interface FAQItemProps {
  question: string;
  answer: string;
}

interface StaticFAQItemProps {
  items?: FAQItemProps[];
}

export const staticFaqs = [
  {
    question: "How quickly can I get responses after posting a job?",
    answer:
      "Most homeowners start receiving responses from interested professionals within a short time, depending on service demand in the area.",
  },
  {
    question: "Can I compare more than one quote?",
    answer:
      "Yes. You can review multiple responses, compare prices, timelines, and reviews before choosing who to work with.",
  },
  {
    question: "Are professionals verified?",
    answer:
      "TradeLink Network focuses on quality by encouraging profile completeness, customer feedback, and transparent service history.",
  },
];

function FAQItem({ question, answer }: FAQItemProps) {
  const [isExpanded, setIsExpanded] = useState(false);
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
    <div className="border-b border-gray-200 overflow-hidden">
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full flex justify-between items-center py-4 transition-colors duration-200"
      >
        <p className="text-[16px] lg:text-[18px] text-left text-primaryText font-semibold">
          {question}
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
          <p className="text-[16px] text-gray-600">{answer}</p>
        </div>
      </div>
    </div>
  );
}

export default function StaticFAQItem({ items }: StaticFAQItemProps) {
  const faqItems = items?.length ? items : staticFaqs;

  return (
    <div>
      {faqItems.map((faq) => (
        <FAQItem
          key={faq.question}
          question={faq.question}
          answer={faq.answer}
        />
      ))}
    </div>
  );
}
