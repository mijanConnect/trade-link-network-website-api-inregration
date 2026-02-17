"use client";

import { useState, useRef, useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

const faqItems = [
  {
    id: 1,
    question: "How does Trade Link Network work?",
    answer:
      "Trade Link Network connects homeowners with trusted, verified tradespeople. You post a job, suitable professionals are notified, and you can compare responses before choosing who to hire.",
  },
  {
    id: 2,
    question: "Is it free to post a job?",
    answer: "Yes. Posting a job is free, and there’s no obligation to hire.",
  },
  {
    id: 3,
    question: "How many tradespeople will contact me?",
    answer:
      "You’ll typically receive responses from up to three suitable tradespeople, depending on availability in your area.",
  },
  {
    id: 4,
    question: "Are tradespeople vetted?",
    answer:
      "Yes. All tradespeople on Trade Link Network are vetted before joining and must follow our code of conduct.",
  },
  {
    id: 5,
    question: "What if my job isn’t urgent?",
    answer:
      "That’s no problem. You can post both urgent and non-urgent jobs and choose a suitable timeframe that works for you.",
  },
  {
    id: 6,
    question: "What if I’m not sure which service to choose?",
    answer:
      "You can still post a job and describe the issue. Tradespeople can advise on the correct service if needed.",
  },
  {
    id: 7,
    question: "Do you cover the whole UK?",
    answer:
      "Yes. Trade Link Network operates across England, Scotland, Wales and Northern Ireland.",
  },
  {
    id: 8,
    question: "Can I post commercial or business jobs?",
    answer:
      "Yes. Both residential and commercial jobs can be posted on the platform.",
  },
  {
    id: 9,
    question: "Am I obligated to accept a quote?",
    answer:
      "No. You’re free to compare responses and decide whether or not to proceed.",
  },
  {
    id: 10,
    question: "How do I communicate with tradespeople?",
    answer:
      "All communication is handled via email or phone through tradesmen that accept your job lead.",
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
  const [expandedRightTop, setExpandedRightTop] = useState<number | null>(null);

  useEffect(() => {
    AOS.init({
      duration: 600,
      once: true,
      easing: "ease-out",
      offset: 50,
      mirror: false,
    });
  }, []);

  const splitIndex = Math.ceil(faqItems.length / 2);
  const faqItemsLeftTop = faqItems.slice(0, splitIndex);
  const faqItemsRightTop = faqItems.slice(splitIndex);

  const toggleExpand = (id: number, section: "leftTop" | "rightTop") => {
    if (section === "leftTop") {
      setExpandedLeftTop(expandedLeftTop === id ? null : id);
    } else if (section === "rightTop") {
      setExpandedRightTop(expandedRightTop === id ? null : id);
    }
  };

  return (
    <div className="bg-white">
      <div className="container mx-auto px-4 lg:px-0">
        <div className=" pt-10 pb-15 lg:pt-30 lg:pb-40">
          <h2
            data-aos="fade-up"
            className="text-center text-[20px] md:text-[40px] font-semibold text-primaryText"
          >
            Frequently <br /> Asked Questions
          </h2>
          <div className="flex flex-col lg:flex-row items-start gap-0 lg:gap-12 mt-4 lg:mt-20">
            {/* Left side */}
            <div
              className="w-full lg:w-1/2"
              data-aos="fade-up"
              data-aos-delay="100"
            >
              {faqItemsLeftTop.map((item) => (
                <div
                  key={item.id}
                  data-aos="fade-up"
                  data-aos-delay={`${item.id * 50}`}
                >
                  <FAQItem
                    item={item}
                    isExpanded={expandedLeftTop === item.id}
                    onToggle={() => toggleExpand(item.id, "leftTop")}
                  />
                </div>
              ))}
            </div>
            {/* Right side */}
            <div
              className="w-full lg:w-1/2"
              data-aos="fade-up"
              data-aos-delay="200"
            >
              {faqItemsRightTop.map((item) => (
                <div
                  key={item.id}
                  data-aos="fade-up"
                  data-aos-delay={`${item.id * 50}`}
                >
                  <FAQItem
                    item={item}
                    isExpanded={expandedRightTop === item.id}
                    onToggle={() => toggleExpand(item.id, "rightTop")}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
