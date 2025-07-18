import bundleAnalyzer from '@next/bundle-analyzer';

const withBundleAnalyzer = bundleAnalyzer({
  enabled: process.env.ANALYZE === 'true',
});

/** @type {import('next').NextConfig} */
const nextConfig = {
  // 启用静态导出
  output: 'export',
  
  // 禁用图片优化，因为静态导出不支持
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn-info.broadsolutionsgroup.com',
        port: '',
        pathname: '/images/**',
      },
    ],
  },
  
  // 设置基础路径（如果需要）
  // basePath: '',
  
  // 设置资源前缀 - 静态导出时不需要设置
  // assetPrefix: '.',
  
  // 禁用服务端功能
  trailingSlash: true,
  
  webpack: (config, { dev, isServer }) => {
    if (dev && !isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
      };
    }
    
    // 优化bundle分割
    if (!dev && !isServer) {
      config.optimization = {
        ...config.optimization,
        splitChunks: {
          chunks: 'all',
          cacheGroups: {
            // 将React相关库分离到单独的chunk
            react: {
              name: 'react',
              test: /[\\/]node_modules[\\/](react|react-dom)[\\/]/,
              chunks: 'all',
              priority: 20,
            },
            // 将第三方库分离
            vendor: {
              name: 'vendor',
              test: /[\\/]node_modules[\\/]/,
              chunks: 'all',
              priority: 10,
              enforce: true,
            },
            // 将样式文件分离
            styles: {
              name: 'styles',
              test: /\.css$/,
              chunks: 'all',
              enforce: true,
              priority: 15,
            },
            // 将组件分离到单独的chunk
            components: {
              name: 'components',
              test: /[\\/]src[\\/]app[\\/]components[\\/]/,
              chunks: 'all',
              priority: 5,
              minSize: 10000,
            },
          },
        },
      };
    }
    
    return config;
  },
  
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },
  
  devIndicators: {
    buildActivity: true,
    buildActivityPosition: 'bottom-right',
  },
  
  swcMinify: true,
  
  pageExtensions: ['tsx', 'ts', 'jsx', 'js'],
  
  // 启用实验性功能来优化bundle
  experimental: {
    optimizePackageImports: ['react', 'react-dom'],
  },
  
  // 静态导出时不需要headers配置
  // async headers() {
  //   return [
  //     {
  //       source: '/_next/static/css/:path*',
  //       headers: [
  //         {
  //           key: 'Cache-Control',
  //           value: 'public, max-age=31536000, immutable',
  //         },
  //         {
  //           key: 'X-Content-Type-Options',
  //           value: 'nosniff',
  //         },
  //       ],
  //     },
  //     {
  //       source: '/_next/static/js/:path*',
  //       headers: [
  //         {
  //           key: 'Cache-Control',
  //           value: 'public, max-age=31536000, immutable',
  //         },
  //       ],
  //     },
  //   ];
  // },
};

export default withBundleAnalyzer(nextConfig);
