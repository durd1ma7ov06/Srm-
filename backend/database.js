import sqlite3 from 'sqlite3';
import path from 'path';
import { fileURLToPath } from 'url';
import bcrypt from 'bcryptjs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const dbPath = path.join(__dirname, 'database.db');
const db = new sqlite3.Database(dbPath);

// Promisified helpers for database operations
export const dbRun = (sql, params = []) => new Promise((resolve, reject) => {
  db.run(sql, params, function(err) {
    if (err) reject(err);
    else resolve(this);
  });
});

export const dbGet = (sql, params = []) => new Promise((resolve, reject) => {
  db.get(sql, params, (err, row) => {
    if (err) reject(err);
    else resolve(row);
  });
});

export const dbAll = (sql, params = []) => new Promise((resolve, reject) => {
  db.all(sql, params, (err, rows) => {
    if (err) reject(err);
    else resolve(rows);
  });
});

// Initialize database schema
export async function initDatabase() {
  // Drop tables if we need to migrate to multi-language (we can check if name_uz exists)
  try {
    const checkColumn = await dbGet("PRAGMA table_info(categories)");
    if (checkColumn && !checkColumn.name) {
      // If it exists, let's see if name_uz is already there
      const cols = await dbAll("PRAGMA table_info(categories)");
      const hasUz = cols.some(c => c.name === 'name_uz');
      if (!hasUz) {
        console.log('Migrating database schema to multilingual...');
        await dbRun('DROP TABLE IF EXISTS order_items');
        await dbRun('DROP TABLE IF EXISTS transactions');
        await dbRun('DROP TABLE IF EXISTS orders');
        await dbRun('DROP TABLE IF EXISTS products');
        await dbRun('DROP TABLE IF EXISTS categories');
      }
    }
  } catch (e) {
    // Table doesn't exist yet
  }

  // Users table
  await dbRun(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      email TEXT UNIQUE NOT NULL,
      phone TEXT,
      password TEXT NOT NULL,
      role TEXT DEFAULT 'user',
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `);

  // Categories table
  await dbRun(`
    CREATE TABLE IF NOT EXISTS categories (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name_uz TEXT NOT NULL,
      name_ru TEXT NOT NULL,
      name_en TEXT NOT NULL,
      slug TEXT UNIQUE NOT NULL,
      image TEXT,
      description_uz TEXT,
      description_ru TEXT,
      description_en TEXT
    )
  `);

  // Products table
  await dbRun(`
    CREATE TABLE IF NOT EXISTS products (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name_uz TEXT NOT NULL,
      name_ru TEXT NOT NULL,
      name_en TEXT NOT NULL,
      category_id INTEGER,
      unit TEXT NOT NULL,
      price INTEGER NOT NULL,
      discount INTEGER DEFAULT 0,
      deal INTEGER DEFAULT 0,
      top INTEGER DEFAULT 0,
      image TEXT,
      stock INTEGER DEFAULT 50,
      description_uz TEXT,
      description_ru TEXT,
      description_en TEXT,
      FOREIGN KEY (category_id) REFERENCES categories (id)
    )
  `);

  // Orders table
  await dbRun(`
    CREATE TABLE IF NOT EXISTS orders (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      user_id INTEGER,
      status TEXT DEFAULT 'pending',
      total_amount INTEGER NOT NULL,
      delivery_fee INTEGER DEFAULT 0,
      address TEXT NOT NULL,
      phone TEXT NOT NULL,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (user_id) REFERENCES users (id)
    )
  `);

  // Order Items table
  await dbRun(`
    CREATE TABLE IF NOT EXISTS order_items (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      order_id INTEGER,
      product_id INTEGER,
      quantity INTEGER NOT NULL,
      price INTEGER NOT NULL,
      FOREIGN KEY (order_id) REFERENCES orders (id),
      FOREIGN KEY (product_id) REFERENCES products (id)
    )
  `);

  // Transactions table
  await dbRun(`
    CREATE TABLE IF NOT EXISTS transactions (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      order_id INTEGER,
      payment_system TEXT NOT NULL,
      payment_id TEXT UNIQUE,
      amount INTEGER NOT NULL,
      state INTEGER NOT NULL,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      perform_at DATETIME,
      cancel_at DATETIME,
      cancel_reason INTEGER,
      FOREIGN KEY (order_id) REFERENCES orders (id)
    )
  `);

  // Seed initial data if categories are empty
  const categoryCount = await dbGet('SELECT count(*) as count FROM categories');
  if (categoryCount.count === 0) {
    console.log('Seeding database with default multilingual categories and products...');

    // Categories
    const categories = [
      { name_uz: 'Sabzavotlar', name_ru: 'Овощи', name_en: 'Vegetables', slug: 'sabzavotlar', image: 'https://images.unsplash.com/photo-1566385101042-1a0aa0c1268c?auto=format&fit=crop&w=800&q=80', desc_uz: 'Yangi va tabiiy', desc_ru: 'Свежие и натуральные', desc_en: 'Fresh and natural' },
      { name_uz: 'Mevalar', name_ru: 'Фрукты', name_en: 'Fruits', slug: 'mevalar', image: 'https://images.unsplash.com/photo-1610832958506-aa56368176cf?auto=format&fit=crop&w=800&q=80', desc_uz: 'Sersuv va shirin', desc_ru: 'Сочные и сладкие', desc_en: 'Juicy and sweet' },
      { name_uz: 'Go\'sht', name_ru: 'Мясо', name_en: 'Meat', slug: 'gosht', image: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=800&q=80', desc_uz: 'Fermer mahsuloti', desc_ru: 'Фермерский продукт', desc_en: 'Farmer product' },
      { name_uz: 'Sut mahsulotlari', name_ru: 'Молочные продукты', name_en: 'Dairy Products', slug: 'sut-mahsulotlari', image: 'https://images.unsplash.com/photo-1628088062854-d1870b4553da?auto=format&fit=crop&w=600&q=80', desc_uz: 'Har kuni yangi', desc_ru: 'Свежие каждый день', desc_en: 'Fresh every day' },
      { name_uz: 'Pishiriqlar', name_ru: 'Выпечка', name_en: 'Bakery', slug: 'pishiriqlar', image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=600&q=80', desc_uz: 'Issiq va mazali', desc_ru: 'Горячая и вкусная', desc_en: 'Hot and delicious' },
      { name_uz: 'Baqqollik', name_ru: 'Бакалея', name_en: 'Grocery', slug: 'baqqollik', image: 'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?auto=format&fit=crop&w=600&q=80', desc_uz: 'Kundalik ehtiyoj', desc_ru: 'Ежедневные потребности', desc_en: 'Daily needs' },
      { name_uz: 'Ichimliklar', name_ru: 'Напитки', name_en: 'Beverages', slug: 'ichimliklar', image: 'https://images.unsplash.com/photo-1505252585461-04db1eb84625?auto=format&fit=crop&w=600&q=80', desc_uz: 'Salqin va tetik', desc_ru: 'Прохладные и освежающие', desc_en: 'Cool and refreshing' },
    ];

    const categoryIdMap = {};
    for (const cat of categories) {
      const res = await dbRun(
        'INSERT INTO categories (name_uz, name_ru, name_en, slug, image, description_uz, description_ru, description_en) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
        [cat.name_uz, cat.name_ru, cat.name_en, cat.slug, cat.image, cat.desc_uz, cat.desc_ru, cat.desc_en]
      );
      categoryIdMap[cat.name_uz] = res.lastID;
    }

    // Products Data
    const img = (id) => `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=500&q=80`;
    const productsData = [
      // ---------- Sabzavotlar ----------
      { name_uz: 'Yangi Pomidorlar', name_ru: 'Свежие Помидоры', name_en: 'Fresh Tomatoes', category: 'Sabzavotlar', unit: '1 kg', price: 15000, discount: 25, deal: 1, image: img('1592924357228-91a4daadcfea') },
      { name_uz: 'Yangi Bodring', name_ru: 'Свежие Огурцы', name_en: 'Fresh Cucumbers', category: 'Sabzavotlar', unit: '1 kg', price: 12000, discount: 18, deal: 1, image: '/bodring.png' },
      { name_uz: 'Sabzi', name_ru: 'Морковь', name_en: 'Carrot', category: 'Sabzavotlar', unit: '1 kg', price: 7000, image: img('1598170845058-32b9d6a5da37') },
      { name_uz: 'Kartoshka', name_ru: 'Картофель', name_en: 'Potato', category: 'Sabzavotlar', unit: '1 kg', price: 6500, image: img('1518977676601-b53f82aba655') },
      { name_uz: 'Piyoz', name_ru: 'Лук', name_en: 'Onion', category: 'Sabzavotlar', unit: '1 kg', price: 5500, image: img('1518977956812-cd3dbadaaf31') },
      { name_uz: 'Bulg\'or qalampiri', name_ru: 'Болгарский перец', name_en: 'Bell Pepper', category: 'Sabzavotlar', unit: '1 kg', price: 18000, discount: 10, image: img('1563565375-f3fdfdbefa83') },
      { name_uz: 'Karam', name_ru: 'Капуста', name_en: 'Cabbage', category: 'Sabzavotlar', unit: '1 dona', price: 8000, image: img('1594282486552-05b4d80fbb9f') },
      { name_uz: 'Sarimsoq', name_ru: 'Чеснок', name_en: 'Garlic', category: 'Sabzavotlar', unit: '0.5 kg', price: 22000, top: 1, image: img('1540148426945-6cf22a6b2383') },

      // ---------- Mevalar ----------
      { name_uz: 'Organik Bananlar', name_ru: 'Органические Бананы', name_en: 'Organic Bananas', category: 'Mevalar', unit: '1 kg', price: 22000, discount: 20, deal: 1, image: img('1603833665858-e61d17a86224') },
      { name_uz: 'Yangi Qulupnay', name_ru: 'Свежая Клубника', name_en: 'Fresh Strawberry', category: 'Mevalar', unit: '0.5 kg', price: 40000, discount: 15, top: 1, image: img('1464965911861-746a04b4bca6') },
      { name_uz: 'Hass Avokadosi', name_ru: 'Авокадо Хасс', name_en: 'Hass Avocado', category: 'Mevalar', unit: '0.5 kg', price: 35000, discount: 5, top: 1, image: img('1523049673857-eb18f1d7b578') },
      { name_uz: 'Qizil Olma', name_ru: 'Красное Яблоко', name_en: 'Red Apple', category: 'Mevalar', unit: '1 kg', price: 16000, image: img('1568702846914-96b305d2aaeb') },
      { name_uz: 'Uzum', name_ru: 'Виноград', name_en: 'Grape', category: 'Mevalar', unit: '1 kg', price: 28000, discount: 10, deal: 1, image: '/uzum.png' },
      { name_uz: 'Apelsin', name_ru: 'Апельсин', name_en: 'Orange', category: 'Mevalar', unit: '1 kg', price: 19000, discount: 12, image: img('1547514701-42782101795e') },
      { name_uz: 'Mango', name_ru: 'Манго', name_en: 'Mango', category: 'Mevalar', unit: '1 kg', price: 45000, discount: 8, top: 1, image: img('1605027990121-cbae9e0642df') },
      { name_uz: 'Anor', name_ru: 'Гранат', name_en: 'Pomegranate', category: 'Mevalar', unit: '1 kg', price: 30000, image: img('1601004890684-d8cbf643f5f2') },

      // ---------- Go'sht ----------
      { name_uz: 'Fermer Mol Go\'shti', name_ru: 'Фермерская Говядина', name_en: 'Farmer Beef', category: 'Go\'sht', unit: '1 kg', price: 85000, discount: 15, deal: 1, image: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=800&q=80' },
      { name_uz: 'Qo\'y Go\'shti', name_ru: 'Баранина', name_en: 'Mutton', category: 'Go\'sht', unit: '1 kg', price: 95000, image: img('1551028150-64b9f398f678') },
      { name_uz: 'Tovuq Go\'shti', name_ru: 'Куриное Мясо', name_en: 'Chicken Meat', category: 'Go\'sht', unit: '1 kg', price: 38000, discount: 10, deal: 1, image: img('1604503468506-a8da13d82791') },
      { name_uz: 'Tovuq Filesi', name_ru: 'Куриное Филе', name_en: 'Chicken Fillet', category: 'Go\'sht', unit: '1 kg', price: 52000, top: 1, image: '/tovuq_filesi.png' },
      { name_uz: 'Mol Qiyma', name_ru: 'Говяжий Фарш', name_en: 'Minced Beef', category: 'Go\'sht', unit: '1 kg', price: 60000, image: img('1602470521006-aeeb1d4f5a3a') },
      { name_uz: 'Losos Baliq', name_ru: 'Филе Лосося', name_en: 'Salmon Fish', category: 'Go\'sht', unit: '1 kg', price: 110000, discount: 7, top: 1, image: img('1519708227418-c8fd9a32b7a2') },

      // ---------- Sut mahsulotlari ----------
      { name_uz: 'Cheddar Pishlog\'i', name_ru: 'Сыр Чеддер', name_en: 'Cheddar Cheese', category: 'Sut mahsulotlari', unit: '0.3 kg', price: 45000, discount: 10, top: 1, image: img('1486297678162-eb2a19b0a32d') },
      { name_uz: 'Tabiiy Sut', name_ru: 'Натуральное Молоко', name_en: 'Natural Milk', category: 'Sut mahsulotlari', unit: '1 l', price: 9000, image: img('1563636619-e9143da7973b') },
      { name_uz: 'Qatiq', name_ru: 'Кефир', name_en: 'Kefir', category: 'Sut mahsulotlari', unit: '0.5 l', price: 8000, image: img('1571212515416-fef01fc43637') },
      { name_uz: 'Smetana', name_ru: 'Сметана', name_en: 'Sour Cream', category: 'Sut mahsulotlari', unit: '0.4 kg', price: 15000, discount: 5, deal: 1, image: img('1631452180519-c014fe946bc7') },
      { name_uz: 'Tvorog', name_ru: 'Творог', name_en: 'Cottage Cheese', category: 'Sut mahsulotlari', unit: '0.5 kg', price: 22000, image: img('1488477181946-6428a0291777') },
      { name_uz: 'Sariyog\'', name_ru: 'Сливочное Масло', name_en: 'Butter', category: 'Sut mahsulotlari', unit: '0.2 kg', price: 28000, top: 1, image: img('1589985270826-4b7bb135bc9d') },

      // ---------- Pishiriqlar ----------
      { name_uz: 'Yangi Yopilgan Non', name_ru: 'Свежий Хлеб', name_en: 'Fresh Bread', category: 'Pishiriqlar', unit: '1 dona', price: 8000, discount: 10, deal: 1, image: img('1509440159596-0249088772ff') },
      { name_uz: 'Bulochka', name_ru: 'Булочка', name_en: 'Bun', category: 'Pishiriqlar', unit: '1 dona', price: 5000, image: img('1555507036-ab1f4038808a') },
      { name_uz: 'Kruassan', name_ru: 'Круассан', name_en: 'Croissant', category: 'Pishiriqlar', unit: '1 dona', price: 12000, discount: 8, top: 1, image: img('1555507036-ab1f4038808a') },
      { name_uz: 'Tort', name_ru: 'Торт', name_en: 'Cake', category: 'Pishiriqlar', unit: '1 kg', price: 85000, top: 1, image: img('1578985545062-69928b1d9587') },
      { name_uz: 'Pechenye', name_ru: 'Печенье', name_en: 'Cookies', category: 'Pishiriqlar', unit: '0.4 kg', price: 18000, image: img('1499636136210-6f4ee915583e') },
      { name_uz: 'Somsa', name_ru: 'Самса', name_en: 'Samsa', category: 'Pishiriqlar', unit: '1 dona', price: 6000, discount: 12, deal: 1, image: img('1601050690597-df0568f70950') },

      // ---------- Baqqollik ----------
      { name_uz: 'Zaytun Yog\'i Extra Virgin', name_ru: 'Оливковое Масло Extra Virgin', name_en: 'Olive Oil Extra Virgin', category: 'Baqqollik', unit: '1 l', price: 120000, discount: 5, top: 1, image: img('1474979266404-7eaacbcd87c5') },
      { name_uz: 'Tabiiy Asal', name_ru: 'Натуральный Мед', name_en: 'Natural Honey', category: 'Baqqollik', unit: '0.7 kg', price: 65000, discount: 8, top: 1, image: img('1587049352851-8d4e89133924') },
      { name_uz: 'Guruch', name_ru: 'Рис', name_en: 'Rice', category: 'Baqqollik', unit: '1 kg', price: 18000, image: img('1586201375761-83865001e31c') },
      { name_uz: 'Makaron', name_ru: 'Макароны', name_en: 'Pasta', category: 'Baqqollik', unit: '0.5 kg', price: 9000, image: img('1551462147-ff29053bfc14') },
      { name_uz: 'Shakar', name_ru: 'Сахар', name_en: 'Sugar', category: 'Baqqollik', unit: '1 kg', price: 11000, image: img('1581600140682-d4e68c8cde32') },
      { name_uz: 'Un', name_ru: 'Мука', name_en: 'Flour', category: 'Baqqollik', unit: '1 kg', price: 8000, discount: 10, deal: 1, image: img('1627485937980-221c88ac04f9') },
      { name_uz: 'Choy', name_ru: 'Чай', name_en: 'Tea', category: 'Baqqollik', unit: '0.2 kg', price: 25000, image: img('1564890369478-c89ca6d9cde9') },
      { name_uz: 'Kofe', name_ru: 'Кофе', name_en: 'Coffee', category: 'Baqqollik', unit: '0.25 kg', price: 75000, discount: 10, top: 1, image: img('1559056199-641a0ac8b55e') },

      // ---------- Ichimliklar ----------
      { name_uz: 'Mineral Suv', name_ru: 'Минеральная Вода', name_en: 'Mineral Water', category: 'Ichimliklar', unit: '1.5 l', price: 5000, image: img('1560023907-5f339617ea30') },
      { name_uz: 'Apelsin Sharbati', name_ru: 'Апельсиновый Сок', name_en: 'Orange Juice', category: 'Ichimliklar', unit: '1 l', price: 18000, discount: 10, deal: 1, image: img('1600271886742-f049cd451bba') },
      { name_uz: 'Olma Sharbati', name_ru: 'Яблочный Сок', name_en: 'Apple Juice', category: 'Ichimliklar', unit: '1 l', price: 16000, image: img('1576673442511-7e39b6545c87') },
      { name_uz: 'Limonad', name_ru: 'Лимонад', name_en: 'Lemonade', category: 'Ichimliklar', unit: '0.5 l', price: 12000, image: img('1437418747212-8d9709afab22') },
      { name_uz: 'Smuzi', name_ru: 'Смузи', name_en: 'Smoothie', category: 'Ichimliklar', unit: '0.4 l', price: 22000, discount: 5, top: 1, image: img('1505252585461-04db1eb84625') },
      { name_uz: 'Ko\'k Choy (sovuq)', name_ru: 'Зеленый Чай (холодный)', name_en: 'Green Tea (cold)', category: 'Ichimliklar', unit: '0.5 l', price: 10000, image: 'https://images.unsplash.com/photo-1505252585461-04db1eb84625?auto=format&fit=crop&w=600&q=80' },
    ];

    for (const p of productsData) {
      const categoryId = categoryIdMap[p.category];
      const desc_uz = `${p.name_uz} — eng sara "${p.category}" toifasidagi mahsulot. Tabiiy, yangi va qat'iy sifat nazoratidan o'tgan.`;
      const desc_ru = `${p.name_ru} — лучший продукт в категории "${p.category}". Натуральный, свежий и прошедший строгий контроль качества.`;
      const desc_en = `${p.name_en} — the finest product in the "${p.category}" category. Natural, fresh and strictly quality controlled.`;

      await dbRun(
        `INSERT INTO products (name_uz, name_ru, name_en, category_id, unit, price, discount, deal, top, image, description_uz, description_ru, description_en)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [p.name_uz, p.name_ru, p.name_en, categoryId, p.unit, p.price, p.discount || 0, p.deal || 0, p.top || 0, p.image, desc_uz, desc_ru, desc_en]
      );
    }

    // Seed an admin user
    const adminPasswordHash = await bcrypt.hash('admin123', 10);
    await dbRun(
      'INSERT INTO users (name, email, phone, password, role) VALUES (?, ?, ?, ?, ?)',
      ['Admin Nihol', 'admin@nihol.uz', '+998901234567', adminPasswordHash, 'admin']
    );

    // Seed a standard test user
    const userPasswordHash = await bcrypt.hash('user123', 10);
    await dbRun(
      'INSERT INTO users (name, email, phone, password, role) VALUES (?, ?, ?, ?, ?)',
      ['Dilshod Aliyev', 'dilshod@gmail.com', '+998935552233', userPasswordHash, 'user']
    );

    console.log('Multilingual Database successfully seeded!');
  }
}

export default db;
