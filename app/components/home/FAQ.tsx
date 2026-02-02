"use client";

import { useState, useRef, useEffect } from "react";

const faqItemsLeftTop = [
  {
    id: 1,
    question: "What is needed to rent a vehicle?",
    answer:
      "To rent a vehicle, you typically need a valid drivers license, a credit card, and proof of insurance. Some rental companies may have additional requirements, so its best to check with them directly.",
  },
  {
    id: 2,
    question: "What are the age requirements?",
    answer:
      "Most rental companies require drivers to be at least 18-21 years old. Drivers under 25 may incur additional young driver fees. A valid drivers license is mandatory.",
  },
  {
    id: 3,
    question: "Can I rent a vehicle with a credit card?",
    answer:
      "Yes, a credit card is typically required for the security deposit. Debit cards may be accepted at some locations but often require additional verification.",
  },
];

const faqItemsRightTop = [
  {
    id: 1,
    question: "What is needed to rent a vehicle?",
    answer:
      "To rent a vehicle, you typically need a valid drivers license, a credit card, and proof of insurance. Some rental companies may have additional requirements, so its best to check with them directly.",
  },
  {
    id: 2,
    question: "What are the age requirements?",
    answer:
      "Most rental companies require drivers to be at least 18-21 years old. Drivers under 25 may incur additional young driver fees. A valid drivers license is mandatory.",
  },
  {
    id: 3,
    question: "Can I rent a vehicle with a credit card?",
    answer:
      "Yes, a credit card is typically required for the security deposit. Debit cards may be accepted at some locations but often require additional verification.",
  },
];

interface FAQItemProps {
  item: { id: number; question: string; answer: string };
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

export default function FAQ() {
  const [expandedLeftTop, setExpandedLeftTop] = useState<number | null>(null);
  const [expandedLeftBottom, setExpandedLeftBottom] = useState<number | null>(
    null,
  );
  const [expandedRightTop, setExpandedRightTop] = useState<number | null>(null);
  const [expandedRightBottom, setExpandedRightBottom] = useState<number | null>(
    null,
  );

  const toggleExpand = (
    id: number,
    section: "leftTop" | "leftBottom" | "rightTop" | "rightBottom",
  ) => {
    if (section === "leftTop") {
      setExpandedLeftTop(expandedLeftTop === id ? null : id);
    } else if (section === "leftBottom") {
      setExpandedLeftBottom(expandedLeftBottom === id ? null : id);
    } else if (section === "rightTop") {
      setExpandedRightTop(expandedRightTop === id ? null : id);
    } else if (section === "rightBottom") {
      setExpandedRightBottom(expandedRightBottom === id ? null : id);
    }
  };

  return (
    <div className="bg-white">
      <div className="container mx-auto px-4 lg:px-0">
        <div className=" py-25">
          <h2 className="text-center text-[20px] md:text-[40px] font-semibold text-primaryText">
            Frequently <br /> Asked Questions
          </h2>
          <div className="flex flex-col lg:flex-row items-start gap-5 lg:gap-12 mt-4 lg:mt-20">
            {/* Left side */}
            <div>
              {faqItemsLeftTop.map((item) => (
                <FAQItem
                  key={item.id}
                  item={item}
                  isExpanded={expandedLeftTop === item.id}
                  onToggle={() => toggleExpand(item.id, "leftTop")}
                />
              ))}
            </div>
            {/* Right side */}
            <div>
              {faqItemsRightTop.map((item) => (
                <FAQItem
                  key={item.id}
                  item={item}
                  isExpanded={expandedRightTop === item.id}
                  onToggle={() => toggleExpand(item.id, "rightTop")}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
