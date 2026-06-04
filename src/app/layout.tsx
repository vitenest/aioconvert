import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "AIOConvert | Free Online File Converter (Image, Video, Document, Archive)",
    template: "%s | AIOConvert.com",
  },
  description: "AIOConvert is the ultimate free online file converter. Convert images, videos, documents, and archives instantly. Fast, secure, and privacy-focused with no registration required.",
  keywords: ["file converter", "free online converter", "image converter", "video converter", "document converter", "archive converter", "convert files fast", "secure file conversion", "no registration converter"],
  authors: [{ name: "ViteRank", url: "https://viterank.com" }],
  creator: "ViteNest",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://aioconvert.com",
    siteName: "AIOConvert",
    title: "AIOConvert | Free Online File Converter",
    description: "Convert images, videos, documents, and archives instantly. Fast, secure, and privacy-focused with no registration required.",
    images: [
      {
        url: "https://aioconvert.com/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "AIOConvert - Free Online File Converter",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "AIOConvert | Free Online File Converter",
    description: "Convert images, videos, documents, and archives instantly. Fast, secure, and privacy-focused with no registration required.",
    creator: "@ViteNest",
    images: ["https://aioconvert.com/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
