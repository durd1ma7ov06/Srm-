import goshtImg from '../assets/categories/gosht.jpg';
import ichimliklarImg from '../assets/categories/ichimliklar.png';

export const categories = [
  { id: 1, name: 'Sabzavotlar', slug: 'sabzavotlar', size: 'lg', desc: 'Yangi va tabiiy', image: 'https://images.unsplash.com/photo-1566385101042-1a0aa0c1268c?auto=format&fit=crop&w=800&q=80' },
  { id: 2, name: 'Mevalar', slug: 'mevalar', size: 'wide', desc: 'Sersuv va shirin', image: 'https://images.unsplash.com/photo-1610832958506-aa56368176cf?auto=format&fit=crop&w=800&q=80' },
  { id: 3, name: 'Go\'sht', slug: 'gosht', size: 'wide', desc: 'Fermer mahsuloti', image: goshtImg },
  { id: 4, name: 'Sut mahsulotlari', slug: 'sut-mahsulotlari', size: 'sm', desc: 'Har kuni yangi', image: 'https://images.unsplash.com/photo-1628088062854-d1870b4553da?auto=format&fit=crop&w=600&q=80' },
  { id: 5, name: 'Pishiriqlar', slug: 'pishiriqlar', size: 'sm', desc: 'Issiq va mazali', image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=600&q=80' },
  { id: 6, name: 'Baqqollik', slug: 'baqqollik', size: 'sm', desc: 'Kundalik ehtiyoj', image: 'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?auto=format&fit=crop&w=600&q=80' },
  { id: 7, name: 'Ichimliklar', slug: 'ichimliklar', size: 'sm', desc: 'Salqin va tetik', image: ichimliklarImg },
];

const img = (id) => `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=500&q=80`;

// Barcha mahsulotlar — yagona manba
export const products = [
  // ---------- Sabzavotlar ----------
  { id: 1, name: 'Yangi Pomidorlar', category: 'Sabzavotlar', unit: '1 kg', price: '15 000', discount: 25, deal: true, image: img('1592924357228-91a4daadcfea') },
  { id: 2, name: 'Yangi Bodring', category: 'Sabzavotlar', unit: '1 kg', price: '12 000', discount: 18, deal: true, image: '/bodring.png' },
  { id: 3, name: 'Sabzi', category: 'Sabzavotlar', unit: '1 kg', price: '7 000', image: img('1598170845058-32b9d6a5da37') },
  { id: 4, name: 'Kartoshka', category: 'Sabzavotlar', unit: '1 kg', price: '6 500', image: img('1518977676601-b53f82aba655') },
  { id: 5, name: 'Piyoz', category: 'Sabzavotlar', unit: '1 kg', price: '5 500', image: img('1518977956812-cd3dbadaaf31') },
  { id: 6, name: 'Bulg\'or qalampiri', category: 'Sabzavotlar', unit: '1 kg', price: '18 000', discount: 10, image: img('1563565375-f3fdfdbefa83') },
  { id: 7, name: 'Karam', category: 'Sabzavotlar', unit: '1 dona', price: '8 000', image: img('1594282486552-05b4d80fbb9f') },
  { id: 8, name: 'Sarimsoq', category: 'Sabzavotlar', unit: '0.5 kg', price: '22 000', top: true, image: img('1540148426945-6cf22a6b2383') },

  // ---------- Mevalar ----------
  { id: 9, name: 'Organik Bananlar', category: 'Mevalar', unit: '1 kg', price: '22 000', discount: 20, deal: true, image: img('1603833665858-e61d17a86224') },
  { id: 10, name: 'Yangi Qulupnay', category: 'Mevalar', unit: '0.5 kg', price: '40 000', discount: 15, top: true, image: img('1464965911861-746a04b4bca6') },
  { id: 11, name: 'Hass Avokadosi', category: 'Mevalar', unit: '0.5 kg', price: '35 000', discount: 5, top: true, image: img('1523049673857-eb18f1d7b578') },
  { id: 12, name: 'Qizil Olma', category: 'Mevalar', unit: '1 kg', price: '16 000', image: img('1568702846914-96b305d2aaeb') },
  { id: 13, name: 'Uzum', category: 'Mevalar', unit: '1 kg', price: '28 000', discount: 10, deal: true, image: '/uzum.png' },
  { id: 14, name: 'Apelsin', category: 'Mevalar', unit: '1 kg', price: '19 000', discount: 12, image: img('1547514701-42782101795e') },
  { id: 15, name: 'Mango', category: 'Mevalar', unit: '1 kg', price: '45 000', discount: 8, top: true, image: img('1605027990121-cbae9e0642df') },
  { id: 16, name: 'Anor', category: 'Mevalar', unit: '1 kg', price: '30 000', image: img('1601004890684-d8cbf643f5f2') },

  // ---------- Go'sht ----------
  { id: 17, name: 'Fermer Mol Go\'shti', category: 'Go\'sht', unit: '1 kg', price: '85 000', discount: 15, deal: true, image: goshtImg },
  { id: 18, name: 'Qo\'y Go\'shti', category: 'Go\'sht', unit: '1 kg', price: '95 000', image: img('1551028150-64b9f398f678') },
  { id: 19, name: 'Tovuq Go\'shti', category: 'Go\'sht', unit: '1 kg', price: '38 000', discount: 10, deal: true, image: img('1604503468506-a8da13d82791') },
  { id: 20, name: 'Tovuq Filesi', category: 'Go\'sht', unit: '1 kg', price: '52 000', top: true, image: '/tovuq_filesi.png' },
  { id: 21, name: 'Mol Qiyma', category: 'Go\'sht', unit: '1 kg', price: '60 000', image: img('1602470521006-aeeb1d4f5a3a') },
  { id: 22, name: 'Losos Baliq', category: 'Go\'sht', unit: '1 kg', price: '110 000', discount: 7, top: true, image: img('1519708227418-c8fd9a32b7a2') },

  // ---------- Sut mahsulotlari ----------
  { id: 23, name: 'Cheddar Pishlog\'i', category: 'Sut mahsulotlari', unit: '0.3 kg', price: '45 000', discount: 10, top: true, image: img('1486297678162-eb2a19b0a32d') },
  { id: 24, name: 'Tabiiy Sut', category: 'Sut mahsulotlari', unit: '1 l', price: '9 000', image: img('1563636619-e9143da7973b') },
  { id: 25, name: 'Qatiq', category: 'Sut mahsulotlari', unit: '0.5 l', price: '8 000', image: img('1571212515416-fef01fc43637') },
  { id: 26, name: 'Smetana', category: 'Sut mahsulotlari', unit: '0.4 kg', price: '15 000', discount: 5, deal: true, image: img('1631452180519-c014fe946bc7') },
  { id: 27, name: 'Tvorog', category: 'Sut mahsulotlari', unit: '0.5 kg', price: '22 000', image: img('1488477181946-6428a0291777') },
  { id: 28, name: 'Sariyog\'', category: 'Sut mahsulotlari', unit: '0.2 kg', price: '28 000', top: true, image: img('1589985270826-4b7bb135bc9d') },

  // ---------- Pishiriqlar ----------
  { id: 29, name: 'Yangi Yopilgan Non', category: 'Pishiriqlar', unit: '1 dona', price: '8 000', discount: 10, deal: true, image: img('1509440159596-0249088772ff') },
  { id: 30, name: 'Bulochka', category: 'Pishiriqlar', unit: '1 dona', price: '5 000', image: img('1555507036-ab1f4038808a') },
  { id: 31, name: 'Kruassan', category: 'Pishiriqlar', unit: '1 dona', price: '12 000', discount: 8, top: true, image: img('1555507036-ab1f4038808a') },
  { id: 32, name: 'Tort', category: 'Pishiriqlar', unit: '1 kg', price: '85 000', top: true, image: img('1578985545062-69928b1d9587') },
  { id: 33, name: 'Pechenye', category: 'Pishiriqlar', unit: '0.4 kg', price: '18 000', image: img('1499636136210-6f4ee915583e') },
  { id: 34, name: 'Somsa', category: 'Pishiriqlar', unit: '1 dona', price: '6 000', discount: 12, deal: true, image: img('1601050690597-df0568f70950') },

  // ---------- Baqqollik ----------
  { id: 35, name: 'Zaytun Yog\'i Extra Virgin', category: 'Baqqollik', unit: '1 l', price: '120 000', discount: 5, top: true, image: img('1474979266404-7eaacbcd87c5') },
  { id: 36, name: 'Tabiiy Asal', category: 'Baqqollik', unit: '0.7 kg', price: '65 000', discount: 8, top: true, image: img('1587049352851-8d4e89133924') },
  { id: 37, name: 'Guruch', category: 'Baqqollik', unit: '1 kg', price: '18 000', image: img('1586201375761-83865001e31c') },
  { id: 38, name: 'Makaron', category: 'Baqqollik', unit: '0.5 kg', price: '9 000', image: img('1551462147-ff29053bfc14') },
  { id: 39, name: 'Shakar', category: 'Baqqollik', unit: '1 kg', price: '11 000', image: img('1581600140682-d4e68c8cde32') },
  { id: 40, name: 'Un', category: 'Baqqollik', unit: '1 kg', price: '8 000', discount: 10, deal: true, image: img('1627485937980-221c88ac04f9') },
  { id: 41, name: 'Choy', category: 'Baqqollik', unit: '0.2 kg', price: '25 000', image: img('1564890369478-c89ca6d9cde9') },
  { id: 42, name: 'Kofe', category: 'Baqqollik', unit: '0.25 kg', price: '75 000', discount: 10, top: true, image: img('1559056199-641a0ac8b55e') },

  // ---------- Ichimliklar ----------
  { id: 43, name: 'Mineral Suv', category: 'Ichimliklar', unit: '1.5 l', price: '5 000', image: img('1560023907-5f339617ea30') },
  { id: 44, name: 'Apelsin Sharbati', category: 'Ichimliklar', unit: '1 l', price: '18 000', discount: 10, deal: true, image: img('1600271886742-f049cd451bba') },
  { id: 45, name: 'Olma Sharbati', category: 'Ichimliklar', unit: '1 l', price: '16 000', image: img('1576673442511-7e39b6545c87') },
  { id: 46, name: 'Limonad', category: 'Ichimliklar', unit: '0.5 l', price: '12 000', image: img('1437418747212-8d9709afab22') },
  { id: 47, name: 'Smuzi', category: 'Ichimliklar', unit: '0.4 l', price: '22 000', discount: 5, top: true, image: img('1505252585461-04db1eb84625') },
  { id: 48, name: 'Ko\'k Choy (sovuq)', category: 'Ichimliklar', unit: '0.5 l', price: '10 000', image: ichimliklarImg },
];

// Filtrlash / qidirish uchun
export const allProducts = products;

// Bosh sahifa bo'limlari (toza ko'rinish uchun cheklangan)
export const flashDeals = products.filter((p) => p.deal).slice(0, 10);
export const topRatedProducts = products.filter((p) => p.top).slice(0, 10);

// Yordamchilar
export const getCategoryBySlug = (slug) =>
  categories.find((category) => category.slug === slug);

export const getProductsByCategory = (categoryName) =>
  products.filter((product) => product.category === categoryName);

export const getCategoryCount = (categoryName) =>
  products.reduce(
    (total, product) => (product.category === categoryName ? total + 1 : total),
    0
  );

// ID bo'yicha mahsulotni topish
export const getProductById = (id) =>
  products.find((product) => product.id === Number(id));

// O'xshash mahsulotlar (bir xil kategoriya, o'zidan tashqari)
export const getRelatedProducts = (product, limit = 5) =>
  products
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, limit);

