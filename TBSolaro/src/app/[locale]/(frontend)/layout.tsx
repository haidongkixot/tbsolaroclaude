import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { getSiteSettings } from '@/lib/db/settings';

export default async function FrontendLayout({ children }: { children: React.ReactNode }) {
  const settings = await getSiteSettings();
  return (
    <>
      <Header logoUrl={settings.logoUrl} />
      <main>{children}</main>
      <Footer settings={settings} />
    </>
  );
}
