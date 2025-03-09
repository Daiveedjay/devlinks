import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    domains: [
      "avatars.githubusercontent.com",
      "yt3.googleusercontent.com",
      "abs.twimg.com",
      "static.licdn.com",
    ], // Add GitHub avatars domain
  },
};

export default nextConfig;
