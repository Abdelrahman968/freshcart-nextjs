import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CartApiResponse, CartState } from '../../types/cart.type';

const extractCartData = (response: CartApiResponse) => ({
  numOfCartItems: response.numOfCartItems,
  totalCartPrice: response.data.totalCartPrice,
  totalAfterDiscount: response.data.totalAfterDiscount ?? null,
  cartId: response.cartId,
  products: response.data.products,
});

// GET user cart
export const getUserCartAsync = createAsyncThunk<CartApiResponse>(
  'cart/getUserCart',
  async (_, { rejectWithValue }) => {
    try {
      const res = await fetch('/api/cart');
      const data: CartApiResponse = await res.json();

      if (!res.ok || data.status !== 'success') {
        return rejectWithValue(data.message || 'Failed to fetch cart');
      }
      return data;
    } catch (error) {
      console.error('[getUserCartAsync]', error);
      return rejectWithValue('Network error');
    }
  }
);

// POST add to cart
export const addToCartAsync = createAsyncThunk<CartApiResponse, string>(
  'cart/addToCart',
  async (productId, { rejectWithValue }) => {
    try {
      const res = await fetch('/api/cart/add', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ productId }),
      });
      const data: CartApiResponse = await res.json();

      if (!res.ok || data.status !== 'success') {
        return rejectWithValue(data.message || 'Failed to add to cart');
      }
      return data;
    } catch (error) {
      console.error('[addToCartAsync]', error);
      return rejectWithValue('Network error');
    }
  }
);

// DELETE remove product from cart
export const removeProductAsync = createAsyncThunk<CartApiResponse, string>(
  'cart/removeProduct',
  async (productId, { rejectWithValue }) => {
    try {
      const res = await fetch(`/api/cart/${productId}`, {
        method: 'DELETE',
      });
      const data: CartApiResponse = await res.json();

      if (!res.ok || data.status !== 'success') {
        return rejectWithValue(data.message || 'Failed to remove product');
      }
      return data;
    } catch (error) {
      console.error('[removeProductAsync]', error);
      return rejectWithValue('Network error');
    }
  }
);

// PUT update product quantity
interface UpdateQuantityArgs {
  productId: string;
  count: number;
}

export const updateQuantityAsync = createAsyncThunk<
  CartApiResponse,
  UpdateQuantityArgs
