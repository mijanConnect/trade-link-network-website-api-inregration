"use client";

import { useEffect, useRef } from "react";
import Script from "next/script";

declare global {
  interface Window {
    Trustpilot?: {
      loadFromElement: (element: HTMLElement | null, force?: boolean) => void;
    };
  }
}

export default function TrustPilot() {
  const ref = useRef<HTMLDivElement>(null);

  const handleScriptLoad = () => {
    // Initialize widget after script loads
    if (window.Trustpilot && ref.current) {
      window.Trustpilot.loadFromElement(ref.current, true);
    }
  };

  useEffect(() => {
    // Try to load if script is already loaded
    const timer = setTimeout(() => {
      if (window.Trustpilot && ref.current) {
        window.Trustpilot.loadFromElement(ref.current, true);
      }
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <Script
        src="https://widget.trustpilot.com/bootstrap/v5/tp.widget.bootstrap.min.js"
        onLoad={handleScriptLoad}
        strategy="lazyOnload"
      />
      <section className="pb-8 lg:pb-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center mb-6">
            <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-3">
              Trusted by Thousands
            </h2>
            <p className="text-gray-600">See what our customers say about us</p>
          </div>
          <div className="max-w-5xl mx-auto">
            <div
              ref={ref}
              className="trustpilot-widget"
              data-locale="en-US"
              data-template-id="56278e9abfbbba0bdcd568bc"
              data-businessunit-id="69947c0cf6fddaf299a9dea6"
              data-style-height="52px"
              data-style-width="100%"
            >
              <a
                href="https://www.trustpilot.com/review/tradelinknetwork.co.uk"
                target="_blank"
                rel="noopener"
              >
                Trustpilot
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
