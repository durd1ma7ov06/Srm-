<div align="center">

<img src="./public/favicon.svg" width="90" alt="Nihol logo" />

# 🌱 Nihol — Onlayn oziq-ovqat do'koni

Zamonaviy, minimalist va to'liq responsiv **e-commerce** CRM va billing platformasi.
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

## 🏗️ Arxitektura va Texnologiyalar

Loyiha ikki qismdan iborat:
* **Frontend**: React 19, Vite, Tailwind CSS 4, React Router 7.
* **Backend**: Node.js & Express.js server, SQLite (ma'lumotlar bazasi), JWT avtorizatsiya va bcrypt shifrlash.

---

## ✨ Asosiy imkoniyatlar

- 🎨 **Zamonaviy dizayn** — iliq oq fon, yumshoq soyalar, yumaloq kartochkalar va emerald rang palitrasi.
- 🛒 **Ishlaydigan savatcha** — mahsulot qo'shish, miqdorni boshqaruvchi `−/+` stepper va real vaqtdagi savatcha hisoblagichi.
- 💳 **Click va Payme integratsiyasi** — backend Billing webhooklariga ulangan yuqori darajadagi billing sandbox simulyatori.
- 🌐 **3 ta tildagi mahsulotlar katalogi** — o'zbek, rus va ingliz tillarida dynamic tarjima va integratsiya.
- 🔑 **Avtorizatsiya (Auth)** — JWT token orqali kirish (`LoginPage.jsx`) va aqlli sign-up (`SignupPage.jsx`).
- 📋 **Buyurtmalar tarixi** — foydalanuvchining o'tgan buyurtmalari, ularning holatlari va chek batafsil sahifasi (`OrdersPage.jsx`).
- 🚀 **GitHub Actions (CI)** — loyihani avtomatlashtirilgan tekshiruvi.

---

## 📄 Sahifalar

| Sahifa | Manzil | Tavsif |
| --- | --- | --- |
| Bosh sahifa | `/` | Hero slider, kategoriyalar, aksiyalar va eng ko'p sotilganlar |
| Katalog | `/katalog` | Kategoriya filtri bilan barcha mahsulotlar |
| Aksiyalar | `/aksiyalar` | Chegirmalar, promo bannerlar va maxsus takliflar |
| Biz haqimizda | `/biz-haqimizda` | Kompaniya hikoyasi, statistika va qadriyatlar |
| Aloqa | `/aloqa` | Kontakt ma'lumotlari, forma va xarita |
| Buyurtmalar | `/buyurtmalar` | Mijozning buyurtmalar va to'lovlar tarixi |

---

## 🚀 Ishga tushirish

> **Talab:** [Node.js](https://nodejs.org) 18+ va npm

### 1. Backend ishga tushirish:
```bash
cd backend
npm install
npm start
```
Server **http://localhost:5000** portida ishga tushadi.

### 2. Frontend ishga tushirish:
```bash
# Bosh papkaga qaytib
npm install
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
