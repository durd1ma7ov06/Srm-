import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';
import { useState, useEffect, useCallback, useRef } from 'react';
import storeImg from '../../assets/hero/dokon.jpg';
import goshtImg from '../../assets/categories/gosht.jpg';

const slides = [
  {
    tag: 'Nihol do\'koni',
    title: ['Yangilik va sifat', 'bir joyda'],
    text: 'Nihol do\'konida har kuni yangi mahsulotlar, qulay narxlar va samimiy xizmat sizni kutadi.',
    cta: 'Do\'konga tashrif',
    image: storeImg,
  },
  {
    tag: 'Yangi mahsulotlar',
    title: ['30 daqiqada', 'eshigingizgacha'],
    text: 'Tanlangan fermer sabzavotlari, sersuv mevalar va yangi pishiriqlar — eng yaxshi narxlarda.',
    cta: 'Buyurtma berish',
    image: 'https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=700&q=80',
  },
  {
    tag: 'Mavsumiy hosil',
    title: ['Eng yangi', 'mevalar'],
    text: 'Bog\'dan to\'g\'ridan-to\'g\'ri. Vitaminlarga boy mevalarga 30% gacha chegirma.',
    cta: 'Xarid qilish',
    image: 'https://images.unsplash.com/photo-1610832958506-aa56368176cf?auto=format&fit=crop&w=700&q=80',
  },
  {
    tag: 'Fermer mahsulotlari',
    title: ['Tabiiy va', 'sof go\'sht'],
    text: 'Mahalliy fermerlardan ishonchli, sifatli va tabiiy go\'sht mahsulotlari to\'plami.',
    cta: 'Katalogga o\'tish',
    image: goshtImg,
  },
];

