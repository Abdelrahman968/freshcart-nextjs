'use client';

import Image, { ImageProps } from 'next/image';
import { useState } from 'react';

import placeholder from '@assets/ImagePlaceHolder/placeholder.svg';

function AppImage({ src, alt, loading = 'lazy', ...props }: ImageProps) {
  const [imgSrc, setImgSrc] = useState(src);

  return (
    <Image
      {...props}
      src={imgSrc}
      alt={alt}
      loading={loading}
      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
      onError={() => setImgSrc(placeholder)}
    />
  );
}

export default AppImage;
