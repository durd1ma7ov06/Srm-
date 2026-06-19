import { ArrowRight } from 'lucide-react';

export default function PromoBanners() {
  return (
    <section className="container mx-auto px-4 py-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {/* Banner 1 */}
        <div className="bg-orange-100 rounded-[28px] p-8 relative overflow-hidden flex items-center h-[260px] group">
          <div className="relative z-10 w-3/5">
            <h3 className="text-2xl font-extrabold text-orange-900 mb-2 leading-tight">Vitaminlar bumi</h3>
            <p className="text-sm text-orange-800/80 mb-6">
              Ushbu haftada yangi meva va sabzavotlarga 50% gacha chegirmalar.
            </p>
            <button className="inline-flex items-center gap-2 bg-orange-500 text-white px-6 py-2.5 rounded-full font-medium hover:bg-orange-600 transition shadow-soft group-hover:scale-105">
              Katalogga <ArrowRight size={15} />
            </button>
          </div>
          <div className="absolute right-0 top-0 h-full w-2/5">
            <img
              src="https://images.unsplash.com/photo-1610832958506-aa56368176cf?auto=format&fit=crop&w=400&q=80"
              alt="Mevalar"
              className="object-cover h-full w-full rounded-l-full scale-125 translate-x-4 transition-transform duration-500 group-hover:scale-110"
            />
          </div>
        </div>

        {/* Banner 2 */}
        <div className="bg-brand-100 rounded-[28px] p-8 relative overflow-hidden flex items-center h-[260px] group">
          <div className="relative z-10 w-3/5">
            <h3 className="text-2xl font-extrabold text-brand-900 mb-2 leading-tight">Fermer mahsulotlari</h3>
            <p className="text-sm text-brand-800/80 mb-6">
              Mahalliy fermerlardan tabiiy sut, pishloq va yangi go'sht.
            </p>
            <button className="inline-flex items-center gap-2 bg-brand-600 text-white px-6 py-2.5 rounded-full font-medium hover:bg-brand-700 transition shadow-soft group-hover:scale-105">
              Katalogga <ArrowRight size={15} />
            </button>
          </div>
          <div className="absolute right-0 top-0 h-full w-2/5">
            <img
              src="https://images.unsplash.com/photo-1628088062854-d1870b4553da?auto=format&fit=crop&w=400&q=80"
              alt="Sut mahsulotlari"
              className="object-cover h-full w-full rounded-l-full scale-125 translate-x-4 transition-transform duration-500 group-hover:scale-110"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
