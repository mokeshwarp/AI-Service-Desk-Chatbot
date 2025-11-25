
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactCompiler: true,
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          {
            key: "X-Frame-Options",
            value: "ALLOWALL", // or remove this header entirely
          },
          {
            key: "Content-Security-Policy",
            value: "frame-ancestors 'self' https://*.atlassian.net",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
