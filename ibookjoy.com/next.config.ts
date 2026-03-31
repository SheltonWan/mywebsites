import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',        // 输出纯静态文件到 out/ 目录
  images: {
    unoptimized: true,     // 静态导出模式下关闭图片优化服务，直接输出原图
  },
};

export default nextConfig;
