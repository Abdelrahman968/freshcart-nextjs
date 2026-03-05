import MySwiper from '@components/MySwiper/MySwiper';
import { slides } from '../../data/homeSlides';

function HomePage() {
  return (
    <>
      <MySwiper
        slides={slides}
        slidesPerView={1}
        spaceBetween={0}
        from="HomeSlider"
      />
    </>
  );
}

export default HomePage;
