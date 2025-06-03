import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
        port: "",
        pathname: "**",
      },
    ],
  },
  env: {
    // required if nextJS itself couldn't find it
    DRIZZLE_DATABASE_URL: process.env.DRIZZLE_DATABASE_URL,
  },
};

export default nextConfig;
