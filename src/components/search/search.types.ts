export type Product = {
  _id: string;
  id: string;
  title: string;
  slug: string;
  description: string;
  price: number;
  priceAfterDiscount?: number;
  imageCover: string;
  images: string[];
  quantity: number;
  sold: number;
  ratingsAverage: number;
  ratingsQuantity: number;
  category: { _id: string; name: string; slug: string; image: string };
  brand: { _id: string; name: string; slug: string; image: string };
  createdAt: string;
  updatedAt: string;
};

export type Category = {
  _id: string;
  name: string;
  slug: string;
  image: string;
};

export type ProductsResponse = {
  results: number;
  metadata: {
    currentPage: number;
    numberOfPages: number;
    limit: number;
    nextPage?: number;
  };
  data: Product[];
};

export type CategoriesResponse = {
  results: number;
  metadata: { currentPage: number; numberOfPages: number; limit: number };
  data: Category[];
};

export type SearchParams = {
  q?: string;
  categories?: string | string[];
  brand?: string;
  priceMin?: string;
  priceMax?: string;
  sort?: string;
  page?: string;
};
