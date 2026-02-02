"use client";

import { ChevronDown } from "lucide-react";
import { useState } from "react";

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
}

export function CustomSelect({
  options,
  label,
  header,
  placeholder = "Please select",
  value,
  onChange,
}: CustomSelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [internalValue, setInternalValue] = useState<string | null>(null);
  const selected = value ?? internalValue;

  return (
    <div className="w-full">
      {label && (
        <label className="block text-[16px] lg:text-[18px] font-semibold text-primaryText mb-3">
          {label}
        </label>
      )}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-5 py-3 text-[14px] lg:text-[16px] text-left text-primaryText border border-primaryTextLight rounded-sm bg-transparent hover:bg-gray-50 flex items-center justify-between"
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
    </div>
  );
}
