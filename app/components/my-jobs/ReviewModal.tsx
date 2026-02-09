"use client";

import { useState, useEffect } from "react";
import { Star, X } from "lucide-react";
import Button from "../ui/Button";

type ReviewModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onSubmit?: (rating: number, review: string) => Promise<void> | void;
  isLoading?: boolean;
};

export default function ReviewModal({
  isOpen,
  onClose,
  onSubmit,
  isLoading = false,
}: ReviewModalProps) {
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [review, setReview] = useState("");

  useEffect(() => {
    if (!isOpen) {
      setRating(0);
      setHoverRating(0);
      setReview("");
    }
  }, [isOpen]);

  const handleSubmit = async () => {
    if (onSubmit) {
      await onSubmit(rating, review);
    }
  };

  const handleClose = () => {
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4">
      <div className="flex w-full max-w-lg flex-col gap-6 rounded-lg bg-white p-4 shadow-lg md:p-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <h2 className="text-[22px] font-bold text-primaryText">
            Rating & Review
          </h2>
          <button
            onClick={handleClose}
            className="rounded-lg p-1 hover:bg-slate-100 disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={isLoading}
          >
            <X className="h-6 w-6 text-slate-600" />
          </button>
        </div>

        {/* Star Rating */}
        <div className="flex flex-col gap-3">
          <p className="text-[18px] font-medium text-primaryText">
            How was the service?
          </p>
          <div className="flex gap-2">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                onMouseEnter={() => !isLoading && setHoverRating(star)}
                onMouseLeave={() => setHoverRating(0)}
                onClick={() => !isLoading && setRating(star)}
                className="transition-transform hover:scale-110"
                disabled={isLoading}
              >
                <Star
                  size={32}
                  className={`transition ${
                    star <= (hoverRating || rating)
                      ? "fill-[#FF8D28] text-[#FF8D28]"
                      : "text-slate-300 fill-gray-300"
                  }`}
                />
              </button>
            ))}
          </div>
        </div>

        {/* Text Area */}
        <div className="flex flex-col gap-3">
          <label
            htmlFor="review"
            className="text-[18px] font-medium text-primaryText"
          >
            Your Review
          </label>
          <textarea
            id="review"
            value={review}
            onChange={(e) => setReview(e.target.value)}
            placeholder="Share your experience..."
            disabled={isLoading}
            className="min-h-34 rounded-lg border border-slate-300 px-4 py-3 text-sm placeholder-slate-400 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 disabled:opacity-50 disabled:cursor-not-allowed"
          />
        </div>

        {/* Actions */}
        <div className="flex gap-3">
          <Button
            variant="outline"
            size="md"
            className="flex-1"
            onClick={handleClose}
            disabled={isLoading}
          >
            Cancel
          </Button>
          <Button
            variant="primary"
            size="md"
            className="flex-1"
            onClick={handleSubmit}
            disabled={rating === 0 || isLoading}
          >
            {isLoading ? "Submitting..." : "Submit Review"}
          </Button>
        </div>
      </div>
    </div>
  );
}
