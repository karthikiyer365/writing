import fs from "fs";
import path from "path";
import matter from "gray-matter";

const CONTENT_DIR = path.join(process.cwd(), "content");

export type Category =
  | "data-engineering"
  | "data-science"
  | "sports-analytics"
  | "llm-ops";

export interface PostMeta {
  slug: string;
  title: string;
  standfirst: string;
  date: string;
  category: Category;
  readTime: number;
  featured?: boolean;
}

export interface Heading {
  id: string;
  text: string;
}

export interface Post extends PostMeta {
  body: string;
  headings: Heading[];
}

export const CATEGORY_LABELS: Record<Category, string> = {
  "data-engineering": "Data engineering",
  "data-science": "Data science",
  "sports-analytics": "Sports analytics",
  "llm-ops": "LLM ops",
};

// Heading ids must match what rehype-slug would produce, since the TOC links
// to them: lowercase, non-alphanumerics to hyphens, trimmed.
export function slugifyHeading(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

// YAML parses an unquoted `date: 2026-09-18` into a Date object, so coerce
// back to an ISO day string before anything formats it.
function normalizeDate(value: unknown): string {
  if (value instanceof Date) return value.toISOString().slice(0, 10);
  return String(value);
}

function readPost(fileName: string): Post {
  const raw = fs.readFileSync(path.join(CONTENT_DIR, fileName), "utf-8");
  const { data, content } = matter(raw);

  const headings = [...content.matchAll(/^##\s+(.+)$/gm)].map((m) => ({
    id: slugifyHeading(m[1].trim()),
    text: m[1].trim(),
  }));

  return {
    slug: fileName.replace(/\.mdx$/, ""),
    title: data.title,
    standfirst: data.standfirst,
    date: normalizeDate(data.date),
    category: data.category,
    readTime: data.readTime,
    featured: data.featured ?? false,
    body: content,
    headings,
  };
}

export function getAllPosts(): Post[] {
  if (!fs.existsSync(CONTENT_DIR)) return [];
  return fs
    .readdirSync(CONTENT_DIR)
    .filter((f) => f.endsWith(".mdx"))
    .map(readPost)
    .sort((a, b) => b.date.localeCompare(a.date));
}

export function getPost(slug: string): Post | undefined {
  return getAllPosts().find((p) => p.slug === slug);
}

export function formatDate(iso: string): string {
  return new Date(`${iso}T00:00:00Z`).toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    timeZone: "UTC",
  });
}
