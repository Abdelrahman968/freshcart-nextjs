import { ProductCardProps } from './product.type';

export interface WishlistApiResponse {
  status: string;
  count: number;
  data: ProductCardProps[];
}

export interface WishlistState {
  count: number;
  products: ProductCardProps[];

  loadingById: Record<string, boolean>;
  errorById: Record<string, boolean>;
  successById: Record<string, boolean>;

  removeLoadingById: Record<string, boolean>;
  removeErrorById: Record<string, boolean>;

  updateLoadingById: Record<string, boolean>;
  updateErrorById: Record<string, boolean>;

  isWishlistLoading: boolean;
  isWishlistError: boolean;
  isWishlistSuccess: boolean;

  isDeleteWishlistLoading: boolean;
  isDeleteWishlistError: boolean;
}
