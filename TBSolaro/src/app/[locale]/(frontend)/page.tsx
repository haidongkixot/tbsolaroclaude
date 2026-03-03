import { getTranslations } from 'next-intl/server';
import { ArrowRight, Zap, Shield, Star, Users, Sun } from 'lucide-react';
import { Link } from '@/i18n/navigation';
import SustainabilityBanner from '@/components/sections/SustainabilityBanner';
import ContactFormSection from '@/components/sections/ContactFormSection';
import ProductCard from '@/components/sections/ProductCard';
import { getFeaturedCombos } from '@/lib/data/products';
import { getPublishedPosts } from '@/lib/data/blog';

const certifications = ['IRES', 'GBC', 'IEC', 'Fronius', 'Huawei', 'Dropbox'];

const testimonials = [
  {
    name: 'Nguyễn Văn A',
    role: 'Chủ hộ gia đình',
    content: 'Hệ thống TBSolaro đã giúp tôi tiết kiệm 70% chi phí điện hàng tháng. Đội ngũ lắp đặt chuyên nghiệp, bảo hành chu đáo.',
    rating: 5,
    avatar: 'https://placehold.co/60x60/1B5E30/FFFFFF?text=NVA',
  },
  {
    name: 'Trần Thị B',
    role: 'Giám đốc sản xuất',
    content: 'Đầu tư hệ thống 200kWp cho nhà máy, ROI đạt được chỉ sau 5 năm. TBSolaro tư vấn rất tận tình và chuyên nghiệp.',
    rating: 5,
    avatar: 'https://placehold.co/60x60/236B3A/FFFFFF?text=TTB',
  },
  {
    name: 'Lê Văn C',
    role: 'Chủ trang trại',
    content: 'Sử dụng combo INV-BAT10 cho trang trại, điện luôn ổn định dù mùa mưa. Rất hài lòng với chất lượng sản phẩm.',
    rating: 5,
    avatar: 'https://placehold.co/60x60/3D9B5C/FFFFFF?text=LVC',
  },
];

const statIcons = [Sun, Zap, Users, Shield];

