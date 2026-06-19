import { Link } from 'react-router-dom';
import { Home, Sprout } from 'lucide-react';

export default function NotFoundPage() {
  return (
    <section className="container mx-auto px-4 py-20">
      <div className="bg-white rounded-[28px] shadow-soft py-16 px-8 text-center max-w-lg mx-auto">
        <div className="w-16 h-16 mx-auto rounded-2xl bg-gradient-to-br from-brand-500 to-brand-700 flex items-center justify-center mb-6">
          <Sprout size={30} className="text-white" />
        </div>
        <h1 className="text-6xl font-extrabold text-brand-900">404</h1>
        <p className="text-gray-600 mt-3 mb-8">Kechirasiz, bunday sahifa topilmadi.</p>
        <Link
          to="/"
          className="inline-flex items-center gap-2 bg-brand-600 text-white font-semibold px-7 py-3.5 rounded-full hover:bg-brand-700 transition shadow-soft"
        >
          <Home size={16} /> Bosh sahifaga qaytish
        </Link>
      </div>
    </section>
  );
}
