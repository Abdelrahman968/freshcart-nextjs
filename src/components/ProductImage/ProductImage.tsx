'use client';
import { useState } from 'react';
import type { Swiper as SwiperType } from 'swiper';

// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
import { FreeMode, Navigation, Thumbs, Autoplay } from 'swiper/modules';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/navigation';
import 'swiper/css/thumbs';
import Image from 'next/image';

function ProductImage({ images }: { images: string[] }) {
  const [thumbsSwiper, setThumbsSwiper] = useState<SwiperType | null>(null);

  return (
    <div id="product-images" className="lg:w-1/4">
      <div className="bg-white rounded-xl shadow-sm p-4 sticky top-20 ">
        <Swiper
          spaceBetween={10}
          thumbs={{ swiper: thumbsSwiper }}
          modules={[FreeMode, Navigation, Thumbs, Autoplay]}
          className="mySwiper2"
          autoplay={{ delay: 3000, disableOnInteraction: false }}
        >
          {images.map(image => (
            <SwiperSlide key={image}>
              <Image
                alt="testImage"
                width={500}
                height={500}
                className="w-full h-full object-cover rounded-xl"
                src={image}
              />
            </SwiperSlide>
          ))}
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
          {images.map(image => (
            <SwiperSlide key={image} className="rounded-lg overflow-hidden">
              <Image
                width={1000}
                height={1000}
                alt="testImage"
                className="w-full h-full object-cover "
                src={image}
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
}

export default ProductImage;