export default function HeroSection() {
  const [active, setActive] = useState(0);
  const [dragging, setDragging] = useState(false);

  const next = useCallback(() => setActive((p) => (p + 1) % slides.length), []);
  const prev = useCallback(() => setActive((p) => (p - 1 + slides.length) % slides.length), []);

  // Swipe / drag (mouse + touch) via pointer events
  const dragStartX = useRef(null);
  const dragDelta = useRef(0);
  const isPaused = useRef(false);

  const onPointerDown = (e) => {
    dragStartX.current = e.clientX;
    dragDelta.current = 0;
    isPaused.current = true;
    setDragging(true);
  };

  const onPointerMove = (e) => {
    if (dragStartX.current === null) return;
    dragDelta.current = e.clientX - dragStartX.current;
  };

  const endDrag = () => {
    if (dragStartX.current === null) return;
    const delta = dragDelta.current;
    const threshold = 50;
    if (delta > threshold) prev();
    else if (delta < -threshold) next();
    dragStartX.current = null;
    dragDelta.current = 0;
    isPaused.current = false;
    setDragging(false);
  };

  useEffect(() => {
    const t = setInterval(() => {
      if (!isPaused.current) next();
    }, 5000);
    return () => clearInterval(t);
  }, [next, active]);

  return (
    <section className="container mx-auto px-4 pt-6 pb-4">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 lg:h-[460px]">
        {/* Main Slider Area */}
        <div
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={endDrag}
          onPointerLeave={endDrag}
          onPointerCancel={endDrag}
          className={`lg:col-span-2 bg-gradient-to-br from-brand-700 to-brand-900 rounded-[32px] p-10 lg:p-12 flex items-center relative overflow-hidden h-[360px] lg:h-full group touch-pan-y select-none ${
            dragging ? 'cursor-grabbing' : 'cursor-grab'
          }`}
        >
          {slides.map((slide, i) => (
            <div
              key={i}
              className={`absolute inset-0 p-10 lg:p-12 flex items-center transition-opacity duration-700 ${
                i === active ? 'opacity-100 z-10' : 'opacity-0 z-0 pointer-events-none'
              }`}
            >
              <div className="relative z-20 max-w-md">
                <span className="inline-block bg-white/15 backdrop-blur-sm text-brand-50 uppercase tracking-wider mb-4 font-semibold text-xs px-3 py-1.5 rounded-full">
                  {slide.tag}
                </span>
                <h1 className="text-4xl lg:text-5xl font-extrabold text-white mb-5 leading-[1.1] drop-shadow-sm">
                  {slide.title[0]}<br />{slide.title[1]}
                </h1>
                <p className="text-brand-50/90 mb-8 leading-relaxed max-w-sm">
                  {slide.text}
                </p>
                <button className="inline-flex items-center gap-2 bg-white text-brand-800 px-7 py-3.5 rounded-full font-semibold text-sm cursor-pointer hover:bg-brand-50 transition transform hover:scale-105 shadow-soft">
                  {slide.cta}
                  <ArrowRight size={16} />
                </button>
              </div>
              <div className="absolute right-0 top-0 w-3/5 h-full hidden sm:block">
                <img
                  src={slide.image}
                  alt={slide.tag}
                  draggable={false}
                  className="object-cover h-full w-full transition-transform duration-[1200ms] ease-out"
                  style={{ clipPath: 'polygon(22% 0, 100% 0, 100% 100%, 0% 100%)' }}
                />
                {/* gradient overlay to blend text side */}
                <div
                  className="absolute inset-0"
                  style={{
                    clipPath: 'polygon(22% 0, 100% 0, 100% 100%, 0% 100%)',
                    background: 'linear-gradient(90deg, rgba(6,78,59,0.55) 0%, rgba(6,78,59,0) 45%)',
                  }}
                />
              </div>
            </div>
          ))}

          {/* Prev / Next arrows */}
          <button
            onClick={prev}
            aria-label="Oldingi slayd"
            className="absolute left-4 top-1/2 -translate-y-1/2 z-30 w-10 h-10 rounded-full bg-white/20 hover:bg-white/90 text-white hover:text-brand-800 backdrop-blur-md flex items-center justify-center transition-all duration-300 opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 active:scale-95"
          >
            <ChevronLeft size={20} />
          </button>
          <button
            onClick={next}
            aria-label="Keyingi slayd"
            className="absolute right-4 top-1/2 -translate-y-1/2 z-30 w-10 h-10 rounded-full bg-white/20 hover:bg-white/90 text-white hover:text-brand-800 backdrop-blur-md flex items-center justify-center transition-all duration-300 opacity-0 group-hover:opacity-100 translate-x-2 group-hover:translate-x-0 active:scale-95"
          >
            <ChevronRight size={20} />
          </button>

          {/* Slider Dots */}
          <div className="absolute bottom-6 left-10 lg:left-12 flex gap-2 z-30">
            {slides.map((_, i) => (
              <button
                key={i}
                onClick={() => setActive(i)}
                aria-label={`${i + 1}-slayd`}
                className={`h-2 rounded-full transition-all duration-300 ${
                  i === active ? 'w-7 bg-white' : 'w-2 bg-white/40 hover:bg-white/70'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Side Banners */}
        <div className="flex flex-col gap-5 h-full">
          <div className="bg-orange-50 rounded-[28px] p-7 flex-1 flex items-center justify-between relative overflow-hidden group cursor-pointer min-h-[170px]">
            <div className="z-10 relative">
              <span className="text-xs text-orange-500 uppercase tracking-wider mb-1 block font-bold">Mavsumiy taklif</span>
              <h3 className="text-xl font-bold text-gray-900 leading-tight">Pishgan mevalar</h3>
              <h3 className="text-xl font-bold text-orange-500 mb-3">20% Chegirma</h3>
              <div className="inline-flex items-center gap-1 text-xs font-bold text-gray-900 group-hover:text-orange-600 group-hover:gap-2 transition-all">
                KATALOGGA <ArrowRight size={14} />
              </div>
            </div>
            <img src="https://images.unsplash.com/photo-1610832958506-aa56368176cf?auto=format&fit=crop&w=300&q=80" alt="Mevalar" className="w-36 h-36 object-cover rounded-full absolute -right-6 -bottom-6 z-0 opacity-90 transition-transform group-hover:scale-110" />
          </div>

          <div className="bg-red-50 rounded-[28px] p-7 flex-1 flex items-center justify-between relative overflow-hidden group cursor-pointer min-h-[170px]">
            <div className="z-10 relative">
              <span className="text-xs text-red-500 uppercase tracking-wider mb-1 block font-bold">Yangi</span>
              <h3 className="text-xl font-bold text-gray-900 leading-tight">Yangi go'sht</h3>
              <h3 className="text-xl font-bold text-red-500 mb-3">50 000 so'mdan/kg</h3>
              <div className="inline-flex items-center gap-1 text-xs font-bold text-gray-900 group-hover:text-red-600 group-hover:gap-2 transition-all">
                KATALOGGA <ArrowRight size={14} />
              </div>
            </div>
            <img src={goshtImg} alt="Go'sht" className="w-36 h-36 object-cover rounded-full absolute -right-6 -bottom-6 z-0 opacity-90 transition-transform group-hover:scale-110" />
          </div>
        </div>
      </div>
    </section>
  );
}
