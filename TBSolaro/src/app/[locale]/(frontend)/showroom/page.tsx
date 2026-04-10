import type { Metadata } from 'next';
import { buildMetadata } from '@/lib/seo';
import { getSiteSettings } from '@/lib/db/settings';
import { prisma } from '@/lib/prisma';
import ShowroomContent from './_components/ShowroomContent';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  return buildMetadata('showroom', locale);
}

export default async function ShowroomPage() {
  const [settings, showrooms] = await Promise.all([
    getSiteSettings(),
    prisma.showroom.findMany({ where: { status: 'published' }, orderBy: { sortOrder: 'asc' } }),
  ]);
  return <ShowroomContent heroImage={settings.showroomHeroImage || undefined} showrooms={showrooms} />;
}
