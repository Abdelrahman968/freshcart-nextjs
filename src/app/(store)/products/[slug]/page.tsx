import { getProductById } from '../../../../services/products.service';

interface ProductDetailsPageProps {
  searchParams: Promise<{ id: string }>;
}

export default async function ProductDetailsPage(
  props: ProductDetailsPageProps
) {
  const searchParams = await props.searchParams;
  const { id } = searchParams;

  const product = await getProductById(id);

  return (
    <>
      <div>{product?.title}</div>
      <div>{product?.price}</div>
      <div>{product?.description}</div>
    </>
  );
}
