import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: {
    default: 'TBSolaro – Năng Lượng Mặt Trời Bền Vững',
    template: '%s | TBSolaro',
  },
  description: 'TBSolaro – Thương hiệu điện năng lượng mặt trời hàng đầu của Tập đoàn Thái Bình. Kiến tạo năng lượng bền vững, nuôi dưỡng tương lai xanh.',
  keywords: ['năng lượng mặt trời', 'điện mặt trời', 'TBSolaro', 'solar', 'năng lượng tái tạo'],
  openGraph: {
    type: 'website',
    siteName: 'TBSolaro',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return children;
}
