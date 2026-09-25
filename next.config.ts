import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',
  // Allow LAN devices (e.g. your phone) to load dev resources (HMR, client JS)
  // when accessing the dev server via the machine's local IP.
  allowedDevOrigins: ['192.168.0.105', '192.168.*.*', '10.*.*.*'],
  images: {
    // Static exports have no server-side Image Optimization API.
    unoptimized: true,
    // Allow SVG images from the same origin
    dangerouslyAllowSVG: true,
    contentDispositionType: 'attachment',
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },
};

export default nextConfig;
