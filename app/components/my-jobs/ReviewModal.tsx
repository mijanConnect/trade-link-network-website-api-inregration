"use client";

import { useState } from "react";
import { Star, X } from "lucide-react";
import Button from "../ui/Button";

type ReviewModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onSubmit?: (rating: number, review: string) => void;
};

export default function ReviewModal({
  isOpen,
  onClose,
  onSubmit,
}: ReviewModalProps) {
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [review, setReview] = useState("");

  const handleSubmit = () => {
    if (onSubmit) {
      onSubmit(rating, review);
    }
    handleClose();
  };

  const handleClose = () => {
    setRating(0);
    setReview("");
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
            className="rounded-lg p-1 hover:bg-slate-100"
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
                onMouseEnter={() => setHoverRating(star)}
                onMouseLeave={() => setHoverRating(0)}
                onClick={() => setRating(star)}
                className="transition-transform hover:scale-110"
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
            className="min-h-34 rounded-lg border border-slate-300 px-4 py-3 text-sm placeholder-slate-400 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
          />
        </div>

        {/* Actions */}
        <div className="flex gap-3">
          <Button
            variant="outline"
            size="md"
            className="flex-1"
            onClick={handleClose}
          >
            Cancel
          </Button>
          <Button
            variant="primary"
            size="md"
            className="flex-1"
            onClick={handleSubmit}
            disabled={rating === 0}
          >
            Submit Review
          </Button>
        </div>
      </div>
    </div>
  );
}