// Mahsulot uchun statik mock statistika (id asosida barqaror)
export const getProductStats = (id) => {
  const n = Number(id) || 1;
  return {
    weeklyBuyers: 40 + ((n * 17) % 210),
    stock: 8 + ((n * 13) % 80),
    rating: (4.3 + ((n * 7) % 7) / 10).toFixed(1),
    reviewCount: 12 + ((n * 5) % 40),
  };
};

// Mahsulot uchun mock tavsif
export const getProductDescription = (product) =>
  `${product.name} — eng sara "${product.category}" toifasidagi mahsulot. Tabiiy, yangi va qat'iy sifat nazoratidan o'tgan. Nihol do'koni sizga har doim ishonchli, foydali va arzon mahsulotlarni yetkazib berishga intiladi.`;

// Mock sharhlar (barcha mahsulotlar uchun namuna)
export const reviews = [
  { id: 1, name: 'Dilnoza Karimova', rating: 5, date: '2 kun oldin', text: "Mahsulot sifati a'lo darajada, juda yangi holatda yetkazib berishdi. Albatta yana buyurtma qilaman!" },
  { id: 2, name: 'Sardor Aliyev', rating: 4, date: '5 kun oldin', text: "Narxi hamyonbop, sifati yaxshi. Yetkazib berish ham ancha tez bo'ldi, rahmat." },
  { id: 3, name: 'Madina Yusupova', rating: 5, date: '1 hafta oldin', text: "Oilam uchun doimiy shu yerdan buyurtma beraman. Mahsulotlar doim yangi. Rahmat Nihol!" },
  { id: 4, name: 'Jasur Rahimov', rating: 4, date: '2 hafta oldin', text: "Yaxshi mahsulot, lekin qadoqlashni biroz yaxshilasa bo'lardi. Umuman olganda mamnunman." },
];

