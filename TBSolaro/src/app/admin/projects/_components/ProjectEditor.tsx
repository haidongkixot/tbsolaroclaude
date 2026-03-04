'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, Save, Globe } from 'lucide-react';
import LanguageTabs, { type Locale } from '@/components/admin/LanguageTabs';
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

export default function ProjectEditor({ initial, onSave }: Props) {
  const [form, setForm] = useState<Form>(initial ? parseInitial(initial) : emptyForm());
  const [lang, setLang] = useState<Locale>('vi');
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  const l = lang.charAt(0).toUpperCase() + lang.slice(1) as 'Vi' | 'En' | 'Es';

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
    <div className="max-w-6xl mx-auto">
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
        {/* Main */}
        <div className="flex-1 space-y-5">
          <div className="bg-white rounded-2xl border border-gray-200 p-6">
            <LanguageTabs value={lang} onChange={setLang} />
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Tiêu đề *</label>
                <input className="input-field"
                  value={(form as unknown as Record<string, string>)[`title${l}`] ?? ''}
                  onChange={(e) => {
                    setL(`title${l}`, e.target.value);
                    if (lang === 'vi' && !initial) set('slug', slugify(e.target.value));
                  }}
                  placeholder={`Tên dự án (${lang.toUpperCase()})`} />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Mô tả ngắn</label>
                <textarea rows={2} className="textarea-field"
                  value={(form as unknown as Record<string, string>)[`excerpt${l}`] ?? ''}
                  onChange={(e) => setL(`excerpt${l}`, e.target.value)} placeholder="Excerpt..." />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Nội dung</label>
                <RichEditor
                  value={(form as unknown as Record<string, string>)[`content${l}`] ?? ''}
                  onChange={(html) => setL(`content${l}`, html)}
                  placeholder={`Nội dung bài viết (${lang.toUpperCase()})...`}
                />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-gray-200 p-6">
            <h3 className="font-semibold text-gray-900 mb-4">SEO ({lang.toUpperCase()})</h3>
            <div className="space-y-3">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Meta Title</label>
                <input className="input-field" value={(form as unknown as Record<string, string>)[`seoTitle${l}`] ?? ''}
                  onChange={(e) => setL(`seoTitle${l}`, e.target.value)} />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Meta Description</label>
                <textarea rows={2} className="textarea-field" value={(form as unknown as Record<string, string>)[`seoDesc${l}`] ?? ''}
                  onChange={(e) => setL(`seoDesc${l}`, e.target.value)} />
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
