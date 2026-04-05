"use client";

import Link from "next/link";

export interface BreadcrumbItem {
  label: string;
  href?: string;
  current?: boolean;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
}

export default function Breadcrumb({ items }: BreadcrumbProps) {
  return (
    <nav aria-label="Breadcrumb">
      <div className="container mx-auto text-sm">
        <ol className="flex flex-wrap items-center gap-2">
          {items.map((item, index) => (
            <li key={index} className="flex items-center gap-2">
              {item.href && !item.current ? (
                <Link
                  href={item.href}
                  className="text-blue-600 hover:text-blue-800 hover:underline transition-colors"
                >
                  {item.label}
                </Link>
              ) : (
                <span
                  className={
                    item.current
                      ? "text-gray-900 font-semibold"
                      : "text-gray-600"
                  }
                  aria-current={item.current ? "page" : undefined}
                >
                  {item.label}
                </span>
              )}

              {index < items.length - 1 && (
                <span className="text-gray-400">/</span>
              )}
            </li>
          ))}
        </ol>
      </div>
    </nav>
  );
}
