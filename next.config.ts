import { platforms } from "@/lib/constants";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    domains: [
      // // Github avatars domain
      // "avatars.githubusercontent.com",
      // // Youtube thumbnails domain
      // "yt3.googleusercontent.com",
      // // Twitter avatars domain
      // "abs.twimg.com",
      // // LinkedIn avatars domain
      // "static.licdn.com",
      // // Dribbble avatars domain
      // "cdn.dribbble.com",
      // // Twitch avatars domain
      // "static-cdn.jtvnw.net",
      // // Dev.to avatars domain
      // "dev-to-uploads.s3.amazonaws.com",
      // // Framer avatars domain
      // "marketplace.framer.com",
      ...platforms.map((platform) => platform.domainAvatar).filter((domain): domain is string => domain !== undefined),
    ],
  },
};

export default nextConfig;
