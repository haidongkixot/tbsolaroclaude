import type { Metadata } from 'next';
import { getSiteSettings } from '@/lib/db/settings';
import ShowroomContent from './_components/ShowroomContent';

export const metadata: Metadata = {
  title: 'Showroom',
  description: 'Tham quan Showroom TBSolaro – Trải nghiệm trực tiếp các sản phẩm năng lượng mặt trời.',
};

export default async function ShowroomPage() {
  const settings = await getSiteSettings();
  return <ShowroomContent heroImage={settings.showroomHeroImage || undefined} />;
}
