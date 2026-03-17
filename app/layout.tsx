import "./globals.css";
import "@fortawesome/fontawesome-free/css/all.css";
import type { ReactNode } from "react";
import { Poppins } from "next/font/google";
import Providers from "./providers";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-poppins",
});

export const metadata = {
  title: "Trade Link Network",
  description:
    "Connect with vetted and trusted trade professionals across the UK. Post your job for free and get instant quotes.",
  openGraph: {
    title: "Trade Link Network | Find Trusted Trade Professionals",
    description:
      "Connect with vetted and trusted trade professionals across the UK. Post your job for free and get instant quotes.",
    url: "https://www.tradelinknetwork.co.uk/",
    type: "website",
    images: [
      {
        url: "/assets/hero.webp",
        width: 1200,
        height: 630,
        alt: "Trade Link Network",
      },
    ],
  },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              "@id": "https://www.tradelinknetwork.co.uk/#organization",
              name: "Trade Link Network",
              url: "https://www.tradelinknetwork.co.uk",
              description:
                "A UK-wide platform connecting homeowners with vetted and trusted trade professionals.",
              founder: {
                "@type": "Person",
                name: "Lee Farrugia",
                worksFor: {
                  "@type": "LocalBusiness",
                  name: "Essex Landscaping & Paving",
                  url: "https://www.essexlandscapingandpaving.co.uk",
                },
              },
            }),
          }}
        />
      </head>
      <body
        className={`${poppins.variable} bg-[--background] text-[--foreground]`}
      >
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
