import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  const baseUrl =
    process.env.NEXT_PUBLIC_BASE_URL || "https://www.tradelinknetwork.co.uk";

  return {
    rules: [
      {
<<<<<<< HEAD
        userAgent: "*",
        allow: ["/"],
        disallow: [
          "/api/",
          "/admin/",
          "/*.json$",
          "/*?*sort=",
          "/*?*filter=",
          "/login",
          "/register",
          "/professional-register",
          "/forgot-password",
          "/update-password",
          "/verify-otp",
          "/verify-register-otp",
          "/post-service",
          "/my-jobs",
          "/profile",
          "/provider-profile",
        ],
      },
      {
        userAgent: "AdsBot-Google",
        allow: ["/"],
      },
      {
        userAgent: "GoogleBot",
        allow: ["/"],
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
=======
        // Allow all major search engines and crawlers
        userAgent: ["Googlebot", "Bingbot", "Slurp", "DuckDuckBot"],
        allow: ["/"],
        disallow: [
          // Auth pages - should not be indexed
          "/login",
          "/register",
          "/forgot-password",
          "/verify-otp",
          "/update-password",
          "/professional-register",
          "/verify-register-otp",

          // Admin/Protected areas
          "/admin",
          "/dashboard",
          "/trade-person/",
          "/profile/",
          "/provider-profile/",

          // Private user pages
          "/my-jobs",
          "/my-responses",
          "/my-profile",
          "/checkout",
          "/reviews",

          // API & System routes (shouldn't exist in public, but safety measure)
          "/api/",
          "/_next/",
          "/.*\\?.*", // Query parameters
        ],
        crawlDelay: 1, // 1 second delay between requests
      },
      {
        // Restrict aggressive crawlers and bots
        userAgent: [
          "MJ12bot",
          "AhrefsBot",
          "SemrushBot",
          "DotBot",
          "MojeekBot",
        ],
        disallow: ["/"],
      },
      {
        // Allow all other crawlers with standard restrictions
        userAgent: "*",
        allow: ["/"],
        disallow: [
          "/login",
          "/register",
          "/forgot-password",
          "/verify-otp",
          "/update-password",
          "/professional-register",
          "/verify-register-otp",
          "/admin",
          "/dashboard",
          "/trade-person/",
          "/profile/",
          "/provider-profile/",
          "/my-jobs",
          "/my-responses",
          "/my-profile",
          "/checkout",
          "/reviews",
          "/api/",
          "/_next/",
        ],
        crawlDelay: 2, // 2 second delay for unknown bots
      },
    ],

    // Point to sitemap for better indexing
    sitemap: `${baseUrl}/sitemap.xml`,

    // Host specification
    host: baseUrl,
>>>>>>> 9649d9468c6701b784c3c8918e78f9de023c9a03
  };
}
