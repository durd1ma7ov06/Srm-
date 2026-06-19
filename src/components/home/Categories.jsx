import { useEffect, useState } from 'react';
import { ArrowRight, Loader2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import CategoryCard from '../ui/CategoryCard';
import { api } from '../../utils/api';
import { useTranslation } from '../../context/LanguageContext';

export default function Categories() {
  const { lang, t } = useTranslation();
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadCats() {
      try {
        const res = await api.products.getCategories();
        setCategories(res);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    loadCats();
  }, []);

  return (
    <section className="container mx-auto px-4 py-6">
      <div className="flex items-end justify-between mb-5">
        <div>
          <h2 className="text-2xl font-extrabold text-brand-900">
            {lang === 'uz' ? 'Kategoriyalar' : lang === 'ru' ? 'Категории' : 'Categories'}
          </h2>
          <p className="text-sm text-gray-500 mt-1">
            {lang === 'uz' ? 'Sevimli mahsulotlaringizni tanlang' : lang === 'ru' ? 'Выберите любимые продукты' : 'Choose your favorite items'}
          </p>
        </div>
        <Link to="/katalog" className="inline-flex items-center gap-1.5 text-sm font-semibold text-brand-700 hover:gap-2.5 transition-all">
          {lang === 'uz' ? 'Barchasi' : lang === 'ru' ? 'Все' : 'View All'} <ArrowRight size={16} />
        </Link>
      </div>

      {loading ? (
        <div className="flex justify-center py-4">
          <Loader2 className="w-6 h-6 text-brand-600 animate-spin" />
        </div>
      ) : (
        /* Compact horizontal category strip */
        <div className="flex gap-3 overflow-x-auto no-scrollbar pb-1 -mx-1 px-1 sm:grid sm:grid-cols-6 sm:gap-4 sm:overflow-visible">
          {categories.slice(0, 6).map((category) => (
            <div key={category.id} className="shrink-0 w-[120px] sm:w-auto">
              <CategoryCard category={category} />
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
