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
    // 优化图片加载
    formats: ['image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },
  
  // 压缩配置
  compress: true,
  
  // 启用生产环境优化
  productionBrowserSourceMaps: false,
  
  // 优化首屏加载
  reactStrictMode: true,
  
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
    
    // 优化bundle分割，减少未使用的 JavaScript
    if (!dev && !isServer) {
      config.optimization = {
        ...config.optimization,
        splitChunks: {
          chunks: 'all',
          minSize: 20000, // 提高最小 chunk 大小，避免过度分割
          maxSize: 244000, // 限制最大 chunk 大小
          cacheGroups: {
            // 将React相关库分离到单独的chunk
            react: {
              name: 'react',
              test: /[\\/]node_modules[\\/](react|react-dom)[\\/]/,
              chunks: 'all',
              priority: 20,
              enforce: true,
            },
            // 将 marked 库分离（只在文章详情页使用）
            marked: {
              name: 'marked',
              test: /[\\/]node_modules[\\/]marked[\\/]/,
              chunks: 'async', // 异步加载，不包含在初始 bundle 中
              priority: 15,
              enforce: true,
            },
            // 将其他第三方库分离
            vendor: {
              name: 'vendor',
              test: /[\\/]node_modules[\\/]/,
              chunks: 'all',
              priority: 10,
              enforce: true,
              minChunks: 2, // 至少被2个 chunk 使用才分离
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
              chunks: 'async', // 异步加载组件
              priority: 5,
              minSize: 20000,
            },
            // 默认配置：较小的 chunk 合并到 vendor
            default: {
              minChunks: 2,
              priority: -10,
              reuseExistingChunk: true,
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
  
  // 配置 SWC 编译器，移除不必要的 polyfill
  // 这些现代 JavaScript 功能在现代浏览器中已原生支持
  swcMinify: true,
  
  pageExtensions: ['tsx', 'ts', 'jsx', 'js'],
  
  // 启用实验性功能来优化bundle
  experimental: {
    optimizePackageImports: ['react', 'react-dom'],
    // 优化CSS加载和代码分割
    // 注意：optimizeCss 需要 critters 包，但在静态导出模式下可能有问题
    // 暂时禁用以避免构建错误
    // optimizeCss: true,
  },
  
  // 配置编译目标，只支持现代浏览器
  // 这样可以避免添加不必要的 polyfill
  // Next.js 14 使用 SWC，会根据 browserslist 自动优化
  // 现代浏览器（Chrome 90+, Firefox 88+, Safari 14+, Edge 90+）都原生支持：
  // - Array.prototype.at, flat, flatMap
  // - Object.fromEntries, Object.hasOwn
  // - String.prototype.trimStart, trimEnd
  // 因此不需要添加这些 polyfill
  
  // CSS 优化配置
  optimizeFonts: true,
  
  // 性能优化：减少首屏JavaScript大小
  poweredByHeader: false,
  
  // 优化构建输出
  generateEtags: true,
  
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
