import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { Link } from '@/i18n/navigation';
import { Calendar, User, Tag, ArrowRight, ChevronRight } from 'lucide-react';
import SustainabilityBanner from '@/components/sections/SustainabilityBanner';
import ContactFormSection from '@/components/sections/ContactFormSection';
import { getPostBySlug, getRelatedPosts, getPublishedPosts } from '@/lib/db/blog';

interface Props {
  params: Promise<{ locale: string; slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, slug } = await params;
  const post = await getPostBySlug(slug, locale);
  if (!post) return {};
  const url = `https://tbsolaro.com${locale === 'vi' ? '' : `/${locale}`}/blog/${post.slug}`;
  return {
    title: post.title,
    description: post.excerpt,
    alternates: {
      canonical: url,
      languages: {
        vi: `https://tbsolaro.com/blog/${post.slugVi}`,
        en: `https://tbsolaro.com/en/blog/${post.slugEn}`,
        es: `https://tbsolaro.com/es/blog/${post.slugEs}`,
      },
    },
    openGraph: {
      title: post.title, description: post.excerpt, url, type: 'article',
      images: post.featuredImage ? [{ url: post.featuredImage, width: 1200, height: 630 }] : [],
      publishedTime: post.publishedAt ? new Date(post.publishedAt).toISOString() : undefined,
      authors: [post.author],
    },
    twitter: { card: 'summary_large_image', title: post.title, description: post.excerpt, images: post.featuredImage ? [post.featuredImage] : [] },
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { locale, slug } = await params;
  const t = await getTranslations('blog');
  const tc = await getTranslations('common');

  const [post, allPosts] = await Promise.all([
    getPostBySlug(slug, locale),
    getPublishedPosts(locale),
  ]);
  if (!post) notFound();

  const relatedRaw = await getRelatedPosts(post.relatedSlugs || [], locale);
  const toShow = relatedRaw.length > 0 ? relatedRaw : allPosts.filter((p) => p.slug !== slug).slice(0, 3);

  const publishedDate = post.publishedAt ? new Date(post.publishedAt).toLocaleDateString('vi-VN') : '';

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
              {post.tags.map((tag: string) => (
                <span key={tag} className="inline-flex items-center gap-1 bg-white/15 text-white text-xs font-medium px-3 py-1 rounded-full border border-white/20">
                  <Tag size={10} /> {tag}
                </span>
              ))}
            </div>
            <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white leading-tight mb-4">{post.title}</h1>
            <div className="flex flex-wrap items-center gap-4 text-white/70 text-sm">
              <span className="flex items-center gap-1.5"><User size={13} /> {post.author}</span>
              {publishedDate && <span className="flex items-center gap-1.5"><Calendar size={13} /> {publishedDate}</span>}
            </div>
          </div>
        </div>
      </div>

      {/* Article */}
      <section className="py-12">
        <div className="container-site">
          <div className="max-w-3xl mx-auto">
            {post.gallery && post.gallery.length > 0 && (
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-8">
                {post.gallery.map((img: string, i: number) => (
                  <div key={i} className="rounded-xl overflow-hidden aspect-video bg-gray-100">
                    <img src={img} alt={`Ảnh ${i + 1}`} className="w-full h-full object-cover" />
                  </div>
                ))}
              </div>
            )}
            <div className="prose max-w-none" dangerouslySetInnerHTML={{ __html: post.content }} />
            <div className="mt-8 pt-6 border-t border-gray-100 flex flex-wrap gap-2">
              {post.tags.map((tag: string) => (
                <span key={tag} className="tag-badge">{tag}</span>
              ))}
            </div>
            <div className="mt-8 p-5 bg-brand-surface rounded-2xl border border-brand/10 flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-brand flex items-center justify-center shrink-0 text-white font-bold">
                {post.author.charAt(0)}
              </div>
              <div>
                <p className="font-semibold text-gray-900 text-sm">{post.author}</p>
                {publishedDate && <p className="text-gray-500 text-xs">{t('publishedAt')} {publishedDate}</p>}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Related Posts */}
      {toShow.length > 0 && (
        <section className="py-12 bg-gray-50">
          <div className="container-site">
            <h2 className="text-2xl font-bold text-gray-900 mb-8">{t('relatedTitle')}</h2>
            <div className="grid md:grid-cols-3 gap-6">
              {toShow.map((p) => (
                <Link key={p.id} href={`/blog/${p.slug}`} className="card group overflow-hidden flex flex-col">
                  <div className="relative overflow-hidden aspect-video bg-gray-100">
                    <img src={p.featuredImage} alt={p.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                  </div>
                  <div className="p-5 flex flex-col flex-1">
                    <div className="flex items-center gap-2 mb-3">
                      <span className="tag-badge">{p.tags[0]}</span>
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

      <ContactFormSection source="blog_page" />
      <SustainabilityBanner />
    </div>
  );
}
