import type { Project } from '@/types';

export const projects: Project[] = [
  {
    id: '1',
    slug: 'truong-tieu-hoc-jose-marti',
    title: 'Ánh sáng đầu tiên tại Trường Tiểu học José Martí',
    excerpt: 'Dự án CSR lắp đặt hệ thống điện mặt trời cho trường tiểu học vùng nông thôn Cuba, mang điện sạch đến 300+ học sinh.',
    content: `<p>Trong khuôn khổ chương trình CSR của Tập đoàn Thái Bình tại Cuba, TBSolaro đã triển khai thành công dự án lắp đặt hệ thống năng lượng mặt trời 4.668 kWp tại Trường Tiểu học José Martí, tỉnh Artemisa.</p>

<p>Dự án không chỉ mang lại nguồn điện ổn định, sạch và miễn phí cho nhà trường, mà còn trở thành mô hình tiêu biểu về việc ứng dụng năng lượng tái tạo trong giáo dục tại Cuba.</p>

<h2>Thách thức và giải pháp</h2>
<p>Khu vực nông thôn tỉnh Artemisa thường xuyên chịu cảnh mất điện kéo dài do hạ tầng lưới điện yếu kém. Học sinh và giáo viên phải học và dạy trong điều kiện thiếu sáng, không có điều hòa, ảnh hưởng nghiêm trọng đến chất lượng giáo dục.</p>

<p>TBSolaro đã thiết kế hệ thống hybrid off-grid với dung lượng lưu trữ đủ cung cấp điện 24/7, đảm bảo trường học luôn có điện ngay cả trong những ngày không có nắng.</p>

<h2>Kết quả đạt được</h2>
<ul>
  <li>Cung cấp điện sạch cho 300+ học sinh và 45 giáo viên</li>
  <li>Tiết kiệm 100% chi phí điện hàng năm cho nhà trường</li>
  <li>Giảm phát thải CO₂ khoảng 3,5 tấn/năm</li>
  <li>Thời gian thi công: 28 ngày</li>
</ul>`,
    category: 'csr',
    location: 'Artemisa, Cuba',
    power: '4.668 kWp',
    installationDate: '28/07/2023',
    year: 2023,
    gallery: [
      'https://placehold.co/1200x600/1B5E30/FFFFFF?text=Jose+Marti+1',
      'https://placehold.co/1200x600/236B3A/FFFFFF?text=Jose+Marti+2',
      'https://placehold.co/1200x600/3D9B5C/FFFFFF?text=Jose+Marti+3',
    ],
    featuredImage: 'https://placehold.co/1200x600/1B5E30/FFFFFF?text=Truong+Tieu+Hoc+Jose+Marti',
    relatedSlugs: ['nang-luong-tuong-lai-tinh-holquin', 'truong-jose-marti-holquin', 'du-an-benh-vien-artemisa'],
    status: 'published',
    sortOrder: 1,
    seo: {
      metaTitle: 'Ánh Sáng Đầu Tiên tại Trường Tiểu học José Martí | TBSolaro',
      metaDescription: 'Dự án CSR TBSolaro lắp đặt hệ thống năng lượng mặt trời cho trường tiểu học tại Cuba.',
    },
    createdAt: '2023-08-01T08:00:00Z',
    updatedAt: '2024-01-15T08:00:00Z',
  },
  {
    id: '2',
    slug: 'nang-luong-tuong-lai-tinh-holquin',
    title: 'Năng lượng cho tương lai – Tỉnh Holguín',
    excerpt: 'Lắp đặt hệ thống điện mặt trời cho 3 trường học, 2 bệnh viện tại tỉnh Holguín, Cuba, phục vụ hơn 2.000 người.',
    content: `<p>Dự án mở rộng quy mô lớn tại tỉnh Holguín, Cuba – một trong những tỉnh chịu ảnh hưởng nặng nề nhất bởi tình trạng thiếu điện. TBSolaro đã triển khai đồng loạt 5 hệ thống năng lượng mặt trời cho các cơ sở giáo dục và y tế.</p>

<p>Tổng công suất lắp đặt đạt 32 kWp, đủ cung cấp điện ổn định cho hơn 2.000 học sinh, bệnh nhân và nhân viên y tế mỗi ngày.</p>`,
    category: 'csr',
    location: 'Holguín, Cuba',
    power: '32 kWp',
    installationDate: '15/03/2024',
    year: 2024,
    gallery: [
      'https://placehold.co/1200x600/236B3A/FFFFFF?text=Holquin+1',
      'https://placehold.co/1200x600/3D9B5C/FFFFFF?text=Holquin+2',
    ],
    featuredImage: 'https://placehold.co/1200x600/236B3A/FFFFFF?text=Holquin+Project',
    relatedSlugs: ['truong-tieu-hoc-jose-marti', 'du-an-benh-vien-artemisa'],
    status: 'published',
    sortOrder: 2,
    seo: {
      metaTitle: 'Năng Lượng Cho Tương Lai – Tỉnh Holguín | TBSolaro',
      metaDescription: 'Dự án CSR cung cấp điện sạch cho 5 cơ sở giáo dục và y tế tại Holguín, Cuba.',
    },
    createdAt: '2024-03-20T08:00:00Z',
    updatedAt: '2024-05-01T08:00:00Z',
  },
  {
    id: '3',
    slug: 'truong-jose-marti-holquin',
    title: 'Ánh sáng đầu tiên tại Trường Tiểu học – Tỉnh Holguín',
    excerpt: 'Dự án CSR mang điện mặt trời đến trường tiểu học khu vực miền núi, tỉnh Holguín.',
    content: `<p>Tiếp nối thành công của dự án tại Artemisa, TBSolaro triển khai thêm hệ thống 8 kWp tại trường tiểu học vùng núi tỉnh Holguín, nơi chưa từng có điện lưới ổn định.</p>`,
    category: 'csr',
    location: 'Holguín, Cuba',
    power: '8 kWp',
    installationDate: '10/05/2024',
    year: 2024,
    gallery: ['https://placehold.co/1200x600/3D9B5C/FFFFFF?text=Holquin+School'],
    featuredImage: 'https://placehold.co/1200x600/3D9B5C/FFFFFF?text=Truong+Holquin',
    relatedSlugs: ['truong-tieu-hoc-jose-marti', 'nang-luong-tuong-lai-tinh-holquin'],
    status: 'published',
    sortOrder: 3,
    seo: { metaTitle: 'Trường Tiểu học Holguín | TBSolaro', metaDescription: 'Hệ thống điện mặt trời 8kWp cho trường tiểu học miền núi Holguín.' },
    createdAt: '2024-05-15T08:00:00Z',
    updatedAt: '2024-06-01T08:00:00Z',
  },
  {
    id: '4',
    slug: 'du-an-benh-vien-artemisa',
    title: 'Năng lượng tương lai – Tỉnh Artemisa',
    excerpt: 'Cung cấp điện sạch liên tục cho bệnh viện huyện tại Artemisa, đảm bảo hoạt động y tế không gián đoạn.',
    content: `<p>Bệnh viện huyện Artemisa là cơ sở y tế quan trọng phục vụ 50.000+ người dân. Tình trạng mất điện thường xuyên gây nguy hiểm cho bệnh nhân đang điều trị. TBSolaro đã lắp đặt hệ thống hybrid 15 kWp với dung lượng lưu trữ 30 kWh đảm bảo điện 24/7.</p>`,
    category: 'csr',
    location: 'Artemisa, Cuba',
    power: '15 kWp',
    installationDate: '20/08/2023',
    year: 2023,
    gallery: ['https://placehold.co/1200x600/52B788/FFFFFF?text=Benh+Vien+Artemisa'],
    featuredImage: 'https://placehold.co/1200x600/52B788/FFFFFF?text=Benh+Vien+Artemisa',
    relatedSlugs: ['truong-tieu-hoc-jose-marti', 'nang-luong-tuong-lai-tinh-holquin'],
    status: 'published',
    sortOrder: 4,
    seo: { metaTitle: 'Bệnh Viện Artemisa – Năng Lượng Bền Vững | TBSolaro', metaDescription: 'Hệ thống 15kWp cung cấp điện liên tục cho bệnh viện tại Artemisa, Cuba.' },
    createdAt: '2023-09-01T08:00:00Z',
    updatedAt: '2024-01-15T08:00:00Z',
  },
  {
    id: '5',
    slug: 'nha-may-che-bien-thuc-pham',
    title: 'Hệ thống 500kWp – Nhà máy chế biến thực phẩm',
    excerpt: 'Lắp đặt hệ thống năng lượng mặt trời 500kWp hòa lưới cho nhà máy chế biến thực phẩm, tiết kiệm 45% chi phí điện.',
    content: `<p>Nhà máy chế biến thực phẩm với nhu cầu điện lớn là ứng viên lý tưởng cho hệ thống điện mặt trời quy mô công nghiệp. TBSolaro đã thiết kế và lắp đặt hệ thống 500kWp on-grid với ROI dự kiến trong 5-6 năm.</p>`,
    category: 'enterprise',
    location: 'Thái Bình, Việt Nam',
    power: '500 kWp',
    installationDate: '01/11/2023',
    year: 2023,
    gallery: ['https://placehold.co/1200x600/1B5E30/FFFFFF?text=Nha+May+500kWp'],
    featuredImage: 'https://placehold.co/1200x600/1B5E30/FFFFFF?text=Nha+May+500kWp',
    status: 'published',
    sortOrder: 5,
    seo: { metaTitle: 'Hệ Thống 500kWp – Nhà Máy Chế Biến | TBSolaro', metaDescription: 'Dự án điện mặt trời 500kWp cho nhà máy, tiết kiệm 45% chi phí điện.' },
    createdAt: '2023-11-15T08:00:00Z',
    updatedAt: '2024-02-01T08:00:00Z',
  },
  {
    id: '6',
    slug: 'ho-gia-dinh-mini-rooftop',
    title: 'Mini Rooftop – Giải pháp hộ gia đình tiết kiệm',
    excerpt: 'Hệ thống mini rooftop 5kWp lắp đặt cho hộ gia đình, hoàn vốn trong 4-5 năm, bảo hành 25 năm.',
    content: `<p>Hệ thống năng lượng mặt trời mini rooftop là giải pháp tối ưu cho hộ gia đình muốn tiết kiệm điện và góp phần bảo vệ môi trường. TBSolaro cung cấp gói trọn gói từ khảo sát đến lắp đặt và bảo trì.</p>`,
    category: 'household',
    location: 'Thái Bình, Việt Nam',
    power: '5 kWp',
    installationDate: '15/04/2024',
    year: 2024,
    gallery: ['https://placehold.co/1200x600/3D9B5C/FFFFFF?text=Ho+Gia+Dinh+5kWp'],
    featuredImage: 'https://placehold.co/1200x600/3D9B5C/FFFFFF?text=Mini+Rooftop',
    status: 'published',
    sortOrder: 6,
    seo: { metaTitle: 'Mini Rooftop – Giải Pháp Hộ Gia Đình | TBSolaro', metaDescription: 'Điện mặt trời 5kWp cho hộ gia đình, hoàn vốn 4-5 năm.' },
    createdAt: '2024-04-20T08:00:00Z',
    updatedAt: '2024-05-15T08:00:00Z',
  },
  {
    id: '7',
    slug: 'truong-hoc-benh-vien-cong-dong',
    title: 'Dự án cộng đồng – Lắp đặt cho trường học, bệnh viện',
    excerpt: 'Dự án năng lượng cộng đồng tại vùng xa, cung cấp điện sạch và bền vững cho trường học và bệnh viện địa phương.',
    content: `<p>TBSolaro cam kết mang điện sạch đến những nơi cần thiết nhất. Dự án cộng đồng này lắp đặt tổng cộng 60kWp cho 4 cơ sở tại vùng xa xôi, nơi điện lưới không ổn định.</p>`,
    category: 'community',
    location: 'Tỉnh Artemisa, Cuba',
    power: '60 kWp',
    installationDate: '30/06/2024',
    year: 2024,
    gallery: ['https://placehold.co/1200x600/52B788/FFFFFF?text=Cong+Dong+60kWp'],
    featuredImage: 'https://placehold.co/1200x600/52B788/FFFFFF?text=Du+An+Cong+Dong',
    status: 'published',
    sortOrder: 7,
    seo: { metaTitle: 'Dự Án Cộng Đồng – Điện Sạch Cho Vùng Xa | TBSolaro', metaDescription: '60kWp cho cộng đồng vùng xa, điện sạch và bền vững.' },
    createdAt: '2024-07-01T08:00:00Z',
    updatedAt: '2024-07-15T08:00:00Z',
  },
];

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}

export function getPublishedProjects(): Project[] {
  return projects.filter((p) => p.status === 'published').sort((a, b) => a.sortOrder - b.sortOrder);
}

export function getProjectsByCategory(category: Project['category']): Project[] {
  return projects.filter((p) => p.status === 'published' && p.category === category);
}

export function getCSRProjects(): Project[] {
  return getProjectsByCategory('csr');
}

export function getRelatedProjects(slugs: string[]): Project[] {
  return projects.filter((p) => slugs.includes(p.slug));
}
