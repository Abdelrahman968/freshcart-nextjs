import MainSlideImage from '@assets/home/home-slider.png';
import type { HomeSlideType } from '../types/MySwiper.slider';

export const slides: HomeSlideType[] = [
  {
    id: 1,
    image: MainSlideImage,
    title: ['Fresh Products Delivered to', 'your DoorStep'],
    description: 'Get 20% off your first order',
    buttonText: 'Shop Now',
    buttonLink: '/products',
    buttonText2: 'View Deals',
    buttonLink2: '/deals',
  },
  {
    id: 2,
    image: MainSlideImage,
    title: ['Premium Quality', 'Guaranteed'],
    description: 'Fresh from farm to your table',
    buttonText: 'Shop Now',
    buttonLink: '/products',
    buttonText2: 'Learn More',
    buttonLink2: '/about',
  },
  {
    id: 3,
    image: MainSlideImage,
    title: ['Fast & Free Delivery'],
    description: 'Same day delivery available',
    buttonText: 'Order Now',
    buttonLink: '/products',
    buttonText2: 'Delivery Info',
    buttonLink2: '/delivery',
  },
];
