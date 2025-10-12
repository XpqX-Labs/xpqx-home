import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import BannerPreloader from "@/components/BannerPreloader";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "My Terminal",
  description:
    "Personal website of Ilham Alfath. Web developer passionate about modern technologies. Built with Next.js & TypeScript.",
  authors: [{ name: "Ilham Alfath", url: "https://xpqx.xyz" }],
  keywords: ["Ilham Alfath", "web developer", "portfolio", "xpqx", "developer"],
  openGraph: {
    title: "My Terminal",
    description:
      "Personal website of Ilham Alfath. Web developer passionate about modern technologies.",
    url: "https://xpqx.xyz",
    siteName: "XPQX.XYZ",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "My Terminal",
    description: "Personal website of Ilham Alfath. Web developer passionate about modern technologies.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <BannerPreloader />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
