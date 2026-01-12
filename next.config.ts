import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "rgfyvxwdfpkoj7p1.public.blob.vercel-storage.com",
      },
    ],
  },
};

export default nextConfig;
