-- ============================================================
-- TBSolaro Sample Data — paste this into Neon SQL Editor
-- Run AFTER the app has deployed once (tables created by prisma db push)
-- ============================================================

-- Products
INSERT INTO "Product" (
  id, slug, status, category, "sortOrder", "downloadUrl", "featuredImage",
  gallery, tags, "relatedSlugs", "seoOgImage",
  "titleVi", "titleEn", "titleEs",
  "subtitleVi", "subtitleEn", "subtitleEs",
  "excerptVi", "excerptEn", "excerptEs",
  "featuresVi", "featuresEn", "featuresEs",
  "specsVi", "specsEn", "specsEs",
  "tiersVi", "tiersEn", "tiersEs",
  "seoTitleVi", "seoTitleEn", "seoTitleEs",
  "seoDescVi", "seoDescEn", "seoDescEs",
  "createdAt", "updatedAt"
) VALUES
(
  'prod-1', 'inv-bat5-basico', 'published', 'combo', 1, '', 'https://placehold.co/800x600/1B5E30/FFFFFF?text=INV-BAT5',
  '["https://placehold.co/800x600/1B5E30/FFFFFF?text=INV-BAT5"]',
  '["off-grid","lithium","5kWh"]',
  '[]', '',
  'INV-BAT5 Básico', '', '',
  'Công suất pin 5kWh, cơ bản', '', '',
  'Hệ thống năng lượng mặt trời 5kWh phù hợp cho hộ gia đình nhỏ.', '', '',
  '["5 tấm pin mặt trời Grand Sunergy 5R9","1 tủ điện 4kW","Biến tần off-grid TB Solar 4kW","1 pin lithium TB Solar 5kWh"]',
  '[]', '[]',
  '{"Công suất hệ thống":"5 kWp","Loại pin":"Lithium LFP","Bảo hành":"10 năm"}',
  '{}', '{}',
  '[{"name":"basic","label":"Basic","isDefault":true,"items":["5 tấm pin 5R9","Biến tần off-grid 4kW","Pin lithium 5kWh"]}]',
  '[]', '[]',
  '', '', '', '', '', '',
  NOW(), NOW()
),
(
  'prod-2', 'inv-bat10-premium', 'published', 'combo', 2, '', 'https://placehold.co/800x600/1B5E30/FFFFFF?text=INV-BAT10',
  '["https://placehold.co/800x600/1B5E30/FFFFFF?text=INV-BAT10"]',
  '["hybrid","lithium","10kWh"]',
  '[]', '',
  'INV-BAT10 Premium', '', '',
  'Công suất pin 10kWh, cao cấp', '', '',
  'Hệ thống năng lượng mặt trời 10kWh cho hộ gia đình lớn và văn phòng nhỏ.', '', '',
  '["10 tấm pin mặt trời Grand Sunergy 5R9","Biến tần hybrid TB Solar 8kW","2 pin lithium TB Solar 5kWh"]',
  '[]', '[]',
  '{"Công suất hệ thống":"10 kWp","Loại pin":"Lithium LFP","Bảo hành":"10 năm"}',
  '{}', '{}',
  '[{"name":"standard","label":"Standard","isDefault":true,"items":["10 tấm pin 5R9","Biến tần hybrid 8kW","Pin 10kWh"]}]',
  '[]', '[]',
  '', '', '', '', '', '',
  NOW(), NOW()
),
(
  'prod-3', 'inv-grid5-standard', 'published', 'combo', 3, '', 'https://placehold.co/800x600/1B5E30/FFFFFF?text=INV-GRID5',
  '["https://placehold.co/800x600/1B5E30/FFFFFF?text=INV-GRID5"]',
  '["on-grid","solar","5kWp"]',
  '[]', '',
  'INV-GRID5 Standard', '', '',
  'On-grid 5kWp kết nối lưới điện', '', '',
  'Hệ thống nối lưới 5kWp, tiết kiệm hóa đơn điện tối ưu.', '', '',
  '["10 tấm pin mặt trời Mono 500W","Biến tần on-grid SolarEdge 5kW"]',
  '[]', '[]',
  '{"Công suất":"5 kWp","Loại hệ thống":"On-grid","Bảo hành pin":"25 năm"}',
  '{}', '{}',
  '[{"name":"standard","label":"Standard","isDefault":true,"items":["10 tấm pin Mono 500W","Biến tần on-grid 5kW"]}]',
  '[]', '[]',
  '', '', '', '', '', '',
  NOW(), NOW()
)
ON CONFLICT (slug) DO NOTHING;

