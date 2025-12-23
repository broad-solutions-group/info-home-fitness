import type { Metadata } from "next";
import { Poppins, Open_Sans, Montserrat } from "next/font/google";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import ClientWrapper from "./components/ClientWrapper/ClientWrapper";
import SDKLoader from "./components/SDKLoader/SDKLoader";
import { dataService } from "./services/dataService";
import "./globals.css";

// 优化字体加载：只加载必要的字重，减少文件大小
const poppins = Poppins({
  subsets: ["latin"],
  weight: ["600", "700"], // 只加载标题需要的粗体字重
  variable: "--font-poppins",
  display: 'swap',
  preload: true,
  adjustFontFallback: true, // 优化字体回退
});

const openSans = Open_Sans({
  subsets: ["latin"],
  weight: ["400", "600"], // 只加载正文需要的字重
  variable: "--font-open-sans",
  display: 'swap',
  preload: true,
  adjustFontFallback: true,
});

// Montserrat 延迟加载，不在首屏使用
const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["400", "600"],
  variable: "--font-montserrat",
  display: 'swap',
  preload: false,
  adjustFontFallback: true,
});

export const metadata: Metadata = {
  title: "Home Fitness - Your Ultimate Guide to Affordable Home Workouts",
  description: "Discover budget-friendly home gym setups, family-friendly workouts, equipment-free strength training, and motivation tips. Transform your home into the perfect fitness space without breaking the bank.",
  keywords: "cheap home gym, home gym setup, small space gym ideas, home workout gear, under $50 fitness items, no gym equipment, garage gym ideas, affordable home gym, diy gym space, space-saving gym, compact workout space, foldable fitness gear, dollar store fitness, budget workout tools, cheap gym finds, compact fitness equipment, small apartment workouts, foldable gear, smart home fitness, affordable fitness tech, budget smart gear, ikea workout hacks, affordable gym design, diy fitness room, indoor kid workouts, fun family fitness, kids exercise ideas, family fitness time, living room workouts, home family exercises, youtube kid workouts, parent-child fitness channels, family exercise content, screen-free activities, family challenges, indoor games for fitness, dance breaks, mood boosting workouts, kids activity ideas, family olympics, backyard workouts, group fitness games, toddler workouts, energy burners, rainy day exercises, safe kids workouts, family-friendly routines, active kids ideas, bodyweight muscle building, no equipment strength, home workouts, no gear fitness, body resistance workouts, home strength plans, push-up progressions, upper body training, beginner to advanced fitness, core workouts, no equipment abs, sculpt your core at home, quick full-body workout, bodyweight burn, at-home routine, squat variations, no weight leg workouts, home leg training, bodyweight strength, everyday objects workout, home power routine, ripped without weights, full body training, calisthenics workout, home fitness motivation, stay consistent, solo workout tips, 5-minute workout, fast fitness start, habit forming tip, morning workouts, early fitness benefits, routine sticking strategy, home habit building, sustainable workouts, routine you won't quit, vision board fitness, playlist motivation, sticky note tips, fitness psychology, long-term habit, sustainable routine guide, low motivation tricks, fitness hacks, stay on track, fitness systems, skip willpower, automated habits",
  authors: [{ name: "Home Fitness Team" }],
  creator: "Home Fitness",
  publisher: "Home Fitness",
  robots: "index, follow",
  openGraph: {
    title: "Home Fitness - Your Ultimate Guide to Affordable Home Workouts",
    description: "Discover budget-friendly home gym setups, family-friendly workouts, equipment-free strength training, and motivation tips.",
    type: "website",
    locale: "en_US",
    siteName: "Home Fitness"
  },
  twitter: {
    card: "summary_large_image",
    title: "Home Fitness - Your Ultimate Guide to Affordable Home Workouts",
    description: "Discover budget-friendly home gym setups, family-friendly workouts, equipment-free strength training, and motivation tips."
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // 获取Hero Banner第一张图片URL用于预加载（优化LCP）
  const homeData = dataService.getHomePageData();
  const firstHeroImageUrl = homeData.heroArticles?.[0]?.imageUrl;

  return (
    <html
      lang="en"
      className={`${poppins.variable} ${openSans.variable} ${montserrat.variable}`}
      suppressHydrationWarning={true}
    >
      <head>
        {/* DNS预解析和预连接 - 优化资源加载速度 */}
        {/* 注意：Google Fonts 的 preconnect 由 next/font/google 自动处理，不需要手动添加 */}
        <link rel="dns-prefetch" href="https://cdn-info.broadsolutionsgroup.com" />
        <link rel="dns-prefetch" href="https://info-domainconfig.cloudinfinitedata.com" />
        
        {/* 预连接关键域名（非 Google Fonts） */}
        <link rel="preconnect" href="https://cdn-info.broadsolutionsgroup.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://info-domainconfig.cloudinfinitedata.com" crossOrigin="anonymous" />
        
        {/* 预加载Hero Banner第一张图片 - 优化LCP指标 */}
        {firstHeroImageUrl && (
          <link
            rel="preload"
            as="image"
            href={firstHeroImageUrl}
            fetchPriority="high"
            // 如果图片来自CDN，添加crossorigin
            {...(firstHeroImageUrl.startsWith('http') ? { crossOrigin: 'anonymous' } : {})}
          />
        )}
      </head>
      <body suppressHydrationWarning={true}>
        <ClientWrapper>
          <Header />
          <main>
            {children}
          </main>
          <Footer />
        </ClientWrapper>

        {/* SDK加载器 - 全局引入 */}
        <SDKLoader
          config={{
            enabled: process.env.NEXT_PUBLIC_SDK_ENABLED !== 'false',
            debug: process.env.NEXT_PUBLIC_SDK_DEBUG === 'true' || process.env.NODE_ENV === 'development'
          }}
        />
      </body>
    </html>
  );
}
