import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  const baseUrl =
    process.env.NEXT_PUBLIC_BASE_URL || "https://www.tradelinknetwork.co.uk";

  return {
    rules: [
      {
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
  };
}
