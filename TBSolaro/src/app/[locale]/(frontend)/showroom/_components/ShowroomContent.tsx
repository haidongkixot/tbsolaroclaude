'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { MapPin, Phone, Clock, Navigation, PhoneCall, Search, CheckCircle } from 'lucide-react';
import PageHero from '@/components/sections/PageHero';
import { getPublishedShowrooms } from '@/lib/data/showrooms';

export default function ShowroomContent({ heroImage }: { heroImage?: string }) {
  const t = useTranslations('showroom');
  const showrooms = getPublishedShowrooms();
  const [selected, setSelected] = useState(showrooms[0]?.id || '');
  const [search, setSearch] = useState('');
  const [bookingForm, setBookingForm] = useState({ name: '', email: '', phone: '', area: '', showroom: showrooms[0]?.name || '', time: '' });
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const filtered = showrooms.filter(
    (s) =>
      search === '' ||
      s.name.toLowerCase().includes(search.toLowerCase()) ||
      s.address.toLowerCase().includes(search.toLowerCase())
  );

  const handleBooking = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      await fetch('/api/showroom-booking', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(bookingForm),
      });
      setSubmitted(true);
    } catch {
      // fail silently in demo
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <PageHero
        title={t('heroTitle')}
        subtitle={t('heroSubtitle')}
        backgroundImage={heroImage || 'https://placehold.co/1600x500/1B5E30/FFFFFF?text=Showroom'}
        size="md"
      />

      {/* Map + List */}
      <section className="py-12 md:py-16">
        <div className="container-site">
          <h2 className="section-title mb-6">{t('listTitle')}</h2>

          <div className="grid lg:grid-cols-5 gap-6">
            {/* List */}
            <div className="lg:col-span-2 space-y-4">
              {/* Search */}
              <div className="relative">
                <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder={t('searchPlaceholder')}
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="input-field pl-10"
                />
              </div>

              {filtered.map((showroom) => (
                <button
                  key={showroom.id}
                  onClick={() => setSelected(showroom.id)}
                  className={`w-full text-left p-5 rounded-2xl border-2 transition-all ${
                    selected === showroom.id
                      ? 'border-brand bg-brand-surface'
                      : 'border-gray-200 bg-white hover:border-brand/40'
                  }`}
                >
                  <h3 className="font-bold text-gray-900 mb-3">{showroom.name}</h3>
                  <div className="space-y-2 text-sm text-gray-600">
                    <div className="flex gap-2">
                      <MapPin size={14} className="text-brand shrink-0 mt-0.5" />
                      <span>{showroom.address}</span>
                    </div>
                    <div className="flex gap-2">
                      <Phone size={14} className="text-brand shrink-0 mt-0.5" />
                      <a href={`tel:${showroom.phone}`} className="hover:text-brand">{showroom.phone}</a>
                    </div>
                    <div className="flex gap-2">
                      <Clock size={14} className="text-brand shrink-0 mt-0.5" />
                      <span>{showroom.openingHours}</span>
                    </div>
                  </div>
                  <div className="flex gap-2 mt-4">
                    <button className="flex items-center gap-1.5 text-xs font-semibold text-white bg-brand px-3 py-1.5 rounded-full hover:bg-brand-dark transition-colors">
                      <Navigation size={11} /> {t('directionsBtn')}
                    </button>
                    <a
                      href={`tel:${showroom.phone}`}
                      className="flex items-center gap-1.5 text-xs font-semibold text-brand border border-brand px-3 py-1.5 rounded-full hover:bg-brand hover:text-white transition-colors"
                    >
                      <PhoneCall size={11} /> {t('callBtn')}
                    </a>
                  </div>
                </button>
              ))}
            </div>

            {/* Map placeholder */}
            <div className="lg:col-span-3">
              <div className="w-full h-[500px] rounded-2xl overflow-hidden bg-gray-200 border border-gray-200 flex items-center justify-center">
                <div className="text-center text-gray-500">
                  <MapPin size={40} className="mx-auto mb-3 text-brand" />
                  <p className="font-medium">{t('mapLabel')}</p>
                  <p className="text-sm mt-1">{showrooms.find((s) => s.id === selected)?.name || ''}</p>
                  <p className="text-xs mt-1 text-gray-400">{showrooms.find((s) => s.id === selected)?.address || ''}</p>
                  <p className="text-xs text-brand mt-3">[Google Maps sẽ được tích hợp tại đây]</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Showroom Activities */}
      <section className="py-12 bg-gray-50">
        <div className="container-site">
          <div className="text-center mb-10">
            <h2 className="section-title">{t('activitiesTitle')}</h2>
            <p className="section-subtitle">{t('activitiesSubtitle')}</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
            {[
              { col: 'lg:col-span-2 lg:row-span-2', aspect: 'aspect-square' },
              { col: 'lg:col-span-1', aspect: 'aspect-square' },
              { col: 'lg:col-span-2', aspect: 'aspect-video' },
              { col: 'lg:col-span-1', aspect: 'aspect-square' },
              { col: 'lg:col-span-2', aspect: 'aspect-video' },
            ].map((item, i) => (
              <div key={i} className={`${item.col} ${item.aspect} rounded-xl overflow-hidden bg-gray-200`}>
                <img
                  src={`https://placehold.co/600x400/1B5E30/FFFFFF?text=Showroom+Activity+${i + 1}`}
                  alt={`Hoạt động showroom ${i + 1}`}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                />
              </div>
            ))}
          </div>
          <div className="text-center mt-8">
            <button className="btn-primary">{t('viewMorePhotos')}</button>
          </div>
        </div>
      </section>

      {/* Booking Form */}
      <section className="py-16">
        <div className="container-site">
          <div className="grid lg:grid-cols-2 gap-10 items-start">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">{t('bookingTitle')}</h2>
              <p className="text-gray-600 mb-6 leading-relaxed">{t('bookingDesc')}</p>
              <div className="bg-brand-surface rounded-2xl p-6 border border-brand/10">
                <p className="text-sm text-gray-700 font-medium mb-3">{t('benefitsTitle')}</p>
                <ul className="space-y-2">
                  {[t('benefit1'), t('benefit2'), t('benefit3'), t('benefit4')].map((benefit) => (
                    <li key={benefit} className="flex items-center gap-2 text-sm text-gray-600">
                      <CheckCircle size={14} className="text-brand shrink-0" />
                      {benefit}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div>
              {submitted ? (
                <div className="text-center py-10">
                  <CheckCircle size={56} className="text-brand mx-auto mb-4" />
                  <h3 className="text-xl font-bold mb-2">{t('successTitle')}</h3>
                  <p className="text-gray-600 text-sm">{t('successMsg')}</p>
                  <button onClick={() => setSubmitted(false)} className="mt-6 btn-primary">{t('bookAgain')}</button>
                </div>
              ) : (
                <form onSubmit={handleBooking} className="space-y-4">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">{t('formName')} *</label>
                      <input required value={bookingForm.name} onChange={(e) => setBookingForm((f) => ({ ...f, name: e.target.value }))} placeholder={t('formName')} className="input-field" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">{t('formEmail')} *</label>
                      <input required type="email" value={bookingForm.email} onChange={(e) => setBookingForm((f) => ({ ...f, email: e.target.value }))} placeholder="email@example.com" className="input-field" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">{t('formPhone')}</label>
                      <input value={bookingForm.phone} onChange={(e) => setBookingForm((f) => ({ ...f, phone: e.target.value }))} placeholder="+84 --- ---" className="input-field" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">{t('formArea')}</label>
                      <input value={bookingForm.area} onChange={(e) => setBookingForm((f) => ({ ...f, area: e.target.value }))} placeholder={t('formAreaPlaceholder')} className="input-field" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">{t('formShowroom')}</label>
                    <select value={bookingForm.showroom} onChange={(e) => setBookingForm((f) => ({ ...f, showroom: e.target.value }))} className="input-field bg-white">
                      {showrooms.map((s) => (
                        <option key={s.id} value={s.name}>{s.name}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">{t('formTime')}</label>
                    <input type="datetime-local" value={bookingForm.time} onChange={(e) => setBookingForm((f) => ({ ...f, time: e.target.value }))} className="input-field" />
                  </div>
                  <button type="submit" disabled={submitting} className="btn-primary w-full justify-center disabled:opacity-60">
                    {submitting ? '...' : t('submitBtn')}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
