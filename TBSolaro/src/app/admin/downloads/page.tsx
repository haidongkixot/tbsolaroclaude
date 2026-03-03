'use client';

import { useState } from 'react';
import { Plus, Edit, Trash2, Download, FileText } from 'lucide-react';
import { getPublishedDocuments } from '@/lib/data/downloads';
import type { DownloadDocument } from '@/types';

export default function AdminDownloadsPage() {
  const [documents, setDocuments] = useState<DownloadDocument[]>(getPublishedDocuments());
  const [showForm, setShowForm] = useState(false);
  const [editingDoc, setEditingDoc] = useState<DownloadDocument | null>(null);

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Tài liệu tải về</h2>
          <p className="text-gray-500 text-sm mt-1">{documents.length} tài liệu</p>
        </div>
        <button onClick={() => { setEditingDoc(null); setShowForm(true); }} className="btn-primary text-sm">
          <Plus size={16} /> Thêm tài liệu
        </button>
      </div>

      <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="text-left px-6 py-4 font-semibold text-gray-600">Tài liệu</th>
              <th className="text-left px-4 py-4 font-semibold text-gray-600">Danh mục</th>
              <th className="text-left px-4 py-4 font-semibold text-gray-600">Loại</th>
              <th className="text-left px-4 py-4 font-semibold text-gray-600">Phiên bản</th>
              <th className="text-right px-6 py-4 font-semibold text-gray-600">Thao tác</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {documents.map((doc) => (
              <tr key={doc.id} className="hover:bg-gray-50/50 transition-colors">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-brand-surface border border-brand/10 flex items-center justify-center shrink-0">
                      <FileText size={18} className="text-brand" />
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
                <td className="px-6 py-4">
                  <div className="flex items-center justify-end gap-2">
                    <a href={doc.fileUrl} className="p-2 text-gray-400 hover:text-brand hover:bg-brand-surface rounded-lg transition-colors" title="Tải xuống"><Download size={14} /></a>
                    <button onClick={() => { setEditingDoc(doc); setShowForm(true); }} className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"><Edit size={14} /></button>
                    <button onClick={() => setDocuments((prev) => prev.filter((d) => d.id !== doc.id))} className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"><Trash2 size={14} /></button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showForm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl w-full max-w-lg max-h-[80vh] overflow-y-auto">
            <div className="px-6 py-5 border-b border-gray-100 flex items-center justify-between">
              <h3 className="font-bold text-gray-900">{editingDoc ? 'Sửa tài liệu' : 'Thêm tài liệu mới'}</h3>
              <button onClick={() => setShowForm(false)} className="text-gray-400 hover:text-gray-600 text-xl font-bold">×</button>
            </div>
            <div className="p-6 space-y-4">
              <div><label className="block text-sm font-medium text-gray-700 mb-1">Tiêu đề *</label><input className="input-field" defaultValue={editingDoc?.title || ''} placeholder="Tên tài liệu" /></div>
              <div><label className="block text-sm font-medium text-gray-700 mb-1">Mô tả</label><textarea rows={2} className="textarea-field" defaultValue={editingDoc?.description || ''} placeholder="Mô tả nội dung tài liệu..." /></div>
              <div className="grid grid-cols-2 gap-4">
                <div><label className="block text-sm font-medium text-gray-700 mb-1">Loại file</label><select className="input-field bg-white" defaultValue={editingDoc?.fileType || 'PDF'}><option>PDF</option><option>DOCX</option><option>XLSX</option><option>ZIP</option></select></div>
                <div><label className="block text-sm font-medium text-gray-700 mb-1">Phiên bản</label><input className="input-field" defaultValue={editingDoc?.version || ''} placeholder="v1.0" /></div>
              </div>
              <div><label className="block text-sm font-medium text-gray-700 mb-1">Danh mục</label><input className="input-field" defaultValue={editingDoc?.category || ''} placeholder="Thông số kỹ thuật, Catalog..." /></div>
              <div><label className="block text-sm font-medium text-gray-700 mb-1">URL File</label><input className="input-field" defaultValue={editingDoc?.fileUrl || ''} placeholder="/downloads/file.pdf" /></div>
            </div>
            <div className="px-6 py-4 border-t border-gray-100 flex gap-3 justify-end">
              <button onClick={() => setShowForm(false)} className="btn-outline text-sm px-5 py-2.5">Hủy</button>
              <button onClick={() => setShowForm(false)} className="btn-primary text-sm px-5 py-2.5">{editingDoc ? 'Cập nhật' : 'Thêm mới'}</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
