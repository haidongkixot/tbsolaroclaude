import type { Showroom } from '@/types';

export const showrooms: Showroom[] = [
  {
    id: '1',
    name: 'Showroom 1 – Trung tâm',
    address: '318 Trungcàng Ct Syracuse, Connecticut 06824',
    phone: '(215) 555-0117',
    email: 'showroom1@tbsolaro.com',
    openingHours: '8:00 Am – 5:00 PM (Mon - Fri)',
    mapEmbed: '',
    coordinates: { lat: 21.5944, lng: 106.5 },
    gallery: [
      'https://placehold.co/800x600/1B5E30/FFFFFF?text=Showroom+1+Photo+1',
      'https://placehold.co/800x600/236B3A/FFFFFF?text=Showroom+1+Photo+2',
      'https://placehold.co/800x600/3D9B5C/FFFFFF?text=Showroom+1+Photo+3',
    ],
    status: 'published',
    sortOrder: 1,
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z',
  },
  {
    id: '2',
    name: 'Showroom 2 – Chi nhánh Bắc',
    address: '318 Trungcàng Ct Syracuse, Connecticut 06824',
    phone: '(215) 555-0171',
    email: 'showroom2@tbsolaro.com',
    openingHours: '8:00 Am – 5:00 PM (Mon - Fri)',
    mapEmbed: '',
    coordinates: { lat: 21.6, lng: 106.55 },
    gallery: [
      'https://placehold.co/800x600/1B5E30/FFFFFF?text=Showroom+2+Photo+1',
      'https://placehold.co/800x600/52B788/FFFFFF?text=Showroom+2+Photo+2',
    ],
    status: 'published',
    sortOrder: 2,
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z',
  },
  {
    id: '3',
    name: 'Showroom 3 – Chi nhánh Nam',
    address: '318 Trungcàng Ct Syracuse, Connecticut 06824',
    phone: '(215) 555-0191',
    email: 'showroom3@tbsolaro.com',
    openingHours: '8:00 Am – 5:00 PM (Mon - Fri)',
    mapEmbed: '',
    coordinates: { lat: 21.58, lng: 106.48 },
    gallery: [
      'https://placehold.co/800x600/236B3A/FFFFFF?text=Showroom+3+Photo+1',
      'https://placehold.co/800x600/3D9B5C/FFFFFF?text=Showroom+3+Photo+2',
    ],
    status: 'published',
    sortOrder: 3,
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z',
  },
];

export function getPublishedShowrooms(): Showroom[] {
  return showrooms.filter((s) => s.status === 'published').sort((a, b) => a.sortOrder - b.sortOrder);
}
