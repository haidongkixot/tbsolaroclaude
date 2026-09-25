'use client';

import { useState, useEffect, useCallback } from 'react';
import { MessageSquare, Mail, Phone, Building2, Calendar, CheckCircle, Clock, XCircle, Loader2, Trash2, MapPin, Ruler, Save } from 'lucide-react';

interface Submission {
  id: string;
  type: string;      // "contact" | "booking"
  status: string;    // "new" | "reviewed" | "closed"
  source: string;
  name: string;
  email: string;
  phone: string;
  company: string;
  message: string;
  area: string;
  showroom: string;
  preferredTime: string;
  note: string;
  createdAt: string;
}

const statusConfig = {
  new: { label: 'Mới', icon: Clock, color: 'bg-blue-100 text-blue-700', dot: 'bg-blue-500' },
  reviewed: { label: 'Đã xem', icon: CheckCircle, color: 'bg-amber-100 text-amber-700', dot: 'bg-amber-500' },
  closed: { label: 'Đã đóng', icon: XCircle, color: 'bg-gray-100 text-gray-600', dot: 'bg-gray-400' },
};

type Status = keyof typeof statusConfig;

const typeConfig: Record<string, { label: string; color: string }> = {
  contact: { label: 'Liên hệ', color: 'bg-brand-surface text-brand border border-brand/20' },
  booking: { label: 'Đặt lịch', color: 'bg-purple-50 text-purple-700 border border-purple-200' },
};

