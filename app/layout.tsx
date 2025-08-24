import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { SessionProvider } from '@/components/providers/SessionProvider';

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "シャッフルもじ",
  description: "プログラミング用語の並び替えゲーム。HTML/CSS、Ruby、基本情報技術者試験の用語を楽しく学習できます。",
  keywords: ["プログラミング", "学習", "ゲーム", "HTML", "CSS", "Ruby", "基本情報技術者"],
  authors: [{ name: "Shufflemoji" }],
  creator: "Shufflemoji",
  publisher: "Shufflemoji",
  
  // ファビコン設定
  icons: {
    icon: [
      { url: "/shamoji.png", sizes: "32x32", type: "image/png" },
      { url: "/shamoji.png", sizes: "16x16", type: "image/png" },
    ],
    apple: [
      { url: "/shamoji.png", sizes: "180x180", type: "image/png" },
    ],
    shortcut: "/shamoji.png",
  },

  // メタタグ
  manifest: "/site.webmanifest",
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#000000" },
  ],

  // OGP設定
  openGraph: {
    title: "シャッフルもじ",
    description: "プログラミング用語の並び替えゲーム",
    url: "https://shufflemoji.example.com", // デプロイ後に実際のURLに変更
    siteName: "シャッフルもじ",
    type: "website",
    locale: "ja_JP",
    images: [
      {
        url: "/og-image.png", // 仮のOGP画像パス
        width: 1200,
        height: 630,
        alt: "シャッフルもじ - プログラミング用語学習ゲーム",
      },
    ],
  },

  // Twitter Card設定
  twitter: {
    card: "summary_large_image",
    site: "@shufflemoji", // 仮のTwitterアカウント
    creator: "@shufflemoji",
    title: "シャッフルもじ",
    description: "プログラミング用語の並び替えゲーム",
    images: ["/og-image.png"], // 仮のTwitter Card画像
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
        <SessionProvider>
          {children}
        </SessionProvider>
      </body>
    </html>
  );
}
