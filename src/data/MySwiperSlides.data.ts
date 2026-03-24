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
    buttonText2: 'View Deals',
    buttonLink2: '/deals',
  },
  {
    id: 2,
    image: homeSlider2,
    title: ['Premium Quality', 'Guaranteed'],
    description: 'Fresh from farm to your table',
    buttonText: 'Shop Now',
    buttonLink: '/products',
    buttonText2: 'Learn More',
    buttonLink2: '/about',
  },
  {
    id: 3,
    image: homeSlider3,
    title: ['Fast & Free Delivery'],
    description: 'Same day delivery available',
    buttonText: 'Order Now',
    buttonLink: '/products',
    buttonText2: 'Delivery Info',
    buttonLink2: '/delivery',
  },
];
