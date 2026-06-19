import { Leaf, Truck, ShieldCheck, Heart, Sprout } from 'lucide-react';
import PageHeader from '../components/ui/PageHeader';

const stats = [
  { value: '50+', label: 'Do\'konlar' },
  { value: '10 000+', label: 'Mijozlar' },
  { value: '500+', label: 'Fermerlar' },
  { value: '7 yil', label: 'Tajriba' },
];

const values = [
  { icon: Leaf, title: 'Tabiiylik', text: 'Faqat tabiiy va ekologik toza mahsulotlar bilan ishlaymiz.' },
  { icon: Truck, title: 'Tezkorlik', text: 'Buyurtmangizni 30 daqiqada eshigingizgacha yetkazamiz.' },
  { icon: ShieldCheck, title: 'Sifat kafolati', text: 'Har bir mahsulot qat\'iy sifat nazoratidan o\'tadi.' },
  { icon: Heart, title: 'Mijozga g\'amxo\'rlik', text: 'Sizning qoniqishingiz biz uchun eng muhim qadriyat.' },
];

export default function AboutPage() {
  return (
    <>
      <PageHeader
        title="Biz haqimizda"
        subtitle="Nihol — fermerdan dasturxoningizgacha bo'lgan yo'lni qisqartirgan ishonchli oziq-ovqat do'koni."
        breadcrumb={['Biz haqimizda']}
      />

      {/* Story */}
      <section className="container mx-auto px-4 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          <div className="rounded-[28px] overflow-hidden shadow-soft aspect-[4/3]">
            <img
              src="https://images.unsplash.com/photo-1488459716781-31db52582fe9?auto=format&fit=crop&w=800&q=80"
              alt="Nihol jamoasi"
              className="w-full h-full object-cover"
            />
          </div>
          <div>
            <span className="inline-flex items-center gap-1.5 bg-brand-50 text-brand-700 text-xs font-bold uppercase tracking-wider px-3 py-1.5 rounded-full mb-4">
              <Sprout size={14} /> Bizning hikoya
            </span>
            <h2 className="text-3xl font-extrabold text-brand-900 mb-4 leading-tight">
              Kichik niholdan katta ishonchgacha
            </h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              Nihol 2019-yilda oddiy bir maqsad bilan tashkil etilgan: har bir oilaga yangi, sifatli va arzon
              oziq-ovqat mahsulotlarini yetkazib berish. Biz mahalliy fermerlar bilan to'g'ridan-to'g'ri ishlaymiz.
            </p>
            <p className="text-gray-600 leading-relaxed">
              Bugun Nihol minglab mijozlarning ishonchini qozongan, tez o'sib borayotgan onlayn do'konga aylandi.
              Maqsadimiz — sifatdan murosa qilmasdan, xizmatni har kuni yaxshilab borish.
            </p>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="container mx-auto px-4 pb-10">
        <div className="bg-gradient-to-br from-brand-700 to-brand-900 rounded-[28px] p-8 sm:p-10 grid grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((s, i) => (
            <div key={i} className="text-center">
              <div className="text-3xl sm:text-4xl font-extrabold text-white">{s.value}</div>
              <div className="text-brand-50/80 text-sm mt-1">{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Values */}
      <section className="container mx-auto px-4 pb-12">
        <div className="text-center max-w-xl mx-auto mb-8">
          <h2 className="text-2xl font-extrabold text-brand-900">Bizning qadriyatlarimiz</h2>
          <p className="text-sm text-gray-500 mt-2">Har bir qarorimiz ortida turgan tamoyillar</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {values.map((v, i) => {
            const Icon = v.icon;
            return (
              <div key={i} className="bg-white rounded-3xl p-6 shadow-soft hover:shadow-soft-lg transition-all duration-300 hover:-translate-y-1 group">
                <div className="w-12 h-12 rounded-2xl bg-brand-50 flex items-center justify-center text-brand-600 mb-4 group-hover:bg-brand-600 group-hover:text-white transition-colors">
                  <Icon size={24} />
                </div>
                <h3 className="font-bold text-gray-800 mb-2">{v.title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">{v.text}</p>
              </div>
            );
          })}
        </div>
      </section>
    </>
  );
}
