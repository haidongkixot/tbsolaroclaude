'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, Save, Globe } from 'lucide-react';
import RichEditor from '@/components/admin/RichEditor';
import ImageUpload from '@/components/admin/ImageUpload';
import GalleryManager from '@/components/admin/GalleryManager';

type Form = {
  slug: string; status: string; category: string; sortOrder: number;
  location: string; power: string; installationDate: string; year: string; videoUrl: string;
  featuredImage: string; gallery: string[]; relatedSlugs: string[]; seoOgImage: string;
  titleVi: string; titleEn: string; titleEs: string;
  excerptVi: string; excerptEn: string; excerptEs: string;
  contentVi: string; contentEn: string; contentEs: string;
  seoTitleVi: string; seoTitleEn: string; seoTitleEs: string;
  seoDescVi: string; seoDescEn: string; seoDescEs: string;
};

function tryParse<T>(v: string | undefined, fallback: T): T {
  try { return v ? JSON.parse(v) : fallback; } catch { return fallback; }
}

function slugify(text: string) {
  return text.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/[^a-z0-9\s-]/g, '').trim().replace(/\s+/g, '-');
}

function emptyForm(): Form {
  return {
    slug: '', status: 'draft', category: 'enterprise', sortOrder: 0,
    location: '', power: '', installationDate: '', year: '', videoUrl: '', seoOgImage: '',
    featuredImage: '', gallery: [], relatedSlugs: [],
    titleVi: '', titleEn: '', titleEs: '',
    excerptVi: '', excerptEn: '', excerptEs: '',
    contentVi: '', contentEn: '', contentEs: '',
    seoTitleVi: '', seoTitleEn: '', seoTitleEs: '',
    seoDescVi: '', seoDescEn: '', seoDescEs: '',
  };
}

function parseInitial(data: Record<string, unknown>): Form {
  return {
    slug: (data.slug as string) ?? '', status: (data.status as string) ?? 'draft',
    category: (data.category as string) ?? 'enterprise', sortOrder: (data.sortOrder as number) ?? 0,
    location: (data.location as string) ?? '', power: (data.power as string) ?? '',
    installationDate: (data.installationDate as string) ?? '', year: (data.year as string) ?? '',
    videoUrl: (data.videoUrl as string) ?? '', seoOgImage: (data.seoOgImage as string) ?? '',
    featuredImage: (data.featuredImage as string) ?? '',
    gallery: tryParse(data.gallery as string, []),
    relatedSlugs: tryParse(data.relatedSlugs as string, []),
    titleVi: (data.titleVi as string) ?? '', titleEn: (data.titleEn as string) ?? '', titleEs: (data.titleEs as string) ?? '',
    excerptVi: (data.excerptVi as string) ?? '', excerptEn: (data.excerptEn as string) ?? '', excerptEs: (data.excerptEs as string) ?? '',
    contentVi: (data.contentVi as string) ?? '', contentEn: (data.contentEn as string) ?? '', contentEs: (data.contentEs as string) ?? '',
    seoTitleVi: (data.seoTitleVi as string) ?? '', seoTitleEn: (data.seoTitleEn as string) ?? '', seoTitleEs: (data.seoTitleEs as string) ?? '',
    seoDescVi: (data.seoDescVi as string) ?? '', seoDescEn: (data.seoDescEn as string) ?? '', seoDescEs: (data.seoDescEs as string) ?? '',
  };
}

interface Props {
  initial?: Record<string, unknown>;
  onSave: (data: Record<string, unknown>) => Promise<void>;
}

const LANGS = [
  { code: 'Vi' as const, flag: '🇻🇳', label: 'Tiếng Việt' },
  { code: 'En' as const, flag: '🇬🇧', label: 'English' },
  { code: 'Es' as const, flag: '🇪🇸', label: 'Español' },
];

