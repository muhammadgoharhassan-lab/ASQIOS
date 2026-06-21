/** @type {import('next').NextConfig} */
const nextConfig = {
  // Static export keeps the site portable across Vercel and GitHub Pages.
  output: "export",
  reactStrictMode: true,
  trailingSlash: true,
  images: {
    // Required for static export; assets are pre-optimized.
    unoptimized: true,
  },
  // Surfaces any type/lint issue at build time rather than silently passing.
  eslint: {
    ignoreDuringBuilds: false,
  },
  typescript: {
    ignoreBuildErrors: false,
  },
};

export default nextConfig;
