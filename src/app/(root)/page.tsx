import HomeSwiper from '@components/HomeSwiper/HomeSwiper';
import IconBanner from '@components/IconBanner/IconBanner';
import CategoriesSection from '@components/CategoriesSection/CategoriesSection';
import FeatureCard from '@components/FeatureCard/FeatureCard';
import FeaturedProducts from '@components/FeaturedProducts/FeaturedProducts';
import NewsletterSection from '@components/NewsletterSection/NewsletterSection';

import { homeTopBannerInfo } from '../../data/iconBanner';
import { slides } from '../../data/MySwiperSlides.data';
import MainTitle from '../../components/MainTitle/MainTitle';

function HomePage() {
  return (
    <>
      <section>
        <HomeSwiper slides={slides} slidesPerView={1} spaceBetween={0} />
      </section>

      <section className="py-8 bg-gray-50">
        <IconBanner
          data={homeTopBannerInfo}
          extraClass="rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300 bg-white"
        />
      </section>

      <section className="px-1 md:px-9">
        <CategoriesSection />
      </section>
      <section className="py-10 w-[90%] mx-auto">
        <div className="grid md:grid-cols-2 gap-6">
          <div className="animate-in fade-in slide-in-from-left-10 duration-500">
            <FeatureCard
              badgeIcon="🔥"
              badgeText="Deal of the Day"
              title="Fresh Organic Fruits"
              description="Get up to 40% off on selected organic fruits"
              discount="40% OFF"
              code="ORGANIC40"
              buttonText="Shop Now"
              buttonLink="/products"
              gradientFrom="from-emerald-500"
              gradientTo="to-emerald-700"
              buttonColor="text-emerald-600"
            />
          </div>

          <div className="animate-in fade-in slide-in-from-right-10 duration-500">
            <FeatureCard
              badgeIcon="✨"
              badgeText="New Arrivals"
              title="Exotic Vegetables"
              description="Discover our latest collection of premium vegetables"
              discount="25% OFF"
              code="FRESH25"
              buttonText="Explore Now"
              buttonLink="/products?sort=newest"
              gradientFrom="from-orange-400"
              gradientTo="to-rose-500"
              buttonColor="text-orange-500"
            />
          </div>
        </div>
      </section>
      <section className="px-1 md:px-9">
        <MainTitle textOne="Featured" textTwo="Products" />
        <FeaturedProducts page={1} />
      </section>
      <section className="py-16 bg-linear-to-b from-white to-gray-50 px-1 md:px-9 overflow-hidden">
        <NewsletterSection />
      </section>
    </>
  );
}

export default HomePage;
