import Database from 'better-sqlite3';
import path from 'path';

const dbPath = path.resolve(process.cwd(), 'dev.db');
const db = new Database(dbPath);

const now = new Date().toISOString();

function run() {
  console.log('🌱 Seeding database...');

  // Products
  const upsertProduct = db.prepare(`
    INSERT INTO Product (
      id, slug, status, category, sortOrder, downloadUrl, featuredImage,
      gallery, tags, relatedSlugs, seoOgImage,
      titleVi, titleEn, titleEs, subtitleVi, subtitleEn, subtitleEs,
      excerptVi, excerptEn, excerptEs, featuresVi, featuresEn, featuresEs,
      specsVi, specsEn, specsEs, tiersVi, tiersEn, tiersEs,
      seoTitleVi, seoTitleEn, seoTitleEs, seoDescVi, seoDescEn, seoDescEs,
      createdAt, updatedAt
    ) VALUES (
      @id, @slug, @status, @category, @sortOrder, @downloadUrl, @featuredImage,
      @gallery, @tags, @relatedSlugs, @seoOgImage,
      @titleVi, @titleEn, @titleEs, @subtitleVi, @subtitleEn, @subtitleEs,
      @excerptVi, @excerptEn, @excerptEs, @featuresVi, @featuresEn, @featuresEs,
      @specsVi, @specsEn, @specsEs, @tiersVi, @tiersEn, @tiersEs,
      @seoTitleVi, @seoTitleEn, @seoTitleEs, @seoDescVi, @seoDescEn, @seoDescEs,
      @createdAt, @updatedAt
    ) ON CONFLICT(slug) DO NOTHING
  `);

  const products = [
    {
      id: 'prod-1', slug: 'inv-bat5-basico', titleVi: 'INV-BAT5 Básico',
      titleEn: '', titleEs: '',
      subtitleVi: 'Công suất pin 5kWh, cơ bản', subtitleEn: '', subtitleEs: '',
      excerptVi: 'Hệ thống năng lượng mặt trời 5kWh phù hợp cho hộ gia đình nhỏ.', excerptEn: '', excerptEs: '',
      category: 'combo', status: 'published', sortOrder: 1, downloadUrl: '', seoOgImage: '',
      featuredImage: 'https://placehold.co/800x600/1B5E30/FFFFFF?text=INV-BAT5',
      gallery: JSON.stringify(['https://placehold.co/800x600/1B5E30/FFFFFF?text=INV-BAT5']),
      tags: JSON.stringify(['off-grid', 'lithium', '5kWh']),
      relatedSlugs: JSON.stringify([]),
      featuresVi: JSON.stringify(['5 tấm pin mặt trời Grand Sunergy 5R9', '1 tủ điện 4kW', 'Biến tần off-grid TB Solar 4kW', '1 pin lithium TB Solar 5kWh']),
      featuresEn: JSON.stringify([]), featuresEs: JSON.stringify([]),
      specsVi: JSON.stringify({ 'Công suất hệ thống': '5 kWp', 'Loại pin': 'Lithium LFP', 'Bảo hành': '10 năm' }),
      specsEn: JSON.stringify({}), specsEs: JSON.stringify({}),
      tiersVi: JSON.stringify([{ name: 'basic', label: 'Basic', isDefault: true, items: ['5 tấm pin 5R9', 'Biến tần off-grid 4kW', 'Pin lithium 5kWh'] }]),
      tiersEn: JSON.stringify([]), tiersEs: JSON.stringify([]),
      seoTitleVi: '', seoTitleEn: '', seoTitleEs: '',
      seoDescVi: '', seoDescEn: '', seoDescEs: '',
      createdAt: now, updatedAt: now,
    },
    {
      id: 'prod-2', slug: 'inv-bat10-premium', titleVi: 'INV-BAT10 Premium',
      titleEn: '', titleEs: '',
      subtitleVi: 'Công suất pin 10kWh, cao cấp', subtitleEn: '', subtitleEs: '',
      excerptVi: 'Hệ thống năng lượng mặt trời 10kWh cho hộ gia đình lớn và văn phòng nhỏ.', excerptEn: '', excerptEs: '',
      category: 'combo', status: 'published', sortOrder: 2, downloadUrl: '', seoOgImage: '',
      featuredImage: 'https://placehold.co/800x600/1B5E30/FFFFFF?text=INV-BAT10',
      gallery: JSON.stringify(['https://placehold.co/800x600/1B5E30/FFFFFF?text=INV-BAT10']),
      tags: JSON.stringify(['hybrid', 'lithium', '10kWh']),
      relatedSlugs: JSON.stringify([]),
      featuresVi: JSON.stringify(['10 tấm pin mặt trời Grand Sunergy 5R9', 'Biến tần hybrid TB Solar 8kW', '2 pin lithium TB Solar 5kWh']),
      featuresEn: JSON.stringify([]), featuresEs: JSON.stringify([]),
      specsVi: JSON.stringify({ 'Công suất hệ thống': '10 kWp', 'Loại pin': 'Lithium LFP', 'Bảo hành': '10 năm' }),
      specsEn: JSON.stringify({}), specsEs: JSON.stringify({}),
      tiersVi: JSON.stringify([{ name: 'standard', label: 'Standard', isDefault: true, items: ['10 tấm pin 5R9', 'Biến tần hybrid 8kW', 'Pin 10kWh'] }]),
      tiersEn: JSON.stringify([]), tiersEs: JSON.stringify([]),
      seoTitleVi: '', seoTitleEn: '', seoTitleEs: '',
      seoDescVi: '', seoDescEn: '', seoDescEs: '',
      createdAt: now, updatedAt: now,
    },
    {
      id: 'prod-3', slug: 'inv-grid5-standard', titleVi: 'INV-GRID5 Standard',
      titleEn: '', titleEs: '',
      subtitleVi: 'On-grid 5kWp kết nối lưới điện', subtitleEn: '', subtitleEs: '',
      excerptVi: 'Hệ thống nối lưới 5kWp, tiết kiệm hóa đơn điện tối ưu.', excerptEn: '', excerptEs: '',
      category: 'combo', status: 'published', sortOrder: 3, downloadUrl: '', seoOgImage: '',
      featuredImage: 'https://placehold.co/800x600/1B5E30/FFFFFF?text=INV-GRID5',
      gallery: JSON.stringify(['https://placehold.co/800x600/1B5E30/FFFFFF?text=INV-GRID5']),
      tags: JSON.stringify(['on-grid', 'solar', '5kWp']),
      relatedSlugs: JSON.stringify([]),
      featuresVi: JSON.stringify(['10 tấm pin mặt trời Mono 500W', 'Biến tần on-grid SolarEdge 5kW']),
      featuresEn: JSON.stringify([]), featuresEs: JSON.stringify([]),
      specsVi: JSON.stringify({ 'Công suất': '5 kWp', 'Loại hệ thống': 'On-grid', 'Bảo hành pin': '25 năm' }),
      specsEn: JSON.stringify({}), specsEs: JSON.stringify({}),
      tiersVi: JSON.stringify([{ name: 'standard', label: 'Standard', isDefault: true, items: ['10 tấm pin Mono 500W', 'Biến tần on-grid 5kW'] }]),
      tiersEn: JSON.stringify([]), tiersEs: JSON.stringify([]),
      seoTitleVi: '', seoTitleEn: '', seoTitleEs: '',
      seoDescVi: '', seoDescEn: '', seoDescEs: '',
      createdAt: now, updatedAt: now,
    },
  ];

  for (const p of products) upsertProduct.run(p);
  console.log(`✅ Seeded ${products.length} products`);

  // Projects
  const upsertProject = db.prepare(`
    INSERT INTO Project (
      id, slug, status, category, sortOrder, location, power, installationDate,
      year, videoUrl, featuredImage, gallery, relatedSlugs, seoOgImage,
      titleVi, titleEn, titleEs, excerptVi, excerptEn, excerptEs,
      contentVi, contentEn, contentEs, seoTitleVi, seoTitleEn, seoTitleEs,
      seoDescVi, seoDescEn, seoDescEs, createdAt, updatedAt
    ) VALUES (
      @id, @slug, @status, @category, @sortOrder, @location, @power, @installationDate,
      @year, @videoUrl, @featuredImage, @gallery, @relatedSlugs, @seoOgImage,
      @titleVi, @titleEn, @titleEs, @excerptVi, @excerptEn, @excerptEs,
      @contentVi, @contentEn, @contentEs, @seoTitleVi, @seoTitleEn, @seoTitleEs,
      @seoDescVi, @seoDescEn, @seoDescEs, @createdAt, @updatedAt
    ) ON CONFLICT(slug) DO NOTHING
  `);

  const projects = [
    {
      id: 'proj-1', slug: 'jose-marti-school-cuba', status: 'published', category: 'csr', sortOrder: 1,
      location: 'Havana, Cuba', power: '4.668 kWp', installationDate: '2024-03-15', year: '2024', videoUrl: '', seoOgImage: '',
      titleVi: 'Trường tiểu học José Martí – Cuba', titleEn: '', titleEs: '',
      excerptVi: 'Hệ thống năng lượng mặt trời 4.668 kWp cho trường học tại Cuba.', excerptEn: '', excerptEs: '',
      contentVi: '<p>TBSolaro đã triển khai hệ thống năng lượng mặt trời 4.668 kWp cho trường tiểu học José Martí tại Cuba.</p>', contentEn: '', contentEs: '',
      featuredImage: 'https://placehold.co/800x500/1B5E30/FFFFFF?text=Jose+Marti+School',
      gallery: JSON.stringify(['https://placehold.co/800x500/1B5E30/FFFFFF?text=Jose+Marti+School', 'https://placehold.co/800x500/236B3A/FFFFFF?text=Installation']),
      relatedSlugs: JSON.stringify([]),
      seoTitleVi: '', seoTitleEn: '', seoTitleEs: '', seoDescVi: '', seoDescEn: '', seoDescEs: '',
      createdAt: now, updatedAt: now,
    },
    {
      id: 'proj-2', slug: 'food-processing-plant-vietnam', status: 'published', category: 'enterprise', sortOrder: 2,
      location: 'Bình Dương, Việt Nam', power: '500 kWp', installationDate: '2023-08-10', year: '2023', videoUrl: '', seoOgImage: '',
      titleVi: 'Nhà máy chế biến thực phẩm – Việt Nam', titleEn: '', titleEs: '',
      excerptVi: 'Hệ thống điện mặt trời 500 kWp cho nhà máy chế biến thực phẩm.', excerptEn: '', excerptEs: '',
      contentVi: '<p>Dự án lắp đặt hệ thống điện mặt trời áp mái 500 kWp cho nhà máy tại Bình Dương.</p>', contentEn: '', contentEs: '',
      featuredImage: 'https://placehold.co/800x500/1B5E30/FFFFFF?text=Food+Processing+Plant',
      gallery: JSON.stringify(['https://placehold.co/800x500/1B5E30/FFFFFF?text=Factory+Rooftop']),
      relatedSlugs: JSON.stringify([]),
      seoTitleVi: '', seoTitleEn: '', seoTitleEs: '', seoDescVi: '', seoDescEn: '', seoDescEs: '',
      createdAt: now, updatedAt: now,
    },
    {
      id: 'proj-3', slug: 'household-rooftop-hanoi', status: 'published', category: 'household', sortOrder: 3,
      location: 'Hà Nội, Việt Nam', power: '5 kWp', installationDate: '2024-01-20', year: '2024', videoUrl: '', seoOgImage: '',
      titleVi: 'Hộ gia đình mái nhà – Hà Nội', titleEn: '', titleEs: '',
      excerptVi: 'Hệ thống mini rooftop 5 kWp cho hộ gia đình tại Hà Nội.', excerptEn: '', excerptEs: '',
      contentVi: '<p>Lắp đặt hệ thống điện mặt trời 5 kWp tại quận Cầu Giấy, Hà Nội.</p>', contentEn: '', contentEs: '',
      featuredImage: 'https://placehold.co/800x500/1B5E30/FFFFFF?text=Household+Rooftop',
      gallery: JSON.stringify(['https://placehold.co/800x500/1B5E30/FFFFFF?text=Rooftop+5kWp']),
      relatedSlugs: JSON.stringify([]),
      seoTitleVi: '', seoTitleEn: '', seoTitleEs: '', seoDescVi: '', seoDescEn: '', seoDescEs: '',
      createdAt: now, updatedAt: now,
    },
  ];

  for (const p of projects) upsertProject.run(p);
  console.log(`✅ Seeded ${projects.length} projects`);

  // Blog Posts
  const upsertBlog = db.prepare(`
    INSERT INTO BlogPost (
      id, slug, status, publishedAt, author, featuredImage, gallery, tags,
      relatedSlugs, seoOgImage, titleVi, titleEn, titleEs,
      excerptVi, excerptEn, excerptEs, contentVi, contentEn, contentEs,
      seoTitleVi, seoTitleEn, seoTitleEs, seoDescVi, seoDescEn, seoDescEs,
      createdAt, updatedAt
    ) VALUES (
      @id, @slug, @status, @publishedAt, @author, @featuredImage, @gallery, @tags,
      @relatedSlugs, @seoOgImage, @titleVi, @titleEn, @titleEs,
      @excerptVi, @excerptEn, @excerptEs, @contentVi, @contentEn, @contentEs,
      @seoTitleVi, @seoTitleEn, @seoTitleEs, @seoDescVi, @seoDescEn, @seoDescEs,
      @createdAt, @updatedAt
    ) ON CONFLICT(slug) DO NOTHING
  `);

  const blogs = [
    {
      id: 'blog-1', slug: 'kien-tao-nang-luong-ben-vung', status: 'published',
      publishedAt: '2024-03-15T00:00:00.000Z', author: 'Đội ngũ TBSolaro', seoOgImage: '',
      titleVi: 'Kiến tạo năng lượng bền vững – Nuôi dưỡng tương lai xanh', titleEn: '', titleEs: '',
      excerptVi: 'TBSolaro – Thương hiệu điện năng lượng mặt trời hàng đầu của Tập đoàn Thái Bình.', excerptEn: '', excerptEs: '',
      contentVi: '<p>Năng lượng mặt trời đang trở thành giải pháp thiết yếu trong bối cảnh biến đổi khí hậu toàn cầu.</p>', contentEn: '', contentEs: '',
      featuredImage: 'https://placehold.co/800x450/1B5E30/FFFFFF?text=Sustainable+Energy',
      gallery: JSON.stringify([]),
      tags: JSON.stringify(['Năng lượng xanh', 'CSR', 'TBSolaro']),
      relatedSlugs: JSON.stringify([]),
      seoTitleVi: '', seoTitleEn: '', seoTitleEs: '', seoDescVi: '', seoDescEn: '', seoDescEs: '',
      createdAt: now, updatedAt: now,
    },
    {
      id: 'blog-2', slug: 'xu-huong-nang-luong-tai-tao-2024', status: 'published',
      publishedAt: '2024-02-10T00:00:00.000Z', author: 'Đội ngũ TBSolaro', seoOgImage: '',
      titleVi: 'Xu hướng năng lượng tái tạo 2024', titleEn: '', titleEs: '',
      excerptVi: 'Các xu hướng mới nhất trong ngành năng lượng tái tạo toàn cầu.', excerptEn: '', excerptEs: '',
      contentVi: '<p>Năm 2024 chứng kiến sự bùng nổ của năng lượng tái tạo tại Đông Nam Á.</p>', contentEn: '', contentEs: '',
      featuredImage: 'https://placehold.co/800x450/236B3A/FFFFFF?text=Renewable+Trends',
      gallery: JSON.stringify([]),
      tags: JSON.stringify(['Xu hướng', 'Năng lượng tái tạo', '2024']),
      relatedSlugs: JSON.stringify([]),
      seoTitleVi: '', seoTitleEn: '', seoTitleEs: '', seoDescVi: '', seoDescEn: '', seoDescEs: '',
      createdAt: now, updatedAt: now,
    },
    {
      id: 'blog-3', slug: 'loi-ich-dien-mat-troi-doanh-nghiep', status: 'published',
      publishedAt: '2024-01-05T00:00:00.000Z', author: 'Đội ngũ TBSolaro', seoOgImage: '',
      titleVi: 'Lợi ích điện mặt trời cho doanh nghiệp', titleEn: '', titleEs: '',
      excerptVi: 'Tại sao các doanh nghiệp nên đầu tư vào hệ thống điện mặt trời ngay từ bây giờ?', excerptEn: '', excerptEs: '',
      contentVi: '<p>Đầu tư vào hệ thống điện mặt trời mang lại ROI trung bình từ 5-7 năm.</p>', contentEn: '', contentEs: '',
      featuredImage: 'https://placehold.co/800x450/3D9B5C/FFFFFF?text=Business+Solar',
      gallery: JSON.stringify([]),
      tags: JSON.stringify(['Doanh nghiệp', 'ROI', 'Điện mặt trời']),
      relatedSlugs: JSON.stringify([]),
      seoTitleVi: '', seoTitleEn: '', seoTitleEs: '', seoDescVi: '', seoDescEn: '', seoDescEs: '',
      createdAt: now, updatedAt: now,
    },
  ];

  for (const b of blogs) upsertBlog.run(b);
  console.log(`✅ Seeded ${blogs.length} blog posts`);

  db.close();
  console.log('🎉 Seeding complete!');
}

run();
