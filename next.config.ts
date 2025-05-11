import { platforms } from "@/lib/constants";
import type { NextConfig } from "next";
import TerserPlugin from "terser-webpack-plugin";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
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
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
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
  webpack(config, { isServer, dev }) {
    if (!dev && !isServer) {
      config.optimization.minimizer.push(
        new TerserPlugin({
          terserOptions: {
            compress: {
              drop_console: true, // 🚫 Removes console.* calls
            },
          },
        })
      );
    }
    return config;
  },
};

export default nextConfig;
