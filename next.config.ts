import type { NextConfig } from "next";

const nextConfig: NextConfig = {

  images: {
      remotePatterns: [
      {
        protocol: 'https',
        hostname: 'pub-cfcd623b266645fc8425f95678d192d7.r2.dev',
        port: '',
        pathname: '/**',
      },
    ]
  },
};

export default nextConfig;
