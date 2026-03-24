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
    throw new Error('Failed to fetch products', { cause: error });
  }
};

// GET All PRODUCTS By category[in]
export const getProductsByCategory = async (
  categoryId?: string
): Promise<FullProductsResponseType | null> => {
  try {
    const url = new URL(
      `${process.env.NEXT_PUBLIC_API_URL}/products?limit=100`
    );

    if (categoryId) {
      url.searchParams.append('category[in]', categoryId);
    }

    const response = await fetch(url.toString());

    if (!response.ok) {
      throw new Error('Failed to fetch products');
    }

    const data = await response.json();

    return {
      data: data.data,
      metadata: data.metadata,
      results: data.results,
    };
  } catch (error) {
    console.log(error);
    throw new Error('Failed to fetch products', { cause: error });
  }
};

// GET All PRODUCTS By subCategory MODIFIED
export const getProductsBySubCategory = async (
  subCategoryId?: string
): Promise<FullProductsResponseType | null> => {
  try {
    const url = new URL(
      `${process.env.NEXT_PUBLIC_API_URL}/products?limit=100`
    );

    const response = await fetch(url.toString());

    if (!response.ok) {
      throw new Error('Failed to fetch products');
    }

    const data = await response.json();
    const filteredData = data.data.filter(
      (product: ProductCardProps) =>
        product.subcategory[0]._id === subCategoryId
    );

    return {
      data: filteredData,
      metadata: data.metadata,
      results: data.results,
    };
  } catch (error) {
    console.log(error);
    throw new Error('Failed to fetch products', { cause: error });
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
