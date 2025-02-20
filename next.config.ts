import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images:{
    remotePatterns:[
      {hostname:"tse4.mm.bing.net"}
    ],
  }
};

export default nextConfig;
