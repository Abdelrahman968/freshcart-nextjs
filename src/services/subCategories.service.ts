import type {
  SubCategoriesType,
  SubCategoryData,
} from '../types/subCategories.type';

interface SubCategoriesResponse {
  data: SubCategoriesType[];
}
interface SpecificSubCategoryResponse {
  data: SubCategoryData;
}

// GET All SUB CATEGORIES
export async function getAllSubCategories(): Promise<SubCategoriesType[]> {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/subcategories`,
      {
        next: {
          revalidate: 60,
          tags: ['subcategories'],
        },
      }
    );

    if (!res.ok) {
      throw new Error(`Failed to fetch SubCategories: ${res.status}`);
    }

    const { data }: SubCategoriesResponse = await res.json();

    return data;
  } catch (error) {
    console.error('Error fetching SubCategories:', error);
    throw error;
  }
}

export async function getSpecificSubCategory(
  id: string
): Promise<SubCategoryData> {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/subcategories/${id}`,
      {
        next: {
          revalidate: 60,
          tags: ['subcategories'],
        },
      }
    );

    if (!res.ok) {
      throw new Error(`Failed to fetch SubCategories: ${res.status}`);
    }

    const response: SpecificSubCategoryResponse = await res.json();

    return response.data;
  } catch (error) {
    console.error('Error fetching SubCategories:', error);
    throw error;
  }
}

export async function getAllSubCategoriesOnCategory(
  id: string
): Promise<SubCategoriesType> {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/categories/${id}/subcategories`,
      {
        next: {
          revalidate: 60,
          tags: ['subcategories'],
        },
      }
    );

    if (!res.ok) {
      throw new Error(`Failed to fetch SubCategories: ${res.status}`);
    }

    const response: SubCategoriesType = await res.json();

    return response;
  } catch (error) {
    console.error('Error fetching SubCategories:', error);
    throw error;
  }
}
