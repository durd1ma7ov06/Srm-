import HeroSection from '../components/home/HeroSection';
import Features from '../components/home/Features';
import Categories from '../components/home/Categories';
import FlashDeals from '../components/home/FlashDeals';
import PromoBanners from '../components/home/PromoBanners';
import TopRated from '../components/home/TopRated';
import BrandsSidebar from '../components/home/BrandsSidebar';

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <Features />
      <Categories />

      {/* Products Section with Sticky Brands Sidebar */}
      <section className="container mx-auto px-4 py-8">
        <div className="flex gap-8">
          {/* Sticky Brands Sidebar */}
          <div className="hidden lg:block w-[240px] shrink-0">
            <BrandsSidebar />
          </div>

          {/* Products Content */}
          <div className="flex-1 flex flex-col gap-12">
            <FlashDeals />
            <TopRated />
          </div>
        </div>
      </section>

      <PromoBanners />
    </>
  );
}
