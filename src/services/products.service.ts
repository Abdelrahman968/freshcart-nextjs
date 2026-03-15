'use server';

import {
  FullProductsResponseType,
  ProductCardProps,
} from '../types/product.type';

// GET All PRODUCTS
export const getFeaturedProducts = async (
  page: number = 1,
  brandId?: string
): Promise<FullProductsResponseType | null> => {
  try {
    const url = new URL(`${process.env.NEXT_PUBLIC_API_URL}/products`);

    url.searchParams.append('page', page.toString());

    if (brandId) {
      url.searchParams.append('brand', brandId);
    }

    const response = await fetch(url.toString());

    if (!response.ok) {
      throw new Error('Failed to fetch products');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
    return null;
  }
};

// GET PRODUCT BY ID
export const getProductById = async (
  id: string
): Promise<ProductCardProps | null> => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/products/${id}`
    );

    if (!response.ok) {
      throw new Error('Failed to fetch products');
    }

    const data = await response.json();
    return data.data;
  } catch (error) {
    console.log(error);
    return null;
  }
};
