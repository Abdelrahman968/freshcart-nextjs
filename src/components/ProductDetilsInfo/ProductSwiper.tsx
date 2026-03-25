'use client';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';

// import required modules
import { Navigation, Autoplay } from 'swiper/modules';
import { HiArrowLeft, HiArrowRight } from 'react-icons/hi';
import MainTitle from '../MainTitle/MainTitle';
import { ProductCardProps } from '../../types/product.type';
import ProductCard from '../ProductCard/ProductCard';

function ProductSwiper({
  productBrands,
}: {
  productBrands: ProductCardProps[];
}) {
  return (
    <div>
      <div className="flex items-center justify-between">
        <MainTitle textOne="You may also" textTwo="like" />

        <div className="flex items-center justify-center gap-2">
          <button className="custom-prev-product h-10 w-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 hover:bg-green-100 hover:text-green-600 transition cursor-pointer">
            <HiArrowLeft size={24} />
          </button>
          <button className="custom-next-product h-10 w-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 hover:bg-green-100 hover:text-green-600 transition cursor-pointer">
            <HiArrowRight size={24} />
          </button>
        </div>
      </div>

      <Swiper
        breakpoints={{
          0: {
            slidesPerView: 1,
          },
          480: {
            slidesPerView: 2,
          },
          768: {
            slidesPerView: 3,
          },
          1024: {
            slidesPerView: 4,
          },
          1280: {
            slidesPerView: 5,
          },
        }}
        spaceBetween={30}
        modules={[Navigation, Autoplay]}
        navigation={{
          nextEl: '.custom-next-product',
          prevEl: '.custom-prev-product',
        }}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        className="mySwiper"
      >
        {productBrands.map(product => (
          <SwiperSlide key={product._id} className="py-5 text-left">
            <ProductCard
              key={product._id}
              id={product._id}
              title={product.title}
              category={product.category.name}
              image={product.imageCover}
              price={product.price}
              rating={product.ratingsAverage}
              reviews={product.ratingsQuantity}
              link={`/products/${product._id}`}
              priceAfterDiscount={product.priceAfterDiscount}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}

export default ProductSwiper;
