'use client';
import { useState } from 'react';

// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
import { FreeMode, Navigation, Thumbs } from 'swiper/modules';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/navigation';
import 'swiper/css/thumbs';
import Image from 'next/image';

function ProductImage() {
  const [thumbsSwiper, setThumbsSwiper] = useState(null);

  return (
    <div id="product-images" className="lg:w-1/4">
      <div className="bg-white rounded-xl shadow-sm p-4 sticky ">
        <Swiper
          spaceBetween={10}
          thumbs={{ swiper: thumbsSwiper }}
          modules={[FreeMode, Navigation, Thumbs]}
          className="mySwiper2"
        >
          <SwiperSlide>
            <Image
              alt="testImage"
              width={500}
              height={500}
              className="w-full h-full object-cover rounded-xl"
              src="https://swiperjs.com/demos/images/nature-1.jpg"
            />
          </SwiperSlide>
          <SwiperSlide>
            <Image
              alt="testImage"
              width={500}
              height={500}
              className="w-full h-full object-cover rounded-xl"
              src="https://swiperjs.com/demos/images/nature-1.jpg"
            />
          </SwiperSlide>
          <SwiperSlide>
            <Image
              alt="testImage"
              width={500}
              height={500}
              className="w-full h-full object-cover rounded-xl"
              src="https://swiperjs.com/demos/images/nature-1.jpg"
            />
          </SwiperSlide>
        </Swiper>
        <Swiper
          onSwiper={setThumbsSwiper}
          spaceBetween={10}
          slidesPerView={4}
          freeMode={true}
          watchSlidesProgress={true}
          modules={[FreeMode, Navigation, Thumbs]}
          className="mt-5 w-full h-25"
        >
          <SwiperSlide className="rounded-lg overflow-hidden">
            <Image
              width={1000}
              height={1000}
              alt="testImage"
              className="w-full h-full object-cover "
              src="https://swiperjs.com/demos/images/nature-1.jpg"
            />
          </SwiperSlide>
          <SwiperSlide className="rounded-lg overflow-hidden">
            <Image
              width={1000}
              height={1000}
              alt="testImage"
              className="w-full h-full object-cover "
              src="https://swiperjs.com/demos/images/nature-1.jpg"
            />
          </SwiperSlide>
          <SwiperSlide className="rounded-lg overflow-hidden">
            <Image
              width={1000}
              height={1000}
              alt="testImage"
              className="w-full h-full object-cover "
              src="https://swiperjs.com/demos/images/nature-1.jpg"
            />
          </SwiperSlide>
        </Swiper>
      </div>
    </div>
  );
}

export default ProductImage;
