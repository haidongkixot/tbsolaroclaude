'use client';

import { useState } from 'react';
import { ChevronDown, Send, CheckCircle } from 'lucide-react';
import PageHero from '@/components/sections/PageHero';
import { getPublishedFAQs } from '@/lib/data/faq';

export default function FAQPage() {
  const faqs = getPublishedFAQs();
  const [openId, setOpenId] = useState<string | null>(null);
  const [form, setForm] = useState({ name: '', email: '', phone: '', company: '', message: '' });
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, source: 'faq_page' }),
      });
      setSubmitted(true);
      setForm({ name: '', email: '', phone: '', company: '', message: '' });
    } catch {
      // fail silently
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <PageHero
        title="FAQs"
        subtitle="Câu hỏi thường gặp về sản phẩm và dịch vụ TBSolaro"
        backgroundImage="https://placehold.co/1600x400/1B5E30/FFFFFF?text=FAQ+Hero"
        size="md"
      />

      <section className="py-16 md:py-20">
        <div className="container-site">
          <div className="grid lg:grid-cols-3 gap-10 lg:gap-14">
            {/* FAQ Accordion */}
            <div className="lg:col-span-2">
              <h2 className="text-2xl font-bold text-gray-900 mb-8">Câu hỏi phổ biến</h2>
              <div className="space-y-3">
                {faqs.map((faq) => (
                  <div key={faq.id} className="accordion-item">
                    <button
                      onClick={() => setOpenId(openId === faq.id ? null : faq.id)}
                      className="w-full flex items-start justify-between gap-4 px-6 py-5 text-left hover:bg-gray-50 transition-colors"
                      aria-expanded={openId === faq.id}
                    >
                      <span className="font-medium text-gray-900 text-sm leading-relaxed pr-2">
                        {faq.question}
                      </span>
                      <ChevronDown
                        size={18}
                        className={`shrink-0 text-brand transition-transform duration-200 mt-0.5 ${openId === faq.id ? 'rotate-180' : ''}`}
                      />
                    </button>
                    {openId === faq.id && (
                      <div className="px-6 pb-6 text-sm text-gray-600 leading-relaxed border-t border-gray-100 pt-4">
                        {faq.answer}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Contact Form Sidebar */}
            <div className="lg:col-span-1">
              <div className="sticky top-24 bg-brand-surface rounded-2xl p-6 border border-brand/10">
                <h3 className="text-lg font-bold text-gray-900 mb-1">Gửi câu hỏi</h3>
                <p className="text-gray-500 text-sm mb-6">
                  Không tìm thấy câu trả lời? Hãy gửi câu hỏi trực tiếp đến đội ngũ TBSolaro.
                </p>

                {submitted ? (
                  <div className="text-center py-6">
                    <CheckCircle size={40} className="text-brand mx-auto mb-3" />
                    <p className="font-semibold text-gray-900">Cảm ơn bạn!</p>
                    <p className="text-gray-500 text-sm mt-1">Chúng tôi sẽ phản hồi sớm nhất có thể.</p>
                    <button onClick={() => setSubmitted(false)} className="mt-4 btn-primary text-sm px-4 py-2">
                      Gửi câu hỏi khác
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                      <label className="block text-xs font-medium text-gray-700 mb-1">Name *</label>
                      <input required value={form.name} onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))} placeholder="Họ và tên" className="input-field text-sm py-2.5" />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-gray-700 mb-1">Email *</label>
                      <input required type="email" value={form.email} onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))} placeholder="email@example.com" className="input-field text-sm py-2.5" />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-gray-700 mb-1">Phone</label>
                      <input value={form.phone} onChange={(e) => setForm((f) => ({ ...f, phone: e.target.value }))} placeholder="+84 --- ---" className="input-field text-sm py-2.5" />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-gray-700 mb-1">Company</label>
                      <input value={form.company} onChange={(e) => setForm((f) => ({ ...f, company: e.target.value }))} placeholder="Tên công ty" className="input-field text-sm py-2.5" />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-gray-700 mb-1">Your Message *</label>
                      <textarea
                        required
                        rows={4}
                        value={form.message}
                        onChange={(e) => setForm((f) => ({ ...f, message: e.target.value }))}
                        placeholder="Câu hỏi của bạn..."
                        className="textarea-field text-sm py-2.5"
                      />
                    </div>
                    <button type="submit" disabled={submitting} className="btn-primary w-full justify-center text-sm py-2.5">
                      <Send size={14} />
                      {submitting ? 'Đang gửi...' : 'Send message'}
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
