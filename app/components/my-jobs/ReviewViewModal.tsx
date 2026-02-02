"use client";

import { Star, X } from "lucide-react";
import Button from "../ui/Button";

type ReviewData = {
  rating: number;
  text: string;
  reviewer?: string;
  date?: string;
};

type ReviewViewModalProps = {
  isOpen: boolean;
  onClose: () => void;
  review: ReviewData | null;
};

export default function ReviewViewModal({
  isOpen,
  onClose,
  review,
}: ReviewViewModalProps) {
  if (!isOpen || !review) return null;

  const { rating, text, reviewer, date } = review;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4">
      <div className="flex w-full max-w-lg flex-col gap-6 rounded-lg bg-white p-4 shadow-lg md:p-6">
        <div className="flex items-center justify-between">
          <h2 className="text-[22px] font-bold text-primaryText">Review</h2>
          <button
            onClick={onClose}
            className="rounded-lg p-1 hover:bg-slate-100"
            aria-label="Close"
          >
            <X className="h-6 w-6 text-slate-600" />
          </button>
        </div>

        <div className="flex items-center gap-3">
          {[1, 2, 3, 4, 5].map((star) => (
            <Star
              key={star}
              size={28}
              className={
                star <= rating
                  ? "fill-[#FF8D28] text-[#FF8D28]"
                  : "text-slate-300 fill-slate-300"
              }
            />
          ))}
          <span className="text-sm font-semibold text-primaryText">
            {rating.toFixed(1)}
          </span>
        </div>

        <div className="rounded-lg border border-slate-200 bg-slate-50 p-4 text-sm text-primaryText">
          {text || "No review text provided."}
        </div>

        {(reviewer || date) && (
          <div className="text-xs text-slate-500">
            {reviewer ? (
              <span className="font-semibold">{reviewer}</span>
            ) : null}
            {reviewer && date ? <span> • </span> : null}
            {date ? <span>{date}</span> : null}
          </div>
        )}

        <div className="flex justify-end">
          <Button variant="primary" onClick={onClose}>
            Close
          </Button>
        </div>
      </div>
    </div>
  );
}
