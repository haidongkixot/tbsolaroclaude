import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { buildMetadata } from '@/lib/seo';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  return buildMetadata('home', locale);
}
import { ArrowRight, Zap, Shield, Star, Users, Sun } from 'lucide-react';
import { Link } from '@/i18n/navigation';
import SustainabilityBanner from '@/components/sections/SustainabilityBanner';
import HeroSlider from '@/components/sections/HeroSlider';
import ContactFormSection from '@/components/sections/ContactFormSection';
import ProductCard from '@/components/sections/ProductCard';
import { getFeaturedCombos } from '@/lib/db/products';
import { getPublishedPosts } from '@/lib/db/blog';
import { getPublishedTestimonials } from '@/lib/db/testimonials';
import { getSiteSettings, st } from '@/lib/db/settings';

const certifications = ['IRES', 'GBC', 'IEC', 'Fronius', 'Huawei', 'Dropbox'];

const statIcons = [Sun, Zap, Users, Shield];

export default async function HomePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations('home');
  const tc = await getTranslations('common');

  const [featuredCombos, allPosts, testimonials, settings] = await Promise.all([
    getFeaturedCombos(locale),
    getPublishedPosts(locale),
    getPublishedTestimonials(locale),
    getSiteSettings(),
  ]);
  const latestPosts = allPosts.slice(0, 3);

  const stats = [
    { value: '500+', labelKey: 'stat1Label' as const, Icon: Sun },
    { value: '10MW+', labelKey: 'stat2Label' as const, Icon: Zap },
    { value: '1000+', labelKey: 'stat3Label' as const, Icon: Users },
    { value: '25y', labelKey: 'stat4Label' as const, Icon: Shield },
  ];

  return (
    <>
      {/* Hero Slider */}
      <HeroSlider
        slides={settings.heroSlides}
        locale={locale}
        badge={
          (locale === 'en' ? settings.heroBadgeEn : locale === 'es' ? settings.heroBadgeEs : settings.heroBadgeVi)
          || t('heroBadge')
        }
        btn1={t('heroBtn1')}
        btn2={t('heroBtn2')}
      />

      {/* Certifications — toggled by Admin › Cài đặt › Hiển thị các khối nội dung */}
      {settings.showCertifications && (
        <section className="py-10 bg-white border-b border-gray-100">
          <div className="container-site">
            <p className="text-center text-xs uppercase tracking-widest text-gray-400 font-semibold mb-6">{st(settings.sectionTitles, 'home', 'certTitle', locale) || t('certTitle')}</p>
            <div className="flex flex-wrap items-center justify-center gap-8 md:gap-12">
              {certifications.map((cert) => (
                <div key={cert} className="px-4 py-2 bg-gray-50 rounded-lg text-gray-500 font-semibold text-sm hover:bg-brand-surface hover:text-brand transition-colors cursor-pointer">
                  {cert}
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Featured Product Combos */}
      <section
        className="py-16 md:py-20 bg-gray-50"
        style={settings.productsSectionBg ? { backgroundImage: `linear-gradient(rgba(255,255,255,0.92), rgba(255,255,255,0.92)), url('${settings.productsSectionBg}')`, backgroundSize: 'cover', backgroundPosition: 'center' } : undefined}
      >
        <div className="container-site">
          <div className="text-center mb-12">
            <h2 className="section-title">{st(settings.sectionTitles, 'home', 'productsTitle', locale) || t('productsTitle')}</h2>
            <p className="section-subtitle">{st(settings.sectionTitles, 'home', 'productsSubtitle', locale) || t('productsSubtitle')}</p>
          </div>
          <div className="grid md:grid-cols-3 gap-6 mb-8">
            {featuredCombos.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
          <div className="text-center">
            <Link href="/products" className="btn-primary">
              {t('viewAllProducts')} <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section
        className="py-16 bg-brand"
        style={settings.statsSectionBg ? { backgroundImage: `linear-gradient(rgba(19,67,31,0.88), rgba(19,67,31,0.88)), url('${settings.statsSectionBg}')`, backgroundSize: 'cover', backgroundPosition: 'center' } : undefined}
      >
        <div className="container-site">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-3">{st(settings.sectionTitles, 'home', 'statsTitle', locale) || t('statsTitle')}</h2>
            <p className="text-white/70 text-lg">{st(settings.sectionTitles, 'home', 'statsSubtitle', locale) || t('statsSubtitle')}</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map(({ value, labelKey, Icon }) => (
              <div key={labelKey} className="text-center bg-white/10 rounded-2xl p-6 backdrop-blur-sm border border-white/20">
                <div className="flex justify-center mb-3">
                  <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center">
                    <Icon size={24} className="text-white" />
                  </div>
                </div>
                <div className="text-3xl md:text-4xl font-bold text-white mb-1">{value}</div>
                <div className="text-white/70 text-sm">{t(labelKey)}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials — nội dung quản lý tại Admin › Đánh giá KH */}
      {testimonials.length > 0 && (
        <section
          className="py-16 md:py-20"
          style={settings.testimonialsSectionBg ? { backgroundImage: `linear-gradient(rgba(255,255,255,0.94), rgba(255,255,255,0.94)), url('${settings.testimonialsSectionBg}')`, backgroundSize: 'cover', backgroundPosition: 'center' } : undefined}
        >
          <div className="container-site">
            <div className="text-center mb-12">
              <h2 className="section-title">{st(settings.sectionTitles, 'home', 'testimonialTitle', locale) || t('testimonialTitle')}</h2>
              <p className="section-subtitle">{st(settings.sectionTitles, 'home', 'testimonialSubtitle', locale) || t('testimonialSubtitle')}</p>
            </div>
            <div className="grid md:grid-cols-3 gap-6">
              {testimonials.map((testimony) => (
                <div key={testimony.id} className="card p-6">
                  <div className="flex items-center gap-1 mb-4">
                    {Array.from({ length: testimony.rating }).map((_, i) => (
                      <Star key={i} size={16} className="fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                  <p className="text-gray-700 text-sm leading-relaxed mb-5 italic">&ldquo;{testimony.content}&rdquo;</p>
                  <div className="flex items-center gap-3 pt-4 border-t border-gray-100">
                    {testimony.avatar ? (
                      <img src={testimony.avatar} alt={testimony.name} className="w-10 h-10 rounded-full object-cover" />
                    ) : (
                      <div className="w-10 h-10 rounded-full bg-brand flex items-center justify-center text-white text-sm font-bold shrink-0">
                        {testimony.name.charAt(0)}
                      </div>
                    )}
                    <div>
                      <div className="font-semibold text-gray-900 text-sm">{testimony.name}</div>
                      <div className="text-xs text-gray-500">{testimony.role}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Latest Blog */}
      {latestPosts.length > 0 && (
        <section
          className="py-16 md:py-20 bg-brand-surface"
          style={settings.newsSectionBg ? { backgroundImage: `linear-gradient(rgba(240,249,244,0.93), rgba(240,249,244,0.93)), url('${settings.newsSectionBg}')`, backgroundSize: 'cover', backgroundPosition: 'center' } : undefined}
        >
          <div className="container-site">
            <div className="flex items-center justify-between mb-10">
              <div>
                <h2 className="section-title !mb-1">{st(settings.sectionTitles, 'home', 'blogTitle', locale) || t('blogTitle')}</h2>
                <p className="text-gray-500">{st(settings.sectionTitles, 'home', 'blogSubtitle', locale) || t('blogSubtitle')}</p>
              </div>
              <Link href="/blog" className="hidden md:flex items-center gap-1 text-brand font-semibold text-sm hover:gap-2 transition-all">
                {t('viewAllBlog')} <ArrowRight size={16} />
              </Link>
            </div>
            <div className="grid md:grid-cols-3 gap-6">
              {latestPosts.map((post) => (
                <article key={post.id} className="card group overflow-hidden flex flex-col relative cursor-pointer">
                  <Link href={`/blog/${post.slug}`} className="absolute inset-0 z-0 rounded-2xl" aria-label={post.title} />
                  <div className="relative overflow-hidden aspect-video bg-gray-100 pointer-events-none">
                    <img
                      src={post.featuredImage}
                      alt={post.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <div className="p-5 flex flex-col flex-1 pointer-events-none relative">
                    <div className="flex items-center gap-2 mb-3">
                      <span className="tag-badge">{post.tags[0] || t('defaultTag')}</span>
                      <span className="text-xs text-gray-400">{post.publishedAt ? new Date(post.publishedAt).toLocaleDateString() : ''}</span>
                    </div>
                    <h3 className="font-bold text-gray-900 text-sm mb-2 group-hover:text-brand transition-colors line-clamp-2">{post.title}</h3>
                    <p className="text-xs text-gray-600 line-clamp-2 leading-relaxed flex-1">{post.excerpt}</p>
                    <div className="mt-3 text-brand text-xs font-semibold flex items-center gap-1">
                      {tc('readMore')} <ArrowRight size={11} />
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Contact Form */}
      <ContactFormSection source="homepage" backgroundImage={settings.contactSectionBg || undefined} />

      {/* Sustainability Banner */}
      <SustainabilityBanner backgroundImage={settings.sustainabilityBgImage || undefined} />
    </>
  );
}
