import { BrandsType } from '../types/brand.type';

interface BrandsResponse {
  data: BrandsType[];
}
interface BrandResponse {
  data: BrandsType;
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
    console.error({
      message: 'Error fetching brands',
      error: error,
    });
    throw new Error('Failed to fetch brands');
  }
}

export async function getBrandById(id: string): Promise<BrandsType> {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/brands/${id}`, {
      next: {
        revalidate: 60,
        tags: ['brands'],
      },
    });

    if (!res.ok) {
      console.error('Error fetching brand with id:', res);
      throw new Error(`Failed to fetch brand with id: ${res.status}`);
    }

    const finalRes: BrandResponse = await res.json();

    return finalRes.data;
  } catch (error) {
    console.error({
      message: 'Error fetching brand with id',
      id: id,
      error: error,
    });
    throw new Error('Failed to fetch brand with id');
  }
}
