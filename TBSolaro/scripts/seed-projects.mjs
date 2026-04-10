// Seed new projects with OpenAI-generated realistic images → Vercel Blob → DB.
//
// Usage:
//   DATABASE_URL=... BLOB_READ_WRITE_TOKEN=... OPENAI_API_KEY=... \
//     node scripts/seed-projects.mjs
//
// Brand voice: TBSolaro — "Mái nhà bạn. Năng lượng bạn."
// Warm, empowering, community-driven. Focus on people, impact, and trust.

import { PrismaClient } from "@prisma/client";
import { put } from "@vercel/blob";

const prisma = new PrismaClient();

const OPENAI_API_KEY = process.env.OPENAI_API_KEY;
const BLOB_TOKEN = process.env.BLOB_READ_WRITE_TOKEN;
if (!OPENAI_API_KEY) throw new Error("Missing OPENAI_API_KEY");
if (!BLOB_TOKEN) throw new Error("Missing BLOB_READ_WRITE_TOKEN");

// ---------- Projects (Vi / En / Es) ----------

const projects = [
  // ─── Enterprise ───
  {
    slug: "seafood-export-factory-mekong",
    category: "enterprise",
    sortOrder: 4,
    location: "Cần Thơ, Việt Nam",
    power: "350 kWp",
    installationDate: "2024-05-20",
    year: "2024",
    titleVi: "Nhà máy chế biến thủy sản xuất khẩu – Cần Thơ",
    titleEn: "Seafood Export Processing Factory – Can Tho",
    titleEs: "Fábrica de Procesamiento de Mariscos para Exportación – Can Tho",
    excerptVi: "Giải pháp năng lượng sạch giúp doanh nghiệp thủy sản giảm chi phí vận hành và nâng cao giá trị xuất khẩu bền vững.",
    excerptEn: "Clean energy solution helping a seafood enterprise reduce operating costs and elevate sustainable export value.",
    excerptEs: "Solución de energía limpia que ayuda a una empresa de mariscos a reducir costos operativos y elevar el valor de exportación sostenible.",
    contentVi: `<p>Giữa vùng đồng bằng sông Cửu Long — nơi nắng dồi dào quanh năm — một nhà máy chế biến thủy sản hàng đầu đã chọn TBSolaro để chuyển đổi sang năng lượng sạch. Đây không chỉ là quyết định về chi phí, mà còn là cam kết với đối tác quốc tế rằng mỗi sản phẩm rời nhà máy đều mang dấu ấn phát triển bền vững.</p>
<p>Hệ thống điện mặt trời trải dài trên mái nhà xưởng rộng lớn, lặng lẽ chuyển hóa nắng Cần Thơ thành nguồn điện phục vụ dây chuyền sản xuất. Ban lãnh đạo chia sẻ rằng kể từ khi hệ thống hoạt động, chi phí điện giảm đáng kể — nhưng điều quan trọng hơn cả là câu chuyện mà họ có thể kể cho khách hàng châu Âu và Nhật Bản: "Chúng tôi sản xuất bằng năng lượng mặt trời."</p>
<p>TBSolaro tự hào khi mỗi dự án doanh nghiệp không chỉ mang lại hiệu quả kinh tế mà còn góp phần nâng tầm thương hiệu Việt Nam trên thị trường quốc tế.</p>`,
    contentEn: `<p>In the heart of the Mekong Delta — where sunshine is abundant year-round — a leading seafood processing factory chose TBSolaro to transition to clean energy. This was not just a decision about cost savings, but a commitment to international partners that every product leaving the factory carries a mark of sustainable development.</p>
<p>The solar power system stretches across the vast factory rooftop, quietly converting Can Tho sunshine into electricity for the production line. Management shared that since the system began operating, electricity costs dropped significantly — but more importantly, it gave them a story to tell their European and Japanese clients: "We produce with solar energy."</p>
<p>TBSolaro takes pride in knowing that every enterprise project not only delivers economic value but also helps elevate Vietnam's brand on the international stage.</p>`,
    contentEs: `<p>En el corazón del Delta del Mekong — donde el sol es abundante todo el año — una fábrica líder de procesamiento de mariscos eligió a TBSolaro para su transición a energía limpia. No fue solo una decisión de ahorro de costos, sino un compromiso con sus socios internacionales de que cada producto que sale de la fábrica lleva la marca del desarrollo sostenible.</p>
<p>El sistema de energía solar se extiende por el amplio techo de la fábrica, convirtiendo silenciosamente el sol de Can Tho en electricidad para la línea de producción. La gerencia compartió que desde que el sistema comenzó a operar, los costos de electricidad disminuyeron significativamente — pero lo más importante es la historia que ahora pueden contarle a sus clientes europeos y japoneses: "Producimos con energía solar."</p>
<p>TBSolaro se enorgullece de que cada proyecto empresarial no solo genera valor económico sino que también ayuda a elevar la marca de Vietnam en el escenario internacional.</p>`,
    imagePrompt: "Professional documentary photograph of a large industrial seafood processing factory in the Mekong Delta, Vietnam. Wide shot of a vast white factory rooftop covered with rows of solar panels under bright tropical blue sky. In the foreground, workers in white uniforms walking near the factory entrance. Lush green vegetation and river canals visible in the background. Warm natural lighting, realistic, photojournalistic style, high resolution. No text or logos.",
    galleryPrompts: [
      "Aerial drone photograph looking down at a large industrial factory rooftop in Vietnam completely covered with solar panel arrays, surrounded by tropical greenery and water canals of the Mekong Delta. Bright sunny day, vivid colors, realistic documentary style. No text.",
    ],
  },
  {
    slug: "resort-hotel-phu-quoc",
    category: "enterprise",
    sortOrder: 5,
    location: "Phú Quốc, Việt Nam",
    power: "200 kWp",
    installationDate: "2024-07-15",
    year: "2024",
    titleVi: "Khu nghỉ dưỡng sinh thái – Phú Quốc",
    titleEn: "Eco Resort – Phu Quoc Island",
    titleEs: "Resort Ecológico – Isla Phu Quoc",
    excerptVi: "Khi du lịch bền vững không chỉ là khẩu hiệu — mái nhà resort trở thành nguồn năng lượng cho trải nghiệm xanh của du khách.",
    excerptEn: "When sustainable tourism is more than a slogan — a resort rooftop becomes the power source for guests' green experience.",
    excerptEs: "Cuando el turismo sostenible es más que un eslogan — el techo del resort se convierte en la fuente de energía para la experiencia verde de los huéspedes.",
    contentVi: `<p>Trên hòn đảo ngọc Phú Quốc, một khu nghỉ dưỡng boutique đã đặt ra câu hỏi: "Làm sao để mỗi du khách cảm nhận được cam kết xanh của chúng tôi — không phải trên brochure, mà ngay từ khoảnh khắc bước vào?" Câu trả lời bắt đầu từ mái nhà.</p>
<p>TBSolaro đã thiết kế hệ thống điện mặt trời hòa hợp với kiến trúc nhiệt đới của resort, vừa cung cấp điện cho hệ thống điều hòa, hồ bơi và nhà hàng, vừa trở thành một phần câu chuyện thương hiệu. Du khách quốc tế — đặc biệt từ châu Âu — đánh giá cao khi biết rằng kỳ nghỉ của họ được vận hành bởi năng lượng sạch.</p>
<p>Với TBSolaro, năng lượng mặt trời không chỉ là giải pháp tiết kiệm — mà là giá trị gia tăng cho thương hiệu và trải nghiệm khách hàng.</p>`,
    contentEn: `<p>On the pearl island of Phu Quoc, a boutique resort asked themselves: "How can every guest feel our green commitment — not on a brochure, but from the very moment they walk in?" The answer started from the rooftop.</p>
<p>TBSolaro designed a solar power system that blends seamlessly with the resort's tropical architecture, powering the air conditioning, swimming pool, and restaurant while becoming part of the brand story. International guests — especially from Europe — appreciate knowing that their vacation is powered by clean energy.</p>
<p>With TBSolaro, solar energy is not just a cost-saving solution — it is added value for a brand and for the guest experience.</p>`,
    contentEs: `<p>En la isla perla de Phu Quoc, un resort boutique se preguntó: "¿Cómo puede cada huésped sentir nuestro compromiso verde — no en un folleto, sino desde el momento en que entra?" La respuesta comenzó desde el techo.</p>
<p>TBSolaro diseñó un sistema de energía solar que se integra perfectamente con la arquitectura tropical del resort, alimentando el aire acondicionado, la piscina y el restaurante, convirtiéndose en parte de la historia de la marca. Los huéspedes internacionales — especialmente de Europa — valoran saber que sus vacaciones funcionan con energía limpia.</p>
<p>Con TBSolaro, la energía solar no es solo una solución de ahorro — es valor agregado para la marca y la experiencia del huésped.</p>`,
    imagePrompt: "Professional photograph of a beautiful tropical boutique eco-resort on Phu Quoc island, Vietnam. Elegant low-rise wooden bungalows with thatched roofs and modern solar panels tastefully integrated. Turquoise swimming pool in the center, lush tropical gardens with palm trees. Warm golden afternoon light, clear sky. A few guests relaxing by the pool. Realistic, editorial travel photography style. No text or logos.",
    galleryPrompts: [
      "Wide angle photograph of solar panels installed on the roof of a tropical resort restaurant with open-air dining area below, palm trees, ocean view in background. Warm sunset lighting. Realistic photo style. No text.",
    ],
  },

  // ─── Household ───
  {
    slug: "young-family-home-da-nang",
    category: "household",
    sortOrder: 6,
    location: "Đà Nẵng, Việt Nam",
    power: "8 kWp",
    installationDate: "2024-09-05",
    year: "2024",
    titleVi: "Gia đình trẻ – Đà Nẵng",
    titleEn: "Young Family Home – Da Nang",
    titleEs: "Hogar de Familia Joven – Da Nang",
    excerptVi: "Một gia đình trẻ biến mái nhà thành nguồn tiết kiệm và bảo vệ tương lai cho con cái.",
    excerptEn: "A young family turned their rooftop into a source of savings and a shield for their children's future.",
    excerptEs: "Una familia joven convirtió su techo en una fuente de ahorro y protección para el futuro de sus hijos.",
    contentVi: `<p>Anh Minh và chị Hương — đôi vợ chồng trẻ với hai con nhỏ tại Đà Nẵng — không bắt đầu từ những con số. Họ bắt đầu từ một câu hỏi đơn giản: "Mình có thể làm gì ngay hôm nay để cuộc sống con cái mai sau tốt hơn?"</p>
<p>Căn nhà phố ba tầng của họ hướng nam, nhận trọn nắng miền Trung. Sau khi tìm hiểu và được TBSolaro tư vấn, gia đình quyết định lắp đặt hệ thống điện mặt trời trên mái. Không phức tạp, không ồn ào — chỉ đơn giản là mái nhà giờ đây làm thêm một việc: biến nắng thành điện.</p>
<p>Chị Hương kể: "Tháng đầu tiên nhìn hóa đơn điện giảm, hai vợ chồng cười rồi nói với con: 'Đó là nhờ mặt trời đấy.' Con gái bốn tuổi từ đó hay ra ban công ngước lên mái và nói: 'Mặt trời nhà mình đang làm việc!'"</p>
<p>Với TBSolaro, năng lượng mặt trời bắt đầu từ những khoảnh khắc gia đình — không phải từ bảng thông số.</p>`,
    contentEn: `<p>Minh and Huong — a young couple with two small children in Da Nang — didn't start with numbers. They started with a simple question: "What can we do today to make our children's lives better tomorrow?"</p>
<p>Their three-story townhouse faces south, soaking in Central Vietnam's generous sunshine. After learning more and consulting with TBSolaro, the family decided to install a solar system on their roof. Nothing complicated, nothing loud — simply their rooftop now does one more thing: turns sunshine into electricity.</p>
<p>Huong shared: "The first month we saw the electricity bill drop, we smiled and told the kids: 'That's thanks to the sun.' Our four-year-old daughter now goes to the balcony, looks up at the roof, and says: 'Our sun is working!'"</p>
<p>With TBSolaro, solar energy starts with family moments — not specification sheets.</p>`,
    contentEs: `<p>Minh y Huong — una pareja joven con dos hijos pequeños en Da Nang — no empezaron con números. Empezaron con una pregunta sencilla: "¿Qué podemos hacer hoy para que la vida de nuestros hijos sea mejor mañana?"</p>
<p>Su casa adosada de tres pisos mira al sur, bañada por el generoso sol del centro de Vietnam. Después de informarse y consultar con TBSolaro, la familia decidió instalar un sistema solar en su techo. Nada complicado, nada ruidoso — simplemente su techo ahora hace una cosa más: convierte el sol en electricidad.</p>
<p>Huong compartió: "El primer mes que vimos la factura de luz bajar, sonreímos y les dijimos a los niños: 'Eso es gracias al sol.' Nuestra hija de cuatro años ahora sale al balcón, mira hacia el techo y dice: '¡Nuestro sol está trabajando!'"</p>
<p>Con TBSolaro, la energía solar comienza con momentos familiares — no con fichas técnicas.</p>`,
    imagePrompt: "Warm documentary photograph of a Vietnamese young family (husband, wife, and a small girl about 4 years old) standing together on their balcony looking up at solar panels installed on the roof of their modern three-story townhouse in Da Nang, Vietnam. Late afternoon golden light, the girl pointing up excitedly at the panels. Urban residential neighborhood with other houses visible. Authentic, heartwarming, lifestyle photography style. No text or logos.",
    galleryPrompts: [
      "Close-up photograph of solar panels on a modern Vietnamese townhouse rooftop with a clear blue sky. Clean, well-installed rows of panels. Urban rooftops visible in the background. Bright daylight, realistic photo. No text.",
    ],
  },
  {
    slug: "retirement-home-hue",
    category: "household",
    sortOrder: 7,
    location: "Huế, Việt Nam",
    power: "3 kWp",
    installationDate: "2024-04-10",
    year: "2024",
    titleVi: "Ngôi nhà an yên – Huế",
    titleEn: "A Peaceful Home – Hue",
    titleEs: "Un Hogar Tranquilo – Hue",
    excerptVi: "Với đôi vợ chồng về hưu tại Huế, mái nhà năng lượng mặt trời là cách họ sống chậm mà vẫn bước cùng tương lai.",
    excerptEn: "For a retired couple in Hue, a solar rooftop is how they live slowly while still walking alongside the future.",
    excerptEs: "Para una pareja jubilada en Hue, un techo solar es su forma de vivir despacio sin dejar de caminar junto al futuro.",
    contentVi: `<p>Bác Thanh và bác Lan đã nghỉ hưu được năm năm. Căn nhà vườn ở ngoại ô Huế yên tĩnh, có sân trước trồng bưởi và mái ngói rêu phong. Khi con cái đề nghị lắp điện mặt trời, bác Thanh cười: "Mái nhà này xưa lắm rồi, liệu có chịu nổi không?"</p>
<p>Đội ngũ TBSolaro đến khảo sát, giải thích cặn kẽ, và bác Thanh yên tâm. Hệ thống nhỏ gọn, nhẹ nhàng, không làm thay đổi vẻ đẹp ngôi nhà cũ. Chỉ sau vài tuần, bác Lan nhận ra điều khác biệt: "Tiền điện giảm, quạt chạy cả ngày mà không áy náy. Mùa hè Huế nóng lắm — giờ thì mát rồi."</p>
<p>Bác Thanh thỉnh thoảng ra sân, ngước lên mái, rồi quay sang nói với hàng xóm: "Nhà tui có mặt trời riêng đó." Câu nói ấy, với bác, là niềm tự hào giản dị nhất.</p>
<p>TBSolaro tin rằng năng lượng sạch thuộc về mọi thế hệ — không chỉ người trẻ, mà cả những người đã sống trọn một đời và xứng đáng được hưởng sự an yên.</p>`,
    contentEn: `<p>Uncle Thanh and Aunt Lan have been retired for five years. Their garden house on the outskirts of Hue is quiet, with a pomelo tree in the front yard and a moss-covered tile roof. When their children suggested solar panels, Uncle Thanh laughed: "This roof is so old — can it even handle it?"</p>
<p>The TBSolaro team came to survey, explained everything carefully, and Uncle Thanh felt reassured. The system was compact, lightweight, and didn't change the old house's character. After just a few weeks, Aunt Lan noticed the difference: "The electricity bill dropped, and the fans run all day without guilt. Summers in Hue are so hot — now it's cool."</p>
<p>Uncle Thanh sometimes steps into the yard, looks up at the roof, then turns to the neighbor and says: "Our house has its own sun." That simple sentence is his quietest form of pride.</p>
<p>TBSolaro believes clean energy belongs to every generation — not just the young, but also those who have lived a full life and deserve peace of mind.</p>`,
    contentEs: `<p>Don Thanh y Doña Lan llevan cinco años jubilados. Su casa con jardín en las afueras de Hue es tranquila, con un árbol de pomelo en el patio y un techo de tejas cubierto de musgo. Cuando sus hijos sugirieron paneles solares, Don Thanh se rio: "Este techo es tan viejo — ¿podrá soportarlo?"</p>
<p>El equipo de TBSolaro vino a inspeccionar, explicó todo con cuidado, y Don Thanh se sintió tranquilo. El sistema era compacto, liviano, y no cambiaba el carácter de la casa antigua. Después de solo unas semanas, Doña Lan notó la diferencia: "La factura de luz bajó, y los ventiladores funcionan todo el día sin remordimiento. Los veranos en Hue son muy calurosos — ahora estamos frescos."</p>
<p>Don Thanh a veces sale al patio, mira hacia el techo, y le dice al vecino: "Nuestra casa tiene su propio sol." Esa frase sencilla es su forma más silenciosa de orgullo.</p>
<p>TBSolaro cree que la energía limpia pertenece a todas las generaciones — no solo a los jóvenes, sino también a quienes han vivido una vida plena y merecen tranquilidad.</p>`,
    imagePrompt: "Warm documentary photograph of an elderly Vietnamese couple (around 65-70 years old) sitting peacefully on the veranda of their traditional garden house in Hue, Vietnam. The house has a tile roof with solar panels visible. A pomelo tree in the front yard, tropical garden. Soft morning light, serene and dignified atmosphere. The man looks up at the roof with a gentle smile. Authentic, intimate, realistic photography. No text or logos.",
    galleryPrompts: [
      "Photograph of a traditional Vietnamese house in Hue with a moss-covered tile roof and modern solar panels installed carefully on top. Garden with tropical plants, quiet residential area. Natural daylight, documentary style. No text.",
    ],
  },

  // ─── CSR / Community ───
  {
    slug: "rural-clinic-cuba",
    category: "csr",
    sortOrder: 8,
    location: "Pinar del Río, Cuba",
    power: "6 kWp",
    installationDate: "2024-06-12",
    year: "2024",
    titleVi: "Trạm y tế nông thôn – Pinar del Río, Cuba",
    titleEn: "Rural Health Clinic – Pinar del Río, Cuba",
    titleEs: "Clínica de Salud Rural – Pinar del Río, Cuba",
    excerptVi: "Khi ánh sáng không bao giờ tắt trong phòng khám — mỗi tấm pin là một lời hứa với sức khỏe cộng đồng.",
    excerptEn: "When the lights never go out in the clinic — every solar panel is a promise to community health.",
    excerptEs: "Cuando las luces nunca se apagan en la clínica — cada panel solar es una promesa para la salud comunitaria.",
    contentVi: `<p>Ở vùng nông thôn Pinar del Río, trạm y tế nhỏ phục vụ hơn 800 gia đình. Mỗi lần mất điện, tủ lạnh bảo quản vaccine ngừng hoạt động, ánh sáng phòng khám tắt, và bác sĩ phải khám bằng đèn pin. Đó không chỉ là bất tiện — đó là nguy hiểm.</p>
<p>TBSolaro, thông qua chương trình CSR với Tập đoàn Thái Bình, đã mang hệ thống năng lượng mặt trời đến trạm y tế này. Kể từ ngày hệ thống hoạt động, tủ lạnh vaccine chạy liên tục, đèn phòng khám sáng suốt đêm, và bác sĩ trực đêm không còn phải chạy tìm nến.</p>
<p>Bác sĩ Maria — người phụ trách trạm — nói: "Trước đây, tôi sợ nhất đêm apagón khi có bệnh nhân cấp cứu. Giờ thì tôi biết rằng dù cả vùng mất điện, phòng khám vẫn sáng. Điều đó thay đổi tất cả."</p>
<p>Với TBSolaro, năng lượng mặt trời không chỉ là ánh sáng — mà là sự sống.</p>`,
    contentEn: `<p>In rural Pinar del Río, a small health clinic serves over 800 families. Every blackout means the vaccine refrigerator stops, the clinic lights go dark, and the doctor examines patients by flashlight. That's not just inconvenience — that's danger.</p>
<p>TBSolaro, through the Thai Binh Group's CSR program, brought a solar power system to this clinic. Since the system went live, the vaccine refrigerator runs continuously, clinic lights stay on through the night, and the night-shift doctor no longer has to search for candles.</p>
<p>Doctor Maria — who runs the clinic — said: "Before, I dreaded blackout nights when emergency patients came in. Now I know that even when the whole area loses power, the clinic stays lit. That changes everything."</p>
<p>With TBSolaro, solar energy is not just light — it is life.</p>`,
    contentEs: `<p>En el campo de Pinar del Río, una pequeña clínica de salud atiende a más de 800 familias. Cada apagón significa que el refrigerador de vacunas se detiene, las luces de la clínica se apagan, y el médico atiende a los pacientes con una linterna. Eso no es solo inconveniencia — es peligro.</p>
<p>TBSolaro, a través del programa de RSC del Grupo Thai Binh, llevó un sistema de energía solar a esta clínica. Desde que el sistema comenzó a funcionar, el refrigerador de vacunas opera continuamente, las luces de la clínica permanecen encendidas toda la noche, y el médico de guardia ya no tiene que buscar velas.</p>
<p>La doctora María — quien dirige la clínica — dijo: "Antes, temía las noches de apagón cuando llegaban pacientes de emergencia. Ahora sé que aunque toda la zona se quede sin electricidad, la clínica permanece iluminada. Eso lo cambia todo."</p>
<p>Con TBSolaro, la energía solar no es solo luz — es vida.</p>`,
    imagePrompt: "Documentary photograph of a small rural health clinic in Pinar del Rio, Cuba at dusk. A simple white-painted building with solar panels on the roof, warm light glowing from the clinic windows while the surrounding neighborhood is dark. A female Cuban doctor in white coat stands at the entrance. Tropical vegetation, humble rural setting. Warm, hopeful atmosphere, golden hour light, photojournalistic style. No text or logos.",
    galleryPrompts: [
      "Interior photograph of a simple rural clinic in Cuba at night, well-lit with electric lights. A vaccine refrigerator with a green operating light. Clean, basic medical equipment. Warm, comforting atmosphere. Documentary style. No text.",
    ],
  },
  {
    slug: "community-center-trinidad-cuba",
    category: "csr",
    sortOrder: 9,
    location: "Trinidad, Cuba",
    power: "10 kWp",
    installationDate: "2024-08-25",
    year: "2024",
    titleVi: "Trung tâm cộng đồng – Trinidad, Cuba",
    titleEn: "Community Center – Trinidad, Cuba",
    titleEs: "Centro Comunitario – Trinidad, Cuba",
    excerptVi: "Nơi trẻ em học bài, người lớn họp mặt, và cả cộng đồng cùng chia sẻ ánh sáng từ mặt trời.",
    excerptEn: "Where children study, adults gather, and the whole community shares the light of the sun.",
    excerptEs: "Donde los niños estudian, los adultos se reúnen, y toda la comunidad comparte la luz del sol.",
    contentVi: `<p>Trinidad — thành phố di sản UNESCO với những con phố lát đá cổ kính — ẩn chứa một thách thức hiện đại: thiếu điện. Trung tâm cộng đồng khu phố, nơi trẻ em đến học bài buổi tối và người cao tuổi tụ họp cuối tuần, thường xuyên chìm trong bóng tối mỗi khi apagón.</p>
<p>TBSolaro đã mang năng lượng mặt trời đến trung tâm này như một phần cam kết CSR của Tập đoàn Thái Bình tại Cuba. Hệ thống được thiết kế hài hòa với kiến trúc thuộc địa, tôn trọng vẻ đẹp lịch sử của Trinidad.</p>
<p>Giờ đây, mỗi tối trẻ em vẫn ngồi học dưới ánh đèn ổn định. Các buổi họp cộng đồng không còn bị gián đoạn. Phòng đọc sách — nơi yêu thích của các em nhỏ — luôn sáng đèn và mát mẻ nhờ quạt trần chạy bằng năng lượng mặt trời.</p>
<p>Một cụ bà trong khu phố nói: "TBSolaro không chỉ cho chúng tôi điện. Họ cho chúng tôi lại những buổi tối cùng nhau." Đó chính là giá trị mà TBSolaro theo đuổi — năng lượng kết nối con người.</p>`,
    contentEn: `<p>Trinidad — the UNESCO heritage city with cobblestone streets — harbors a modern challenge: power shortages. The neighborhood community center, where children come to study in the evenings and elders gather on weekends, was often plunged into darkness during blackouts.</p>
<p>TBSolaro brought solar energy to this center as part of Thai Binh Group's CSR commitment in Cuba. The system was designed to harmonize with the colonial architecture, respecting Trinidad's historic beauty.</p>
<p>Now, every evening children still sit studying under stable lighting. Community meetings are no longer interrupted. The reading room — the children's favorite spot — stays bright and cool thanks to ceiling fans powered by solar energy.</p>
<p>An elderly woman in the neighborhood said: "TBSolaro didn't just give us electricity. They gave us back our evenings together." That is exactly the value TBSolaro pursues — energy that connects people.</p>`,
    contentEs: `<p>Trinidad — la ciudad patrimonio de la UNESCO con calles empedradas — esconde un desafío moderno: la escasez de electricidad. El centro comunitario del barrio, donde los niños vienen a estudiar por las noches y los mayores se reúnen los fines de semana, quedaba a menudo sumido en la oscuridad durante los apagones.</p>
<p>TBSolaro llevó energía solar a este centro como parte del compromiso de RSC del Grupo Thai Binh en Cuba. El sistema fue diseñado para armonizar con la arquitectura colonial, respetando la belleza histórica de Trinidad.</p>
<p>Ahora, cada noche los niños siguen estudiando bajo una iluminación estable. Las reuniones comunitarias ya no se interrumpen. La sala de lectura — el lugar favorito de los niños — permanece iluminada y fresca gracias a los ventiladores de techo alimentados por energía solar.</p>
<p>Una señora mayor del barrio dijo: "TBSolaro no solo nos dio electricidad. Nos devolvió las noches juntos." Ese es exactamente el valor que TBSolaro persigue — energía que conecta a las personas.</p>`,
    imagePrompt: "Warm documentary photograph of a colonial-style community center in Trinidad, Cuba in the evening. Children sitting at wooden tables studying under warm electric light inside, visible through open windows. Solar panels on the terracotta tile roof. Cobblestone street outside, colorful colonial facades. A few adults chatting near the entrance. Warm golden interior light contrasting with blue dusk outside. Photojournalistic, authentic, hopeful. No text or logos.",
    galleryPrompts: [
      "Photograph of Cuban children studying together at a wooden table inside a community reading room. Warm lighting, bookshelves in background, ceiling fan spinning. Simple but clean interior. Documentary style, authentic. No text.",
    ],
  },

  // ─── Community ───
  {
    slug: "farming-cooperative-dak-lak",
    category: "community",
    sortOrder: 10,
    location: "Đắk Lắk, Việt Nam",
    power: "15 kWp",
    installationDate: "2024-02-28",
    year: "2024",
    titleVi: "Hợp tác xã nông nghiệp – Đắk Lắk",
    titleEn: "Agricultural Cooperative – Dak Lak",
    titleEs: "Cooperativa Agrícola – Dak Lak",
    excerptVi: "Năng lượng mặt trời giúp nông dân Tây Nguyên chủ động nguồn điện cho hệ thống tưới tiêu và sơ chế cà phê.",
    excerptEn: "Solar energy empowers Central Highlands farmers with reliable power for irrigation and coffee processing.",
    excerptEs: "La energía solar empodera a los agricultores de las Tierras Altas Centrales con energía confiable para riego y procesamiento de café.",
    contentVi: `<p>Tây Nguyên — vùng đất đỏ bazan màu mỡ, quê hương của những rẫy cà phê bạt ngàn. Nhưng điện lưới ở nhiều vùng sâu còn chập chờn, ảnh hưởng trực tiếp đến khả năng tưới tiêu và sơ chế nông sản. Hợp tác xã Ea H'leo đã tìm đến TBSolaro với một nhu cầu rất thực tế: cần nguồn điện ổn định để vận hành máy bơm nước và máy sấy cà phê.</p>
<p>TBSolaro đã lắp đặt hệ thống năng lượng mặt trời kết hợp pin lưu trữ, đảm bảo hợp tác xã có điện ổn định suốt mùa thu hoạch — dù lưới điện có gián đoạn. Kết quả: năng suất sơ chế tăng, chất lượng cà phê đồng đều hơn, và chi phí vận hành giảm đáng kể.</p>
<p>Anh Ksor — chủ nhiệm hợp tác xã — chia sẻ: "Trước đây mất điện là mất mùa. Giờ thì nắng Tây Nguyên không chỉ nuôi cà phê mà còn nuôi cả máy sấy." Anh cười, chỉ tay lên mái nhà kho lấp lánh dưới nắng: "Mặt trời làm việc cùng nông dân."</p>
<p>TBSolaro tin rằng năng lượng sạch phải đến được nơi cần nhất — và thường đó là những nơi xa nhất.</p>`,
    contentEn: `<p>The Central Highlands — a land of rich red basalt soil, home to vast coffee plantations. But the power grid in many remote areas remains unreliable, directly affecting irrigation and crop processing capabilities. Ea H'leo Cooperative approached TBSolaro with a very practical need: stable power to run water pumps and coffee dryers.</p>
<p>TBSolaro installed a solar power system with battery storage, ensuring the cooperative has stable electricity throughout harvest season — even when the grid is interrupted. The result: processing capacity increased, coffee quality became more consistent, and operating costs dropped significantly.</p>
<p>Ksor — the cooperative chairman — shared: "Before, losing power meant losing the harvest. Now, the Highland sunshine doesn't just feed the coffee — it feeds the dryers too." He smiled, pointing at the warehouse roof gleaming under the sun: "The sun works alongside the farmers."</p>
<p>TBSolaro believes clean energy must reach where it is needed most — and that is often the farthest places.</p>`,
    contentEs: `<p>Las Tierras Altas Centrales — una tierra de rico suelo rojo basáltico, hogar de vastas plantaciones de café. Pero la red eléctrica en muchas zonas remotas sigue siendo poco confiable, afectando directamente las capacidades de riego y procesamiento de cultivos. La Cooperativa Ea H'leo se acercó a TBSolaro con una necesidad muy práctica: energía estable para bombas de agua y secadoras de café.</p>
<p>TBSolaro instaló un sistema de energía solar con almacenamiento de baterías, asegurando que la cooperativa tenga electricidad estable durante toda la temporada de cosecha — incluso cuando la red se interrumpe. El resultado: la capacidad de procesamiento aumentó, la calidad del café se volvió más consistente, y los costos operativos disminuyeron significativamente.</p>
<p>Ksor — el presidente de la cooperativa — compartió: "Antes, perder la electricidad significaba perder la cosecha. Ahora, el sol de las Tierras Altas no solo alimenta el café — también alimenta las secadoras." Sonrió, señalando el techo del almacén brillando bajo el sol: "El sol trabaja junto a los agricultores."</p>
<p>TBSolaro cree que la energía limpia debe llegar donde más se necesita — y eso es a menudo los lugares más lejanos.</p>`,
    imagePrompt: "Documentary photograph of a Vietnamese agricultural cooperative in the Central Highlands (Dak Lak). A large warehouse building with solar panels on the metal roof, surrounded by coffee plantations on red basalt soil. A Vietnamese farmer in work clothes and a sun hat standing proudly in front of the building. Bright sunny day, green hills in background. Authentic, warm, realistic photography. No text or logos.",
    galleryPrompts: [
      "Photograph of coffee beans drying on a large concrete patio in front of a warehouse with solar panels on the roof. Vietnamese highlands landscape with rolling green hills. Bright sunshine, documentary style. No text.",
    ],
  },
];

