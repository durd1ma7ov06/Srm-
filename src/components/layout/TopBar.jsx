import { useState } from 'react';
import { Truck, Phone, Globe, ChevronDown, Check } from 'lucide-react';
import { useTranslation } from '../../context/LanguageContext';

const languages = [
  { code: 'uz', label: "O'zbekcha" },
  { code: 'ru', label: 'Русский' },
  { code: 'en', label: 'English' },
];

export default function TopBar() {
  const [open, setOpen] = useState(false);
  const { lang, setLanguage, t } = useTranslation();

  const currentLang = languages.find((l) => l.code === lang) || languages[0];

  return (
    <div className="bg-brand-900 text-white text-xs py-2.5 relative z-50">
      <div className="container mx-auto px-4 flex justify-between items-center">
        <div className="flex items-center gap-3">
          <span className="bg-brand-500 text-white px-2.5 py-0.5 rounded-full font-semibold tracking-wide">
            {t('topbar.promo')}
          </span>
          <span className="hidden sm:flex items-center gap-1.5 opacity-90">
            <Truck size={14} className="shrink-0" />
            {t('topbar.delivery')}
          </span>
        </div>
        <div className="flex items-center gap-4">
          <a href="tel:+998711234567" className="hidden md:flex items-center gap-1.5 opacity-90 hover:opacity-100 transition">
            <Phone size={13} />
            +998 71 123 45 67
          </a>

          {/* Custom language dropdown */}
          <div className="relative">
            <button
              onClick={() => setOpen((v) => !v)}
              className="flex items-center gap-1.5 border border-white/20 rounded-full pl-2.5 pr-2 py-1 hover:border-white/40 hover:bg-white/5 transition cursor-pointer"
              aria-haspopup="listbox"
              aria-expanded={open}
            >
              <Globe size={13} className="opacity-90" />
              <span className="font-medium">{currentLang.label}</span>
              <ChevronDown size={13} className={`transition-transform duration-200 ${open ? 'rotate-180' : ''}`} />
            </button>

            {open && (
              <>
                <div className="fixed inset-0 z-40" onClick={() => setOpen(false)} />
                <ul
                  role="listbox"
                  className="absolute right-0 top-full mt-2 w-40 bg-white text-gray-700 rounded-2xl shadow-soft-lg border border-black/5 p-1.5 z-50 origin-top-right animate-stepper-in"
                >
                  {languages.map((item) => {
                    const isActive = item.code === lang;
                    return (
                      <li key={item.code}>
                        <button
                          role="option"
                          aria-selected={isActive}
                          onClick={() => {
                            setLanguage(item.code);
                            setOpen(false);
                          }}
                          className={`w-full flex items-center justify-between gap-2 px-3 py-2 rounded-xl text-sm transition-colors cursor-pointer ${
                            isActive ? 'bg-brand-50 text-brand-700 font-semibold' : 'hover:bg-gray-50 text-gray-700'
                          }`}
                        >
                          {item.label}
                          {isActive && <Check size={15} className="text-brand-600" />}
                        </button>
                      </li>
                    );
                  })}
                </ul>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
