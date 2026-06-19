import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import { useState } from 'react';
import { useTranslation } from '../../context/LanguageContext';

const SPAN_BY_SIZE = {
  lg: 'col-span-2 row-span-2',
  wide: 'col-span-2 row-span-1',
  tall: 'col-span-1 row-span-2',
  sm: 'col-span-1 row-span-1',
};

export default function CategoryTile({ category, count }) {
  const { lang, t } = useTranslation();
  const isLarge = category.size === 'lg';
  const span = SPAN_BY_SIZE[category.size] ?? SPAN_BY_SIZE.sm;
  const [imgError, setImgError] = useState(false);

  const displayName = category['name_' + lang] || category.name;
  const displayDesc = category['description_' + lang] || category.desc || category.description;

  return (
    <Link
      to={`/katalog/${category.slug}`}
      className={`group relative overflow-hidden rounded-[28px] shadow-soft hover:shadow-soft-lg transition-all duration-300 ${span}`}
    >
      {/* Background image (or brand fallback) */}
      {imgError ? (
        <div className="absolute inset-0 bg-gradient-to-br from-brand-500 to-brand-800" />
      ) : (
        <img
          src={category.image}
          alt={displayName}
          loading="lazy"
          onError={() => setImgError(true)}
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
        />
      )}

      {/* Gradient overlay for legibility */}
      <div className="absolute inset-0 bg-gradient-to-t from-brand-950/85 via-brand-950/25 to-transparent" />

      {/* Count badge */}
      <span className="absolute top-4 left-4 bg-white/15 backdrop-blur-md text-white text-xs font-semibold px-3 py-1.5 rounded-full">
        {t('category.productsCount', { count })}
      </span>

      {/* Arrow */}
      <span className="absolute top-4 right-4 w-9 h-9 rounded-full bg-white/15 backdrop-blur-md text-white flex items-center justify-center transition-all duration-300 group-hover:bg-white group-hover:text-brand-700 group-hover:rotate-45">
        <ArrowUpRight size={18} />
      </span>

      {/* Title */}
      <div className="absolute bottom-0 left-0 right-0 p-5">
        <h3 className={`font-extrabold text-white leading-tight ${isLarge ? 'text-3xl' : 'text-xl'}`}>
          {displayName}
        </h3>
        <p className="text-white/75 text-sm mt-0.5">{displayDesc}</p>
      </div>
    </Link>
  );
}
