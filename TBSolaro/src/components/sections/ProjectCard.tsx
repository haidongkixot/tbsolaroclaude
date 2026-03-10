'use client';

import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { MapPin, Zap, ArrowRight, Calendar } from 'lucide-react';
import type { Project } from '@/types';
import { cn } from '@/lib/utils';

const categoryColors: Record<string, string> = {
  enterprise: 'bg-blue-50 text-blue-700 border-blue-200',
  household: 'bg-amber-50 text-amber-700 border-amber-200',
  community: 'bg-purple-50 text-purple-700 border-purple-200',
  csr: 'bg-brand-surface text-brand border-brand/20',
};

interface ProjectCardProps {
  project: Project;
  variant?: 'default' | 'csr' | 'horizontal';
}

export default function ProjectCard({ project, variant = 'default' }: ProjectCardProps) {
  const t = useTranslations('projectCard');

  if (variant === 'horizontal') {
    return (
      <article className="card group flex gap-0 overflow-hidden relative cursor-pointer">
        <Link href={`/projects/${project.slug}`} className="absolute inset-0 z-0 rounded-2xl" aria-label={project.title} />
        <div className="w-2/5 relative overflow-hidden bg-gray-100 shrink-0 pointer-events-none">
          <img
            src={project.featuredImage}
            alt={project.title}
            className="w-full h-full object-cover min-h-[180px] group-hover:scale-105 transition-transform duration-300"
          />
        </div>
        <div className="p-5 flex flex-col justify-between pointer-events-none relative">
          <div>
            <span className={cn('inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border mb-3', categoryColors[project.category])}>
              {t(project.category as 'enterprise' | 'household' | 'community' | 'csr')}
            </span>
            <h3 className="font-bold text-gray-900 text-sm mb-2 group-hover:text-brand transition-colors line-clamp-2">{project.title}</h3>
            <p className="text-xs text-gray-600 line-clamp-3 leading-relaxed">{project.excerpt}</p>
          </div>
          <div className="flex items-center gap-3 mt-3 text-xs text-gray-500">
            {project.location && (
              <span className="flex items-center gap-1"><MapPin size={11} />{project.location}</span>
            )}
          </div>
        </div>
      </article>
    );
  }

  if (variant === 'csr') {
    return (
      <article className="card group overflow-hidden flex flex-col relative cursor-pointer">
        <Link href={`/projects/${project.slug}`} className="absolute inset-0 z-0 rounded-2xl" aria-label={project.title} />
        <div className="relative overflow-hidden aspect-video bg-gray-100 pointer-events-none">
          <img
            src={project.featuredImage}
            alt={project.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
          <div className="absolute bottom-3 left-3">
            <span className="inline-flex items-center px-2 py-0.5 bg-brand text-white text-xs font-semibold rounded-full">
              CSR
            </span>
          </div>
        </div>
        <div className="p-5 flex flex-col flex-1 pointer-events-none relative">
          <h3 className="font-bold text-gray-900 text-sm mb-2 group-hover:text-brand transition-colors line-clamp-2">{project.title}</h3>
          <p className="text-xs text-gray-600 line-clamp-3 leading-relaxed mb-3 flex-1">{project.excerpt}</p>
          <div className="flex items-center gap-3 text-xs text-gray-400">
            {project.location && (
              <span className="flex items-center gap-1"><MapPin size={11} />{project.location}</span>
            )}
            {project.power && (
              <span className="flex items-center gap-1"><Zap size={11} />{project.power}</span>
            )}
          </div>
          <div className="mt-3 text-brand text-xs font-semibold flex items-center gap-1">
            {t('learnMore')} <ArrowRight size={11} />
          </div>
        </div>
      </article>
    );
  }

  return (
    <article className="card group overflow-hidden flex flex-col relative cursor-pointer">
      <Link href={`/projects/${project.slug}`} className="absolute inset-0 z-0 rounded-2xl" aria-label={project.title} />
      <div className="relative overflow-hidden aspect-video bg-gray-100 pointer-events-none">
        <img
          src={project.featuredImage}
          alt={project.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute top-3 left-3">
          <span className={cn('inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border', categoryColors[project.category])}>
            {t(project.category as 'enterprise' | 'household' | 'community' | 'csr')}
          </span>
        </div>
      </div>
      <div className="p-5 flex flex-col flex-1 pointer-events-none relative">
        <h3 className="font-bold text-gray-900 text-sm mb-2 group-hover:text-brand transition-colors line-clamp-2">{project.title}</h3>
        <p className="text-xs text-gray-600 line-clamp-3 leading-relaxed mb-4 flex-1">{project.excerpt}</p>
        <div className="flex flex-wrap gap-3 text-xs text-gray-500 mb-3">
          {project.power && (
            <span className="flex items-center gap-1 bg-gray-50 px-2 py-0.5 rounded-full">
              <Zap size={11} className="text-brand" />{project.power}
            </span>
          )}
          {project.location && (
            <span className="flex items-center gap-1 bg-gray-50 px-2 py-0.5 rounded-full">
              <MapPin size={11} className="text-brand" />{project.location}
            </span>
          )}
          {project.year && (
            <span className="flex items-center gap-1 bg-gray-50 px-2 py-0.5 rounded-full">
              <Calendar size={11} className="text-brand" />{project.year}
            </span>
          )}
        </div>
        <div className="flex items-center gap-1 text-brand text-xs font-semibold pt-3 border-t border-gray-100">
          {t('viewDetails')} <ArrowRight size={12} />
        </div>
      </div>
    </article>
  );
}
