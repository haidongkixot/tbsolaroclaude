// One-off script: seed 5 brand-voice news posts (vi/en/es) with OpenAI-generated
// images uploaded to Vercel Blob, then insert into the BlogPost table.
//
// Usage (PowerShell / bash):
//   DATABASE_URL=... BLOB_READ_WRITE_TOKEN=... OPENAI_API_KEY=... \
//     node scripts/seed-blog-content.mjs
//
// Brand voice references TBSolaro_Brand_Story_Guide_VN_v2 — warm, empowering,
// "Mái nhà bạn. Năng lượng bạn." Each post is one of the 10 story scripts.

import { PrismaClient } from "@prisma/client";
import { put } from "@vercel/blob";

const prisma = new PrismaClient();

const OPENAI_API_KEY = process.env.OPENAI_API_KEY;
const BLOB_TOKEN = process.env.BLOB_READ_WRITE_TOKEN;
if (!OPENAI_API_KEY) throw new Error("Missing OPENAI_API_KEY");
if (!BLOB_TOKEN) throw new Error("Missing BLOB_READ_WRITE_TOKEN");

// ---------- Content (5 posts, 3 languages each) ----------
// Story bank #1, #4, #5, #3 (Carlos), #9 — covers B2C / community / B2B / brand proof.

const posts = [
  {
    slug: "sinh-nhat-khong-tat-den-havana",
    tags: ["Câu chuyện gia đình", "B2C", "Havana"],
    publishedAt: new Date("2026-03-22T09:00:00Z"),
    titleVi: "Sinh nhật không tắt đèn — đêm cả phố tối, nhà Rosa vẫn sáng",
    titleEn: "A birthday that didn't go dark — when the block lost power, Rosa's house stayed lit",
    titleEs: "Un cumpleaños que no se apagó — cuando todo el barrio se quedó a oscuras, la casa de Rosa siguió encendida",
    excerptVi:
      "Tám giờ tối, đèn cả khu Vedado tắt. Bên trong nhà chị Rosa, bảy ngọn nến trên chiếc bánh kem vẫn chờ — dưới ánh sáng vàng ấm từ mái nhà của chính họ.",
    excerptEn:
      "At eight in the evening the whole Vedado block went dark. Inside Rosa's home, seven candles on a birthday cake were still waiting — under the warm yellow light of her own rooftop.",
    excerptEs:
      "A las ocho de la noche todo el barrio del Vedado se quedó sin luz. Dentro de la casa de Rosa, siete velitas sobre la torta seguían esperando — bajo la luz cálida de su propio techo.",
    contentVi:
      "Chị Rosa thuộc lòng lịch cắt điện khu mình. Thứ Hai thường mất điện từ hai giờ chiều. Thứ Năm hay tắt buổi tối. Nhưng tối nay là sinh nhật bảy tuổi của con trai — và lần đầu tiên trong đời, chị không cần lo lắng nữa.\n\nKhi cả phố Vedado chìm vào bóng tối, ngọn đèn vàng ấm trong nhà chị vẫn sáng — không phải nến, không phải đèn pin, mà là ánh sáng từ chính mái nhà chị. Tấm pin TBSolaro lắp tuần trước đã làm việc lặng lẽ suốt cả ngày, gom nắng Havana vào pin lưu trữ, để đến giờ này — đúng giờ thổi nến — căn nhà vẫn ấm áp như một lời hứa được giữ.\n\nCon trai chị reo lên trước khi thổi nến: 'Mamá, nhà mình có mặt trời riêng!' Bảy ngọn nến tắt cùng lúc. Bảy tiếng vỗ tay vang lên trong căn phòng vẫn sáng đèn. Bên ngoài cửa sổ, cô María hàng xóm đứng nhìn sang — và nhớ kỹ tên TBSolaro để hôm sau gọi.\n\nĐây không phải câu chuyện về công nghệ. Đây là câu chuyện về một khoảnh khắc không bị cắt ngang.",
    contentEn:
      "Rosa knows her neighborhood's blackout schedule by heart. Mondays usually go dark at two in the afternoon. Thursdays often cut out in the evening. But tonight is her son's seventh birthday — and for the first time in her life, she doesn't have to worry.\n\nWhen the whole Vedado block falls into darkness, the warm yellow light inside her house keeps glowing — not candles, not a flashlight, but light from her own roof. The TBSolaro panels installed last week have been working quietly all day, gathering Havana sunshine into a storage battery, so that right at this moment — exactly when it is time to blow out the candles — the house remains as warm as a promise kept.\n\nHer son cheers before he blows: 'Mamá, our house has its own sun!' Seven candles go out at once. Seven claps echo through a room that is still lit. Outside the window, María from next door stands watching — and quietly memorizes the name TBSolaro to call the next morning.\n\nThis is not a story about technology. This is a story about a moment that was not interrupted.",
    contentEs:
      "Rosa se sabe de memoria el horario de apagones de su barrio. Los lunes suelen cortar a las dos de la tarde. Los jueves muchas veces cae la luz en la noche. Pero esta noche es el séptimo cumpleaños de su hijo — y por primera vez en su vida, no tiene que preocuparse.\n\nCuando toda la cuadra del Vedado queda en tinieblas, la luz amarilla y cálida dentro de su casa sigue encendida — no son velas, no es una linterna, es luz de su propio techo. Las placas TBSolaro instaladas la semana pasada han trabajado en silencio todo el día, guardando el sol de La Habana en una batería de respaldo, para que justo en este instante — exactamente a la hora de soplar las velitas — la casa se sienta cálida como una promesa cumplida.\n\nSu hijo grita antes de soplar: '¡Mamá, nuestra casa tiene su propio sol!' Siete velitas se apagan a la vez. Siete aplausos resuenan en una habitación que sigue iluminada. Afuera, doña María, la vecina, mira por la ventana — y se aprende el nombre TBSolaro para llamar al día siguiente.\n\nEsta no es una historia sobre tecnología. Es la historia de un momento que no fue interrumpido.",
    seoTitleVi: "Sinh nhật không tắt đèn — Câu chuyện TBSolaro tại Havana",
    seoTitleEn: "A Birthday That Didn't Go Dark — A TBSolaro Story from Havana",
    seoTitleEs: "Un cumpleaños que no se apagó — Una historia TBSolaro desde La Habana",
    seoDescVi:
      "Khi cả phố Vedado mất điện, mái nhà chị Rosa vẫn sáng nhờ TBSolaro. Câu chuyện về một khoảnh khắc không bị cắt ngang.",
    seoDescEn:
      "When the whole Vedado block lost power, Rosa's rooftop kept her family's birthday glowing — thanks to TBSolaro.",
    seoDescEs:
      "Cuando toda la cuadra del Vedado se quedó sin luz, el techo de Rosa mantuvo encendido el cumpleaños de su familia — gracias a TBSolaro.",
    imagePrompt:
      "Cinematic photograph, warm golden hour interior light. A modest Cuban family living room in Havana at night. A seven-year-old boy is about to blow out birthday candles on a small cake; his mother stands beside him smiling. Through the window behind them, the entire neighborhood block of Vedado is pitch black — only this single house glows with warm yellow light. Subtle hint of solar panels visible on the roof outside. Documentary photojournalism style, soft amber tones, intimate, hopeful, no text or logos.",
  },
  {
    slug: "hieu-ung-hang-xom-maria-truyen-tin",
    tags: ["Truyền miệng", "Cộng đồng", "Vedado"],
    publishedAt: new Date("2026-03-25T09:00:00Z"),
    titleVi: "Hiệu ứng hàng xóm — cô María nhìn sang, rồi cả con phố cùng sáng",
    titleEn: "The neighbor effect — María looked across the street, and a whole block lit up",
    titleEs: "El efecto vecino — María miró al otro lado de la calle, y toda la cuadra se iluminó",
    excerptVi:
      "Cô María sáu mươi hai tuổi, sống đối diện nhà chị Rosa. Trong một đêm apagón, cô đứng ngoài hiên nhìn sang — và bắt đầu một làn sóng lan tỏa.",
    excerptEn:
      "María, sixty-two, lives across from Rosa. One blackout night she stood on her porch looking over — and started a quiet wave that would spread down the entire street.",
    excerptEs:
      "Doña María, sesenta y dos años, vive frente a Rosa. Una noche de apagón se quedó mirando desde su portal — y así empezó una ola silenciosa que recorrió toda la calle.",
    contentVi:
      "Đêm apagón đầu tiên sau khi nhà Rosa lắp solar, cô María đứng ngoài hiên. Cả khu phố tối đen — chỉ một ngôi nhà sáng. Cô không cần ai giải thích. Cô đã thấy.\n\nHôm sau cô gõ cửa hỏi. Tuần sau cô gọi TBSolaro. Tháng sau, mái nhà cô cũng có nắng riêng. Tháng tiếp theo, hai nhà nữa trên cùng con phố. Sáu tháng sau, đoạn đường từ ngã tư đến tiệm bánh có sáu mái nhà sáng đèn mỗi đêm apagón.\n\nỞ Cuba, một lắp đặt hoạt động hoàn hảo có giá trị hơn trăm tấm biển quảng cáo. Người Cuba tin hàng xóm hơn tin brochure — và đó chính là điều TBSolaro tôn trọng. Chúng tôi không vội kể câu chuyện của mình. Chúng tôi để khoảnh khắc kể.",
    contentEn:
      "On the first blackout night after Rosa's solar was switched on, María stood on her porch. The whole block was pitch dark — only one house glowed. She didn't need anyone to explain. She had already seen it.\n\nThe next morning she knocked on Rosa's door. The next week she called TBSolaro. The next month her own roof had its own sun. The month after, two more houses joined on the same street. Six months later, the stretch from the corner to the bakery had six rooftops still glowing on every blackout night.\n\nIn Cuba, one installation that simply works is worth more than a hundred billboards. Cubans trust their neighbors more than they trust a brochure — and that is exactly what TBSolaro respects. We don't rush to tell our own story. We let the moment tell it.",
    contentEs:
      "La primera noche de apagón después de que se encendió el sistema solar de Rosa, doña María salió al portal. Toda la cuadra estaba a oscuras — solo una casa brillaba. No necesitaba que nadie le explicara nada. Ya lo había visto.\n\nA la mañana siguiente tocó la puerta de Rosa. La semana siguiente llamó a TBSolaro. Al mes siguiente su propio techo tenía su propio sol. Al otro mes, dos casas más se sumaron en la misma calle. Seis meses después, el tramo entre la esquina y la panadería tenía seis techos encendidos cada noche de apagón.\n\nEn Cuba, una instalación que sencillamente funciona vale más que cien vallas publicitarias. Los cubanos confían más en sus vecinos que en un folleto — y eso es exactamente lo que TBSolaro respeta. No tenemos prisa por contar nuestra propia historia. Dejamos que la cuente el momento.",
    seoTitleVi: "Hiệu ứng hàng xóm — TBSolaro lan tỏa trên một con phố Havana",
    seoTitleEn: "The Neighbor Effect — How TBSolaro Lit Up an Entire Havana Street",
    seoTitleEs: "El efecto vecino — Cómo TBSolaro iluminó toda una calle de La Habana",
    seoDescVi:
      "Một mái nhà sáng đêm apagón đầu tiên — sáu tháng sau, cả con phố cùng sáng. Câu chuyện truyền miệng của TBSolaro.",
    seoDescEn:
      "One glowing roof on the first blackout night — six months later the whole street lit up. The TBSolaro word-of-mouth story.",
    seoDescEs:
      "Un techo encendido en la primera noche de apagón — seis meses después toda la calle se iluminó. La historia del boca a boca de TBSolaro.",
    imagePrompt:
      "Cinematic aerial photograph at night of a residential street in Havana, Cuba, during a blackout. Most of the block is in deep darkness, but six rooftops along the street are softly glowing with warm amber interior light spilling out the windows. Old colonial architecture, palm trees, faded pastel facades just visible in the dim moonlight. Documentary, hopeful, calm. No text, no logos.",
  },
  {
    slug: "benh-vien-khong-bao-gio-tat-camaguey",
    tags: ["Y tế", "B2B", "Tác động xã hội"],
    publishedAt: new Date("2026-03-28T09:00:00Z"),
    titleVi: "Bệnh viện không bao giờ tắt — Bác sĩ Elena không còn đếm giây nữa",
    titleEn: "The hospital that never goes dark — Dr. Elena no longer counts the seconds",
    titleEs: "El hospital que nunca se apaga — La doctora Elena ya no cuenta los segundos",
    excerptVi:
      "Bác sĩ Elena phụ trách phòng phẫu thuật một bệnh viện tỉnh Camagüey. Bà từng đếm từng giây giữa lúc đèn tắt và máy phát nổ. Giờ thì không còn nữa.",
    excerptEn:
      "Dr. Elena runs the surgical ward of a provincial hospital in Camagüey. She used to count every second between the lights cutting out and the diesel generator kicking in. Not anymore.",
    excerptEs:
      "La doctora Elena dirige el quirófano de un hospital provincial en Camagüey. Antes contaba cada segundo entre que se iba la luz y arrancaba la planta diésel. Ya no.",
    contentVi:
      "Bác sĩ Elena nhớ rõ cảm giác đó. Đang khâu vết mổ — đèn tắt — vài giây tối — máy phát nổ — đèn lại sáng. Mỗi lần như vậy là một lần tim đập nhanh hơn. Ba mươi năm hành nghề, bà đã trải qua hàng trăm khoảnh khắc như thế.\n\nTừ ngày bệnh viện tỉnh Camagüey lắp hệ thống TBSolaro với pin lưu trữ chuyên dụng cho phòng mổ và phòng hồi sức, bà nói: 'Tôi không còn đếm giây nữa. Tôi chỉ tập trung cứu người.'\n\nHệ thống không thay máy phát diesel — nó đứng giữa, lặng lẽ, để khi lưới điện cắt thì không có vài giây tối nào hết. Đèn vẫn sáng. Máy thở vẫn chạy. Máy theo dõi tim vẫn kêu đều. Ca mổ vẫn tiếp tục — như thể chuyện tắt điện không liên quan gì đến công việc của bà.\n\nĐó là điều TBSolaro tin: ánh sáng không phải tiện ích. Trong một phòng mổ, ánh sáng là sự sống.",
    contentEn:
      "Dr. Elena remembers the feeling clearly. In the middle of suturing — the lights die — a few seconds of darkness — the generator kicks in — the lights come back. Each time, her heart races a little. In thirty years of practice she has lived through hundreds of those moments.\n\nSince the provincial hospital in Camagüey installed a TBSolaro system with a dedicated battery bank for the operating theatre and the ICU, she says: 'I don't count seconds anymore. I just focus on saving the patient.'\n\nThe system doesn't replace the diesel generator — it stands quietly in between, so that when the grid drops there are no dark seconds at all. The lights stay on. The ventilator keeps breathing. The cardiac monitor keeps beeping. The surgery simply continues — as if the blackout outside has nothing to do with the work happening inside.\n\nThis is what TBSolaro believes: light is not a utility. In an operating room, light is life.",
    contentEs:
      "La doctora Elena recuerda muy bien esa sensación. En medio de una sutura — se apaga la luz — unos segundos de oscuridad — arranca la planta — vuelve la luz. Cada vez, el corazón se le acelera un poco. En treinta años de carrera ha vivido cientos de esos momentos.\n\nDesde que el hospital provincial de Camagüey instaló un sistema TBSolaro con un banco de baterías dedicado al quirófano y a la sala de cuidados intensivos, ella dice: 'Ya no cuento los segundos. Solo me concentro en salvar al paciente.'\n\nEl sistema no reemplaza la planta diésel — se queda en silencio en el medio, para que cuando se cae la red no haya ni un segundo de oscuridad. La luz sigue encendida. El ventilador sigue respirando. El monitor cardíaco sigue sonando. La operación simplemente continúa — como si el apagón de afuera no tuviera nada que ver con lo que pasa adentro.\n\nEso es lo que TBSolaro cree: la luz no es un servicio más. En un quirófano, la luz es vida.",
    seoTitleVi: "Bệnh viện không bao giờ tắt — TBSolaro đồng hành phòng mổ Camagüey",
    seoTitleEn: "The Hospital That Never Goes Dark — TBSolaro at a Camagüey Surgery Ward",
    seoTitleEs: "El hospital que nunca se apaga — TBSolaro en un quirófano de Camagüey",
    seoDescVi:
      "Hệ thống TBSolaro giữ phòng mổ bệnh viện tỉnh Camagüey luôn sáng — không còn vài giây tối giữa ca phẫu thuật.",
    seoDescEn:
      "A TBSolaro system keeps a Camagüey provincial hospital surgery ward lit — no more dark seconds in the middle of an operation.",
    seoDescEs:
      "Un sistema TBSolaro mantiene encendido el quirófano de un hospital provincial de Camagüey — sin segundos de oscuridad en medio de una cirugía.",
    imagePrompt:
      "Documentary photograph inside a calm, well-lit surgical operating room in a Cuban provincial hospital. A focused female surgeon in scrubs and a mask works under steady warm-toned overhead lights. Heart monitor and ventilator visible, all running. Through a small window in the background, the rest of the hospital corridor is dim, hinting at a wider blackout outside. Realistic, calm, hopeful, dignified — no text or logos.",
  },
  {
    slug: "quan-kem-carlos-khong-bao-gio-tan",
    tags: ["MIPYME", "Doanh nghiệp nhỏ", "Obispo"],
    publishedAt: new Date("2026-04-01T09:00:00Z"),
    titleVi: "Quán kem Carlos không bao giờ tan — câu chuyện một MIPYME trên phố Obispo",
    titleEn: "Carlos's ice-cream shop that never melts — a MIPYME story from Obispo Street",
    titleEs: "La heladería de Carlos que nunca se derrite — la historia de un MIPYME en la calle Obispo",
    excerptVi:
      "Carlos mở quán kem nhỏ trên đường Obispo. Mỗi lần mất điện trước đây là mỗi lần đổ kem. Giờ tủ đông chạy suốt — vì mái nhà anh lúc nào cũng nắng.",
    excerptEn:
      "Carlos runs a small ice-cream shop on Obispo Street. Every blackout used to mean throwing out gallons of melted product. Now his freezers run all day — because his roof is always sunny.",
    excerptEs:
      "Carlos tiene una pequeña heladería en la calle Obispo. Antes, cada apagón significaba botar litros de helado derretido. Ahora sus congeladores funcionan todo el día — porque su techo siempre tiene sol.",
    contentVi:
      "Trước khi có TBSolaro, Carlos đếm thiệt hại bằng lít. Mười lít kem dâu hôm thứ Ba. Hai mươi lít kem chocolate hôm thứ Năm. Cả tuần làm việc gói gọn trong một buổi chiều mất điện kéo dài bốn tiếng — và một thùng rác đầy kem tan.\n\nAnh thử mọi cách. Máy phát diesel ồn, tốn xăng, và xăng thì lúc có lúc không. Đá khô đắt và khó tìm. Mỗi lần khách bước vào quán giữa apagón, anh phải xin lỗi: 'Hôm nay không bán được, anh chị ạ.'\n\nGiờ thì khác. Hệ thống TBSolaro với pin lưu trữ phù hợp cho MIPYME giữ hai tủ đông và máy làm kem chạy suốt — kể cả khi cả khu phố Obispo tối đen. Một khách quen nói: 'Kem Carlos lúc nào cũng lạnh.' Carlos cười: 'Vì mái nhà tôi lúc nào cũng nắng.'\n\nĐối với một MIPYME, ổn định không phải là tiện nghi — đó là khác biệt giữa mở cửa và đóng cửa. TBSolaro hiểu điều đó, vì chúng tôi cũng bắt đầu từ những cánh cửa nhỏ.",
    contentEn:
      "Before TBSolaro, Carlos measured his losses in liters. Ten liters of strawberry on Tuesday. Twenty liters of chocolate on Thursday. A whole week of work melting away in a single four-hour blackout — and a trash bin full of ice cream.\n\nHe tried everything. Diesel generators were loud, thirsty, and gasoline came and went. Dry ice was expensive and hard to find. Every time a customer walked in during a blackout he had to apologize: 'Sorry, we can't sell today.'\n\nIt is different now. A TBSolaro system with a battery pack sized for a MIPYME keeps both freezers and the ice-cream churner running — even when the whole Obispo block is pitch dark. A regular customer says: 'Carlos's ice cream is always cold.' Carlos smiles: 'Because my roof is always sunny.'\n\nFor a small business, stability isn't a luxury — it is the difference between staying open and closing the doors. TBSolaro understands that, because we started behind small doors too.",
    contentEs:
      "Antes de TBSolaro, Carlos medía sus pérdidas en litros. Diez litros de fresa el martes. Veinte litros de chocolate el jueves. Una semana entera de trabajo derritiéndose en un solo apagón de cuatro horas — y un cubo de basura lleno de helado.\n\nLo intentó todo. Las plantas diésel son ruidosas, tragan combustible, y la gasolina va y viene. El hielo seco es caro y difícil de encontrar. Cada vez que un cliente entraba durante un apagón tenía que disculparse: 'Hoy no podemos vender, mi hermano.'\n\nAhora es distinto. Un sistema TBSolaro con un banco de baterías a la medida de un MIPYME mantiene los dos congeladores y la heladera funcionando — incluso cuando toda la cuadra de Obispo está a oscuras. Un cliente habitual dice: 'El helado de Carlos siempre está frío.' Carlos sonríe: 'Porque mi techo siempre tiene sol.'\n\nPara un pequeño negocio, la estabilidad no es un lujo — es la diferencia entre seguir abierto y cerrar la puerta. TBSolaro lo entiende, porque nosotros también empezamos detrás de puertas pequeñas.",
    seoTitleVi: "Quán kem Carlos không bao giờ tan — TBSolaro cho MIPYME Cuba",
    seoTitleEn: "Carlos's Ice-Cream Shop That Never Melts — TBSolaro for Cuban MIPYMES",
    seoTitleEs: "La heladería de Carlos que nunca se derrite — TBSolaro para los MIPYMES cubanos",
    seoDescVi:
      "Một MIPYME giữ tủ đông luôn lạnh nhờ TBSolaro — câu chuyện ánh sáng cho doanh nghiệp nhỏ trên phố Obispo.",
    seoDescEn:
      "A small MIPYME keeps its freezers cold thanks to TBSolaro — a story of solar power for small business on Obispo Street.",
    seoDescEs:
      "Un MIPYME mantiene sus congeladores fríos gracias a TBSolaro — una historia de energía solar para pequeñas empresas en la calle Obispo.",
    imagePrompt:
      "Documentary photograph of a small charming Cuban ice-cream shop on Obispo Street in Old Havana, late afternoon. A friendly Cuban man in his forties (Carlos) stands behind a small counter with two glass-front freezers full of colorful ice-cream tubs. Outside the open doorway the rest of the street is in shadow during a blackout, but inside the shop the warm light is on and customers are smiling. Vintage tropical atmosphere, pastel colors, no text or logos.",
  },
  {
    slug: "tu-20mw-den-2kw-tbsolaro",
    tags: ["Thương hiệu", "Bằng chứng", "Guajabón"],
    publishedAt: new Date("2026-04-04T09:00:00Z"),
    titleVi: "Từ 20 MW đến 2 kW — chuyên môn công viên solar, giờ ở trên mái nhà bạn",
    titleEn: "From 20 MW to 2 kW — utility-scale know-how, now on your rooftop",
    titleEs: "De 20 MW a 2 kW — la experiencia de un parque solar, ahora en tu techo",
    excerptVi:
      "Trước khi đến mái nhà chị Rosa, đội kỹ sư TBSolaro đã dựng nên một công viên solar 20 MW ở Guajabón. Cùng một sự tận tâm — chỉ thu nhỏ lại để vừa vặn với gia đình bạn.",
    excerptEn:
      "Before reaching Rosa's rooftop, TBSolaro engineers built a 20 MW solar park in Guajabón. Same devotion — simply scaled down to fit your family.",
    excerptEs:
      "Antes de llegar al techo de Rosa, los ingenieros de TBSolaro levantaron un parque solar de 20 MW en Guajabón. La misma dedicación — solo que ahora reducida para caber en tu familia.",
    contentVi:
      "Năm 2020, đội kỹ sư của Thai Binh Green Power dựng hàng nghìn tấm pin trên cánh đồng Guajabón. Một công viên solar 20 megawatt — đủ điện cho hàng chục nghìn hộ. Suốt sáu năm vận hành, từng số liệu, từng thông số, từng thói quen nắng Cuba đã được học thuộc.\n\nGiờ cùng đội đó leo lên mái nhà chị Rosa, mái nhà anh Carlos, mái bệnh viện bác sĩ Elena. Cùng đôi tay đã siết hàng trăm nghìn con ốc giữa cánh đồng — giờ siết một con ốc cuối cùng trên xà nhà của một gia đình. Cùng sự cẩn trọng. Cùng tiêu chuẩn.\n\nĐó là điều TBSolaro mang theo mà không ai khác có: chuyên môn quy mô tiện ích đã được chứng minh trên đất Cuba. Không phải lý thuyết. Không phải quảng cáo. Là một công viên 20 MW đang chạy mà bạn có thể đến tận nơi, sờ vào tấm pin, gặp người kỹ sư, nghe câu chuyện thật.\n\nVà khi chuyên môn đó được thu nhỏ — cẩn thận, kính trọng — để vừa vặn với một mái nhà gia đình, điều bạn nhận được không chỉ là điện. Đó là ba mươi năm Thái Bình ở Cuba, sáu năm vận hành solar quy mô lớn, và lời hứa rằng bàn tay đặt tấm pin lên nóc nhà bạn cũng chính là bàn tay đã từng đặt tấm pin đầu tiên ở Guajabón.",
    contentEn:
      "In 2020, the engineers of Thai Binh Green Power raised thousands of panels across the fields of Guajabón. A 20 megawatt solar park — enough electricity for tens of thousands of households. Across six years of operation, every data point, every parameter, every habit of Cuban sunshine has been learned by heart.\n\nNow that same team climbs onto Rosa's roof, onto Carlos's roof, onto Dr. Elena's hospital roof. The same hands that tightened hundreds of thousands of bolts in the field now tighten the last bolt on a family rafter. The same care. The same standards.\n\nThis is what TBSolaro carries that no one else can: utility-scale expertise already proven on Cuban soil. Not theory. Not advertising. A real 20 MW park you can drive to, touch a panel, meet the engineer, and hear the true story.\n\nAnd when that expertise is scaled down — carefully, respectfully — to fit a single family roof, what you receive is more than electricity. You receive thirty years of Thai Binh in Cuba, six years of large-scale solar operation, and the promise that the hand placing the panel on your house is the same hand that once placed the very first panel in Guajabón.",
    contentEs:
      "En 2020, los ingenieros de Thai Binh Green Power levantaron miles de paneles en los campos de Guajabón. Un parque solar de 20 megavatios — electricidad suficiente para decenas de miles de hogares. A lo largo de seis años de operación, cada dato, cada parámetro, cada costumbre del sol cubano fue aprendido de memoria.\n\nAhora ese mismo equipo sube al techo de Rosa, al techo de Carlos, al techo del hospital de la doctora Elena. Las mismas manos que apretaron cientos de miles de tornillos en el campo aprietan ahora el último tornillo en la viga de una familia. El mismo cuidado. Los mismos estándares.\n\nEso es lo que TBSolaro trae y nadie más tiene: experiencia a escala industrial ya probada en suelo cubano. No es teoría. No es publicidad. Es un parque real de 20 MW al que puedes ir, tocar un panel, conocer al ingeniero y escuchar la historia verdadera.\n\nY cuando esa experiencia se reduce — con cuidado, con respeto — para caber en el techo de una sola familia, lo que recibes es más que electricidad. Recibes treinta años de Thai Binh en Cuba, seis años operando solar a gran escala, y la promesa de que la mano que coloca el panel sobre tu casa es la misma mano que alguna vez colocó el primer panel en Guajabón.",
    seoTitleVi: "Từ 20 MW đến 2 kW — Câu chuyện chuyên môn TBSolaro tại Cuba",
    seoTitleEn: "From 20 MW to 2 kW — The TBSolaro Expertise Story in Cuba",
    seoTitleEs: "De 20 MW a 2 kW — La historia de la experiencia TBSolaro en Cuba",
    seoDescVi:
      "Từ công viên solar 20 MW Guajabón đến mái nhà 2 kW của bạn — cùng một đội kỹ sư, cùng một sự tận tâm.",
    seoDescEn:
      "From the 20 MW solar park in Guajabón to your 2 kW rooftop — the same engineers, the same devotion.",
    seoDescEs:
      "Del parque solar de 20 MW de Guajabón a tu techo de 2 kW — los mismos ingenieros, la misma dedicación.",
    imagePrompt:
      "Split-feel documentary photograph: in the foreground a Vietnamese-Cuban solar engineer in a TBSolaro-style work shirt and helmet kneels on a residential rooftop in Havana, carefully tightening a bolt on a small solar panel array. In the soft background, a vast utility-scale solar park stretches to the horizon under bright Caribbean sky. Warm, hopeful, dignified, photojournalistic. No text or logos.",
  },
];

