import { Link } from 'react-router-dom';
import { Sprout, Truck, ShieldCheck, Leaf } from 'lucide-react';

const perks = [
  { icon: Truck, text: '30 daqiqada tez yetkazib berish' },
  { icon: Leaf, text: 'Tabiiy va yangi mahsulotlar' },
  { icon: ShieldCheck, text: 'Xavfsiz to\'lov va sifat kafolati' },
];

export default function AuthLayout({ children }) {
  return (
    <section className="container mx-auto px-4 py-8 lg:py-12">
      <div className="grid lg:grid-cols-2 rounded-[32px] overflow-hidden shadow-soft-lg bg-white min-h-[560px]">
        {/* Brand panel */}
        <div className="hidden lg:flex flex-col justify-between p-10 bg-gradient-to-br from-brand-700 to-brand-900 text-white relative overflow-hidden">
          <div className="absolute -right-16 -top-16 w-56 h-56 rounded-full bg-white/5" />
          <div className="absolute right-10 -bottom-20 w-48 h-48 rounded-full bg-white/5" />

          <Link to="/" className="relative z-10 flex items-center gap-2.5 w-fit">
            <div className="bg-white/15 backdrop-blur-sm p-2 rounded-2xl">
              <Sprout size={22} className="text-white" />
            </div>
            <span className="text-2xl font-extrabold tracking-tight">Nihol</span>
          </Link>

          <div className="relative z-10">
            <h2 className="text-3xl font-extrabold leading-tight mb-3">
              Yangilik va sifat<br />eshigingizgacha
            </h2>
            <p className="text-brand-50/80 leading-relaxed max-w-sm">
              Nihol oilasiga qo'shiling va eng sara fermer mahsulotlarini qulay narxlarda buyurtma qiling.
            </p>
          </div>

          <ul className="relative z-10 space-y-3">
            {perks.map((perk, i) => {
              const Icon = perk.icon;
              return (
                <li key={i} className="flex items-center gap-3 text-sm text-brand-50/90">
                  <span className="w-9 h-9 rounded-xl bg-white/15 flex items-center justify-center shrink-0">
                    <Icon size={18} />
                  </span>
                  {perk.text}
                </li>
              );
            })}
          </ul>
        </div>

        {/* Form side */}
        <div className="p-8 sm:p-12 flex flex-col justify-center">
          {/* Mobile logo */}
          <Link to="/" className="lg:hidden flex items-center gap-2.5 mb-8 w-fit">
            <div className="bg-gradient-to-br from-brand-500 to-brand-700 p-2 rounded-2xl">
              <Sprout size={20} className="text-white" />
            </div>
            <span className="text-2xl font-extrabold tracking-tight text-brand-700">Nihol</span>
          </Link>

          {children}
        </div>
      </div>
    </section>
  );
}
