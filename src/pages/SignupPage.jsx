import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { User, Mail, Lock, Eye, EyeOff, Loader2, AlertCircle } from 'lucide-react';
import AuthLayout from '../components/auth/AuthLayout';
import { useAuth } from '../context/AuthContext';
import { useTranslation } from '../context/LanguageContext';

export default function SignupPage() {
  const navigate = useNavigate();
  const { register, isLoading } = useAuth();
  const { lang, t } = useTranslation();

  const [showPass, setShowPass] = useState(false);
  const [form, setForm] = useState({ name: '', login: '', password: '', agree: false });
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((f) => ({ ...f, [name]: type === 'checkbox' ? checked : value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    let email = '';
    let phone = '';
    const loginVal = form.login.trim();

    if (loginVal.includes('@')) {
      email = loginVal;
    } else {
      phone = loginVal;
    }

    try {
      await register(form.name.trim(), email, phone, form.password);
      navigate('/');
    } catch (err) {
      setError(err.message || (lang === 'uz' ? 'Ro\'yxatdan o\'tishda xatolik yuz berdi' : lang === 'ru' ? 'Ошибка при регистрации' : 'An error occurred during registration'));
    }
  };

  return (
    <AuthLayout>
      <div className="max-w-sm w-full mx-auto">
        <h1 className="text-2xl font-extrabold text-brand-900 mb-1">{t('signup.title')}</h1>
        <p className="text-sm text-gray-500 mb-6">{t('signup.desc')}</p>

        {error && (
          <div className="flex items-center gap-2.5 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-2xl text-xs mb-5 animate-shake">
            <AlertCircle size={16} className="shrink-0" />
            <p className="font-medium">{error}</p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">{t('signup.name')}</label>
            <div className="relative">
              <User size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                name="name"
                value={form.name}
                onChange={handleChange}
                required
                placeholder={t('signup.name')}
                className="w-full bg-cream border border-black/5 rounded-2xl pl-11 pr-4 py-3 outline-none text-sm focus:border-brand-400 focus:ring-2 focus:ring-brand-100 transition"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">{t('login.email_phone')}</label>
            <div className="relative">
              <Mail size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                name="login"
                value={form.login}
                onChange={handleChange}
                required
                placeholder="email@nihol.uz"
                className="w-full bg-cream border border-black/5 rounded-2xl pl-11 pr-4 py-3 outline-none text-sm focus:border-brand-400 focus:ring-2 focus:ring-brand-100 transition"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">{t('login.password')}</label>
            <div className="relative">
              <Lock size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                name="password"
                type={showPass ? 'text' : 'password'}
                value={form.password}
                onChange={handleChange}
                required
                minLength={6}
                placeholder={lang === 'uz' ? 'Kamida 6 ta belgi' : lang === 'ru' ? 'Минимум 6 символов' : 'At least 6 characters'}
                className="w-full bg-cream border border-black/5 rounded-2xl pl-11 pr-11 py-3 outline-none text-sm focus:border-brand-400 focus:ring-2 focus:ring-brand-100 transition"
              />
              <button
                type="button"
                onClick={() => setShowPass((v) => !v)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-brand-600 transition cursor-pointer"
                aria-label="Parolni ko'rsatish"
              >
                {showPass ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          <label className="flex items-start gap-2 text-sm text-gray-600 cursor-pointer">
            <input
              name="agree"
              type="checkbox"
              checked={form.agree}
              onChange={handleChange}
              required
              className="w-4 h-4 mt-0.5 rounded accent-brand-600 cursor-pointer"
            />
            <span>
              {lang === 'uz' ? (
                <>
                  <a href="#" className="text-brand-700 hover:underline">Foydalanish shartlari</a> va{' '}
                  <a href="#" className="text-brand-700 hover:underline">maxfiylik siyosati</a>ga roziman
                </>
              ) : lang === 'ru' ? (
                <>
                  Согласен с <a href="#" className="text-brand-700 hover:underline">условиями использования</a> и{' '}
                  <a href="#" className="text-brand-700 hover:underline">политикой конфиденциальности</a>
                </>
              ) : (
                <>
                  I agree with <a href="#" className="text-brand-700 hover:underline">Terms of use</a> and{' '}
                  <a href="#" className="text-brand-700 hover:underline">Privacy policy</a>
                </>
              )}
            </span>
          </label>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-brand-600 text-white font-semibold py-3.5 rounded-full hover:bg-brand-700 transition shadow-soft active:scale-[0.98] mt-1 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-75 disabled:cursor-not-allowed"
          >
            {isLoading ? (
              <Loader2 className="w-5 h-5 animate-spin" />
            ) : (
              t('signup.submit')
            )}
          </button>
        </form>

        <p className="text-center text-sm text-gray-500 mt-8">
          {t('signup.has_account')}{' '}
          <Link to="/kirish" className="font-semibold text-brand-700 hover:text-brand-800 transition">
            {t('login.submit')}
          </Link>
        </p>
      </div>
    </AuthLayout>
  );
}
