import Breadcrumb from '@components/Breadcrumb/Breadcrumb';
import {
  getFeaturedProducts,
  getProductById,
} from '../../../../services/products.service';
import ProductNotFound from '@components/ProductNotFound/ProductNotFound';
import { Metadata } from 'next';
import ProductInfo from '../../../../components/ProductInfo/ProductInfo';
import ProductImage from '../../../../components/ProductImage/ProductImage';
import ProductDetailsInfo from '../../../../components/ProductDetilsInfo/ProductDetailsInfo';
import ProductSwiper from '../../../../components/ProductDetilsInfo/ProductSwiper';
import { FullProductsResponseType } from '../../../../types/product.type';

interface ProductDetailsPageProps {
  params: Promise<{ id?: string }>;
}

export async function generateMetadata(
  props: ProductDetailsPageProps
): Promise<Metadata> {
  const { id } = await props.params;

  if (!id) {
    return {
      title: 'Product Not Found',
      description: 'Product not found',
    };
  }

  try {
    const product = await getProductById(id);

    if (!product) {
      return {
        title: 'Product Not Found',
        description: 'Product not found',
      };
    }

    return {
      title: `Product Details - ${product.title} | FreshCart`,
      description: `${product.description} | FreshCart`,
      keywords: [product.title, product.description],
      authors: [{ name: 'Abdelrahman Ayman' }],
      creator: 'Abdelrahman Ayman',
      publisher: 'Abdelrahman Ayman',
    };
  } catch {
    return {
      title: 'Error loading product',
      description: 'Something went wrong',
    };
  }
}

export default async function ProductDetailsPage(
  props: ProductDetailsPageProps
) {
  const { id } = await props.params;

  if (!id) {
    return <ProductNotFound productId={id} />;
  }

  let product;
  let mayLikeProducts: FullProductsResponseType | null = null;
  try {
    product = await getProductById(id);
    mayLikeProducts = await getFeaturedProducts(1, product!.brand._id);
  } catch {
    return <ProductNotFound productId={id} />;
  }

  if (!product) {
    return <ProductNotFound productId={id} />;
  }

  return (
    <>
      <Breadcrumb
        homeURL="/"
        categoryURL={`/categories/${product.category._id}`}
        SubCategoryURL={`/products?subcategory=${product.subcategory[0]._id}`}
        categoryName={product.category.name}
        SubCategoryName={product.subcategory[0].name}
        productName={product.title}
      />

      <section className="py-6">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row gap-8">
            <ProductImage images={product.images} ProductName={product.title} />
            <ProductInfo product={product} />
          </div>
        </div>
      </section>
      <section>
        <ProductDetailsInfo product={product} />
      </section>
      <section className="py-6 container mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <ProductSwiper productBrands={mayLikeProducts?.data || []} />
      </section>
    </>
  );
}
