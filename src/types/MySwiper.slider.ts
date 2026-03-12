import { StaticImageData } from 'next/image';

export interface HomeSlideType {
  id: number;
  image: StaticImageData;
  title: string[];
  description: string;
  buttonText: string;
  buttonLink: string;
  buttonText2: string;
  buttonLink2: string;
}

export interface ProductPageSlidesType {
  id: number;
  image: StaticImageData;
}
