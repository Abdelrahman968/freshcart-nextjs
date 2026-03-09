import { getFeaturedProducts } from '../../services/products.service';
import { ProductCardProps } from '../../types/product.type';
import MainTitle from '../MainTitle/MainTitle';
import ProductCard from '../ProductCard/ProductCard';

async function FeaturedProducts() {
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
