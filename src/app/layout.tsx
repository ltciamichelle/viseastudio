import type { Metadata } from 'next';
import { Inter, Space_Grotesk } from 'next/font/google';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  weight: ['500', '600', '700'],
  variable: '--font-space-grotesk',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL('https://viseastudio.com'),
  title: 'Visea Studio | Digital Agency & Creative Studio',
  description:
    'A digital agency that builds brands and digital experiences that inspire confidence and professionalism. Strategic branding, campaign visuals, and high-conversion websites.',
  keywords: [
    'Digital Agency',
    'Brand Identity',
    'Web Design',
    'Creative Studio',
    'Landing Pages',
    'Campaign Visuals',
    'Visea Studio',
  ],
  authors: [{ name: 'Visea Studio' }],
  creator: 'Visea Studio',
  openGraph: {
    title: 'Visea Studio | Digital Agency',
    description: 'Brands and digital experiences built to earn trust.',
    type: 'website',
    locale: 'en_US',
    siteName: 'Visea Studio',
    images: [
      {
        url: '/assets/logo/logo-wide.webp',
        width: 1200,
        height: 630,
        alt: 'Visea Studio Logo',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Visea Studio | Digital Agency',
    description: 'Brands and digital experiences built to earn trust.',
  },
  icons: {
    icon: '/assets/logo/logo.webp',
  },
  robots: {
    index: true,
    follow: true,
  },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'ProfessionalService',
  name: 'Visea Studio',
  description:
    'A digital agency that builds brands and digital experiences that inspire confidence and professionalism.',
  url: 'https://viseastudio.com',
  logo: 'https://viseastudio.com/assets/logo/logo.webp',
  sameAs: ['https://www.instagram.com/visea.studio'],
  serviceType: [
    'Brand Identity Design',
    'Visual Campaign Design',
    'Website and Landing Page Development',
  ],
};

import SmoothScroll from '@/components/SmoothScroll';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${spaceGrotesk.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body>
        <SmoothScroll>{children}</SmoothScroll>
      </body>
    </html>
  );
}
