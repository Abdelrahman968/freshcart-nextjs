import Breadcrumb from '@components/Breadcrumb/Breadcrumb';
import { getProductById } from '../../../../services/products.service';
import NotFound from '../../../not-found';

interface ProductDetailsPageProps {
  searchParams: Promise<{ id: string }>;
}

export default async function ProductDetailsPage(
  props: ProductDetailsPageProps
) {
  const searchParams = await props.searchParams;
  const { id } = searchParams;

  const product = await getProductById(id);

  if (!product) {
    return <NotFound />;
  }

  return (
    <>
      <Breadcrumb
        homeURL="/"
        categoryURL={`/category/${product?.category.slug}?id=${product?.category._id}`}
        SubCategoryURL={`/sub-category/${product?.subcategory[0].slug}?id=${product?.subcategory[0]._id}`}
        categoryName={product?.category.name}
        SubCategoryName={product?.subcategory[0].name}
        productName={product?.title}
      />
      <div>{product?.title}</div>
      <div>{product?.price}</div>
      <div>{product?.description}</div>
    </>
  );
}
