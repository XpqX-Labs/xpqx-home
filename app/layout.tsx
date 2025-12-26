import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Ilham Alfath | Web Developer',
  description:
    'Portfolio of Ilham Alfath — Web developer passionate about crafting modern, elegant digital experiences with cutting-edge technologies.',
  authors: [{ name: 'Ilham Alfath', url: 'https://xpqx.xyz' }],
  keywords: [
    'Ilham Alfath',
    'web developer',
    'portfolio',
    'frontend',
    'full-stack',
    'Next.js',
    'React',
  ],
  openGraph: {
    title: 'Ilham Alfath | Web Developer',
    description:
      'Portfolio of Ilham Alfath — Web developer passionate about crafting modern, elegant digital experiences.',
    url: 'https://xpqx.xyz',
    siteName: 'Ilham Alfath Portfolio',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Ilham Alfath | Web Developer',
    description:
      'Portfolio of Ilham Alfath — Web developer passionate about crafting modern, elegant digital experiences.',
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
        <link rel="preload" href="/images/Windows_98.png" as="image" />
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>{children}</body>
    </html>
  );
}
