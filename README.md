<div align="center">

<img src="./public/favicon.svg" width="90" alt="Nihol logo" />

# 🌱 Nihol — Onlayn oziq-ovqat do'koni

Zamonaviy, minimalist va to'liq responsiv **e-commerce** frontend.
Fermerdan dasturxoningizgacha — yangi mevalar, sabzavotlar, go'sht va sut mahsulotlari.

<p>
  <img src="https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=white" alt="React" />
  <img src="https://img.shields.io/badge/Vite-8-646CFF?logo=vite&logoColor=white" alt="Vite" />
  <img src="https://img.shields.io/badge/Tailwind_CSS-4-06B6D4?logo=tailwindcss&logoColor=white" alt="Tailwind" />
  <img src="https://img.shields.io/badge/React_Router-7-CA4245?logo=reactrouter&logoColor=white" alt="React Router" />
  <img src="https://img.shields.io/badge/License-MIT-10B981" alt="License" />
</p>

</div>

---

## ✨ Asosiy imkoniyatlar

- 🎨 **Zamonaviy dizayn** — iliq oq fon, yumshoq soyalar, yumaloq kartochkalar va emerald rang palitrasi
- 🛒 **Ishlaydigan savatcha** — mahsulot qo'shish, miqdorni boshqaruvchi `−/+` stepper va real vaqtdagi savatcha hisoblagichi
- 🖼️ **Interaktiv Hero slider** — avtomatik almashinuv, strelka tugmalari, nuqtalar va **swipe/drag** (sichqoncha + touch)
- 🧭 **Ko'p sahifali navigatsiya** — `react-router-dom` orqali alohida sahifalar, umumiy shablon saqlanadi
- 🔎 **Katalog filtri** — kategoriya bo'yicha mahsulotlarni saralash
- 🌐 **Maxsus til tanlovchi** — sayt uslubiga mos custom dropdown
- 📱 **To'liq responsiv** — mobil, planshet va desktop uchun moslashgan
- 📍 **Aloqa sahifasi** — kontakt kartochkalari, forma va jonli Google xaritasi

---

## 📄 Sahifalar

| Sahifa | Manzil | Tavsif |
| --- | --- | --- |
| Bosh sahifa | `/` | Hero slider, kategoriyalar, aksiyalar va eng ko'p sotilganlar |
| Katalog | `/katalog` | Kategoriya filtri bilan barcha mahsulotlar |
| Aksiyalar | `/aksiyalar` | Chegirmalar, promo bannerlar va maxsus takliflar |
| Biz haqimizda | `/biz-haqimizda` | Kompaniya hikoyasi, statistika va qadriyatlar |
| Aloqa | `/aloqa` | Kontakt ma'lumotlari, forma va xarita |

---

## 🛠️ Texnologiyalar

| Texnologiya | Vazifasi |
| --- | --- |
| [React 19](https://react.dev) | UI kutubxonasi |
| [Vite 8](https://vite.dev) | Build vositasi va dev server |
| [Tailwind CSS 4](https://tailwindcss.com) | Utility-first styling |
| [React Router 7](https://reactrouter.com) | Klient tomonidagi routing |
| [Lucide React](https://lucide.dev) | Ikonkalar |
| [ESLint](https://eslint.org) | Kod sifati nazorati |

---

## 🚀 Ishga tushirish

> **Talab:** [Node.js](https://nodejs.org) 18+ va npm

```bash
# 1. Repozitoriyani klonlash
git clone https://github.com/<foydalanuvchi>/nihol.git
cd nihol

# 2. Bog'liqliklarni o'rnatish
npm install

# 3. Dev serverni ishga tushirish
npm run dev
```

Brauzerda oching: **http://localhost:5173**

---

## 📦 Skriptlar

| Buyruq | Vazifasi |
| --- | --- |
| `npm run dev` | Dev serverni ishga tushiradi (HMR bilan) |
| `npm run build` | Ishlab chiqarish uchun build qiladi (`dist/`) |
| `npm run preview` | Build qilingan versiyani lokal ko'rib chiqadi |
| `npm run lint` | ESLint orqali kodni tekshiradi |

---

## 📂 Loyiha tuzilishi

```
nihol/
├── public/
│   └── favicon.svg          # Brend logosi (favicon)
├── src/
│   ├── assets/              # Rasmlar (hero, kategoriyalar)
│   ├── components/
│   │   ├── home/            # Bosh sahifa bo'limlari
│   │   ├── layout/          # TopBar, Header, NavBar, Footer, Layout
│   │   └── ui/              # Button, ProductCard, CategoryCard, PageHeader
│   ├── context/
│   │   └── CartContext.jsx  # Savatcha holatini boshqarish
│   ├── data/
│   │   └── dummyData.js     # Namuna ma'lumotlar
│   ├── pages/               # Sahifalar (Home, Katalog, Aksiyalar, ...)
│   ├── App.jsx              # Route'lar
│   ├── main.jsx             # Kirish nuqtasi
│   └── index.css            # Global uslublar va Tailwind tema
├── index.html
├── vite.config.js
└── package.json
```

---

## 📝 Eslatma

Loyihadagi mahsulotlar, narxlar va matnlar **namuna (demo)** maqsadida ishlatilgan.
Haqiqiy foydalanish uchun ma'lumotlarni backend yoki API bilan almashtirish mumkin.

---

<div align="center">

Made with 🌱 — **Nihol**

</div>