export const brands = [
  { id: 1, name: 'Fermer 1', logo: 'https://ui-avatars.com/api/?name=F+1&background=random' },
  { id: 2, name: 'GreenLife', logo: 'https://ui-avatars.com/api/?name=GL&background=random' },
  { id: 3, name: 'EcoFood', logo: 'https://ui-avatars.com/api/?name=EF&background=random' },
  { id: 4, name: 'FreshMeat', logo: 'https://ui-avatars.com/api/?name=FM&background=random' },
  { id: 5, name: 'DairyKing', logo: 'https://ui-avatars.com/api/?name=DK&background=random' },
  { id: 6, name: 'BakerHouse', logo: 'https://ui-avatars.com/api/?name=BH&background=random' },
];

export const blogPosts = [
  { id: 1, title: "Bozordan yangi sabzavotlarni tanlash sirlari", excerpt: "Mavsumiy sabzavotlarni qanday qilib to'g'ri tanlashni bilib oling...", image: "https://images.unsplash.com/photo-1488459716781-31db52582fe9?auto=format&fit=crop&w=400&q=80" },
  { id: 2, title: "Fermer mahsulotlarining sog'liq uchun foydasi", excerpt: "Nima uchun mahalliy fermer xo'jaliklariga afzallik berish kerak...", image: "https://images.unsplash.com/photo-1500937386664-56d1dfef3854?auto=format&fit=crop&w=400&q=80" },
  { id: 3, title: "Retsept: 5 daqiqada mukammal yozgi salat", excerpt: "Yangi pomidor va bodringdan tayyorlangan juda mazzali salat retsepti bilan bo'lishamiz...", image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=400&q=80" }
];

export const bottomBrands = [
  { id: 1, logo: 'https://ui-avatars.com/api/?name=B1&background=random' },
  { id: 2, logo: 'https://ui-avatars.com/api/?name=B2&background=random' },
  { id: 3, logo: 'https://ui-avatars.com/api/?name=B3&background=random' },
  { id: 4, logo: 'https://ui-avatars.com/api/?name=B4&background=random' },
];
