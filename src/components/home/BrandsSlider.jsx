import { bottomBrands } from '../../data/dummyData';

export default function BrandsSlider() {
  return (
    <section className="container mx-auto px-4 pb-12 pt-2">
      <div className="bg-white rounded-3xl shadow-soft px-8 py-8">
        <p className="text-center text-xs font-semibold uppercase tracking-widest text-gray-400 mb-6">
          Bizga ishonadigan hamkorlar
        </p>
        <div className="flex items-center justify-around gap-8 flex-wrap">
          {bottomBrands.map((brand) => (
            <div key={brand.id} className="flex justify-center opacity-50 hover:opacity-100 transition duration-300 cursor-pointer grayscale hover:grayscale-0">
              <img src={brand.logo} alt="Hamkor" className="h-10 w-10 object-contain rounded-full" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