export default function ProjectEditor({ initial, onSave }: Props) {
  const [form, setForm] = useState<Form>(initial ? parseInitial(initial) : emptyForm());
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  function set<K extends keyof Form>(key: K, value: Form[K]) {
    setForm((f) => ({ ...f, [key]: value }));
  }

  function setL(key: string, value: string) {
    setForm((f) => ({ ...f, [key]: value }));
  }

  async function handleSave(publish?: boolean) {
    setSaving(true);
    try {
      const data = {
        ...form,
        status: publish ? 'published' : form.status,
        gallery: JSON.stringify(form.gallery),
        relatedSlugs: JSON.stringify(form.relatedSlugs),
      };
      await onSave(data);
      setSaved(true);
      setTimeout(() => setSaved(false), 2000);
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-4">
          <Link href="/admin/projects" className="flex items-center gap-2 text-sm text-gray-500 hover:text-gray-700">
            <ArrowLeft size={16} /> Dự án
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
        {/* Main content — 3 language editors */}
        <div className="flex-1 space-y-6">
          {LANGS.map(({ code, flag, label }) => (
            <div key={code} className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
              {/* Language header */}
              <div className="px-6 py-3 bg-gray-50 border-b border-gray-200 flex items-center gap-2">
                <span className="text-lg">{flag}</span>
                <span className="font-semibold text-gray-900 text-sm">{label}</span>
                {code === 'Vi' && <span className="text-[10px] bg-brand text-white px-1.5 py-0.5 rounded-full font-medium">Chính</span>}
              </div>

              <div className="p-6 space-y-4">
                {/* Title */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Tiêu đề {code === 'Vi' && '*'}
                  </label>
                  <input
                    className="input-field"
                    value={(form as unknown as Record<string, string>)[`title${code}`] ?? ''}
                    onChange={(e) => {
                      setL(`title${code}`, e.target.value);
                      if (code === 'Vi' && !initial) set('slug', slugify(e.target.value));
                    }}
                    placeholder={code === 'Vi' ? 'Tên dự án' : code === 'En' ? 'Project name' : 'Nombre del proyecto'}
                  />
                </div>

                {/* Excerpt */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Mô tả ngắn</label>
                  <textarea
                    rows={2}
                    className="textarea-field"
                    value={(form as unknown as Record<string, string>)[`excerpt${code}`] ?? ''}
                    onChange={(e) => setL(`excerpt${code}`, e.target.value)}
                    placeholder={code === 'Vi' ? 'Mô tả ngắn...' : code === 'En' ? 'Short description...' : 'Descripción breve...'}
                  />
                </div>

                {/* Rich text content */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Nội dung {flag}
                  </label>
                  <RichEditor
                    value={(form as unknown as Record<string, string>)[`content${code}`] ?? ''}
                    onChange={(html) => setL(`content${code}`, html)}
                    placeholder={code === 'Vi' ? 'Viết nội dung tiếng Việt...' : code === 'En' ? 'Write English content...' : 'Escribir contenido en español...'}
                  />
                </div>

                {/* SEO per language */}
                <details className="group">
                  <summary className="cursor-pointer text-xs font-semibold text-gray-500 uppercase tracking-wide flex items-center gap-1 py-2 hover:text-gray-700">
                    <span className="group-open:rotate-90 transition-transform">▶</span> SEO ({code})
                  </summary>
                  <div className="space-y-3 pt-2">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Meta Title</label>
                      <input className="input-field text-sm" value={(form as unknown as Record<string, string>)[`seoTitle${code}`] ?? ''}
                        onChange={(e) => setL(`seoTitle${code}`, e.target.value)} />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Meta Description</label>
                      <textarea rows={2} className="textarea-field text-sm" value={(form as unknown as Record<string, string>)[`seoDesc${code}`] ?? ''}
                        onChange={(e) => setL(`seoDesc${code}`, e.target.value)} />
                    </div>
                  </div>
                </details>
              </div>
            </div>
          ))}
        </div>

        {/* Sidebar */}
        <div className="w-72 space-y-5 shrink-0 sticky top-6">
          <div className="bg-white rounded-2xl border border-gray-200 p-5 space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Slug</label>
              <input className="input-field text-sm" value={form.slug}
                onChange={(e) => set('slug', e.target.value)} />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Danh mục</label>
              <select className="input-field bg-white text-sm" value={form.category}
                onChange={(e) => set('category', e.target.value)}>
                <option value="enterprise">Doanh nghiệp</option>
                <option value="household">Hộ gia đình</option>
                <option value="community">Cộng đồng</option>
                <option value="csr">CSR</option>
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
              <label className="block text-sm font-medium text-gray-700 mb-1">Địa điểm</label>
              <input className="input-field text-sm" value={form.location}
                onChange={(e) => set('location', e.target.value)} placeholder="Hà Nội, Việt Nam" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Công suất</label>
              <input className="input-field text-sm" value={form.power}
                onChange={(e) => set('power', e.target.value)} placeholder="500 kWp" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Năm</label>
              <input className="input-field text-sm" value={form.year}
                onChange={(e) => set('year', e.target.value)} placeholder="2024" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Ngày lắp đặt</label>
              <input type="date" className="input-field text-sm" value={form.installationDate}
                onChange={(e) => set('installationDate', e.target.value)} />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Thứ tự</label>
              <input type="number" className="input-field text-sm" value={form.sortOrder}
                onChange={(e) => set('sortOrder', parseInt(e.target.value) || 0)} />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Video URL</label>
              <input className="input-field text-sm" value={form.videoUrl}
                onChange={(e) => set('videoUrl', e.target.value)} placeholder="https://youtube.com/..." />
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-gray-200 p-5">
            <ImageUpload value={form.featuredImage} onChange={(url) => set('featuredImage', url)} />
          </div>

          <div className="bg-white rounded-2xl border border-gray-200 p-5">
            <GalleryManager value={form.gallery} onChange={(urls) => set('gallery', urls)} />
          </div>
        </div>
      </div>
    </div>
  );
}
