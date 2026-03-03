'use client';

import { useState } from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { MapPin, Zap, Calendar, Clock, ChevronLeft, ChevronRight as ChevronRightIcon } from 'lucide-react';
import ProjectCard from '@/components/sections/ProjectCard';
import SustainabilityBanner from '@/components/sections/SustainabilityBanner';
import { getProjectBySlug, getRelatedProjects, getPublishedProjects } from '@/lib/data/projects';
import { formatDate } from '@/lib/utils';

interface Props {
  params: { slug: string };
}

export default function ProjectDetailPage({ params }: Props) {
  const project = getProjectBySlug(params.slug);
  if (!project) notFound();

  const [activeImage, setActiveImage] = useState(0);
  const relatedProjects = getRelatedProjects(project.relatedSlugs || []).slice(0, 3);
  const fallback = getPublishedProjects().filter((p) => p.slug !== project.slug).slice(0, 3);
  const toShow = relatedProjects.length > 0 ? relatedProjects : fallback;

  const nextImage = () => setActiveImage((i) => (i + 1) % project.gallery.length);
  const prevImage = () => setActiveImage((i) => (i - 1 + project.gallery.length) % project.gallery.length);

  return (
    <div className="bg-white">
      {/* Image Gallery Slider */}
      <div className="relative bg-brand-dark overflow-hidden" style={{ minHeight: '400px' }}>
        <img
          src={project.gallery[activeImage] || project.featuredImage}
          alt={project.title}
          className="w-full object-cover"
          style={{ maxHeight: '520px', width: '100%' }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />

        {/* Navigation arrows */}
        {project.gallery.length > 1 && (
          <>
            <button
              onClick={prevImage}
              className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center hover:bg-white/40 transition-colors border border-white/30"
              aria-label="Ảnh trước"
            >
              <ChevronLeft size={20} className="text-white" />
            </button>
            <button
              onClick={nextImage}
              className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center hover:bg-white/40 transition-colors border border-white/30"
              aria-label="Ảnh tiếp"
            >
              <ChevronRightIcon size={20} className="text-white" />
            </button>
            {/* Dots */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
              {project.gallery.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setActiveImage(i)}
                  className={`w-2 h-2 rounded-full transition-all ${i === activeImage ? 'bg-white w-6' : 'bg-white/50'}`}
                />
              ))}
            </div>
          </>
        )}
      </div>

      {/* Content + Sidebar */}
      <section className="container-site py-12">
        <div className="grid lg:grid-cols-3 gap-10">
          {/* Article */}
          <div className="lg:col-span-2">
            <nav className="flex items-center gap-2 text-sm text-gray-500 mb-6">
              <Link href="/" className="hover:text-brand">Trang chủ</Link>
              <ChevronRightIcon size={14} />
              <Link href="/projects" className="hover:text-brand">Dự án</Link>
              <ChevronRightIcon size={14} />
              <span className="text-gray-900">{project.title}</span>
            </nav>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">{project.title}</h1>
            <div
              className="prose max-w-none"
              dangerouslySetInnerHTML={{ __html: project.content }}
            />
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 space-y-4">
              {/* Project Info */}
              <div className="bg-brand-surface rounded-2xl p-6 border border-brand/10">
                <h3 className="font-bold text-gray-900 mb-4 text-sm uppercase tracking-wider">Thông tin dự án</h3>
                <ul className="space-y-4">
                  {project.power && (
                    <li className="flex items-start gap-3">
                      <div className="w-9 h-9 rounded-xl bg-brand flex items-center justify-center shrink-0">
                        <Zap size={16} className="text-white" />
                      </div>
                      <div>
                        <p className="text-xs text-gray-500">Công suất lắp đặt</p>
                        <p className="font-bold text-gray-900">{project.power}</p>
                      </div>
                    </li>
                  )}
                  {project.installationDate && (
                    <li className="flex items-start gap-3">
                      <div className="w-9 h-9 rounded-xl bg-brand flex items-center justify-center shrink-0">
                        <Calendar size={16} className="text-white" />
                      </div>
                      <div>
                        <p className="text-xs text-gray-500">Ngày lắp đặt</p>
                        <p className="font-bold text-gray-900">{project.installationDate}</p>
                      </div>
                    </li>
                  )}
                  {project.year && (
                    <li className="flex items-start gap-3">
                      <div className="w-9 h-9 rounded-xl bg-brand flex items-center justify-center shrink-0">
                        <Clock size={16} className="text-white" />
                      </div>
                      <div>
                        <p className="text-xs text-gray-500">Năm thực hiện</p>
                        <p className="font-bold text-gray-900">{project.year}</p>
                      </div>
                    </li>
                  )}
                  {project.location && (
                    <li className="flex items-start gap-3">
                      <div className="w-9 h-9 rounded-xl bg-brand flex items-center justify-center shrink-0">
                        <MapPin size={16} className="text-white" />
                      </div>
                      <div>
                        <p className="text-xs text-gray-500">Địa chỉ</p>
                        <p className="font-bold text-gray-900 text-sm">{project.location}</p>
                      </div>
                    </li>
                  )}
                </ul>
              </div>

              {/* CTA */}
              <div className="bg-brand rounded-2xl p-6 text-white">
                <h3 className="font-bold mb-2">Quan tâm đến dự án?</h3>
                <p className="text-white/75 text-sm mb-4">Liên hệ để được tư vấn giải pháp phù hợp cho bạn.</p>
                <Link href="/contact" className="btn-white text-sm">
                  Liên hệ ngay
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Related Projects */}
      {toShow.length > 0 && (
        <section className="py-16 bg-gray-50">
          <div className="container-site">
            <div className="flex items-center justify-between mb-8 flex-wrap gap-4">
              <h2 className="text-2xl font-bold text-gray-900">Dự án liên quan</h2>
              <div className="flex gap-2">
                {['Tất cả', 'Category', 'Category', 'Category'].map((c, i) => (
                  <button
                    key={i}
                    className={`px-4 py-1.5 rounded-full text-xs font-medium border transition-colors ${
                      i === 0 ? 'bg-brand text-white border-brand' : 'border-gray-300 text-gray-600 hover:border-brand hover:text-brand'
                    }`}
                  >
                    {c}
                  </button>
                ))}
              </div>
            </div>
            <div className="grid sm:grid-cols-3 gap-6">
              {toShow.map((p) => (
                <ProjectCard key={p.id} project={p} />
              ))}
            </div>
          </div>
        </section>
      )}

      <SustainabilityBanner />
    </div>
  );
}
