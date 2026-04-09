'use client';

import { useState, useEffect, useCallback } from 'react';
import { Plus, Edit, Trash2, Download, FileText, Loader2, Image as ImageIcon } from 'lucide-react';

interface Doc {
  id: string;
  title: string;
  description: string;
  fileUrl: string;
  fileType: string;
  category: string;
  version: string;
  featuredImage: string;
  icon: string;
  status: string;
  sortOrder: number;
}

type FormState = Omit<Doc, 'id'>;

const EMPTY: FormState = {
  title: '', description: '', fileUrl: '', fileType: 'PDF', category: '',
  version: '', featuredImage: '', icon: '', status: 'published', sortOrder: 0,
};

export default function AdminDownloadsPage() {
  const [documents, setDocuments] = useState<Doc[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState<FormState>(EMPTY);

  const load = useCallback(async () => {
    setLoading(true);
    const res = await fetch('/api/admin/downloads');
    const data = await res.json();
    setDocuments(data.items ?? []);
    setLoading(false);
  }, []);

  useEffect(() => { load(); }, [load]);

  const openNew = () => { setEditingId(null); setForm(EMPTY); setShowForm(true); };
  const openEdit = (doc: Doc) => {
    setEditingId(doc.id);
    setForm({
      title: doc.title, description: doc.description, fileUrl: doc.fileUrl,
      fileType: doc.fileType, category: doc.category, version: doc.version,
      featuredImage: doc.featuredImage, icon: doc.icon, status: doc.status, sortOrder: doc.sortOrder,
    });
    setShowForm(true);
  };

  const save = async () => {
    setSaving(true);
    const url = editingId ? `/api/admin/downloads/${editingId}` : '/api/admin/downloads';
    const method = editingId ? 'PUT' : 'POST';
    await fetch(url, { method, headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(form) });
    setSaving(false);
    setShowForm(false);
    load();
  };

  const remove = async (id: string) => {
    if (!confirm('Xóa tài liệu này?')) return;
    await fetch(`/api/admin/downloads/${id}`, { method: 'DELETE' });
    load();
  };

  const f = (key: keyof FormState, val: string | number) => setForm((p) => ({ ...p, [key]: val }));

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Tài liệu tải về</h2>
          <p className="text-gray-500 text-sm mt-1">{documents.length} tài liệu</p>
        </div>
        <button onClick={openNew} className="btn-primary text-sm"><Plus size={16} /> Thêm tài liệu</button>
      </div>

      {loading ? (
        <div className="flex justify-center py-20"><Loader2 size={24} className="animate-spin text-brand" /></div>
      ) : documents.length === 0 ? (
        <div className="text-center py-20 text-gray-400">Chưa có tài liệu nào.</div>
      ) : (
        <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="text-left px-6 py-4 font-semibold text-gray-600">Tài liệu</th>
                <th className="text-left px-4 py-4 font-semibold text-gray-600">Danh mục</th>
                <th className="text-left px-4 py-4 font-semibold text-gray-600">Loại</th>
                <th className="text-left px-4 py-4 font-semibold text-gray-600">Phiên bản</th>
                <th className="text-left px-4 py-4 font-semibold text-gray-600">Icon</th>
                <th className="text-right px-6 py-4 font-semibold text-gray-600">Thao tác</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {documents.map((doc) => (
                <tr key={doc.id} className="hover:bg-gray-50/50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-brand-surface border border-brand/10 flex items-center justify-center shrink-0 overflow-hidden">
                        {doc.icon ? (
                          <img src={doc.icon} alt="" className="w-6 h-6 object-contain" />
                        ) : (
                          <FileText size={18} className="text-brand" />
                        )}
                      </div>
                      <div>
                        <p className="font-semibold text-gray-900 line-clamp-1">{doc.title}</p>
                        <p className="text-xs text-gray-400 line-clamp-1">{doc.description}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-4 text-xs text-gray-600">{doc.category}</td>
                  <td className="px-4 py-4">
                    <span className="inline-flex px-2.5 py-0.5 rounded-full bg-blue-50 text-blue-700 text-xs font-medium">{doc.fileType}</span>
                  </td>
                  <td className="px-4 py-4 text-xs text-gray-500">{doc.version || '—'}</td>
                  <td className="px-4 py-4">
                    {doc.icon ? (
                      <img src={doc.icon} alt="" className="w-8 h-8 object-contain rounded" />
                    ) : (
                      <span className="text-xs text-gray-400">—</span>
                    )}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center justify-end gap-2">
                      {doc.fileUrl && (
                        <a href={doc.fileUrl} className="p-2 text-gray-400 hover:text-brand hover:bg-brand-surface rounded-lg transition-colors" title="Tải xuống"><Download size={14} /></a>
                      )}
                      <button onClick={() => openEdit(doc)} className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"><Edit size={14} /></button>
                      <button onClick={() => remove(doc.id)} className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"><Trash2 size={14} /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {showForm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl w-full max-w-lg max-h-[80vh] overflow-y-auto">
            <div className="px-6 py-5 border-b border-gray-100 flex items-center justify-between">
              <h3 className="font-bold text-gray-900">{editingId ? 'Sửa tài liệu' : 'Thêm tài liệu mới'}</h3>
              <button onClick={() => setShowForm(false)} className="text-gray-400 hover:text-gray-600 text-xl font-bold">&times;</button>
            </div>
            <div className="p-6 space-y-4">
              <div><label className="block text-sm font-medium text-gray-700 mb-1">Tiêu đề *</label><input className="input-field" value={form.title} onChange={(e) => f('title', e.target.value)} placeholder="Tên tài liệu" /></div>
              <div><label className="block text-sm font-medium text-gray-700 mb-1">Mô tả</label><textarea rows={2} className="textarea-field" value={form.description} onChange={(e) => f('description', e.target.value)} placeholder="Mô tả nội dung tài liệu..." /></div>
              <div className="grid grid-cols-2 gap-4">
                <div><label className="block text-sm font-medium text-gray-700 mb-1">Loại file</label><select className="input-field bg-white" value={form.fileType} onChange={(e) => f('fileType', e.target.value)}><option>PDF</option><option>DOCX</option><option>XLSX</option><option>ZIP</option></select></div>
                <div><label className="block text-sm font-medium text-gray-700 mb-1">Phiên bản</label><input className="input-field" value={form.version} onChange={(e) => f('version', e.target.value)} placeholder="v1.0" /></div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div><label className="block text-sm font-medium text-gray-700 mb-1">Danh mục</label><input className="input-field" value={form.category} onChange={(e) => f('category', e.target.value)} placeholder="Thông số kỹ thuật, Catalog..." /></div>
                <div><label className="block text-sm font-medium text-gray-700 mb-1">Thứ tự</label><input type="number" className="input-field" value={form.sortOrder} onChange={(e) => f('sortOrder', parseInt(e.target.value) || 0)} /></div>
              </div>
              <div><label className="block text-sm font-medium text-gray-700 mb-1">URL File</label><input className="input-field" value={form.fileUrl} onChange={(e) => f('fileUrl', e.target.value)} placeholder="/downloads/file.pdf" /></div>
              <div><label className="block text-sm font-medium text-gray-700 mb-1">Ảnh đại diện (URL)</label><input className="input-field" value={form.featuredImage} onChange={(e) => f('featuredImage', e.target.value)} placeholder="https://..." /></div>

              {/* Icon field */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  <span className="flex items-center gap-1.5"><ImageIcon size={14} /> Icon / Logo (URL ảnh)</span>
                </label>
                <input className="input-field" value={form.icon} onChange={(e) => f('icon', e.target.value)} placeholder="https://... (icon chứng chỉ, logo nhà sản xuất...)" />
                {form.icon && (
                  <div className="mt-2 flex items-center gap-3">
                    <div className="w-12 h-12 rounded-lg border border-gray-200 flex items-center justify-center overflow-hidden bg-gray-50">
                      <img src={form.icon} alt="Icon preview" className="w-8 h-8 object-contain" />
                    </div>
                    <span className="text-xs text-gray-400">Xem trước icon</span>
                  </div>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Trạng thái</label>
                <select className="input-field bg-white" value={form.status} onChange={(e) => f('status', e.target.value)}>
                  <option value="published">Xuất bản</option>
                  <option value="draft">Nháp</option>
                </select>
              </div>
            </div>
            <div className="px-6 py-4 border-t border-gray-100 flex gap-3 justify-end">
              <button onClick={() => setShowForm(false)} className="btn-outline text-sm px-5 py-2.5">Hủy</button>
              <button onClick={save} disabled={saving || !form.title} className="btn-primary text-sm px-5 py-2.5 disabled:opacity-50">
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