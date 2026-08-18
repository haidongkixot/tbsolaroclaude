import { PrismaClient } from '@prisma/client';
import { FAQ_SEED } from './faq-data';

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

  // Bootstrap only. The seed runs on every deploy, so it must never touch a
  // database that already holds content — see the note above the FAQ block.
  const existingProducts = await prisma.product.count();
  if (existingProducts > 0) {
    console.log(`⏭️ Products already exist (${existingProducts}), skipping`);
  } else {
    for (const p of products) await prisma.product.create({ data: p });
    console.log(`✅ Seeded ${products.length} products`);
  }

  // Projects
  const projects = [
    {
      id: 'proj-1', slug: 'jose-marti-school-cuba', status: 'published', category: 'csr', sortOrder: 1,
      location: 'Havana, Cuba', power: '4.668 kWp', installationDate: '2024-03-15', year: '2024',
      titleVi: 'Trường tiểu học José Martí – Cuba',
      titleEn: 'José Martí Elementary School – Cuba',
      titleEs: 'Escuela Primaria José Martí – Cuba',
      excerptVi: 'Hệ thống năng lượng mặt trời 4.668 kWp cho trường học tại Cuba.',
      excerptEn: '4.668 kWp solar power system for a school in Cuba.',
      excerptEs: 'Sistema de energía solar de 4,668 kWp para una escuela en Cuba.',
      contentVi: '<p>TBSolaro đã triển khai hệ thống năng lượng mặt trời 4.668 kWp cho trường tiểu học José Martí tại Cuba. Dự án CSR này mang điện sạch đến trường học, giúp cải thiện điều kiện học tập và giảm phụ thuộc vào nguồn điện truyền thống. Hệ thống bao gồm tấm pin hiệu suất cao và biến tần thông minh, đảm bảo cung cấp điện ổn định cho các phòng học và khu vực hành chính.</p>',
      contentEn: '<p>TBSolaro deployed a 4.668 kWp solar power system for the José Martí Elementary School in Cuba. This CSR project brings clean electricity to the school, improving learning conditions and reducing dependence on traditional power sources. The system includes high-efficiency solar panels and smart inverters, ensuring stable power supply for classrooms and administrative areas.</p>',
      contentEs: '<p>TBSolaro implementó un sistema de energía solar de 4,668 kWp para la Escuela Primaria José Martí en Cuba. Este proyecto de RSC lleva electricidad limpia a la escuela, mejorando las condiciones de aprendizaje y reduciendo la dependencia de fuentes de energía tradicionales. El sistema incluye paneles solares de alta eficiencia e inversores inteligentes, garantizando un suministro eléctrico estable para las aulas y áreas administrativas.</p>',
      featuredImage: 'https://placehold.co/800x500/1B5E30/FFFFFF?text=Jose+Marti+School',
      gallery: JSON.stringify(['https://placehold.co/800x500/1B5E30/FFFFFF?text=Jose+Marti+School', 'https://placehold.co/800x500/236B3A/FFFFFF?text=Installation']),
      relatedSlugs: JSON.stringify([]),
    },
    {
      id: 'proj-2', slug: 'food-processing-plant-vietnam', status: 'published', category: 'enterprise', sortOrder: 2,
      location: 'Bình Dương, Việt Nam', power: '500 kWp', installationDate: '2023-08-10', year: '2023',
      titleVi: 'Nhà máy chế biến thực phẩm – Việt Nam',
      titleEn: 'Food Processing Plant – Vietnam',
      titleEs: 'Planta de Procesamiento de Alimentos – Vietnam',
      excerptVi: 'Hệ thống điện mặt trời 500 kWp cho nhà máy chế biến thực phẩm.',
      excerptEn: '500 kWp solar power system for a food processing plant.',
      excerptEs: 'Sistema de energía solar de 500 kWp para una planta de procesamiento de alimentos.',
      contentVi: '<p>Dự án lắp đặt hệ thống điện mặt trời áp mái 500 kWp cho nhà máy tại Bình Dương. Hệ thống giúp nhà máy tiết kiệm đáng kể chi phí điện năng hàng tháng, đồng thời giảm lượng khí thải CO2. Với diện tích mái rộng lớn, hệ thống được thiết kế tối ưu để tận dụng tối đa năng lượng mặt trời quanh năm.</p>',
      contentEn: '<p>Rooftop solar power system installation of 500 kWp for a factory in Binh Duong. The system helps the factory significantly reduce monthly electricity costs while lowering CO2 emissions. With the large rooftop area, the system is optimally designed to maximize solar energy utilization throughout the year.</p>',
      contentEs: '<p>Instalación de un sistema de energía solar en techo de 500 kWp para una fábrica en Binh Duong. El sistema ayuda a la fábrica a reducir significativamente los costos mensuales de electricidad mientras disminuye las emisiones de CO2. Con la amplia área del techo, el sistema está diseñado de manera óptima para maximizar el aprovechamiento de la energía solar durante todo el año.</p>',
      featuredImage: 'https://placehold.co/800x500/1B5E30/FFFFFF?text=Food+Processing+Plant',
      gallery: JSON.stringify(['https://placehold.co/800x500/1B5E30/FFFFFF?text=Factory+Rooftop']),
      relatedSlugs: JSON.stringify([]),
    },
    {
      id: 'proj-3', slug: 'household-rooftop-hanoi', status: 'published', category: 'household', sortOrder: 3,
      location: 'Hà Nội, Việt Nam', power: '5 kWp', installationDate: '2024-01-20', year: '2024',
      titleVi: 'Hộ gia đình mái nhà – Hà Nội',
      titleEn: 'Household Rooftop – Hanoi',
      titleEs: 'Techo Residencial – Hanói',
      excerptVi: 'Hệ thống mini rooftop 5 kWp cho hộ gia đình tại Hà Nội.',
      excerptEn: '5 kWp mini rooftop system for a household in Hanoi.',
      excerptEs: 'Sistema mini de techo de 5 kWp para un hogar en Hanói.',
      contentVi: '<p>Lắp đặt hệ thống điện mặt trời 5 kWp tại quận Cầu Giấy, Hà Nội. Hệ thống được thiết kế phù hợp với diện tích mái nhà của gia đình, giúp giảm hóa đơn điện hàng tháng lên đến 70%. Pin lưu trữ lithium LFP đảm bảo nguồn điện dự phòng khi mất điện lưới.</p>',
      contentEn: '<p>Installation of a 5 kWp solar power system in Cau Giay District, Hanoi. The system is designed to fit the household\'s rooftop area, helping reduce monthly electricity bills by up to 70%. Lithium LFP storage batteries ensure backup power during grid outages.</p>',
      contentEs: '<p>Instalación de un sistema de energía solar de 5 kWp en el distrito de Cau Giay, Hanói. El sistema está diseñado para adaptarse al área del techo del hogar, ayudando a reducir las facturas mensuales de electricidad hasta en un 70%. Las baterías de almacenamiento de litio LFP garantizan energía de respaldo durante cortes de la red eléctrica.</p>',
      featuredImage: 'https://placehold.co/800x500/1B5E30/FFFFFF?text=Household+Rooftop',
      gallery: JSON.stringify(['https://placehold.co/800x500/1B5E30/FFFFFF?text=Rooftop+5kWp']),
      relatedSlugs: JSON.stringify([]),
    },
  ];

  // This block used to upsert by slug while creating with a hardcoded id ('proj-1'…).
  // Once a slug was edited in the admin, the slug lookup missed, the create hit the
  // still-present id, and the whole seed died with P2002 — before reaching any later
  // block. That is why Testimonials never seeded. Bootstrap only now.
  const existingProjects = await prisma.project.count();
  if (existingProjects > 0) {
    console.log(`⏭️ Projects already exist (${existingProjects}), skipping`);
  } else {
    for (const p of projects) await prisma.project.create({ data: p });
    console.log(`✅ Seeded ${projects.length} projects`);
  }

  // Blog Posts
  const blogs = [
    {
      id: 'blog-1', slug: 'kien-tao-nang-luong-ben-vung',
      slugEn: 'building-sustainable-energy', slugEs: 'construyendo-energia-sostenible',
      status: 'published',
      publishedAt: new Date('2024-03-15'), author: 'Đội ngũ TBSolaro',
      titleVi: 'Kiến tạo năng lượng bền vững – Nuôi dưỡng tương lai xanh',
      titleEn: 'Building Sustainable Energy – Nurturing a Green Future',
      titleEs: 'Construyendo Energía Sostenible – Cultivando un Futuro Verde',
      excerptVi: 'TBSolaro – Thương hiệu điện năng lượng mặt trời hàng đầu.',
      excerptEn: 'TBSolaro – A leading solar energy brand.',
      excerptEs: 'TBSolaro – Una marca líder de energía solar.',
      contentVi: '<p>Năng lượng mặt trời đang trở thành giải pháp thiết yếu trong bối cảnh biến đổi khí hậu toàn cầu. TBSolaro — thương hiệu điện năng lượng mặt trời hàng đầu — ra đời với sứ mệnh mang ánh sáng sạch đến mọi mái nhà.</p><p>Với nhiều thập kỷ kinh nghiệm trong ngành sản xuất, TBSolaro hiểu rằng phát triển bền vững không chỉ là xu hướng — đó là trách nhiệm. TBSolaro cung cấp các giải pháp năng lượng mặt trời toàn diện từ hộ gia đình đến doanh nghiệp, từ Việt Nam đến Cuba.</p><p>Mỗi tấm pin TBSolaro lắp đặt là một bước tiến nhỏ nhưng vững chắc hướng tới tương lai xanh — nơi mái nhà bạn không chỉ che mưa che nắng, mà còn tạo ra năng lượng cho chính cuộc sống của bạn.</p>',
      contentEn: '<p>Solar energy is becoming an essential solution in the context of global climate change. TBSolaro — a leading solar energy brand — was born with a mission to bring clean light to every rooftop.</p><p>With decades of manufacturing experience, TBSolaro understands that sustainable development is not just a trend — it is a responsibility. TBSolaro provides comprehensive solar energy solutions from households to businesses, from Vietnam to Cuba.</p><p>Every TBSolaro panel installed is a small but firm step toward a green future — where your roof doesn\'t just shelter you from rain and sun, but also generates energy for your very life.</p>',
      contentEs: '<p>La energía solar se está convirtiendo en una solución esencial en el contexto del cambio climático global. TBSolaro — una marca líder de energía solar — nació con la misión de llevar luz limpia a cada techo.</p><p>Con décadas de experiencia en manufactura, TBSolaro entiende que el desarrollo sostenible no es solo una tendencia — es una responsabilidad. TBSolaro proporciona soluciones integrales de energía solar desde hogares hasta empresas, desde Vietnam hasta Cuba.</p><p>Cada panel TBSolaro instalado es un paso pequeño pero firme hacia un futuro verde — donde tu techo no solo te protege de la lluvia y el sol, sino que también genera energía para tu propia vida.</p>',
      featuredImage: 'https://placehold.co/800x450/1B5E30/FFFFFF?text=Sustainable+Energy',
      gallery: JSON.stringify([]),
      tags: JSON.stringify(['Năng lượng xanh', 'CSR', 'TBSolaro']),
      relatedSlugs: JSON.stringify([]),
    },
    {
      id: 'blog-2', slug: 'xu-huong-nang-luong-tai-tao-2024',
      slugEn: 'renewable-energy-trends-2024', slugEs: 'tendencias-energia-renovable-2024',
      status: 'published',
      publishedAt: new Date('2024-02-10'), author: 'Đội ngũ TBSolaro',
      titleVi: 'Xu hướng năng lượng tái tạo 2024',
      titleEn: 'Renewable Energy Trends 2024',
      titleEs: 'Tendencias de Energía Renovable 2024',
      excerptVi: 'Các xu hướng mới nhất trong ngành năng lượng tái tạo toàn cầu.',
      excerptEn: 'The latest trends in the global renewable energy industry.',
      excerptEs: 'Las últimas tendencias en la industria global de energía renovable.',
      contentVi: '<p>Năm 2024 chứng kiến sự bùng nổ của năng lượng tái tạo tại Đông Nam Á. Với chi phí tấm pin giảm hơn 80% trong thập kỷ qua và hiệu suất ngày càng cao, điện mặt trời đang trở thành lựa chọn kinh tế nhất cho cả hộ gia đình lẫn doanh nghiệp.</p><p>Tại Việt Nam, chính sách khuyến khích phát triển năng lượng tái tạo đang tạo ra cơ hội lớn. TBSolaro nắm bắt xu hướng này bằng việc cung cấp các giải pháp combo tích hợp — từ tấm pin, biến tần đến pin lưu trữ lithium LFP — giúp khách hàng dễ dàng chuyển đổi sang năng lượng sạch.</p><p>Xu hướng nổi bật nhất năm nay là hệ thống hybrid kết hợp lưới điện và pin lưu trữ, cho phép sử dụng điện mặt trời cả ban đêm. TBSolaro đi đầu trong xu hướng này với dòng sản phẩm INV-BAT — giải pháp all-in-one cho mái nhà Việt.</p>',
      contentEn: '<p>2024 is witnessing a renewable energy boom in Southeast Asia. With solar panel costs dropping over 80% in the past decade and ever-increasing efficiency, solar power is becoming the most economical choice for both households and businesses.</p><p>In Vietnam, policies encouraging renewable energy development are creating significant opportunities. TBSolaro seizes this trend by offering integrated combo solutions — from panels and inverters to lithium LFP storage batteries — making it easy for customers to switch to clean energy.</p><p>The most prominent trend this year is hybrid systems combining grid connection and battery storage, enabling solar power use even at night. TBSolaro leads this trend with the INV-BAT product line — an all-in-one solution for Vietnamese rooftops.</p>',
      contentEs: '<p>2024 está presenciando un auge de energía renovable en el Sudeste Asiático. Con los costos de paneles solares cayendo más del 80% en la última década y una eficiencia cada vez mayor, la energía solar se está convirtiendo en la opción más económica tanto para hogares como para empresas.</p><p>En Vietnam, las políticas que fomentan el desarrollo de energía renovable están creando oportunidades significativas. TBSolaro aprovecha esta tendencia ofreciendo soluciones combo integradas — desde paneles e inversores hasta baterías de almacenamiento de litio LFP — facilitando a los clientes la transición a energía limpia.</p><p>La tendencia más destacada este año son los sistemas híbridos que combinan conexión a la red y almacenamiento en baterías, permitiendo el uso de energía solar incluso de noche. TBSolaro lidera esta tendencia con la línea de productos INV-BAT — una solución todo-en-uno para los techos vietnamitas.</p>',
      featuredImage: 'https://placehold.co/800x450/236B3A/FFFFFF?text=Renewable+Trends',
      gallery: JSON.stringify([]),
      tags: JSON.stringify(['Xu hướng', 'Năng lượng tái tạo', '2024']),
      relatedSlugs: JSON.stringify([]),
    },
    {
      id: 'blog-3', slug: 'loi-ich-dien-mat-troi-doanh-nghiep',
      slugEn: 'solar-energy-benefits-for-business', slugEs: 'beneficios-energia-solar-para-empresas',
      status: 'published',
      publishedAt: new Date('2024-01-05'), author: 'Đội ngũ TBSolaro',
      titleVi: 'Lợi ích điện mặt trời cho doanh nghiệp',
      titleEn: 'Solar Energy Benefits for Businesses',
      titleEs: 'Beneficios de la Energía Solar para Empresas',
      excerptVi: 'Tại sao các doanh nghiệp nên đầu tư vào hệ thống điện mặt trời ngay từ bây giờ?',
      excerptEn: 'Why should businesses invest in solar power systems right now?',
      excerptEs: '¿Por qué las empresas deberían invertir en sistemas de energía solar ahora mismo?',
      contentVi: '<p>Đầu tư vào hệ thống điện mặt trời mang lại ROI trung bình từ 5-7 năm cho doanh nghiệp. Với mức tiết kiệm chi phí điện từ 30-70% hàng tháng, hệ thống tự hoàn vốn và sau đó mang lại lợi nhuận thuần từ năng lượng miễn phí.</p><p>Ngoài lợi ích kinh tế, doanh nghiệp sử dụng năng lượng mặt trời còn nâng cao hình ảnh thương hiệu xanh — yếu tố ngày càng quan trọng với đối tác quốc tế và khách hàng quan tâm đến ESG. Nhiều đối tác châu Âu và Nhật Bản yêu cầu nhà cung cấp phải có chứng nhận phát triển bền vững.</p><p>TBSolaro cung cấp giải pháp trọn gói cho doanh nghiệp: khảo sát, thiết kế, lắp đặt và bảo trì dài hạn. Với đội ngũ kỹ thuật giàu kinh nghiệm và sản phẩm đạt tiêu chuẩn quốc tế, TBSolaro là đối tác tin cậy cho hành trình chuyển đổi xanh của doanh nghiệp bạn.</p>',
      contentEn: '<p>Investing in solar power systems delivers an average ROI of 5-7 years for businesses. With monthly electricity cost savings of 30-70%, the system pays for itself and then delivers pure profit from free energy.</p><p>Beyond economic benefits, businesses using solar energy also enhance their green brand image — a factor increasingly important to international partners and ESG-conscious customers. Many European and Japanese partners require suppliers to have sustainability certifications.</p><p>TBSolaro provides comprehensive solutions for businesses: survey, design, installation, and long-term maintenance. With experienced technical teams and internationally certified products, TBSolaro is a trusted partner for your business\'s green transition journey.</p>',
      contentEs: '<p>Invertir en sistemas de energía solar ofrece un ROI promedio de 5 a 7 años para las empresas. Con ahorros mensuales en costos de electricidad del 30-70%, el sistema se paga solo y luego genera ganancias puras a partir de energía gratuita.</p><p>Más allá de los beneficios económicos, las empresas que utilizan energía solar también mejoran su imagen de marca verde — un factor cada vez más importante para socios internacionales y clientes conscientes del ESG. Muchos socios europeos y japoneses requieren que los proveedores tengan certificaciones de sostenibilidad.</p><p>TBSolaro proporciona soluciones integrales para empresas: inspección, diseño, instalación y mantenimiento a largo plazo. Con equipos técnicos experimentados y productos certificados internacionalmente, TBSolaro es un socio confiable para el camino de transición verde de su empresa.</p>',
      featuredImage: 'https://placehold.co/800x450/3D9B5C/FFFFFF?text=Business+Solar',
      gallery: JSON.stringify([]),
      tags: JSON.stringify(['Doanh nghiệp', 'ROI', 'Điện mặt trời']),
      relatedSlugs: JSON.stringify([]),
    },
  ];

  // Bootstrap only — same reasoning as products and projects above.
  const existingBlogs = await prisma.blogPost.count();
  if (existingBlogs > 0) {
    console.log(`⏭️ Blog posts already exist (${existingBlogs}), skipping`);
  } else {
    for (const b of blogs) await prisma.blogPost.create({ data: b });
    console.log(`✅ Seeded ${blogs.length} blog posts`);
  }

  // FAQs (3 languages) — seeded once only.
  // NEVER deleteMany() here: build runs this seed on every production deploy, so a wipe
  // destroys every FAQ the admin has added or edited since launch.
  const existingFaqs = await prisma.fAQ.count();
  if (existingFaqs > 0) {
    console.log(`⏭️ FAQs already exist (${existingFaqs}), skipping`);
  } else {
    for (const faq of FAQ_SEED) {
      await prisma.fAQ.create({ data: faq });
    }
    console.log(`✅ Seeded ${FAQ_SEED.length} FAQs (Vi/En/Es)`);
  }

  // Download Documents
  const existingDocs = await prisma.downloadDocument.count();
  if (existingDocs === 0) {
    const downloads = [
      {
        title: 'Tài liệu kỹ thuật INV-BAT5 Básico',
        description: 'Thông số kỹ thuật đầy đủ cho combo INV-BAT5 Básico 5kWh, bao gồm sơ đồ lắp đặt và hướng dẫn vận hành.',
        fileUrl: '/downloads/inv-bat5-basico-spec.pdf', fileType: 'PDF',
        category: 'Thông số kỹ thuật', version: 'v2.1',
        featuredImage: 'https://placehold.co/400x300/1B5E30/FFFFFF?text=INV-BAT5+Doc',
        status: 'published', sortOrder: 1,
      },
      {
        title: 'Hướng dẫn lắp đặt hệ thống Solar',
        description: 'Tài liệu hướng dẫn chi tiết quy trình lắp đặt hệ thống điện mặt trời, từ khảo sát đến nghiệm thu.',
        fileUrl: '/downloads/installation-guide.pdf', fileType: 'PDF',
        category: 'Hướng dẫn', version: 'v3.0',
        featuredImage: 'https://placehold.co/400x300/236B3A/FFFFFF?text=Install+Guide',
        status: 'published', sortOrder: 2,
      },
      {
        title: 'Brochure Sản phẩm TBSolaro 2024',
        description: 'Catalog tổng hợp toàn bộ dòng sản phẩm TBSolaro năm 2024, bao gồm thông số và giá tham khảo.',
        fileUrl: '/downloads/tbsolaro-catalog-2024.pdf', fileType: 'PDF',
        category: 'Catalog', version: '2024',
        featuredImage: 'https://placehold.co/400x300/3D9B5C/FFFFFF?text=Catalog+2024',
        status: 'published', sortOrder: 3,
      },
      {
        title: 'Chứng chỉ & Giấy phép',
        description: 'Các chứng chỉ tiêu chuẩn quốc tế và giấy phép hoạt động của TBSolaro và sản phẩm.',
        fileUrl: '/downloads/certificates.pdf', fileType: 'PDF',
        category: 'Chứng chỉ', version: '2024',
        featuredImage: 'https://placehold.co/400x300/52B788/FFFFFF?text=Certificates',
        status: 'published', sortOrder: 4,
      },
      {
        title: 'Tài liệu kỹ thuật Pin Lithium LFP',
        description: 'Thông số đầy đủ và hướng dẫn sử dụng cho dòng pin lưu trữ Lithium LFP của TBSolaro.',
        fileUrl: '/downloads/lfp-battery-spec.pdf', fileType: 'PDF',
        category: 'Thông số kỹ thuật', version: 'v1.5',
        featuredImage: 'https://placehold.co/400x300/1B5E30/FFFFFF?text=LFP+Battery+Doc',
        status: 'published', sortOrder: 5,
      },
      {
        title: 'Báo cáo Bền vững TBSolaro 2023',
        description: 'Báo cáo ESG và bền vững năm 2023, tổng kết các hoạt động CSR và tác động môi trường.',
        fileUrl: '/downloads/sustainability-report-2023.pdf', fileType: 'PDF',
        category: 'Báo cáo', version: '2023',
        featuredImage: 'https://placehold.co/400x300/52B788/FFFFFF?text=Sustainability+Report',
        status: 'published', sortOrder: 6,
      },
    ];

    for (const doc of downloads) {
      await prisma.downloadDocument.create({ data: doc });
    }
    console.log(`✅ Seeded ${downloads.length} download documents`);
  } else {
    console.log(`⏭️ Downloads already exist (${existingDocs}), skipping`);
  }

  // Testimonials — seeded once only, so edits made in the admin survive later builds
  const existingTestimonials = await prisma.testimonial.count();
  if (existingTestimonials === 0) {
    const testimonials = [
      {
        name: 'Nguyễn Văn A',
        roleVi: 'Chủ hộ gia đình', roleEn: 'Homeowner', roleEs: 'Propietario',
        contentVi: 'Hệ thống TBSolaro đã giúp tôi tiết kiệm 70% chi phí điện hàng tháng. Đội ngũ lắp đặt chuyên nghiệp, bảo hành chu đáo.',
        contentEn: 'The TBSolaro system cut my monthly electricity bill by 70%. The installation team was professional and the warranty support has been excellent.',
        contentEs: 'El sistema TBSolaro redujo mi factura eléctrica mensual en un 70%. El equipo de instalación fue profesional y el soporte de garantía excelente.',
        avatar: 'https://placehold.co/60x60/1B5E30/FFFFFF?text=NVA',
        rating: 5, sortOrder: 1, status: 'published',
      },
      {
        name: 'Trần Thị B',
        roleVi: 'Giám đốc sản xuất', roleEn: 'Production Director', roleEs: 'Directora de Producción',
        contentVi: 'Đầu tư hệ thống 200kWp cho nhà máy, ROI đạt được chỉ sau 5 năm. TBSolaro tư vấn rất tận tình và chuyên nghiệp.',
        contentEn: 'We invested in a 200kWp system for our factory and reached ROI in just 5 years. TBSolaro advised us thoroughly and professionally.',
        contentEs: 'Invertimos en un sistema de 200kWp para nuestra fábrica y alcanzamos el ROI en solo 5 años. TBSolaro nos asesoró de forma profesional.',
        avatar: 'https://placehold.co/60x60/236B3A/FFFFFF?text=TTB',
        rating: 5, sortOrder: 2, status: 'published',
      },
      {
        name: 'Lê Văn C',
        roleVi: 'Chủ trang trại', roleEn: 'Farm Owner', roleEs: 'Propietario de Finca',
        contentVi: 'Sử dụng combo INV-BAT10 cho trang trại, điện luôn ổn định dù mùa mưa. Rất hài lòng với chất lượng sản phẩm.',
        contentEn: 'We use the INV-BAT10 combo on our farm and the power stays stable even through the rainy season. Very happy with the product quality.',
        contentEs: 'Usamos el combo INV-BAT10 en nuestra finca y la energía se mantiene estable incluso en la temporada de lluvias. Muy satisfechos con la calidad.',
        avatar: 'https://placehold.co/60x60/3D9B5C/FFFFFF?text=LVC',
        rating: 5, sortOrder: 3, status: 'published',
      },
    ];

    for (const t of testimonials) {
      await prisma.testimonial.create({ data: t });
    }
    console.log(`✅ Seeded ${testimonials.length} testimonials (Vi/En/Es)`);
  } else {
    console.log(`⏭️ Testimonials already exist (${existingTestimonials}), skipping`);
  }

  console.log('🎉 Seeding complete!');
}

main()
  .catch((e) => {
    // Deliberately non-fatal: a seed problem must not block a deploy. But it is
    // logged loudly — a quiet `.catch(console.error)` hid a P2002 crash here for
    // months, which silently prevented every block after Projects from running.
    console.error('\n' + '='.repeat(70));
    console.error('❌ SEED FAILED — later blocks did NOT run. Check this build log.');
    console.error('='.repeat(70));
    console.error(e);
    console.error('='.repeat(70) + '\n');
  })
  .finally(() => prisma.$disconnect());
