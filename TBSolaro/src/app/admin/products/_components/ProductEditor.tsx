'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, Save, Globe } from 'lucide-react';
import LanguageTabs, { type Locale } from '@/components/admin/LanguageTabs';
import RichEditor from '@/components/admin/RichEditor';
import ImageUpload from '@/components/admin/ImageUpload';
import GalleryManager from '@/components/admin/GalleryManager';

type Form = {
  slug: string; status: string; category: string; sortOrder: number; downloadUrl: string; seoOgImage: string;
  featuredImage: string; gallery: string[]; tags: string[]; relatedSlugs: string[];
  titleVi: string; titleEn: string; titleEs: string;
  subtitleVi: string; subtitleEn: string; subtitleEs: string;
  excerptVi: string; excerptEn: string; excerptEs: string;
  featuresVi: string[]; featuresEn: string[]; featuresEs: string[];
  specsVi: Record<string, string>; specsEn: Record<string, string>; specsEs: Record<string, string>;
  tiersVi: string; tiersEn: string; tiersEs: string;
  seoTitleVi: string; seoTitleEn: string; seoTitleEs: string;
  seoDescVi: string; seoDescEn: string; seoDescEs: string;
};

function emptyForm(): Form {
  return {
    slug: '', status: 'draft', category: 'combo', sortOrder: 0, downloadUrl: '', seoOgImage: '',
    featuredImage: '', gallery: [], tags: [], relatedSlugs: [],
    titleVi: '', titleEn: '', titleEs: '', subtitleVi: '', subtitleEn: '', subtitleEs: '',
    excerptVi: '', excerptEn: '', excerptEs: '',
    featuresVi: [], featuresEn: [], featuresEs: [],
    specsVi: {}, specsEn: {}, specsEs: {},
    tiersVi: '[]', tiersEn: '[]', tiersEs: '[]',
    seoTitleVi: '', seoTitleEn: '', seoTitleEs: '', seoDescVi: '', seoDescEn: '', seoDescEs: '',
  };
}

function parseInitial(data: Record<string, unknown>): Form {
  return {
    slug: (data.slug as string) ?? '',
    status: (data.status as string) ?? 'draft',
    category: (data.category as string) ?? 'combo',
    sortOrder: (data.sortOrder as number) ?? 0,
    downloadUrl: (data.downloadUrl as string) ?? '',
    seoOgImage: (data.seoOgImage as string) ?? '',
    featuredImage: (data.featuredImage as string) ?? '',
    gallery: tryParse(data.gallery as string, []),
    tags: tryParse(data.tags as string, []),
    relatedSlugs: tryParse(data.relatedSlugs as string, []),
    titleVi: (data.titleVi as string) ?? '', titleEn: (data.titleEn as string) ?? '', titleEs: (data.titleEs as string) ?? '',
    subtitleVi: (data.subtitleVi as string) ?? '', subtitleEn: (data.subtitleEn as string) ?? '', subtitleEs: (data.subtitleEs as string) ?? '',
    excerptVi: (data.excerptVi as string) ?? '', excerptEn: (data.excerptEn as string) ?? '', excerptEs: (data.excerptEs as string) ?? '',
    featuresVi: tryParse(data.featuresVi as string, []),
    featuresEn: tryParse(data.featuresEn as string, []),
    featuresEs: tryParse(data.featuresEs as string, []),
    specsVi: tryParse(data.specsVi as string, {}),
    specsEn: tryParse(data.specsEn as string, {}),
    specsEs: tryParse(data.specsEs as string, {}),
    tiersVi: (data.tiersVi as string) ?? '[]',
    tiersEn: (data.tiersEn as string) ?? '[]',
    tiersEs: (data.tiersEs as string) ?? '[]',
    seoTitleVi: (data.seoTitleVi as string) ?? '', seoTitleEn: (data.seoTitleEn as string) ?? '', seoTitleEs: (data.seoTitleEs as string) ?? '',
    seoDescVi: (data.seoDescVi as string) ?? '', seoDescEn: (data.seoDescEn as string) ?? '', seoDescEs: (data.seoDescEs as string) ?? '',
  };
}

