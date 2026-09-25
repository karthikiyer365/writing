import { getAllPosts, formatDate } from "@/lib/posts";
import LatestBar from "@/components/LatestBar";
import styles from "./index.module.css";

export default function WritingIndex() {
  const posts = getAllPosts();

  return (
    <>
      <LatestBar />
      <main className={styles.page}>
        <h1 className={styles.h1}>Weekday at Karthik's</h1>
        <p className={styles.lede}>
          Notes on data platforms, entity resolution, and the parts of analytics
          work that never make it into the dashboard.
        </p>

        <div id="all-posts" className={styles.listHead}>
          <span className={`mono ${styles.listLabel}`}>All posts</span>
          <span className={`mono ${styles.listCount}`}>
            {posts.length} post{posts.length === 1 ? "" : "s"}
          </span>
        </div>

        <div className={styles.list}>
          {posts.map((p, i) => (
            <article key={p.slug} className={styles.featured}>
              <div className={styles.featuredShot}>
                {p.hero ? (
                  <img className={styles.shotImg} src={p.hero} alt={p.heroAlt} />
                ) : (
                  <span className="mono">[ hero ]</span>
                )}
              </div>
              <div className={styles.featuredBody}>
                <div className={styles.row}>
                  {i === 0 && <span className={`mono ${styles.badge}`}>Featured</span>}
                  <span className={`mono ${styles.meta}`}>
                    {formatDate(p.date)} &middot; {p.readTime} min
                  </span>
                </div>
                <h2 className={styles.featuredTitle}>
                  {/* stretched link: the whole card clicks through, without nesting the project link inside it */}
                  <a className={styles.cardLink} href={`/${p.slug}/`}>
                    {p.title}
                  </a>
                </h2>
                <p className={styles.featuredStandfirst}>{p.standfirst}</p>
                <div className={styles.links}>
                  <span className={styles.readMore}>Read the post &rarr;</span>
                  {p.project && (
                    <a className={styles.projectLink} href={p.project}>
                      See the project &#8599;
                    </a>
                  )}
                </div>
              </div>
            </article>
          ))}
        </div>
      </main>
    </>
  );
}
