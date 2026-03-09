'use client';

import { useState, useEffect, useCallback } from 'react';
import { Save, Image as ImageIcon, Plus, Trash2, GripVertical } from 'lucide-react';
import ImageUpload from '@/components/admin/ImageUpload';
import LanguageTabs from '@/components/admin/LanguageTabs';
import type { HeroSlide, SectionTitles, LangVal } from '@/lib/db/settings';

type Lang = 'vi' | 'en' | 'es';

type Form = {
  logoUrl: string;
  heroSlides: HeroSlide[];
  productsHeroImage: string;
  projectsHeroImage: string;
  aboutHeroImage: string;
  contactHeroImage: string;
  communityHeroImage: string;
  faqHeroImage: string;
  showroomHeroImage: string;
  sustainabilityBgImage: string;
  // Homepage section backgrounds
  csrImage: string;
  productsSectionBg: string;
  statsSectionBg: string;
  testimonialsSectionBg: string;
  newsSectionBg: string;
  contactSectionBg: string;
  footerPhone: string;
  footerEmail: string;
  footerAddress: string;
  footerFacebook: string;
  footerYoutube: string;
  sectionTitles: SectionTitles;
};

const emptySlide = (): HeroSlide => ({
  image: '', titleVi: '', titleEn: '', titleEs: '',
  subtitleVi: '', subtitleEn: '', subtitleEs: '',
});

const emptyLang = (): LangVal => ({ vi: '', en: '', es: '' });

const emptySectionTitles = (): SectionTitles => ({
  home: {
    certTitle: emptyLang(), csrBadge: emptyLang(), csrTitle: emptyLang(), csrDesc: emptyLang(),
    productsTitle: emptyLang(), productsSubtitle: emptyLang(),
    statsTitle: emptyLang(), statsSubtitle: emptyLang(),
    testimonialTitle: emptyLang(), testimonialSubtitle: emptyLang(),
    blogTitle: emptyLang(), blogSubtitle: emptyLang(),
  },
  products: { featuredTitle: emptyLang(), featuredSubtitle: emptyLang(), allTitle: emptyLang() },
  projects: { scaleTitle: emptyLang(), scaleSubtitle: emptyLang() },
  about: {
    historyTitle: emptyLang(), historySubtitle: emptyLang(),
    whyTitle: emptyLang(), whySubtitle: emptyLang(),
    processTitle: emptyLang(), processSubtitle: emptyLang(),
    partnersTitle: emptyLang(),
  },
});

