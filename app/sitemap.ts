import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://aksara-cakra.com";

  const routes = [
    "",
    "/about",
    "/services",
    "/services/policy-research",
    "/services/corporate-consulting",
    "/services/political-consulting",
    "/issues",
    "/issues/defence-security",
    "/issues/politics-governance",
    "/issues/economy-business",
    "/issues/elections-democracy",
    "/issues/esg-sustainability",
    "/insights",
    "/insights/concern",
    "/team",
    "/contact",
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: route === "" ? 1 : 0.8,
  }));

  return routes;
}
