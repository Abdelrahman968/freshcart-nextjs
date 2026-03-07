import type { CategoriesType } from '../types/category.type';

interface CategoriesResponse {
  data: CategoriesType[];
}

export async function getAllCategories(): Promise<CategoriesType[]> {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/categories`, {
      next: {
        revalidate: 60,
        tags: ['categories'],
      },
    });

    if (!res.ok) {
      console.error('Error fetching categories:', res);
      throw new Error(`Failed to fetch categories: ${res.status}`);
    }

    const finalRes: CategoriesResponse = await res.json();

    return finalRes.data;
  } catch (error) {
    console.error('Error fetching categories:', error);
    return [];
  }
}
