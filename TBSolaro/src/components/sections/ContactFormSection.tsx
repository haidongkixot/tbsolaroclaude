'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { Send, CheckCircle } from 'lucide-react';

interface ContactFormSectionProps {
  title?: string;
  subtitle?: string;
  compact?: boolean;
  source?: string;
  backgroundImage?: string;
}

export default function ContactFormSection({
  title,
  subtitle,
  compact = false,
  source = 'contact_form',
  backgroundImage,
}: ContactFormSectionProps) {
  const t = useTranslations('contactForm');
  const tc = useTranslations('common');
  const [form, setForm] = useState({ name: '', email: '', phone: '', company: '', message: '' });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  const displayTitle = title ?? t('title');
  const displaySubtitle = subtitle ?? t('subtitle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError('');
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, source }),
      });
      if (!res.ok) throw new Error('failed');
      setSubmitted(true);
      setForm({ name: '', email: '', phone: '', company: '', message: '' });
    } catch {
      setError(t('errorMsg'));
    } finally {
      setSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <section className="py-16 bg-brand-surface">
        <div className="container-site">
          <div className="max-w-md mx-auto text-center">
            <div className="flex justify-center mb-4">
              <CheckCircle size={64} className="text-brand" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">{t('successTitle')}</h3>
            <p className="text-gray-600">{t('successMsg')}</p>
            <button onClick={() => setSubmitted(false)} className="mt-6 btn-primary">
              {t('submitAnother')}
            </button>
          </div>
        </div>
      </section>
    );
  }

  const bgStyle = !compact && backgroundImage
    ? { backgroundImage: `linear-gradient(rgba(240,249,244,0.93), rgba(240,249,244,0.93)), url('${backgroundImage}')`, backgroundSize: 'cover' as const, backgroundPosition: 'center' as const }
    : undefined;

  return (
    <section className={compact ? 'py-10' : 'py-16 md:py-20 bg-brand-surface'} style={bgStyle}>
      <div className="container-site">
        {!compact && (
          <div className="text-center mb-10">
            <h2 className="section-title">{displayTitle}</h2>
            <p className="section-subtitle">{displaySubtitle}</p>
          </div>
        )}
        {compact && (
          <h3 className="text-xl font-bold text-gray-900 mb-6">{displayTitle}</h3>
        )}

        <form
          onSubmit={handleSubmit}
          className={compact ? 'space-y-4' : 'max-w-2xl mx-auto space-y-4'}
        >
          <div className={compact ? 'grid gap-4' : 'grid sm:grid-cols-2 gap-4'}>
            <div>
              <label htmlFor={`name-${source}`} className="block text-sm font-medium text-gray-700 mb-1">
                {t('labelName')} <span className="text-red-500">*</span>
              </label>
              <input
                id={`name-${source}`}
                type="text"
                required
                value={form.name}
                onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                placeholder={t('placeholderName')}
                className="input-field"
              />
            </div>
            <div>
              <label htmlFor={`email-${source}`} className="block text-sm font-medium text-gray-700 mb-1">
                {t('labelEmail')} <span className="text-red-500">*</span>
              </label>
              <input
                id={`email-${source}`}
                type="email"
                required
                value={form.email}
                onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
                placeholder={t('placeholderEmail')}
                className="input-field"
              />
            </div>
            <div>
              <label htmlFor={`phone-${source}`} className="block text-sm font-medium text-gray-700 mb-1">
                {t('labelPhone')}
              </label>
              <input
                id={`phone-${source}`}
                type="tel"
                value={form.phone}
                onChange={(e) => setForm((f) => ({ ...f, phone: e.target.value }))}
                placeholder={t('placeholderPhone')}
                className="input-field"
              />
            </div>
            <div>
              <label htmlFor={`company-${source}`} className="block text-sm font-medium text-gray-700 mb-1">
                {t('labelCompany')}
              </label>
              <input
                id={`company-${source}`}
                type="text"
                value={form.company}
                onChange={(e) => setForm((f) => ({ ...f, company: e.target.value }))}
                placeholder={t('placeholderCompany')}
                className="input-field"
              />
            </div>
          </div>
          <div>
            <label htmlFor={`message-${source}`} className="block text-sm font-medium text-gray-700 mb-1">
              {t('labelMessage')} <span className="text-red-500">*</span>
            </label>
            <textarea
              id={`message-${source}`}
              required
              rows={compact ? 4 : 5}
              value={form.message}
              onChange={(e) => setForm((f) => ({ ...f, message: e.target.value }))}
              placeholder={t('placeholderMessage')}
              className="textarea-field"
            />
          </div>

          {error && (
            <p className="text-red-600 text-sm bg-red-50 px-4 py-2 rounded-lg">{error}</p>
          )}

          <button
            type="submit"
            disabled={submitting}
            className="btn-primary disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {submitting ? (
              <span className="flex items-center gap-2">
                <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                </svg>
                {tc('sending')}
              </span>
            ) : (
              <span className="flex items-center gap-2">
                <Send size={16} />
                {t('submitBtn')}
              </span>
            )}
          </button>
        </form>
      </div>
    </section>
  );
}
