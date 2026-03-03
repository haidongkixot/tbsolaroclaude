'use client';

import { useTranslations } from 'next-intl';
import { notFound } from 'next/navigation';
import { Link } from '@/i18n/navigation';
import { Calendar, User, Tag, ArrowRight, ChevronRight } from 'lucide-react';
import SustainabilityBanner from '@/components/sections/SustainabilityBanner';
import ContactFormSection from '@/components/sections/ContactFormSection';
import { getBlogPostBySlug, getRelatedPosts, getPublishedPosts } from '@/lib/data/blog';
import { formatDate } from '@/lib/utils';

interface Props {
  params: { slug: string };
}

export default function BlogPostPage({ params }: Props) {
  const t = useTranslations('blog');
  const tc = useTranslations('common');
  const post = getBlogPostBySlug(params.slug);
  if (!post) notFound();

  const related = getRelatedPosts(post.relatedSlugs || []).slice(0, 3);
  const fallback = getPublishedPosts().filter((p) => p.slug !== post.slug).slice(0, 3);
  const toShow = related.length > 0 ? related : fallback;

  return (
    <div className="bg-white">
      {/* Hero */}
      <div
        className="relative min-h-[400px] md:min-h-[500px] flex items-end pb-12 overflow-hidden"
        style={{
          backgroundImage: `linear-gradient(to bottom, rgba(0,0,0,0.2) 0%, rgba(19,67,31,0.85) 100%), url('${post.featuredImage}')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="container-site relative z-10">
          <nav className="flex items-center gap-2 text-sm text-white/70 mb-5">
            <Link href="/" className="hover:text-white">{tc('home')}</Link>
            <ChevronRight size={14} />
            <Link href="/blog" className="hover:text-white">{t('breadcrumb')}</Link>
            <ChevronRight size={14} />
            <span className="text-white/90 line-clamp-1">{post.title}</span>
          </nav>
          <div className="max-w-2xl">
            <div className="flex flex-wrap items-center gap-3 mb-4">
              {post.tags.map((tag) => (
                <span key={tag} className="inline-flex items-center gap-1 bg-white/15 text-white text-xs font-medium px-3 py-1 rounded-full border border-white/20">
                  <Tag size={10} /> {tag}
                </span>
              ))}
            </div>
            <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white leading-tight mb-4">
              {post.title}
            </h1>
            <div className="flex flex-wrap items-center gap-4 text-white/70 text-sm">
              <span className="flex items-center gap-1.5"><User size={13} /> {post.author}</span>
              <span className="flex items-center gap-1.5"><Calendar size={13} /> {post.publishedAt}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Article content */}
      <section className="py-12">
        <div className="container-site">
          <div className="max-w-3xl mx-auto">
            {/* Image gallery */}
            {post.gallery && post.gallery.length > 0 && (
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-8">
                {post.gallery.map((img, i) => (
                  <div key={i} className="rounded-xl overflow-hidden aspect-video bg-gray-100">
                    <img src={img} alt={`Ảnh ${i + 1}`} className="w-full h-full object-cover" />
                  </div>
                ))}
              </div>
            )}

            <div className="prose max-w-none" dangerouslySetInnerHTML={{ __html: post.content }} />

            {/* Tags */}
            <div className="mt-8 pt-6 border-t border-gray-100 flex flex-wrap gap-2">
              {post.tags.map((tag) => (
                <span key={tag} className="tag-badge">{tag}</span>
              ))}
            </div>

            {/* Author info */}
            <div className="mt-8 p-5 bg-brand-surface rounded-2xl border border-brand/10 flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-brand flex items-center justify-center shrink-0 text-white font-bold">
                {post.author.charAt(0)}
              </div>
              <div>
                <p className="font-semibold text-gray-900 text-sm">{post.author}</p>
                <p className="text-gray-500 text-xs">{t('publishedAt')} {post.publishedAt}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Related Posts */}
      {toShow.length > 0 && (
        <section className="py-12 bg-gray-50">
          <div className="container-site">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-2xl font-bold text-gray-900">{t('relatedTitle')}</h2>
              <div className="flex gap-2">
                {[t('latest'), t('popular'), t('related')].map((f, i) => (
                  <button key={f} className={`px-3 py-1 rounded-full text-xs font-medium border transition-colors ${i === 0 ? 'bg-brand text-white border-brand' : 'border-gray-300 text-gray-600 hover:border-brand hover:text-brand'}`}>
                    {f}
                  </button>
                ))}
              </div>
            </div>
            <div className="grid md:grid-cols-3 gap-6">
              {toShow.map((p) => (
                <Link key={p.id} href={`/blog/${p.slug}`} className="card group overflow-hidden flex flex-col">
                  <div className="relative overflow-hidden aspect-video bg-gray-100">
                    <img src={p.featuredImage} alt={p.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                  </div>
                  <div className="p-5 flex flex-col flex-1">
                    <div className="flex items-center gap-2 mb-3">
                      <span className="tag-badge">{p.tags[0]}</span>
                      <span className="text-xs text-gray-400">{p.publishedAt}</span>
                    </div>
                    <h3 className="font-bold text-gray-900 text-sm mb-2 group-hover:text-brand transition-colors line-clamp-2">{p.title}</h3>
                    <p className="text-xs text-gray-600 line-clamp-2 flex-1">{p.excerpt}</p>
                    <div className="mt-3 text-brand text-xs font-semibold flex items-center gap-1">{tc('readMore')} <ArrowRight size={11} /></div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Contact Form */}
      <ContactFormSection source="blog_page" />

      {/* Sustainability Banner */}
      <SustainabilityBanner />
    </div>
  );
}
