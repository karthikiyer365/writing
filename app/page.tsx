import { getAllPosts, formatDate, CATEGORY_LABELS } from "@/lib/posts";
import styles from "./index.module.css";

export default function WritingIndex() {
  const posts = getAllPosts();
  const featured = posts.find((p) => p.featured) ?? posts[0];
  const rest = posts.filter((p) => p.slug !== featured?.slug);
  const cards = rest.slice(0, 3);
  const archive = rest.slice(3);

  return (
    <main className={styles.page}>
      <h1 className={styles.h1}>Weekend at Karthik's</h1>
      <p className={styles.lede}>
        Notes on data platforms, entity resolution, and the parts of analytics
        work that never make it into the dashboard.
      </p>

      {featured && (
        <a className={styles.featured} href={`/${featured.slug}/`}>
          <div className={styles.featuredShot}>
            <span className="mono">[ hero ]</span>
          </div>
          <div className={styles.featuredBody}>
            <div className={styles.row}>
              <span className={`mono ${styles.badge}`}>Featured</span>
              <span className={`mono ${styles.meta}`}>
                {formatDate(featured.date)} &middot; {featured.readTime} min
              </span>
            </div>
            <h2 className={styles.featuredTitle}>{featured.title}</h2>
            <p className={styles.featuredStandfirst}>{featured.standfirst}</p>
            <span className={styles.readMore}>Read the post &rarr;</span>
          </div>
        </a>
      )}

      {cards.length > 0 && (
        <div className={styles.grid}>
          {cards.map((p) => (
            <a key={p.slug} className={styles.card} href={`/${p.slug}/`}>
              <div className={styles.cardShot}>
                <span className="mono">[ card ]</span>
              </div>
              <span className={`mono ${styles.cat} cat-${p.category}`}>
                {CATEGORY_LABELS[p.category]}
              </span>
              <h3 className={styles.cardTitle}>{p.title}</h3>
              <p className={styles.cardStandfirst}>{p.standfirst}</p>
              <span className={`mono ${styles.meta} ${styles.cardMeta}`}>
                {formatDate(p.date)} &middot; {p.readTime} min
              </span>
            </a>
          ))}
        </div>
      )}

      {archive.length > 0 && (
        <div className={styles.archive}>
          {archive.map((p) => (
            <a key={p.slug} className={styles.archiveRow} href={`/${p.slug}/`}>
              <span className={`mono ${styles.archiveDate}`}>
                {formatDate(p.date)}
              </span>
              <span className={styles.archiveTitle}>{p.title}</span>
              <span className={`mono ${styles.archiveCat} cat-${p.category}`}>
                {CATEGORY_LABELS[p.category]}
              </span>
            </a>
          ))}
        </div>
      )}
    </main>
  );
}
