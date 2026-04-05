"use client";

import { useState, useRef, useEffect } from "react";
import { useParams } from "next/navigation";
import AOS from "aos";
import "aos/dist/aos.css";
import {
  useGetCategoriesQuery,
  useGetCategoriesFaqsQuery,
} from "@/store/slice/categoriesSlice";
import { skipToken } from "@reduxjs/toolkit/query";

interface FAQItemProps {
  item: { _id: string; question: string; answer: string };
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
  const params = useParams();
  const serviceId = params?.id as string | undefined;

  const [expandedLeftTop, setExpandedLeftTop] = useState<string | null>(null);
  const [expandedRightTop, setExpandedRightTop] = useState<string | null>(null);

  useEffect(() => {
    AOS.init({
      duration: 600,
      once: true,
      easing: "ease-out",
      offset: 50,
      mirror: false,
    });
  }, []);

  // Get categories to find the selected one
  const { data: categories } = useGetCategoriesQuery({});
  const selectedCategory =
    categories?.find(
      (c: { slug: string; _id: string; name: string }) => c.slug === serviceId,
    ) || null;

  const categoryId = selectedCategory?._id;

  // Fetch FAQs for the selected category
  const {
    data: faqsData,
    isLoading,
    isError,
  } = useGetCategoriesFaqsQuery(categoryId || skipToken);

  // Handle different response formats
  let faqItems: {
    _id: string;
    question: string;
    answer: string;
  }[] = [];

  if (faqsData) {
    if (Array.isArray(faqsData)) {
      faqItems = faqsData;
    } else if (faqsData.faqs && Array.isArray(faqsData.faqs)) {
      faqItems = faqsData.faqs;
    } else if (faqsData.data && Array.isArray(faqsData.data)) {
      faqItems = faqsData.data;
    }
  }

  const splitIndex = Math.ceil(faqItems.length / 2);
  const faqItemsLeftTop = faqItems.slice(0, splitIndex);
  const faqItemsRightTop = faqItems.slice(splitIndex);

  const toggleExpand = (id: string, section: "leftTop" | "rightTop") => {
    if (section === "leftTop") {
      setExpandedLeftTop(expandedLeftTop === id ? null : id);
    } else if (section === "rightTop") {
      setExpandedRightTop(expandedRightTop === id ? null : id);
    }
  };

  if (isLoading) {
    return (
      <div className="bg-white">
        <div className="container mx-auto px-4 lg:px-0">
          <div className="pt-10 pb-15 lg:pt-30 lg:pb-40">
            <p className="text-center">Loading FAQs...</p>
          </div>
        </div>
      </div>
    );
  }

  if (isError || !faqItems || faqItems.length === 0) {
    return (
      <div className="bg-white">
        <div className="container mx-auto px-4 lg:px-0">
          <div className="pt-10 pb-15 lg:pt-30 lg:pb-40">
            <p className="text-center">No FAQs available</p>
          </div>
        </div>
      </div>
    );
  }

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
          <div className="flex flex-col lg:flex-row items-start gap-5 lg:gap-12 mt-4 lg:mt-20">
            {/* Left side */}
            <div
              className="w-full lg:w-1/2"
              data-aos="fade-up"
              data-aos-delay="100"
            >
              {faqItemsLeftTop.map((item) => (
                <div
                  key={item._id}
                  data-aos="fade-up"
                  data-aos-delay={`${item._id.charCodeAt(0) * 5}`}
                >
                  <FAQItem
                    item={item}
                    isExpanded={expandedLeftTop === item._id}
                    onToggle={() => toggleExpand(item._id, "leftTop")}
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
                  key={item._id}
                  data-aos="fade-up"
                  data-aos-delay={`${item._id.charCodeAt(0) * 5}`}
                >
                  <FAQItem
                    item={item}
                    isExpanded={expandedRightTop === item._id}
                    onToggle={() => toggleExpand(item._id, "rightTop")}
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
