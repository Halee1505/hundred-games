/* eslint-disable @next/next/no-page-custom-font */

import type { Metadata } from "next";
import { Spline_Sans } from "next/font/google";
import "./globals.css";

const spline = Spline_Sans({
  subsets: ["latin"],
  variable: "--font-display",
});

const siteUrl = "https://example.com/";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "Hundred Games — Play Free Browser Games",
  description:
    "Dive into lightning-fast games across racing, action, puzzle, and strategy. Zero downloads, instant fun.",
  openGraph: {
    title: "Hundred Games — Play Free Browser Games",
    description:
      "Discover curated browser games with pro visuals, trending picks, and instant play modes.",
    url: siteUrl,
    siteName: "Hundred Games",
    images: [
      {
        url: "/logo.jpg",
        alt: "Hundred Games logo",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Hundred Games — Play Free Browser Games",
    description: "Curated browser games that run anywhere with no installs.",
    images: ["/logo.jpg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className={`${spline.variable} bg-background-dark text-white antialiased`}>
        {children}
      </body>
    </html>
  );
}