>('cart/updateQuantity', async ({ productId, count }, { rejectWithValue }) => {
  try {
    const res = await fetch(`/api/cart/${productId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ count }),
    });
    const data: CartApiResponse = await res.json();

    if (!res.ok || data.status !== 'success') {
      return rejectWithValue(data.message || 'Failed to update quantity');
    }
    return data;
  } catch (error) {
    console.error('[updateQuantityAsync]', error);
    return rejectWithValue('Network error');
  }
});

// DELETE delete entire cart
export const deleteCartAsync = createAsyncThunk<void>(
  'cart/deleteCart',
  async (_, { rejectWithValue }) => {
    try {
      const res = await fetch('/api/cart', { method: 'DELETE' });
      const data = await res.json();

      if (!res.ok) {
        return rejectWithValue(data.message || 'Failed to delete cart');
      }
    } catch (error) {
      console.error('[deleteCartAsync]', error);
      return rejectWithValue('Network error');
    }
  }
);

// PUT apply promo code
export const applyPromoCodeAsync = createAsyncThunk<CartApiResponse, string>(
  'cart/applyPromoCode',
  async (couponName, { rejectWithValue }) => {
    try {
      const res = await fetch('/api/cart/promo', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ couponName }),
      });
      const data: CartApiResponse = await res.json();

      if (!res.ok || data.status !== 'success') {
        return rejectWithValue(data.message || 'Coupon is invalid or expired');
      }
      return data;
    } catch (error) {
      console.error('[applyPromoCodeAsync]', error);
      return rejectWithValue('Network error');
    }
  }
);

const initialState: CartState = {
  numOfCartItems: 0,
  totalCartPrice: 0,
  totalAfterDiscount: null,
  cartId: '',
  products: [],

  loadingById: {},
  errorById: {},
  successById: {},

  removeLoadingById: {},
  removeErrorById: {},

  updateLoadingById: {},
  updateErrorById: {},

  isCartLoading: false,
  isCartError: false,
  isCartSuccess: false,

  isDeleteCartLoading: false,
  isDeleteCartError: false,

  isPromoLoading: false,
  isPromoError: false,
  isPromoSuccess: false,
  promoMessage: '',
};

const CartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    resetAddStatus: (state, action: PayloadAction<string>) => {
      const id = action.payload;
      delete state.successById[id];
      delete state.errorById[id];
    },
    resetPromoStatus: state => {
      state.isPromoSuccess = false;
      state.isPromoError = false;
      state.promoMessage = '';
    },
    clearCart: state => {
      state.numOfCartItems = 0;
      state.totalCartPrice = 0;
      state.totalAfterDiscount = null;
      state.cartId = '';
      state.products = [];
    },
  },
  extraReducers: builder => {
    // Get User Cart
    builder
      .addCase(getUserCartAsync.pending, state => {
        state.isCartLoading = true;
        state.isCartError = false;
        state.isCartSuccess = false;
      })
      .addCase(getUserCartAsync.fulfilled, (state, action) => {
        state.isCartLoading = false;
        state.isCartSuccess = true;
        Object.assign(state, extractCartData(action.payload));
      })
      .addCase(getUserCartAsync.rejected, state => {
        state.isCartLoading = false;
        state.isCartError = true;
      });

    // Add To Cart
    builder
      .addCase(addToCartAsync.pending, (state, action) => {
        const id = action.meta.arg;
        state.loadingById[id] = true;
        state.errorById[id] = false;
        state.successById[id] = false;
      })
      .addCase(addToCartAsync.fulfilled, (state, action) => {
        const id = action.meta.arg;
        state.loadingById[id] = false;
        state.successById[id] = true;
        Object.assign(state, extractCartData(action.payload));
      })
      .addCase(addToCartAsync.rejected, (state, action) => {
        const id = action.meta.arg;
        state.loadingById[id] = false;
        state.errorById[id] = true;
      });

    // Remove Product
    builder
      .addCase(removeProductAsync.pending, (state, action) => {
        const id = action.meta.arg;
        state.removeLoadingById[id] = true;
        state.removeErrorById[id] = false;
      })
      .addCase(removeProductAsync.fulfilled, (state, action) => {
        const id = action.meta.arg;
        state.removeLoadingById[id] = true;
        Object.assign(state, extractCartData(action.payload));
      })
      .addCase(removeProductAsync.rejected, (state, action) => {
        const id = action.meta.arg;
        state.removeLoadingById[id] = false;
        state.removeErrorById[id] = true;
      });

    // Update Quantity
    builder
      .addCase(updateQuantityAsync.pending, (state, action) => {
        const id = action.meta.arg.productId;
        state.updateLoadingById[id] = true;
        state.updateErrorById[id] = false;
      })
      .addCase(updateQuantityAsync.fulfilled, (state, action) => {
        const id = action.meta.arg.productId;
        state.updateLoadingById[id] = false;
        Object.assign(state, extractCartData(action.payload));
      })
      .addCase(updateQuantityAsync.rejected, (state, action) => {
        const id = action.meta.arg.productId;
        state.updateLoadingById[id] = false;
        state.updateErrorById[id] = true;
      });

    // Delete Cart
    builder
      .addCase(deleteCartAsync.pending, state => {
        state.isDeleteCartLoading = true;
        state.isDeleteCartError = false;
      })
      .addCase(deleteCartAsync.fulfilled, state => {
        state.isDeleteCartLoading = false;
        state.numOfCartItems = 0;
        state.totalCartPrice = 0;
        state.totalAfterDiscount = null;
        state.cartId = '';
        state.products = [];
      })
      .addCase(deleteCartAsync.rejected, state => {
        state.isDeleteCartLoading = false;
        state.isDeleteCartError = true;
      });

    // Apply Promo Code
    builder
      .addCase(applyPromoCodeAsync.pending, state => {
        state.isPromoLoading = true;
        state.isPromoError = false;
        state.isPromoSuccess = false;
        state.promoMessage = '';
      })
      .addCase(applyPromoCodeAsync.fulfilled, (state, action) => {
        state.isPromoLoading = false;
        state.isPromoSuccess = true;
        state.promoMessage = action.payload.message || 'Coupon applied!';
        state.totalAfterDiscount =
          action.payload.data.totalAfterDiscount ?? null;
        Object.assign(state, extractCartData(action.payload));
      })
      .addCase(applyPromoCodeAsync.rejected, (state, action) => {
        state.isPromoLoading = false;
        state.isPromoError = true;
        state.promoMessage = (action.payload as string) || 'Invalid coupon';
      });
  },
});

export const { resetAddStatus, resetPromoStatus, clearCart } =
  CartSlice.actions;

export default CartSlice.reducer;
