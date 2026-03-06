import MySwiper from '@components/MySwiper/MySwiper';
import { slides } from '../../data/homeSlides';
import IconBanner from '../../components/IconBanner/IconBanner';
import { homeTopBannerInfo } from '../../data/iconBanner';

function HomePage() {
  return (
    <>
      <section>
        <MySwiper
          slides={slides}
          slidesPerView={1}
          spaceBetween={0}
          from="HomeSlider"
        />
      </section>

      <section className="py-8 bg-gray-50">
        <IconBanner
          data={homeTopBannerInfo}
          extraClass="rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300 bg-white"
        />
      </section>
    </>
  );
}

export default HomePage;
