/**
 * FAQ content for TBSolaro, in Vietnamese / English / Spanish.
 *
 * Single source of truth: imported by prisma/seed.ts (fresh databases) and by
 * scripts/sync-faq.ts (adds any missing entries to an existing database).
 *
 * Answers deliberately avoid quoting prices or guaranteeing figures that vary by
 * site and market — those point the reader at a free consultation instead.
 */

export type FaqSeed = {
  questionVi: string; questionEn: string; questionEs: string;
  answerVi: string; answerEn: string; answerEs: string;
  category: string;
  sortOrder: number;
  status: string;
};

export const FAQ_SEED: FaqSeed[] = [
  // ── Sản phẩm & Giải pháp ─────────────────────────────────────────────
  {
    questionVi: 'Hệ on-grid, off-grid và hybrid khác nhau như thế nào?',
    questionEn: 'What is the difference between on-grid, off-grid and hybrid systems?',
    questionEs: '¿Cuál es la diferencia entre los sistemas on-grid, off-grid e híbridos?',
    answerVi: 'Hệ on-grid nối trực tiếp với lưới điện, không có pin lưu trữ — chi phí đầu tư thấp nhất nhưng sẽ ngừng hoạt động khi mất điện lưới. Hệ off-grid hoạt động độc lập hoàn toàn nhờ pin lưu trữ, phù hợp nơi lưới điện yếu hoặc không có. Hệ hybrid kết hợp cả hai: dùng điện mặt trời, tích vào pin, và vẫn có lưới làm nguồn dự phòng. Với phần lớn hộ gia đình và doanh nghiệp cần điện ổn định, TBSolaro thường tư vấn hệ hybrid.',
    answerEn: 'An on-grid system connects directly to the utility grid with no battery storage — the lowest upfront cost, but it shuts down during a blackout. An off-grid system runs entirely on its own using battery storage, suited to places with a weak grid or none at all. A hybrid system combines both: it uses solar power, charges the battery, and keeps the grid as backup. For most homes and businesses that need reliable power, TBSolaro usually recommends a hybrid system.',
    answerEs: 'Un sistema on-grid se conecta directamente a la red eléctrica sin baterías: es la inversión inicial más baja, pero deja de funcionar durante un apagón. Un sistema off-grid funciona de forma totalmente independiente gracias al almacenamiento en baterías, ideal para zonas con red débil o sin red. Un sistema híbrido combina ambos: aprovecha la energía solar, carga la batería y mantiene la red como respaldo. Para la mayoría de hogares y empresas que necesitan energía estable, TBSolaro suele recomendar el sistema híbrido.',
    category: 'Sản phẩm & Giải pháp', sortOrder: 10, status: 'published',
  },
  {
    questionVi: 'Nên chọn combo INV-BAT5 hay INV-BAT10?',
    questionEn: 'Should I choose the INV-BAT5 or the INV-BAT10 combo?',
    questionEs: '¿Debo elegir el combo INV-BAT5 o el INV-BAT10?',
    answerVi: 'INV-BAT5 Básico có dung lượng pin 5kWh, phù hợp hộ gia đình nhỏ dùng các thiết bị cơ bản như đèn, quạt, tủ lạnh, tivi. INV-BAT10 Premium có dung lượng 10kWh, dành cho hộ gia đình lớn hoặc văn phòng nhỏ có thêm máy lạnh, máy bơm, thiết bị công suất cao. Cách chọn chính xác nhất là dựa trên hóa đơn điện trung bình hàng tháng của bạn — hãy liên hệ để chúng tôi tính toán và tư vấn miễn phí.',
    answerEn: 'The INV-BAT5 Básico has 5kWh of battery capacity and suits smaller households running basic loads such as lights, fans, a refrigerator and a TV. The INV-BAT10 Premium offers 10kWh for larger homes or small offices that also run air conditioning, pumps or other high-draw equipment. The most reliable way to choose is from your average monthly electricity bill — contact us and we will size the system and advise you free of charge.',
    answerEs: 'El INV-BAT5 Básico tiene 5kWh de capacidad de batería y es adecuado para hogares pequeños con cargas básicas como luces, ventiladores, refrigerador y televisor. El INV-BAT10 Premium ofrece 10kWh para viviendas más grandes u oficinas pequeñas que además usan aire acondicionado, bombas u otros equipos de alto consumo. La forma más fiable de elegir es a partir de su factura eléctrica mensual promedio: contáctenos y dimensionaremos el sistema y le asesoraremos sin costo.',
    category: 'Sản phẩm & Giải pháp', sortOrder: 11, status: 'published',
  },
  {
    questionVi: 'Pin lithium LFP có ưu điểm gì so với pin chì-axit?',
    questionEn: 'What advantages does an LFP lithium battery have over lead-acid?',
    questionEs: '¿Qué ventajas tiene una batería de litio LFP frente a una de plomo-ácido?',
    answerVi: 'Pin lithium LFP (LiFePO4) có tuổi thọ dài hơn nhiều lần, thường đạt vài nghìn chu kỳ sạc-xả so với vài trăm chu kỳ của pin chì-axit. Pin LFP cũng cho phép xả sâu hơn nên dung lượng sử dụng thực tế cao hơn, nhẹ hơn, không cần bảo dưỡng định kỳ và ổn định nhiệt tốt hơn nên an toàn hơn. Chi phí ban đầu cao hơn, nhưng tính trên toàn vòng đời thì thường rẻ hơn đáng kể.',
    answerEn: 'LFP lithium batteries (LiFePO4) last far longer, typically delivering thousands of charge cycles against a few hundred for lead-acid. They also tolerate deeper discharge, so more of the rated capacity is genuinely usable, and they are lighter, maintenance-free and more thermally stable, which makes them safer. The upfront cost is higher, but over the full lifetime they usually work out considerably cheaper.',
    answerEs: 'Las baterías de litio LFP (LiFePO4) duran mucho más, normalmente miles de ciclos de carga frente a unos pocos cientos de las de plomo-ácido. También admiten descargas más profundas, por lo que se aprovecha realmente más capacidad, y son más ligeras, no requieren mantenimiento y son térmicamente más estables, lo que las hace más seguras. El costo inicial es mayor, pero a lo largo de toda su vida útil suelen resultar bastante más económicas.',
    category: 'Sản phẩm & Giải pháp', sortOrder: 12, status: 'published',
  },
  {
    questionVi: 'TBSolaro cung cấp những dòng sản phẩm nào?',
    questionEn: 'What product lines does TBSolaro offer?',
    questionEs: '¿Qué líneas de productos ofrece TBSolaro?',
    answerVi: 'TBSolaro cung cấp bốn nhóm chính: combo trọn gói (đã bao gồm tấm pin, biến tần, pin lưu trữ và phụ kiện), tấm pin mặt trời, pin lưu trữ lithium, và biến tần các loại on-grid, off-grid, hybrid. Combo trọn gói là lựa chọn phổ biến nhất vì đã được tính toán đồng bộ, khách hàng không phải tự ghép thiết bị. Bạn có thể xem chi tiết từng dòng tại trang Sản phẩm.',
    answerEn: 'TBSolaro offers four main groups: complete combo packages (panels, inverter, battery storage and accessories bundled together), solar panels, lithium storage batteries, and inverters in on-grid, off-grid and hybrid variants. The combo packages are the most popular choice because every component is matched in advance, so customers do not have to assemble a system themselves. You can see the details of each line on the Products page.',
    answerEs: 'TBSolaro ofrece cuatro grupos principales: paquetes combo completos (paneles, inversor, batería y accesorios en un solo conjunto), paneles solares, baterías de litio y inversores en versiones on-grid, off-grid e híbrida. Los paquetes combo son la opción más popular porque todos los componentes vienen ya dimensionados entre sí, de modo que el cliente no tiene que armar el sistema por su cuenta. Puede ver el detalle de cada línea en la página de Productos.',
    category: 'Sản phẩm & Giải pháp', sortOrder: 13, status: 'published',
  },

  // ── Kỹ thuật ─────────────────────────────────────────────────────────
  {
    questionVi: 'Hệ thống 5 kWp tạo ra được bao nhiêu điện mỗi tháng?',
    questionEn: 'How much electricity does a 5 kWp system generate per month?',
    questionEs: '¿Cuánta electricidad genera un sistema de 5 kWp al mes?',
    answerVi: 'Sản lượng phụ thuộc vào cường độ nắng, hướng mái, độ nghiêng và bóng che tại từng vị trí. Ở các vùng nhiều nắng như Việt Nam và Cuba, một hệ 5 kWp lắp đặt tốt thường cho sản lượng khoảng 500–650 kWh mỗi tháng, cao hơn vào mùa khô và thấp hơn vào mùa mưa. Khi khảo sát thực địa, TBSolaro sẽ đưa ra con số dự báo cụ thể cho chính mái nhà của bạn.',
    answerEn: 'Output depends on solar irradiance, roof orientation, tilt and shading at each specific site. In sunny regions such as Vietnam and Cuba, a well-installed 5 kWp system typically produces roughly 500–650 kWh per month, more in the dry season and less in the rainy season. During the site survey TBSolaro will give you a specific forecast for your own roof.',
    answerEs: 'La producción depende de la irradiación solar, la orientación del techo, la inclinación y las sombras de cada ubicación. En regiones soleadas como Vietnam y Cuba, un sistema de 5 kWp bien instalado suele producir entre 500 y 650 kWh al mes, más en la temporada seca y menos en la de lluvias. Durante la inspección técnica, TBSolaro le entregará una previsión concreta para su propio techo.',
    category: 'Kỹ thuật', sortOrder: 14, status: 'published',
  },
  {
    questionVi: 'Tôi cần bao nhiêu diện tích mái để lắp hệ thống?',
    questionEn: 'How much roof area do I need for a system?',
    questionEs: '¿Cuánta superficie de techo necesito para instalar un sistema?',
    answerVi: 'Theo kinh nghiệm thực tế, mỗi 1 kWp cần khoảng 5–7 m² mái trống không bị bóng che. Như vậy hệ 5 kWp cần khoảng 25–35 m², còn hệ 10 kWp cần khoảng 50–70 m². Diện tích chính xác phụ thuộc vào công suất từng tấm pin và cách bố trí trên mái. Nếu mái nhỏ hơn, chúng tôi có thể đề xuất tấm pin hiệu suất cao để bù lại phần diện tích thiếu.',
    answerEn: 'As a practical rule, each 1 kWp needs roughly 5–7 m² of unshaded roof. A 5 kWp system therefore needs about 25–35 m², and a 10 kWp system about 50–70 m². The exact figure depends on the wattage of each panel and how the array is laid out. If your roof is smaller, we can propose higher-efficiency panels to make up the shortfall.',
    answerEs: 'Como regla práctica, cada 1 kWp requiere entre 5 y 7 m² de techo sin sombra. Un sistema de 5 kWp necesita por tanto unos 25–35 m², y uno de 10 kWp unos 50–70 m². La cifra exacta depende de la potencia de cada panel y de la distribución sobre el techo. Si su techo es más pequeño, podemos proponer paneles de mayor eficiencia para compensar la superficie faltante.',
    category: 'Kỹ thuật', sortOrder: 15, status: 'published',
  },
  {
    questionVi: 'Khi mất điện lưới, hệ thống có tiếp tục cấp điện không?',
    questionEn: 'Does the system keep supplying power during a grid outage?',
    questionEs: '¿El sistema sigue suministrando energía durante un corte de red?',
    answerVi: 'Điều này phụ thuộc vào loại hệ thống. Hệ on-grid sẽ tự động ngắt khi mất điện lưới — đây là yêu cầu an toàn bắt buộc để bảo vệ nhân viên đang sửa chữa đường dây. Hệ off-grid và hybrid có pin lưu trữ nên vẫn cấp điện bình thường cho các thiết bị đã được đấu vào mạch dự phòng. Nếu việc duy trì điện khi mất lưới là ưu tiên của bạn, hãy chọn hệ hybrid hoặc off-grid.',
    answerEn: 'That depends on the system type. An on-grid system disconnects automatically during an outage — this is a mandatory safety requirement that protects crews repairing the line. Off-grid and hybrid systems have battery storage and keep powering whatever has been wired to the backup circuit. If keeping the lights on during outages matters to you, choose a hybrid or off-grid system.',
    answerEs: 'Depende del tipo de sistema. Un sistema on-grid se desconecta automáticamente durante un apagón: es un requisito de seguridad obligatorio que protege al personal que repara la línea. Los sistemas off-grid e híbridos cuentan con baterías y siguen alimentando todo lo que esté conectado al circuito de respaldo. Si mantener la energía durante los cortes es prioritario para usted, elija un sistema híbrido u off-grid.',
    category: 'Kỹ thuật', sortOrder: 16, status: 'published',
  },
  {
    questionVi: 'Tấm pin có bị giảm hiệu suất theo thời gian không?',
    questionEn: 'Do solar panels lose efficiency over time?',
    questionEs: '¿Los paneles solares pierden eficiencia con el tiempo?',
    answerVi: 'Có, đây là hiện tượng suy giảm tự nhiên của mọi tấm pin mặt trời, nhưng diễn ra rất chậm. Tấm pin chất lượng thường suy giảm khoảng 0,5% mỗi năm, nghĩa là sau 25 năm vẫn giữ được khoảng 80–85% công suất ban đầu. Đó cũng là lý do tấm pin được bảo hành hiệu suất tới 25 năm. Vệ sinh định kỳ và lắp đặt đúng kỹ thuật giúp giữ hiệu suất ở mức cao nhất.',
    answerEn: 'Yes — all solar panels degrade naturally, but very slowly. Quality panels typically lose around 0.5% per year, meaning that after 25 years they still hold roughly 80–85% of their original output. That is precisely why panels carry a 25-year performance warranty. Regular cleaning and correct installation keep efficiency at its highest.',
    answerEs: 'Sí, todos los paneles solares se degradan de forma natural, pero muy lentamente. Los paneles de calidad pierden alrededor de un 0,5% al año, lo que significa que tras 25 años conservan cerca del 80–85% de su producción original. Por eso mismo los paneles cuentan con una garantía de rendimiento de 25 años. La limpieza periódica y una instalación correcta mantienen la eficiencia en su punto máximo.',
    category: 'Kỹ thuật', sortOrder: 17, status: 'published',
  },
  {
    questionVi: 'Hệ thống điện mặt trời có an toàn về cháy nổ và sét đánh không?',
    questionEn: 'Is a solar system safe against fire and lightning?',
    questionEs: '¿Es seguro un sistema solar frente a incendios y rayos?',
    answerVi: 'Hệ thống của TBSolaro được thiết kế với đầy đủ thiết bị bảo vệ: cầu dao DC/AC, chống sét lan truyền, nối đất theo tiêu chuẩn và biến tần có chức năng tự ngắt khi phát hiện bất thường. Pin lithium LFP cũng là dòng pin có độ ổn định nhiệt cao nhất trong các loại pin lithium. Rủi ro chủ yếu đến từ thi công sai kỹ thuật, vì vậy chúng tôi khuyến cáo chỉ lắp đặt qua đơn vị có chứng chỉ và nghiệm thu đầy đủ.',
    answerEn: 'TBSolaro systems are designed with a full protection set: DC/AC breakers, surge protection, standards-compliant earthing, and inverters that shut down automatically when they detect a fault. LFP lithium is also the most thermally stable chemistry among lithium batteries. Most real-world risk comes from poor workmanship, which is why we recommend only ever installing through a certified contractor with proper commissioning.',
    answerEs: 'Los sistemas de TBSolaro se diseñan con un conjunto completo de protecciones: interruptores DC/AC, protección contra sobretensiones, puesta a tierra conforme a norma e inversores que se desconectan automáticamente al detectar una anomalía. El litio LFP es además la química más estable térmicamente entre las baterías de litio. El mayor riesgo real proviene de una instalación mal ejecutada, por lo que recomendamos instalar siempre con un contratista certificado y con recepción técnica adecuada.',
    category: 'Kỹ thuật', sortOrder: 18, status: 'published',
  },

  // ── Chi phí & Tài chính ──────────────────────────────────────────────
  {
    questionVi: 'Bao lâu thì tôi hoàn vốn đầu tư?',
    questionEn: 'How long until I recover my investment?',
    questionEs: '¿En cuánto tiempo recupero mi inversión?',
    answerVi: 'Thời gian hoàn vốn phụ thuộc vào giá điện tại khu vực, mức tiêu thụ và quy mô hệ thống. Với các dự án doanh nghiệp có mức tiêu thụ cao và sử dụng điện chủ yếu vào ban ngày, thời gian hoàn vốn thường ngắn hơn — dự án nhà máy 500 kWp mà TBSolaro triển khai tại Bình Dương đạt điểm hoàn vốn sau khoảng 5 năm. Với hộ gia đình, thời gian này thường dài hơn. Chúng tôi sẽ lập bảng tính hoàn vốn cụ thể dựa trên hóa đơn điện thực tế của bạn.',
    answerEn: 'Payback depends on local electricity tariffs, your consumption and the size of the system. Commercial projects with high consumption that use most of their power during daylight hours pay back fastest — the 500 kWp factory project TBSolaro delivered in Binh Duong reached its return on investment in about 5 years. For households the period is usually longer. We will build a specific payback model from your actual electricity bills.',
    answerEs: 'El retorno depende de las tarifas eléctricas locales, su consumo y el tamaño del sistema. Los proyectos empresariales con alto consumo que utilizan la mayor parte de la energía durante el día se amortizan más rápido: el proyecto de fábrica de 500 kWp que TBSolaro ejecutó en Binh Duong alcanzó el retorno de la inversión en unos 5 años. En viviendas el plazo suele ser mayor. Elaboraremos un cálculo de amortización específico a partir de sus facturas reales.',
    category: 'Chi phí & Giá cả', sortOrder: 19, status: 'published',
  },
  {
    questionVi: 'Chi phí vận hành hàng năm của hệ thống là bao nhiêu?',
    questionEn: 'What are the annual running costs of the system?',
    questionEs: '¿Cuáles son los costos anuales de operación del sistema?',
    answerVi: 'Điện mặt trời gần như không có chi phí nhiên liệu, nên chi phí vận hành hàng năm rất thấp. Khoản chi chính là vệ sinh tấm pin định kỳ và kiểm tra kỹ thuật, thường chỉ chiếm một phần rất nhỏ so với tiền điện tiết kiệm được. Trong thời gian bảo hành, việc thay thế linh kiện lỗi do nhà sản xuất không tốn phí. Chi phí lớn duy nhất cần dự trù dài hạn là thay pin lưu trữ sau khi hết vòng đời.',
    answerEn: 'Solar power has virtually no fuel cost, so annual running costs are very low. The main expenses are periodic panel cleaning and technical inspection, which typically amount to a small fraction of the electricity savings. During the warranty period, replacing components that fail due to manufacturing defects is free of charge. The only significant long-term cost to plan for is replacing the storage battery at the end of its service life.',
    answerEs: 'La energía solar prácticamente no tiene costo de combustible, por lo que los gastos anuales de operación son muy bajos. Los principales son la limpieza periódica de los paneles y la inspección técnica, que suelen representar una fracción pequeña del ahorro en electricidad. Durante el período de garantía, la sustitución de componentes con defectos de fabricación no tiene costo. El único gasto significativo a largo plazo que conviene prever es el reemplazo de la batería al final de su vida útil.',
    category: 'Chi phí & Giá cả', sortOrder: 20, status: 'published',
  },
  {
    questionVi: 'TBSolaro có hỗ trợ thanh toán theo giai đoạn không?',
    questionEn: 'Does TBSolaro support staged payment?',
    questionEs: '¿TBSolaro admite pagos por etapas?',
    answerVi: 'Có. Với phần lớn dự án, TBSolaro áp dụng thanh toán theo giai đoạn gắn với tiến độ thi công: tạm ứng khi ký hợp đồng, thanh toán tiếp khi tập kết thiết bị, và thanh toán phần còn lại sau khi nghiệm thu và hệ thống vận hành ổn định. Tỷ lệ và điều kiện cụ thể tùy theo quy mô dự án và khu vực. Vui lòng liên hệ để nhận phương án thanh toán phù hợp với dự án của bạn.',
    answerEn: 'Yes. On most projects TBSolaro uses staged payments tied to installation milestones: a deposit on signing, a further payment when the equipment is delivered to site, and the balance after commissioning once the system is running stably. The exact percentages and terms vary with project size and region. Please contact us for a payment plan suited to your project.',
    answerEs: 'Sí. En la mayoría de los proyectos, TBSolaro aplica pagos por etapas vinculados al avance de la obra: un anticipo a la firma, un pago adicional cuando el equipo llega a obra y el saldo tras la recepción, una vez que el sistema funciona de forma estable. Los porcentajes y condiciones exactos varían según el tamaño del proyecto y la región. Contáctenos para recibir un plan de pago adecuado a su proyecto.',
    category: 'Tài chính', sortOrder: 21, status: 'published',
  },

  // ── Lắp đặt ──────────────────────────────────────────────────────────
  {
    questionVi: 'Quy trình triển khai của TBSolaro gồm những bước nào?',
    questionEn: 'What are the steps in a TBSolaro deployment?',
    questionEs: '¿Cuáles son los pasos de una instalación con TBSolaro?',
    answerVi: 'Quy trình gồm năm bước chính: khảo sát hiện trạng và nhu cầu sử dụng điện; thiết kế hệ thống kèm báo giá và bảng tính hoàn vốn; ký hợp đồng và chuẩn bị thiết bị; thi công lắp đặt và đấu nối; nghiệm thu, hướng dẫn vận hành và bàn giao. Sau bàn giao, hệ thống bước vào giai đoạn bảo hành và chúng tôi tiếp tục hỗ trợ kỹ thuật trong suốt quá trình sử dụng.',
    answerEn: 'There are five main steps: surveying the site and your electricity needs; designing the system with a quotation and payback model; signing the contract and preparing equipment; installation and electrical connection; then commissioning, operator training and handover. After handover the system enters its warranty period and we continue to provide technical support throughout its service life.',
    answerEs: 'El proceso tiene cinco pasos principales: inspección del sitio y de sus necesidades eléctricas; diseño del sistema con cotización y cálculo de amortización; firma del contrato y preparación de los equipos; instalación y conexión eléctrica; y finalmente recepción, capacitación de operación y entrega. Tras la entrega, el sistema entra en su período de garantía y seguimos brindando soporte técnico durante toda su vida útil.',
    category: 'Lắp đặt', sortOrder: 22, status: 'published',
  },
  {
    questionVi: 'Mái tôn, mái ngói hay mái bê tông đều lắp được chứ?',
    questionEn: 'Can panels be installed on metal, tile and concrete roofs alike?',
    questionEs: '¿Se puede instalar en techos de chapa, teja y hormigón por igual?',
    answerVi: 'Được. TBSolaro có bộ khung giá đỡ riêng cho từng loại mái: mái tôn dùng kẹp chuyên dụng bắt vào sóng tôn, mái ngói dùng chân bắt vào xà gồ bên dưới, mái bê tông dùng chân đế có gia cố chống thấm. Yếu tố quan trọng hơn loại mái là kết cấu chịu lực và độ tuổi của mái. Nếu mái đã xuống cấp, chúng tôi sẽ khuyến nghị gia cố hoặc cải tạo trước khi lắp đặt.',
    answerEn: 'Yes. TBSolaro has dedicated mounting systems for each roof type: metal roofs use clamps fixed to the sheet ribs, tile roofs use feet anchored to the purlins beneath, and concrete roofs use ballasted or bolted bases with waterproofing reinforcement. What matters more than the roof material is its load-bearing structure and age. If the roof has deteriorated, we will recommend reinforcing or renovating it before installation.',
    answerEs: 'Sí. TBSolaro cuenta con sistemas de montaje específicos para cada tipo de techo: en chapa se usan abrazaderas fijadas a las ondas, en teja se emplean soportes anclados a las correas inferiores y en hormigón se utilizan bases con refuerzo de impermeabilización. Más importante que el material del techo es su estructura portante y su antigüedad. Si el techo está deteriorado, recomendaremos reforzarlo o repararlo antes de la instalación.',
    category: 'Lắp đặt', sortOrder: 23, status: 'published',
  },
  {
    questionVi: 'Lắp đặt có làm hỏng mái hoặc gây thấm dột không?',
    questionEn: 'Will the installation damage my roof or cause leaks?',
    questionEs: '¿La instalación dañará mi techo o provocará filtraciones?',
    answerVi: 'Nếu thi công đúng kỹ thuật thì không. Mọi điểm khoan xuyên mái đều được xử lý chống thấm nhiều lớp bằng gioăng và keo chuyên dụng, và đội thi công kiểm tra lại toàn bộ điểm bắt vít trước khi nghiệm thu. Trên nhiều loại mái, hệ khung còn được thiết kế để hạn chế tối đa số điểm xuyên mái. TBSolaro bảo hành cả phần chống thấm tại các vị trí thi công — nếu phát sinh thấm dột do lắp đặt, chúng tôi chịu trách nhiệm khắc phục.',
    answerEn: 'Not when the work is done properly. Every roof penetration is sealed in multiple layers with purpose-made gaskets and sealant, and the crew re-checks each fixing point before commissioning. On many roof types the mounting system is also designed to minimise the number of penetrations altogether. TBSolaro warrants the waterproofing at every point we work on — if a leak arises from our installation, we are responsible for putting it right.',
    answerEs: 'No, si el trabajo se ejecuta correctamente. Cada perforación del techo se sella en varias capas con juntas y selladores específicos, y el equipo revisa nuevamente cada punto de fijación antes de la recepción. En muchos tipos de techo, además, el sistema de montaje está diseñado para reducir al mínimo el número de perforaciones. TBSolaro garantiza la impermeabilización en cada punto intervenido: si aparece una filtración por causa de nuestra instalación, nos hacemos responsables de repararla.',
    category: 'Lắp đặt', sortOrder: 24, status: 'published',
  },

  // ── Bảo hành & Dịch vụ ───────────────────────────────────────────────
  {
    questionVi: 'Chính sách bảo hành áp dụng cho từng thành phần ra sao?',
    questionEn: 'How does the warranty apply to each component?',
    questionEs: '¿Cómo se aplica la garantía a cada componente?',
    answerVi: 'Mỗi thành phần có thời hạn bảo hành riêng: tấm pin mặt trời được bảo hành hiệu suất dài nhất, lên tới 25 năm; pin lưu trữ và biến tần có thời hạn ngắn hơn, thường tính theo năm hoặc theo số chu kỳ sạc-xả. Điều kiện cụ thể được ghi rõ trong tài liệu kỹ thuật của từng sản phẩm, bạn có thể tải về tại trang Tài liệu. Bảo hành không áp dụng cho hư hỏng do tác động bên ngoài hoặc do tự ý sửa chữa, thay đổi hệ thống.',
    answerEn: 'Each component carries its own term: solar panels have the longest performance warranty, up to 25 years, while storage batteries and inverters have shorter terms, usually counted in years or in charge cycles. The precise conditions are set out in each product\'s technical documentation, which you can download from the Documents page. The warranty does not cover damage from external causes or from unauthorised repairs or modifications to the system.',
    answerEs: 'Cada componente tiene su propio plazo: los paneles solares cuentan con la garantía de rendimiento más larga, de hasta 25 años, mientras que las baterías y los inversores tienen plazos menores, normalmente contados en años o en ciclos de carga. Las condiciones exactas se detallan en la documentación técnica de cada producto, que puede descargar desde la página de Documentos. La garantía no cubre daños por causas externas ni por reparaciones o modificaciones no autorizadas del sistema.',
    category: 'Bảo hành & Dịch vụ', sortOrder: 25, status: 'published',
  },
  {
    questionVi: 'Nếu thiết bị gặp sự cố, bao lâu thì có linh kiện thay thế?',
    questionEn: 'If equipment fails, how long until a replacement part arrives?',
    questionEs: 'Si un equipo falla, ¿cuánto tarda en llegar el repuesto?',
    answerVi: 'Khi nhận được thông báo sự cố, đội kỹ thuật sẽ kiểm tra từ xa qua hệ thống giám sát hoặc đến tận nơi để xác định nguyên nhân. Với các linh kiện phổ biến có sẵn trong kho khu vực, việc thay thế thường được xử lý trong vài ngày làm việc. Với thiết bị đặc thù phải nhập khẩu, thời gian sẽ dài hơn và chúng tôi sẽ thông báo mốc cụ thể ngay khi xác định được. Trong thời gian chờ, chúng tôi ưu tiên các phương án tạm để hệ thống vẫn vận hành ở mức tối đa có thể.',
    answerEn: 'When a fault is reported, our technical team checks it remotely through the monitoring system or attends the site to identify the cause. For common parts held in regional stock, replacement is usually handled within a few working days. For specialised equipment that must be imported the lead time is longer, and we confirm a specific date as soon as it is known. While you wait, we prioritise interim arrangements so the system keeps running as far as possible.',
    answerEs: 'Cuando se reporta una falla, nuestro equipo técnico la revisa de forma remota mediante el sistema de monitoreo o acude al sitio para determinar la causa. Para piezas comunes disponibles en el almacén regional, la sustitución suele resolverse en unos pocos días hábiles. Para equipos especializados que deben importarse, el plazo es mayor y confirmamos una fecha concreta en cuanto se conoce. Mientras tanto, priorizamos soluciones provisionales para que el sistema siga funcionando en la medida de lo posible.',
    category: 'Bảo hành & Dịch vụ', sortOrder: 26, status: 'published',
  },

  // ── Vận hành & Bảo trì ───────────────────────────────────────────────
  {
    questionVi: 'Bao lâu cần vệ sinh tấm pin một lần?',
    questionEn: 'How often do the panels need cleaning?',
    questionEs: '¿Cada cuánto hay que limpiar los paneles?',
    answerVi: 'Thông thường nên vệ sinh khoảng 2–4 lần mỗi năm. Khu vực nhiều bụi, gần đường lớn, khu công nghiệp hoặc có nhiều cây cối, phân chim thì cần vệ sinh dày hơn. Ở nơi mưa đều, nước mưa đã rửa trôi phần lớn bụi bẩn nên có thể giãn tần suất. Chỉ nên dùng nước sạch và chổi mềm, tránh chất tẩy mạnh và tuyệt đối không xịt nước lạnh lên tấm pin đang nóng. Nếu mái cao hoặc khó tiếp cận, hãy để đội kỹ thuật của chúng tôi thực hiện.',
    answerEn: 'Two to four times a year is typical. Dusty locations, sites near busy roads or industrial zones, and roofs with overhanging trees or bird droppings need cleaning more often. Where rainfall is regular, rain washes off most of the dust and the interval can be stretched. Use only clean water and a soft brush, avoid harsh detergents, and never spray cold water onto hot panels. If the roof is high or hard to reach, let our technicians handle it.',
    answerEs: 'Lo habitual es entre dos y cuatro veces al año. Las zonas con mucho polvo, cercanas a carreteras concurridas o áreas industriales, y los techos con árboles cercanos o excrementos de aves requieren limpiezas más frecuentes. Donde llueve con regularidad, la lluvia arrastra la mayor parte del polvo y el intervalo puede ampliarse. Use solo agua limpia y un cepillo suave, evite detergentes agresivos y nunca rocíe agua fría sobre paneles calientes. Si el techo es alto o de difícil acceso, deje que lo hagan nuestros técnicos.',
    category: 'Vận hành & Bảo trì', sortOrder: 27, status: 'published',
  },
  {
    questionVi: 'Tôi theo dõi sản lượng điện của hệ thống bằng cách nào?',
    questionEn: 'How can I monitor the system\'s energy output?',
    questionEs: '¿Cómo puedo monitorear la producción del sistema?',
    answerVi: 'Biến tần trong các hệ thống TBSolaro có màn hình hiển thị thông số vận hành trực tiếp, và với các model hỗ trợ kết nối, bạn có thể theo dõi sản lượng theo ngày, tháng, năm qua ứng dụng trên điện thoại hoặc trình duyệt. Ứng dụng cũng cảnh báo khi hệ thống hoạt động bất thường để xử lý sớm. Khi bàn giao, kỹ thuật viên sẽ cài đặt và hướng dẫn bạn sử dụng đầy đủ.',
    answerEn: 'The inverter in a TBSolaro system has a display showing live operating data, and on models that support connectivity you can track daily, monthly and annual output from a phone app or a web browser. The app also raises alerts when the system behaves abnormally so problems can be caught early. At handover, our technician sets this up and walks you through it fully.',
    answerEs: 'El inversor de los sistemas TBSolaro cuenta con una pantalla que muestra los datos de funcionamiento en tiempo real y, en los modelos con conectividad, puede seguir la producción diaria, mensual y anual desde una aplicación móvil o un navegador web. La aplicación también emite alertas cuando el sistema presenta un comportamiento anómalo, para detectar problemas a tiempo. En la entrega, nuestro técnico lo configura y le explica su uso en detalle.',
    category: 'Vận hành & Bảo trì', sortOrder: 28, status: 'published',
  },

  // ── Chính sách & Khu vực ─────────────────────────────────────────────
  {
    questionVi: 'TBSolaro triển khai dự án tại những khu vực nào?',
    questionEn: 'Which regions does TBSolaro operate in?',
    questionEs: '¿En qué regiones opera TBSolaro?',
    answerVi: 'TBSolaro đặt trụ sở tại Đặc khu phát triển Mariel, tỉnh Artemisa, Cuba và triển khai dự án tại Cuba, Việt Nam cùng các thị trường lân cận. Chúng tôi đã thực hiện nhiều loại hình dự án khác nhau: hệ thống cho nhà máy và doanh nghiệp, hệ thống hộ gia đình, và các dự án CSR cho trường học, cơ sở y tế. Nếu bạn ở ngoài các khu vực trên, hãy liên hệ để chúng tôi trao đổi về khả năng hỗ trợ.',
    answerEn: 'TBSolaro is headquartered in the Mariel Special Development Zone, Artemisa Province, Cuba, and delivers projects across Cuba, Vietnam and neighbouring markets. We have completed a wide range of project types: systems for factories and businesses, household installations, and CSR projects for schools and healthcare facilities. If you are outside these regions, contact us and we will discuss what support we can offer.',
    answerEs: 'TBSolaro tiene su sede en la Zona Especial de Desarrollo Mariel, provincia de Artemisa, Cuba, y ejecuta proyectos en Cuba, Vietnam y mercados vecinos. Hemos completado proyectos de muy distinto tipo: sistemas para fábricas y empresas, instalaciones residenciales y proyectos de RSC para escuelas y centros de salud. Si se encuentra fuera de estas regiones, contáctenos y evaluaremos qué apoyo podemos brindarle.',
    category: 'Chính sách & Pháp lý', sortOrder: 29, status: 'published',
  },
];
