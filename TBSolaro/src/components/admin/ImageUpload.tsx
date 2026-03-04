'use client';

import { useRef, useState } from 'react';
import { Upload, X } from 'lucide-react';

interface Props {
  value: string;
  onChange: (url: string) => void;
  label?: string;
}

export default function ImageUpload({ value, onChange, label = 'Featured Image' }: Props) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);

  async function handleFile(file: File) {
    setUploading(true);
    try {
      const fd = new FormData();
      fd.append('file', file);
      const res = await fetch('/api/upload', { method: 'POST', body: fd });
      const data = await res.json();
      if (data.url) onChange(data.url);
    } finally {
      setUploading(false);
    }
  }

  return (
    <div className="space-y-2">
      <label className="block text-xs font-semibold text-gray-600 uppercase tracking-wide">{label}</label>
      <div
        className="border-2 border-dashed border-gray-200 rounded-xl overflow-hidden cursor-pointer hover:border-brand/40 transition-colors"
        onClick={() => inputRef.current?.click()}
      >
        {value ? (
          <div className="relative group">
            <img src={value} alt="" className="w-full h-48 object-cover" />
            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
              <span className="text-white text-sm font-medium">Click to replace</span>
              <button
                type="button"
                onClick={(e) => { e.stopPropagation(); onChange(''); }}
                className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
              >
                <X size={14} />
              </button>
            </div>
          </div>
        ) : (
          <div className="h-48 flex flex-col items-center justify-center text-gray-400">
            {uploading ? (
              <span className="w-6 h-6 border-2 border-brand/30 border-t-brand rounded-full animate-spin" />
            ) : (
              <>
                <Upload size={24} className="mb-2" />
                <span className="text-sm">Click to upload image</span>
              </>
            )}
          </div>
        )}
      </div>
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={(e) => { const f = e.target.files?.[0]; if (f) handleFile(f); e.target.value = ''; }}
      />
    </div>
  );
}
