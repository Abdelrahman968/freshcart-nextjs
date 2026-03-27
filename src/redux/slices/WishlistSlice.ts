import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { WishlistApiResponse, WishlistState } from '../../types/wishlist.type';

const extractWishlistData = (response: WishlistApiResponse) => ({
  count: response.count,
  products: response.data,
});

// GET user wishlist
export const getUserWishlistAsync = createAsyncThunk<WishlistApiResponse>(
  'wishlist/getUserWishlist',
  async (_, { rejectWithValue }) => {
    try {
      const res = await fetch('/api/wishlist');
      const data: WishlistApiResponse = await res.json();

      if (!res.ok || data.status !== 'success') {
        return rejectWithValue(data.status || 'Failed to fetch wishlist');
      }
      return data;
    } catch (error) {
      console.error('[getUserWishlistAsync]', error);
      return rejectWithValue('Network error');
    }
  }
);

// ADD product to wishlist
export const addToWishlistAsync = createAsyncThunk<WishlistApiResponse, string>(
  'wishlist/addToWishlist',
  async (productId, { rejectWithValue }) => {
    try {
      const res = await fetch('/api/wishlist/add', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ productId }),
      });
      const data: WishlistApiResponse = await res.json();

      if (!res.ok || data.status !== 'success') {
        return rejectWithValue(data.status || 'Failed to add to wishlist');
      }
      return data;
    } catch (error) {
      console.error('[addToWishlistAsync]', error);
      return rejectWithValue('Network error');
    }
  }
);

// DELETE remove product from wishlist
export const removeProductFromWishlistAsync = createAsyncThunk<
  WishlistApiResponse,
  string
>('wishlist/removeProduct', async (productId, { rejectWithValue }) => {
  try {
    const res = await fetch(`/api/wishlist/${productId}`, {
      method: 'DELETE',
    });
    const data: WishlistApiResponse = await res.json();

    if (!res.ok || data.status !== 'success') {
      return rejectWithValue(data.status || 'Failed to remove product');
    }
    return data;
  } catch (error) {
    console.error('[removeProductAsync]', error);
    return rejectWithValue('Network error');
  }
});

const initialState: WishlistState = {
  count: 0,
  products: [],

  loadingById: {},
  errorById: {},
  successById: {},

  removeLoadingById: {},
  removeErrorById: {},

  updateLoadingById: {},
  updateErrorById: {},

  isWishlistLoading: false,
  isWishlistError: false,
  isWishlistSuccess: false,

  isDeleteWishlistLoading: false,
  isDeleteWishlistError: false,
};

const wishlistSlice = createSlice({
  name: 'wishlist',
  initialState,
  reducers: {
    resetAddStatus: (state, action) => {
      const id = action.payload;
      delete state.successById[id];
      delete state.errorById[id];
    },
    resetRemoveStatus: (state, action) => {
      const id = action.payload;
      delete state.removeErrorById[id];
    },
    resetUpdateStatus: (state, action) => {
      const id = action.payload;
      delete state.updateErrorById[id];
    },
    clearWishlist: state => {
      state.count = 0;
      state.products = [];
    },
  },
  extraReducers: builder => {
    // Get User Wishlist
    builder
      .addCase(getUserWishlistAsync.pending, state => {
        state.isWishlistLoading = true;
        state.isWishlistError = false;
        state.isWishlistSuccess = false;
      })
      .addCase(getUserWishlistAsync.fulfilled, (state, action) => {
        state.isWishlistLoading = false;
        state.isWishlistSuccess = true;
        Object.assign(state, extractWishlistData(action.payload));
      })
      .addCase(getUserWishlistAsync.rejected, state => {
        state.isWishlistLoading = false;
        state.isWishlistError = true;
      });

    // Add To Wishlist
    builder
      .addCase(addToWishlistAsync.pending, (state, action) => {
        const id = action.meta.arg;
        state.loadingById[id] = true;
        state.errorById[id] = false;
        state.successById[id] = false;
      })
      .addCase(addToWishlistAsync.fulfilled, (state, action) => {
        const id = action.meta.arg;
        state.loadingById[id] = false;
        state.successById[id] = true;
        Object.assign(state, extractWishlistData(action.payload));
      })
      .addCase(addToWishlistAsync.rejected, (state, action) => {
        const id = action.meta.arg;
        state.loadingById[id] = false;
        state.errorById[id] = true;
      });

    // Remove Product From Wishlist
    builder
      .addCase(removeProductFromWishlistAsync.pending, (state, action) => {
        const id = action.meta.arg;
        state.removeLoadingById[id] = true;
        state.removeErrorById[id] = false;
      })
      .addCase(removeProductFromWishlistAsync.fulfilled, (state, action) => {
        const id = action.meta.arg;
        state.removeLoadingById[id] = false;
        state.isDeleteWishlistLoading = false;
        state.isDeleteWishlistError = false;

        state.products = state.products.filter(p => p._id !== id);
        state.count = action.payload.count;
      })
      .addCase(removeProductFromWishlistAsync.rejected, (state, action) => {
        const id = action.meta.arg;
        state.removeLoadingById[id] = false;
        state.removeErrorById[id] = true;
      });
  },
});

export const {
  resetAddStatus,
  resetRemoveStatus,
  resetUpdateStatus,
  clearWishlist,
} = wishlistSlice.actions;
export default wishlistSlice.reducer;
