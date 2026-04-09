'use client';

import { useState } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { ChevronDown, Send, CheckCircle } from 'lucide-react';
import PageHero from '@/components/sections/PageHero';

interface FAQItem {
  id: string;
  questionVi: string;
  questionEn: string;
  questionEs: string;
  answerVi: string;
  answerEn: string;
  answerEs: string;
  category: string;
}

export default function FAQContent({ heroImage, faqs }: { heroImage?: string; faqs: FAQItem[] }) {
  const t = useTranslations('faq');
  const locale = useLocale();
  const [openId, setOpenId] = useState<string | null>(null);
  const [form, setForm] = useState({ name: '', email: '', phone: '', company: '', message: '' });
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const l = locale === 'en' ? 'En' : locale === 'es' ? 'Es' : 'Vi';

  const getQ = (faq: FAQItem) => (faq as unknown as Record<string, string>)[`question${l}`] || faq.questionVi;
  const getA = (faq: FAQItem) => (faq as unknown as Record<string, string>)[`answer${l}`] || faq.answerVi;

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
        title={t('heroTitle')}
        subtitle={t('heroSubtitle')}
        backgroundImage={heroImage || 'https://placehold.co/1600x400/1B5E30/FFFFFF?text=FAQ+Hero'}
        size="md"
      />

      <section className="py-16 md:py-20">
        <div className="container-site">
          <div className="grid lg:grid-cols-3 gap-10 lg:gap-14">
            {/* FAQ Accordion */}
            <div className="lg:col-span-2">
              <h2 className="text-2xl font-bold text-gray-900 mb-8">{t('popularTitle')}</h2>
              {faqs.length === 0 ? (
                <p className="text-gray-400 text-center py-10">{t('noFaqs') ?? 'Chưa có câu hỏi nào.'}</p>
              ) : (
                <div className="space-y-3">
                  {faqs.map((faq) => (
                    <div key={faq.id} className="accordion-item">
                      <button
                        onClick={() => setOpenId(openId === faq.id ? null : faq.id)}
                        className="w-full flex items-start justify-between gap-4 px-6 py-5 text-left hover:bg-gray-50 transition-colors"
                        aria-expanded={openId === faq.id}
                      >
                        <span className="font-medium text-gray-900 text-sm leading-relaxed pr-2">
                          {getQ(faq)}
                        </span>
                        <ChevronDown
                          size={18}
                          className={`shrink-0 text-brand transition-transform duration-200 mt-0.5 ${openId === faq.id ? 'rotate-180' : ''}`}
                        />
                      </button>
                      {openId === faq.id && (
                        <div className="px-6 pb-6 text-sm text-gray-600 leading-relaxed border-t border-gray-100 pt-4">
                          {getA(faq)}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Contact Form Sidebar */}
            <div className="lg:col-span-1">
              <div className="sticky top-24 bg-brand-surface rounded-2xl p-6 border border-brand/10">
                <h3 className="text-lg font-bold text-gray-900 mb-1">{t('askTitle')}</h3>
                <p className="text-gray-500 text-sm mb-6">{t('askDesc')}</p>

                {submitted ? (
                  <div className="text-center py-6">
                    <CheckCircle size={40} className="text-brand mx-auto mb-3" />
                    <p className="font-semibold text-gray-900">{t('successTitle')}</p>
                    <p className="text-gray-500 text-sm mt-1">{t('successMsg')}</p>
                    <button onClick={() => setSubmitted(false)} className="mt-4 btn-primary text-sm px-4 py-2">
                      {t('askAgain')}
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                      <label className="block text-xs font-medium text-gray-700 mb-1">{t('formName')} *</label>
                      <input required value={form.name} onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))} placeholder={t('formNamePlaceholder')} className="input-field text-sm py-2.5" />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-gray-700 mb-1">{t('formEmail')} *</label>
                      <input required type="email" value={form.email} onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))} placeholder="email@example.com" className="input-field text-sm py-2.5" />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-gray-700 mb-1">{t('formPhone')}</label>
                      <input value={form.phone} onChange={(e) => setForm((f) => ({ ...f, phone: e.target.value }))} placeholder="+84 --- ---" className="input-field text-sm py-2.5" />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-gray-700 mb-1">{t('formCompany')}</label>
                      <input value={form.company} onChange={(e) => setForm((f) => ({ ...f, company: e.target.value }))} placeholder={t('formCompanyPlaceholder')} className="input-field text-sm py-2.5" />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-gray-700 mb-1">{t('formMessage')} *</label>
                      <textarea
                        required
                        rows={4}
                        value={form.message}
                        onChange={(e) => setForm((f) => ({ ...f, message: e.target.value }))}
                        placeholder={t('formMessagePlaceholder')}
                        className="textarea-field text-sm py-2.5"
                      />
                    </div>
                    <button type="submit" disabled={submitting} className="btn-primary w-full justify-center text-sm py-2.5">
                      <Send size={14} />
                      {submitting ? t('formMessage') : t('submitBtn')}
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