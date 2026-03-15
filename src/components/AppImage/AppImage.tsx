'use client';

import Image, { ImageProps } from 'next/image';
import { useState } from 'react';

import placeholder from '@assets/ImagePlaceHolder/placeholder.svg';

function AppImage({ src, alt, ...props }: ImageProps) {
  const [imgSrc, setImgSrc] = useState(src);

  return (
    <Image
      {...props}
      src={imgSrc}
      alt={alt}
      onError={() => setImgSrc(placeholder)}
    />
  );
}

export default AppImage;
