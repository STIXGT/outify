import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    // Opcional: mejora el rendimiento
    optimizePackageImports: ['framer-motion'],
  },
  // Si usas el app router (Next.js 13+)
  transpilePackages: ['framer-motion'],
};

export default nextConfig;