// ---------- Helpers ----------

async function generateImage(prompt) {
  console.log("    calling OpenAI gpt-image-1…");
  const res = await fetch("https://api.openai.com/v1/images/generations", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${OPENAI_API_KEY}`,
    },
    body: JSON.stringify({
      model: "gpt-image-1",
      prompt,
      size: "1536x1024",
      n: 1,
    }),
  });
  if (!res.ok) {
    const t = await res.text();
    throw new Error(`OpenAI image error ${res.status}: ${t}`);
  }
  const json = await res.json();
  const item = json.data?.[0];
  if (item?.b64_json) return Buffer.from(item.b64_json, "base64");
  if (item?.url) {
    const r = await fetch(item.url);
    return Buffer.from(await r.arrayBuffer());
  }
  throw new Error("No image returned");
}

async function uploadToBlob(buffer, name) {
  const filename = `projects/${name}-${Date.now()}.png`;
  const result = await put(filename, buffer, {
    access: "public",
    contentType: "image/png",
    token: BLOB_TOKEN,
    addRandomSuffix: false,
  });
  return result.url;
}

// ---------- Main ----------

async function main() {
  console.log(`\nSeeding ${projects.length} projects with AI-generated images…\n`);

  for (const p of projects) {
    console.log(`→ ${p.slug}`);

    const existing = await prisma.project.findUnique({ where: { slug: p.slug } });
    if (existing) {
      console.log("  already exists, skipping");
      continue;
    }

    // Generate featured image
    console.log("  generating featured image…");
    const featuredBuffer = await generateImage(p.imagePrompt);
    const featuredUrl = await uploadToBlob(featuredBuffer, p.slug);
    console.log(`  → featured: ${featuredUrl}`);

    // Generate gallery images
    const galleryUrls = [featuredUrl];
    for (let i = 0; i < p.galleryPrompts.length; i++) {
      console.log(`  generating gallery image ${i + 1}…`);
      const buf = await generateImage(p.galleryPrompts[i]);
      const url = await uploadToBlob(buf, `${p.slug}-gallery-${i + 1}`);
      galleryUrls.push(url);
      console.log(`  → gallery: ${url}`);
    }

    // Insert into DB
    console.log("  inserting into DB…");
    await prisma.project.create({
      data: {
        slug: p.slug,
        status: "published",
        category: p.category,
        sortOrder: p.sortOrder,
        location: p.location,
        power: p.power,
        installationDate: p.installationDate,
        year: p.year,
        featuredImage: featuredUrl,
        seoOgImage: featuredUrl,
        gallery: JSON.stringify(galleryUrls),
        relatedSlugs: "[]",
        titleVi: p.titleVi,
        titleEn: p.titleEn,
        titleEs: p.titleEs,
        excerptVi: p.excerptVi,
        excerptEn: p.excerptEn,
        excerptEs: p.excerptEs,
        contentVi: p.contentVi,
        contentEn: p.contentEn,
        contentEs: p.contentEs,
      },
    });
    console.log("  ✓ done\n");
  }

  console.log("🎉 All projects seeded!");
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
