import { useEffect, useState, useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';
import {
  ChevronRight, Home, Minus, Plus, ShoppingBag, Heart, Check,
  Truck, ShieldCheck, Package, Users, Sprout, ArrowLeft, Loader2
} from 'lucide-react';
import ProductCard from '../components/ui/ProductCard';
import Stars from '../components/ui/Stars';
import { useCart } from '../context/CartContext';
import { api } from '../utils/api';
import { useTranslation } from '../context/LanguageContext';

const getProductStats = (id) => {
  const code = Number(id || 1) * 31;
  const rating = (4.0 + (code % 10) / 10).toFixed(1);
  const reviewCount = 5 + (code % 30);
  const stock = 10 + (code % 80);
  const weeklyBuyers = 12 + (code % 50);
  return { rating, reviewCount, stock, weeklyBuyers };
};

const getMockReviewsList = () => [
  { id: 1, name: 'Sardor', rating: 5, date: '12.06.2026', text: 'Juda shirin va sershbat ekan, oilamizga juda yoqdi. Rahmat!' },
  { id: 2, name: 'Elena', rating: 4, date: '10.06.2026', text: 'Очень свежее и вкусное. Доставили быстро.' },
  { id: 3, name: 'John Doe', rating: 5, date: '08.06.2026', text: 'Amazing quality! Highly recommend to everyone looking for organic food.' },
];

export default function ProductPage() {
  const { id } = useParams();
  const { lang, t } = useTranslation();
  const { items, addToCart } = useCart();

  const [product, setProduct] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);
  const [liked, setLiked] = useState(false);
  const [imgError, setImgError] = useState(false);
  
  const [reviewList, setReviewList] = useState([]);
  const [form, setForm] = useState({ name: '', text: '', rating: 5 });

  useEffect(() => {
    async function loadProduct() {
      setLoading(true);
      setError(null);
      try {
        const prodData = await api.products.getById(id);
        setProduct(prodData);
        setReviewList(getMockReviewsList());
        
        // Fetch related products (same category)
        if (prodData.category_slug) {
          const relatedData = await api.products.getAll({ category: prodData.category_slug });
          // filter out current product
          setRelatedProducts(relatedData.filter(p => p.id !== prodData.id).slice(0, 5));
        }
      } catch (err) {
        setError(err.message || 'Mahsulot yuklashda xatolik yuz berdi');
      } finally {
        setLoading(false);
      }
    }
    loadProduct();
  }, [id]);

  const stats = useMemo(() => (product ? getProductStats(product.id) : null), [product]);
  const inCart = useMemo(() => (product ? (items.find((i) => i.id === product.id)?.qty || 0) : 0), [product, items]);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-32 min-h-[60vh]">
        <Loader2 className="w-10 h-10 text-brand-600 animate-spin" />
      </div>
    );
  }

  // Noma'lum mahsulot
  if (!product || error) {
    return (
      <section className="container mx-auto px-4 py-20">
        <div className="bg-white rounded-[28px] shadow-soft py-16 px-8 text-center max-w-lg mx-auto">
          <div className="w-14 h-14 mx-auto rounded-2xl bg-brand-50 text-brand-600 flex items-center justify-center mb-5">
            <Package size={28} />
          </div>
          <h1 className="text-2xl font-extrabold text-brand-900 mb-2">{t('search.notfound')}</h1>
          <p className="text-gray-500 mb-7">{t('category.notfoundDesc')}</p>
          <Link to="/katalog" className="inline-flex items-center gap-2 bg-brand-600 text-white font-semibold px-6 py-3 rounded-full hover:bg-brand-700 transition shadow-soft cursor-pointer">
            <ArrowLeft size={16} /> {t('category.backToCatalog')}
          </Link>
        </div>
      </section>
    );
  }

  const lowStock = stats.stock < 15;
  const displayName = product['name_' + lang] || product.name;
  const displayDesc = product['description_' + lang] || product.description;
  const displayCategory = product['category_name_' + lang] || product.category_name || product.category;
  const displayUnit = product.unit || (lang === 'uz' ? 'dona' : lang === 'ru' ? 'шт' : 'pcs');

  // Price formatting
  const rawPrice = product.price || 0;
  const originalPriceNum = product.discount
    ? Math.round((rawPrice * 100) / (100 - product.discount))
    : rawPrice;

  const currentPriceStr = rawPrice.toLocaleString('ru-RU').replace(',', ' ');
  const originalPriceStr = originalPriceNum.toLocaleString('ru-RU').replace(',', ' ');

  const handleAdd = () => {
    addToCart(product, qty);
    setAdded(true);
    setTimeout(() => setAdded(false), 1600);
  };

  const handleReviewSubmit = (e) => {
    e.preventDefault();
    if (!form.name.trim() || !form.text.trim()) return;
    setReviewList((prev) => [
      { id: Date.now(), name: form.name.trim(), rating: form.rating, date: 'Just now', text: form.text.trim() },
      ...prev,
    ]);
    setForm({ name: '', text: '', rating: 5 });
  };

  const avatar = (name) =>
    `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=ecfdf5&color=047857&bold=true`;

  return (
    <section className="container mx-auto px-4 py-6">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-1.5 text-xs text-gray-400 mb-5 flex-wrap">
        <Link to="/" className="flex items-center gap-1 hover:text-brand-600 transition">
          <Home size={13} /> {t('breadcrumb.home')}
        </Link>
        <ChevronRight size={13} />
        <Link to="/katalog" className="hover:text-brand-600 transition">{t('nav.catalog')}</Link>
        {product.category_slug && (
          <>
            <ChevronRight size={13} />
            <Link to={`/katalog/${product.category_slug}`} className="hover:text-brand-600 transition">{displayCategory}</Link>
          </>
        )}
        <ChevronRight size={13} />
        <span className="text-gray-700 font-medium truncate max-w-[160px]">{displayName}</span>
      </nav>

      {/* Main: image + info */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-10">
        {/* Image */}
        <div className="relative rounded-[28px] overflow-hidden bg-white shadow-soft aspect-square">
          {product.discount > 0 && (
            <span className="absolute top-5 left-5 bg-red-500 text-white text-sm font-bold px-3 py-1.5 rounded-full z-10">
              -{product.discount}%
            </span>
          )}
          <button
            onClick={() => setLiked((v) => !v)}
            aria-label="Sevimlilar"
            className={`absolute top-5 right-5 w-11 h-11 rounded-full flex items-center justify-center shadow-soft transition z-10 cursor-pointer ${
              liked ? 'bg-red-500 text-white' : 'bg-white text-gray-500 hover:text-red-500'
            }`}
          >
            <Heart size={20} className={liked ? 'fill-current' : ''} />
          </button>
          {imgError ? (
            <div className="h-full w-full flex flex-col items-center justify-center gap-2 bg-brand-50 text-brand-300">
              <Sprout size={56} />
              <span className="text-sm font-medium text-brand-400">Nihol</span>
            </div>
          ) : (
            <img
              src={product.image}
              alt={displayName}
              onError={() => setImgError(true)}
              className="h-full w-full object-cover"
            />
          )}
        </div>

        {/* Info */}
        <div className="flex flex-col">
          <span className="inline-flex w-fit items-center gap-1.5 bg-brand-50 text-brand-700 text-xs font-bold uppercase tracking-wider px-3 py-1.5 rounded-full mb-3">
            {displayCategory}
          </span>

          <h1 className="text-3xl font-extrabold text-brand-900 leading-tight mb-3">{displayName}</h1>

          {/* Rating + buyers */}
          <div className="flex flex-wrap items-center gap-x-4 gap-y-2 mb-5">
            <div className="flex items-center gap-2">
              <Stars rating={Number(stats.rating)} size={18} />
              <span className="text-sm font-semibold text-gray-800">{stats.rating}</span>
              <span className="text-sm text-gray-400">({t('product.reviews', { count: stats.reviewCount })})</span>
            </div>
            <span className="inline-flex items-center gap-1.5 text-sm text-brand-700 bg-brand-50 px-3 py-1 rounded-full font-medium">
              <Users size={14} /> {t('product.weekly_buyers', { count: stats.weeklyBuyers })}
            </span>
          </div>

          {/* Price */}
          <div className="flex items-end gap-3 mb-5">
            <span className="text-4xl font-extrabold text-brand-900">{currentPriceStr}</span>
            <span className="text-base font-medium text-gray-400 mb-1">{t('currency')} / {displayUnit}</span>
            {product.discount > 0 && (
              <span className="text-lg text-gray-400 line-through mb-1">{originalPriceStr} {t('currency')}</span>
            )}
          </div>

          {/* Stock */}
          <div className="flex items-center gap-2 mb-6">
            <Package size={18} className={lowStock ? 'text-orange-500' : 'text-brand-600'} />
            {lowStock ? (
              <span className="text-sm font-medium text-orange-600">
                {t('product.stock', { count: stats.stock })}
              </span>
            ) : (
              <span className="text-sm font-medium text-gray-600">
                {t('product.stock', { count: stats.stock })}
              </span>
            )}
          </div>

          {/* Quantity + add to cart */}
          <div className="flex flex-wrap items-center gap-3 mb-3">
            <div className="flex items-center gap-1 bg-white rounded-full p-1.5 shadow-soft">
              <button
                onClick={() => setQty((q) => Math.max(1, q - 1))}
                className="w-10 h-10 rounded-full flex items-center justify-center text-gray-600 hover:bg-brand-50 hover:text-brand-700 transition active:scale-90 cursor-pointer"
                aria-label="Kamaytirish"
              >
                <Minus size={18} />
              </button>
              <span className="min-w-10 text-center text-lg font-bold tabular-nums">{qty}</span>
              <button
                onClick={() => setQty((q) => Math.min(stats.stock, q + 1))}
                className="w-10 h-10 rounded-full flex items-center justify-center text-gray-600 hover:bg-brand-50 hover:text-brand-700 transition active:scale-90 cursor-pointer"
                aria-label="Ko'paytirish"
              >
                <Plus size={18} />
              </button>
            </div>

            <button
              onClick={handleAdd}
              className={`flex-1 min-w-[200px] inline-flex items-center justify-center gap-2 h-[52px] rounded-full font-semibold text-white transition shadow-soft active:scale-[0.98] cursor-pointer ${
                added ? 'bg-brand-700' : 'bg-brand-600 hover:bg-brand-700'
              }`}
            >
              {added ? (
                <><Check size={20} /> {lang === 'uz' ? 'Savatga qo\'shildi' : lang === 'ru' ? 'Добавлено в корзину' : 'Added to Cart'}</>
              ) : (
                <><ShoppingBag size={20} /> {t('product.add_to_cart')}</>
              )}
            </button>
          </div>

          {inCart > 0 && (
            <p className="text-sm text-gray-500 mb-6">
              {lang === 'uz' ? 'Savatda:' : lang === 'ru' ? 'В корзине:' : 'In Cart:'} <span className="font-semibold text-brand-700">{inCart} {displayUnit}</span>
            </p>
          )}

          {/* Trust features */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-auto pt-2">
            {[
              { icon: Truck, title: lang === 'uz' ? 'Tez yetkazish' : lang === 'ru' ? 'Быстрая доставка' : 'Fast Delivery', sub: lang === 'uz' ? '30 daqiqada' : lang === 'ru' ? 'За 30 минут' : 'In 30 mins' },
              { icon: ShieldCheck, title: lang === 'uz' ? 'Sifat kafolati' : lang === 'ru' ? 'Гарантия качества' : 'Quality Guarantee', sub: lang === 'uz' ? 'Tabiiy mahsulot' : lang === 'ru' ? 'Натуральный продукт' : 'Organic product' },
              { icon: Sprout, title: lang === 'uz' ? 'Har kuni yangi' : lang === 'ru' ? 'Свежее каждый день' : 'Fresh Daily', sub: lang === 'uz' ? 'Fermerdan' : lang === 'ru' ? 'От фермера' : 'From farmers' },
            ].map((f, i) => {
              const Icon = f.icon;
              return (
                <div key={i} className="flex items-center gap-2.5 bg-white rounded-2xl p-3 shadow-soft">
                  <div className="w-9 h-9 rounded-xl bg-brand-50 text-brand-600 flex items-center justify-center shrink-0">
                    <Icon size={18} />
                  </div>
                  <div className="leading-tight">
                    <p className="text-xs font-bold text-gray-800">{f.title}</p>
                    <p className="text-[11px] text-gray-400">{f.sub}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Description */}
      <div className="bg-white rounded-[28px] shadow-soft p-6 sm:p-8 mt-8">
        <h2 className="text-xl font-extrabold text-brand-900 mb-3">{t('product.description')}</h2>
        <p className="text-gray-600 leading-relaxed">{displayDesc}</p>
        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-4 text-sm text-gray-600">
          <li className="flex items-center gap-2"><Check size={16} className="text-brand-600" /> {lang === 'uz' ? 'Toifa' : lang === 'ru' ? 'Категория' : 'Category'}: {displayCategory}</li>
          <li className="flex items-center gap-2"><Check size={16} className="text-brand-600" /> {lang === 'uz' ? 'Birlik' : lang === 'ru' ? 'Единица измерения' : 'Unit'}: {displayUnit}</li>
          <li className="flex items-center gap-2"><Check size={16} className="text-brand-600" /> {lang === 'uz' ? 'Tabiiy va yangi' : lang === 'ru' ? 'Натуральное и свежее' : 'Natural and fresh'}</li>
          <li className="flex items-center gap-2"><Check size={16} className="text-brand-600" /> {lang === 'uz' ? 'Sifat nazoratidan o\'tgan' : lang === 'ru' ? 'Прошел контроль качества' : 'Quality checked'}</li>
        </ul>
      </div>

      {/* Reviews */}
      <div className="mt-8 grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Summary + form */}
        <div className="lg:col-span-1 flex flex-col gap-6">
          <div className="bg-white rounded-[28px] shadow-soft p-6 text-center">
            <div className="text-5xl font-extrabold text-brand-900">{stats.rating}</div>
            <div className="flex justify-center my-2">
              <Stars rating={Number(stats.rating)} size={20} />
            </div>
            <p className="text-sm text-gray-500">{t('product.reviews', { count: reviewList.length })}</p>
          </div>

          <form onSubmit={handleReviewSubmit} className="bg-white rounded-[28px] shadow-soft p-6">
            <h3 className="font-bold text-gray-800 mb-4">{lang === 'uz' ? 'Sharh qoldiring' : lang === 'ru' ? 'Оставить отзыв' : 'Leave a Review'}</h3>
            <div className="mb-3">
              <label className="block text-xs font-medium text-gray-500 mb-2">{t('product.rating')}</label>
              <Stars rating={form.rating} size={24} interactive onRate={(r) => setForm((f) => ({ ...f, rating: r }))} />
            </div>
            <input
              value={form.name}
              onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
              placeholder={lang === 'uz' ? 'Ismingiz' : lang === 'ru' ? 'Ваше имя' : 'Your name'}
              className="w-full bg-cream border border-black/5 rounded-2xl px-4 py-2.5 outline-none text-sm focus:border-brand-400 focus:ring-2 focus:ring-brand-100 transition mb-3"
            />
            <textarea
              value={form.text}
              onChange={(e) => setForm((f) => ({ ...f, text: e.target.value }))}
              rows={3}
              placeholder={lang === 'uz' ? 'Fikringizni yozing...' : lang === 'ru' ? 'Напишите ваш отзыв...' : 'Write your review...'}
              className="w-full bg-cream border border-black/5 rounded-2xl px-4 py-2.5 outline-none text-sm focus:border-brand-400 focus:ring-2 focus:ring-brand-100 transition resize-none mb-4"
            />
            <button
              type="submit"
              className="w-full bg-brand-600 text-white font-semibold py-3 rounded-full hover:bg-brand-700 transition shadow-soft active:scale-[0.98] cursor-pointer"
            >
              {lang === 'uz' ? 'Sharh yuborish' : lang === 'ru' ? 'Отправить отзыв' : 'Submit Review'}
            </button>
          </form>
        </div>

        {/* Review list */}
        <div className="lg:col-span-2">
          <h2 className="text-xl font-extrabold text-brand-900 mb-4">{t('product.reviews', { count: reviewList.length })}</h2>
          <div className="flex flex-col gap-3">
            {reviewList.map((review) => (
              <div key={review.id} className="bg-white rounded-3xl shadow-soft p-5">
                <div className="flex items-center gap-3 mb-3">
                  <img src={avatar(review.name)} alt={review.name} className="w-10 h-10 rounded-full" />
                  <div className="flex-1">
                    <p className="font-semibold text-gray-800 text-sm">{review.name}</p>
                    <p className="text-xs text-gray-400">{review.date}</p>
                  </div>
                  <Stars rating={review.rating} size={14} />
                </div>
                <p className="text-sm text-gray-600 leading-relaxed">{review.text}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Related products */}
      {relatedProducts.length > 0 && (
        <div className="mt-12">
          <h2 className="text-2xl font-extrabold text-brand-900 mb-1">{lang === 'uz' ? 'O\'xshash mahsulotlar' : lang === 'ru' ? 'Похожие товары' : 'Related Products'}</h2>
          <p className="text-sm text-gray-500 mb-6">{lang === 'uz' ? `${displayCategory} bo'limidan tanlangan` : lang === 'ru' ? `Выбрано из раздела ${displayCategory}` : `Selected from ${displayCategory}`}</p>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
            {relatedProducts.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>
      )}
    </section>
  );
}
