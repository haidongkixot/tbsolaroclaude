'use client';

import { useState, useEffect, useCallback } from 'react';
import { Save, Image as ImageIcon } from 'lucide-react';
import ImageUpload from '@/components/admin/ImageUpload';
import LanguageTabs from '@/components/admin/LanguageTabs';

type Lang = 'vi' | 'en' | 'es';

type Form = {
  logoUrl: string;
  heroImage: string;
  heroTitleVi: string; heroTitleEn: string; heroTitleEs: string;
  heroSubtitleVi: string; heroSubtitleEn: string; heroSubtitleEs: string;
  productsHeroImage: string;
  projectsHeroImage: string;
  aboutHeroImage: string;
  contactHeroImage: string;
  communityHeroImage: string;
  faqHeroImage: string;
  showroomHeroImage: string;
  sustainabilityBgImage: string;
  footerPhone: string;
  footerEmail: string;
  footerAddress: string;
  footerFacebook: string;
  footerYoutube: string;
};

const empty: Form = {
  logoUrl: '', heroImage: '',
  heroTitleVi: '', heroTitleEn: '', heroTitleEs: '',
  heroSubtitleVi: '', heroSubtitleEn: '', heroSubtitleEs: '',
  productsHeroImage: '', projectsHeroImage: '', aboutHeroImage: '',
  contactHeroImage: '', communityHeroImage: '', faqHeroImage: '',
  showroomHeroImage: '', sustainabilityBgImage: '',
  footerPhone: '', footerEmail: '', footerAddress: '',
  footerFacebook: '', footerYoutube: '',
};

const PAGE_HEROES: { key: keyof Form; label: string }[] = [
  { key: 'productsHeroImage', label: 'Sản phẩm (Products)' },
  { key: 'projectsHeroImage', label: 'Dự án (Projects)' },
  { key: 'aboutHeroImage', label: 'Giới thiệu (About)' },
  { key: 'contactHeroImage', label: 'Liên hệ (Contact)' },
  { key: 'communityHeroImage', label: 'Cộng đồng (Community)' },
  { key: 'faqHeroImage', label: 'FAQ' },
  { key: 'showroomHeroImage', label: 'Showroom' },
];

