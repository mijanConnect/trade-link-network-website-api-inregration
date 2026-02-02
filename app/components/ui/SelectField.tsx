import type { ChangeEvent } from "react";

type Option = {
  label: string;
  value: string;
};

type SelectFieldProps = {
  title?: string;
  name?: string;
  value?: string;
  options: Option[];
  placeholder?: string;
  onChange?: (e: ChangeEvent<HTMLSelectElement>) => void;
  disabled?: boolean;
};

export default function SelectField({
  title,
  name,
  value,
  options,
  placeholder = "Select an option",
  onChange,
  disabled = false,
}: SelectFieldProps) {
  return (
    <div className="w-full space-y-3">
      {title && (
        <label className="text-[16px] font-medium text-[#6C6C6C]">
          {title}
        </label>
      )}

      {/* Wrapper for custom icon */}
      <div className="relative">
        <select
          name={name}
          value={value}
          onChange={onChange}
          disabled={disabled}
          className="
            mt-1
            w-full
            h-12
            appearance-none
            rounded-[8px]
            border
            border-[#E2E8F0]
            bg-transparent
            px-3
            pr-10
            py-3
            text-[14px]
            text-[#292929]
            outline-none
            transition
            focus:border-primary
            focus:ring-1
            focus:ring-primary/20
            disabled:cursor-not-allowed
            disabled:bg-gray-100
          "
        >
          <option value="" disabled>
            {placeholder}
          </option>

          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>

        {/* Custom Dropdown Icon */}
        <svg
          className="
            pointer-events-none
            absolute
            right-3
            top-1/2
            h-4
            w-4
            -translate-y-1/2
            text-gray-500
          "
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </div>
    </div>
  );
}
