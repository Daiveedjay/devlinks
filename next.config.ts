import { platforms } from "@/lib/constants";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: platforms
      .filter(
        (platform): platform is typeof platform & { domainAvatar: string } =>
          platform.domainAvatar !== undefined
      )
      .map((platform) => ({
        protocol: "https",
        hostname: platform.domainAvatar,
        pathname: "**",
      })),
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