-- Projects
INSERT INTO "Project" (
  id, slug, status, category, "sortOrder",
  location, power, "installationDate", year, "videoUrl",
  "featuredImage", gallery, "relatedSlugs", "seoOgImage",
  "titleVi", "titleEn", "titleEs",
  "excerptVi", "excerptEn", "excerptEs",
  "contentVi", "contentEn", "contentEs",
  "seoTitleVi", "seoTitleEn", "seoTitleEs",
  "seoDescVi", "seoDescEn", "seoDescEs",
  "createdAt", "updatedAt"
) VALUES
(
  'proj-1', 'jose-marti-school-cuba', 'published', 'csr', 1,
  'Havana, Cuba', '4.668 kWp', '2024-03-15', '2024', '',
  'https://placehold.co/800x500/1B5E30/FFFFFF?text=Jose+Marti+School',
  '["https://placehold.co/800x500/1B5E30/FFFFFF?text=Jose+Marti+School","https://placehold.co/800x500/236B3A/FFFFFF?text=Installation"]',
  '[]', '',
  'Trường tiểu học José Martí – Cuba', '', '',
  'Hệ thống năng lượng mặt trời 4.668 kWp cho trường học tại Cuba.', '', '',
  '<p>TBSolaro đã triển khai hệ thống năng lượng mặt trời 4.668 kWp cho trường tiểu học José Martí tại Cuba, góp phần mang ánh sáng xanh đến với các em học sinh.</p>', '', '',
  '', '', '', '', '', '',
  NOW(), NOW()
),
(
  'proj-2', 'food-processing-plant-vietnam', 'published', 'enterprise', 2,
  'Bình Dương, Việt Nam', '500 kWp', '2023-08-10', '2023', '',
  'https://placehold.co/800x500/1B5E30/FFFFFF?text=Food+Processing+Plant',
  '["https://placehold.co/800x500/1B5E30/FFFFFF?text=Factory+Rooftop"]',
  '[]', '',
  'Nhà máy chế biến thực phẩm – Việt Nam', '', '',
  'Hệ thống điện mặt trời 500 kWp cho nhà máy chế biến thực phẩm.', '', '',
  '<p>Dự án lắp đặt hệ thống điện mặt trời áp mái 500 kWp cho nhà máy tại Bình Dương. Tiết kiệm chi phí điện năng lên tới 40%.</p>', '', '',
  '', '', '', '', '', '',
  NOW(), NOW()
),
(
  'proj-3', 'household-rooftop-hanoi', 'published', 'household', 3,
  'Hà Nội, Việt Nam', '5 kWp', '2024-01-20', '2024', '',
  'https://placehold.co/800x500/1B5E30/FFFFFF?text=Household+Rooftop',
  '["https://placehold.co/800x500/1B5E30/FFFFFF?text=Rooftop+5kWp"]',
  '[]', '',
  'Hộ gia đình mái nhà – Hà Nội', '', '',
  'Hệ thống mini rooftop 5 kWp cho hộ gia đình tại Hà Nội.', '', '',
  '<p>Lắp đặt hệ thống điện mặt trời 5 kWp tại quận Cầu Giấy, Hà Nội. Hoàn vốn trong vòng 4 năm.</p>', '', '',
  '', '', '', '', '', '',
  NOW(), NOW()
),
(
  'proj-4', 'enterprise-da-nang-factory', 'published', 'enterprise', 4,
  'Đà Nẵng, Việt Nam', '200 kWp', '2023-11-05', '2023', '',
  'https://placehold.co/800x500/236B3A/FFFFFF?text=Da+Nang+Factory',
  '["https://placehold.co/800x500/236B3A/FFFFFF?text=Factory+Solar"]',
  '[]', '',
  'Nhà máy sản xuất – Đà Nẵng', '', '',
  'Hệ thống điện mặt trời 200 kWp cho nhà máy sản xuất tại Đà Nẵng.', '', '',
  '<p>Lắp đặt hệ thống điện mặt trời áp mái 200 kWp cho nhà máy sản xuất tại Khu công nghiệp Hòa Khánh, Đà Nẵng.</p>', '', '',
  '', '', '', '', '', '',
  NOW(), NOW()
),
(
  'proj-5', 'community-center-hcm', 'published', 'community', 5,
  'TP. Hồ Chí Minh, Việt Nam', '15 kWp', '2024-02-28', '2024', '',
  'https://placehold.co/800x500/3D9B5C/FFFFFF?text=Community+Center',
  '["https://placehold.co/800x500/3D9B5C/FFFFFF?text=Community+Solar"]',
  '[]', '',
  'Trung tâm cộng đồng – TP.HCM', '', '',
  'Hệ thống điện mặt trời 15 kWp cho trung tâm cộng đồng.', '', '',
  '<p>Lắp đặt hệ thống điện mặt trời 15 kWp cho trung tâm sinh hoạt cộng đồng tại Quận 7, TP.HCM.</p>', '', '',
  '', '', '', '', '', '',
  NOW(), NOW()
)
ON CONFLICT (slug) DO NOTHING;

