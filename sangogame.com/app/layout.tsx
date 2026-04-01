import Footer from '@/components/Footer';
import Navbar from '@/components/Navbar';
import AnalyticsProvider from '@/components/AnalyticsProvider';
import type { Metadata } from 'next';
import { Suspense } from 'react';
import '../styles/globals.css';

export const metadata: Metadata = {
  metadataBase: new URL('https://www.sangogame.com'),
  title: '卧龙风云 — 三国策略手游',
  description:
    '卧龙风云是一款以三国时代为背景的多平台回合实时策略游戏，支持 iOS、Android、macOS、Windows、Web。',
  openGraph: {
    title:       '卧龙风云 — 三国策略手游',
    description: '策略、三国、多平台。选择一方势力，书写属于你的史诗。',
    images:      [{ url: '/assets/images/og-image.jpg', width: 1200, height: 630 }],
    type:        'website',
    locale:      'zh_CN',
  },
  twitter: {
    card:        'summary_large_image',
    title:       '卧龙风云 — 三国策略手游',
    description: '策略、三国、多平台。选择一方势力，书写属于你的史诗。',
    images:      ['/assets/images/og-image.jpg'],
  },
  icons: { icon: '/assets/logo.png' },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="zh-CN">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Noto+Sans+SC:wght@300;400;500;700&family=Noto+Serif+SC:wght@600;700;900&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="bg-sango-bg text-sango-text font-body antialiased overflow-x-hidden">
        <Suspense fallback={null}>
          <AnalyticsProvider />
        </Suspense>
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
