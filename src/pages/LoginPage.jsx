import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock, Eye, EyeOff, Loader2, AlertCircle } from 'lucide-react';
import AuthLayout from '../components/auth/AuthLayout';
import { useAuth } from '../context/AuthContext';
import { useTranslation } from '../context/LanguageContext';

export default function LoginPage() {
  const navigate = useNavigate();
  const { login, isLoading } = useAuth();
  const { lang, t } = useTranslation();
  
  const [showPass, setShowPass] = useState(false);
  const [form, setForm] = useState({ login: '', password: '' });
  const [error, setError] = useState(null);

  const handleChange = (e) => setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    try {
      await login(form.login, form.password);
      navigate('/');
    } catch (err) {
      setError(err.message || (lang === 'uz' ? 'Parol yoki login noto\'g\'ri' : lang === 'ru' ? 'Неверный логин или пароль' : 'Incorrect username or password'));
    }
  };

  return (
    <AuthLayout>
      <div className="max-w-sm w-full mx-auto">
        <h1 className="text-2xl font-extrabold text-brand-900 mb-1">{t('login.title')}</h1>
        <p className="text-sm text-gray-500 mb-6">{t('login.desc')}</p>

        {error && (
          <div className="flex items-center gap-2.5 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-2xl text-xs mb-5 animate-shake">
            <AlertCircle size={16} className="shrink-0" />
            <p className="font-medium">{error}</p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
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
                placeholder="••••••••"
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

          <div className="flex items-center justify-between text-sm">
            <label className="flex items-center gap-2 text-gray-600 cursor-pointer">
              <input type="checkbox" className="w-4 h-4 rounded accent-brand-600 cursor-pointer" />
              {t('login.remember_me')}
            </label>
            <a href="#" className="font-medium text-brand-700 hover:text-brand-800 transition">{t('login.forgot_password')}</a>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-brand-600 text-white font-semibold py-3.5 rounded-full hover:bg-brand-700 transition shadow-soft active:scale-[0.98] mt-1 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-75 disabled:cursor-not-allowed"
          >
            {isLoading ? (
              <Loader2 className="w-5 h-5 animate-spin" />
            ) : (
              t('login.submit')
            )}
          </button>
        </form>

        <p className="text-center text-sm text-gray-500 mt-8">
          {t('login.no_account')}{' '}
          <Link to="/royxatdan-otish" className="font-semibold text-brand-700 hover:text-brand-800 transition">
            {t('signup.title')}
          </Link>
        </p>
      </div>
    </AuthLayout>
  );
}
