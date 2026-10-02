import type { MetadataRoute } from "next";
import { getAllPosts } from "@/lib/posts";

export const dynamic = "force-static"; // required by output: "export"

const SITE = "https://writing.karthikiyer.info";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: `${SITE}/` },
    ...getAllPosts().map((p) => ({
      url: `${SITE}/${p.slug}/`,
      lastModified: p.updated ?? p.date,
    })),
  ];
}
