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
  keywords: "home fitness, home gym, budget workout, family fitness, bodyweight training, home exercise equipment, affordable fitness, workout at home",
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
