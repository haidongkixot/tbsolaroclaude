import type { Metadata } from 'next';
import PageHero from '@/components/sections/PageHero';
import ProductCard from '@/components/sections/ProductCard';
import ContactFormSection from '@/components/sections/ContactFormSection';
import { getPublishedProducts, getFeaturedCombos } from '@/lib/data/products';

export const metadata: Metadata = {
  title: 'Sản Phẩm',
  description: 'Khám phá danh mục sản phẩm và combo năng lượng mặt trời của TBSolaro. Giải pháp phù hợp với mọi nhu cầu.',
};

export default function ProductsPage() {
  const allProducts = getPublishedProducts();
  const featuredCombos = getFeaturedCombos();
  const combos = allProducts.filter((p) => p.category === 'combo');
  const others = allProducts.filter((p) => p.category !== 'combo');

  return (
    <>
      <PageHero
        title="Sản phẩm"
        subtitle="Danh mục combo và sản phẩm năng lượng mặt trời chất lượng cao từ TBSolaro"
        backgroundImage="https://placehold.co/1600x500/1B5E30/FFFFFF?text=Solar+Panels"
        size="md"
      />

      {/* Featured Combo */}
      {featuredCombos.length > 0 && (
        <section className="py-16 md:py-20">
          <div className="container-site">
            <div className="text-center mb-10">
              <h2 className="section-title">Combo sản phẩm</h2>
              <p className="section-subtitle">Bộ giải pháp năng lượng mặt trời trọn gói, được tối ưu hóa cho từng nhu cầu</p>
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
          <div className="flex items-center justify-between mb-8 flex-wrap gap-4">
            <h2 className="text-2xl font-bold text-gray-900">Tất cả sản phẩm</h2>
            <div className="flex flex-wrap gap-2">
              {['Tất cả', 'Combo', 'Tấm pin', 'Pin lưu trữ', 'Biến tần'].map((cat) => (
                <button
                  key={cat}
                  className="px-4 py-1.5 rounded-full text-sm font-medium border border-gray-300 text-gray-600 hover:border-brand hover:text-brand transition-colors"
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {allProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* Contact */}
      <ContactFormSection
        title="Liên hệ với chúng tôi"
        subtitle="Chúng tôi sẵn sàng tư vấn và báo giá miễn phí cho bạn"
        source="products_page"
      />
    </>
  );
}