function tryParse<T>(v: string | undefined, fallback: T): T {
  try { return v ? JSON.parse(v) : fallback; } catch { return fallback; }
}

function slugify(text: string) {
  return text.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/[^a-z0-9\s-]/g, '').trim().replace(/\s+/g, '-');
}

interface Props {
  initial?: Record<string, unknown>;
  onSave: (data: Record<string, unknown>) => Promise<void>;
}

export default function ProductEditor({ initial, onSave }: Props) {
  const [form, setForm] = useState<Form>(initial ? parseInitial(initial) : emptyForm());
  const [lang, setLang] = useState<Locale>('vi');
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  const l = lang.charAt(0).toUpperCase() + lang.slice(1) as 'Vi' | 'En' | 'Es';

  function set<K extends keyof Form>(key: K, value: Form[K]) {
    setForm((f) => ({ ...f, [key]: value }));
  }

  function setLang2(key: string, value: string) {
    setForm((f) => ({ ...f, [key]: value }));
  }

  async function handleSave(publish?: boolean) {
    setSaving(true);
    try {
      const data = {
        ...form,
        status: publish ? 'published' : form.status,
        gallery: JSON.stringify(form.gallery),
        tags: JSON.stringify(form.tags),
        relatedSlugs: JSON.stringify(form.relatedSlugs),
        featuresVi: JSON.stringify(form.featuresVi),
        featuresEn: JSON.stringify(form.featuresEn),
        featuresEs: JSON.stringify(form.featuresEs),
        specsVi: JSON.stringify(form.specsVi),
        specsEn: JSON.stringify(form.specsEn),
        specsEs: JSON.stringify(form.specsEs),
      };
      await onSave(data);
      setSaved(true);
      setTimeout(() => setSaved(false), 2000);
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="max-w-6xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-4">
          <Link href="/admin/products" className="flex items-center gap-2 text-sm text-gray-500 hover:text-gray-700">
            <ArrowLeft size={16} /> Sản phẩm
          </Link>
          <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${form.status === 'published' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-600'}`}>
            {form.status === 'published' ? 'Đã xuất bản' : 'Bản nháp'}
          </span>
        </div>
        <div className="flex gap-2">
          <button onClick={() => handleSave()} disabled={saving}
            className="btn-outline text-sm px-4 py-2 flex items-center gap-2">
            <Save size={15} /> {saved ? 'Đã lưu!' : 'Lưu'}
          </button>
          <button onClick={() => handleSave(true)} disabled={saving}
            className="btn-primary text-sm px-4 py-2 flex items-center gap-2">
            <Globe size={15} /> Xuất bản
          </button>
        </div>
      </div>

      <div className="flex gap-6 items-start">
        {/* Main */}
        <div className="flex-1 space-y-5">
          <div className="bg-white rounded-2xl border border-gray-200 p-6">
            <LanguageTabs value={lang} onChange={setLang} />

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Tiêu đề *</label>
                <input
                  className="input-field"
                  value={(form as unknown as Record<string, string>)[`title${l}`] ?? ''}
                  onChange={(e) => {
                    setLang2(`title${l}`, e.target.value);
                    if (lang === 'vi' && !initial) set('slug', slugify(e.target.value));
                  }}
                  placeholder={`Tên sản phẩm (${lang.toUpperCase()})`}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Tiêu đề phụ</label>
                <input className="input-field" value={(form as unknown as Record<string, string>)[`subtitle${l}`] ?? ''}
                  onChange={(e) => setLang2(`subtitle${l}`, e.target.value)} placeholder="Subtitle..." />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Mô tả ngắn</label>
                <textarea rows={3} className="textarea-field"
                  value={(form as unknown as Record<string, string>)[`excerpt${l}`] ?? ''}
                  onChange={(e) => setLang2(`excerpt${l}`, e.target.value)} placeholder="Excerpt..." />
              </div>
            </div>
          </div>

          {/* Features */}
          <div className="bg-white rounded-2xl border border-gray-200 p-6">
            <h3 className="font-semibold text-gray-900 mb-4">Tính năng ({lang.toUpperCase()})</h3>
            {((form as unknown as Record<string, string[]>)[`features${l}`] ?? []).map((feat, i) => (
              <div key={i} className="flex gap-2 mb-2">
                <input className="input-field flex-1 text-sm" value={feat}
                  onChange={(e) => {
                    const arr = [...((form as unknown as Record<string, string[]>)[`features${l}`] ?? [])];
                    arr[i] = e.target.value;
                    setForm((f) => ({ ...f, [`features${l}`]: arr }));
                  }} />
                <button type="button" onClick={() => {
                  const arr = ((form as unknown as Record<string, string[]>)[`features${l}`] ?? []).filter((_, j) => j !== i);
                  setForm((f) => ({ ...f, [`features${l}`]: arr }));
                }} className="text-red-400 hover:text-red-600 px-2">×</button>
              </div>
            ))}
            <button type="button" onClick={() => {
              const arr = [...((form as unknown as Record<string, string[]>)[`features${l}`] ?? []), ''];
              setForm((f) => ({ ...f, [`features${l}`]: arr }));
            }} className="text-sm text-brand hover:underline mt-1">+ Thêm tính năng</button>
          </div>

          {/* SEO */}
          <div className="bg-white rounded-2xl border border-gray-200 p-6">
            <h3 className="font-semibold text-gray-900 mb-4">SEO ({lang.toUpperCase()})</h3>
            <div className="space-y-3">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Meta Title</label>
                <input className="input-field" value={(form as unknown as Record<string, string>)[`seoTitle${l}`] ?? ''}
                  onChange={(e) => setLang2(`seoTitle${l}`, e.target.value)} />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Meta Description</label>
                <textarea rows={2} className="textarea-field" value={(form as unknown as Record<string, string>)[`seoDesc${l}`] ?? ''}
                  onChange={(e) => setLang2(`seoDesc${l}`, e.target.value)} />
              </div>
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="w-72 space-y-5 shrink-0">
          <div className="bg-white rounded-2xl border border-gray-200 p-5 space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Slug</label>
              <input className="input-field text-sm" value={form.slug}
                onChange={(e) => set('slug', e.target.value)} placeholder="product-slug" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Danh mục</label>
              <select className="input-field bg-white text-sm" value={form.category}
                onChange={(e) => set('category', e.target.value)}>
                <option value="combo">Combo</option>
                <option value="panel">Tấm pin</option>
                <option value="battery">Pin lưu trữ</option>
                <option value="inverter">Biến tần</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Trạng thái</label>
              <select className="input-field bg-white text-sm" value={form.status}
                onChange={(e) => set('status', e.target.value)}>
                <option value="draft">Bản nháp</option>
                <option value="published">Đã xuất bản</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Thứ tự</label>
              <input type="number" className="input-field text-sm" value={form.sortOrder}
                onChange={(e) => set('sortOrder', parseInt(e.target.value) || 0)} />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Download URL</label>
              <input className="input-field text-sm" value={form.downloadUrl}
                onChange={(e) => set('downloadUrl', e.target.value)} placeholder="https://..." />
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-gray-200 p-5">
            <ImageUpload value={form.featuredImage} onChange={(url) => set('featuredImage', url)} />
          </div>

          <div className="bg-white rounded-2xl border border-gray-200 p-5">
            <GalleryManager value={form.gallery} onChange={(urls) => set('gallery', urls)} />
          </div>

          <div className="bg-white rounded-2xl border border-gray-200 p-5">
            <label className="block text-xs font-semibold text-gray-600 uppercase tracking-wide mb-2">Tags</label>
            <input className="input-field text-sm" value={form.tags.join(', ')}
              onChange={(e) => set('tags', e.target.value.split(',').map((t) => t.trim()).filter(Boolean))}
              placeholder="tag1, tag2" />
          </div>
        </div>
      </div>
    </div>
  );
}
