import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import booksInPossessionService from "./borrowedBookService";

const initialState = {
  borrowedBooks: [],
  isError: false,
  isLoading: false,
  isSuccess: false,
  message: "",
  totalBorrowedBooks: 0,
};

const generateAsyncThunk = (name, serviceCall) => {
  return createAsyncThunk(
    `borrowedBooks/${name}`,
    async (arg = "_", thunkAPI) => {
      try {
        const token = thunkAPI.getState().auth.member;
        return await serviceCall(token, arg);
      } catch (error) {
        const message = error.message || error.toString();
        return thunkAPI.rejectWithValue(message);
      }
    }
  );
};

export const getBorrowedBooks = generateAsyncThunk(
  "getAll",
  booksInPossessionService.getBorrowedBooks
);

export const borrowedBookSlice = createSlice({
  name: "borrowedBooks",
  initialState,
  reducers: {
    reset: () => initialState,
  },
  extraReducers: builder => {
    builder

      .addCase(getBorrowedBooks.pending, state => {
        state.isLoading = true;
      })
      .addCase(getBorrowedBooks.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.totalBorrowedBooks = action.payload.totalItems;
        state.borrowedBooks = action.payload.borrowedBooks;
      })
      .addCase(getBorrowedBooks.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export const { reset } = borrowedBookSlice.actions;
export default borrowedBookSlice.reducer;
