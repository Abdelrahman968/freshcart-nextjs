import { BrandsType } from '../types/brand.type';

interface BrandsResponse {
  data: BrandsType[];
}

export async function getAllBrands(): Promise<BrandsType[]> {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/brands`, {
      next: {
        revalidate: 60,
        tags: ['brands'],
      },
    });

    if (!res.ok) {
      console.error('Error fetching brands:', res);
      throw new Error(`Failed to fetch brands: ${res.status}`);
    }

    const finalRes: BrandsResponse = await res.json();

    return finalRes.data;
  } catch (error) {
    console.error('Error fetching brands:', error);
    return [];
  }
}
