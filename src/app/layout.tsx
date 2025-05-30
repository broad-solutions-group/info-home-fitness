import type { Metadata } from "next";
import { Poppins, Open_Sans, Montserrat } from "next/font/google";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import ClientWrapper from "./components/ClientWrapper/ClientWrapper";
import "./globals.css";

const poppins = Poppins({ 
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-poppins",
  display: 'swap',
  preload: true,
});

const openSans = Open_Sans({ 
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-open-sans",
  display: 'swap',
  preload: true,
});

const montserrat = Montserrat({ 
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-montserrat",
  display: 'swap',
  preload: false, // 只预加载主要字体
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
  return (
    <html 
      lang="en" 
      className={`${poppins.variable} ${openSans.variable} ${montserrat.variable}`}
      suppressHydrationWarning={true}
    >
      <head>
        {/* 优化字体加载 */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        
        {/* 防止FOUC */}
        <style dangerouslySetInnerHTML={{
          __html: `
            html { 
              visibility: hidden; 
              opacity: 0; 
            }
            html.hydrated { 
              visibility: visible; 
              opacity: 1; 
              transition: opacity 0.2s ease-in-out; 
            }
          `
        }} />
      </head>
      <body suppressHydrationWarning={true}>
        <ClientWrapper>
          <Header />
          <main>
            {children}
          </main>
          <Footer />
        </ClientWrapper>
      </body>
    </html>
  );
}