// ---------- Helpers ----------

async function generateImage(prompt) {
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

async function uploadToBlob(buffer, slug) {
  const filename = `blog/${slug}-${Date.now()}.png`;
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
  console.log(`Seeding ${posts.length} blog posts…`);

  for (const p of posts) {
    console.log(`\n→ ${p.slug}`);

    const existing = await prisma.blogPost.findUnique({ where: { slug: p.slug } });
    if (existing) {
      console.log("  already exists, skipping");
      continue;
    }

    console.log("  generating image…");
    const buffer = await generateImage(p.imagePrompt);

    console.log("  uploading to Vercel Blob…");
    const imageUrl = await uploadToBlob(buffer, p.slug);
    console.log(`  → ${imageUrl}`);

    console.log("  inserting into DB…");
    await prisma.blogPost.create({
      data: {
        slug: p.slug,
        status: "published",
        publishedAt: p.publishedAt,
        author: "TBSolaro Team",
        featuredImage: imageUrl,
        seoOgImage: imageUrl,
        gallery: "[]",
        tags: JSON.stringify(p.tags),
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
        seoTitleVi: p.seoTitleVi,
        seoTitleEn: p.seoTitleEn,
        seoTitleEs: p.seoTitleEs,
        seoDescVi: p.seoDescVi,
        seoDescEn: p.seoDescEn,
        seoDescEs: p.seoDescEs,
      },
    });
    console.log("  ✓ done");
  }

  console.log("\nAll done.");
  await prisma.$disconnect();
}

main().catch(async (e) => {
  console.error(e);
  await prisma.$disconnect();
  process.exit(1);
});