-- Blog Posts
INSERT INTO "BlogPost" (
  id, slug, status, "publishedAt", author,
  "featuredImage", gallery, tags, "relatedSlugs", "seoOgImage",
  "titleVi", "titleEn", "titleEs",
  "excerptVi", "excerptEn", "excerptEs",
  "contentVi", "contentEn", "contentEs",
  "seoTitleVi", "seoTitleEn", "seoTitleEs",
  "seoDescVi", "seoDescEn", "seoDescEs",
  "createdAt", "updatedAt"
) VALUES
(
  'blog-1', 'kien-tao-nang-luong-ben-vung', 'published', '2024-03-15 00:00:00', 'Đội ngũ TBSolaro',
  'https://placehold.co/800x450/1B5E30/FFFFFF?text=Sustainable+Energy',
  '[]',
  '["Năng lượng xanh","CSR","TBSolaro"]',
  '[]', '',
  'Kiến tạo năng lượng bền vững – Nuôi dưỡng tương lai xanh', '', '',
  'TBSolaro – Thương hiệu điện năng lượng mặt trời hàng đầu của Tập đoàn Thái Bình.', '', '',
  '<h2>Năng lượng mặt trời – Giải pháp cho tương lai</h2><p>Năng lượng mặt trời đang trở thành giải pháp thiết yếu trong bối cảnh biến đổi khí hậu toàn cầu. TBSolaro tự hào là đơn vị tiên phong trong lĩnh vực này tại Việt Nam.</p><p>Với hơn 500 dự án đã triển khai, chúng tôi cam kết mang đến nguồn năng lượng sạch, bền vững cho mọi gia đình và doanh nghiệp.</p>', '', '',
  '', '', '', '', '', '',
  NOW(), NOW()
),
(
  'blog-2', 'xu-huong-nang-luong-tai-tao-2024', 'published', '2024-02-10 00:00:00', 'Đội ngũ TBSolaro',
  'https://placehold.co/800x450/236B3A/FFFFFF?text=Renewable+Trends',
  '[]',
  '["Xu hướng","Năng lượng tái tạo","2024"]',
  '[]', '',
  'Xu hướng năng lượng tái tạo 2024', '', '',
  'Các xu hướng mới nhất trong ngành năng lượng tái tạo toàn cầu.', '', '',
  '<h2>Bùng nổ năng lượng tái tạo tại Đông Nam Á</h2><p>Năm 2024 chứng kiến sự bùng nổ của năng lượng tái tạo tại Đông Nam Á. Việt Nam đứng đầu khu vực về tốc độ tăng trưởng công suất điện mặt trời.</p><p>Giá tấm pin mặt trời tiếp tục giảm mạnh, tạo điều kiện thuận lợi cho việc đầu tư hệ thống điện mặt trời hộ gia đình.</p>', '', '',
  '', '', '', '', '', '',
  NOW(), NOW()
),
(
  'blog-3', 'loi-ich-dien-mat-troi-doanh-nghiep', 'published', '2024-01-05 00:00:00', 'Đội ngũ TBSolaro',
  'https://placehold.co/800x450/3D9B5C/FFFFFF?text=Business+Solar',
  '[]',
  '["Doanh nghiệp","ROI","Điện mặt trời"]',
  '[]', '',
  'Lợi ích điện mặt trời cho doanh nghiệp', '', '',
  'Tại sao các doanh nghiệp nên đầu tư vào hệ thống điện mặt trời ngay từ bây giờ?', '', '',
  '<h2>ROI hấp dẫn từ điện mặt trời</h2><p>Đầu tư vào hệ thống điện mặt trời mang lại ROI trung bình từ 5-7 năm, với tuổi thọ hệ thống lên tới 25 năm.</p><ul><li>Giảm 40-70% chi phí điện hàng tháng</li><li>Bảo vệ doanh nghiệp trước biến động giá điện</li><li>Nâng cao hình ảnh doanh nghiệp xanh</li><li>Hưởng ưu đãi thuế từ Chính phủ</li></ul>', '', '',
  '', '', '', '', '', '',
  NOW(), NOW()
),
(
  'blog-4', 'huong-dan-lap-dat-dien-mat-troi', 'published', '2024-04-01 00:00:00', 'Đội ngũ TBSolaro',
  'https://placehold.co/800x450/1B5E30/FFFFFF?text=Installation+Guide',
  '[]',
  '["Hướng dẫn","Lắp đặt","Điện mặt trời"]',
  '[]', '',
  'Hướng dẫn lắp đặt hệ thống điện mặt trời cho nhà ở', '', '',
  'Quy trình lắp đặt hệ thống điện mặt trời từ A đến Z cho hộ gia đình.', '', '',
  '<h2>Các bước lắp đặt hệ thống điện mặt trời</h2><p>Quá trình lắp đặt hệ thống điện mặt trời tại nhà thường mất từ 1-3 ngày tùy quy mô.</p><ol><li><strong>Khảo sát và tư vấn</strong>: Đội ngũ kỹ sư TBSolaro sẽ đến khảo sát mái nhà.</li><li><strong>Thiết kế hệ thống</strong>: Lên bản vẽ và phương án lắp đặt tối ưu.</li><li><strong>Lắp đặt tấm pin</strong>: Cố định khung và tấm pin trên mái.</li><li><strong>Đấu nối điện</strong>: Kết nối biến tần và hệ thống điện.</li><li><strong>Nghiệm thu</strong>: Kiểm tra và bàn giao hệ thống.</li></ol>', '', '',
  '', '', '', '', '', '',
  NOW(), NOW()
)
ON CONFLICT (slug) DO NOTHING;
