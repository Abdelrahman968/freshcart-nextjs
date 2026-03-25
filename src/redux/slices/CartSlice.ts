import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { addToCart as addToCartService } from '../../services/cart.service';

interface AddToCartPayload {
  status: string;
  message: string;
  numOfCartItems: number;
  totalCartPrice: number;
  cartId: string;
}

export const addToCartAsync = createAsyncThunk(
  'cart/addToCart',
  async (id: string) => {
    try {
      const response = await addToCartService(id);
      console.log('response', response);
      if (response.status === 'success') {
        return {
          status: response.status,
          message: response.message,
          numOfCartItems: response.numOfCartItems,
          totalCartPrice: response.data.totalCartPrice,
          cartId: response.cartId,
        };
      }
    } catch (error) {
      console.error('AddToCart thunk error:', error);
      throw error;
    }
  }
);

const CartSlice = createSlice({
  name: 'cart',
  initialState: {
    numOfCartItems: 0,
    items: [],
    totalCartPrice: 0,
    cartId: '',
    loadingById: {} as Record<string, boolean>,
    errorById: {} as Record<string, boolean>,
    successById: {} as Record<string, boolean>,
  },
  reducers: {
    addToCart: (state, action: PayloadAction<string>) => {
      console.log('Payload:', action.payload);
      console.log('Current state:', JSON.parse(JSON.stringify(state)));
    },
  },

  extraReducers: builder => {
    builder.addCase(addToCartAsync.pending, (state, action) => {
      const productId = action.meta.arg;
      state.loadingById[productId] = true;
    });
    builder.addCase(addToCartAsync.fulfilled, (state, action) => {
      const productId = action.meta.arg;
      state.loadingById[productId] = false;
      state.successById[productId] = true;

      const { numOfCartItems, totalCartPrice, cartId } =
        action.payload as AddToCartPayload;

      state.numOfCartItems = numOfCartItems;
      state.totalCartPrice = totalCartPrice;
      state.cartId = cartId;

      console.log(state);
      console.log('Done');
      console.log('Payload from thunk:', action.payload);
    });
    builder.addCase(addToCartAsync.rejected, (state, action) => {
      const productId = action.meta.arg;
      state.loadingById[productId] = false;
      state.errorById[productId] = true;
    });
  },
});

export const { addToCart } = CartSlice.actions;
export default CartSlice.reducer;
