import Image from 'next/image';
import Link from 'next/link';

interface CategoriesType {
  _id: string;
  name: string;
  slug: string;
  image: string;
  createdAt: string;
  updatedAt: string;
}

async function CategoriesSection() {
  async function getAllCategories(): Promise<CategoriesType[] | null> {
    try {
      const res = await fetch(
        'https://ecommerce.routemisr.com/api/v1/categories'
      );
      const finalRes = await res.json();
      // console.log('finalRes', finalRes);
      return finalRes.data;
    } catch (err) {
      console.log('finalRes', err);
      return null;
    }
  }

  const data = await getAllCategories();

  return (
    <>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {data?.map(cat => {
          return (
            <Link
              href={`/categories/${cat.slug}`}
              key={cat._id}
              className="bg-white rounded-lg p-4 text-center shadow-sm hover:shadow-md transition group cursor-pointer"
            >
              <div className="h-20 w-20 overflow-hidden bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-3 group-hover:bg-primary-200 transition">
                <Image
                  alt={`${cat.name}-Category`}
                  src={cat.image}
                  loading="lazy"
                  width={300}
                  height={300}
                  className="w-full h-full object-cover"
                  style={{ color: 'transparent' }}
                />
              </div>
              <h3 className="font-medium">{cat.name}</h3>
            </Link>
          );
        })}
      </div>
    </>
  );
}

export default CategoriesSection;
