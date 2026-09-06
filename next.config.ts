import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Load remote images directly in the browser (URLs carry their own
    // sizing params) — avoids upstream 429s hitting the server's IP.
    unoptimized: true,
  },
};

export default nextConfig;
