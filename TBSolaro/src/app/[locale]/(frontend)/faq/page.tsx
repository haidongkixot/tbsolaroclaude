import type { Metadata } from 'next';
import { getSiteSettings } from '@/lib/db/settings';
import FAQContent from './_components/FAQContent';

export const metadata: Metadata = {
  title: 'FAQ',
  description: 'Giải đáp các câu hỏi thường gặp về sản phẩm và dịch vụ năng lượng mặt trời của TBSolaro.',
};

export default async function FAQPage() {
  const settings = await getSiteSettings();
  return <FAQContent heroImage={settings.faqHeroImage || undefined} />;
}
