import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Desabilitar StrictMode para evitar duplicação do VLibras
  reactStrictMode: false,
  
  // Configurações para WebGL/Unity (necessário para VLibras)
  webpack: (config) => {
    config.resolve.fallback = {
      ...config.resolve.fallback,
      fs: false,
    };
    return config;
  },
  
  // Headers para WebGL
  async headers() {
    return [
      {
        source: '/vlibras/target/:path*',
        headers: [
          {
            key: 'Cross-Origin-Embedder-Policy',
            value: 'require-corp',
          },
          {
            key: 'Cross-Origin-Opener-Policy',
            value: 'same-origin',
          },
        ],
      },
    ];
  },
};

export default nextConfig;
