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
import TocLinks from "@/components/TocLinks";
import LatestBar from "@/components/LatestBar";
import styles from "./post.module.css";

const SITE = "https://writing.karthikiyer.info";

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
  const title = post.seoTitle ?? post.title;
  const description = post.seoDescription ?? post.standfirst;
  const url = `/${post.slug}/`;
  return {
    // seoTitle is already search-ready, so skip the site suffix; plain titles keep it.
    title: post.seoTitle ? { absolute: title } : title,
    description,
    alternates: { canonical: url },
    openGraph: {
      type: "article",
      title,
      description,
      url,
      publishedTime: post.date,
      modifiedTime: post.updated ?? post.date,
      authors: ["Karthik Iyer"],
      images: post.ogImage ? [{ url: post.ogImage, width: 1200, height: 630 }] : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: post.ogImage ? [post.ogImage] : undefined,
    },
  };
}

export default async function PostPage({ params }: Params) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();

  // The TOC rail only earns its space on a post with real structure;
  // below that the layout collapses to a single centred column.
  const hasToc = post.headings.length >= 3;

  // Static HTML, so crawlers see this without running JS.
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.seoDescription ?? post.standfirst,
    datePublished: post.date,
    dateModified: post.updated ?? post.date,
    mainEntityOfPage: `${SITE}/${post.slug}/`,
    image: post.ogImage ? `${SITE}${post.ogImage}` : undefined,
    author: { "@type": "Person", name: "Karthik Iyer", url: "https://karthikiyer.info" },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }}
      />
      <LatestBar current={post.slug} />
      <main className={hasToc ? styles.withRail : styles.noRail}>
        {hasToc && (
          <aside className={styles.rail}>
            <div className={styles.railGroup}>
              <span className={`mono ${styles.railLabel}`}>On this page</span>
              <TocLinks
                headings={post.headings}
                linkClass={styles.railLink}
                activeClass={styles.railLinkActive}
              />
            </div>
            <div className={styles.railRule} />
            <div className={styles.railGroup}>
              <span className={`mono ${styles.railLabel}`}>Published</span>
              <time dateTime={post.date} className={styles.railValue}>{formatDate(post.date)}</time>
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
                <time dateTime={post.date}>{formatDate(post.date)}</time> &middot; {post.readTime} min
              </span>
            )}
          </div>

          <h1 className={styles.h1}>{post.title}</h1>
          <p className={styles.standfirst}>{post.standfirst}</p>
          {post.hero && <img className={styles.hero} src={post.hero} alt={post.heroAlt} />}

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
            {post.project && (
              <a className={styles.projectLink} href={post.project}>
                See the project &#8599;
              </a>
            )}
          </footer>
        </article>
      </main>
    </>
  );
}
