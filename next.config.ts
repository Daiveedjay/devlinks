import { platforms } from "@/lib/constants";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
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
};

export default nextConfig;
