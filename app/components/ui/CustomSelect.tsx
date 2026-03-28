"use client";

import { ChevronDown } from "lucide-react";
import { useEffect, useRef, useState } from "react";

interface Option {
  value: string;
  label: string;
}

interface CustomSelectProps {
  options: Option[];
  label?: string;
  header?: string;
  placeholder?: string;
  value?: string | null;
  onChange?: (value: string) => void;
  disabled?: boolean;
  required?: boolean;
  /**
   * "expand" — options push layout height (default).
   * "overlay" — options float below the trigger; parent height stays fixed.
   */
  dropdownLayout?: "expand" | "overlay";
}

export function CustomSelect({
  options,
  label,
  header,
  placeholder = "Please select",
  value,
  onChange,
  disabled = false,
  required = false,
  dropdownLayout = "expand",
}: CustomSelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [internalValue, setInternalValue] = useState<string | null>(null);
  const selected = value ?? internalValue;
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isOpen || dropdownLayout !== "overlay") return;
    const close = (e: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(e.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", close);
    return () => document.removeEventListener("mousedown", close);
  }, [isOpen, dropdownLayout]);

  const overlayOptionsList = (
    <div className="w-full border border-primaryTextLight bg-white rounded-sm overflow-hidden shadow-lg">
      {header && (
        <div className="px-5 py-3 text-[14px] lg:text-[16px] font-semibold text-primaryText border-b border-gray-200">
          {header}
        </div>
      )}
      <div className="max-h-[250px] overflow-y-auto">
        {options.map((option) => (
          <button
            key={option.value}
            type="button"
            onClick={() => {
              setInternalValue(option.value);
              onChange?.(option.value);
              setIsOpen(false);
            }}
            className={`w-full px-5 py-1 lg:py-2 text-[14px] lg:text-[16px] text-left transition-colors transform duration-100 ${
              selected === option.value
                ? "bg-primary text-white font-semibold"
                : "text-primaryText hover:bg-primary hover:text-white"
            }`}
          >
            {option.label}
          </button>
        ))}
      </div>
    </div>
  );

  return (
    <div
      ref={dropdownLayout === "overlay" ? containerRef : undefined}
      className={`w-full ${dropdownLayout === "overlay" ? "relative" : ""}`}
    >
      {label && (
        <label className="block text-[16px] lg:text-[18px] font-semibold text-primaryText mb-3">
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}
      <button
        type="button"
        onClick={() => !disabled && setIsOpen(!isOpen)}
        disabled={disabled}
        className={`w-full px-5 py-3 text-[14px] lg:text-[16px] text-left border border-primaryTextLight rounded-sm flex items-center justify-between ${
          disabled
            ? "bg-gray-100 text-gray-400 cursor-not-allowed"
            : "text-primaryText bg-transparent hover:bg-gray-50 cursor-pointer"
        }`}
      >
        <span className={selected ? "" : "text-gray-400 font-normal"}>
          {selected
            ? options.find((opt) => opt.value === selected)?.label
            : placeholder}
        </span>
        <span
          className={`transition-transform text-primaryText duration-300 ${isOpen ? "rotate-180" : ""}`}
        >
          <ChevronDown />
        </span>
      </button>

      {dropdownLayout === "overlay" ? (
        isOpen && (
          <div className="absolute left-0 right-0 top-full z-50 mt-1">
            {overlayOptionsList}
          </div>
        )
      ) : (
        <div
          className={`overflow-hidden transition-all duration-300 ease-in-out ${
            isOpen ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          <div className="w-full border border-primaryTextLight border-t-0 bg-transparent rounded-sm overflow-hidden">
            {header && (
              <div className="px-5 py-3 text-[14px] lg:text-[16px] font-semibold text-primaryText border-b border-gray-200">
                {header}
              </div>
            )}
            <div className="max-h-[250px] overflow-y-auto">
              {options.map((option) => (
                <button
                  key={option.value}
                  type="button"
                  onClick={() => {
                    setInternalValue(option.value);
                    onChange?.(option.value);
                    setIsOpen(false);
                  }}
                  className={`w-full px-5 py-1 lg:py-2 text-[14px] lg:text-[16px] text-left transition-colors transform duration-100 ${
                    selected === option.value
                      ? "bg-primary text-white font-semibold"
                      : "text-primaryText hover:bg-primary hover:text-white"
                  }`}
                >
                  {option.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
