import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { ArrowRight, Play } from 'lucide-react';
import { Link } from '@/i18n/navigation';
import PageHero from '@/components/sections/PageHero';
import ProjectCard from '@/components/sections/ProjectCard';
import SustainabilityBanner from '@/components/sections/SustainabilityBanner';
import { getCSRProjects } from '@/lib/data/projects';
import { getSiteSettings } from '@/lib/db/settings';

export const metadata: Metadata = {
  title: 'Cộng Đồng & CSR',
  description: 'TBSolaro lan tỏa ánh sáng, nuôi dưỡng tương lai – Các dự án CSR mang năng lượng sạch đến cộng đồng.',
};

export default async function CommunityPage() {
  const [t, settings] = await Promise.all([getTranslations('community'), getSiteSettings()]);
  const csrProjects = getCSRProjects();

  return (
    <>
      <PageHero
        title={t('heroTitle')}
        subtitle={t('heroSubtitle')}
        backgroundImage={settings.communityHeroImage || 'https://placehold.co/1600x700/1B5E30/FFFFFF?text=Community+Solar'}
        ctaPrimary={{ label: t('heroBtn1'), href: '/projects' }}
        ctaSecondary={{ label: t('heroBtn2'), href: '/contact' }}
        size="lg"
      />

      {/* CSR Highlights */}
      <section className="py-16 md:py-20">
        <div className="container-site">
          <div className="text-center mb-12">
            <h2 className="section-title">{t('highlightTitle')}</h2>
            <p className="section-subtitle">{t('highlightSubtitle')}</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {csrProjects.map((project) => (
              <ProjectCard key={project.id} project={project} variant="csr" />
            ))}
          </div>
          <div className="text-center mt-10">
            <Link href="/projects" className="btn-primary">
              {t('viewMoreBtn')} <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Video */}
      <section className="py-16 bg-brand">
        <div className="container-site">
          <div className="grid md:grid-cols-2 gap-10 items-center">
            <div>
              <span className="inline-flex items-center gap-2 bg-white/15 text-white text-xs font-semibold px-4 py-1.5 rounded-full mb-5 border border-white/20">
                {t('videoBadge')}
              </span>
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-4 leading-tight">
                {t('videoTitle')}
              </h2>
              <p className="text-white/75 leading-relaxed mb-6">
                {t('videoDesc')}
              </p>
              <div className="flex items-center gap-3">
                {[...Array(5)].map((_, i) => (
                  <span key={i} className="text-amber-400">★</span>
                ))}
                <span className="text-white/70 text-sm ml-1">{t('rating')}</span>
              </div>
            </div>
            <div className="relative rounded-2xl overflow-hidden aspect-video bg-black/20 border border-white/20">
              <img
                src="https://placehold.co/800x450/1B5E30/FFFFFF?text=Video+CSR+Cuba"
                alt="Video CSR Cuba"
                className="w-full h-full object-cover opacity-60"
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <button
                  className="w-16 h-16 rounded-full bg-white flex items-center justify-center shadow-lg hover:scale-110 transition-transform"
                  aria-label={t('playBtn')}
                >
                  <Play size={28} className="text-brand ml-1" fill="currentColor" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Impact Numbers */}
      <section className="py-16">
        <div className="container-site">
          <div className="text-center mb-10">
            <h2 className="section-title">{t('impactTitle')}</h2>
            <p className="section-subtitle">{t('impactSubtitle')}</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { value: '5+', labelKey: 'impact1Label', emoji: '🌍' },
              { value: '2,000+', labelKey: 'impact2Label', emoji: '👨‍🎓' },
              { value: '15', labelKey: 'impact3Label', emoji: '🏫' },
              { value: '50t', labelKey: 'impact4Label', emoji: '🌱' },
            ].map((item) => (
              <div key={item.labelKey} className="text-center bg-brand-surface rounded-2xl p-6 border border-brand/10">
                <div className="text-4xl mb-3">{item.emoji}</div>
                <div className="text-3xl font-black text-brand mb-1">{item.value}</div>
                <p className="text-gray-600 text-sm">{t(item.labelKey as Parameters<typeof t>[0])}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <SustainabilityBanner backgroundImage={settings.sustainabilityBgImage || undefined} />
    </>
  );
}