export default function AdminSubmissionsPage() {
  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [filterStatus, setFilterStatus] = useState<Status | 'all'>('all');
  const [filterType, setFilterType] = useState<'all' | 'contact' | 'booking'>('all');
  const [noteDraft, setNoteDraft] = useState('');
  const [savingNote, setSavingNote] = useState(false);

  const load = useCallback(async () => {
    setLoading(true);
    const res = await fetch('/api/admin/submissions');
    const data = await res.json();
    setSubmissions(data.items ?? []);
    setLoading(false);
  }, []);

  useEffect(() => { load(); }, [load]);

  const filtered = submissions.filter(
    (s) => (filterStatus === 'all' || s.status === filterStatus) && (filterType === 'all' || s.type === filterType)
  );
  const selected = submissions.find((s) => s.id === selectedId);

  const patch = async (id: string, data: Record<string, string>) => {
    await fetch(`/api/admin/submissions/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    load();
  };

  const updateStatus = (id: string, status: Status) => patch(id, { status });

  const saveNote = async () => {
    if (!selected) return;
    setSavingNote(true);
    await patch(selected.id, { note: noteDraft });
    setSavingNote(false);
  };

  const remove = async (id: string) => {
    if (!confirm('Xóa tin nhắn này? Hành động không thể hoàn tác.')) return;
    await fetch(`/api/admin/submissions/${id}`, { method: 'DELETE' });
    if (selectedId === id) setSelectedId(null);
    load();
  };

  const select = (s: Submission) => { setSelectedId(s.id); setNoteDraft(s.note || ''); };

  return (
    <div>
      <div className="flex items-center justify-between mb-8 flex-wrap gap-3">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Liên hệ & Submissions</h2>
          <p className="text-gray-500 text-sm mt-1">{submissions.length} tin nhắn</p>
        </div>
        <div className="flex items-center gap-3 flex-wrap">
          <div className="flex items-center gap-2">
            {(['all', 'contact', 'booking'] as const).map((tp) => (
              <button
                key={tp}
                onClick={() => setFilterType(tp)}
                className={`px-3 py-1.5 rounded-full text-xs font-medium border transition-colors ${
                  filterType === tp ? 'bg-gray-900 text-white border-gray-900' : 'border-gray-300 text-gray-600 hover:border-gray-500'
                }`}
              >
                {tp === 'all' ? 'Mọi loại' : typeConfig[tp].label}
              </button>
            ))}
          </div>
          <span className="w-px h-5 bg-gray-200 hidden sm:block" />
          <div className="flex items-center gap-2">
            {(['all', 'new', 'reviewed', 'closed'] as const).map((s) => (
              <button
                key={s}
                onClick={() => setFilterStatus(s)}
                className={`px-3 py-1.5 rounded-full text-xs font-medium border transition-colors ${
                  filterStatus === s ? 'bg-brand text-white border-brand' : 'border-gray-300 text-gray-600 hover:border-brand hover:text-brand'
                }`}
              >
                {s === 'all' ? 'Tất cả' : statusConfig[s].label}
                {s !== 'all' && (
                  <span className="ml-1.5 inline-flex w-4 h-4 rounded-full bg-white/30 items-center justify-center text-[10px]">
                    {submissions.filter((sub) => sub.status === s).length}
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>
      </div>

      {loading ? (
        <div className="flex justify-center py-20"><Loader2 size={24} className="animate-spin text-brand" /></div>
      ) : (
        <div className="grid lg:grid-cols-5 gap-5">
          {/* List */}
          <div className="lg:col-span-2 space-y-3">
            {filtered.map((sub) => {
              const sc = statusConfig[(sub.status as Status)] ?? statusConfig.new;
              const tc = typeConfig[sub.type] ?? typeConfig.contact;
              return (
                <button
                  key={sub.id}
                  onClick={() => select(sub)}
                  className={`w-full text-left p-4 rounded-2xl border-2 transition-all ${
                    selectedId === sub.id ? 'border-brand bg-brand-surface' : 'border-gray-200 bg-white hover:border-brand/40'
                  }`}
                >
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-full bg-brand flex items-center justify-center text-white text-xs font-bold shrink-0">
                        {sub.name.charAt(0)}
                      </div>
                      <div>
                        <p className="font-semibold text-gray-900 text-sm">{sub.name}</p>
                        <p className="text-xs text-gray-400">{sub.email}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-1.5 shrink-0">
                      <span className={`px-2 py-0.5 rounded-full text-[10px] font-medium ${tc.color}`}>{tc.label}</span>
                      <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium ${sc.color}`}>
                        <span className={`w-1.5 h-1.5 rounded-full ${sc.dot}`} />{sc.label}
                      </span>
                    </div>
                  </div>
                  <p className="text-xs text-gray-600 line-clamp-2 leading-relaxed">
                    {sub.type === 'booking'
                      ? `Đặt lịch showroom${sub.showroom ? `: ${sub.showroom}` : ''}${sub.preferredTime ? ` — ${new Date(sub.preferredTime).toLocaleString('vi-VN')}` : ''}`
                      : sub.message}
                  </p>
                  <p className="text-xs text-gray-400 mt-2">{new Date(sub.createdAt).toLocaleDateString('vi-VN')}</p>
                </button>
              );
            })}
            {filtered.length === 0 && (
              <div className="py-12 text-center text-gray-400">
                <MessageSquare size={32} className="mx-auto mb-2 opacity-30" />
                <p className="text-sm">Không có tin nhắn nào</p>
              </div>
            )}
          </div>

          {/* Detail */}
          <div className="lg:col-span-3">
            {selected ? (
              <div className="bg-white rounded-2xl border border-gray-200 p-6">
                <div className="flex items-start justify-between mb-6 flex-wrap gap-3">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-full bg-brand flex items-center justify-center text-white font-bold">
                      {selected.name.charAt(0)}
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-900">{selected.name}</h3>
                      <p className="text-gray-500 text-sm">{selected.email}</p>
                    </div>
                  </div>
                  <div className="flex gap-2 items-center">
                    {(['new', 'reviewed', 'closed'] as Status[]).map((s) => (
                      <button
                        key={s}
                        onClick={() => updateStatus(selected.id, s)}
                        className={`px-3 py-1.5 rounded-full text-xs font-medium border transition-colors ${
                          selected.status === s
                            ? `${statusConfig[s].color} border-transparent`
                            : 'border-gray-300 text-gray-600 hover:border-brand hover:text-brand'
                        }`}
                      >
                        {statusConfig[s].label}
                      </button>
                    ))}
                    <button
                      onClick={() => remove(selected.id)}
                      className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                      title="Xóa tin nhắn"
                    >
                      <Trash2 size={15} />
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 mb-6">
                  {selected.phone && (
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Phone size={14} className="text-brand" /> {selected.phone}
                    </div>
                  )}
                  {selected.company && (
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Building2 size={14} className="text-brand" /> {selected.company}
                    </div>
                  )}
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Calendar size={14} className="text-brand" />
                    {new Date(selected.createdAt).toLocaleDateString('vi-VN', { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' })}
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <MessageSquare size={14} className="text-brand" /> Nguồn: {selected.source || '—'}
                  </div>
                  {selected.type === 'booking' && (
                    <>
                      {selected.showroom && (
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <MapPin size={14} className="text-brand" /> Showroom: {selected.showroom}
                        </div>
                      )}
                      {selected.area && (
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <Ruler size={14} className="text-brand" /> Diện tích: {selected.area}
                        </div>
                      )}
                      {selected.preferredTime && (
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <Clock size={14} className="text-brand" /> Hẹn: {new Date(selected.preferredTime).toLocaleString('vi-VN')}
                        </div>
                      )}
                    </>
                  )}
                </div>

                {selected.message && (
                  <div className="bg-gray-50 rounded-xl p-4 mb-6">
                    <p className="text-xs text-gray-500 font-medium mb-2 uppercase tracking-wider">Nội dung tin nhắn</p>
                    <p className="text-gray-700 text-sm leading-relaxed whitespace-pre-wrap">{selected.message}</p>
                  </div>
                )}

                <div className="mb-6">
                  <p className="text-xs text-gray-500 font-medium mb-2 uppercase tracking-wider">Ghi chú nội bộ</p>
                  <textarea
                    rows={3}
                    className="textarea-field"
                    value={noteDraft}
                    onChange={(e) => setNoteDraft(e.target.value)}
                    placeholder="Ghi chú cho đội ngũ (khách không thấy)..."
                  />
                  <button
                    onClick={saveNote}
                    disabled={savingNote || noteDraft === (selected.note || '')}
                    className="btn-outline text-xs px-4 py-2 mt-2 disabled:opacity-40"
                  >
                    {savingNote ? <Loader2 size={12} className="animate-spin" /> : <Save size={12} />} Lưu ghi chú
                  </button>
                </div>

                <div className="flex gap-3">
                  <a href={`mailto:${selected.email}`} className="btn-primary text-sm">
                    <Mail size={14} /> Trả lời email
                  </a>
                  {selected.phone && (
                    <a href={`tel:${selected.phone}`} className="btn-outline text-sm">
                      <Phone size={14} /> Gọi điện
                    </a>
                  )}
                </div>
              </div>
            ) : (
              <div className="bg-white rounded-2xl border border-gray-200 p-12 flex flex-col items-center justify-center text-center text-gray-400 h-full min-h-[300px]">
                <MessageSquare size={48} className="opacity-20 mb-4" />
                <p className="font-medium text-gray-600">Chọn một tin nhắn để xem chi tiết</p>
                <p className="text-sm mt-1">Nhấn vào bất kỳ tin nhắn nào ở bên trái</p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
