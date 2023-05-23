import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import bookService from "./bookService";

const initialState = {
  books: [],
  isError: false,
  isLoading: false,
  isSuccess: false,
  message: "",
};

const generateAsyncThunk = (name, serviceCall) => {
  return createAsyncThunk(`books/${name}`, async (arg = "_", thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.member;
      return await serviceCall(token, arg);
    } catch (error) {
      const message = error.message || error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  });
};

export const getBooks = generateAsyncThunk("getAll", bookService.getBooks);
export const filterBook = generateAsyncThunk("filter", bookService.filterBook);

export const booksSlice = createSlice({
  name: "books",
  initialState,
  reducers: {
    reset: () => initialState,
  },
  extraReducers: builder => {
    builder
      .addCase(getBooks.pending, state => {
        state.isLoading = true;
      })
      .addCase(getBooks.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.books = action.payload.books;
      })
      .addCase(getBooks.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(filterBook.pending, state => {
        state.isLoading = true;
      })
      .addCase(filterBook.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.books = action.payload;
      })
      .addCase(filterBook.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export const { reset } = booksSlice.actions;
export default booksSlice.reducer;
