'use client';

import { useState } from 'react';
import { Plus, Edit, Trash2, MapPin, Phone, Clock } from 'lucide-react';
import { getPublishedShowrooms } from '@/lib/data/showrooms';
import type { Showroom } from '@/types';

export default function AdminShowroomsPage() {
  const [showrooms, setShowrooms] = useState<Showroom[]>(getPublishedShowrooms());
  const [showForm, setShowForm] = useState(false);
  const [editingShowroom, setEditingShowroom] = useState<Showroom | null>(null);

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Showroom</h2>
          <p className="text-gray-500 text-sm mt-1">{showrooms.length} showroom</p>
        </div>
        <button onClick={() => { setEditingShowroom(null); setShowForm(true); }} className="btn-primary text-sm">
          <Plus size={16} /> Thêm showroom
        </button>
      </div>

      <div className="grid md:grid-cols-3 gap-5">
        {showrooms.map((showroom) => (
          <div key={showroom.id} className="bg-white rounded-2xl border border-gray-200 p-5 hover:shadow-md transition-shadow">
            <div className="flex items-start justify-between mb-4">
              <h3 className="font-bold text-gray-900 text-sm">{showroom.name}</h3>
              <div className="flex gap-1">
                <button onClick={() => { setEditingShowroom(showroom); setShowForm(true); }} className="p-1.5 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"><Edit size={13} /></button>
                <button onClick={() => setShowrooms((prev) => prev.filter((s) => s.id !== showroom.id))} className="p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"><Trash2 size={13} /></button>
              </div>
            </div>
            <div className="space-y-2 text-xs text-gray-600">
              <div className="flex gap-2"><MapPin size={12} className="text-brand shrink-0 mt-0.5" /><span>{showroom.address}</span></div>
              <div className="flex gap-2"><Phone size={12} className="text-brand shrink-0" /><span>{showroom.phone}</span></div>
              <div className="flex gap-2"><Clock size={12} className="text-brand shrink-0" /><span>{showroom.openingHours}</span></div>
            </div>
            <div className="mt-4 pt-4 border-t border-gray-100">
              <span className="inline-flex items-center gap-1 text-xs font-medium bg-green-100 text-green-700 px-2.5 py-0.5 rounded-full">
                <span className="w-1.5 h-1.5 rounded-full bg-green-500" /> Hoạt động
              </span>
            </div>
          </div>
        ))}
      </div>

      {showForm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl w-full max-w-lg max-h-[80vh] overflow-y-auto">
            <div className="px-6 py-5 border-b border-gray-100 flex items-center justify-between">
              <h3 className="font-bold text-gray-900">{editingShowroom ? 'Sửa showroom' : 'Thêm showroom mới'}</h3>
              <button onClick={() => setShowForm(false)} className="text-gray-400 hover:text-gray-600 text-xl font-bold">×</button>
            </div>
            <div className="p-6 space-y-4">
              <div><label className="block text-sm font-medium text-gray-700 mb-1">Tên showroom *</label><input className="input-field" defaultValue={editingShowroom?.name || ''} placeholder="Showroom 1 – Trung tâm" /></div>
              <div><label className="block text-sm font-medium text-gray-700 mb-1">Địa chỉ *</label><textarea rows={2} className="textarea-field" defaultValue={editingShowroom?.address || ''} placeholder="Địa chỉ đầy đủ..." /></div>
              <div className="grid grid-cols-2 gap-4">
                <div><label className="block text-sm font-medium text-gray-700 mb-1">Điện thoại</label><input className="input-field" defaultValue={editingShowroom?.phone || ''} placeholder="+84 ---" /></div>
                <div><label className="block text-sm font-medium text-gray-700 mb-1">Email</label><input type="email" className="input-field" defaultValue={editingShowroom?.email || ''} placeholder="email@..." /></div>
              </div>
              <div><label className="block text-sm font-medium text-gray-700 mb-1">Giờ mở cửa</label><input className="input-field" defaultValue={editingShowroom?.openingHours || ''} placeholder="8:00 AM – 5:00 PM (Mon - Fri)" /></div>
            </div>
            <div className="px-6 py-4 border-t border-gray-100 flex gap-3 justify-end">
              <button onClick={() => setShowForm(false)} className="btn-outline text-sm px-5 py-2.5">Hủy</button>
              <button onClick={() => setShowForm(false)} className="btn-primary text-sm px-5 py-2.5">{editingShowroom ? 'Cập nhật' : 'Thêm mới'}</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
