import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Allow admin-entered image URLs from any https host
    remotePatterns: [{ protocol: "https", hostname: "**" }],
  },
};

export default nextConfig;
