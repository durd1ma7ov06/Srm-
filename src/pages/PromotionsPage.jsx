import { Tag, Clock, Percent, Gift } from 'lucide-react';
import PageHeader from '../components/ui/PageHeader';
import ProductCard from '../components/ui/ProductCard';
import { flashDeals, topRatedProducts } from '../data/dummyData';

const dealProducts = [...flashDeals, ...topRatedProducts].filter((p) => p.discount);

const promoCards = [
  { icon: Percent, title: 'Hafta chegirmasi', text: 'Tanlangan mahsulotlarga 50% gacha', color: 'bg-red-50 text-red-500' },
  { icon: Gift, title: 'Sovg\'a kuponi', text: '200 000 so\'mlik xaridga 20 000 so\'m', color: 'bg-orange-50 text-orange-500' },
  { icon: Clock, title: 'Tezkor aksiya', text: 'Faqat bugun amal qiladi', color: 'bg-brand-50 text-brand-600' },
];

export default function PromotionsPage() {
  return (
    <>
      <PageHeader
        title="Aksiyalar"
        subtitle="Eng foydali takliflar va chegirmalar shu yerda. Yangi aksiyalardan birinchilardan bo'lib xabardor bo'ling."
        breadcrumb={['Aksiyalar']}
      />

      {/* Featured promo banner */}
      <section className="container mx-auto px-4 py-8">
        <div className="relative overflow-hidden rounded-[28px] bg-gradient-to-r from-red-500 to-orange-500 p-8 sm:p-12 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div className="relative z-10">
            <span className="inline-flex items-center gap-1.5 bg-white/20 backdrop-blur-sm text-white text-xs font-semibold px-3 py-1.5 rounded-full mb-3">
              <Tag size={13} /> Cheklangan vaqt
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-2">Katta yozgi savdo</h2>
            <p className="text-white/90 max-w-md">Yangi meva va sabzavotlarning butun assortimentiga 50% gacha chegirma.</p>
          </div>
          <button className="relative z-10 bg-white text-red-600 font-semibold px-7 py-3.5 rounded-full hover:bg-red-50 transition shadow-soft shrink-0">
            Aksiyalarni ko'rish
          </button>
          <div className="absolute -right-12 -bottom-12 w-52 h-52 rounded-full bg-white/10" />
        </div>
      </section>

      {/* Promo info cards */}
      <section className="container mx-auto px-4 pb-4">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {promoCards.map((card, i) => {
            const Icon = card.icon;
            return (
              <div key={i} className="bg-white rounded-3xl p-6 shadow-soft hover:shadow-soft-lg transition-all duration-300 hover:-translate-y-0.5 flex items-start gap-4">
                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 ${card.color}`}>
                  <Icon size={24} />
                </div>
                <div>
                  <h3 className="font-bold text-gray-800">{card.title}</h3>
                  <p className="text-sm text-gray-500 mt-1 leading-relaxed">{card.text}</p>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Discounted products */}
      <section className="container mx-auto px-4 py-8">
        <h2 className="text-2xl font-extrabold text-brand-900 mb-1">Chegirmadagi mahsulotlar</h2>
        <p className="text-sm text-gray-500 mb-6">Eng yaxshi narxlarni qo'ldan boy bermang</p>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          {dealProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>
    </>
  );
}
