'use client';

import { useState, useEffect, useCallback } from 'react';
import { Plus, Edit, Trash2, GripVertical, Loader2, Star } from 'lucide-react';
import LanguageTabs, { type Locale } from '@/components/admin/LanguageTabs';
import ImageUpload from '@/components/admin/ImageUpload';

interface Testimonial {
  id: string;
  name: string;
  roleVi: string; roleEn: string; roleEs: string;
  contentVi: string; contentEn: string; contentEs: string;
  avatar: string;
  rating: number;
  sortOrder: number;
  status: string;
}

type FormState = Omit<Testimonial, 'id'>;

const EMPTY: FormState = {
  name: '',
  roleVi: '', roleEn: '', roleEs: '',
  contentVi: '', contentEn: '', contentEs: '',
  avatar: '', rating: 5, sortOrder: 0, status: 'published',
};

export default function AdminTestimonialsPage() {
  const [items, setItems] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState<FormState>(EMPTY);
  const [lang, setLang] = useState<Locale>('vi');

  const load = useCallback(async () => {
    setLoading(true);
    const res = await fetch('/api/admin/testimonials');
    const data = await res.json();
    setItems(data.items ?? []);
    setLoading(false);
  }, []);

  useEffect(() => { load(); }, [load]);

  const openNew = () => { setEditingId(null); setForm(EMPTY); setLang('vi'); setShowForm(true); };
  const openEdit = (t: Testimonial) => {
    setEditingId(t.id);
    setForm({
      name: t.name,
      roleVi: t.roleVi, roleEn: t.roleEn, roleEs: t.roleEs,
      contentVi: t.contentVi, contentEn: t.contentEn, contentEs: t.contentEs,
      avatar: t.avatar, rating: t.rating, sortOrder: t.sortOrder, status: t.status,
    });
    setLang('vi');
    setShowForm(true);
  };

  const save = async () => {
    setSaving(true);
    const url = editingId ? `/api/admin/testimonials/${editingId}` : '/api/admin/testimonials';
    const method = editingId ? 'PUT' : 'POST';
    await fetch(url, { method, headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(form) });
    setSaving(false);
    setShowForm(false);
    load();
  };

  const remove = async (id: string) => {
    if (!confirm('Xóa đánh giá này?')) return;
    await fetch(`/api/admin/testimonials/${id}`, { method: 'DELETE' });
    load();
  };

  const f = (key: keyof FormState, val: string | number) => setForm((p) => ({ ...p, [key]: val }));

  // Language suffix helper
  const l = lang.charAt(0).toUpperCase() + lang.slice(1) as 'Vi' | 'En' | 'Es';

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Đánh giá khách hàng</h2>
          <p className="text-gray-500 text-sm mt-1">{items.length} đánh giá — hiển thị ở khối Testimonials trang chủ</p>
        </div>
        <button onClick={openNew} className="btn-primary text-sm"><Plus size={16} /> Thêm đánh giá</button>
      </div>

      {loading ? (
        <div className="flex justify-center py-20"><Loader2 size={24} className="animate-spin text-brand" /></div>
      ) : items.length === 0 ? (
        <div className="text-center py-20 text-gray-400">Chưa có đánh giá nào. Nhấn &quot;Thêm đánh giá&quot; để bắt đầu.</div>
      ) : (
        <div className="space-y-3">
          {items.map((t, index) => (
            <div key={t.id} className="bg-white rounded-2xl border border-gray-200 p-5 hover:shadow-sm transition-shadow">
              <div className="flex items-start gap-4">
                <div className="text-gray-300 cursor-grab mt-1"><GripVertical size={18} /></div>
                {t.avatar ? (
                  <img src={t.avatar} alt={t.name} className="w-11 h-11 rounded-full object-cover shrink-0" />
                ) : (
                  <div className="w-11 h-11 rounded-full bg-brand flex items-center justify-center text-white text-sm font-bold shrink-0">
                    {t.name.charAt(0)}
                  </div>
                )}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1.5">
                    <span className="font-semibold text-gray-900 text-sm">{t.name}</span>
                    <span className="text-xs text-gray-400">#{index + 1}</span>
                    <span className={`text-xs px-2 py-0.5 rounded-full ${t.status === 'published' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-500'}`}>
                      {t.status === 'published' ? 'Đã xuất bản' : 'Nháp'}
                    </span>
                    <span className="flex items-center gap-0.5">
                      {Array.from({ length: Math.max(0, Math.min(5, t.rating)) }).map((_, i) => (
                        <Star key={i} size={11} className="fill-amber-400 text-amber-400" />
                      ))}
                    </span>
                  </div>
                  <p className="text-xs text-gray-500 mb-1">{t.roleVi}</p>
                  <p className="text-gray-600 text-xs line-clamp-2 leading-relaxed italic">&ldquo;{t.contentVi}&rdquo;</p>
                  {(t.contentEn || t.contentEs) && (
                    <div className="flex gap-2 mt-2">
                      {t.contentEn && <span className="text-[10px] px-1.5 py-0.5 bg-blue-50 text-blue-600 rounded">EN</span>}
                      {t.contentEs && <span className="text-[10px] px-1.5 py-0.5 bg-orange-50 text-orange-600 rounded">ES</span>}
                    </div>
                  )}
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <button onClick={() => openEdit(t)} className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"><Edit size={14} /></button>
                  <button onClick={() => remove(t.id)} className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"><Trash2 size={14} /></button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {showForm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl w-full max-w-2xl max-h-[85vh] overflow-y-auto">
            <div className="px-6 py-5 border-b border-gray-100 flex items-center justify-between">
              <h3 className="font-bold text-gray-900">{editingId ? 'Sửa đánh giá' : 'Thêm đánh giá mới'}</h3>
              <button onClick={() => setShowForm(false)} className="text-gray-400 hover:text-gray-600 text-xl font-bold">&times;</button>
            </div>
            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Tên khách hàng *</label>
                <input className="input-field" value={form.name} onChange={(e) => f('name', e.target.value)} placeholder="VD: Nguyễn Văn A" />
                <p className="text-xs text-gray-400 mt-1">Tên riêng nên giữ nguyên cho cả 3 ngôn ngữ.</p>
              </div>

              <ImageUpload value={form.avatar} onChange={(u) => f('avatar', u)} label="Ảnh đại diện" />
              <p className="text-xs text-gray-400 -mt-1">Để trống sẽ hiển thị chữ cái đầu của tên trên nền xanh thương hiệu.</p>

              <LanguageTabs value={lang} onChange={setLang} />

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Chức danh ({lang.toUpperCase()}) {lang === 'vi' && '*'}
                </label>
                <input
                  className="input-field"
                  value={(form as unknown as Record<string, string>)[`role${l}`] ?? ''}
                  onChange={(e) => f(`role${l}` as keyof FormState, e.target.value)}
                  placeholder={lang === 'vi' ? 'VD: Chủ hộ gia đình' : lang === 'en' ? 'e.g. Homeowner' : 'ej. Propietario'}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Nội dung đánh giá ({lang.toUpperCase()}) {lang === 'vi' && '*'}
                </label>
                <textarea
                  rows={5}
                  className="textarea-field"
                  value={(form as unknown as Record<string, string>)[`content${l}`] ?? ''}
                  onChange={(e) => f(`content${l}` as keyof FormState, e.target.value)}
                  placeholder={lang === 'vi' ? 'Nội dung khách hàng nhận xét...' : lang === 'en' ? 'What the customer said...' : 'Lo que dijo el cliente...'}
                />
                <p className="text-xs text-gray-400 mt-1">Không cần thêm dấu ngoặc kép — giao diện tự thêm.</p>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Số sao</label>
                  <select className="input-field bg-white" value={form.rating} onChange={(e) => f('rating', parseInt(e.target.value) || 5)}>
                    {[5, 4, 3, 2, 1].map((n) => (
                      <option key={n} value={n}>{n} sao</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Thứ tự</label>
                  <input type="number" className="input-field" value={form.sortOrder} onChange={(e) => f('sortOrder', parseInt(e.target.value) || 0)} />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Trạng thái</label>
                  <select className="input-field bg-white" value={form.status} onChange={(e) => f('status', e.target.value)}>
                    <option value="published">Xuất bản</option>
                    <option value="draft">Nháp</option>
                  </select>
                </div>
              </div>
            </div>
            <div className="px-6 py-4 border-t border-gray-100 flex gap-3 justify-end">
              <button onClick={() => setShowForm(false)} className="btn-outline text-sm px-5 py-2.5">Hủy</button>
              <button onClick={save} disabled={saving || !form.name || !form.contentVi} className="btn-primary text-sm px-5 py-2.5 disabled:opacity-50">
                {saving ? <Loader2 size={14} className="animate-spin" /> : null}
                {editingId ? 'Cập nhật' : 'Thêm mới'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
