'use client';

import { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface Props {
  images: string[];
  alt: string;
}

export default function GallerySlider({ images, alt }: Props) {
  const [active, setActive] = useState(0);

  if (!images.length) return null;

  const prev = () => setActive((i) => (i - 1 + images.length) % images.length);
  const next = () => setActive((i) => (i + 1) % images.length);

  return (
    <div className="relative bg-brand-dark overflow-hidden" style={{ minHeight: '400px' }}>
      <img
        src={images[active]}
        alt={alt}
        className="w-full object-cover"
        style={{ maxHeight: '520px', width: '100%' }}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />

      {images.length > 1 && (
        <>
          <button onClick={prev} className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center hover:bg-white/40 transition-colors border border-white/30">
            <ChevronLeft size={20} className="text-white" />
          </button>
          <button onClick={next} className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center hover:bg-white/40 transition-colors border border-white/30">
            <ChevronRight size={20} className="text-white" />
          </button>
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
            {images.map((_, i) => (
              <button key={i} onClick={() => setActive(i)}
                className={`w-2 h-2 rounded-full transition-all ${i === active ? 'bg-white w-6' : 'bg-white/50'}`} />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
