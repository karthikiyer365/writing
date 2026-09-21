/** @type {import('next').NextConfig} */
const nextConfig = {
  // Static export: the whole site is HTML on GitHub Pages, no Node host.
  output: "export",
  trailingSlash: true,
  images: { unoptimized: true },
  reactStrictMode: true,
};

export default nextConfig;
