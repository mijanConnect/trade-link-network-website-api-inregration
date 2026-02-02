type Props = {
  label: string;
  tone?: "neutral" | "success" | "warning";
};

export default function TradePersonBadge({ label, tone = "neutral" }: Props) {
  const toneClass =
    tone === "success"
      ? "bg-emerald-50 text-emerald-700 border-emerald-200"
      : tone === "warning"
        ? "bg-amber-50 text-amber-700 border-amber-200"
        : "bg-slate-50 text-slate-700 border-slate-200";

  return (
    <span
      className={`inline-flex items-center rounded-md border px-2 py-0.5 text-[12px] font-medium ${toneClass}`}
    >
      {label}
    </span>
  );
}

