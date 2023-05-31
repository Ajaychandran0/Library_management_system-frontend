import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import issuedBookService from "./issuedBookService";

const initialState = {
  issuedBooks: [],
  issueError: false,
  issueLoading: false,
  issueSuccess: false,
  issueMessage: "",
  totalIssuedBooks: 0,
};

const generateAsyncThunk = (name, serviceCall) => {
  return createAsyncThunk(
    `issuedBooks/${name}`,
    async (arg = "_", thunkAPI) => {
      try {
        const token = thunkAPI.getState().admin.admin.token;
        return await serviceCall(token, arg);
      } catch (error) {
        const message = error.message || error.toString();
        return thunkAPI.rejectWithValue(message);
      }
    }
  );
};

export const getAllIssuedBooks = generateAsyncThunk(
  "getAll",
  issuedBookService.getAllIssuedBooks
);
export const issueBook = generateAsyncThunk(
  "issue",
  issuedBookService.issueBook
);

export const IssuedBooksSlice = createSlice({
  name: "issuedBooks",
  initialState,
  reducers: {
    issueReset: () => initialState,
  },
  extraReducers: builder => {
    builder

      .addCase(getAllIssuedBooks.pending, state => {
        state.issueLoading = true;
      })
      .addCase(getAllIssuedBooks.fulfilled, (state, action) => {
        state.issueLoading = false;
        state.issueSuccess = true;
        state.totalIssuedBooks = action.payload.totalItems;
        state.issuedBooks = action.payload.issuedBooks;
      })
      .addCase(getAllIssuedBooks.rejected, (state, action) => {
        state.issueLoading = false;
        state.issueError = true;
        state.issueMessage = action.payload;
      })
      .addCase(issueBook.pending, state => {
        state.issueLoading = true;
      })
      .addCase(issueBook.fulfilled, state => {
        state.issueLoading = false;
        state.issueSuccess = true;
        state.issueMessage = "Book Issued Successfully";
      })
      .addCase(issueBook.rejected, (state, action) => {
        state.issueLoading = false;
        state.issueError = true;
        state.issueMessage = action.payload;
      });
  },
});

export const { issueReset } = IssuedBooksSlice.actions;
export default IssuedBooksSlice.reducer;
