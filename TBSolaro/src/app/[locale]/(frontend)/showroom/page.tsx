import type { Metadata } from 'next';
import { getSiteSettings } from '@/lib/db/settings';
import { prisma } from '@/lib/prisma';
import ShowroomContent from './_components/ShowroomContent';

export const metadata: Metadata = {
  title: 'Showroom',
  description: 'Tham quan Showroom TBSolaro – Trải nghiệm trực tiếp các sản phẩm năng lượng mặt trời.',
};

export default async function ShowroomPage() {
  const [settings, showrooms] = await Promise.all([
    getSiteSettings(),
    prisma.showroom.findMany({ where: { status: 'published' }, orderBy: { sortOrder: 'asc' } }),
  ]);
  return <ShowroomContent heroImage={settings.showroomHeroImage || undefined} showrooms={showrooms} />;
}
