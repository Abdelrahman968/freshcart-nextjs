import type { CategoriesType } from '../types/category.type';

interface CategoriesResponse {
  data: CategoriesType[];
}

interface SpecificCategoryResponse {
  data: CategoriesType;
}

// Get all categories
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

// Get specific category
export async function getSpecificCategory(id: string): Promise<CategoriesType> {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/categories/${id}`,
      {
        next: {
          revalidate: 60,
          tags: ['categories'],
        },
      }
    );

    if (!res.ok) {
      console.error('Error fetching categories:', res);
      throw new Error(`Failed to fetch categories: ${res.status}`);
    }

    const finalRes: SpecificCategoryResponse = await res.json();

    return finalRes.data;
  } catch (error) {
    console.error('Error fetching categories:', error);
    throw error;
  }
}
