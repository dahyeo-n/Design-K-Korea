import type { Metadata } from 'next';
import { Noto_Sans_KR } from 'next/font/google';
import { ReactNode } from 'react';

import './globals.css';
import { Providers } from './Providers';

import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';

const notoSansKr = Noto_Sans_KR({
  variable: '--font-noto-sans-kr',
  subsets: ['latin'],
  weight: ['400', '500', '700'],
});

export const metadata: Metadata = {
  title: '디자인케이코리아',
  description:
    '집과 일터, 그리고 그 너머 — 당신의 시간을 품는 제3의 공간을 완성합니다. 인테리어 전문 회사 디자인케이코리아',
  openGraph: {
    title: '디자인케이코리아',
    description:
      '집과 일터, 그리고 그 너머 — 당신의 시간을 품는 제3의 공간을 완성합니다. 인테리어 전문 회사 디자인케이코리아',
    url: 'https://designkkorea.com',
    siteName: '디자인케이코리아',
    images: [
      {
        url: '/thumbnail.png',
        width: 1200,
        height: 630,
        alt: '디자인케이코리아 메인 커버 이미지',
      },
    ],
    locale: 'ko_KR',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: '디자인케이코리아',
    description:
      '집과 일터, 그리고 그 너머 — 당신의 시간을 품는 제3의 공간을 완성합니다.',
    images: ['/thumbnail.png'],
  },
  metadataBase: new URL('https://designkkorea.com'),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="ko">
      <body
        className={`${notoSansKr.variable} ${notoSansKr.className} antialiased`}>
        <Providers>
          <Navbar />
          {children}
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
