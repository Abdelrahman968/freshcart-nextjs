import { StaticImageData } from 'next/image';

export interface SlideType {
  id: number;
  image: StaticImageData;
  title: string[];
  description: string;
  buttonText: string;
  buttonLink: string;
  buttonText2: string;
  buttonLink2: string;
}
