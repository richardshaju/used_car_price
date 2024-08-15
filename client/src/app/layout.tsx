import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Used cars price predictor",
  description: "Used cars price predictor using machine learning",
  icons: [
    {
      rel: "icon",
      url: "/favicon.ico",
    },
    {
      rel: 'icon',
      type: 'image/jpg',
      sizes: '32x32',
      url: '/favicon-32x32.jpg',
    },
    {
      rel: 'icon',
      type: 'image/jpg',
      sizes: '16x16',
      url: '/favicon-16x16.jpg',
    },
    {
      rel: 'apple-touch-icon',
      sizes: '180x180',
      url: '/apple-touch-icon.jpg',
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
