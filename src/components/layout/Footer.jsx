import { Sprout } from 'lucide-react';
import { useTranslation } from '../../context/LanguageContext';

export default function Footer() {
  const { t } = useTranslation();

  return (
    <footer className="bg-brand-950 text-white pt-16 pb-8">
      <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
        {/* Brand & App Buttons */}
        <div className="pr-4">
          <div className="flex items-center gap-2.5 mb-6 cursor-pointer">
            <div className="bg-gradient-to-br from-brand-500 to-brand-700 p-2 rounded-2xl">
              <Sprout size={22} className="text-white" />
            </div>
            <span className="text-2xl font-extrabold tracking-tight text-white">Nihol</span>
          </div>
          <p className="text-gray-400 text-sm leading-relaxed mb-8">
            {t('footer.description')}
          </p>
          <div className="flex gap-3">
            <div className="bg-brand-900 border border-brand-800 rounded-xl px-3 py-2 flex items-center gap-2 cursor-pointer hover:bg-brand-800 transition">
              <svg className="w-5 h-5 text-white" viewBox="0 0 512 512" fill="currentColor"><path d="M325.3 234.3L104.6 13l280.8 161.2-60.1 60.1zM47 0C34 6.8 25.3 19.2 25.3 35.3v441.3c0 16.1 8.7 28.5 21.7 35.3l256.6-256L47 0zm425.2 225.6l-58.9-34.1-65.7 64.5 65.7 64.5 60.1-34.1c18-14.3 18-46.5-1.2-60.8zM104.6 499l280.8-161.2-60.1-60.1L104.6 499z"/></svg>
              <div>
                <div className="text-[10px] leading-none text-gray-400">{t('footer.download')}</div>
                <div className="text-sm font-semibold leading-tight">Google Play</div>
              </div>
            </div>
            <div className="bg-brand-900 border border-brand-800 rounded-xl px-3 py-2 flex items-center gap-2 cursor-pointer hover:bg-brand-800 transition">
              <svg className="w-5 h-5 text-white" viewBox="0 0 384 512" fill="currentColor"><path d="M318.7 268.7c-.2-36.7 16.4-64.4 50-84.8-18.8-26.9-47.2-41.7-84.7-44.6-35.5-2.8-74.3 20.7-88.5 20.7-15 0-49.4-19.7-76.4-19.7C63.3 141.2 4 184.8 4 273.5q0 39.3 14.4 81.2c12.8 36.7 59 126.7 107.2 125.2 25.2-.6 43-17.9 75.8-17.9 31.8 0 48.3 17.9 76.4 17.9 48.6-.7 90.4-82.5 102.6-119.3-65.2-30.7-61.7-90-61.7-91.9zm-56.6-164.2c27.3-32.4 24.8-61.9 24-72.5-24.1 1.4-52 16.4-67.9 34.9-17.5 19.8-27.8 44.3-25.6 71.9 26.1 2 49.9-11.4 69.5-34.3z"/></svg>
              <div>
                <div className="text-[10px] leading-none text-gray-400">{t('footer.download')}</div>
                <div className="text-sm font-semibold leading-tight">App Store</div>
              </div>
            </div>
          </div>
        </div>

        {/* About Us */}
        <div>
          <h3 className="text-lg font-bold mb-6">{t('footer.about')}</h3>
          <ul className="text-gray-400 text-sm space-y-3">
            <li className="hover:text-emerald-400 cursor-pointer transition-colors">{t('footer.career')}</li>
            <li className="hover:text-emerald-400 cursor-pointer transition-colors">{t('footer.stores')}</li>
            <li className="hover:text-emerald-400 cursor-pointer transition-colors">{t('footer.mission')}</li>
            <li className="hover:text-emerald-400 cursor-pointer transition-colors">{t('footer.terms')}</li>
            <li className="hover:text-emerald-400 cursor-pointer transition-colors">{t('footer.privacy')}</li>
          </ul>
        </div>

        {/* Customer Care */}
        <div>
          <h3 className="text-lg font-bold mb-6">{t('footer.care')}</h3>
          <ul className="text-gray-400 text-sm space-y-3">
            <li className="hover:text-emerald-400 cursor-pointer transition-colors">{t('footer.help')}</li>
            <li className="hover:text-emerald-400 cursor-pointer transition-colors">{t('footer.track')}</li>
            <li className="hover:text-emerald-400 cursor-pointer transition-colors">{t('footer.b2b')}</li>
            <li className="hover:text-emerald-400 cursor-pointer transition-colors">{t('footer.returns')}</li>
          </ul>
        </div>

        {/* Contact Us */}
        <div>
          <h3 className="text-lg font-bold mb-6">{t('footer.contact')}</h3>
          <ul className="text-gray-400 text-sm space-y-3 mb-6">
            <li className="leading-relaxed">{t('footer.address')}</li>
            <li>Email: info@nihol.uz</li>
            <li>Telefon: +998 71 123 45 67</li>
          </ul>
          <div className="flex items-center gap-4 text-gray-400">
            <svg className="w-4 h-4 cursor-pointer hover:text-emerald-400 transition-colors fill-current" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
            <svg className="w-4 h-4 cursor-pointer hover:text-emerald-400 transition-colors fill-current" viewBox="0 0 24 24"><path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"/></svg>
            <svg className="w-4 h-4 cursor-pointer hover:text-emerald-400 transition-colors fill-current" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
            <svg className="w-4 h-4 cursor-pointer hover:text-emerald-400 transition-colors fill-current" viewBox="0 0 24 24"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.5 12 3.5 12 3.5s-7.505 0-9.377.55a3.016 3.016 0 0 0-2.122 2.136C0 8.07 0 12 0 12s0 3.93.501 5.814a3.016 3.016 0 0 0 2.122 2.136c1.872.55 9.377.55 9.377.55s7.505 0 9.377-.55a3.016 3.016 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
            <svg className="w-4 h-4 cursor-pointer hover:text-emerald-400 transition-colors fill-current" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
          </div>
        </div>
      </div>
      
      <div className="container mx-auto px-4 mt-8 pt-8 border-t border-brand-900 text-center text-sm text-gray-400">
        © 2026 Nihol. {t('footer.rights')}
      </div>
    </footer>
  );
}
