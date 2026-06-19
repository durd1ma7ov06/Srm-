import { Link } from 'react-router-dom';
import { useTranslation } from '../../context/LanguageContext';

export default function CategoryCard({ category }) {
  const { lang } = useTranslation();
  const displayName = category['name_' + lang] || category.name;

  return (
    <Link
      to={`/katalog/${category.slug}`}
      className="group w-full flex flex-col items-center gap-3 bg-white rounded-2xl px-3 pt-3 pb-3.5 shadow-soft hover:shadow-soft-lg transition-all duration-300 hover:-translate-y-1 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-400"
    >
      <div className="w-[72px] h-[72px] rounded-full overflow-hidden bg-brand-50 ring-2 ring-transparent group-hover:ring-brand-200 transition-all duration-300">
        <img
          src={category.image}
          alt={displayName}
          loading="lazy"
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
      </div>
      <span className="text-gray-700 font-semibold text-[13px] text-center leading-tight group-hover:text-brand-600 transition-colors">
        {displayName}
      </span>
    </Link>
  );
}
