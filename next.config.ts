import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "storage.googleapis.com",
        port: "",
        pathname: "/**"
      },
      {
        protocol: "https",
        hostname: "images.ctfassets.net",
        port: "",
        pathname: "/**"
      }
    ]
  }
};

export default nextConfig;
