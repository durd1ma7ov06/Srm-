import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from '../../context/LanguageContext';
import {
  ChevronRight, Search, LayoutGrid,
  Apple, Carrot, Milk, Beef, Croissant, Coffee
} from 'lucide-react';

export default function NavBar() {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [isCategoriesOpen, setIsCategoriesOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState(null);
  const [term, setTerm] = useState('');

  const goCatalog = () => {
    setIsCategoriesOpen(false);
    setActiveCategory(null);
    navigate('/katalog');
  };

  const handleSearch = (e) => {
    e.preventDefault();
    const q = term.trim();
    navigate(q ? `/katalog?q=${encodeURIComponent(q)}` : '/katalog');
  };

  const categoriesList = [
    { id: 'fruits', icon: <Apple size={18} />, label: t('nav.fruits'), hasMegaMenu: true },
    { id: 'vegetables', icon: <Carrot size={18} />, label: t('nav.vegetables'), hasMegaMenu: true },
    { id: 'dairy', icon: <Milk size={18} />, label: t('nav.dairy') },
    { id: 'meat', icon: <Beef size={18} />, label: t('nav.meat') },
    { id: 'bakery', icon: <Croissant size={18} />, label: t('nav.bakery') },
    { id: 'drinks', icon: <Coffee size={18} />, label: t('nav.drinks') },
  ];

  const renderMegaMenu = () => {
    return (
      <div className="absolute left-full top-0 ml-1 bg-white shadow-soft-lg rounded-2xl w-[600px] border border-black/5 p-6 z-50 flex flex-col gap-6">
        <div className="grid grid-cols-3 gap-6">
          <div>
            <h4 className="font-bold text-gray-800 text-sm mb-3">Ommabop</h4>
            <ul className="space-y-2 text-sm text-gray-500">
              <li className="hover:text-brand-600 cursor-pointer transition-colors">Olmalar</li>
              <li className="hover:text-brand-600 cursor-pointer transition-colors">Bananlar</li>
              <li className="hover:text-brand-600 cursor-pointer transition-colors">Pomidorlar</li>
              <li className="hover:text-brand-600 cursor-pointer transition-colors">Bodringlar</li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold text-gray-800 text-sm mb-3">Mavsumiy</h4>
            <ul className="space-y-2 text-sm text-gray-500">
              <li className="hover:text-brand-600 cursor-pointer transition-colors">Qulupnay</li>
              <li className="hover:text-brand-600 cursor-pointer transition-colors">Tarvuzlar</li>
              <li className="hover:text-brand-600 cursor-pointer transition-colors">Qovunlar</li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold text-gray-800 text-sm mb-3">Ekzotik</h4>
            <ul className="space-y-2 text-sm text-gray-500">
              <li className="hover:text-brand-600 cursor-pointer transition-colors">Mango</li>
              <li className="hover:text-brand-600 cursor-pointer transition-colors">Avokado</li>
              <li className="hover:text-brand-600 cursor-pointer transition-colors">Ananaslar</li>
            </ul>
          </div>
        </div>

        {/* Promo Banner Bottom */}
        <div className="bg-brand-50 rounded-2xl flex items-center justify-between overflow-hidden relative h-[120px]">
          <div className="flex items-center gap-2 pl-6 z-10">
            <img src="https://images.unsplash.com/photo-1610832958506-aa56368176cf?auto=format&fit=crop&w=150&q=80" alt="Mevalar" className="h-24 w-24 object-cover rounded-2xl ml-2 shadow-soft" />
          </div>
          <div className="text-center z-10 flex-1 px-4">
            <h3 className="text-xl font-bold text-brand-900">Yangi <span className="text-brand-600">Mevalar</span></h3>
            <p className="text-sm font-medium text-brand-600 mb-2">30% gacha chegirmalar</p>
            <button onClick={goCatalog} className="bg-brand-600 text-white px-6 py-1.5 rounded-full text-sm font-medium hover:bg-brand-700 transition transform hover:scale-105">Xarid qilish</button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <nav className="bg-cream hidden md:block relative z-30">
      <div className="container mx-auto px-4 flex items-center gap-4 py-3">
        {/* Categories Dropdown Trigger */}
        <div className="relative flex items-center shrink-0">
          <button
            className={`flex items-center gap-2 cursor-pointer rounded-full px-5 py-3 font-medium text-sm transition ${
              isCategoriesOpen ? 'bg-brand-600 text-white' : 'bg-white text-gray-800 hover:bg-brand-50 shadow-soft'
            }`}
            onClick={() => { setIsCategoriesOpen(!isCategoriesOpen); setActiveCategory(null); }}
          >
            <LayoutGrid size={18} />
            <span>{t('nav.catalog')}</span>
          </button>

          {/* Dropdown Menu */}
          {isCategoriesOpen && (
            <>
              {/* Backdrop to close on click outside */}
              <div className="fixed inset-0 z-30" onClick={() => { setIsCategoriesOpen(false); setActiveCategory(null); }} />
              <div className="absolute top-full left-0 mt-2 w-64 bg-white shadow-soft-lg rounded-2xl border border-black/5 py-2 z-40"
                onMouseLeave={() => setActiveCategory(null)}>
                {categoriesList.map((category) => (
                  <div
                    key={category.id}
                    className="flex items-center justify-between mx-2 px-3 py-2.5 rounded-xl hover:bg-brand-50 cursor-pointer group transition-colors"
                    onMouseEnter={() => setActiveCategory(category.id)}
                    onClick={goCatalog}
                  >
                    <div className="flex items-center gap-3 text-gray-600 group-hover:text-brand-600 transition">
                      {category.icon}
                      <span className="text-sm font-medium">{category.label}</span>
                    </div>
                    {category.hasMegaMenu && (
                      <ChevronRight size={16} className="text-gray-400 group-hover:text-brand-500 transition-colors" />
                    )}
                  </div>
                ))}

                {activeCategory && categoriesList.find(c => c.id === activeCategory)?.hasMegaMenu && renderMegaMenu()}
              </div>
            </>
          )}
        </div>

        {/* Search Bar - takes remaining space */}
        <form onSubmit={handleSearch} className="flex-1 relative">
          <input
            type="text"
            value={term}
            onChange={(e) => setTerm(e.target.value)}
            placeholder={t('nav.search')}
            className="w-full bg-white border border-black/5 rounded-full pl-5 pr-14 py-3 outline-none text-sm focus:border-brand-400 focus:ring-2 focus:ring-brand-100 transition placeholder:text-gray-400 shadow-soft"
          />
          <button type="submit" className="absolute right-2 top-1/2 -translate-y-1/2 bg-brand-600 hover:bg-brand-700 text-white w-9 h-9 rounded-full flex items-center justify-center transition cursor-pointer" aria-label="Qidirish">
            <Search size={18} />
          </button>
        </form>
      </div>
    </nav>
  );
}
