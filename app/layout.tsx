import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://writing.karthikiyer.info"),
  title: {
    default: "Weekend at Karthik's — Karthik Iyer",
    template: "%s — Karthik Iyer",
  },
  description:
    "Notes on data platforms, entity resolution, and the parts of analytics work that never make it into the dashboard.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/icon.svg" type="image/svg+xml" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin=""
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Geist:wght@400;500;600;700&family=Geist+Mono:wght@400;500&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <header className="site-header">
          <a href="/" className="wordmark">
            karthik iyer
          </a>
          <nav className="site-nav">
            <a href="/" className="active">
              Writing
            </a>
            <a href="https://karthikiyer.info">Portfolio</a>
          </nav>
        </header>
        {children}
        <footer className="site-footer">
          <span>Karthik Iyer — data &amp; AI engineering</span>
          <a href="https://karthikiyer.info">karthikiyer.info</a>
        </footer>
      </body>
    </html>
  );
}
