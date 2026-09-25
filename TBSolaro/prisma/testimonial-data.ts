/**
 * Testimonial content for TBSolaro, in Vietnamese / English / Spanish.
 *
 * Written for the actual buyer groups in Cuba and their social reality:
 * long blackouts (apagones), keeping food and medicine cold, casa particular
 * tourism, private MIPYME businesses, cooperative farming, schools and
 * family clinics. Names are generic placeholders for the admin to replace
 * with real customers over time (Admin › Đánh giá KH).
 *
 * Imported by prisma/seed.ts (fresh databases only — count-guarded).
 */

export type TestimonialSeed = {
  name: string;
  roleVi: string; roleEn: string; roleEs: string;
  contentVi: string; contentEn: string; contentEs: string;
  avatar: string;
  rating: number;
  sortOrder: number;
  status: string;
};

export const TESTIMONIAL_SEED: TestimonialSeed[] = [
  {
    name: 'Marisol García',
    roleVi: 'Chủ hộ gia đình, La Habana',
    roleEn: 'Homeowner, Havana',
    roleEs: 'Ama de casa, La Habana',
    contentVi: 'Trước đây mỗi đợt cúp điện kéo dài, cả nhà mất ngủ và thức ăn trong tủ lạnh hỏng hết. Từ khi lắp combo TBSolaro có pin lưu trữ, các con tôi học bài buổi tối bình thường và tôi không còn lo giữ thuốc men, thực phẩm.',
    contentEn: 'Every long blackout used to cost us our sleep and everything in the fridge. Since installing the TBSolaro combo with battery storage, my children do their homework at night as usual and I no longer worry about keeping food and medicine safe.',
    contentEs: 'Cada apagón largo nos costaba el sueño y todo lo que había en el refrigerador. Desde que instalamos el combo TBSolaro con batería, mis hijos hacen sus tareas de noche con normalidad y ya no me preocupo por conservar la comida y las medicinas.',
    avatar: '', rating: 5, sortOrder: 1, status: 'published',
  },
  {
    name: 'Yasmany Rodríguez',
    roleVi: 'Chủ casa particular, Trinidad',
    roleEn: 'Casa particular host, Trinidad',
    roleEs: 'Anfitrión de casa particular, Trinidad',
    contentVi: 'Khách du lịch rời đi ngay khi mất điện, kéo theo cả những đánh giá tốt. Với hệ hybrid của TBSolaro, quạt, đèn và WiFi chạy suốt đêm bất kể lưới điện thế nào — khách hài lòng và lượng đặt phòng tăng rõ rệt.',
    contentEn: 'Tourists used to leave the moment the power went out — and my good reviews went with them. With TBSolaro\'s hybrid system the fans, lights and WiFi run all night no matter what the grid does. Guests are happy and my bookings have clearly grown.',
    contentEs: 'Los turistas se iban en cuanto se cortaba la luz, y con ellos mis buenas reseñas. Con el sistema híbrido de TBSolaro, los ventiladores, las luces y el WiFi funcionan toda la noche sin importar la red. Los huéspedes están contentos y mis reservas han crecido claramente.',
    avatar: '', rating: 5, sortOrder: 2, status: 'published',
  },
  {
    name: 'Caridad Díaz',
    roleVi: 'Chủ quán ăn tư nhân (MIPYME), La Habana',
    roleEn: 'Private cafeteria owner (MIPYME), Havana',
    roleEs: 'Dueña de cafetería privada (MIPYME), La Habana',
    contentVi: 'Với một doanh nghiệp nhỏ, mỗi lần cúp điện là một lần đổ bỏ nguyên liệu. Hệ thống TBSolaro giữ tủ đông chạy liên tục, quán mở cửa cả những ngày cả khu phố tối đèn — khoản đầu tư đáng giá nhất từ khi tôi mở quán.',
    contentEn: 'For a small business, every blackout meant throwing ingredients away. The TBSolaro system keeps the freezers running non-stop and the cafeteria open even on days the whole neighbourhood goes dark — the best investment since I opened.',
    contentEs: 'Para un negocio pequeño, cada apagón significaba botar ingredientes. El sistema TBSolaro mantiene los congeladores funcionando sin parar y la cafetería abierta incluso los días en que todo el barrio queda a oscuras: la mejor inversión desde que abrí.',
    avatar: '', rating: 5, sortOrder: 3, status: 'published',
  },
  {
    name: 'Osmany Fernández',
    roleVi: 'Nông dân hợp tác xã, Artemisa',
    roleEn: 'Cooperative farmer, Artemisa',
    roleEs: 'Campesino de cooperativa, Artemisa',
    contentVi: 'Bơm tưới của chúng tôi từng phụ thuộc hoàn toàn vào dầu diesel ngày càng khan hiếm. Nhờ hệ thống điện mặt trời TBSolaro, ruộng được tưới đều mỗi sáng và sữa được làm lạnh ngay tại trại — chi phí giảm mà năng suất tăng.',
    contentEn: 'Our irrigation pumps used to depend entirely on diesel that gets scarcer every season. With TBSolaro\'s solar system the fields are watered every morning and the milk is chilled right at the farm — costs are down and yields are up.',
    contentEs: 'Nuestras bombas de riego dependían totalmente de un diésel cada vez más escaso. Con el sistema solar de TBSolaro, los campos se riegan cada mañana y la leche se enfría en la propia finca: bajaron los costos y subió el rendimiento.',
    avatar: '', rating: 5, sortOrder: 4, status: 'published',
  },
  {
    name: 'Yolanda Pérez',
    roleVi: 'Hiệu trưởng trường tiểu học, La Habana',
    roleEn: 'Elementary school principal, Havana',
    roleEs: 'Directora de escuela primaria, La Habana',
    contentVi: 'Từ khi TBSolaro lắp hệ thống điện mặt trời cho trường, lớp học không còn gián đoạn vì mất điện. Quạt chạy trong những ngày nóng, và lần đầu tiên các em được học tin học đều đặn. Cả khu phố nhìn mái trường như một niềm tự hào.',
    contentEn: 'Since TBSolaro installed solar power at our school, classes are never interrupted by outages. The fans run through the hot days, and for the first time the children have regular computer lessons. The whole neighbourhood looks at our roof with pride.',
    contentEs: 'Desde que TBSolaro instaló la energía solar en nuestra escuela, las clases ya no se interrumpen por los apagones. Los ventiladores funcionan en los días de calor y, por primera vez, los niños tienen clases de computación con regularidad. Todo el barrio mira nuestro techo con orgullo.',
    avatar: '', rating: 5, sortOrder: 5, status: 'published',
  },
  {
    name: 'Reinaldo Morales',
    roleVi: 'Bác sĩ gia đình, Mariel',
    roleEn: 'Family doctor, Mariel',
    roleEs: 'Médico de familia, Mariel',
    contentVi: 'Vắc-xin và thuốc phải được giữ lạnh 24/7 — điều gần như bất khả thi với lưới điện chập chờn. Hệ thống pin lưu trữ của TBSolaro cho phòng khám của tôi sự yên tâm đó, và bà con quanh đây không còn phải đi xa để được chăm sóc.',
    contentEn: 'Vaccines and medicines must stay cold 24/7 — nearly impossible on an unstable grid. TBSolaro\'s battery system gives my clinic that peace of mind, and people here no longer have to travel far for care.',
    contentEs: 'Las vacunas y los medicamentos deben mantenerse fríos las 24 horas, algo casi imposible con una red inestable. El sistema de baterías de TBSolaro le da a mi consultorio esa tranquilidad, y la gente de aquí ya no tiene que viajar lejos para atenderse.',
    avatar: '', rating: 5, sortOrder: 6, status: 'published',
  },
];
