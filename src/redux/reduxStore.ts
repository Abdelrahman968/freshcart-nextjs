import { configureStore } from '@reduxjs/toolkit';
import CartSlice from './slices/CartSlice';
import WishlistSlice from './slices/WishlistSlice';

export const reduxStore = configureStore({
  reducer: {
    cart: CartSlice,
    wishlist: WishlistSlice,
  },
});

export type RootState = ReturnType<typeof reduxStore.getState>;
export type AppDispatch = typeof reduxStore.dispatch;
