import type { NextConfig } from "next";
import { getStrapiURL } from "./utils/get-strapi-url";

const strapiURL = new URL(getStrapiURL());

const nextConfig: NextConfig = {
  /* config options here */
  eslint: {
    ignoreDuringBuilds: true,
  },

  images: {
    remotePatterns: [
      {
        protocol: strapiURL.protocol === "https:" ? "https" : "http",
        hostname: strapiURL.hostname,
        port: strapiURL.port,
        pathname: `${strapiURL.pathname.replace(/\/+$/, "")}/uploads/**/*`
      },
    ],
  },
};

export default nextConfig;
