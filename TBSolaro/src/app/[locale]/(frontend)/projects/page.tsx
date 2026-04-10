import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { ArrowRight } from 'lucide-react';
import { Link } from '@/i18n/navigation';
import { buildMetadata } from '@/lib/seo';
import PageHero from '@/components/sections/PageHero';
import ProjectCard from '@/components/sections/ProjectCard';
import ContactFormSection from '@/components/sections/ContactFormSection';
import { getCSRProjects, getProjectsByCategory } from '@/lib/db/projects';
import { getSiteSettings, st } from '@/lib/db/settings';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  return buildMetadata('projects', locale);
}

const scaleKeys = [
  { key: 'enterprise', icon: '🏭', titleKey: 'enterpriseTitle', descKey: 'enterpriseDesc', image: 'https://placehold.co/700x400/1B5E30/FFFFFF?text=Enterprise+Solar' },
  { key: 'household', icon: '🏠', titleKey: 'householdTitle', descKey: 'householdDesc', image: 'https://placehold.co/700x400/3D9B5C/FFFFFF?text=Household+Solar' },
  { key: 'community', icon: '🏫', titleKey: 'communityTitle', descKey: 'communityDesc', image: 'https://placehold.co/700x400/52B788/FFFFFF?text=Community+Solar' },
];

export default async function ProjectsPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations('projects');
  const [csrProjects, enterpriseProjects, householdProjects, communityProjects, settings] = await Promise.all([
    getCSRProjects(locale),
    getProjectsByCategory('enterprise', locale),
    getProjectsByCategory('household', locale),
    getProjectsByCategory('community', locale),
    getSiteSettings(),
  ]);

  return (
    <>
      <PageHero
        title={t('heroTitle')}
        subtitle={t('heroSubtitle')}
        backgroundImage={settings.projectsHeroImage || 'https://placehold.co/1600x500/1B5E30/FFFFFF?text=Projects+Hero'}
        size="md"
      />

      {/* Project Scale */}
      <section className="py-16 md:py-20">
        <div className="container-site">
          <div className="text-center mb-12">
            <h2 className="section-title">{st(settings.sectionTitles, 'projects', 'scaleTitle', locale) || t('scaleTitle')}</h2>
            <p className="section-subtitle">{st(settings.sectionTitles, 'projects', 'scaleSubtitle', locale) || t('scaleSubtitle')}</p>
          </div>
          <div className="grid md:grid-cols-3 gap-6 mb-12">
            {scaleKeys.map((scale) => (
              <div key={scale.key} className="card group overflow-hidden">
                <div className="relative overflow-hidden aspect-video bg-gray-100">
                  <img
                    src={scale.image}
                    alt={t(scale.titleKey as Parameters<typeof t>[0])}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <div className="absolute bottom-4 left-4 text-white">
                    <div className="text-2xl mb-1">{scale.icon}</div>
                    <h3 className="font-bold text-sm">{t(scale.titleKey as Parameters<typeof t>[0])}</h3>
                    <p className="text-white/80 text-xs mt-1">{t(scale.descKey as Parameters<typeof t>[0])}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Featured projects by category */}
          <div className="space-y-12">
            {enterpriseProjects.length > 0 && (
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-5 flex items-center gap-2">
                  <span className="text-2xl">🏭</span> {t('enterpriseSectionTitle')}
                </h3>
                <div className="grid md:grid-cols-2 gap-6">
                  {enterpriseProjects.map((p) => (
                    <ProjectCard key={p.id} project={p} variant="horizontal" />
                  ))}
                </div>
              </div>
            )}
            {householdProjects.length > 0 && (
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-5 flex items-center gap-2">
                  <span className="text-2xl">🏠</span> {t('householdSectionTitle')}
                </h3>
                <div className="grid md:grid-cols-2 gap-6">
                  {householdProjects.map((p) => (
                    <ProjectCard key={p.id} project={p} variant="horizontal" />
                  ))}
                </div>
              </div>
            )}
            {communityProjects.length > 0 && (
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-5 flex items-center gap-2">
                  <span className="text-2xl">🏫</span> {t('communitySectionTitle')}
                </h3>
                <div className="grid md:grid-cols-2 gap-6">
                  {communityProjects.map((p) => (
                    <ProjectCard key={p.id} project={p} variant="horizontal" />
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* CSR Projects */}
      <section className="py-16 md:py-20 bg-brand-surface">
        <div className="container-site">
          <div className="text-center mb-12">
            <h2 className="section-title">{t('csrTitle')}</h2>
            <p className="section-subtitle">{t('csrSubtitle')}</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
            {csrProjects.map((project) => (
              <ProjectCard key={project.id} project={project} variant="csr" />
            ))}
          </div>
          <div className="text-center">
            <Link href="/community" className="btn-primary">
              {t('csrBtn')} <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* Contact Form */}
      <ContactFormSection source="projects_page" />
    </>
  );
}
