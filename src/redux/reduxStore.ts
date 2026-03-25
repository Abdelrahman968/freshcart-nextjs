import { configureStore } from '@reduxjs/toolkit';
import CartSlice from './slices/CartSlice';

export const reduxStore = configureStore({
  reducer: {
    cart: CartSlice,
  },
});

export type RootState = ReturnType<typeof reduxStore.getState>;
export type AppDispatch = typeof reduxStore.dispatch;
