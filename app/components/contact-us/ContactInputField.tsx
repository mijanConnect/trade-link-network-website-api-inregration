"use client";

import { useState } from "react";

export default function ContactInputField({
  label = "First Name*", // Default value for the label
  placeholder = "Your Name", // Default value for the placeholder
  borderColor = "primary", // Default border color
  inputType = "text", // Default input type
  rows = 4, // Default rows for textarea
}) {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <div
      className={`flex flex-col px-4 py-1 rounded-md transition transform w-full ${
        isFocused ? `border border-${borderColor}` : "border"
      }`}
    >
      <label htmlFor="" className="text-[13px] text-primaryText">
        {label}
      </label>
      {inputType === "textArea" ? (
        <textarea
          rows={rows}
          placeholder={placeholder}
          className="border-none outline-none bg-transparent mt-1 text-[15px] text-primaryText placeholder:text-gray-400 resize-none"
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
        />
      ) : (
        <input
          type={inputType}
          placeholder={placeholder}
          className="border-none outline-none bg-transparent mt-1 text-[15px] text-primaryText placeholder:text-gray-400"
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
        />
      )}
    </div>
  );
}
