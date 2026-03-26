import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
  addToCart as addToCartService,
  getUserCart as getUserCartService,
} from '../../services/cart.service';

interface CartPayload {
  status: string;
  message: string;
  numOfCartItems: number;
  totalCartPrice: number;
  cartId: string;
}

interface CartState {
  numOfCartItems: number;
  items: never[];
  totalCartPrice: number;
  cartId: string;
  loadingById: Record<string, boolean>;
  errorById: Record<string, boolean>;
  successById: Record<string, boolean>;
  isNumOfCartItemsLoading: boolean;
  isNumOfCartItemsError: boolean;
  isNumOfCartItemsSuccess: boolean;
}

export const addToCartAsync = createAsyncThunk<CartPayload, string>(
  'cart/addToCart',
  async (id, { rejectWithValue }) => {
    try {
      const response = await addToCartService(id);
      if (response.status === 'success') {
        return {
          status: response.status,
          message: response.message,
          numOfCartItems: response.numOfCartItems,
          totalCartPrice: response.data.totalCartPrice,
          cartId: response.cartId,
        };
      }
      return rejectWithValue(response.message || 'Failed to add to cart');
    } catch (error) {
      console.error('addToCart thunk error:', error);
      return rejectWithValue('Network error');
    }
  }
);

export const getUserCartAsync = createAsyncThunk<CartPayload>(
  'cart/getUserCart',
  async (_, { rejectWithValue }) => {
    try {
      const response = await getUserCartService();
      if (response.status === 'success') {
        return {
          status: response.status,
          message: response.message,
          numOfCartItems: response.numOfCartItems,
          totalCartPrice: response.data.totalCartPrice,
          cartId: response.cartId,
        };
      }
      return rejectWithValue(response.message || 'Failed to fetch cart');
    } catch (error) {
      console.error('getUserCart thunk error:', error);
      return rejectWithValue('Network error');
    }
  }
);

const initialState: CartState = {
  numOfCartItems: 0,
  items: [],
  totalCartPrice: 0,
  cartId: '',
  loadingById: {},
  errorById: {},
  successById: {},
  isNumOfCartItemsLoading: false,
  isNumOfCartItemsError: false,
  isNumOfCartItemsSuccess: false,
};

const applyCartPayload = (state: CartState, payload: CartPayload) => {
  state.numOfCartItems = payload.numOfCartItems;
  state.totalCartPrice = payload.totalCartPrice;
  state.cartId = payload.cartId;
};

const CartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    updateCartCount: (state, action: PayloadAction<number>) => {
      state.numOfCartItems = action.payload;
    },
    resetCartStatus: state => {
      state.isNumOfCartItemsSuccess = false;
      state.isNumOfCartItemsError = false;
    },
    clearCart: state => {
      state.numOfCartItems = 0;
      state.items = [];
      state.totalCartPrice = 0;
      state.cartId = '';
    },
  },
  extraReducers: builder => {
    //  addToCart
    builder
      .addCase(addToCartAsync.pending, (state, action) => {
        const productId = action.meta.arg;
        state.loadingById[productId] = true;
        state.errorById[productId] = false;
        state.successById[productId] = false;
      })
      .addCase(addToCartAsync.fulfilled, (state, action) => {
        const productId = action.meta.arg;
        state.loadingById[productId] = false;
        state.successById[productId] = true;
        applyCartPayload(state, action.payload);
      })
      .addCase(addToCartAsync.rejected, (state, action) => {
        const productId = action.meta.arg;
        state.loadingById[productId] = false;
        state.errorById[productId] = true;
        console.error('addToCart rejected:', action.payload);
      });

    //  getUserCart
    builder
      .addCase(getUserCartAsync.pending, state => {
        state.isNumOfCartItemsLoading = true;
        state.isNumOfCartItemsError = false;
        state.isNumOfCartItemsSuccess = false;
      })
      .addCase(getUserCartAsync.fulfilled, (state, action) => {
        state.isNumOfCartItemsLoading = false;
        state.isNumOfCartItemsSuccess = true;
        applyCartPayload(state, action.payload);
      })
      .addCase(getUserCartAsync.rejected, (state, action) => {
        state.isNumOfCartItemsLoading = false;
        state.isNumOfCartItemsError = true;
        console.error('getUserCart rejected:', action.payload);
      });
  },
});

export const { updateCartCount, resetCartStatus, clearCart } =
  CartSlice.actions;
export default CartSlice.reducer;
