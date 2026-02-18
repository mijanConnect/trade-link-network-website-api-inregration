"use client";

import { ChangeEvent, useState, useEffect } from "react";
import { Eye, EyeOff } from "lucide-react";

type InputFieldProps = {
  title?: string;
  placeholder?: string;
  type?: "text" | "email" | "password" | "number" | "date" | "tel";
  initialValue?: string;
  name?: string;
  onChange?: (value: string) => void;
  disabled?: boolean;
  required?: boolean;
};

export default function InputField({
  title,
  placeholder,
  type = "text",
  initialValue = "",
  name,
  onChange,
  disabled = false,
  required = false,
}: InputFieldProps) {
  const [value, setValue] = useState(initialValue);
  const [showPassword, setShowPassword] = useState(false);

  // Update value when initialValue prop changes
  useEffect(() => {
    setValue(initialValue);
  }, [initialValue]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setValue(newValue);
    onChange?.(newValue);
  };

  const inputType = type === "password" && showPassword ? "text" : type;

  return (
    <div className="w-full space-y-3">
      {title && (
        <label className="block text-[14px] lg:text-[16px] font-medium text-primaryText mb-1">
          {title}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}

      <div className="relative">
        <input
          type={inputType}
          name={name}
          value={value}
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
            py-3
            text-[16px]
            lg
            :text-[14px]
            text-primaryText
            outline-none
            transition
            focus:border-primary
            focus:ring-1
            focus:ring-primary/20
            disabled:cursor-not-allowed
            disabled:bg-gray-100
          "
        />
        {type === "password" && (
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            disabled={disabled}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pt-1 hover:text-gray-500 disabled:cursor-not-allowed disabled:opacity-50 cursor-pointer"
          >
            {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
          </button>
        )}
      </div>
    </div>
  );
}
