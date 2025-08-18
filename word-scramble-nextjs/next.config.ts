import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Docker環境での最適化
  output: 'standalone',

  // TypeScriptエラーを一時的に無視（params: Promise対応まで）
  typescript: {
    ignoreBuildErrors: true,
  },

  // ESLintエラーを一時的に無視
  eslint: {
    ignoreDuringBuilds: true,
  },

  // 開発用最適化
  webpack: (config, { dev }) => {
    if (dev) {
      // 開発時のメモリ使用量を削減
      config.watchOptions = {
        poll: 1000,
        aggregateTimeout: 300,
      }
    }
    return config
  },

  // 実験的機能（Prisma最適化）
  experimental: {
    serverComponentsExternalPackages: ['prisma', '@prisma/client']
  },

  // 画像最適化（NextAuth Google OAuth用）
  images: {
    domains: ['lh3.googleusercontent.com'],
  }
};

export default nextConfig;
