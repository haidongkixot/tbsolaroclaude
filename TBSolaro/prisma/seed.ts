import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Seeding database...');

  // Products
  const products = [
    {
      id: 'prod-1', slug: 'inv-bat5-basico', titleVi: 'INV-BAT5 Básico',
      subtitleVi: 'Công suất pin 5kWh, cơ bản',
      excerptVi: 'Hệ thống năng lượng mặt trời 5kWh phù hợp cho hộ gia đình nhỏ.',
      category: 'combo', status: 'published', sortOrder: 1,
      featuredImage: 'https://placehold.co/800x600/1B5E30/FFFFFF?text=INV-BAT5',
      gallery: JSON.stringify(['https://placehold.co/800x600/1B5E30/FFFFFF?text=INV-BAT5']),
      tags: JSON.stringify(['off-grid', 'lithium', '5kWh']),
      relatedSlugs: JSON.stringify([]),
      featuresVi: JSON.stringify(['5 tấm pin mặt trời Grand Sunergy 5R9', '1 tủ điện 4kW', 'Biến tần off-grid TB Solar 4kW', '1 pin lithium TB Solar 5kWh']),
      specsVi: JSON.stringify({ 'Công suất hệ thống': '5 kWp', 'Loại pin': 'Lithium LFP', 'Bảo hành': '10 năm' }),
      tiersVi: JSON.stringify([{ name: 'basic', label: 'Basic', isDefault: true, items: ['5 tấm pin 5R9', 'Biến tần off-grid 4kW', 'Pin lithium 5kWh'] }]),
    },
    {
      id: 'prod-2', slug: 'inv-bat10-premium', titleVi: 'INV-BAT10 Premium',
      subtitleVi: 'Công suất pin 10kWh, cao cấp',
      excerptVi: 'Hệ thống năng lượng mặt trời 10kWh cho hộ gia đình lớn và văn phòng nhỏ.',
      category: 'combo', status: 'published', sortOrder: 2,
      featuredImage: 'https://placehold.co/800x600/1B5E30/FFFFFF?text=INV-BAT10',
      gallery: JSON.stringify(['https://placehold.co/800x600/1B5E30/FFFFFF?text=INV-BAT10']),
      tags: JSON.stringify(['hybrid', 'lithium', '10kWh']),
      relatedSlugs: JSON.stringify([]),
      featuresVi: JSON.stringify(['10 tấm pin mặt trời Grand Sunergy 5R9', 'Biến tần hybrid TB Solar 8kW', '2 pin lithium TB Solar 5kWh']),
      specsVi: JSON.stringify({ 'Công suất hệ thống': '10 kWp', 'Loại pin': 'Lithium LFP', 'Bảo hành': '10 năm' }),
      tiersVi: JSON.stringify([{ name: 'standard', label: 'Standard', isDefault: true, items: ['10 tấm pin 5R9', 'Biến tần hybrid 8kW', 'Pin 10kWh'] }]),
    },
    {
      id: 'prod-3', slug: 'inv-grid5-standard', titleVi: 'INV-GRID5 Standard',
      subtitleVi: 'On-grid 5kWp kết nối lưới điện',
      excerptVi: 'Hệ thống nối lưới 5kWp, tiết kiệm hóa đơn điện tối ưu.',
      category: 'combo', status: 'published', sortOrder: 3,
      featuredImage: 'https://placehold.co/800x600/1B5E30/FFFFFF?text=INV-GRID5',
      gallery: JSON.stringify(['https://placehold.co/800x600/1B5E30/FFFFFF?text=INV-GRID5']),
      tags: JSON.stringify(['on-grid', 'solar', '5kWp']),
      relatedSlugs: JSON.stringify([]),
      featuresVi: JSON.stringify(['10 tấm pin mặt trời Mono 500W', 'Biến tần on-grid SolarEdge 5kW']),
      specsVi: JSON.stringify({ 'Công suất': '5 kWp', 'Loại hệ thống': 'On-grid', 'Bảo hành pin': '25 năm' }),
      tiersVi: JSON.stringify([{ name: 'standard', label: 'Standard', isDefault: true, items: ['10 tấm pin Mono 500W', 'Biến tần on-grid 5kW'] }]),
    },
  ];

  for (const p of products) {
    await prisma.product.upsert({
      where: { slug: p.slug },
      update: {},
      create: p,
    });
  }
  console.log(`✅ Seeded ${products.length} products`);

  // Projects
  const projects = [
    {
      id: 'proj-1', slug: 'jose-marti-school-cuba', status: 'published', category: 'csr', sortOrder: 1,
      location: 'Havana, Cuba', power: '4.668 kWp', installationDate: '2024-03-15', year: '2024',
      titleVi: 'Trường tiểu học José Martí – Cuba',
      excerptVi: 'Hệ thống năng lượng mặt trời 4.668 kWp cho trường học tại Cuba.',
      contentVi: '<p>TBSolaro đã triển khai hệ thống năng lượng mặt trời 4.668 kWp cho trường tiểu học José Martí tại Cuba.</p>',
      featuredImage: 'https://placehold.co/800x500/1B5E30/FFFFFF?text=Jose+Marti+School',
      gallery: JSON.stringify(['https://placehold.co/800x500/1B5E30/FFFFFF?text=Jose+Marti+School', 'https://placehold.co/800x500/236B3A/FFFFFF?text=Installation']),
      relatedSlugs: JSON.stringify([]),
    },
    {
      id: 'proj-2', slug: 'food-processing-plant-vietnam', status: 'published', category: 'enterprise', sortOrder: 2,
      location: 'Bình Dương, Việt Nam', power: '500 kWp', installationDate: '2023-08-10', year: '2023',
      titleVi: 'Nhà máy chế biến thực phẩm – Việt Nam',
      excerptVi: 'Hệ thống điện mặt trời 500 kWp cho nhà máy chế biến thực phẩm.',
      contentVi: '<p>Dự án lắp đặt hệ thống điện mặt trời áp mái 500 kWp cho nhà máy tại Bình Dương.</p>',
      featuredImage: 'https://placehold.co/800x500/1B5E30/FFFFFF?text=Food+Processing+Plant',
      gallery: JSON.stringify(['https://placehold.co/800x500/1B5E30/FFFFFF?text=Factory+Rooftop']),
      relatedSlugs: JSON.stringify([]),
    },
    {
      id: 'proj-3', slug: 'household-rooftop-hanoi', status: 'published', category: 'household', sortOrder: 3,
      location: 'Hà Nội, Việt Nam', power: '5 kWp', installationDate: '2024-01-20', year: '2024',
      titleVi: 'Hộ gia đình mái nhà – Hà Nội',
      excerptVi: 'Hệ thống mini rooftop 5 kWp cho hộ gia đình tại Hà Nội.',
      contentVi: '<p>Lắp đặt hệ thống điện mặt trời 5 kWp tại quận Cầu Giấy, Hà Nội.</p>',
      featuredImage: 'https://placehold.co/800x500/1B5E30/FFFFFF?text=Household+Rooftop',
      gallery: JSON.stringify(['https://placehold.co/800x500/1B5E30/FFFFFF?text=Rooftop+5kWp']),
      relatedSlugs: JSON.stringify([]),
    },
  ];

  for (const p of projects) {
    await prisma.project.upsert({
      where: { slug: p.slug },
      update: {},
      create: p,
    });
  }
  console.log(`✅ Seeded ${projects.length} projects`);

  // Blog Posts
  const blogs = [
    {
      id: 'blog-1', slug: 'kien-tao-nang-luong-ben-vung', status: 'published',
      publishedAt: new Date('2024-03-15'), author: 'Đội ngũ TBSolaro',
      titleVi: 'Kiến tạo năng lượng bền vững – Nuôi dưỡng tương lai xanh',
      excerptVi: 'TBSolaro – Thương hiệu điện năng lượng mặt trời hàng đầu của Tập đoàn Thái Bình.',
      contentVi: '<p>Năng lượng mặt trời đang trở thành giải pháp thiết yếu trong bối cảnh biến đổi khí hậu toàn cầu.</p>',
      featuredImage: 'https://placehold.co/800x450/1B5E30/FFFFFF?text=Sustainable+Energy',
      gallery: JSON.stringify([]),
      tags: JSON.stringify(['Năng lượng xanh', 'CSR', 'TBSolaro']),
      relatedSlugs: JSON.stringify([]),
    },
    {
      id: 'blog-2', slug: 'xu-huong-nang-luong-tai-tao-2024', status: 'published',
      publishedAt: new Date('2024-02-10'), author: 'Đội ngũ TBSolaro',
      titleVi: 'Xu hướng năng lượng tái tạo 2024',
      excerptVi: 'Các xu hướng mới nhất trong ngành năng lượng tái tạo toàn cầu.',
      contentVi: '<p>Năm 2024 chứng kiến sự bùng nổ của năng lượng tái tạo tại Đông Nam Á.</p>',
      featuredImage: 'https://placehold.co/800x450/236B3A/FFFFFF?text=Renewable+Trends',
      gallery: JSON.stringify([]),
      tags: JSON.stringify(['Xu hướng', 'Năng lượng tái tạo', '2024']),
      relatedSlugs: JSON.stringify([]),
    },
    {
      id: 'blog-3', slug: 'loi-ich-dien-mat-troi-doanh-nghiep', status: 'published',
      publishedAt: new Date('2024-01-05'), author: 'Đội ngũ TBSolaro',
      titleVi: 'Lợi ích điện mặt trời cho doanh nghiệp',
      excerptVi: 'Tại sao các doanh nghiệp nên đầu tư vào hệ thống điện mặt trời ngay từ bây giờ?',
      contentVi: '<p>Đầu tư vào hệ thống điện mặt trời mang lại ROI trung bình từ 5-7 năm.</p>',
      featuredImage: 'https://placehold.co/800x450/3D9B5C/FFFFFF?text=Business+Solar',
      gallery: JSON.stringify([]),
      tags: JSON.stringify(['Doanh nghiệp', 'ROI', 'Điện mặt trời']),
      relatedSlugs: JSON.stringify([]),
    },
  ];

  for (const b of blogs) {
    await prisma.blogPost.upsert({
      where: { slug: b.slug },
      update: {},
      create: b,
    });
  }
  console.log(`✅ Seeded ${blogs.length} blog posts`);

  console.log('🎉 Seeding complete!');
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
