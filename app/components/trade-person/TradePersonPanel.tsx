import type { ReactNode } from "react";

type Props = {
  title?: string;
  children: ReactNode;
  className?: string;
};

export default function TradePersonPanel({ title, children, className }: Props) {
  return (
    <section
      className={`rounded-sm   bg-cardBg ${className ?? ""}`}
    >
      {title ? (
        <div className="  px-5 py-4">
          <h2 className="text-[14px] font-semibold text-primaryText">{title}</h2>
        </div>
      ) : null}
      <div className="px-5 py-4">{children}</div>
    </section>
  );
}