const empty: Form = {
  logoUrl: '', heroSlides: [],
  productsHeroImage: '', projectsHeroImage: '', aboutHeroImage: '',
  contactHeroImage: '', communityHeroImage: '', faqHeroImage: '',
  showroomHeroImage: '', sustainabilityBgImage: '',
  csrImage: '', productsSectionBg: '', statsSectionBg: '',
  testimonialsSectionBg: '', newsSectionBg: '', contactSectionBg: '',
  footerPhone: '', footerEmail: '', footerAddress: '',
  footerFacebook: '', footerYoutube: '',
  sectionTitles: emptySectionTitles(),
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
  const [expandedSlide, setExpandedSlide] = useState<number | null>(0);
  const [status, setStatus] = useState<'idle' | 'saving' | 'saved' | 'error'>('idle');

  useEffect(() => {
    fetch('/api/admin/settings')
      .then((r) => r.json())
      .then((data) => {
        const parsedST: SectionTitles = (() => {
          try { return typeof data.sectionTitles === 'string' ? JSON.parse(data.sectionTitles) : (data.sectionTitles || {}); }
          catch { return {}; }
        })();
        // Deep merge with defaults so all keys exist
        const merged = emptySectionTitles();
        for (const page of Object.keys(merged) as (keyof SectionTitles)[]) {
          if (parsedST[page]) {
            for (const key of Object.keys(merged[page])) {
              const k = key as string;
              const src = (parsedST[page] as Record<string, LangVal>)[k];
              if (src) (merged[page] as Record<string, LangVal>)[k] = src;
            }
          }
        }
        setForm((prev) => ({
          ...prev,
          ...data,
          heroSlides: Array.isArray(data.heroSlides)
            ? data.heroSlides
            : (() => { try { return JSON.parse(data.heroSlides || '[]'); } catch { return []; } })(),
          sectionTitles: merged,
        }));
      })
      .catch(() => {});
  }, []);

  const set = useCallback((key: keyof Form, val: string) => {
    setForm((prev) => ({ ...prev, [key]: val }));
  }, []);

  function setSectionTitle(page: keyof SectionTitles, key: string, locale: Lang, val: string) {
    setForm((prev) => {
      const st = { ...prev.sectionTitles };
      const section = { ...(st[page] as Record<string, LangVal>) };
      section[key] = { ...section[key], [locale]: val };
      (st as Record<string, unknown>)[page] = section;
      return { ...prev, sectionTitles: st };
    });
  }

  function updateSlide(i: number, field: keyof HeroSlide, val: string) {
    setForm((prev) => {
      const slides = [...prev.heroSlides];
      slides[i] = { ...slides[i], [field]: val };
      return { ...prev, heroSlides: slides };
    });
  }

  function addSlide() {
    setForm((prev) => ({ ...prev, heroSlides: [...prev.heroSlides, emptySlide()] }));
    setExpandedSlide(form.heroSlides.length);
  }

  function removeSlide(i: number) {
    setForm((prev) => {
      const slides = prev.heroSlides.filter((_, idx) => idx !== i);
      return { ...prev, heroSlides: slides };
    });
    setExpandedSlide(null);
  }

  function moveSlide(i: number, dir: -1 | 1) {
    setForm((prev) => {
      const slides = [...prev.heroSlides];
      const j = i + dir;
      if (j < 0 || j >= slides.length) return prev;
      [slides[i], slides[j]] = [slides[j], slides[i]];
      return { ...prev, heroSlides: slides };
    });
    setExpandedSlide((e) => (e === i ? i + dir : e));
  }

  async function handleSave() {
    setStatus('saving');
    try {
      const payload = { ...form, heroSlides: JSON.stringify(form.heroSlides), sectionTitles: JSON.stringify(form.sectionTitles) };
      const res = await fetch('/api/admin/settings', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
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
  const l = (lang.charAt(0).toUpperCase() + lang.slice(1)) as 'Vi' | 'En' | 'Es';

  return (
    <div className="max-w-4xl">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Cài đặt Website</h2>
          <p className="text-gray-500 text-sm mt-1">Logo, slider hero, hình nền trang, footer</p>
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

        {/* ── Hero Slider ── */}
        <Section icon="🎞" title="Trang chủ – Hero Slider">
          <p className="text-xs text-gray-500 mb-4">Thêm nhiều slide cho banner đầu trang. Mỗi slide có hình nền, tiêu đề và phụ đề (3 ngôn ngữ).</p>

          <div className="space-y-3">
            {form.heroSlides.map((slide, i) => (
              <div key={i} className="border border-gray-200 rounded-xl overflow-hidden">
                {/* Slide header */}
                <div
                  className="flex items-center gap-3 px-4 py-3 bg-gray-50 cursor-pointer select-none"
                  onClick={() => setExpandedSlide(expandedSlide === i ? null : i)}
                >
                  <GripVertical size={16} className="text-gray-400 shrink-0" />
                  <div className="flex-1 min-w-0">
                    <span className="text-sm font-medium text-gray-700">
                      Slide {i + 1}{slide.titleVi ? ` — ${slide.titleVi.slice(0, 40)}` : ''}
                    </span>
                  </div>
                  <div className="flex items-center gap-1 shrink-0">
                    <button onClick={(e) => { e.stopPropagation(); moveSlide(i, -1); }} disabled={i === 0} className="p-1 text-gray-400 hover:text-brand disabled:opacity-30" title="Move up">↑</button>
                    <button onClick={(e) => { e.stopPropagation(); moveSlide(i, 1); }} disabled={i === form.heroSlides.length - 1} className="p-1 text-gray-400 hover:text-brand disabled:opacity-30" title="Move down">↓</button>
                    <button onClick={(e) => { e.stopPropagation(); removeSlide(i); }} className="p-1 text-red-400 hover:text-red-600" title="Remove slide">
                      <Trash2 size={14} />
                    </button>
                  </div>
                </div>

                {/* Slide content */}
                {expandedSlide === i && (
                  <div className="p-4 space-y-4">
                    <Field label="Hình nền slide">
                      <ImageUpload value={slide.image} onChange={(u) => updateSlide(i, 'image', u)} />
                    </Field>
                    <LanguageTabs value={lang} onChange={setLang} />
                    <Field label="Tiêu đề lớn">
                      <input className="input-field" value={slide[`title${l}` as keyof HeroSlide]} onChange={(e) => updateSlide(i, `title${l}` as keyof HeroSlide, e.target.value)} placeholder="VD: Kiến tạo năng lượng bền vững" />
                    </Field>
                    <Field label="Phụ đề">
                      <textarea rows={2} className="textarea-field" value={slide[`subtitle${l}` as keyof HeroSlide]} onChange={(e) => updateSlide(i, `subtitle${l}` as keyof HeroSlide, e.target.value)} placeholder="VD: Thương hiệu điện năng lượng mặt trời..." />
                    </Field>
                  </div>
                )}
              </div>
            ))}
          </div>

          <button onClick={addSlide} className="mt-3 flex items-center gap-2 text-sm text-brand font-medium hover:text-brand-dark transition-colors">
            <Plus size={16} /> Thêm slide mới
          </button>
        </Section>

        {/* ── Page Hero Backgrounds ── */}
        <Section icon="🖼" title="Hình nền các trang (Page Hero Backgrounds)">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {PAGE_HEROES.map(({ key, label }) => (
              <Field key={key} label={label}>
                <ImageUpload value={form[key] as string} onChange={(u) => set(key, u)} />
              </Field>
            ))}
          </div>
        </Section>

        {/* ── Homepage Section Backgrounds ── */}
        <Section icon="🏠" title="Trang chủ – Hình nền các khối (Homepage Sections)">
          <p className="text-xs text-gray-500 mb-4">Mỗi khối có thể có hình nền riêng. Nếu không tải lên, khối sẽ dùng màu nền mặc định.</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <Field label="Khối CSR – Ảnh minh họa">
              <ImageUpload value={form.csrImage} onChange={(u) => set('csrImage', u)} />
            </Field>
            <Field label="Khối Sản phẩm – Hình nền">
              <ImageUpload value={form.productsSectionBg} onChange={(u) => set('productsSectionBg', u)} />
            </Field>
            <Field label="Khối Thống kê – Hình nền">
              <ImageUpload value={form.statsSectionBg} onChange={(u) => set('statsSectionBg', u)} />
            </Field>
            <Field label="Khối Testimonial – Hình nền">
              <ImageUpload value={form.testimonialsSectionBg} onChange={(u) => set('testimonialsSectionBg', u)} />
            </Field>
            <Field label="Khối Tin tức – Hình nền">
              <ImageUpload value={form.newsSectionBg} onChange={(u) => set('newsSectionBg', u)} />
            </Field>
            <Field label="Khối Liên hệ – Hình nền">
              <ImageUpload value={form.contactSectionBg} onChange={(u) => set('contactSectionBg', u)} />
            </Field>
          </div>
        </Section>

        {/* ── Sustainability Banner ── */}
        <Section icon="🌿" title="Sustainability Banner">
          <Field label="Hình nền banner">
            <ImageUpload value={form.sustainabilityBgImage} onChange={(u) => set('sustainabilityBgImage', u)} />
          </Field>
        </Section>

        {/* ── Section Titles ── */}
        <Section icon="✏️" title="Tiêu đề các Section (Section Titles)">
          <p className="text-xs text-gray-500 mb-4">Ghi đè tiêu đề mặc định của các khối nội dung trên từng trang. Để trống sẽ dùng nội dung mặc định.</p>
          <LanguageTabs value={lang} onChange={setLang} />
          <div className="space-y-6 mt-4">

            {/* Homepage */}
            <div>
              <h4 className="text-xs font-semibold uppercase tracking-widest text-gray-400 mb-3">🏠 Trang chủ (Homepage)</h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <Field label="Chứng nhận — tiêu đề"><input className="input-field" value={form.sectionTitles.home.certTitle[lang]} onChange={(e) => setSectionTitle('home', 'certTitle', lang, e.target.value)} placeholder="Chứng nhận & Đối tác" /></Field>
                <Field label="CSR — badge"><input className="input-field" value={form.sectionTitles.home.csrBadge[lang]} onChange={(e) => setSectionTitle('home', 'csrBadge', lang, e.target.value)} placeholder="VD: Trách nhiệm xã hội" /></Field>
                <Field label="CSR — tiêu đề"><input className="input-field" value={form.sectionTitles.home.csrTitle[lang]} onChange={(e) => setSectionTitle('home', 'csrTitle', lang, e.target.value)} placeholder="Thực tế từ hành trình CSR..." /></Field>
                <Field label="CSR — mô tả"><input className="input-field" value={form.sectionTitles.home.csrDesc[lang]} onChange={(e) => setSectionTitle('home', 'csrDesc', lang, e.target.value)} placeholder="Mô tả ngắn về dự án CSR..." /></Field>
                <Field label="Sản phẩm — tiêu đề"><input className="input-field" value={form.sectionTitles.home.productsTitle[lang]} onChange={(e) => setSectionTitle('home', 'productsTitle', lang, e.target.value)} placeholder="Combo sản phẩm nổi bật" /></Field>
                <Field label="Sản phẩm — phụ đề"><input className="input-field" value={form.sectionTitles.home.productsSubtitle[lang]} onChange={(e) => setSectionTitle('home', 'productsSubtitle', lang, e.target.value)} placeholder="Giải pháp trọn gói năng lượng..." /></Field>
                <Field label="Thống kê — tiêu đề"><input className="input-field" value={form.sectionTitles.home.statsTitle[lang]} onChange={(e) => setSectionTitle('home', 'statsTitle', lang, e.target.value)} placeholder="TBSolaro tự hào" /></Field>
                <Field label="Thống kê — phụ đề"><input className="input-field" value={form.sectionTitles.home.statsSubtitle[lang]} onChange={(e) => setSectionTitle('home', 'statsSubtitle', lang, e.target.value)} placeholder="Những con số nói lên..." /></Field>
                <Field label="Testimonial — tiêu đề"><input className="input-field" value={form.sectionTitles.home.testimonialTitle[lang]} onChange={(e) => setSectionTitle('home', 'testimonialTitle', lang, e.target.value)} placeholder="Trải nghiệm thực tế từ người dùng" /></Field>
                <Field label="Testimonial — phụ đề"><input className="input-field" value={form.sectionTitles.home.testimonialSubtitle[lang]} onChange={(e) => setSectionTitle('home', 'testimonialSubtitle', lang, e.target.value)} placeholder="Hàng nghìn khách hàng đã tin tưởng..." /></Field>
                <Field label="Tin tức — tiêu đề"><input className="input-field" value={form.sectionTitles.home.blogTitle[lang]} onChange={(e) => setSectionTitle('home', 'blogTitle', lang, e.target.value)} placeholder="Tin tức & Truyền thông" /></Field>
                <Field label="Tin tức — phụ đề"><input className="input-field" value={form.sectionTitles.home.blogSubtitle[lang]} onChange={(e) => setSectionTitle('home', 'blogSubtitle', lang, e.target.value)} placeholder="Cập nhật mới nhất..." /></Field>
              </div>
            </div>

            {/* Products page */}
            <div>
              <h4 className="text-xs font-semibold uppercase tracking-widest text-gray-400 mb-3">📦 Trang Sản phẩm</h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <Field label="Combo nổi bật — tiêu đề"><input className="input-field" value={form.sectionTitles.products.featuredTitle[lang]} onChange={(e) => setSectionTitle('products', 'featuredTitle', lang, e.target.value)} placeholder="Combo sản phẩm" /></Field>
                <Field label="Combo nổi bật — phụ đề"><input className="input-field" value={form.sectionTitles.products.featuredSubtitle[lang]} onChange={(e) => setSectionTitle('products', 'featuredSubtitle', lang, e.target.value)} placeholder="Bộ giải pháp năng lượng..." /></Field>
                <Field label="Tất cả sản phẩm — tiêu đề"><input className="input-field" value={form.sectionTitles.products.allTitle[lang]} onChange={(e) => setSectionTitle('products', 'allTitle', lang, e.target.value)} placeholder="Tất cả sản phẩm" /></Field>
              </div>
            </div>

            {/* Projects page */}
            <div>
              <h4 className="text-xs font-semibold uppercase tracking-widest text-gray-400 mb-3">🏗️ Trang Dự án</h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <Field label="Quy mô triển khai — tiêu đề"><input className="input-field" value={form.sectionTitles.projects.scaleTitle[lang]} onChange={(e) => setSectionTitle('projects', 'scaleTitle', lang, e.target.value)} placeholder="Dự án triển khai ở nhiều quy mô" /></Field>
                <Field label="Quy mô triển khai — phụ đề"><input className="input-field" value={form.sectionTitles.projects.scaleSubtitle[lang]} onChange={(e) => setSectionTitle('projects', 'scaleSubtitle', lang, e.target.value)} placeholder="Đáp ứng nhu cầu đa dạng..." /></Field>
              </div>
            </div>

            {/* About page */}
            <div>
              <h4 className="text-xs font-semibold uppercase tracking-widest text-gray-400 mb-3">🏢 Trang Giới thiệu (About)</h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <Field label="Lịch sử — tiêu đề"><input className="input-field" value={form.sectionTitles.about.historyTitle[lang]} onChange={(e) => setSectionTitle('about', 'historyTitle', lang, e.target.value)} placeholder="Lịch sử hình thành" /></Field>
                <Field label="Lịch sử — phụ đề"><input className="input-field" value={form.sectionTitles.about.historySubtitle[lang]} onChange={(e) => setSectionTitle('about', 'historySubtitle', lang, e.target.value)} placeholder="Chặng đường phát triển..." /></Field>
                <Field label="Tại sao chọn — tiêu đề"><input className="input-field" value={form.sectionTitles.about.whyTitle[lang]} onChange={(e) => setSectionTitle('about', 'whyTitle', lang, e.target.value)} placeholder="Tại sao chọn TBSolaro" /></Field>
                <Field label="Tại sao chọn — phụ đề"><input className="input-field" value={form.sectionTitles.about.whySubtitle[lang]} onChange={(e) => setSectionTitle('about', 'whySubtitle', lang, e.target.value)} placeholder="Ba giá trị cốt lõi..." /></Field>
                <Field label="Quy trình — tiêu đề"><input className="input-field" value={form.sectionTitles.about.processTitle[lang]} onChange={(e) => setSectionTitle('about', 'processTitle', lang, e.target.value)} placeholder="Quy trình sản xuất" /></Field>
                <Field label="Quy trình — phụ đề"><input className="input-field" value={form.sectionTitles.about.processSubtitle[lang]} onChange={(e) => setSectionTitle('about', 'processSubtitle', lang, e.target.value)} placeholder="Quy trình sản xuất nghiêm ngặt..." /></Field>
                <Field label="Đối tác — tiêu đề"><input className="input-field" value={form.sectionTitles.about.partnersTitle[lang]} onChange={(e) => setSectionTitle('about', 'partnersTitle', lang, e.target.value)} placeholder="Đối tác & Đơn vị chứng nhận" /></Field>
              </div>
            </div>
          </div>
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
