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

  for (const p of projects) {
    const { id: _id, ...data } = p;
    await prisma.project.upsert({
      where: { slug: p.slug },
      update: { titleEn: data.titleEn, titleEs: data.titleEs, excerptEn: data.excerptEn, excerptEs: data.excerptEs, contentEn: data.contentEn, contentEs: data.contentEs, contentVi: data.contentVi },
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

  // FAQs (3 languages)
  // Clear and re-seed FAQs to ensure correct Vietnamese content
  await prisma.fAQ.deleteMany();
  {
    const faqs = [
      {
        questionVi: 'Chi phí lắp đặt hệ thống điện mặt trời là bao nhiêu?',
        questionEn: 'How much does it cost to install a solar power system?',
        questionEs: '¿Cuánto cuesta instalar un sistema de energía solar?',
        answerVi: 'Chi phí phụ thuộc vào công suất hệ thống và loại sản phẩm. Để biết chi phí chính xác, vui lòng liên hệ với chúng tôi để được tư vấn và báo giá miễn phí dựa trên nhu cầu thực tế của bạn. Chúng tôi cam kết cung cấp giải pháp tối ưu nhất về chi phí và hiệu quả.',
        answerEn: 'The cost depends on the system capacity and product type. For an accurate quote, please contact us for a free consultation based on your actual needs. We are committed to providing the most cost-effective and efficient solutions.',
        answerEs: 'El costo depende de la capacidad del sistema y el tipo de producto. Para un presupuesto preciso, contáctenos para una consulta gratuita basada en sus necesidades reales. Nos comprometemos a ofrecer las soluciones más rentables y eficientes.',
        category: 'Chi phí & Giá cả', sortOrder: 1, status: 'published',
      },
      {
        questionVi: 'Tôi có thể nếu như trong không có ánh sáng mặt trời?',
        questionEn: 'Can I use electricity when there is no sunlight?',
        questionEs: '¿Puedo usar electricidad cuando no hay luz solar?',
        answerVi: 'Hệ thống điện mặt trời kết hợp pin lưu trữ (off-grid/hybrid) cho phép bạn sử dụng điện ngay cả vào ban đêm hoặc những ngày nhiều mây. Pin lưu trữ tích điện vào ban ngày để sử dụng khi không có nắng. Ngoài ra, hệ thống hybrid còn có thể kết hợp với lưới điện quốc gia như nguồn dự phòng.',
        answerEn: 'Solar power systems with battery storage (off-grid/hybrid) allow you to use electricity even at night or on cloudy days. The batteries store energy during the day for use when there is no sunlight. Additionally, hybrid systems can connect to the national grid as a backup power source.',
        answerEs: 'Los sistemas de energía solar con almacenamiento de baterías (off-grid/híbridos) permiten usar electricidad incluso de noche o en días nublados. Las baterías almacenan energía durante el día para usarla cuando no hay sol. Además, los sistemas híbridos pueden conectarse a la red eléctrica nacional como fuente de respaldo.',
        category: 'Kỹ thuật', sortOrder: 2, status: 'published',
      },
      {
        questionVi: 'Thời gian lắp đặt mất bao lâu?',
        questionEn: 'How long does installation take?',
        questionEs: '¿Cuánto tiempo tarda la instalación?',
        answerVi: 'Thời gian lắp đặt thông thường từ 1-3 ngày cho hệ thống hộ gia đình (5-10 kWp) và 5-15 ngày cho hệ thống công nghiệp (50-500 kWp), tùy thuộc vào quy mô và điều kiện thực tế. Đội ngũ kỹ thuật TBSolaro sẽ thông báo cụ thể sau khi khảo sát.',
        answerEn: 'Installation typically takes 1-3 days for household systems (5-10 kWp) and 5-15 days for industrial systems (50-500 kWp), depending on the scale and actual conditions. Our TBSolaro technical team will provide specific timelines after the site survey.',
        answerEs: 'La instalación generalmente toma de 1 a 3 días para sistemas domésticos (5-10 kWp) y de 5 a 15 días para sistemas industriales (50-500 kWp), dependiendo de la escala y condiciones reales. Nuestro equipo técnico de TBSolaro proporcionará plazos específicos después de la inspección del sitio.',
        category: 'Lắp đặt', sortOrder: 3, status: 'published',
      },
      {
        questionVi: 'Giải pháp nào phù hợp cho tôi nếu tôi không có nhiều?',
        questionEn: 'What solutions are available if I have a limited budget?',
        questionEs: '¿Qué soluciones están disponibles si tengo un presupuesto limitado?',
        answerVi: 'TBSolaro cung cấp nhiều gói sản phẩm đa dạng từ hệ thống mini rooftop 3-5 kWp cho hộ gia đình nhỏ đến các giải pháp quy mô lớn cho doanh nghiệp. Chúng tôi cũng hỗ trợ kết nối với các đối tác tài chính để bạn có thể trả góp với lãi suất ưu đãi. Hãy liên hệ để được tư vấn phù hợp.',
        answerEn: 'TBSolaro offers a wide range of product packages from mini rooftop systems (3-5 kWp) for small households to large-scale solutions for businesses. We also help connect you with financial partners for installment payments at preferential rates. Contact us for a tailored consultation.',
        answerEs: 'TBSolaro ofrece una amplia gama de paquetes, desde sistemas mini de techo (3-5 kWp) para hogares pequeños hasta soluciones a gran escala para empresas. También le ayudamos a conectar con socios financieros para pagos a plazos con tasas preferenciales. Contáctenos para una consulta personalizada.',
        category: 'Tài chính', sortOrder: 4, status: 'published',
      },
      {
        questionVi: 'Tôi có thể nếu như không bao lâu?',
        questionEn: 'What is the warranty and technical support policy?',
        questionEs: '¿Cuál es la política de garantía y soporte técnico?',
        answerVi: 'TBSolaro cung cấp dịch vụ bảo hành và hỗ trợ kỹ thuật toàn diện. Tấm pin được bảo hành hiệu suất 25 năm, biến tần 5-10 năm tùy loại, pin lưu trữ 10 năm. Đội ngũ kỹ thuật của chúng tôi sẵn sàng hỗ trợ và bảo trì định kỳ để đảm bảo hệ thống hoạt động tối ưu.',
        answerEn: 'TBSolaro provides comprehensive warranty and technical support. Solar panels come with a 25-year performance warranty, inverters 5-10 years depending on type, and storage batteries 10 years. Our technical team is always ready to provide support and periodic maintenance to ensure optimal performance.',
        answerEs: 'TBSolaro ofrece servicios integrales de garantía y soporte técnico. Los paneles solares tienen una garantía de rendimiento de 25 años, los inversores de 5 a 10 años según el tipo, y las baterías de almacenamiento 10 años. Nuestro equipo técnico está siempre listo para brindar soporte y mantenimiento periódico.',
        category: 'Bảo hành & Dịch vụ', sortOrder: 5, status: 'published',
      },
      {
        questionVi: 'Tôi có thể nếu như trong không có ánh sáng mặt trời không?',
        questionEn: 'Does the system require periodic maintenance?',
        questionEs: '¿El sistema requiere mantenimiento periódico?',
        answerVi: 'Có, chúng tôi có các chương trình bảo trì định kỳ hàng năm. Hệ thống điện mặt trời cần được vệ sinh tấm pin 2-4 lần/năm tùy khu vực và kiểm tra định kỳ các kết nối điện. TBSolaro cung cấp gói bảo trì trọn gói với chi phí hợp lý để đảm bảo hiệu suất tối đa.',
        answerEn: 'Yes, we offer annual periodic maintenance programs. Solar systems require panel cleaning 2-4 times per year depending on the area, and regular inspection of electrical connections. TBSolaro provides comprehensive maintenance packages at reasonable costs to ensure maximum performance.',
        answerEs: 'Sí, ofrecemos programas de mantenimiento periódico anual. Los sistemas solares requieren limpieza de paneles 2-4 veces al año y inspección regular de las conexiones eléctricas. TBSolaro ofrece paquetes de mantenimiento integrales a costos razonables para garantizar el máximo rendimiento.',
        category: 'Bảo hành & Dịch vụ', sortOrder: 6, status: 'published',
      },
      {
        questionVi: 'Hệ thống điện mặt trời có thể chịu được thời tiết khắc nghiệt không?',
        questionEn: 'Can solar power systems withstand extreme weather?',
        questionEs: '¿Los sistemas de energía solar pueden soportar condiciones climáticas extremas?',
        answerVi: 'Tất cả sản phẩm TBSolaro đều được kiểm tra theo tiêu chuẩn quốc tế về khả năng chịu đựng mưa đá, gió bão, nhiệt độ cao và độ ẩm. Tấm pin được thiết kế chịu được gió đến 2.400 Pa và tải tuyết đến 5.400 Pa. Biến tần có tiêu chuẩn bảo vệ IP65/IP66.',
        answerEn: 'All TBSolaro products are tested according to international standards for resistance to hail, storms, high temperatures, and humidity. Panels are designed to withstand wind loads up to 2,400 Pa and snow loads up to 5,400 Pa. Inverters have IP65/IP66 protection ratings.',
        answerEs: 'Todos los productos de TBSolaro se prueban según estándares internacionales de resistencia al granizo, tormentas, altas temperaturas y humedad. Los paneles soportan cargas de viento de hasta 2.400 Pa y de nieve de hasta 5.400 Pa. Los inversores tienen clasificación de protección IP65/IP66.',
        category: 'Kỹ thuật', sortOrder: 7, status: 'published',
      },
      {
        questionVi: 'Tôi có thể bán điện lại cho lưới quốc gia không?',
        questionEn: 'Can I sell electricity back to the national grid?',
        questionEs: '¿Puedo vender electricidad a la red eléctrica nacional?',
        answerVi: 'Tùy theo quy định của từng quốc gia và địa phương. Tại Việt Nam, bạn có thể đăng ký bán điện mặt trời mái nhà cho EVN theo biểu giá FIT. TBSolaro hỗ trợ toàn bộ thủ tục đăng ký, từ khảo sát thiết kế đến làm việc với EVN để ký hợp đồng mua bán điện.',
        answerEn: 'This depends on each country\'s regulations. In Vietnam, you can register to sell rooftop solar electricity to EVN under the FIT tariff. TBSolaro supports the entire registration process, from design surveys to working with EVN to sign power purchase agreements.',
        answerEs: 'Esto depende de las regulaciones de cada país. En Vietnam, puede registrarse para vender electricidad solar de techo a EVN bajo la tarifa FIT. TBSolaro apoya todo el proceso de registro, desde las inspecciones de diseño hasta firmar acuerdos de compra de energía.',
        category: 'Chính sách & Pháp lý', sortOrder: 8, status: 'published',
      },
    ];

    for (const faq of faqs) {
      await prisma.fAQ.create({ data: faq });
    }
    console.log(`✅ Seeded ${faqs.length} FAQs (Vi/En/Es)`);
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

  console.log('🎉 Seeding complete!');
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
