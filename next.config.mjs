/** @type {import('next').NextConfig} */
const nextConfig = {
  // 部署到 Gitee Pages 时，取消下面两行注释后运行 pnpm build
  // output: 'export',
  // trailingSlash: true,
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'hebbkx1anhila5yf.public.blob.vercel-storage.com',
      },
    ],
  },
}

export default nextConfig
