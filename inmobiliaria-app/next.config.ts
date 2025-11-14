import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        port: '',
        pathname: '/**',
      },
      // Puedes agregar más orígenes si tienes más imágenes
      {
        protocol: 'https',
        hostname: 'i.pravatar.cc',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: '**', // Para cualquier otro dominio (no recomendado en producción)
        pathname: '/**',
      }
    ],
  },
};

export default nextConfig;
