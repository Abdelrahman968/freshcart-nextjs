import {
  getFeaturedProducts,
  getProductsByCategory,
} from '../../services/products.service';
import { ProductCardProps } from '../../types/product.type';
import ProductCard from '../ProductCard/ProductCard';

interface FeaturedProductsProps {
  page: number;
  brand?: string;
  subcategoryID?: string;
}

export default async function FeaturedProducts({
  page,
  brand,
  subcategoryID,
}: FeaturedProductsProps) {
  let featuredProducts;

  if (brand) {
    featuredProducts = await getFeaturedProducts(page, brand);
  } else if (subcategoryID) {
    featuredProducts = await getProductsByCategory(subcategoryID);
  } else {
    featuredProducts = await getFeaturedProducts(page);
  }

  // console.log('featuredProducts', featuredProducts);

  return (
    <div className="flex flex-col gap-6 justify-center items-center">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
        {featuredProducts?.data.map((product: ProductCardProps) => (
          <ProductCard
            key={product._id}
            title={product.title}
            category={product.category.name}
            image={product.imageCover}
            price={product.price}
            rating={product.ratingsAverage}
            reviews={product.ratingsQuantity}
            link={`/products/${product._id}`}
            priceAfterDiscount={product.priceAfterDiscount}
          />
        ))}
      </div>
    </div>
  );
}
