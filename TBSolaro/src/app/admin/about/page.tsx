'use client';

import { useState, useEffect, useCallback } from 'react';
import { Save, Plus, Trash2, GripVertical } from 'lucide-react';
import LanguageTabs from '@/components/admin/LanguageTabs';
import type { TimelineItem, WhyUsItem, ProcessStep } from '@/lib/db/settings';

type Lang = 'vi' | 'en' | 'es';
type L = 'Vi' | 'En' | 'Es';

type Form = {
  heroBadgeVi: string; heroBadgeEn: string; heroBadgeEs: string;
  aboutTimeline: TimelineItem[];
  aboutWhyUs: WhyUsItem[];
  aboutProcess: ProcessStep[];
  aboutPartners: string;
};

const empty: Form = {
  heroBadgeVi: '', heroBadgeEn: '', heroBadgeEs: '',
  aboutTimeline: [], aboutWhyUs: [], aboutProcess: [],
  aboutPartners: '',
};

const emptyTimeline = (): TimelineItem => ({
  year: '', titleVi: '', titleEn: '', titleEs: '', descVi: '', descEn: '', descEs: '',
});
const emptyWhyUs = (): WhyUsItem => ({
  label: '', titleVi: '', titleEn: '', titleEs: '', descVi: '', descEn: '', descEs: '',
});
const emptyProcess = (): ProcessStep => ({
  num: '', titleVi: '', titleEn: '', titleEs: '', descVi: '', descEn: '', descEs: '',
});

