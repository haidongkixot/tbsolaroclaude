import type { Metadata } from 'next';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { routing } from '@/i18n/routing';
import { getPageMeta } from '@/lib/seo';
import '../globals.css';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const m = getPageMeta('home', locale);
  return {
    title: { default: m.title, template: '%s | TBSolaro' },
    description: m.description,
    alternates: {
      languages: { vi: 'https://tbsolaro.com', en: 'https://tbsolaro.com/en', es: 'https://tbsolaro.com/es' },
    },
    openGraph: { locale: locale === 'en' ? 'en_US' : locale === 'es' ? 'es_ES' : 'vi_VN' },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!routing.locales.includes(locale as 'vi' | 'en' | 'es')) {
    notFound();
  }

  const messages = await getMessages();

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'TBSolaro',
    url: 'https://tbsolaro.com',
    logo: 'https://tbsolaro.com/logo.png',
    description: 'Leading solar energy brand by Thai Binh Group. Solar panel combos, inverters, and battery storage.',
    parentOrganization: { '@type': 'Organization', name: 'Thai Binh Group' },
    sameAs: [],
  };

  return (
    <html lang={locale}>
      <body>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
        <NextIntlClientProvider messages={messages}>
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
