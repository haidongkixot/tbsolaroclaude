'use client';

import { useState, useEffect, useCallback } from 'react';
import { Plus, Edit, Trash2, GripVertical, Loader2 } from 'lucide-react';
import LanguageTabs, { type Locale } from '@/components/admin/LanguageTabs';

interface FAQ {
  id: string;
  questionVi: string; questionEn: string; questionEs: string;
  answerVi: string; answerEn: string; answerEs: string;
  category: string;
  sortOrder: number;
  status: string;
}

type FormState = Omit<FAQ, 'id'>;

const EMPTY: FormState = {
  questionVi: '', questionEn: '', questionEs: '',
  answerVi: '', answerEn: '', answerEs: '',
  category: '', sortOrder: 0, status: 'published',
};

export default function AdminFAQPage() {
  const [faqs, setFaqs] = useState<FAQ[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState<FormState>(EMPTY);
  const [lang, setLang] = useState<Locale>('vi');

  const load = useCallback(async () => {
    setLoading(true);
    const res = await fetch('/api/admin/faq');
    const data = await res.json();
    setFaqs(data.items ?? []);
    setLoading(false);
  }, []);

  useEffect(() => { load(); }, [load]);

  const openNew = () => { setEditingId(null); setForm(EMPTY); setLang('vi'); setShowForm(true); };
  const openEdit = (faq: FAQ) => {
    setEditingId(faq.id);
    setForm({
      questionVi: faq.questionVi, questionEn: faq.questionEn, questionEs: faq.questionEs,
      answerVi: faq.answerVi, answerEn: faq.answerEn, answerEs: faq.answerEs,
      category: faq.category, sortOrder: faq.sortOrder, status: faq.status,
    });
    setLang('vi');
    setShowForm(true);
  };

  const save = async () => {
    setSaving(true);
    const url = editingId ? `/api/admin/faq/${editingId}` : '/api/admin/faq';
    const method = editingId ? 'PUT' : 'POST';
    await fetch(url, { method, headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(form) });
    setSaving(false);
    setShowForm(false);
    load();
  };

  const remove = async (id: string) => {
    if (!confirm('Xóa câu hỏi này?')) return;
    await fetch(`/api/admin/faq/${id}`, { method: 'DELETE' });
    load();
  };

  const f = (key: keyof FormState, val: string | number) => setForm((p) => ({ ...p, [key]: val }));

  // Language suffix helper
  const l = lang.charAt(0).toUpperCase() + lang.slice(1) as 'Vi' | 'En' | 'Es';

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">FAQs</h2>
          <p className="text-gray-500 text-sm mt-1">{faqs.length} câu hỏi</p>
        </div>
        <button onClick={openNew} className="btn-primary text-sm"><Plus size={16} /> Thêm câu hỏi</button>
      </div>

      {loading ? (
        <div className="flex justify-center py-20"><Loader2 size={24} className="animate-spin text-brand" /></div>
      ) : faqs.length === 0 ? (
        <div className="text-center py-20 text-gray-400">Chưa có FAQ nào. Nhấn &quot;Thêm câu hỏi&quot; để bắt đầu.</div>
      ) : (
        <div className="space-y-3">
          {faqs.map((faq, index) => (
            <div key={faq.id} className="bg-white rounded-2xl border border-gray-200 p-5 hover:shadow-sm transition-shadow">
              <div className="flex items-start gap-4">
                <div className="text-gray-300 cursor-grab mt-1"><GripVertical size={18} /></div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-xs font-semibold text-brand bg-brand-surface px-2 py-0.5 rounded-full border border-brand/20">{faq.category || 'Chung'}</span>
                    <span className="text-xs text-gray-400">#{index + 1}</span>
                    <span className={`text-xs px-2 py-0.5 rounded-full ${faq.status === 'published' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-500'}`}>
                      {faq.status === 'published' ? 'Đã xuất bản' : 'Nháp'}
                    </span>
                  </div>
                  <h3 className="font-semibold text-gray-900 text-sm mb-1">{faq.questionVi}</h3>
                  <p className="text-gray-600 text-xs line-clamp-2 leading-relaxed">{faq.answerVi}</p>
                  {(faq.questionEn || faq.questionEs) && (
                    <div className="flex gap-2 mt-2">
                      {faq.questionEn && <span className="text-[10px] px-1.5 py-0.5 bg-blue-50 text-blue-600 rounded">EN</span>}
                      {faq.questionEs && <span className="text-[10px] px-1.5 py-0.5 bg-orange-50 text-orange-600 rounded">ES</span>}
                    </div>
                  )}
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <button onClick={() => openEdit(faq)} className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"><Edit size={14} /></button>
                  <button onClick={() => remove(faq.id)} className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"><Trash2 size={14} /></button>
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
              <h3 className="font-bold text-gray-900">{editingId ? 'Sửa câu hỏi' : 'Thêm câu hỏi mới'}</h3>
              <button onClick={() => setShowForm(false)} className="text-gray-400 hover:text-gray-600 text-xl font-bold">&times;</button>
            </div>
            <div className="p-6 space-y-4">
              <LanguageTabs value={lang} onChange={setLang} />

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Câu hỏi ({lang.toUpperCase()}) {lang === 'vi' && '*'}
                </label>
                <textarea
                  rows={2}
                  className="textarea-field"
                  value={(form as unknown as Record<string, string>)[`question${l}`] ?? ''}
                  onChange={(e) => f(`question${l}` as keyof FormState, e.target.value)}
                  placeholder={lang === 'vi' ? 'Câu hỏi...' : lang === 'en' ? 'Question...' : 'Pregunta...'}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Câu trả lời ({lang.toUpperCase()}) {lang === 'vi' && '*'}
                </label>
                <textarea
                  rows={5}
                  className="textarea-field"
                  value={(form as unknown as Record<string, string>)[`answer${l}`] ?? ''}
                  onChange={(e) => f(`answer${l}` as keyof FormState, e.target.value)}
                  placeholder={lang === 'vi' ? 'Câu trả lời chi tiết...' : lang === 'en' ? 'Detailed answer...' : 'Respuesta detallada...'}
                />
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Danh mục</label>
                  <input className="input-field" value={form.category} onChange={(e) => f('category', e.target.value)} placeholder="Kỹ thuật, Chi phí..." />
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
              <button onClick={save} disabled={saving || !form.questionVi} className="btn-primary text-sm px-5 py-2.5 disabled:opacity-50">
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