export default async function HomePage() {
  const t = await getTranslations('home');
  const tc = await getTranslations('common');

  const featuredCombos = getFeaturedCombos();
  const latestPosts = getPublishedPosts().slice(0, 3);

  const stats = [
    { value: '500+', labelKey: 'stat1Label' as const, Icon: Sun },
    { value: '10MW+', labelKey: 'stat2Label' as const, Icon: Zap },
    { value: '1000+', labelKey: 'stat3Label' as const, Icon: Users },
    { value: '25y', labelKey: 'stat4Label' as const, Icon: Shield },
  ];

  return (
    <>
      {/* Hero Section */}
      <section
        className="relative min-h-[600px] md:min-h-[700px] flex items-center overflow-hidden"
        style={{
          backgroundImage: `linear-gradient(135deg, rgba(19,67,31,0.90) 0%, rgba(27,94,48,0.75) 50%, rgba(0,0,0,0.4) 100%), url('https://placehold.co/1600x800/1B5E30/FFFFFF?text=Solar+Workers')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        {/* Decorative green grid overlay */}
        <div className="absolute inset-0 opacity-10" aria-hidden="true"
          style={{ backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.3) 1px, transparent 1px)', backgroundSize: '40px 40px' }}
        />
        <div className="container-site relative z-10 py-16">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 bg-white/15 text-white text-xs font-semibold px-4 py-2 rounded-full mb-6 backdrop-blur-sm border border-white/20">
              <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
              {t('heroBadge')}
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6">
              {t('heroTitle')}
            </h1>
            <p className="text-white/80 text-lg mb-8 leading-relaxed">
              {t('heroSubtitle')}
            </p>
            <div className="flex flex-wrap gap-4">
              <Link href="/projects" className="btn-white">
                {t('heroBtn1')} <ArrowRight size={16} />
              </Link>
              <Link href="/products" className="btn-outline-white">
                {t('heroBtn2')}
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Certifications */}
      <section className="py-10 bg-white border-b border-gray-100">
        <div className="container-site">
          <p className="text-center text-xs uppercase tracking-widest text-gray-400 font-semibold mb-6">{t('certTitle')}</p>
          <div className="flex flex-wrap items-center justify-center gap-8 md:gap-12">
            {certifications.map((cert) => (
              <div key={cert} className="px-4 py-2 bg-gray-50 rounded-lg text-gray-500 font-semibold text-sm hover:bg-brand-surface hover:text-brand transition-colors cursor-pointer">
                {cert}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CSR Highlight */}
      <section className="py-16 md:py-20">
        <div className="container-site">
          <div className="rounded-3xl overflow-hidden bg-brand grid md:grid-cols-2 gap-0">
            <div className="relative overflow-hidden">
              <img
                src="https://placehold.co/800x500/1B5E30/FFFFFF?text=Cuba+CSR+Project"
                alt="Dự án CSR Cuba"
                className="w-full h-full object-cover min-h-[300px]"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-transparent to-brand/30" />
            </div>
            <div className="p-8 md:p-12 flex flex-col justify-center">
              <span className="tag-badge !bg-white/20 !text-white !border-white/30 mb-4">{t('csrBadge')}</span>
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-4 leading-tight">
                {t('csrTitle')}
              </h2>
              <p className="text-white/75 mb-8 leading-relaxed">
                {t('csrDesc')}
              </p>
              <Link href="/community" className="btn-white self-start">
                {t('csrBtn')} <ArrowRight size={16} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Product Combos */}
      <section className="py-16 md:py-20 bg-gray-50">
        <div className="container-site">
          <div className="text-center mb-12">
            <h2 className="section-title">{t('productsTitle')}</h2>
            <p className="section-subtitle">{t('productsSubtitle')}</p>
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
      <section className="py-16 bg-brand">
        <div className="container-site">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-3">{t('statsTitle')}</h2>
            <p className="text-white/70 text-lg">{t('statsSubtitle')}</p>
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

      {/* Testimonials */}
      <section className="py-16 md:py-20">
        <div className="container-site">
          <div className="text-center mb-12">
            <h2 className="section-title">{t('testimonialTitle')}</h2>
            <p className="section-subtitle">{t('testimonialSubtitle')}</p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map((testimony) => (
              <div key={testimony.name} className="card p-6">
                <div className="flex items-center gap-1 mb-4">
                  {Array.from({ length: testimony.rating }).map((_, i) => (
                    <Star key={i} size={16} className="fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <p className="text-gray-700 text-sm leading-relaxed mb-5 italic">&ldquo;{testimony.content}&rdquo;</p>
                <div className="flex items-center gap-3 pt-4 border-t border-gray-100">
                  <img src={testimony.avatar} alt={testimony.name} className="w-10 h-10 rounded-full object-cover" />
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

      {/* Latest Blog */}
      {latestPosts.length > 0 && (
        <section className="py-16 md:py-20 bg-brand-surface">
          <div className="container-site">
            <div className="flex items-center justify-between mb-10">
              <div>
                <h2 className="section-title !mb-1">{t('blogTitle')}</h2>
                <p className="text-gray-500">{t('blogSubtitle')}</p>
              </div>
              <Link href="/blog" className="hidden md:flex items-center gap-1 text-brand font-semibold text-sm hover:gap-2 transition-all">
                {t('viewAllBlog')} <ArrowRight size={16} />
              </Link>
            </div>
            <div className="grid md:grid-cols-3 gap-6">
              {latestPosts.map((post) => (
                <article key={post.id} className="card group overflow-hidden flex flex-col relative cursor-pointer">
                  <Link href={`/blog/${post.slug}`} className="absolute inset-0 z-0 rounded-2xl" aria-label={post.title} />
                  <div className="relative overflow-hidden aspect-video bg-gray-100">
                    <img
                      src={post.featuredImage}
                      alt={post.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <div className="p-5 flex flex-col flex-1 relative z-10">
                    <div className="flex items-center gap-2 mb-3">
                      <span className="tag-badge">{post.tags[0] || t('defaultTag')}</span>
                      <span className="text-xs text-gray-400">{post.publishedAt}</span>
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
      <ContactFormSection source="homepage" />

      {/* Sustainability Banner */}
      <SustainabilityBanner />
    </>
  );
}
