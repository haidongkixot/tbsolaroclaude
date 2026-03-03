'use client';

import { useState } from 'react';
import { Plus, Edit, Trash2, GripVertical } from 'lucide-react';
import { getPublishedFAQs } from '@/lib/data/faq';
import type { FAQ } from '@/types';

export default function AdminFAQPage() {
  const [faqs, setFaqs] = useState<FAQ[]>(getPublishedFAQs());
  const [showForm, setShowForm] = useState(false);
  const [editingFaq, setEditingFaq] = useState<FAQ | null>(null);

  const deleteFaq = (id: string) => {
    if (confirm('Xóa câu hỏi này?')) setFaqs((prev) => prev.filter((f) => f.id !== id));
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">FAQs</h2>
          <p className="text-gray-500 text-sm mt-1">{faqs.length} câu hỏi</p>
        </div>
        <button onClick={() => { setEditingFaq(null); setShowForm(true); }} className="btn-primary text-sm">
          <Plus size={16} /> Thêm câu hỏi
        </button>
      </div>

      <div className="space-y-3">
        {faqs.map((faq, index) => (
          <div key={faq.id} className="bg-white rounded-2xl border border-gray-200 p-5 hover:shadow-sm transition-shadow">
            <div className="flex items-start gap-4">
              <div className="text-gray-300 cursor-grab mt-1">
                <GripVertical size={18} />
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-xs font-semibold text-brand bg-brand-surface px-2 py-0.5 rounded-full border border-brand/20">{faq.category}</span>
                  <span className="text-xs text-gray-400">#{index + 1}</span>
                </div>
                <h3 className="font-semibold text-gray-900 text-sm mb-1">{faq.question}</h3>
                <p className="text-gray-600 text-xs line-clamp-2 leading-relaxed">{faq.answer}</p>
              </div>
              <div className="flex items-center gap-2 shrink-0">
                <button onClick={() => { setEditingFaq(faq); setShowForm(true); }} className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"><Edit size={14} /></button>
                <button onClick={() => deleteFaq(faq.id)} className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"><Trash2 size={14} /></button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {showForm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl w-full max-w-lg max-h-[80vh] overflow-y-auto">
            <div className="px-6 py-5 border-b border-gray-100 flex items-center justify-between">
              <h3 className="font-bold text-gray-900">{editingFaq ? 'Sửa câu hỏi' : 'Thêm câu hỏi mới'}</h3>
              <button onClick={() => setShowForm(false)} className="text-gray-400 hover:text-gray-600 text-xl font-bold">×</button>
            </div>
            <div className="p-6 space-y-4">
              <div><label className="block text-sm font-medium text-gray-700 mb-1">Câu hỏi *</label><textarea rows={2} className="textarea-field" defaultValue={editingFaq?.question || ''} placeholder="Câu hỏi..." /></div>
              <div><label className="block text-sm font-medium text-gray-700 mb-1">Câu trả lời *</label><textarea rows={5} className="textarea-field" defaultValue={editingFaq?.answer || ''} placeholder="Câu trả lời chi tiết..." /></div>
              <div><label className="block text-sm font-medium text-gray-700 mb-1">Danh mục</label><input className="input-field" defaultValue={editingFaq?.category || ''} placeholder="Kỹ thuật, Chi phí, Lắp đặt..." /></div>
              <div><label className="block text-sm font-medium text-gray-700 mb-1">Thứ tự</label><input type="number" className="input-field" defaultValue={editingFaq?.sortOrder || 1} /></div>
            </div>
            <div className="px-6 py-4 border-t border-gray-100 flex gap-3 justify-end">
              <button onClick={() => setShowForm(false)} className="btn-outline text-sm px-5 py-2.5">Hủy</button>
              <button onClick={() => setShowForm(false)} className="btn-primary text-sm px-5 py-2.5">{editingFaq ? 'Cập nhật' : 'Thêm mới'}</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
