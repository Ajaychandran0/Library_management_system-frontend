import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import bookService from "./bookService";

const initialState = {
  books: [],
  isError: false,
  isLoading: false,
  isSuccess: false,
  message: "",
  totalBooks: 0,
  totalPages: 0,
  itemsPerPage: 0,
};

const generateAsyncThunk = (name, serviceCall) => {
  return createAsyncThunk(`books/${name}`, async (filter, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.member;
      return await serviceCall({ token, filter });
    } catch (error) {
      const message = error.message || error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  });
};

export const getBooks = generateAsyncThunk("getAll", bookService.getBooks);
export const filterBooks = generateAsyncThunk(
  "filter",
  bookService.filterBooks
);

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
        state.message = "success";
        state.totalBooks = action.payload.totalItems;
        state.totalPages = action.payload.totalPages;
        state.itemsPerPage = action.payload.itemsPerPage;
        state.books = action.payload.books;
      })
      .addCase(getBooks.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(filterBooks.pending, state => {
        state.isLoading = true;
      })
      .addCase(filterBooks.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.totalBooks = action.payload.totalItems;
        state.totalPages = action.payload.totalPages;
        state.itemsPerPage = action.payload.itemsPerPage;
        state.books = action.payload.books;
      })
      .addCase(filterBooks.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export const { reset } = booksSlice.actions;
export default booksSlice.reducer;
