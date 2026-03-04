'use client';

import { useRef, useState } from 'react';
import {
  DndContext, closestCenter, KeyboardSensor, PointerSensor, useSensor, useSensors,
  type DragEndEvent,
} from '@dnd-kit/core';
import {
  SortableContext, sortableKeyboardCoordinates, useSortable, rectSortingStrategy, arrayMove,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { GripVertical, Plus, X } from 'lucide-react';

interface SortableImageProps {
  id: string;
  url: string;
  onRemove: () => void;
}

function SortableImage({ id, url, onRemove }: SortableImageProps) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id });
  const style = { transform: CSS.Transform.toString(transform), transition, opacity: isDragging ? 0.5 : 1 };

  return (
    <div ref={setNodeRef} style={style} className="relative group rounded-lg overflow-hidden bg-gray-100 aspect-square">
      <img src={url} alt="" className="w-full h-full object-cover" />
      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity" />
      <button
        type="button"
        {...attributes}
        {...listeners}
        className="absolute top-2 left-2 bg-white/80 rounded p-1 cursor-grab opacity-0 group-hover:opacity-100 transition-opacity"
      >
        <GripVertical size={14} className="text-gray-600" />
      </button>
      <button
        type="button"
        onClick={onRemove}
        className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-600"
      >
        <X size={14} />
      </button>
    </div>
  );
}

interface Props {
  value: string[];
  onChange: (urls: string[]) => void;
}

export default function GalleryManager({ value, onChange }: Props) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates }),
  );

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;
    if (over && active.id !== over.id) {
      const oldIndex = value.indexOf(active.id as string);
      const newIndex = value.indexOf(over.id as string);
      onChange(arrayMove(value, oldIndex, newIndex));
    }
  }

  async function handleFiles(files: FileList) {
    setUploading(true);
    const urls: string[] = [];
    try {
      for (const file of Array.from(files)) {
        const fd = new FormData();
        fd.append('file', file);
        const res = await fetch('/api/upload', { method: 'POST', body: fd });
        const data = await res.json();
        if (data.url) urls.push(data.url);
      }
      onChange([...value, ...urls]);
    } finally {
      setUploading(false);
    }
  }

  return (
    <div className="space-y-2">
      <label className="block text-xs font-semibold text-gray-600 uppercase tracking-wide">Gallery</label>
      <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
        <SortableContext items={value} strategy={rectSortingStrategy}>
          <div className="grid grid-cols-3 gap-2">
            {value.map((url) => (
              <SortableImage
                key={url}
                id={url}
                url={url}
                onRemove={() => onChange(value.filter((u) => u !== url))}
              />
            ))}
            <button
              type="button"
              onClick={() => inputRef.current?.click()}
              className="aspect-square border-2 border-dashed border-gray-200 rounded-lg flex flex-col items-center justify-center text-gray-400 hover:border-brand/40 hover:text-brand/60 transition-colors"
            >
              {uploading ? (
                <span className="w-5 h-5 border-2 border-brand/30 border-t-brand rounded-full animate-spin" />
              ) : (
                <>
                  <Plus size={20} />
                  <span className="text-xs mt-1">Add</span>
                </>
              )}
            </button>
          </div>
        </SortableContext>
      </DndContext>
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        multiple
        className="hidden"
        onChange={(e) => { if (e.target.files?.length) handleFiles(e.target.files); e.target.value = ''; }}
      />
    </div>
  );
}
