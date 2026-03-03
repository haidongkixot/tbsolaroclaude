import type { Product } from '@/types';

export const products: Product[] = [
  {
    id: '1',
    slug: 'inv-bat5-basico',
    title: 'INV-BAT5 Básico',
    subtitle: 'Công suất pin 5kWh, cơ bản',
    excerpt: 'Hệ thống năng lượng mặt trời 5kWh phù hợp cho hộ gia đình nhỏ, tiết kiệm chi phí điện hiệu quả.',
    features: [
      '5 tấm pin mặt trời Grand Sunergy 5R9',
      '1 tủ điện 4kW',
      'Biến tần off-grid TB Solar 4kW',
      '1 pin lithium TB Solar 5kWh',
    ],
    specs: {
      'Công suất hệ thống': '5 kWp',
      'Công suất pin lưu trữ': '5 kWh',
      'Loại pin': 'Lithium LFP',
      'Biến tần': 'Off-grid 4kW',
      'Bảo hành': '10 năm',
    },
    tiers: [
      {
        name: 'basic',
        label: 'Basic',
        isDefault: true,
        items: ['5 tấm pin 5R9', '1 tủ điện 4kW', 'Biến tần off-grid 4kW', 'Pin lithium 5kWh'],
      },
      {
        name: 'premium',
        label: 'Premium',
        items: ['7 tấm pin 5R9', '1 tủ điện 6kW', 'Biến tần hybrid 6kW', 'Pin lithium 10kWh', 'Giám sát thông minh'],
      },
    ],
    gallery: [
      'https://placehold.co/600x400/1B5E30/FFFFFF?text=INV-BAT5+Basic+1',
      'https://placehold.co/600x400/236B3A/FFFFFF?text=INV-BAT5+Basic+2',
      'https://placehold.co/600x400/3D9B5C/FFFFFF?text=INV-BAT5+Basic+3',
    ],
    featuredImage: 'https://placehold.co/800x600/1B5E30/FFFFFF?text=INV-BAT5+Basico',
    category: 'combo',
    tags: ['off-grid', 'hộ gia đình', '5kWh'],
    downloadUrl: '/downloads/inv-bat5-basico-spec.pdf',
    relatedSlugs: ['inv-bat10-premium', 'inv-grid5-standard', 'solar-panel-mono-400w'],
    status: 'published',
    sortOrder: 1,
    seo: {
      metaTitle: 'INV-BAT5 Básico – Combo Năng Lượng Mặt Trời 5kWh | TBSolaro',
      metaDescription: 'Combo năng lượng mặt trời INV-BAT5 Básico 5kWh, lý tưởng cho hộ gia đình nhỏ. Tiết kiệm điện bền vững.',
    },
    createdAt: '2024-01-15T08:00:00Z',
    updatedAt: '2024-06-01T10:00:00Z',
  },
  {
    id: '2',
    slug: 'inv-bat10-premium',
    title: 'INV-BAT10 Premium',
    subtitle: 'Công suất pin 10kWh, cao cấp',
    excerpt: 'Combo năng lượng mặt trời 10kWh cao cấp, tối ưu cho hộ gia đình trung bình và nhà hàng nhỏ.',
    features: [
      '10 tấm pin mặt trời Grand Sunergy 5R9',
      '1 tủ điện 8kW',
      'Biến tần hybrid TB Solar 8kW',
      '2 pin lithium TB Solar 5kWh',
      'Hệ thống giám sát thông minh',
    ],
    specs: {
      'Công suất hệ thống': '10 kWp',
      'Công suất pin lưu trữ': '10 kWh',
      'Loại pin': 'Lithium LFP',
      'Biến tần': 'Hybrid 8kW',
      'Bảo hành': '12 năm',
    },
    tiers: [
      { name: 'basic', label: 'Basic', items: ['10 tấm pin 5R9', 'Biến tần hybrid 8kW', 'Pin lithium 10kWh'] },
      {
        name: 'premium',
        label: 'Premium',
        isDefault: true,
        items: ['12 tấm pin 5R9', 'Biến tần hybrid 10kW', 'Pin lithium 15kWh', 'Giám sát thông minh', 'Tủ điện thông minh'],
      },
    ],
    gallery: [
      'https://placehold.co/600x400/1B5E30/FFFFFF?text=INV-BAT10+1',
      'https://placehold.co/600x400/236B3A/FFFFFF?text=INV-BAT10+2',
    ],
    featuredImage: 'https://placehold.co/800x600/236B3A/FFFFFF?text=INV-BAT10+Premium',
    category: 'combo',
    tags: ['hybrid', 'hộ gia đình', '10kWh'],
    downloadUrl: '/downloads/inv-bat10-premium-spec.pdf',
    relatedSlugs: ['inv-bat5-basico', 'inv-grid5-standard'],
    status: 'published',
    sortOrder: 2,
    seo: {
      metaTitle: 'INV-BAT10 Premium – Combo Năng Lượng 10kWh | TBSolaro',
      metaDescription: 'Combo INV-BAT10 Premium 10kWh cho hộ gia đình, nhà hàng nhỏ. Bền vững, thông minh.',
    },
    createdAt: '2024-01-20T08:00:00Z',
    updatedAt: '2024-06-01T10:00:00Z',
  },
  {
    id: '3',
    slug: 'inv-grid5-standard',
    title: 'INV-GRID5 Standard',
    subtitle: 'Hệ thống hòa lưới 5kWp',
    excerpt: 'Hệ thống điện mặt trời hòa lưới 5kWp, bán điện lại lưới quốc gia, thu hồi vốn nhanh.',
    features: [
      '10 tấm pin mặt trời 500W mono',
      'Biến tần hòa lưới 5kW',
      'Tủ điện AC/DC',
      'Đồng hồ 2 chiều',
    ],
    specs: {
      'Công suất hệ thống': '5 kWp',
      'Loại hệ thống': 'On-grid',
      'Biến tần': 'On-grid 5kW',
      'Bảo hành': '10 năm',
    },
    tiers: [
      { name: 'standard', label: 'Standard', isDefault: true, items: ['10 tấm 500W', 'Biến tần 5kW', 'Tủ điện'] },
    ],
    gallery: ['https://placehold.co/600x400/3D9B5C/FFFFFF?text=INV-GRID5'],
    featuredImage: 'https://placehold.co/800x600/3D9B5C/FFFFFF?text=INV-GRID5+Standard',
    category: 'combo',
    tags: ['on-grid', 'hòa lưới'],
    status: 'published',
    sortOrder: 3,
    seo: { metaTitle: 'INV-GRID5 Standard | TBSolaro', metaDescription: 'Hệ thống hòa lưới 5kWp tiết kiệm và thu lợi từ điện mặt trời.' },
    createdAt: '2024-02-01T08:00:00Z',
    updatedAt: '2024-06-01T10:00:00Z',
  },
  {
    id: '4',
    slug: 'solar-panel-mono-400w',
    title: 'Tấm pin Mono 400W',
    subtitle: 'Tấm pin đơn tinh thể hiệu suất cao',
    excerpt: 'Tấm pin đơn tinh thể 400W hiệu suất cao, phù hợp mọi hệ thống năng lượng mặt trời.',
    features: [
      'Hiệu suất 21.5%',
      'Công suất 400Wp',
      'Bảo hành hiệu suất 25 năm',
      'Khung nhôm anodized chống ăn mòn',
    ],
    specs: {
      'Công suất': '400 Wp',
      'Hiệu suất': '21.5%',
      'Kích thước': '1755 x 1038 x 35 mm',
      'Trọng lượng': '20.5 kg',
      'Bảo hành': '25 năm hiệu suất',
    },
    tiers: [{ name: 'standard', label: 'Standard', isDefault: true }],
    gallery: ['https://placehold.co/600x400/52B788/FFFFFF?text=Mono+400W'],
    featuredImage: 'https://placehold.co/800x600/52B788/FFFFFF?text=Tam+Pin+Mono+400W',
    category: 'panel',
    tags: ['tấm pin', 'mono', '400W'],
    status: 'published',
    sortOrder: 4,
    seo: { metaTitle: 'Tấm Pin Mono 400W | TBSolaro', metaDescription: 'Tấm pin đơn tinh thể 400W hiệu suất cao, bảo hành 25 năm.' },
    createdAt: '2024-02-15T08:00:00Z',
    updatedAt: '2024-06-01T10:00:00Z',
  },
  {
    id: '5',
    slug: 'battery-lithium-10kwh',
    title: 'Pin Lithium LFP 10kWh',
    subtitle: 'Pin lưu trữ năng lượng dung lượng cao',
    excerpt: 'Pin lithium LFP 10kWh an toàn, tuổi thọ cao, phù hợp hệ thống off-grid và hybrid.',
    features: [
      'Dung lượng 10 kWh',
      'Chu kỳ nạp xả 6000+ lần',
      'Hóa học LFP an toàn nhiệt',
      'BMS thông minh tích hợp',
    ],
    specs: {
      'Dung lượng': '10 kWh',
      'Điện áp': '51.2V',
      'Chu kỳ': '6000+ lần @80% DOD',
      'Bảo hành': '10 năm',
    },
    tiers: [{ name: 'standard', label: 'Standard', isDefault: true }],
    gallery: ['https://placehold.co/600x400/1B5E30/FFFFFF?text=LFP+10kWh'],
    featuredImage: 'https://placehold.co/800x600/1B5E30/FFFFFF?text=Pin+Lithium+10kWh',
    category: 'battery',
    tags: ['pin lưu trữ', 'lithium', 'LFP'],
    status: 'published',
    sortOrder: 5,
    seo: { metaTitle: 'Pin Lithium LFP 10kWh | TBSolaro', metaDescription: 'Pin lưu trữ LFP 10kWh an toàn, bền bỉ cho hệ thống năng lượng mặt trời.' },
    createdAt: '2024-03-01T08:00:00Z',
    updatedAt: '2024-06-01T10:00:00Z',
  },
  {
    id: '6',
    slug: 'inverter-hybrid-8kw',
    title: 'Biến Tần Hybrid 8kW',
    subtitle: 'Biến tần hybrid thông minh đa chế độ',
    excerpt: 'Biến tần hybrid 8kW hỗ trợ on-grid, off-grid và backup, quản lý năng lượng thông minh.',
    features: [
      'Công suất 8kW',
      'Hỗ trợ on-grid, off-grid, backup',
      'MPPT kép hiệu suất 99.9%',
      'Kết nối WiFi/App giám sát',
    ],
    specs: {
      'Công suất': '8 kW',
      'Chế độ': 'Grid-tie / Off-grid / Backup',
      'MPPT': 'Kép',
      'Hiệu suất': '97.6%',
      'Bảo hành': '5 năm',
    },
    tiers: [{ name: 'standard', label: 'Standard', isDefault: true }],
    gallery: ['https://placehold.co/600x400/236B3A/FFFFFF?text=Hybrid+8kW'],
    featuredImage: 'https://placehold.co/800x600/236B3A/FFFFFF?text=Bien+Tan+Hybrid+8kW',
    category: 'inverter',
    tags: ['biến tần', 'hybrid', '8kW'],
    status: 'published',
    sortOrder: 6,
    seo: { metaTitle: 'Biến Tần Hybrid 8kW | TBSolaro', metaDescription: 'Biến tần hybrid 8kW thông minh, đa chế độ hoạt động.' },
    createdAt: '2024-03-15T08:00:00Z',
    updatedAt: '2024-06-01T10:00:00Z',
  },
];

export function getProductBySlug(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}

export function getRelatedProducts(slugs: string[]): Product[] {
  return products.filter((p) => slugs.includes(p.slug));
}

export function getPublishedProducts(): Product[] {
  return products.filter((p) => p.status === 'published').sort((a, b) => a.sortOrder - b.sortOrder);
}

export function getFeaturedCombos(): Product[] {
  return products.filter((p) => p.status === 'published' && p.category === 'combo').slice(0, 3);
}
