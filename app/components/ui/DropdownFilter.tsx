"use client";

import { useState } from "react";

type SortValue = "low-high" | "high-low";

export default function DropdownFilter() {
  const [sort, setSort] = useState<SortValue>("low-high");

  return (
    <div className="relative w-48">
      <select
        value={sort}
        onChange={(e) => setSort(e.target.value as SortValue)}
        className="w-full appearance-none rounded-sm border border-gray-300 bg-white px-3 pr-10 py-2.5 text-sm outline-none focus:border-gray-400 focus:ring-1 focus:ring-gray-400"
      >
        <option value="low-high">Sortieren</option>
        <option value="high-low">Higher Rating</option>
        <option value="high-low">Lower Rating</option>
      </select>

      {/* Custom Arrow */}
      <svg
        className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        viewBox="0 0 24 24"
      >
        <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
      </svg>
    </div>
  );
}
