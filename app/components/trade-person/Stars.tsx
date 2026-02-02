import { Star } from "lucide-react";

type Props = {
  rating: number;
  max?: number;
  size?: number;
  className?: string;
};

export default function Stars({ rating, max = 5, size = 14, className }: Props) {
  const full = Math.round(rating);
  return (
    <div className={`inline-flex items-center gap-1 ${className ?? ""}`}>
      {Array.from({ length: max }).map((_, idx) => {
        const filled = idx < full;
        return (
          <Star
            key={idx}
            size={size}
            className={filled ? "text-amber-400" : "text-slate-300"}
            fill={filled ? "currentColor" : "none"}
          />
        );
      })}
    </div>
  );
}

