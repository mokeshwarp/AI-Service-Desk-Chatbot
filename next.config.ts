
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactCompiler: true,
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          { key: "X-Frame-Options", value: "ALLOWALL" },
          {
            key: "Content-Security-Policy",
            value: "frame-ancestors https://*.atlassian.net https://*.jira.com"
          }
        ]
      }
    ];
  }
};

export default nextConfig;
