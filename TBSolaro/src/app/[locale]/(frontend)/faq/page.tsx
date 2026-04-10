import type { Metadata } from 'next';
import { buildMetadata } from '@/lib/seo';
import { getSiteSettings } from '@/lib/db/settings';
import { prisma } from '@/lib/prisma';
import FAQContent from './_components/FAQContent';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  return buildMetadata('faq', locale);
}

export default async function FAQPage() {
  const [settings, faqs] = await Promise.all([
    getSiteSettings(),
    prisma.fAQ.findMany({ where: { status: 'published' }, orderBy: { sortOrder: 'asc' } }),
  ]);
  return <FAQContent heroImage={settings.faqHeroImage || undefined} faqs={faqs} />;
}