export default function AdminSettingsPage() {
  const [form, setForm] = useState<Form>(empty);
  const [lang, setLang] = useState<Lang>('vi');
  const [status, setStatus] = useState<'idle' | 'saving' | 'saved' | 'error'>('idle');

  useEffect(() => {
    fetch('/api/admin/settings')
      .then((r) => r.json())
      .then((data) => setForm((prev) => ({ ...prev, ...data })))
      .catch(() => {});
  }, []);

  const set = useCallback((key: keyof Form, val: string) => {
    setForm((prev) => ({ ...prev, [key]: val }));
  }, []);

  async function handleSave() {
    setStatus('saving');
    try {
      const res = await fetch('/api/admin/settings', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error();
      setStatus('saved');
      setTimeout(() => setStatus('idle'), 3000);
    } catch {
      setStatus('error');
      setTimeout(() => setStatus('idle'), 3000);
    }
  }

  const saveLabel = status === 'saving' ? 'Đang lưu...' : status === 'saved' ? 'Đã lưu!' : status === 'error' ? 'Lỗi!' : 'Lưu cài đặt';
  const saveCls = status === 'saved' ? 'bg-green-600 hover:bg-green-700' : status === 'error' ? 'bg-red-600 hover:bg-red-700' : '';

  return (
    <div className="max-w-4xl">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Cài đặt Website</h2>
          <p className="text-gray-500 text-sm mt-1">Logo, hình nền, footer và thông tin liên hệ</p>
        </div>
        <button onClick={handleSave} disabled={status === 'saving'} className={`btn-primary text-sm ${saveCls}`}>
          <Save size={15} /> {saveLabel}
        </button>
      </div>

      <div className="space-y-6">
        {/* ── Branding ── */}
        <Section icon={<ImageIcon size={16} />} title="Thương hiệu (Branding)">
          <Field label="Logo website">
            <ImageUpload value={form.logoUrl} onChange={(u) => set('logoUrl', u)} />
            <p className="text-xs text-gray-400 mt-1">Hiển thị ở Header và Footer. Để trống dùng logo mặc định (/logo.png).</p>
          </Field>
        </Section>

        {/* ── Homepage Hero ── */}
        <Section icon="🏠" title="Trang chủ – Hero Section">
          <Field label="Hình nền Hero">
            <ImageUpload value={form.heroImage} onChange={(u) => set('heroImage', u)} />
          </Field>
          <LanguageTabs locale={lang} onChange={setLang} />
          <Field label="Tiêu đề lớn (Hero Title)">
            <input className="input-field" value={form[`heroTitle${cap(lang)}`]} onChange={(e) => set(`heroTitle${cap(lang)}` as keyof Form, e.target.value)} placeholder="VD: Kiến tạo năng lượng bền vững" />
          </Field>
          <Field label="Phụ đề (Hero Subtitle)">
            <textarea rows={2} className="textarea-field" value={form[`heroSubtitle${cap(lang)}`]} onChange={(e) => set(`heroSubtitle${cap(lang)}` as keyof Form, e.target.value)} placeholder="VD: Thương hiệu điện năng lượng mặt trời..." />
          </Field>
        </Section>

        {/* ── Page Hero Backgrounds ── */}
        <Section icon="🖼" title="Hình nền các trang (Page Hero Backgrounds)">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {PAGE_HEROES.map(({ key, label }) => (
              <Field key={key} label={label}>
                <ImageUpload value={form[key]} onChange={(u) => set(key, u)} />
              </Field>
            ))}
          </div>
        </Section>

        {/* ── Sustainability Banner ── */}
        <Section icon="🌿" title="Sustainability Banner">
          <Field label="Hình nền banner">
            <ImageUpload value={form.sustainabilityBgImage} onChange={(u) => set('sustainabilityBgImage', u)} />
          </Field>
        </Section>

        {/* ── Footer ── */}
        <Section icon="📋" title="Thông tin Footer">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Field label="Số điện thoại">
              <input className="input-field" value={form.footerPhone} onChange={(e) => set('footerPhone', e.target.value)} placeholder="+84 xxx xxx xxx" />
            </Field>
            <Field label="Email">
              <input className="input-field" value={form.footerEmail} onChange={(e) => set('footerEmail', e.target.value)} placeholder="contact@tbsolaro.com" />
            </Field>
            <Field label="Facebook URL">
              <input className="input-field" value={form.footerFacebook} onChange={(e) => set('footerFacebook', e.target.value)} placeholder="https://facebook.com/tbsolaro" />
            </Field>
            <Field label="YouTube URL">
              <input className="input-field" value={form.footerYoutube} onChange={(e) => set('footerYoutube', e.target.value)} placeholder="https://youtube.com/tbsolaro" />
            </Field>
          </div>
          <Field label="Địa chỉ">
            <textarea rows={2} className="textarea-field" value={form.footerAddress} onChange={(e) => set('footerAddress', e.target.value)} placeholder="Số nhà, đường, quận/huyện, tỉnh/thành phố" />
          </Field>
        </Section>
      </div>

      <div className="mt-6 flex justify-end">
        <button onClick={handleSave} disabled={status === 'saving'} className={`btn-primary ${saveCls}`}>
          <Save size={15} /> {saveLabel}
        </button>
      </div>
    </div>
  );
}

function cap(s: string) {
  return s.charAt(0).toUpperCase() + s.slice(1);
}

function Section({ icon, title, children }: { icon: React.ReactNode; title: string; children: React.ReactNode }) {
  return (
    <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
      <div className="flex items-center gap-2 px-6 py-4 border-b border-gray-100 bg-gray-50">
        <span className="text-brand">{icon}</span>
        <h3 className="font-semibold text-gray-900 text-sm">{title}</h3>
      </div>
      <div className="p-6 space-y-5">{children}</div>
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1.5">{label}</label>
      {children}
    </div>
  );
}
