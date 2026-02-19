/** @type {import('next').NextConfig} */

import path from "path";
const __dirname = path.dirname(new URL(import.meta.url).pathname);

const nextConfig = {
  images: {
    domains: [
      new URL(process.env.NEXT_PUBLIC_IMAGE_BASE_URL).hostname,
      "cdn.smwaterjet.com",
    ],
  },
  reactStrictMode: false,
  async redirects() {
    return [
      {
        source: "/:path*",
        has: [{ type: "host", value: "smwaterjet.com" }],
        destination: "https://www.smwaterjet.com/:path*",
        permanent: true,
      },
    ];
  },
  async rewrites() {
    return [
      {
        source: "/api/naver/:path*",
        destination: "https://openapi.naver.com/:path*",
      },
    ];
  },
  webpack(config) {
    config.resolve.alias["@"] = path.resolve(__dirname, "src/app");

    return config;
  },
  sassOptions: {
    includePaths: [path.join(__dirname, "src/app")],
  },
};

export default nextConfig;
