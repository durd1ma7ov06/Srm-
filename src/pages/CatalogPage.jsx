import { useEffect, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { Search, ChevronRight, Home, X, Loader2 } from 'lucide-react';
import CategoryTile from '../components/ui/CategoryTile';
import ProductCard from '../components/ui/ProductCard';
import { api } from '../utils/api';
import { useTranslation } from '../context/LanguageContext';

export default function CatalogPage() {
  const { t } = useTranslation();
  const [searchParams] = useSearchParams();
  const query = (searchParams.get('q') || '').trim();

  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function loadData() {
      setLoading(true);
      setError(null);
      try {
        if (query) {
          const res = await api.products.getAll({ search: query });
          setProducts(res);
        } else {
          const resCats = await api.products.getCategories();
          setCategories(resCats);
        }
      } catch (err) {
        setError(err.message || 'Xatolik yuz berdi');
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, [query]);

  const isSearching = query.length > 0;

  return (
    <section className="container mx-auto px-4 py-6 min-h-[60vh]">
      {/* Compact breadcrumb */}
      <nav className="flex items-center gap-1.5 text-xs text-gray-400 mb-4">
        <Link to="/" className="flex items-center gap-1 hover:text-brand-600 transition">
          <Home size={13} /> {t('breadcrumb.home')}
        </Link>
        <ChevronRight size={13} />
        <Link to="/katalog" className="hover:text-brand-600 transition">{t('nav.catalog')}</Link>
        {isSearching && (
          <>
            <ChevronRight size={13} />
            <span className="text-gray-700 font-medium">{t('search.title')}</span>
          </>
        )}
      </nav>

      {loading ? (
        <div className="flex flex-col items-center justify-center py-20">
          <Loader2 className="w-10 h-10 text-brand-600 animate-spin" />
        </div>
      ) : error ? (
        <div className="bg-red-50 border border-red-200 text-red-700 px-6 py-4 rounded-3xl text-center">
          {error}
        </div>
      ) : isSearching ? (
        /* ---- Search results ---- */
        <div>
          <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
            <div>
              <h1 className="text-2xl font-extrabold text-brand-900">{t('search.results')}</h1>
              <p className="text-sm text-gray-500 mt-1">
                <span className="font-semibold text-gray-800">
                  {t('search.count', { count: products.length })}
                </span>
                {' '}{t('search.for', { query })}
              </p>
            </div>
            <Link
              to="/katalog"
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-gray-600 hover:text-brand-700 transition bg-white px-4 py-2 rounded-full shadow-soft cursor-pointer"
            >
              <X size={15} /> {t('search.clear')}
            </Link>
          </div>

          {products.length > 0 ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
              {products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="bg-white rounded-[28px] shadow-soft py-14 px-8 text-center">
              <div className="w-14 h-14 mx-auto rounded-2xl bg-brand-50 text-brand-600 flex items-center justify-center mb-4">
                <Search size={26} />
              </div>
              <h2 className="text-lg font-bold text-gray-800 mb-1">{t('search.notfound')}</h2>
              <p className="text-gray-500 text-sm">{t('search.tryagain')}</p>
            </div>
          )}
        </div>
      ) : (
        /* ---- Category bento ---- */
        <div>
          <h1 className="text-2xl font-extrabold text-brand-900">{t('nav.catalog')}</h1>
          <p className="text-sm text-gray-500 mt-1 mb-6">{t('catalog.selectType')}</p>

          <div className="grid grid-cols-2 md:grid-cols-4 auto-rows-[150px] md:auto-rows-[185px] gap-4">
            {categories.map((category) => (
              <CategoryTile
                key={category.id}
                category={category}
                count={category.product_count || 0}
              />
            ))}
          </div>
        </div>
      )}
    </section>
  );
}
