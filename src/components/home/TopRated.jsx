import { useEffect, useState } from 'react';
import ProductCard from '../ui/ProductCard';
import { api } from '../../utils/api';
import { Loader2 } from 'lucide-react';
import { useTranslation } from '../../context/LanguageContext';

export default function TopRated() {
  const { lang } = useTranslation();
  const [tops, setTops] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadTops() {
      try {
        const res = await api.products.getAll({ top: true });
        setTops(res);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    loadTops();
  }, []);

  return (
    <section>
      <div className="flex items-center justify-between mb-5">
        <div>
          <h2 className="text-2xl font-extrabold text-brand-900">
            {lang === 'uz' ? 'Eng ko\'p sotilganlar' : lang === 'ru' ? 'Хиты продаж' : 'Best Sellers'}
          </h2>
          <p className="text-sm text-gray-500 mt-1">
            {lang === 'uz' ? 'Xaridorlar eng ko\'p tanlagan mahsulotlar' : lang === 'ru' ? 'Самые популярные товары среди покупателей' : 'Most popular products chosen by our customers'}
          </p>
        </div>
      </div>

      {loading ? (
        <div className="flex justify-center py-8">
          <Loader2 className="w-8 h-8 text-brand-600 animate-spin" />
        </div>
      ) : tops.length > 0 ? (
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4">
          {tops.slice(0, 4).map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <p className="text-sm text-gray-400 text-center py-6">
          {lang === 'uz' ? 'Hozircha mahsulotlar mavjud emas.' : lang === 'ru' ? 'Товаров пока нет.' : 'No products available at the moment.'}
        </p>
      )}
    </section>
  );
}
