'use client';

import { useState } from 'react';
import { MessageSquare, Mail, Phone, Building2, Calendar, CheckCircle, Clock, XCircle } from 'lucide-react';

// Mock submission data
const mockSubmissions = [
  { id: 'cs_1', name: 'Nguyễn Văn An', email: 'an@example.com', phone: '+84 901 234 567', company: 'Công ty ABC', message: 'Tôi muốn tư vấn về hệ thống điện mặt trời 50kWp cho nhà máy.', source: 'contact_page', status: 'new', submittedAt: '2024-07-01T08:30:00Z' },
  { id: 'cs_2', name: 'Trần Thị Bình', email: 'binh@example.com', phone: '', company: '', message: 'Cho tôi hỏi về combo INV-BAT5 Básico, giá bao nhiêu?', source: 'products_page', status: 'reviewed', submittedAt: '2024-06-28T14:00:00Z' },
  { id: 'cs_3', name: 'Lê Văn Công', email: 'cong@example.com', phone: '+84 912 345 678', company: 'Hộ kinh doanh Công', message: 'Muốn lắp đặt điện mặt trời cho nhà ở, diện tích mái 60m2.', source: 'homepage', status: 'closed', submittedAt: '2024-06-25T10:15:00Z' },
  { id: 'cs_4', name: 'Phạm Thị Dung', email: 'dung@example.com', phone: '+84 888 123 456', company: 'Resort XYZ', message: 'Resort của chúng tôi muốn chuyển sang năng lượng mặt trời. Cần báo giá cho hệ thống 200kWp.', source: 'about_page', status: 'new', submittedAt: '2024-07-02T09:00:00Z' },
];

const statusConfig = {
  new: { label: 'Mới', icon: Clock, color: 'bg-blue-100 text-blue-700', dot: 'bg-blue-500' },
  reviewed: { label: 'Đã xem', icon: CheckCircle, color: 'bg-amber-100 text-amber-700', dot: 'bg-amber-500' },
  closed: { label: 'Đã đóng', icon: XCircle, color: 'bg-gray-100 text-gray-600', dot: 'bg-gray-400' },
};

type Status = keyof typeof statusConfig;

export default function AdminSubmissionsPage() {
  const [submissions, setSubmissions] = useState(mockSubmissions);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [filterStatus, setFilterStatus] = useState<Status | 'all'>('all');

  const filtered = submissions.filter((s) => filterStatus === 'all' || s.status === filterStatus);
  const selected = submissions.find((s) => s.id === selectedId);

  const updateStatus = (id: string, status: Status) => {
    setSubmissions((prev) => prev.map((s) => (s.id === id ? { ...s, status } : s)));
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Liên hệ & Submissions</h2>
          <p className="text-gray-500 text-sm mt-1">{submissions.length} tin nhắn</p>
        </div>
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

      <div className="grid lg:grid-cols-5 gap-5">
        {/* List */}
        <div className="lg:col-span-2 space-y-3">
          {filtered.map((sub) => {
            const sc = statusConfig[sub.status as Status];
            return (
              <button
                key={sub.id}
                onClick={() => setSelectedId(sub.id)}
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
                  <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium ${sc.color}`}>
                    <span className={`w-1.5 h-1.5 rounded-full ${sc.dot}`} />{sc.label}
                  </span>
                </div>
                <p className="text-xs text-gray-600 line-clamp-2 leading-relaxed">{sub.message}</p>
                <p className="text-xs text-gray-400 mt-2">{new Date(sub.submittedAt).toLocaleDateString('vi-VN')}</p>
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
              <div className="flex items-start justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-brand flex items-center justify-center text-white font-bold">
                    {selected.name.charAt(0)}
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900">{selected.name}</h3>
                    <p className="text-gray-500 text-sm">{selected.email}</p>
                  </div>
                </div>
                <div className="flex gap-2">
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
                  {new Date(selected.submittedAt).toLocaleDateString('vi-VN', { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' })}
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <MessageSquare size={14} className="text-brand" /> Nguồn: {selected.source}
                </div>
              </div>

              <div className="bg-gray-50 rounded-xl p-4 mb-6">
                <p className="text-xs text-gray-500 font-medium mb-2 uppercase tracking-wider">Nội dung tin nhắn</p>
                <p className="text-gray-700 text-sm leading-relaxed">{selected.message}</p>
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
    </div>
  );
}
