import { useState } from 'react';
import { brands } from '../../data/dummyData';

export default function BrandsSidebar() {
  const [tab, setTab] = useState('brands');

  return (
    <div className="sticky top-28">
      <div className="bg-white rounded-3xl shadow-soft border border-black/5 p-5">
        <div className="flex gap-2 mb-5 bg-cream rounded-full p-1">
          <button
            onClick={() => setTab('brands')}
            className={`flex-1 text-sm font-semibold py-2 rounded-full transition ${
              tab === 'brands' ? 'bg-white text-brand-700 shadow-soft' : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            Brendlar
          </button>
          <button
            onClick={() => setTab('shops')}
            className={`flex-1 text-sm font-semibold py-2 rounded-full transition ${
              tab === 'shops' ? 'bg-white text-brand-700 shadow-soft' : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            Do'konlar
          </button>
        </div>

        <div className="flex flex-col gap-2.5">
          {brands.map((brand) => (
            <div key={brand.id} className="flex items-center gap-3 p-2.5 rounded-2xl cursor-pointer hover:bg-brand-50 transition group">
              <div className="w-9 h-9 rounded-full bg-cream flex items-center justify-center p-1 shrink-0">
                <img src={brand.logo} alt={brand.name} className="max-w-full max-h-full object-contain rounded-full" />
              </div>
              <span className="text-sm font-medium text-gray-700 group-hover:text-brand-700 transition">{brand.name}</span>
            </div>
          ))}
        </div>

        <button className="w-full mt-5 py-3 bg-brand-50 hover:bg-brand-100 text-brand-700 rounded-2xl text-sm font-semibold transition">
          Barcha brendlarni ko'rish
        </button>
      </div>
    </div>
  );
}
