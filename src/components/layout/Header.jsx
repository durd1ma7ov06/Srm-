import { Heart, User, ShoppingBag, Sprout } from 'lucide-react';
import { Link, NavLink } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import { useTranslation } from '../../context/LanguageContext';
import { useAuth } from '../../context/AuthContext';

export default function Header() {
  const { count } = useCart();
  const { t } = useTranslation();
  const { user, isAuthenticated, logout } = useAuth();

  const navItems = [
    { label: t('nav.home'), to: '/' },
    { label: t('nav.catalog'), to: '/katalog' },
    { label: t('nav.promotions'), to: '/aksiyalar' },
    { label: t('nav.about'), to: '/biz-haqimizda' },
    { label: t('nav.contact'), to: '/aloqa' },
  ];

  return (
    <header className="bg-cream/80 backdrop-blur-md py-4 sticky top-0 z-40 border-b border-black/5">
      <div className="container mx-auto px-4 flex items-center justify-between gap-8">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2.5 cursor-pointer shrink-0 group">
          <div className="bg-gradient-to-br from-brand-500 to-brand-700 p-2 rounded-2xl transition-transform group-hover:scale-105 shadow-soft">
            <Sprout size={22} className="text-white" />
          </div>
          <span className="text-2xl font-extrabold tracking-tight text-brand-700">Nihol</span>
        </Link>

        {/* Nav Links - Center */}
        <nav className="hidden lg:flex items-center gap-1">
          {navItems.map((item, index) => (
            <NavLink
              key={index}
              to={item.to}
              end={item.to === '/'}
              className={({ isActive }) =>
                `text-sm font-medium px-4 py-2 rounded-full transition-colors ${
                  isActive
                    ? 'text-brand-700 bg-brand-100/70 font-semibold'
                    : 'text-gray-600 hover:text-brand-700 hover:bg-black/[0.03]'
                }`
              }
            >
              {item.label}
            </NavLink>
          ))}
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-2 shrink-0">
          <button className="p-2.5 bg-white rounded-full cursor-pointer hover:bg-brand-50 hover:text-brand-600 text-gray-700 transition shadow-soft" aria-label="Sevimlilar">
            <Heart size={20} />
          </button>
          
          {isAuthenticated ? (
            <div className="flex items-center gap-2">
              <span className="hidden md:inline text-xs font-semibold text-gray-700 bg-white border border-black/5 px-3 py-2 rounded-full shadow-soft">
                {user.name}
              </span>
              <button
                onClick={logout}
                className="p-2 bg-red-50 text-red-600 rounded-full hover:bg-red-100 transition cursor-pointer text-xs font-bold px-3 py-2 border border-red-100"
              >
                {t('nav.logout')}
              </button>
            </div>
          ) : (
            <Link to="/kirish" className="p-2.5 bg-white rounded-full cursor-pointer hover:bg-brand-50 hover:text-brand-600 text-gray-700 transition shadow-soft" aria-label={t('nav.login')}>
              <User size={20} />
            </Link>
          )}

          <Link to="/savatcha" className="relative flex items-center gap-2 bg-brand-600 hover:bg-brand-700 text-white pl-3 pr-4 py-2.5 rounded-full cursor-pointer transition shadow-soft" aria-label="Savatcha">
            <span className="relative">
              <ShoppingBag size={20} />
              {count > 0 && (
                <span
                  key={count}
                  className="absolute -top-2 -right-2 bg-white text-brand-700 text-[10px] font-bold min-w-4 h-4 px-1 flex items-center justify-center rounded-full animate-cart-bump"
                >
                  {count}
                </span>
              )}
            </span>
            <span className="hidden sm:inline text-sm font-semibold">{t('nav.cart')}</span>
          </Link>
        </div>
      </div>
    </header>
  );
}
