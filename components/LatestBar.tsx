import { getAllPosts } from "@/lib/posts";

// Header row 2: the five newest posts. `current` marks the post being read;
// omitted on the home page, where "All posts" is the current item instead.
export default function LatestBar({ current }: { current?: string }) {
  const latest = getAllPosts().slice(0, 5);
  const home = current === undefined;
  return (
    <nav className="latest-bar" aria-label="Latest posts">
      <span className="latest-label">Latest</span>
      {latest.map((p) => (
        <a
          key={p.slug}
          href={`/${p.slug}/`}
          title={p.title}
          aria-current={p.slug === current ? "page" : undefined}
        >
          {p.title}
        </a>
      ))}
      <a
        className="latest-all"
        href={home ? "#all-posts" : "/#all-posts"}
        aria-current={home ? "page" : undefined}
      >
        {home ? "All posts ↓" : "All posts →"}
      </a>
    </nav>
  );
}
