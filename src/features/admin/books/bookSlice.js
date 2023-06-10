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
  return createAsyncThunk(`books/${name}`, async (arg = "_", thunkAPI) => {
    try {
      const token = thunkAPI.getState().admin.admin.token;
      return await serviceCall(token, arg);
    } catch (error) {
      const message = error.message || error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  });
};

// addNewBook(book)
export const addNewBook = generateAsyncThunk("add", bookService.addNewBook);
//getBooks()
export const getBooks = generateAsyncThunk("getAll", bookService.getBooks);
// editBook(updatedBook)
export const editBook = generateAsyncThunk("edit", bookService.editBook);
// deleteBook(bookId)
export const deleteBook = generateAsyncThunk("delete", bookService.deleteBook);
// blockBook(bookId)
export const blockBook = generateAsyncThunk("block", bookService.blockBook);
// filterBook(search)
export const filterBook = generateAsyncThunk("filter", bookService.filterBook);

export const booksSlice = createSlice({
  name: "books",
  initialState,
  reducers: {
    reset: () => initialState,
  },
  extraReducers: builder => {
    builder
      .addCase(addNewBook.pending, state => {
        state.isLoading = true;
      })
      .addCase(addNewBook.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.message = "addSuccessful";
        state.books.push(action.payload);
      })
      .addCase(addNewBook.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
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
      .addCase(editBook.pending, state => {
        state.isLoading = true;
      })
      .addCase(editBook.fulfilled, (state, action) => {
        state.message = action.payload.success;
        state.isLoading = false;
        state.isSuccess = true;
      })
      .addCase(editBook.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(deleteBook.pending, state => {
        state.isLoading = true;
      })
      .addCase(deleteBook.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.books = state.books.filter(
          book => book._id !== action.payload.id
        );
      })
      .addCase(deleteBook.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(blockBook.pending, state => {
        state.isLoading = true;
      })
      .addCase(blockBook.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.books = state.books.map(book => {
          if (book._id !== action.payload._id) return book;
          return action.payload;
        });
      })
      .addCase(blockBook.rejected, (state, action) => {
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
        state.totalBooks = action.payload.totalItems;
        state.totalPages = action.payload.totalPages;
        state.itemsPerPage = action.payload.itemsPerPage;
        state.books = action.payload.books;
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
