export interface CartProduct {
  count: number;
  _id: string;
  product: {
    subcategory: {
      _id: string;
      name: string;
      slug: string;
      category: string;
    }[];
    _id: string;
    title: string;
    slug: string;
    quantity: number;
    imageCover: string;
    category: {
      _id: string;
      name: string;
      slug: string;
      image: string;
    };
    brand: {
      _id: string;
      name: string;
      slug: string;
      image: string;
    };
    ratingsAverage: number;
    id: string;
  };
  price: number;
}

export interface CartApiResponse {
  status: string;
  message: string;
  numOfCartItems: number;
  cartId: string;
  data: {
    _id: string;
    cartOwner: string;
    products: CartProduct[];
    createdAt: string;
    updatedAt: string;
    __v: number;
    totalCartPrice: number;
    totalAfterDiscount?: number;
  };
}

export interface CartState {
  numOfCartItems: number;
  totalCartPrice: number;
  totalAfterDiscount: number | null;
  cartId: string;
  products: CartProduct[];

  loadingById: Record<string, boolean>;
  errorById: Record<string, boolean>;
  successById: Record<string, boolean>;

  removeLoadingById: Record<string, boolean>;
  removeErrorById: Record<string, boolean>;

  updateLoadingById: Record<string, boolean>;
  updateErrorById: Record<string, boolean>;

  isCartLoading: boolean;
  isCartError: boolean;
  isCartSuccess: boolean;

  isDeleteCartLoading: boolean;
  isDeleteCartError: boolean;

  isPromoLoading: boolean;
  isPromoError: boolean;
  isPromoSuccess: boolean;
  promoMessage: string;
}
