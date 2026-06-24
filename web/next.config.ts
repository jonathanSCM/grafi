import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    dangerouslyAllowSVG: true,
  },
  experimental: {
    cpus: 1,
    workerThreads: false,
  },
};

export default nextConfig;
