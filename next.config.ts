import { platforms } from "@/lib/constants";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      // Keep existing platform patterns
      ...platforms
        .filter(
          (platform): platform is typeof platform & { domainAvatar: string } =>
            platform.domainAvatar !== undefined
        )
        .map((platform) => ({
          protocol: "https" as const,
          hostname: platform.domainAvatar,
          pathname: "**",
        })),
      // Add Cloudinary domain
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
        pathname: "/**",
      },
    ],
  },
  async rewrites() {
    return [
      {
        source: "/@:username",
        destination: "/users/profile/:username",
      },
    ];
  },
};

export default nextConfig;
