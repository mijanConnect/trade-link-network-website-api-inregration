"use client";

import { ChangeEvent, useState, useEffect } from "react";

type TextareaFieldProps = {
  title?: string;
  placeholder?: string;
  initialValue?: string;
  name?: string;
  onChange?: (value: string) => void;
  disabled?: boolean;
  rows?: number;
  required?: boolean;
};

export default function TextareaField({
  title,
  placeholder,
  initialValue = "",
  name,
  onChange,
  disabled = false,
  rows = 4,
  required = false,
}: TextareaFieldProps) {
  const [value, setValue] = useState(initialValue);

  // Update value when initialValue prop changes
  useEffect(() => {
    setValue(initialValue);
  }, [initialValue]);

  const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const newValue = e.target.value;
    setValue(newValue);
    onChange?.(newValue);
  };

  return (
    <div className="w-full space-y-3">
      {title && (
        <label className="block text-[14px] lg:text-[16px] font-medium text-primaryText mb-1">
          {title}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}

      <textarea
        name={name}
        value={value}
        rows={rows}
        placeholder={placeholder}
        onChange={handleChange}
        disabled={disabled}
        required={required}
        className="
          mt-1
          w-full
          rounded-sm
          border
          border-primaryTextLight
          bg-transparent
          px-5
          py-4
          text-[16px]
          lg:text-[14px]
          text-primaryText
          outline-none
          transition
          focus:border-primary
          focus:ring-1
          focus:ring-primary/20
          disabled:cursor-not-allowed
          disabled:bg-gray-100
          resize-none
        "
      />
    </div>
  );
}
