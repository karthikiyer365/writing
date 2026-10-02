import type { MetadataRoute } from "next";

export const dynamic = "force-static"; // required by output: "export"

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: "https://writing.karthikiyer.info/sitemap.xml",
  };
}
