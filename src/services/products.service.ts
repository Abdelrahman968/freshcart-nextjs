import { ProductCardProps } from '../types/product.type';

// GET All PRODUCTS
export const getFeaturedProducts = async (): Promise<
  ProductCardProps[] | null
> => {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/products`);

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
