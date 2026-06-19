import { Plus, Minus, Heart, Sprout } from 'lucide-react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import { useTranslation } from '../../context/LanguageContext';

export default function ProductCard({ product }) {
  const { items, addToCart, decrement } = useCart();
  const { lang, t } = useTranslation();
  const [liked, setLiked] = useState(false);
  const [imgError, setImgError] = useState(false);

  const qty = items.find((i) => i.id === product.id)?.qty || 0;
  const to = `/mahsulot/${product.id}`;

  // Handle price parsing safely
  const rawPrice = typeof product.price === 'string'
    ? parseInt(product.price.replace(/\s/g, ''), 10)
    : product.price || 0;

  const originalPriceNum = product.discount
    ? Math.round((rawPrice * 100) / (100 - product.discount))
    : rawPrice;

  const currentPriceStr = rawPrice.toLocaleString('ru-RU').replace(',', ' ');
  const originalPriceStr = originalPriceNum.toLocaleString('ru-RU').replace(',', ' ');

  const displayName = product['name_' + lang] || product.name;
  const displayUnit = product.unit || (lang === 'uz' ? 'dona' : lang === 'ru' ? 'шт' : 'pcs');

  return (
    <div className="bg-white rounded-3xl p-2.5 hover:shadow-soft-lg shadow-soft transition-all duration-300 group flex flex-col h-full relative hover:-translate-y-1">

      {/* Image Container */}
      <div className="relative rounded-2xl overflow-hidden aspect-square mb-3 bg-cream">
        {/* Discount Badge */}
        {product.discount && (
          <div className="absolute top-3 left-3 bg-red-500 text-white text-[11px] font-bold px-2.5 py-1 rounded-full z-20">
            -{product.discount}%
          </div>
        )}

        {/* Wishlist toggle (sibling of the link) */}
        <button
          onClick={() => setLiked((v) => !v)}
          aria-label="Sevimlilar"
          aria-pressed={liked}
          className={`absolute top-3 right-3 z-20 w-9 h-9 rounded-full flex items-center justify-center shadow-soft transition-all duration-300 cursor-pointer ${
            liked
              ? 'bg-red-500 text-white opacity-100 translate-y-0'
              : 'bg-white/90 backdrop-blur-md text-gray-500 hover:text-red-500 opacity-0 group-hover:opacity-100 translate-y-1 group-hover:translate-y-0'
          }`}
        >
          <Heart size={16} className={liked ? 'fill-current' : ''} />
        </button>

        {/* Image links to detail page */}
        <Link to={to} className="block h-full w-full">
          {imgError ? (
            <div className="h-full w-full flex flex-col items-center justify-center gap-1 bg-brand-50 text-brand-300">
              <Sprout size={36} />
              <span className="text-[10px] font-medium text-brand-400">Nihol</span>
            </div>
          ) : (
            <img
              src={product.image}
              alt={displayName}
              loading="lazy"
              onError={() => setImgError(true)}
              className="h-full w-full object-cover transform group-hover:scale-110 transition-transform duration-700 ease-out"
            />
          )}
        </Link>
      </div>

      {/* Details */}
      <div className="flex flex-col flex-1 px-1.5 pb-1">
        <Link
          to={to}
          className="text-gray-900 font-semibold text-sm leading-tight mb-1 line-clamp-1 hover:text-brand-700 transition-colors"
        >
          {displayName}
        </Link>
        <span className="text-xs text-gray-400 mb-3">{displayUnit}</span>

        <div className="mt-auto flex flex-wrap items-end justify-between gap-2">
          <div className="flex flex-col min-w-0">
            {product.discount > 0 && (
              <span className="text-[11px] text-gray-400 line-through leading-none mb-1">
                {originalPriceStr} {t('currency')}
              </span>
            )}
            <span className="font-extrabold text-gray-900 text-base leading-none whitespace-nowrap">
              {currentPriceStr} <span className="text-[11px] font-medium text-gray-400">{t('currency')}</span>
            </span>
          </div>

          {/* Add button -> Quantity stepper */}
          {qty === 0 ? (
            <button
              onClick={() => addToCart(product)}
              className="w-10 h-10 shrink-0 rounded-full flex items-center justify-center bg-brand-600 text-white hover:bg-brand-700 transition-all duration-300 transform hover:scale-110 shadow-soft active:scale-95 cursor-pointer"
              aria-label="Savatga qo'shish"
            >
              <Plus size={18} />
            </button>
          ) : (
            <div className="flex items-center gap-0.5 h-10 shrink-0 bg-brand-600 text-white rounded-full p-1 shadow-soft animate-stepper-in">
              <button
                onClick={() => decrement(product.id)}
                className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-white/20 transition active:scale-90 cursor-pointer"
                aria-label="Kamaytirish"
              >
                <Minus size={16} />
              </button>
              <span className="min-w-6 text-center text-sm font-bold tabular-nums select-none">{qty}</span>
              <button
                onClick={() => addToCart(product)}
                className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-white/20 transition active:scale-90 cursor-pointer"
                aria-label="Ko'paytirish"
              >
                <Plus size={16} />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
