import type { NextConfig } from "next";

const nextConfig: NextConfig = {

  images: {
    formats: ['image/avif', 'image/webp'],
    minimumCacheTTL: 31536000,
    dangerouslyAllowSVG: true,
    contentDispositionType: 'attachment',
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'pub-cfcd623b266645fc8425f95678d192d7.r2.dev',
        port: '',
        pathname: '/**',
      },
    ]
  },
  async headers() {
    return [
      {
        source: '/:all*(svg|png|jpg|jpeg|webp|avif|ico)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
    ];
  },
};

export default nextConfig;
