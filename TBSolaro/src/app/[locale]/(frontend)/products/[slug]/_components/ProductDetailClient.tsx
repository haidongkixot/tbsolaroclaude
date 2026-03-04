'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { Download, MessageCircle, ChevronDown, ChevronRight } from 'lucide-react';
import ProductCard from '@/components/sections/ProductCard';

const tabKeys = ['tabDetails', 'tabPackaging', 'tabShipping'] as const;

interface Tier { name: string; label: string; isDefault?: boolean; items?: string[] }

interface Product {
  id: string; slug: string; title: string; subtitle?: string; excerpt: string;
  features: string[]; specs?: Record<string, string>; tiers: Tier[];
  gallery: string[]; featuredImage: string; downloadUrl?: string;
  category: string; tags: string[]; relatedSlugs?: string[];
  status?: 'draft' | 'published'; sortOrder?: number; seo?: Record<string, unknown>;
  createdAt?: Date | string; updatedAt?: Date | string;
}

interface Props {
  product: Product;
  related: Product[];
}

export default function ProductDetailClient({ product, related }: Props) {
  const t = useTranslations('products');
  const tc = useTranslations('common');
  const [activeTab, setActiveTab] = useState(0);
  const [activeTier, setActiveTier] = useState(product.tiers.findIndex((t) => t.isDefault) ?? 0);
  const [activeGallery, setActiveGallery] = useState(0);
  const [openAccordion, setOpenAccordion] = useState<string | null>(null);

  const gallery = product.gallery.length > 0 ? product.gallery : [product.featuredImage].filter(Boolean);

  return (
    <div className="bg-white">
      {/* Breadcrumb */}
      <div className="container-site py-4">
        <nav className="flex items-center gap-2 text-sm text-gray-500">
          <Link href="/" className="hover:text-brand transition-colors">{tc('home')}</Link>
          <ChevronRight size={14} />
          <Link href="/products" className="hover:text-brand transition-colors">{t('breadcrumb')}</Link>
          <ChevronRight size={14} />
          <span className="text-gray-900 font-medium">{product.title}</span>
        </nav>
      </div>

      {/* Product Main */}
      <section className="container-site pb-12">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-start">
          {/* Gallery */}
          <div>
            <div className="rounded-2xl overflow-hidden bg-gray-100 aspect-[4/3] mb-4">
              <img src={gallery[activeGallery]} alt={product.title} className="w-full h-full object-cover" />
            </div>
            {gallery.length > 1 && (
              <div className="flex gap-3">
                {gallery.map((img, i) => (
                  <button key={i} onClick={() => setActiveGallery(i)}
                    className={`w-20 h-16 rounded-lg overflow-hidden border-2 transition-colors ${activeGallery === i ? 'border-brand' : 'border-gray-200'}`}>
                    <img src={img} alt={`Ảnh ${i + 1}`} className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Info */}
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-1">{product.title}</h1>
            {product.subtitle && <p className="text-brand font-semibold mb-3">{product.subtitle}</p>}
            <p className="text-gray-500 text-sm font-medium mb-5 italic">{t('priceLabel')}</p>
            <ul className="space-y-2 mb-6">
              {product.features.map((f, i) => (
                <li key={i} className="flex items-start gap-2.5 text-sm text-gray-700">
                  <span className="mt-1.5 w-2 h-2 rounded-full bg-brand shrink-0" /> {f}
                </li>
              ))}
            </ul>

            {product.tiers.length > 1 && (
              <div className="mb-6">
                <p className="text-sm font-semibold text-gray-700 mb-3">Gói combo</p>
                <div className="flex gap-3">
                  {product.tiers.map((tier, i) => (
                    <button key={tier.name} onClick={() => setActiveTier(i)}
                      className={`flex-1 py-2.5 rounded-xl text-sm font-semibold border-2 transition-all ${activeTier === i ? 'border-brand bg-brand text-white' : 'border-gray-300 text-gray-700 hover:border-brand/50'}`}>
                      {tier.label}
                    </button>
                  ))}
                </div>
                {product.tiers[activeTier]?.items && (
                  <ul className="mt-3 space-y-1.5 pl-2">
                    {product.tiers[activeTier].items!.map((item, i) => (
                      <li key={i} className="text-xs text-gray-600 flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-brand-accent shrink-0" /> {item}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            )}

            <div className="flex gap-3">
              {product.downloadUrl && (
                <a href={product.downloadUrl}
                  className="flex items-center gap-2 text-sm text-brand font-medium py-2 border-b border-brand/30 hover:border-brand transition-colors">
                  <Download size={15} /> {t('downloadBtn')}
                </a>
              )}
            </div>
            <div className="flex gap-3 mt-4">
              <Link href="/contact" className="btn-primary flex-1 justify-center">
                <MessageCircle size={16} /> {t('contactBtn')}
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Tabs */}
      <section className="border-t border-gray-100">
        <div className="container-site">
          <div className="flex gap-0 border-b border-gray-200">
            {tabKeys.map((tabKey, i) => (
              <button key={tabKey} onClick={() => setActiveTab(i)}
                className={`px-6 py-4 text-sm font-semibold border-b-2 transition-colors ${activeTab === i ? 'border-brand text-brand' : 'border-transparent text-gray-500 hover:text-gray-700'}`}>
                {t(tabKey)}
              </button>
            ))}
          </div>
          <div className="py-8">
            {activeTab === 0 && product.specs && Object.keys(product.specs).length > 0 && (
              <table className="w-full text-sm border border-gray-200 rounded-xl overflow-hidden">
                <tbody>
                  {Object.entries(product.specs).map(([key, val], i) => (
                    <tr key={key} className={i % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
                      <td className="px-5 py-3 font-medium text-gray-700 w-1/2 border-b border-gray-100">{key}</td>
                      <td className="px-5 py-3 text-gray-600 border-b border-gray-100">{val}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
            {activeTab === 1 && <p className="text-sm text-gray-700">Thông tin đóng gói sẽ được cập nhật.</p>}
            {activeTab === 2 && <p className="text-sm text-gray-700">Dịch vụ vận chuyển và giao hàng toàn quốc.</p>}
          </div>
        </div>
      </section>

      {/* Accordion */}
      {product.features.length > 0 && (
        <section className="border-t border-gray-100">
          <div className="container-site py-6">
            <div className="space-y-3 max-w-3xl">
              <div className="accordion-item">
                <button onClick={() => setOpenAccordion(openAccordion === 'features' ? null : 'features')}
                  className="w-full flex items-center justify-between px-6 py-4 text-left hover:bg-gray-50 transition-colors">
                  <span className="font-semibold text-gray-800 text-sm tracking-wide">KEY FEATURES</span>
                  <ChevronDown size={18} className={`text-gray-400 transition-transform duration-200 ${openAccordion === 'features' ? 'rotate-180' : ''}`} />
                </button>
                {openAccordion === 'features' && (
                  <div className="px-6 pb-5 space-y-1">
                    {product.features.map((f, i) => (
                      <p key={i} className="text-sm text-gray-600">• {f}</p>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Related */}
      {related.length > 0 && (
        <section className="py-16 bg-gray-50">
          <div className="container-site">
            <h2 className="text-2xl font-bold text-gray-900 mb-8">{t('relatedTitle')}</h2>
            <div className="grid sm:grid-cols-3 gap-6">
              {related.map((p) => <ProductCard key={p.id} product={p} variant="compact" />)}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
