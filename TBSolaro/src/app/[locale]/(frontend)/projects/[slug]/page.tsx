import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { Link } from '@/i18n/navigation';
import { MapPin, Zap, Calendar, Clock, ChevronRight } from 'lucide-react';
import ProjectCard from '@/components/sections/ProjectCard';
import SustainabilityBanner from '@/components/sections/SustainabilityBanner';
import { getProjectBySlug, getRelatedProjects, getPublishedProjects } from '@/lib/db/projects';
import GallerySlider from './_components/GallerySlider';

interface Props {
  params: Promise<{ locale: string; slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, slug } = await params;
  const project = await getProjectBySlug(slug, locale);
  if (!project) return {};
  return { title: project.title, description: project.excerpt };
}

export default async function ProjectDetailPage({ params }: Props) {
  const { locale, slug } = await params;
  const t = await getTranslations('projects');
  const tc = await getTranslations('common');

  const [project, allProjects] = await Promise.all([
    getProjectBySlug(slug, locale),
    getPublishedProjects(locale),
  ]);
  if (!project) notFound();

  const relatedRaw = await getRelatedProjects(project.relatedSlugs || [], locale);
  const related = relatedRaw.length > 0 ? relatedRaw : allProjects.filter((p) => p.slug !== slug).slice(0, 3);
  const gallery = project.gallery.length > 0 ? project.gallery : [project.featuredImage].filter(Boolean);

  return (
    <div className="bg-white">
      <GallerySlider images={gallery} alt={project.title} />

      <section className="container-site py-12">
        <div className="grid lg:grid-cols-3 gap-10">
          <div className="lg:col-span-2">
            <nav className="flex items-center gap-2 text-sm text-gray-500 mb-6">
              <Link href="/" className="hover:text-brand">{tc('home')}</Link>
              <ChevronRight size={14} />
              <Link href="/projects" className="hover:text-brand">{t('breadcrumb')}</Link>
              <ChevronRight size={14} />
              <span className="text-gray-900">{project.title}</span>
            </nav>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">{project.title}</h1>
            <div className="prose max-w-none" dangerouslySetInnerHTML={{ __html: project.content }} />
          </div>

          <div className="lg:col-span-1">
            <div className="sticky top-24 space-y-4">
              <div className="bg-brand-surface rounded-2xl p-6 border border-brand/10">
                <h3 className="font-bold text-gray-900 mb-4 text-sm uppercase tracking-wider">{t('projectInfo')}</h3>
                <ul className="space-y-4">
                  {project.power && (
                    <li className="flex items-start gap-3">
                      <div className="w-9 h-9 rounded-xl bg-brand flex items-center justify-center shrink-0"><Zap size={16} className="text-white" /></div>
                      <div><p className="text-xs text-gray-500">{t('powerLabel')}</p><p className="font-bold text-gray-900">{project.power}</p></div>
                    </li>
                  )}
                  {project.installationDate && (
                    <li className="flex items-start gap-3">
                      <div className="w-9 h-9 rounded-xl bg-brand flex items-center justify-center shrink-0"><Calendar size={16} className="text-white" /></div>
                      <div><p className="text-xs text-gray-500">{t('dateLabel')}</p><p className="font-bold text-gray-900">{project.installationDate}</p></div>
                    </li>
                  )}
                  {project.year && (
                    <li className="flex items-start gap-3">
                      <div className="w-9 h-9 rounded-xl bg-brand flex items-center justify-center shrink-0"><Clock size={16} className="text-white" /></div>
                      <div><p className="text-xs text-gray-500">{t('yearLabel')}</p><p className="font-bold text-gray-900">{project.year}</p></div>
                    </li>
                  )}
                  {project.location && (
                    <li className="flex items-start gap-3">
                      <div className="w-9 h-9 rounded-xl bg-brand flex items-center justify-center shrink-0"><MapPin size={16} className="text-white" /></div>
                      <div><p className="text-xs text-gray-500">{t('locationLabel')}</p><p className="font-bold text-gray-900 text-sm">{project.location}</p></div>
                    </li>
                  )}
                </ul>
              </div>
              <div className="bg-brand rounded-2xl p-6 text-white">
                <h3 className="font-bold mb-2">{t('ctaTitle')}</h3>
                <p className="text-white/75 text-sm mb-4">{t('ctaDesc')}</p>
                <Link href="/contact" className="btn-white text-sm">{t('ctaBtn')}</Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {related.length > 0 && (
        <section className="py-16 bg-gray-50">
          <div className="container-site">
            <h2 className="text-2xl font-bold text-gray-900 mb-8">{t('relatedTitle')}</h2>
            <div className="grid sm:grid-cols-3 gap-6">
              {related.map((p) => <ProjectCard key={p.id} project={p} />)}
            </div>
          </div>
        </section>
      )}

      <SustainabilityBanner />
    </div>
  );
}
