import type { MetadataRoute } from 'next';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  try {
    const baseUrl = `${process.env.NEXTAUTH_URL}`;

    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/products`, {
      cache: 'no-store',
    });

    if (!res.ok) {
      throw new Error('Failed to fetch products');
    }

    const data = await res.json();

    const products = Array.isArray(data) ? data : data.data || [];

    const productUrls = products.map((product: any) => ({
      url: `${baseUrl}/product/${product.id}`,
      lastModified: product.updatedAt
        ? new Date(product.updatedAt)
        : new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.7,
    }));

    return [
      {
        url: baseUrl,
        lastModified: new Date(),
        changeFrequency: 'daily',
        priority: 1,
      },
      ...productUrls,
    ];
  } catch (error) {
    console.error('SITEMAP ERROR:', error);

    return [
      {
        url: `${process.env.NEXTAUTH_URL}`,
        lastModified: new Date(),
      },
    ];
  }
}
