import MainTitle from '../MainTitle/MainTitle';
import ProductCard from '../ProductCard/ProductCard';

interface Subcategory {
  _id: string;
  name: string;
  slug: string;
  category: string;
}

interface Category {
  _id: string;
  name: string;
  slug: string;
  image: string;
}

interface Brand {
  _id: string;
  name: string;
  slug: string;
  image: string;
}

interface ProductCardProps {
  sold: number;
  images: string[];
  subcategory: Subcategory[];
  ratingsQuantity: number;
  _id: string;
  title: string;
  slug: string;
  description: string;
  quantity: number;
  price: number;
  imageCover: string;
  category: Category;
  brand: Brand;
  ratingsAverage: number;
  createdAt: string;
  updatedAt: string;
  id: string;
  priceAfterDiscount: number;
}

async function FeaturedProducts() {
  const getFeaturedProducts = async (): Promise<ProductCardProps[] | null> => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/products`
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

  const featuredProducts = await getFeaturedProducts();

  return (
    <>
      <MainTitle textOne="Featured" textTwo="Products" />
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
        {featuredProducts?.map((product: ProductCardProps) => (
          <ProductCard
            key={product._id}
            title={product.title}
            category={product.category.name}
            image={product.imageCover}
            price={product.price}
            rating={product.ratingsAverage}
            reviews={product.ratingsQuantity}
            link={`/products/${product.slug}`}
            priceAfterDiscount={product.priceAfterDiscount}
          />
        ))}
      </div>
    </>
  );
}

export default FeaturedProducts;
