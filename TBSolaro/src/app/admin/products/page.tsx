'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Plus, Edit, Eye, Trash2, Search, Filter, Package } from 'lucide-react';
import { getPublishedProducts } from '@/lib/data/products';
import type { Product } from '@/types';

export default function AdminProductsPage() {
  const initialProducts = getPublishedProducts();
  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [search, setSearch] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  const filtered = products.filter(
    (p) => search === '' || p.title.toLowerCase().includes(search.toLowerCase()) || p.category.toLowerCase().includes(search.toLowerCase())
  );

  const deleteProduct = (id: string) => {
    if (confirm('Bạn chắc chắn muốn xóa sản phẩm này?')) {
      setProducts((prev) => prev.filter((p) => p.id !== id));
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Sản phẩm</h2>
          <p className="text-gray-500 text-sm mt-1">{products.length} sản phẩm</p>
        </div>
        <button
          onClick={() => { setEditingProduct(null); setShowForm(true); }}
          className="btn-primary text-sm"
        >
          <Plus size={16} /> Thêm sản phẩm
        </button>
      </div>

      {/* Toolbar */}
      <div className="flex gap-4 mb-6 flex-wrap">
        <div className="relative flex-1 min-w-48">
          <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Tìm kiếm sản phẩm..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="input-field pl-10 py-2.5 text-sm"
          />
        </div>
        <button className="flex items-center gap-2 px-4 py-2.5 border border-gray-300 rounded-xl text-sm text-gray-600 hover:border-brand hover:text-brand transition-colors">
          <Filter size={15} /> Lọc
        </button>
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="text-left px-6 py-4 font-semibold text-gray-600">Sản phẩm</th>
              <th className="text-left px-4 py-4 font-semibold text-gray-600">Danh mục</th>
              <th className="text-left px-4 py-4 font-semibold text-gray-600">Tags</th>
              <th className="text-left px-4 py-4 font-semibold text-gray-600">Trạng thái</th>
              <th className="text-right px-6 py-4 font-semibold text-gray-600">Thao tác</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {filtered.map((product) => (
              <tr key={product.id} className="hover:bg-gray-50/50 transition-colors">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-10 rounded-lg overflow-hidden bg-gray-100 shrink-0">
                      <img src={product.featuredImage} alt={product.title} className="w-full h-full object-cover" />
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900 line-clamp-1">{product.title}</p>
                      {product.subtitle && <p className="text-xs text-gray-400">{product.subtitle}</p>}
                    </div>
                  </div>
                </td>
                <td className="px-4 py-4">
                  <span className="inline-flex px-2.5 py-0.5 rounded-full bg-blue-50 text-blue-700 text-xs font-medium">{product.category}</span>
                </td>
                <td className="px-4 py-4">
                  <div className="flex flex-wrap gap-1">
                    {product.tags.slice(0, 2).map((tag) => (
                      <span key={tag} className="text-xs text-gray-500 bg-gray-100 px-2 py-0.5 rounded-full">{tag}</span>
                    ))}
                  </div>
                </td>
                <td className="px-4 py-4">
                  <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium ${
                    product.status === 'published' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-600'
                  }`}>
                    <span className={`w-1.5 h-1.5 rounded-full ${product.status === 'published' ? 'bg-green-500' : 'bg-gray-400'}`} />
                    {product.status === 'published' ? 'Đã xuất bản' : 'Bản nháp'}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center justify-end gap-2">
                    <Link
                      href={`/products/${product.slug}`}
                      target="_blank"
                      className="p-2 text-gray-400 hover:text-brand hover:bg-brand-surface rounded-lg transition-colors"
                      title="Xem trang"
                    >
                      <Eye size={15} />
                    </Link>
                    <button
                      onClick={() => { setEditingProduct(product); setShowForm(true); }}
                      className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                      title="Chỉnh sửa"
                    >
                      <Edit size={15} />
                    </button>
                    <button
                      onClick={() => deleteProduct(product.id)}
                      className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                      title="Xóa"
                    >
                      <Trash2 size={15} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {filtered.length === 0 && (
          <div className="py-16 text-center text-gray-400">
            <Package size={40} className="mx-auto mb-3 opacity-30" />
            <p>Không tìm thấy sản phẩm nào</p>
          </div>
        )}
      </div>

      {/* Simple Modal Form */}
      {showForm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl w-full max-w-lg max-h-[85vh] overflow-y-auto">
            <div className="px-6 py-5 border-b border-gray-100 flex items-center justify-between">
              <h3 className="font-bold text-gray-900">{editingProduct ? 'Sửa sản phẩm' : 'Thêm sản phẩm mới'}</h3>
              <button onClick={() => setShowForm(false)} className="text-gray-400 hover:text-gray-600 text-xl font-bold leading-none">×</button>
            </div>
            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Tên sản phẩm *</label>
                <input className="input-field" defaultValue={editingProduct?.title || ''} placeholder="Tên sản phẩm" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Slug *</label>
                <input className="input-field" defaultValue={editingProduct?.slug || ''} placeholder="product-slug" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Danh mục</label>
                <select className="input-field bg-white" defaultValue={editingProduct?.category || 'combo'}>
                  <option value="combo">Combo</option>
                  <option value="panel">Tấm pin</option>
                  <option value="battery">Pin lưu trữ</option>
                  <option value="inverter">Biến tần</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Mô tả ngắn</label>
                <textarea rows={3} className="textarea-field" defaultValue={editingProduct?.excerpt || ''} placeholder="Mô tả ngắn gọn..." />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Trạng thái</label>
                <select className="input-field bg-white" defaultValue={editingProduct?.status || 'draft'}>
                  <option value="published">Đã xuất bản</option>
                  <option value="draft">Bản nháp</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Meta Title (SEO)</label>
                <input className="input-field" defaultValue={editingProduct?.seo?.metaTitle || ''} placeholder="Meta title..." />
              </div>
            </div>
            <div className="px-6 py-4 border-t border-gray-100 flex gap-3 justify-end">
              <button onClick={() => setShowForm(false)} className="btn-outline text-sm px-5 py-2.5">Hủy</button>
              <button onClick={() => setShowForm(false)} className="btn-primary text-sm px-5 py-2.5">
                {editingProduct ? 'Cập nhật' : 'Thêm mới'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