export default function AdminAboutPage() {
  const [form, setForm] = useState<Form>(empty);
  const [lang, setLang] = useState<Lang>('vi');
  const [status, setStatus] = useState<'idle' | 'saving' | 'saved' | 'error'>('idle');
  const [expandedTimeline, setExpandedTimeline] = useState<number | null>(0);
  const [expandedWhyUs, setExpandedWhyUs] = useState<number | null>(0);
  const [expandedProcess, setExpandedProcess] = useState<number | null>(0);

  useEffect(() => {
    fetch('/api/admin/settings')
      .then((r) => r.json())
      .then((data) => {
        const parse = (v: string, fb: unknown[]) => {
          try { return JSON.parse(v || '[]'); } catch { return fb; }
        };
        setForm({
          heroBadgeVi: data.heroBadgeVi || '',
          heroBadgeEn: data.heroBadgeEn || '',
          heroBadgeEs: data.heroBadgeEs || '',
          aboutTimeline: parse(data.aboutTimeline, []) as TimelineItem[],
          aboutWhyUs: parse(data.aboutWhyUs, []) as WhyUsItem[],
          aboutProcess: parse(data.aboutProcess, []) as ProcessStep[],
          aboutPartners: data.aboutPartners || '',
        });
      })
      .catch(() => {});
  }, []);

  const set = useCallback((key: keyof Form, val: string) => {
    setForm((prev) => ({ ...prev, [key]: val }));
  }, []);

  const l: L = lang === 'en' ? 'En' : lang === 'es' ? 'Es' : 'Vi';

  // ── Timeline ──────────────────────────────────────────────────
  function updateTimeline(i: number, field: keyof TimelineItem, val: string) {
    setForm((prev) => {
      const items = [...prev.aboutTimeline];
      items[i] = { ...items[i], [field]: val };
      return { ...prev, aboutTimeline: items };
    });
  }
  function removeTimeline(i: number) {
    setForm((prev) => ({ ...prev, aboutTimeline: prev.aboutTimeline.filter((_, idx) => idx !== i) }));
    setExpandedTimeline(null);
  }
  function moveTimeline(i: number, dir: -1 | 1) {
    setForm((prev) => {
      const items = [...prev.aboutTimeline];
      const j = i + dir;
      if (j < 0 || j >= items.length) return prev;
      [items[i], items[j]] = [items[j], items[i]];
      return { ...prev, aboutTimeline: items };
    });
    setExpandedTimeline((e) => (e === i ? i + dir : e));
  }

  // ── Why Us ────────────────────────────────────────────────────
  function updateWhyUs(i: number, field: keyof WhyUsItem, val: string) {
    setForm((prev) => {
      const items = [...prev.aboutWhyUs];
      items[i] = { ...items[i], [field]: val };
      return { ...prev, aboutWhyUs: items };
    });
  }
  function removeWhyUs(i: number) {
    setForm((prev) => ({ ...prev, aboutWhyUs: prev.aboutWhyUs.filter((_, idx) => idx !== i) }));
    setExpandedWhyUs(null);
  }

  // ── Process ────────────────────────────────────────────────────
  function updateProcess(i: number, field: keyof ProcessStep, val: string) {
    setForm((prev) => {
      const items = [...prev.aboutProcess];
      items[i] = { ...items[i], [field]: val };
      return { ...prev, aboutProcess: items };
    });
  }
  function removeProcess(i: number) {
    setForm((prev) => ({ ...prev, aboutProcess: prev.aboutProcess.filter((_, idx) => idx !== i) }));
    setExpandedProcess(null);
  }

  // ── Save ──────────────────────────────────────────────────────
  async function handleSave() {
    setStatus('saving');
    try {
      const payload = {
        heroBadgeVi: form.heroBadgeVi,
        heroBadgeEn: form.heroBadgeEn,
        heroBadgeEs: form.heroBadgeEs,
        aboutTimeline: JSON.stringify(form.aboutTimeline),
        aboutWhyUs: JSON.stringify(form.aboutWhyUs),
        aboutProcess: JSON.stringify(form.aboutProcess),
        aboutPartners: form.aboutPartners,
      };
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

  const saveLabel = status === 'saving' ? 'Đang lưu...' : status === 'saved' ? 'Đã lưu!' : status === 'error' ? 'Lỗi!' : 'Lưu nội dung';
  const saveCls = status === 'saved' ? 'bg-green-600 hover:bg-green-700' : status === 'error' ? 'bg-red-600 hover:bg-red-700' : '';

  return (
    <div className="max-w-4xl">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Nội dung trang Về chúng tôi</h2>
          <p className="text-gray-500 text-sm mt-1">Hero badge, lịch sử, giá trị cốt lõi, quy trình sản xuất</p>
        </div>
        <button onClick={handleSave} disabled={status === 'saving'} className={`btn-primary text-sm ${saveCls}`}>
          <Save size={15} /> {saveLabel}
        </button>
      </div>

      <div className="space-y-6">

        {/* ── Hero Badge ── */}
        <Section icon="🏷️" title="Badge trên Hero Slider trang chủ">
          <p className="text-xs text-gray-500 mb-4">Dòng chữ nhỏ hiển thị phía trên tiêu đề trong banner trang chủ, ví dụ: &ldquo;Thành viên của Tập đoàn Thái Bình&rdquo;.</p>
          <LanguageTabs value={lang} onChange={setLang} />
          <Field label={`Nội dung badge (${lang.toUpperCase()})`}>
            <input
              className="input-field"
              value={form[`heroBadge${l}` as keyof Form] as string}
              onChange={(e) => set(`heroBadge${l}` as keyof Form, e.target.value)}
              placeholder="VD: Thành viên của Tập đoàn Thái Bình"
            />
          </Field>
        </Section>

        {/* ── Timeline / History ── */}
        <Section icon="📅" title="Lịch sử hình thành (History Timeline)">
          <p className="text-xs text-gray-500 mb-4">Các mốc lịch sử hiển thị trên trang About Us. Thêm và sắp xếp thứ tự các sự kiện.</p>
          <div className="space-y-3">
            {form.aboutTimeline.map((item, i) => (
              <div key={i} className="border border-gray-200 rounded-xl overflow-hidden">
                <div
                  className="flex items-center gap-3 px-4 py-3 bg-gray-50 cursor-pointer select-none"
                  onClick={() => setExpandedTimeline(expandedTimeline === i ? null : i)}
                >
                  <GripVertical size={16} className="text-gray-400 shrink-0" />
                  <div className="flex-1 min-w-0">
                    <span className="text-sm font-medium text-gray-700">
                      {item.year || '—'}{item.titleVi ? ` — ${item.titleVi.slice(0, 40)}` : ''}
                    </span>
                  </div>
                  <div className="flex items-center gap-1 shrink-0">
                    <button onClick={(e) => { e.stopPropagation(); moveTimeline(i, -1); }} disabled={i === 0} className="p-1 text-gray-400 hover:text-brand disabled:opacity-30">↑</button>
                    <button onClick={(e) => { e.stopPropagation(); moveTimeline(i, 1); }} disabled={i === form.aboutTimeline.length - 1} className="p-1 text-gray-400 hover:text-brand disabled:opacity-30">↓</button>
                    <button onClick={(e) => { e.stopPropagation(); removeTimeline(i); }} className="p-1 text-red-400 hover:text-red-600"><Trash2 size={14} /></button>
                  </div>
                </div>
                {expandedTimeline === i && (
                  <div className="p-4 space-y-4">
                    <Field label="Năm">
                      <input className="input-field" value={item.year} onChange={(e) => updateTimeline(i, 'year', e.target.value)} placeholder="VD: 2018" />
                    </Field>
                    <LanguageTabs value={lang} onChange={setLang} />
                    <Field label="Tiêu đề">
                      <input className="input-field" value={item[`title${l}` as keyof TimelineItem] as string} onChange={(e) => updateTimeline(i, `title${l}` as keyof TimelineItem, e.target.value)} placeholder="VD: Ra mắt TBSolaro" />
                    </Field>
                    <Field label="Mô tả">
                      <textarea rows={2} className="textarea-field" value={item[`desc${l}` as keyof TimelineItem] as string} onChange={(e) => updateTimeline(i, `desc${l}` as keyof TimelineItem, e.target.value)} placeholder="Mô tả sự kiện..." />
                    </Field>
                  </div>
                )}
              </div>
            ))}
          </div>
          <button
            onClick={() => { setForm((p) => ({ ...p, aboutTimeline: [...p.aboutTimeline, emptyTimeline()] })); setExpandedTimeline(form.aboutTimeline.length); }}
            className="mt-3 flex items-center gap-2 text-sm text-brand font-medium hover:text-brand-dark transition-colors"
          >
            <Plus size={16} /> Thêm mốc lịch sử
          </button>
        </Section>

        {/* ── Why Us ── */}
        <Section icon="⭐" title="Tại sao chọn TBSolaro (Why Us)">
          <p className="text-xs text-gray-500 mb-4">Các lý do nổi bật hiển thị trong phần &ldquo;Tại sao chọn TBSolaro&rdquo; trên trang About.</p>
          <div className="space-y-3">
            {form.aboutWhyUs.map((item, i) => (
              <div key={i} className="border border-gray-200 rounded-xl overflow-hidden">
                <div
                  className="flex items-center gap-3 px-4 py-3 bg-gray-50 cursor-pointer select-none"
                  onClick={() => setExpandedWhyUs(expandedWhyUs === i ? null : i)}
                >
                  <GripVertical size={16} className="text-gray-400 shrink-0" />
                  <span className="flex-1 text-sm font-medium text-gray-700">
                    {item.label || '—'}{item.titleVi ? ` — ${item.titleVi.slice(0, 40)}` : ''}
                  </span>
                  <button onClick={(e) => { e.stopPropagation(); removeWhyUs(i); }} className="p-1 text-red-400 hover:text-red-600"><Trash2 size={14} /></button>
                </div>
                {expandedWhyUs === i && (
                  <div className="p-4 space-y-4">
                    <Field label="Nhãn (1 ký tự, VD: A, B, C)">
                      <input className="input-field w-24" maxLength={3} value={item.label} onChange={(e) => updateWhyUs(i, 'label', e.target.value)} placeholder="A" />
                    </Field>
                    <LanguageTabs value={lang} onChange={setLang} />
                    <Field label="Tiêu đề">
                      <input className="input-field" value={item[`title${l}` as keyof WhyUsItem] as string} onChange={(e) => updateWhyUs(i, `title${l}` as keyof WhyUsItem, e.target.value)} placeholder="VD: Chất lượng vượt trội" />
                    </Field>
                    <Field label="Mô tả">
                      <textarea rows={2} className="textarea-field" value={item[`desc${l}` as keyof WhyUsItem] as string} onChange={(e) => updateWhyUs(i, `desc${l}` as keyof WhyUsItem, e.target.value)} placeholder="Mô tả..." />
                    </Field>
                  </div>
                )}
              </div>
            ))}
          </div>
          <button
            onClick={() => { setForm((p) => ({ ...p, aboutWhyUs: [...p.aboutWhyUs, emptyWhyUs()] })); setExpandedWhyUs(form.aboutWhyUs.length); }}
            className="mt-3 flex items-center gap-2 text-sm text-brand font-medium hover:text-brand-dark transition-colors"
          >
            <Plus size={16} /> Thêm lý do
          </button>
        </Section>

        {/* ── Production Process ── */}
        <Section icon="⚙️" title="Quy trình sản xuất (Production Process)">
          <p className="text-xs text-gray-500 mb-4">Các bước trong quy trình sản xuất hiển thị trên trang About.</p>
          <div className="space-y-3">
            {form.aboutProcess.map((item, i) => (
              <div key={i} className="border border-gray-200 rounded-xl overflow-hidden">
                <div
                  className="flex items-center gap-3 px-4 py-3 bg-gray-50 cursor-pointer select-none"
                  onClick={() => setExpandedProcess(expandedProcess === i ? null : i)}
                >
                  <GripVertical size={16} className="text-gray-400 shrink-0" />
                  <span className="flex-1 text-sm font-medium text-gray-700">
                    {item.num || '—'}{item.titleVi ? ` — ${item.titleVi.slice(0, 40)}` : ''}
                  </span>
                  <button onClick={(e) => { e.stopPropagation(); removeProcess(i); }} className="p-1 text-red-400 hover:text-red-600"><Trash2 size={14} /></button>
                </div>
                {expandedProcess === i && (
                  <div className="p-4 space-y-4">
                    <Field label="Số thứ tự (VD: 01)">
                      <input className="input-field w-24" value={item.num} onChange={(e) => updateProcess(i, 'num', e.target.value)} placeholder="01" />
                    </Field>
                    <LanguageTabs value={lang} onChange={setLang} />
                    <Field label="Tiêu đề bước">
                      <input className="input-field" value={item[`title${l}` as keyof ProcessStep] as string} onChange={(e) => updateProcess(i, `title${l}` as keyof ProcessStep, e.target.value)} placeholder="VD: Kiểm định nguyên vật liệu" />
                    </Field>
                    <Field label="Mô tả">
                      <textarea rows={2} className="textarea-field" value={item[`desc${l}` as keyof ProcessStep] as string} onChange={(e) => updateProcess(i, `desc${l}` as keyof ProcessStep, e.target.value)} placeholder="Mô tả bước này..." />
                    </Field>
                  </div>
                )}
              </div>
            ))}
          </div>
          <button
            onClick={() => { setForm((p) => ({ ...p, aboutProcess: [...p.aboutProcess, emptyProcess()] })); setExpandedProcess(form.aboutProcess.length); }}
            className="mt-3 flex items-center gap-2 text-sm text-brand font-medium hover:text-brand-dark transition-colors"
          >
            <Plus size={16} /> Thêm bước
          </button>
        </Section>

        {/* ── Partners ── */}
        <Section icon="🤝" title="Đối tác & Chứng nhận (Partners)">
          <Field label="Danh sách đối tác (phân cách bởi dấu phẩy)">
            <input
              className="input-field"
              value={form.aboutPartners}
              onChange={(e) => set('aboutPartners', e.target.value)}
              placeholder="VD: Buffer, Fronius, IEC, Huawei, Dropbox"
            />
          </Field>
          <p className="text-xs text-gray-400 mt-1">Nhập tên các đối tác, cách nhau bởi dấu phẩy.</p>
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
