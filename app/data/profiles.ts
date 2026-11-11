export interface Profile {
  id: number;
  name: string;
  type: 'architect' | 'builder' | 'developer' | 'supplier';
  city: string;
  country: string;
  rating: number;
  reviews: number;
  specialization: string;
  price: string;
  image: string;
  verified: boolean;
  phone: string;
  email: string;
  experience: string;
  completedProjects: number;
  about: string;
  portfolio: string[];
  reviewsList: { author: string; text: string; rating: number; date: string }[];
}

export const profiles: Profile[] = [
  {
    id: 1,
    name: 'Айбек Жумабеков',
    type: 'architect',
    city: 'Бишкек',
    country: 'Кыргызстан',
    rating: 4.9,
    reviews: 47,
    specialization: 'Жилые дома, интерьеры',
    price: 'от $15/м²',
    image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400',
    verified: true,
    phone: '+996 555 123 456',
    email: 'aybek@example.com',
    experience: '8 лет',
    completedProjects: 34,
    about: 'Профессиональный архитектор с опытом проектирования жилых домов и коммерческих объектов. Специализируюсь на современных решениях с учетом климата Центральной Азии. Работаю как с частными заказчиками, так и с застройщиками.',
    portfolio: [
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800',
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800',
      'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=800',
    ],
    reviewsList: [
      { author: 'Марат К.', text: 'Отличный специалист! Сделал проект дома за 2 месяца. Всё продумано до мелочей.', rating: 5, date: '2 месяца назад' },
      { author: 'Айнура С.', text: 'Профессиональный подход, учёл все наши пожелания. Рекомендую!', rating: 5, date: '4 месяца назад' },
    ],
  },
  {
    id: 2,
    name: 'СтройМастер KZ',
    type: 'builder',
    city: 'Алматы',
    country: 'Казахстан',
    rating: 4.8,
    reviews: 123,
    specialization: 'Дома под ключ',
    price: 'от $250/м²',
    image: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=400',
    verified: true,
    phone: '+7 701 234 5678',
    email: 'info@stroymaster.kz',
    experience: '12 лет',
    completedProjects: 89,
    about: 'Крупная строительная компания, специализирующаяся на строительстве домов под ключ. Полный цикл работ от фундамента до отделки. Собственная техника и квалифицированные бригады.',
    portfolio: [
      'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=800',
      'https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=800',
      'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=800',
    ],
    reviewsList: [
      { author: 'Дмитрий В.', text: 'Построили дом за 6 месяцев. Качество отличное, сроки соблюдены.', rating: 5, date: '1 месяц назад' },
      { author: 'Елена П.', text: 'Хорошая компания, но были небольшие задержки. В целом довольны.', rating: 4, date: '3 месяца назад' },
    ],
  },
  {
    id: 3,
    name: 'Dizayn Studio Arna',
    type: 'architect',
    city: 'Ташкент',
    country: 'Узбекистан',
    rating: 5.0,
    reviews: 28,
    specialization: 'Коммерческая недвижимость',
    price: 'от $25/м²',
    image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=400',
    verified: true,
    phone: '+998 90 123 4567',
    email: 'hello@arna.uz',
    experience: '6 лет',
    completedProjects: 21,
    about: 'Дизайн-студия, создающая уникальные интерьеры и экстерьеры для коммерческих объектов. Работаем с ресторанами, офисами и торговыми центрами.',
    portfolio: [
      'https://images.unsplash.com/photo-1497366216548-37526070297c?w=800',
      'https://images.unsplash.com/photo-1600607687644-c7171b42498f?w=800',
    ],
    reviewsList: [
      { author: 'Сардор М.', text: 'Сделали дизайн офиса. Всё супер, клиенты в восторге!', rating: 5, date: '2 месяца назад' },
    ],
  },
  {
    id: 4,
    name: 'Кирпичный Двор',
    type: 'supplier',
    city: 'Бишкек',
    country: 'Кыргызстан',
    rating: 4.7,
    reviews: 89,
    specialization: 'Кирпич, блоки, цемент',
    price: 'Доставка по КР',
    image: 'https://images.unsplash.com/photo-1590725140246-20acdee442be?w=400',
    verified: false,
    phone: '+996 700 987 654',
    email: 'sales@kirpich.kg',
    experience: '15 лет',
    completedProjects: 500,
    about: 'Крупнейший поставщик строительных материалов в Кыргызстане. Прямые поставки с заводов. Оптовые и розничные продажи.',
    portfolio: [],
    reviewsList: [
      { author: 'Бакыт Т.', text: 'Хорошие цены, быстрая доставка. Рекомендую!', rating: 5, date: '1 неделю назад' },
    ],
  },
  {
    id: 5,
    name: 'НурланBuild',
    type: 'builder',
    city: 'Астана',
    country: 'Казахстан',
    rating: 4.6,
    reviews: 56,
    specialization: 'Фундаменты, коробки',
    price: 'от $180/м²',
    image: 'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=400',
    verified: true,
    phone: '+7 707 345 6789',
    email: 'nurlan@build.kz',
    experience: '10 лет',
    completedProjects: 67,
    about: 'Специализация на фундаментных работах и возведении коробок домов. Быстрые сроки, гарантия качества.',
    portfolio: [
      'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=800',
    ],
    reviewsList: [
      { author: 'Алексей К.', text: 'Сделали фундамент качественно. Без нареканий.', rating: 5, date: '3 месяца назад' },
    ],
  },
  {
    id: 6,
    name: 'EcoHome Developers',
    type: 'developer',
    city: 'Ташкент',
    country: 'Узбекистан',
    rating: 4.9,
    reviews: 201,
    specialization: 'Жилые комплексы',
    price: 'от $800/м²',
    image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=400',
    verified: true,
    phone: '+998 71 234 5678',
    email: 'info@ecohome.uz',
    experience: '20 лет',
    completedProjects: 15,
    about: 'Девелоперская компания, строящая современные жилые комплексы с экологичными технологиями.',
    portfolio: [
      'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800',
      'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800',
    ],
    reviewsList: [
      { author: 'Нодира А.', text: 'Купили квартиру в их комплексе. Всё отлично!', rating: 5, date: '1 месяц назад' },
    ],
  },
  {
    id: 7,
    name: 'Архитектурное Бюро "Стиль"',
    type: 'architect',
    city: 'Алматы',
    country: 'Казахстан',
    rating: 4.8,
    reviews: 64,
    specialization: 'Современные виллы',
    price: 'от $20/м²',
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=400',
    verified: true,
    phone: '+7 702 456 7890',
    email: 'info@style.kz',
    experience: '10 лет',
    completedProjects: 42,
    about: 'Проектируем современные виллы и загородные дома. Индивидуальный подход к каждому клиенту.',
    portfolio: [
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800',
      'https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=800',
    ],
    reviewsList: [
      { author: 'Иван С.', text: 'Спроектировали дом мечты. Очень довольны!', rating: 5, date: '2 месяца назад' },
    ],
  },
  {
    id: 8,
    name: 'СтройГарант',
    type: 'builder',
    city: 'Бишкек',
    country: 'Кыргызстан',
    rating: 4.5,
    reviews: 78,
    specialization: 'Ремонт и отделка',
    price: 'от $120/м²',
    image: 'https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=400',
    verified: true,
    phone: '+996 700 111 222',
    email: 'info@stroygarant.kg',
    experience: '7 лет',
    completedProjects: 95,
    about: 'Ремонт квартир и домов под ключ. Качественные материалы, опытные мастера.',
    portfolio: [
      'https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=800',
    ],
    reviewsList: [
      { author: 'Ольга М.', text: 'Сделали ремонт в квартире. Всё хорошо, но сроки немного затянули.', rating: 4, date: '1 месяц назад' },
    ],
  },
  {
    id: 9,
    name: 'ЦементПром',
    type: 'supplier',
    city: 'Астана',
    country: 'Казахстан',
    rating: 4.6,
    reviews: 145,
    specialization: 'Цемент, бетон',
    price: 'Доставка по КЗ',
    image: 'https://images.unsplash.com/photo-1565793298595-6a879b1d9492?w=400',
    verified: true,
    phone: '+7 705 555 6666',
    email: 'sales@cementprom.kz',
    experience: '18 лет',
    completedProjects: 1000,
    about: 'Производство и поставка цемента и бетона. Прямые цены от производителя.',
    portfolio: [],
    reviewsList: [
      { author: 'Сергей В.', text: 'Надёжный поставщик. Работаем уже 3 года.', rating: 5, date: '2 недели назад' },
    ],
  },
  {
    id: 10,
    name: 'Urban Developers',
    type: 'developer',
    city: 'Алматы',
    country: 'Казахстан',
    rating: 4.7,
    reviews: 89,
    specialization: 'Бизнес-класс',
    price: 'от $1200/м²',
    image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=400',
    verified: true,
    phone: '+7 701 777 8888',
    email: 'info@urban.kz',
    experience: '15 лет',
    completedProjects: 8,
    about: 'Строим жилые комплексы бизнес-класса в Алматы. Современные технологии, премиальные материалы.',
    portfolio: [
      'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800',
    ],
    reviewsList: [
      { author: 'Анна К.', text: 'Отличный комплекс, всё на высшем уровне.', rating: 5, date: '3 месяца назад' },
    ],
  },
];

export const cities = [
  { city: 'Бишкек', country: 'Кыргызстан' },
  { city: 'Ош', country: 'Кыргызстан' },
  { city: 'Алматы', country: 'Казахстан' },
  { city: 'Астана', country: 'Казахстан' },
  { city: 'Шымкент', country: 'Казахстан' },
  { city: 'Ташкент', country: 'Узбекистан' },
  { city: 'Самарканд', country: 'Узбекистан' },
  { city: 'Бухара', country: 'Узбекистан' },
];

export const specializations = {
  architect: ['Частные дома', 'Архитектурное проектирование', 'Дизайн интерьера', 'Коммерческие здания', 'Ландшафтная архитектура'],
  builder: ['Строительство дома под ключ', 'Фундамент', 'Кровля', 'Ремонт', 'Внутренняя отделка', 'Коммерческое строительство'],
  developer: ['Жилые комплексы', 'Бизнес-класс', 'Коммерческая недвижимость'],
  supplier: ['Кирпич', 'Цемент', 'Арматура', 'Дерево', 'Плитка', 'Металлопрокат'],
};