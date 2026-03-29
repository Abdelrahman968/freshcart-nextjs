import homeSlider1 from '@assets/home/home-slider-1.png';
import homeSlider2 from '@assets/home/home-slider-2.jpeg';
import homeSlider3 from '@assets/home/home-slider-3.jpeg';
import type { HomeSlideType } from '../types/MySwiper.slider';

export const slides: HomeSlideType[] = [
  {
    id: 1,
    image: homeSlider1,
    title: ['Fresh Products Delivered to', 'your DoorStep'],
    description: 'Get 20% off your first order',
    buttonText: 'Shop Now',
    buttonLink: '/products',
    buttonText2: 'Track Order',
    buttonLink2: '/track-order',
  },
  {
    id: 2,
    image: homeSlider2,
    title: ['Premium Quality', 'Guaranteed'],
    description: 'Fresh from farm to your table',
    buttonText: 'View Categories',
    buttonLink: '/categories',
    buttonText2: 'Contact Us',
    buttonLink2: '/contact',
  },
  {
    id: 3,
    image: homeSlider3,
    title: ['Fast & Free Delivery'],
    description: 'Same day delivery available',
    buttonText: 'View Brands',
    buttonLink: '/brands',
    buttonText2: 'Shipping Info',
    buttonLink2: '/shipping',
  },
];
