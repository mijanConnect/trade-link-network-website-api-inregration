import { Metadata } from "next";

export const pageMetadata: Record<string, Metadata> = {
  "about-us": {
    title: "About Us | TradeLink Network",
    description:
      "Learn about TradeLink Network and our mission to connect trade professionals with clients.",
    robots: { index: true, follow: true },
  },
  "code-of-conduct": {
    title: "Code of Conduct | TradeLink Network",
    description:
      "Read TradeLink Network's Code of Conduct to understand our commitment to fostering a respectful and inclusive community for all users.",
    robots: { index: true, follow: true },
  },
  "compliance-policy": {
    title: "Compliance Policy | TradeLink Network",
    description:
      "Read TradeLink Network's compliance policy to understand our commitment to ethical business practices and regulatory adherence.",
    robots: { index: true, follow: true },
  },
  "privacy-policy": {
    title: "Privacy Policy | TradeLink Network",
    description:
      "Review TradeLink Network's Privacy Policy to understand how we collect, use, and protect your personal information.",
    robots: { index: true, follow: true },
  },
  "terms-conditions": {
    title: "Terms and Conditions | TradeLink Network",
    description:
      "Read TradeLink Network's Terms and Conditions to understand the rules and restrictions governing your use of our platform.",
    robots: { index: true, follow: true },
  },
  "cookies-policy": {
    title: "Cookies Policy | TradeLink Network",
    description:
      "Learn about how TradeLink Network uses cookies and other tracking technologies to enhance your experience.",
    robots: { index: true, follow: true },
  },
  "review-policy": {
    title: "Review Policy | TradeLink Network",
    description:
      "Understand TradeLink Network's Review Policy to learn how we ensure authentic and helpful customer reviews.",
    robots: { index: true, follow: true },
  },
  "contact-us": {
    title: "Contact Us | TradeLink Network",
    description:
      "Get in touch with TradeLink Network's support team. We're here to help with any questions or concerns.",
    robots: { index: true, follow: true },
  },
  "how-it-works": {
    title: "How It Works | TradeLink Network",
    description:
      "Discover how TradeLink Network works and how to find trusted trade professionals for your project.",
    robots: { index: true, follow: true },
  },
  "how-tradeperson-works": {
    title: "How It Works for Trade Professionals | TradeLink Network",
    description:
      "Learn how trade professionals can register, get leads, and grow their business with TradeLink Network.",
    robots: { index: true, follow: true },
  },
  faq: {
    title: "Frequently Asked Questions | TradeLink Network",
    description:
      "Find answers to common questions about using TradeLink Network, posting jobs, and managing your account.",
    robots: { index: true, follow: true },
  },
  services: {
    title: "Services | TradeLink Network",
    description:
      "Explore all the services available on TradeLink Network, from plumbing to electrical work and more.",
    robots: { index: true, follow: true },
  },
  categories: {
    title: "Services | TradeLink Network",
    description:
      "Explore all the services available on TradeLink Network, from plumbing to electrical work and more.",
    robots: { index: true, follow: true },
  },
  areas: {
    title: "Service Areas | TradeLink Network",
    description:
      "Check our service coverage areas across the UK and find trade professionals near you.",
    robots: { index: true, follow: true },
  },
  "post-service": {
    title: "Post a Job | TradeLink Network",
    description:
      "Post your service request on TradeLink Network and get quotes from qualified trade professionals in your area.",
    robots: { index: true, follow: true },
  },
  "my-jobs": {
    title: "My Jobs | TradeLink Network",
    description:
      "Manage your posted jobs, view quotes, and track your service requests on TradeLink Network.",
    robots: { index: false, follow: false },
  },
  profile: {
    title: "My Profile | TradeLink Network",
    description:
      "View and manage your profile information on TradeLink Network.",
    robots: { index: false, follow: false },
  },
  "provider-profile": {
    title: "Trade Professional Profile | TradeLink Network",
    description:
      "View the detailed profile of a trade professional on TradeLink Network.",
    robots: { index: false, follow: false },
  },
  home: {
    title: "Trade Link Network | Find Trusted Trade Professionals",
    description:
      "Connect with vetted and trusted trade professionals across the UK. Post your job for free and get instant quotes.",
    keywords: [
      "trade professionals",
      "trusted trades",
      "verified trades",
      "local services",
      "homeowners uk",
      "service categories",
      "compare services",
    ],
    robots: { index: true, follow: true },
    openGraph: {
      title: "Trade Link Network | Find Trusted Trade Professionals",
      description:
        "Connect with vetted and trusted trade professionals across the UK. Post your job for free and get instant quotes.",
      url: "https://www.tradelinknetwork.co.uk/",
      type: "website",
      images: [
        {
          url: "https://www.tradelinknetwork.co.uk/assets/hero-2.webp",
          width: 1200,
          height: 630,
          alt: "Trade Link Network",
        },
      ],
    },
  },
};

export const getMetadata = (page: string): Metadata => {
  return pageMetadata[page] || {};
};
