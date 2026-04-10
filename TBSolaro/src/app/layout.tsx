import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: {
    default: 'TBSolaro – Năng Lượng Mặt Trời Bền Vững',
    template: '%s | TBSolaro',
  },
  description: 'TBSolaro – Thương hiệu điện năng lượng mặt trời hàng đầu của Tập đoàn Thái Bình. Kiến tạo năng lượng bền vững, nuôi dưỡng tương lai xanh.',
  keywords: ['năng lượng mặt trời', 'điện mặt trời', 'TBSolaro', 'solar energy', 'energía solar', 'năng lượng tái tạo', 'renewable energy', 'Thai Binh Group'],
  metadataBase: new URL('https://tbsolaro.com'),
  openGraph: {
    type: 'website',
    siteName: 'TBSolaro',
    images: [{ url: '/og-default.png', width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return children;
}
