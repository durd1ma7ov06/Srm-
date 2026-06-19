import { Truck, PiggyBank, Sparkles, ShieldCheck } from 'lucide-react';

export default function Features() {
  const features = [
    { icon: Truck, title: 'Tez yetkazib berish', subtitle: '30 daqiqadan boshlab' },
    { icon: PiggyBank, title: 'Keshbek', subtitle: 'Har bir xariddan' },
    { icon: Sparkles, title: 'Sarxillik', subtitle: 'Har kuni yangi mahsulotlar' },
    { icon: ShieldCheck, title: 'Xavfsiz to\'lov', subtitle: 'Ishonchli tizim' },
  ];

  return (
    <section className="container mx-auto px-4 py-4">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {features.map((feature, index) => {
          const Icon = feature.icon;
          return (
            <div
              key={index}
              className="bg-white rounded-3xl p-5 flex items-center gap-4 group cursor-default shadow-soft hover:shadow-soft-lg transition-all duration-300 hover:-translate-y-0.5"
            >
              <div className="w-12 h-12 shrink-0 rounded-2xl bg-brand-50 flex items-center justify-center text-brand-600 group-hover:bg-brand-600 group-hover:text-white transition-colors duration-300">
                <Icon size={24} />
              </div>
              <div>
                <h4 className="font-bold text-gray-800 text-sm leading-tight">{feature.title}</h4>
                <p className="text-xs text-gray-500 mt-0.5">{feature.subtitle}</p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
