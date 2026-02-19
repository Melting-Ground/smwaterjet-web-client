import type { MetadataRoute } from "next";

const SITE_URL = "https://www.smwaterjet.com";

const PUBLIC_ROUTES = [
  "",
  "/company/greeting",
  "/company/history",
  "/company/location",
  "/company/certificates",
  "/business/waterjet",
  "/business/fields",
  "/business/photos",
  "/equipment",
  "/performance/photos",
  "/support/notice",
  "/support/news",
  "/support/inquiry",
  "/policy/privacy",
  "/policy/tos",
  "/policy/email",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  return PUBLIC_ROUTES.map((route) => ({
    url: `${SITE_URL}${route}`,
    lastModified,
    changeFrequency: "weekly",
    priority: route === "" ? 1 : 0.7,
  }));
}
