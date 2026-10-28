import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  cacheComponents: true,
  partialPrefetching: true,
  async redirects() {
    return [
      {
        // The Services page was removed; send old links to the homepage
        source: "/services",
        destination: "/",
        permanent: true,
      },
      {
        // The Admin dashboard was removed from the public website
        source: "/admin",
        destination: "/",
        permanent: true,
      },
      {
        source: "/admin/:path*",
        destination: "/",
        permanent: true,
      },
    ];
  },
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
