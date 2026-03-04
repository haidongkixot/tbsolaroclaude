'use client';

import { useState, useEffect, useCallback } from 'react';
import { ChevronLeft, ChevronRight, ArrowRight } from 'lucide-react';
import { Link } from '@/i18n/navigation';
import type { HeroSlide } from '@/lib/db/settings';

const FALLBACK_SLIDES: HeroSlide[] = [
  {
    image: 'https://placehold.co/1600x800/1B5E30/FFFFFF?text=Solar+Workers',
    titleVi: 'Kiến tạo năng lượng bền vững',
    titleEn: 'Creating Sustainable Energy',
    titleEs: 'Creando Energía Sostenible',
    subtitleVi: 'Thương hiệu điện năng lượng mặt trời hàng đầu của Tập đoàn Thái Bình. Giải pháp xanh cho mọi nhu cầu.',
    subtitleEn: 'Leading solar energy brand of Thai Binh Group. Green solutions for every need.',
    subtitleEs: 'Marca líder de energía solar del Grupo Thai Binh. Soluciones verdes para cada necesidad.',
  },
];

interface Props {
  slides: HeroSlide[];
  locale: string;
  badge: string;
  btn1: string;
  btn2: string;
}

export default function HeroSlider({ slides, locale, badge, btn1, btn2 }: Props) {
  const items = slides.length > 0 ? slides : FALLBACK_SLIDES;
  const [current, setCurrent] = useState(0);
  const [paused, setPaused] = useState(false);

  const prev = useCallback(() => setCurrent((c) => (c - 1 + items.length) % items.length), [items.length]);
  const next = useCallback(() => setCurrent((c) => (c + 1) % items.length), [items.length]);

  useEffect(() => {
    if (paused || items.length <= 1) return;
    const id = setInterval(next, 5000);
    return () => clearInterval(id);
  }, [paused, next, items.length]);

  const l = locale === 'en' ? 'En' : locale === 'es' ? 'Es' : 'Vi';

  return (
    <section
      className="relative min-h-[600px] md:min-h-[700px] flex items-center overflow-hidden"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {/* Slides */}
      {items.map((slide, i) => (
        <div
          key={i}
          className={`absolute inset-0 transition-opacity duration-700 ${i === current ? 'opacity-100 z-10' : 'opacity-0 z-0'}`}
          style={{
            backgroundImage: `linear-gradient(135deg, rgba(19,67,31,0.90) 0%, rgba(27,94,48,0.75) 50%, rgba(0,0,0,0.4) 100%), url('${slide.image || 'https://placehold.co/1600x800/1B5E30/FFFFFF?text=TBSolaro'}')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
      ))}

      {/* Dot grid overlay */}
      <div
        className="absolute inset-0 z-10 opacity-10 pointer-events-none"
        style={{ backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.3) 1px, transparent 1px)', backgroundSize: '40px 40px' }}
        aria-hidden="true"
      />

      {/* Content */}
      <div className="container-site relative z-20 py-16 w-full">
        {items.map((slide, i) => {
          const title = (slide as Record<string, string>)[`title${l}`] || slide.titleVi;
          const subtitle = (slide as Record<string, string>)[`subtitle${l}`] || slide.subtitleVi;
          return (
            <div
              key={i}
              className={`transition-all duration-700 max-w-2xl ${i === current ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 absolute pointer-events-none'}`}
            >
              <div className="inline-flex items-center gap-2 bg-white/15 text-white text-xs font-semibold px-4 py-2 rounded-full mb-6 backdrop-blur-sm border border-white/20">
                <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                {badge}
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6">
                {title}
              </h1>
              <p className="text-white/80 text-lg mb-8 leading-relaxed">
                {subtitle}
              </p>
              <div className="flex flex-wrap gap-4">
                <Link href="/projects" className="btn-white">
                  {btn1} <ArrowRight size={16} />
                </Link>
                <Link href="/products" className="btn-outline-white">
                  {btn2}
                </Link>
              </div>
            </div>
          );
        })}
      </div>

      {/* Prev / Next arrows — only show if multiple slides */}
      {items.length > 1 && (
        <>
          <button
            onClick={prev}
            aria-label="Previous slide"
            className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 z-30 w-11 h-11 rounded-full bg-white/15 hover:bg-white/30 backdrop-blur-sm border border-white/25 flex items-center justify-center text-white transition-colors"
          >
            <ChevronLeft size={22} />
          </button>
          <button
            onClick={next}
            aria-label="Next slide"
            className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 z-30 w-11 h-11 rounded-full bg-white/15 hover:bg-white/30 backdrop-blur-sm border border-white/25 flex items-center justify-center text-white transition-colors"
          >
            <ChevronRight size={22} />
          </button>
        </>
      )}

      {/* Dot indicators */}
      {items.length > 1 && (
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-30 flex items-center gap-2">
          {items.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              aria-label={`Go to slide ${i + 1}`}
              className={`transition-all duration-300 rounded-full ${i === current ? 'w-6 h-2.5 bg-white' : 'w-2.5 h-2.5 bg-white/50 hover:bg-white/75'}`}
            />
          ))}
        </div>
      )}
    </section>
  );
}
