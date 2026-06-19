import { useEffect, useState } from 'react';
import { Loader2 } from 'lucide-react';
import ProductCard from '../ui/ProductCard';
import { api } from '../../utils/api';
import { useTranslation } from '../../context/LanguageContext';

export default function FlashDeals() {
  const { lang } = useTranslation();
  const [deals, setDeals] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadDeals() {
      try {
        const res = await api.products.getAll({ deal: true });
        setDeals(res);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    loadDeals();
  }, []);

  return (
    <section>
      <div className="flex items-center justify-between mb-5">
        <div>
          <h2 className="text-2xl font-extrabold text-brand-900">
            {lang === 'uz' ? 'Hafta aksiyalari' : lang === 'ru' ? 'Акции недели' : 'Weekly Deals'}
          </h2>
          <p className="text-sm text-gray-500 mt-1">
            {lang === 'uz' ? 'Cheklangan vaqtdagi maxsus chegirmalar' : lang === 'ru' ? 'Специальные скидки на ограниченное время' : 'Limited time special discounts'}
          </p>
        </div>
      </div>

      {loading ? (
        <div className="flex justify-center py-8">
          <Loader2 className="w-8 h-8 text-brand-600 animate-spin" />
        </div>
      ) : deals.length > 0 ? (
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4">
          {deals.slice(0, 4).map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <p className="text-sm text-gray-400 text-center py-6">
          {lang === 'uz' ? 'Aksiyalar hozircha mavjud emas.' : lang === 'ru' ? 'Акций пока нет.' : 'No active deals at the moment.'}
        </p>
      )}
    </section>
  );
}
