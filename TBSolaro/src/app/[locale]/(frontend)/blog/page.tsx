import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { ArrowRight, Calendar, User } from 'lucide-react';
import { Link } from '@/i18n/navigation';
import { buildMetadata } from '@/lib/seo';
import PageHero from '@/components/sections/PageHero';
import ContactFormSection from '@/components/sections/ContactFormSection';
import { getPublishedPosts } from '@/lib/db/blog';
import { getSiteSettings } from '@/lib/db/settings';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  return buildMetadata('blog', locale);
}

export default async function BlogPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations('blog');
  const tc = await getTranslations('common');

  const [posts, settings] = await Promise.all([
    getPublishedPosts(locale),
    getSiteSettings(),
  ]);

  return (
    <>
      <PageHero
        title={t('heroTitle')}
        subtitle={t('heroSubtitle')}
        backgroundImage={settings.projectsHeroImage || 'https://placehold.co/1600x500/1B5E30/FFFFFF?text=News+Media'}
        size="md"
      />

      <section className="py-16 md:py-20 bg-gray-50">
        <div className="container-site">
          <h2 className="text-2xl font-bold text-gray-900 mb-10">{t('allTitle')}</h2>

          {posts.length === 0 ? (
            <p className="text-gray-500 text-center py-16">{t('noPostsMsg')}</p>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {posts.map((post) => (
                <article key={post.id} className="card group overflow-hidden flex flex-col relative cursor-pointer">
                  <Link href={`/blog/${post.slug}`} className="absolute inset-0 z-0 rounded-2xl" aria-label={post.title} prefetch={false} />
                  <div className="relative overflow-hidden aspect-video bg-gray-100 pointer-events-none">
                    <img
                      src={post.featuredImage || 'https://placehold.co/800x450/1B5E30/FFFFFF?text=TBSolaro'}
                      alt={post.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    {post.tags[0] && (
                      <div className="absolute top-3 left-3">
                        <span className="tag-badge text-xs">{post.tags[0]}</span>
                      </div>
                    )}
                  </div>
                  <div className="p-5 flex flex-col flex-1 pointer-events-none relative">
                    <div className="flex items-center gap-3 text-xs text-gray-400 mb-3">
                      {post.publishedAt && (
                        <span className="flex items-center gap-1">
                          <Calendar size={11} />
                          {new Date(post.publishedAt).toLocaleDateString()}
                        </span>
                      )}
                      <span className="flex items-center gap-1">
                        <User size={11} /> {post.author}
                      </span>
                    </div>
                    <h3 className="font-bold text-gray-900 text-base mb-2 group-hover:text-brand transition-colors line-clamp-2">
                      {post.title}
                    </h3>
                    <p className="text-sm text-gray-600 line-clamp-2 leading-relaxed flex-1">{post.excerpt}</p>
                    <div className="mt-4 text-brand text-sm font-semibold flex items-center gap-1">
                      {tc('readMore')} <ArrowRight size={14} />
                    </div>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </section>

      <ContactFormSection source="blog_listing" />
    </>
  );
}
