"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronDown } from "lucide-react";
import { useMemo, useState, useEffect, useRef } from "react";

type NavItem = { label: string; href: string };

const NAV: NavItem[] = [
  { label: "Leads", href: "/trade-person/leads" },
  { label: "My Responses", href: "/trade-person/my-responses" },
];

function isActive(pathname: string, href: string) {
  return pathname === href || pathname.startsWith(`${href}/`);
}

export default function TradePersonHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const activeLabel = useMemo(() => {
    if (isActive(pathname, "/trade-person/about")) return "About";
    if (isActive(pathname, "/trade-person/reviews")) return "Reviews";
    return "My Account";
  }, [pathname]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    };

    if (open) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [open]);

  return (
    <div className="   bg-white">
      <header className=" container mx-auto">
        <div className="flex flex-wrap items-center justify-between gap-3 px-5 py-4">
          <Link href="/" className="flex items-center gap-3">
            <Image
              src="/assets/logo-nav.png"
              alt="TradeLink Network"
              width={150}
              height={48}
              className="h-auto w-[140px]"
              priority
            />
          </Link>

          <nav className="flex items-center gap-6">
            {NAV.map((item) => {
              const active = isActive(pathname, item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`text-[13px] font-semibold ${
                    active
                      ? "text-primary"
                      : "text-slate-600 hover:text-primary"
                  }`}
                  aria-current={active ? "page" : undefined}
                >
                  {item.label}
                </Link>
              );
            })}

            <div className="relative" ref={dropdownRef}>
              <button
                type="button"
                onClick={() => setOpen((v) => !v)}
                className="inline-flex items-center gap-2 rounded-md border border-slate-300 bg-white px-3 py-1.5 text-[13px] font-semibold text-slate-700 hover:bg-slate-50"
                aria-expanded={open}
              >
                {activeLabel}
                <ChevronDown size={16} className={open ? "rotate-180" : ""} />
              </button>

              {open ? (
                <div className="absolute right-0 z-20 mt-2 w-[180px] overflow-hidden rounded-lg border border-slate-200 bg-white shadow-lg">
                  <Link
                    href="/trade-person/about"
                    className={`block px-4 py-2 text-[13px] ${
                      isActive(pathname, "/trade-person/about")
                        ? "bg-primary/10 text-primary"
                        : "text-slate-700 hover:bg-slate-50"
                    }`}
                    onClick={() => setOpen(false)}
                  >
                    About
                  </Link>
                  <Link
                    href="/trade-person/reviews"
                    className={`block px-4 py-2 text-[13px] ${
                      isActive(pathname, "/trade-person/reviews")
                        ? "bg-primary/10 text-primary"
                        : "text-slate-700 hover:bg-slate-50"
                    }`}
                    onClick={() => setOpen(false)}
                  >
                    Reviews
                  </Link>
                  <Link
                    href="/"
                    className={`block px-4 py-2 text-[13px] ${
                      isActive(pathname, "/")
                        ? "bg-primary/10 text-primary"
                        : "text-slate-700 hover:bg-slate-50"
                    }`}
                    onClick={() => setOpen(false)}
                  >
                    Go to Home
                  </Link>
                  <Link
                    href="/login"
                    className={`block px-4 py-2 text-[13px] ${
                      isActive(pathname, "/login")
                        ? "bg-primary/10 text-primary"
                        : "text-slate-700 hover:bg-slate-50"
                    }`}
                    onClick={() => setOpen(false)}
                  >
                    Logout
                  </Link>
                </div>
              ) : null}
            </div>
          </nav>
        </div>
      </header>
    </div>
  );
}
