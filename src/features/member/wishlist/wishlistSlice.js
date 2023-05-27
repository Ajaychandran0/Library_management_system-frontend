import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import wishlistService from "./wishlistService";

const initialState = {
  wishlistIds: [],
  wishlist: [],
  isError: false,
  isLoading: false,
  isSuccess: false,
  message: "",
  totalBooks: 0,
};

const generateAsyncThunk = (name, serviceCall) => {
  return createAsyncThunk(`wishlist/${name}`, async (arg = "_", thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.member;
      return await serviceCall(token, arg);
    } catch (error) {
      const message = error.message || error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  });
};

export const addToWishlist = generateAsyncThunk(
  "add",
  wishlistService.addToWishlist
);
export const getWishlistIds = generateAsyncThunk(
  "getIds",
  wishlistService.getWishlistIds
);
export const getWishlist = generateAsyncThunk(
  "getAll",
  wishlistService.getWishlist
);
export const removeFromWishlist = generateAsyncThunk(
  "delete",
  wishlistService.removeFromWishlist
);
export const filterWishlist = generateAsyncThunk(
  "filter",
  wishlistService.filterWishlist
);

export const wishlistSlice = createSlice({
  name: "wishlist",
  initialState,
  reducers: {
    reset: state => {
      state.wishlist = [];
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = false;
      state.message = "";
    },
  },
  extraReducers: builder => {
    builder
      .addCase(addToWishlist.pending, state => {
        state.isLoading = true;
      })
      .addCase(addToWishlist.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.message = "addedToWishlist";
        state.wishlistIds.push(action.payload.id);
      })
      .addCase(addToWishlist.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(getWishlistIds.pending, state => {
        state.isLoading = true;
      })
      .addCase(getWishlistIds.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.wishlistIds = action.payload;
      })
      .addCase(getWishlistIds.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(getWishlist.pending, state => {
        state.isLoading = true;
      })
      .addCase(getWishlist.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.totalBooks = action.payload.totalItems;
        state.wishlist = action.payload.books;
      })
      .addCase(getWishlist.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(removeFromWishlist.pending, state => {
        state.isLoading = true;
      })
      .addCase(removeFromWishlist.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.message = "removedFromWishlist";
        state.wishlistIds = state.wishlistIds.filter(
          book => book !== action.payload.id
        );
        state.wishlist = state.wishlist.filter(
          book => book._id !== action.payload.id
        );
      })
      .addCase(removeFromWishlist.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(filterWishlist.pending, state => {
        state.isLoading = true;
      })
      .addCase(filterWishlist.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.wishlist = action.payload;
      })
      .addCase(filterWishlist.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export const { reset } = wishlistSlice.actions;
export default wishlistSlice.reducer;
