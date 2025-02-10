import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  env: {
    TMDB_BASE_URL: process.env.TMDB_BASE_URL || "",
    TMDB_IMAGE_SERVICE_URL: process.env.TMDB_IMAGE_SERVICE_URL || "", 
    TMDB_API_KEY: process.env.TMDB_API_KEY || ""
  },
  images: {
    domains: ['image.tmdb.org'],  // Add this line to allow images from TMDB
  },
};

export default nextConfig;
