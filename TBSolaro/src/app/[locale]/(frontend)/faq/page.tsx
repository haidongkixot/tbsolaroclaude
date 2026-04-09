import type { Metadata } from 'next';
import { getSiteSettings } from '@/lib/db/settings';
import { prisma } from '@/lib/prisma';
import FAQContent from './_components/FAQContent';

export const metadata: Metadata = {
  title: 'FAQ',
  description: 'Giải đáp các câu hỏi thường gặp về sản phẩm và dịch vụ năng lượng mặt trời của TBSolaro.',
};

export default async function FAQPage() {
  const [settings, faqs] = await Promise.all([
    getSiteSettings(),
    prisma.fAQ.findMany({ where: { status: 'published' }, orderBy: { sortOrder: 'asc' } }),
  ]);
  return <FAQContent heroImage={settings.faqHeroImage || undefined} faqs={faqs} />;
}
