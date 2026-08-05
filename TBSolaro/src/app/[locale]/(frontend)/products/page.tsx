import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { buildMetadata } from '@/lib/seo';
import PageHero from '@/components/sections/PageHero';
import ProductCard from '@/components/sections/ProductCard';
import ContactFormSection from '@/components/sections/ContactFormSection';
import ProductFilterGrid from './_components/ProductFilterGrid';
import { getPublishedProducts, getFeaturedCombos } from '@/lib/db/products';
import { getSiteSettings, st } from '@/lib/db/settings';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  return buildMetadata('products', locale);
}

// Category keys must match Product.category in the admin editor (combo | panel | battery | inverter)
const PRODUCT_CATEGORIES = [
  { key: 'all', labelKey: 'filterAll' },
  { key: 'combo', labelKey: 'filterCombo' },
  { key: 'panel', labelKey: 'filterPanel' },
  { key: 'battery', labelKey: 'filterBattery' },
  { key: 'inverter', labelKey: 'filterInverter' },
] as const;

/** Category pre-selected when the page first loads. */
const DEFAULT_PRODUCT_CATEGORY = 'panel';

export default async function ProductsPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations('products');
  const [allProducts, featuredCombos, settings] = await Promise.all([
    getPublishedProducts(locale),
    getFeaturedCombos(locale),
    getSiteSettings(),
  ]);

  return (
    <>
      <PageHero
        title={t('heroTitle')}
        subtitle={t('heroSubtitle')}
        backgroundImage={settings.productsHeroImage || 'https://placehold.co/1600x500/1B5E30/FFFFFF?text=Solar+Panels'}
        size="md"
      />

      {/* Featured Combo */}
      {featuredCombos.length > 0 && (
        <section className="py-16 md:py-20">
          <div className="container-site">
            <div className="text-center mb-10">
              <h2 className="section-title">{st(settings.sectionTitles, 'products', 'featuredTitle', locale) || t('featuredTitle')}</h2>
              <p className="section-subtitle">{st(settings.sectionTitles, 'products', 'featuredSubtitle', locale) || t('featuredSubtitle')}</p>
            </div>
            <div className="space-y-6">
              {featuredCombos.slice(0, 1).map((product) => (
                <ProductCard key={product.id} product={product} variant="featured" />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Filter + All Products */}
      <section className="py-8 pb-16 md:pb-20 bg-gray-50">
        <div className="container-site">
          <ProductFilterGrid
            title={st(settings.sectionTitles, 'products', 'allTitle', locale) || t('allTitle')}
            products={allProducts}
            categories={PRODUCT_CATEGORIES.map(({ key, labelKey }) => ({ key, label: t(labelKey) }))}
            defaultCategory={DEFAULT_PRODUCT_CATEGORY}
            emptyMessage={t('noProductsMsg')}
          />
        </div>
      </section>

      {/* Contact */}
      <ContactFormSection
        title={t('contactTitle')}
        subtitle={t('contactSubtitle')}
        source="products_page"
      />
    </>
  );
}
