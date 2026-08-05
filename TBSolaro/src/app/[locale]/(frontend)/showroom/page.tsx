import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { buildMetadata } from '@/lib/seo';
import { getSiteSettings } from '@/lib/db/settings';
import { prisma } from '@/lib/prisma';
import ShowroomContent from './_components/ShowroomContent';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const settings = await getSiteSettings();
  const meta = await buildMetadata('showroom', locale);
  // Keep the page out of search results while it is hidden
  return settings.showShowroom ? meta : { ...meta, robots: { index: false, follow: false } };
}

export default async function ShowroomPage() {
  const [settings, showrooms] = await Promise.all([
    getSiteSettings(),
    prisma.showroom.findMany({ where: { status: 'published' }, orderBy: { sortOrder: 'asc' } }),
  ]);
  if (!settings.showShowroom) notFound();
  return <ShowroomContent heroImage={settings.showroomHeroImage || undefined} showrooms={showrooms} />;
}
