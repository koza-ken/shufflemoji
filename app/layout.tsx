import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import { SessionProvider } from '@/components/providers/SessionProvider';
import Footer from '@/components/ui/Footer';
import { ConditionalFooter } from '@/components/ui/ConditionalFooter';

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: 'シャッフルもじ',
  description:
    'プログラミング用語の並び替えゲーム。HTML/CSS、Ruby、基本情報技術者試験の用語を楽しく学習できます。',
  keywords: [
    'プログラミング',
    '学習',
    'ゲーム',
    'HTML',
    'CSS',
    'Ruby',
    '基本情報技術者',
  ],
  // authors: [{ name: 'Shufflemoji' }],
  // creator: 'Shufflemoji',
  // publisher: 'Shufflemoji',

  // ファビコン設定
  icons: [
    { rel: 'icon', url: '/shamoji.png', sizes: '16x16', type: 'image/png' },
    { rel: 'icon', url: '/shamoji.png', sizes: '32x32', type: 'image/png' },
    { rel: 'apple-touch-icon', url: '/shamoji.png', sizes: '180x180' },
  ],

  // メタタグ
  manifest: '/site.webmanifest',
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
    { media: '(prefers-color-scheme: dark)', color: '#121212' },
  ],

  // OGP設定
  openGraph: {
    title: 'シャッフルもじ',
    description: 'バラバラになった文字の並び替えゲーム',
    url: 'https://shamoji.vercel.app/', // デプロイ後に実際のURLに変更
    siteName: 'シャッフルもじ',
    type: 'website',
    locale: 'ja_JP',
    images: [
      {
        url: '/shamoji_ogp.png', // 仮のOGP画像パス
        width: 1200,
        height: 630,
        alt: 'シャッフルもじ - プログラミング用語学習ゲーム',
      },
    ],
  },

  // Twitter Card設定
  twitter: {
    card: 'summary_large_image',
    // site: '@shufflemoji', // 仮のTwitterアカウント
    // creator: '@shufflemoji',
    title: 'シャッフルもじ',
    description: 'バラバラになった文字の並び替えゲーム',
    images: ['/shamoji_ogp.png'], // 仮のTwitter Card画像
  },

  // その他のメタタグ
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {/* Google Analytics */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-D38J9Z5VFS"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${process.env.NEXT_PUBLIC_GA_ID}');
          `}
        </Script>

        <SessionProvider>
          <div className="flex flex-col mobile-layout h-screen h-dvh overflow-hidden touch-none overscroll-none">
            <main className="flex-1 overflow-y-auto min-h-0">{children}</main>
            <ConditionalFooter />
          </div>
        </SessionProvider>
      </body>
    </html>
  );
}
