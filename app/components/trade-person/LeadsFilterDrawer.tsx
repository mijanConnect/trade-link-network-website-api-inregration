"use client";

import type { DateFilterKey, SortOption } from "@/app/trade-person/leads/[leadId]/page";
import { X, SlidersHorizontal } from "lucide-react";

type Props = {
  isOpen: boolean;
  sortOption: SortOption;
  dateFilters: DateFilterKey[];
  onClose: () => void;
  onSortChange: (value: SortOption) => void;
  onToggleDateFilter: (key: DateFilterKey) => void;
  onReset: () => void;
};

export function LeadsFilterButton({ onClick }: { onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="inline-flex items-center gap-1 rounded-md cursor-pointer bg-white px-3 py-1 text-[12px] font-medium text-slate-700  transition hover:bg-slate-50 "
    >
      <SlidersHorizontal size={14} />
      <span>Filter</span>
    </button>
  );
}

export default function LeadsFilterDrawer({
  isOpen,
  sortOption,
  dateFilters,
  onClose,
  onSortChange,
  onToggleDateFilter,
  onReset,
}: Props) {
  return (
    <div
      className={`fixed inset-0 z-40 transform transition ${
        isOpen ? "pointer-events-auto" : "pointer-events-none"
      }`}
    >
      {/* Backdrop */}
      <div
        className={`absolute inset-0 bg-black/30 transition-opacity ${
          isOpen ? "opacity-100" : "opacity-0"
        }`}
        onClick={onClose}
      />

      {/* Panel - opens from left */}
      <div
        className={`absolute left-0 top-0 flex h-full w-full max-w-sm transform flex-col bg-white shadow-xl transition-transform duration-300 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between border-b border-slate-200 px-4 py-3">
          <div>
            <h2 className="text-sm font-semibold text-slate-900">
              Filter & sort leads
            </h2>
            <p className="text-[11px] text-slate-500">
              Refine your list to find the best leads faster
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="rounded-full p-1.5 hover:bg-slate-100"
          >
            <X size={16} className="text-slate-600" />
          </button>
        </div>

        <div className="flex-1 space-y-6 overflow-y-auto px-4 py-4 text-[13px]">
          {/* Sort section */}
          <section>
            <h3 className="text-[12px] font-semibold uppercase tracking-wide text-slate-500">
              Sort by
            </h3>
            <div className="mt-3 space-y-2">
              <label className="flex cursor-pointer items-center justify-between rounded-md border border-slate-200 px-3 py-2 text-sm hover:border-slate-300">
                <div>
                  <span className="font-medium text-slate-800">Date</span>
                  <p className="text-[11px] text-slate-500">
                    Newest requests shown first
                  </p>
                </div>
                <input
                  type="radio"
                  name="sort"
                  className="h-4 w-4 accent-primary"
                  checked={sortOption === "date"}
                  onChange={() => onSortChange("date")}
                />
              </label>

              <label className="flex cursor-pointer items-center justify-between rounded-md border border-slate-200 px-3 py-2 text-sm hover:border-slate-300">
                <div>
                  <span className="font-medium text-slate-800">
                    Lead availability
                  </span>
                  <p className="text-[11px] text-slate-500">
                    0 responses first, 3/3 filled last
                  </p>
                </div>
                <input
                  type="radio"
                  name="sort"
                  className="h-4 w-4 accent-primary"
                  checked={sortOption === "responses"}
                  onChange={() => onSortChange("responses")}
                />
              </label>

              <label className="flex cursor-pointer items-center justify-between rounded-md border border-slate-200 px-3 py-2 text-sm hover:border-slate-300">
                <div>
                  <span className="font-medium text-slate-800">Price</span>
                  <p className="text-[11px] text-slate-500">
                    Lower priced leads shown first
                  </p>
                </div>
                <input
                  type="radio"
                  name="sort"
                  className="h-4 w-4 accent-primary"
                  checked={sortOption === "price"}
                  onChange={() => onSortChange("price")}
                />
              </label>
            </div>
          </section>

          {/* Date filter section */}
          <section>
            <h3 className="text-[12px] font-semibold uppercase tracking-wide text-slate-500">
              Filter by date
            </h3>
            <p className="mt-1 text-[11px] text-slate-500">
              Choose when the customer posted the request
            </p>

            <div className="mt-3 space-y-2">
              <label className="flex cursor-pointer items-center justify-between rounded-md border border-slate-200 px-3 py-2 text-sm hover:border-slate-300">
                <div>
                  <span className="font-medium text-slate-800">Today</span>
                  <p className="text-[11px] text-slate-500">
                    Requests posted in the last few hours
                  </p>
                </div>
                <input
                  type="checkbox"
                  className="h-4 w-4 accent-primary"
                  checked={dateFilters.includes("today")}
                  onChange={() => onToggleDateFilter("today")}
                />
              </label>

              <label className="flex cursor-pointer items-center justify-between rounded-md border border-slate-200 px-3 py-2 text-sm hover:border-slate-300">
                <div>
                  <span className="font-medium text-slate-800">Yesterday</span>
                  <p className="text-[11px] text-slate-500">
                    Requests from the last 1 day
                  </p>
                </div>
                <input
                  type="checkbox"
                  className="h-4 w-4 accent-primary"
                  checked={dateFilters.includes("yesterday")}
                  onChange={() => onToggleDateFilter("yesterday")}
                />
              </label>

              <label className="flex cursor-pointer items-center justify-between rounded-md border border-slate-200 px-3 py-2 text-sm hover:border-slate-300">
                <div>
                  <span className="font-medium text-slate-800">
                    Last 7 days
                  </span>
                  <p className="text-[11px] text-slate-500">
                    Includes today and yesterday as well
                  </p>
                </div>
                <input
                  type="checkbox"
                  className="h-4 w-4 accent-primary"
                  checked={dateFilters.includes("last7")}
                  onChange={() => onToggleDateFilter("last7")}
                />
              </label>
            </div>
          </section>
        </div>

        <div className="border-t border-slate-200 px-4 py-3">
          <div className="flex items-center justify-between gap-2">
            <button
              type="button"
              onClick={onReset}
              className="rounded-md border border-slate-300 px-3 py-2 text-[13px] font-medium text-slate-700 hover:bg-slate-50"
            >
              Clear all
            </button>
            <button
              type="button"
              onClick={onClose}
              className="flex-1 rounded-md bg-primary px-3 py-2 text-[13px] font-semibold text-white shadow-sm transition hover:bg-primary/90 hover:shadow-md"
            >
              Apply filters
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

