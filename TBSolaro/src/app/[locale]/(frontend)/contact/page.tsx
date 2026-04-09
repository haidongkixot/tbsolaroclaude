import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { Download, FileText } from 'lucide-react';
import PageHero from '@/components/sections/PageHero';
import ContactFormSection from '@/components/sections/ContactFormSection';
import { prisma } from '@/lib/prisma';
import { getSiteSettings } from '@/lib/db/settings';

export const metadata: Metadata = {
  title: 'Liên Hệ & Tải Tài Liệu',
  description: 'Kết nối cùng TBSolaro – Đối tác năng lượng xanh của bạn. Tải tài liệu kỹ thuật và liên hệ tư vấn.',
};

export default async function ContactPage() {
  const [t, settings, documents] = await Promise.all([
    getTranslations('contact'),
    getSiteSettings(),
    prisma.downloadDocument.findMany({ where: { status: 'published' }, orderBy: { sortOrder: 'asc' }, take: 3 }),
  ]);

  return (
    <>
      <PageHero
        title={t('heroTitle')}
        subtitle={t('heroSubtitle')}
        description={t('heroDesc')}
        backgroundImage={settings.contactHeroImage || 'https://placehold.co/1600x600/1B5E30/FFFFFF?text=Solar+House'}
        size="lg"
      />

      {/* Contact Form Section */}
      <ContactFormSection
        title={t('formTitle')}
        subtitle={t('formSubtitle')}
        source="contact_page"
      />

      {/* Downloads */}
      <section className="py-16 bg-gray-50">
        <div className="container-site">
          <div className="text-center mb-10">
            <h2 className="section-title">{t('downloadsTitle')}</h2>
            <p className="section-subtitle">{t('downloadsSubtitle')}</p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {documents.map((doc) => (
              <div key={doc.id} className="card p-6 flex flex-col">
                <div className="flex items-start gap-4 mb-4">
                  <div className="w-12 h-12 rounded-xl bg-brand-surface flex items-center justify-center shrink-0 border border-brand/10 overflow-hidden">
                    {doc.icon ? (
                      <img src={doc.icon} alt="" className="w-7 h-7 object-contain" />
                    ) : (
                      <FileText size={22} className="text-brand" />
                    )}
                  </div>
                  <div>
                    <span className="text-xs font-semibold text-brand uppercase tracking-wider">{doc.fileType} • {doc.category}</span>
                    <h3 className="font-bold text-gray-900 mt-0.5 text-sm">{doc.title}</h3>
                  </div>
                </div>
                {doc.featuredImage && (
                  <div className="rounded-xl overflow-hidden aspect-video bg-gray-100 mb-4">
                    <img src={doc.featuredImage} alt={doc.title} className="w-full h-full object-cover" />
                  </div>
                )}
                <p className="text-gray-500 text-sm leading-relaxed mb-5 flex-1">{doc.description}</p>
                <a
                  href={doc.fileUrl}
                  className="flex items-center gap-2 text-sm font-semibold text-brand hover:text-brand-dark transition-colors border-t border-gray-100 pt-4"
                  download
                >
                  <Download size={15} /> {t('downloadBtn')}
                </a>
              </div>
            ))}
          </div>
          <div className="text-center mt-8">
            <a href="/contact?section=downloads" className="btn-outline">{t('viewAllDocs')}</a>
          </div>
        </div>
      </section>
    </>
  );
}
