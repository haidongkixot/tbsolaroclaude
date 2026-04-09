'use client';

import { useState, useEffect, useCallback } from 'react';
import { Plus, Edit, Trash2, MapPin, Phone, Clock, Mail, Loader2 } from 'lucide-react';

interface Showroom {
  id: string;
  name: string;
  address: string;
  phone: string;
  email: string;
  openingHours: string;
  mapEmbed: string;
  lat: number | null;
  lng: number | null;
  gallery: string;
  status: string;
  sortOrder: number;
}

const EMPTY: Omit<Showroom, 'id'> = {
  name: '', address: '', phone: '', email: '', openingHours: '',
  mapEmbed: '', lat: null, lng: null, gallery: '[]', status: 'published', sortOrder: 0,
};

export default function AdminShowroomsPage() {
  const [showrooms, setShowrooms] = useState<Showroom[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState(EMPTY);

  const load = useCallback(async () => {
    setLoading(true);
    const res = await fetch('/api/admin/showrooms');
    const data = await res.json();
    setShowrooms(data.items ?? []);
    setLoading(false);
  }, []);

  useEffect(() => { load(); }, [load]);

  const openNew = () => { setEditingId(null); setForm(EMPTY); setShowForm(true); };
  const openEdit = (s: Showroom) => {
    setEditingId(s.id);
    setForm({ name: s.name, address: s.address, phone: s.phone, email: s.email, openingHours: s.openingHours, mapEmbed: s.mapEmbed, lat: s.lat, lng: s.lng, gallery: s.gallery, status: s.status, sortOrder: s.sortOrder });
    setShowForm(true);
  };

  const save = async () => {
    setSaving(true);
    const url = editingId ? `/api/admin/showrooms/${editingId}` : '/api/admin/showrooms';
    const method = editingId ? 'PUT' : 'POST';
    await fetch(url, { method, headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(form) });
    setSaving(false);
    setShowForm(false);
    load();
  };

  const remove = async (id: string) => {
    if (!confirm('Xóa showroom này?')) return;
    await fetch(`/api/admin/showrooms/${id}`, { method: 'DELETE' });
    load();
  };

  const f = (key: keyof typeof EMPTY, val: string | number | null) => setForm((p) => ({ ...p, [key]: val }));

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Showroom</h2>
          <p className="text-gray-500 text-sm mt-1">{showrooms.length} showroom</p>
        </div>
        <button onClick={openNew} className="btn-primary text-sm"><Plus size={16} /> Thêm showroom</button>
      </div>

      {loading ? (
        <div className="flex justify-center py-20"><Loader2 size={24} className="animate-spin text-brand" /></div>
      ) : showrooms.length === 0 ? (
        <div className="text-center py-20 text-gray-400">Chưa có showroom nào. Nhấn &quot;Thêm showroom&quot; để bắt đầu.</div>
      ) : (
        <div className="grid md:grid-cols-3 gap-5">
          {showrooms.map((s) => (
            <div key={s.id} className="bg-white rounded-2xl border border-gray-200 p-5 hover:shadow-md transition-shadow">
              <div className="flex items-start justify-between mb-4">
                <h3 className="font-bold text-gray-900 text-sm">{s.name}</h3>
                <div className="flex gap-1">
                  <button onClick={() => openEdit(s)} className="p-1.5 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"><Edit size={13} /></button>
                  <button onClick={() => remove(s.id)} className="p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"><Trash2 size={13} /></button>
                </div>
              </div>
              <div className="space-y-2 text-xs text-gray-600">
                {s.address && <div className="flex gap-2"><MapPin size={12} className="text-brand shrink-0 mt-0.5" /><span>{s.address}</span></div>}
                {s.phone && <div className="flex gap-2"><Phone size={12} className="text-brand shrink-0" /><span>{s.phone}</span></div>}
                {s.email && <div className="flex gap-2"><Mail size={12} className="text-brand shrink-0" /><span>{s.email}</span></div>}
                {s.openingHours && <div className="flex gap-2"><Clock size={12} className="text-brand shrink-0" /><span>{s.openingHours}</span></div>}
              </div>
              <div className="mt-4 pt-4 border-t border-gray-100 flex items-center justify-between">
                <span className={`inline-flex items-center gap-1 text-xs font-medium px-2.5 py-0.5 rounded-full ${s.status === 'published' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-600'}`}>
                  <span className={`w-1.5 h-1.5 rounded-full ${s.status === 'published' ? 'bg-green-500' : 'bg-gray-400'}`} />
                  {s.status === 'published' ? 'Hoạt động' : 'Nháp'}
                </span>
                <span className="text-xs text-gray-400">#{s.sortOrder}</span>
              </div>
            </div>
          ))}
        </div>
      )}

      {showForm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl w-full max-w-lg max-h-[80vh] overflow-y-auto">
            <div className="px-6 py-5 border-b border-gray-100 flex items-center justify-between">
              <h3 className="font-bold text-gray-900">{editingId ? 'Sửa showroom' : 'Thêm showroom mới'}</h3>
              <button onClick={() => setShowForm(false)} className="text-gray-400 hover:text-gray-600 text-xl font-bold">&times;</button>
            </div>
            <div className="p-6 space-y-4">
              <div><label className="block text-sm font-medium text-gray-700 mb-1">Tên showroom *</label><input className="input-field" value={form.name} onChange={(e) => f('name', e.target.value)} placeholder="Showroom 1 – Trung tâm" /></div>
              <div><label className="block text-sm font-medium text-gray-700 mb-1">Địa chỉ *</label><textarea rows={2} className="textarea-field" value={form.address} onChange={(e) => f('address', e.target.value)} placeholder="Địa chỉ đầy đủ..." /></div>
              <div className="grid grid-cols-2 gap-4">
                <div><label className="block text-sm font-medium text-gray-700 mb-1">Điện thoại</label><input className="input-field" value={form.phone} onChange={(e) => f('phone', e.target.value)} placeholder="+84 ---" /></div>
                <div><label className="block text-sm font-medium text-gray-700 mb-1">Email</label><input type="email" className="input-field" value={form.email} onChange={(e) => f('email', e.target.value)} placeholder="email@..." /></div>
              </div>
              <div><label className="block text-sm font-medium text-gray-700 mb-1">Giờ mở cửa</label><input className="input-field" value={form.openingHours} onChange={(e) => f('openingHours', e.target.value)} placeholder="8:00 AM – 5:00 PM (Mon - Fri)" /></div>
              <div><label className="block text-sm font-medium text-gray-700 mb-1">Map Embed (iframe)</label><textarea rows={2} className="textarea-field" value={form.mapEmbed} onChange={(e) => f('mapEmbed', e.target.value)} placeholder="<iframe src=... />" /></div>
              <div className="grid grid-cols-2 gap-4">
                <div><label className="block text-sm font-medium text-gray-700 mb-1">Thứ tự</label><input type="number" className="input-field" value={form.sortOrder} onChange={(e) => f('sortOrder', parseInt(e.target.value) || 0)} /></div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Trạng thái</label>
                  <select className="input-field bg-white" value={form.status} onChange={(e) => f('status', e.target.value)}>
                    <option value="published">Hoạt động</option>
                    <option value="draft">Nháp</option>
                  </select>
                </div>
              </div>
            </div>
            <div className="px-6 py-4 border-t border-gray-100 flex gap-3 justify-end">
              <button onClick={() => setShowForm(false)} className="btn-outline text-sm px-5 py-2.5">Hủy</button>
              <button onClick={save} disabled={saving || !form.name} className="btn-primary text-sm px-5 py-2.5 disabled:opacity-50">
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