import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import rehypeSlug from "rehype-slug";
import remarkGfm from "remark-gfm";
import {
  getAllPosts,
  getPost,
  formatDate,
  CATEGORY_LABELS,
} from "@/lib/posts";
import Callout from "@/components/Callout";
import StatStrip from "@/components/StatStrip";
import styles from "./post.module.css";

export function generateStaticParams() {
  return getAllPosts().map((p) => ({ slug: p.slug }));
}

// Next 16 hands `params` to a page as a Promise — awaiting it is mandatory,
// and skipping the await silently prerenders the not-found shell instead.
type Params = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Params) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return {};
  return { title: post.title, description: post.standfirst };
}

export default async function PostPage({ params }: Params) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();

  // The TOC rail only earns its space on a post with real structure;
  // below that the layout collapses to a single centred column.
  const hasToc = post.headings.length >= 3;

  return (
    <main className={hasToc ? styles.withRail : styles.noRail}>
      {hasToc && (
        <aside className={styles.rail}>
          <div className={styles.railGroup}>
            <span className={`mono ${styles.railLabel}`}>On this page</span>
            {post.headings.map((h, i) => (
              <a
                key={h.id}
                href={`#${h.id}`}
                className={`${styles.railLink} ${i === 0 ? styles.railLinkActive : ""}`}
              >
                {h.text}
              </a>
            ))}
          </div>
          <div className={styles.railRule} />
          <div className={styles.railGroup}>
            <span className={`mono ${styles.railLabel}`}>Published</span>
            <span className={styles.railValue}>{formatDate(post.date)}</span>
            <span className={styles.railValue}>{post.readTime} min read</span>
          </div>
        </aside>
      )}

      <article className={styles.article}>
        <div className={styles.kicker}>
          <span className={`mono ${styles.cat} cat-${post.category}`}>
            {CATEGORY_LABELS[post.category]}
          </span>
          {!hasToc && (
            <span className={`mono ${styles.kickerMeta}`}>
              {formatDate(post.date)} &middot; {post.readTime} min
            </span>
          )}
        </div>

        <h1 className={styles.h1}>{post.title}</h1>
        <p className={styles.standfirst}>{post.standfirst}</p>

        <div className={styles.prose}>
          <MDXRemote
            source={post.body}
            components={{ Callout, StatStrip }}
            options={{
              mdxOptions: {
                remarkPlugins: [remarkGfm],
                rehypePlugins: [rehypeSlug],
              },
            }}
          />
        </div>

        <footer className={styles.postFooter}>
          <a href="/">&larr; All writing</a>
        </footer>
      </article>
    </main>
  );
}
