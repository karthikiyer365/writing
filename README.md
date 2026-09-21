# writing.karthikiyer.info

Static blog. Next.js + MDX, exported to HTML and served from GitHub Pages.

Separate from the portfolio repo on purpose: that app needs a Node host for its
API routes and Pinecone/OpenRouter keys, this one needs nothing at runtime.

## Local

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # static HTML into ./out
```

## Writing a post

Add an `.mdx` file to `content/`. The filename is the URL slug.

```mdx
---
title: Entity resolution is the whole job
standfirst: One sentence under the headline.
date: 2026-09-18
category: data-engineering   # or sports-analytics | llm-ops
readTime: 9
featured: true               # optional, promotes it on the index
---

## First heading

Body copy.
```

Three or more `##` headings turns on the sticky TOC rail; fewer collapses the
post to a single centred column.

Components available inside MDX: `<Callout kind="note|warn|good">` and
`<StatStrip stats={[{ value, label, accent? }]} />`.

## Deploy

Push to `main`. The Pages workflow builds and publishes.

## Hosting

Squarespace is the registrar only. DNS for `karthikiyer.info` is delegated to
Netlify (`dns1-4.p08.nsone.net`), which also hosts the portfolio app at the
apex — so the subdomain record is added in the **Netlify** dashboard, not
Squarespace.

    Netlify DNS
      A      @        -> Netlify host (portfolio, Next.js + API routes)
      CNAME  www      -> same
      CNAME  writing  -> karthikiyer365.github.io   (this site)

`public/CNAME` pins the custom domain on the Pages side; the record above is
what points the name at Pages in the first place. Add the DNS record before
setting the custom domain on the repo, or GitHub's verification fails.
