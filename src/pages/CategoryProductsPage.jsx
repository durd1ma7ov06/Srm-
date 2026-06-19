import { useEffect, useState, useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, PackageOpen, ChevronRight, Home, Loader2 } from 'lucide-react';
import ProductCard from '../components/ui/ProductCard';
import { api } from '../utils/api';
import { useTranslation } from '../context/LanguageContext';

const SORT_OPTIONS = [
  { id: 'default', labelKey: 'sort.recommended' },
  { id: 'price-asc', labelKey: 'sort.priceAsc' },
  { id: 'price-desc', labelKey: 'sort.priceDesc' },
];

export default function CategoryProductsPage() {
  const { slug } = useParams();
  const { lang, t } = useTranslation();
  const [sort, setSort] = useState('default');

  const [category, setCategory] = useState(null);
  const [categoriesList, setCategoriesList] = useState([]);
  const [productsList, setProductsList] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    async function loadCategoryData() {
      setLoading(true);
      try {
        const [catData, allCats, catProducts] = await Promise.all([
          api.products.getCategoryBySlug(slug),
          api.products.getCategories(),
          api.products.getAll({ category: slug })
        ]);
        setCategory(catData);
        setCategoriesList(allCats);
        setProductsList(catProducts);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    loadCategoryData();
  }, [slug]);

  const sortedProducts = useMemo(() => {
    if (sort === 'price-asc') {
      return [...productsList].sort((a, b) => (a.price || 0) - (b.price || 0));
    }
    if (sort === 'price-desc') {
      return [...productsList].sort((a, b) => (b.price || 0) - (a.price || 0));
    }
    return productsList;
  }, [productsList, sort]);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-32 min-h-[50vh]">
        <Loader2 className="w-10 h-10 text-brand-600 animate-spin" />
      </div>
    );
  }

  // Noma'lum kategoriya
  if (!category) {
    return (
      <section className="container mx-auto px-4 py-20">
        <div className="bg-white rounded-[28px] shadow-soft py-16 px-8 text-center max-w-lg mx-auto">
          <div className="w-14 h-14 mx-auto rounded-2xl bg-brand-50 text-brand-600 flex items-center justify-center mb-5">
            <PackageOpen size={28} />
          </div>
          <h1 className="text-2xl font-extrabold text-brand-900 mb-2">{t('category.notfound')}</h1>
          <p className="text-gray-500 mb-7">{t('category.notfoundDesc')}</p>
          <Link
            to="/katalog"
            className="inline-flex items-center gap-2 bg-brand-600 text-white font-semibold px-6 py-3 rounded-full hover:bg-brand-700 transition shadow-soft cursor-pointer"
          >
            <ArrowLeft size={16} /> {t('category.backToCatalog')}
          </Link>
        </div>
      </section>
    );
  }

  const categoryName = category['name_' + lang] || category.name;
  const categoryDesc = category['description_' + lang] || category.desc || category.description;

  return (
    <>
      {/* Compact header */}
      <section className="container mx-auto px-4 pt-6">
        <nav className="flex items-center gap-1.5 text-xs text-gray-400 mb-4">
          <Link to="/" className="flex items-center gap-1 hover:text-brand-600 transition">
            <Home size={13} /> {t('breadcrumb.home')}
          </Link>
          <ChevronRight size={13} />
          <Link to="/katalog" className="hover:text-brand-600 transition">{t('nav.catalog')}</Link>
          <ChevronRight size={13} />
          <span className="text-gray-700 font-medium">{categoryName}</span>
        </nav>
        <h1 className="text-2xl font-extrabold text-brand-900">{categoryName}</h1>
        <p className="text-sm text-gray-500 mt-1">{categoryDesc}</p>
      </section>

      {/* Category quick-switch */}
      <section className="container mx-auto px-4 pt-5">
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-1">
          {categoriesList.map((c) => {
            const active = c.slug === category.slug;
            const cName = c['name_' + lang] || c.name;
            return (
              <Link
                key={c.id}
                to={`/katalog/${c.slug}`}
                className={`shrink-0 px-4 py-2 rounded-full text-sm font-medium transition ${
                  active
                    ? 'bg-brand-600 text-white shadow-soft'
                    : 'bg-white text-gray-600 hover:bg-brand-50 hover:text-brand-700 shadow-soft'
                }`}
              >
                {cName}
              </Link>
            );
          })}
        </div>
      </section>

      {/* Toolbar: back + count + sort */}
      <section className="container mx-auto px-4 py-6">
        <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
          <Link
            to="/katalog"
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-gray-600 hover:text-brand-700 transition"
          >
            <ArrowLeft size={16} /> {t('category.allCategories')}
          </Link>

          <div className="flex items-center gap-3">
            <span className="text-sm text-gray-500">
              <span className="font-semibold text-gray-800">
                {t('category.productsCount', { count: productsList.length })}
              </span>
            </span>
            {productsList.length > 0 && (
              <div className="flex items-center gap-1 bg-white rounded-full p-1 shadow-soft">
                {SORT_OPTIONS.map((option) => (
                  <button
                    key={option.id}
                    onClick={() => setSort(option.id)}
                    className={`px-3 py-1.5 rounded-full text-xs font-medium transition cursor-pointer ${
                      sort === option.id
                        ? 'bg-brand-600 text-white'
                        : 'text-gray-500 hover:text-brand-700'
                    }`}
                  >
                    {t(option.labelKey)}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Products */}
        {sortedProducts.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
            {sortedProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-[28px] shadow-soft py-16 px-8 text-center">
            <div className="w-14 h-14 mx-auto rounded-2xl bg-brand-50 text-brand-600 flex items-center justify-center mb-5">
              <PackageOpen size={28} />
            </div>
            <h2 className="text-xl font-bold text-gray-800 mb-2">{t('category.empty')}</h2>
            <p className="text-gray-500 mb-7">{t('category.emptyDesc')}</p>
            <Link
              to="/katalog"
              className="inline-flex items-center gap-2 bg-brand-600 text-white font-semibold px-6 py-3 rounded-full hover:bg-brand-700 transition shadow-soft cursor-pointer"
            >
              <ArrowLeft size={16} /> {t('category.otherCategories')}
            </Link>
          </div>
        )}
      </section>
    </>
  );
}
