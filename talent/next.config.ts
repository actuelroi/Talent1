import type { NextConfig } from "next"

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    domains: ["res.cloudinary.com","images.unsplash.com","youtube.com"], // or whatever your image host is
  },
}

export default nextConfig