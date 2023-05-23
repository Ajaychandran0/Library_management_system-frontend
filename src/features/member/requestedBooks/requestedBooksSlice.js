import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import requestedBookService from "./requestedBookService";

const initialState = {
  reqBooks: [],
  isError: false,
  isLoading: false,
  isSuccess: false,
  message: "",
  totalBookReqs: 0,
};

const generateAsyncThunk = (name, serviceCall) => {
  return createAsyncThunk(`reqbooks/${name}`, async (arg = "_", thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.member;
      return await serviceCall(token, arg);
    } catch (error) {
      const message = error.message || error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  });
};

export const requestBook = generateAsyncThunk(
  "add",
  requestedBookService.requestBook
);
export const getReqBooks = generateAsyncThunk(
  "getAll",
  requestedBookService.getReqBooks
);
export const removeBookRequest = generateAsyncThunk(
  "delete",
  requestedBookService.removeBookRequest
);
export const filterReqBook = generateAsyncThunk(
  "filter",
  requestedBookService.filterBook
);

export const reqBooksSlice = createSlice({
  name: "reqBooks",
  initialState,
  reducers: {
    reset: () => initialState,
  },
  extraReducers: builder => {
    builder
      .addCase(requestBook.pending, state => {
        state.isLoading = true;
      })
      .addCase(requestBook.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.message = "Book request sent successfully";
        state.reqBooks.push(action.payload);
      })
      .addCase(requestBook.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(getReqBooks.pending, state => {
        state.isLoading = true;
      })
      .addCase(getReqBooks.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.totalBookReqs = action.payload.totalItems;
        state.reqBooks = action.payload.books;
      })
      .addCase(getReqBooks.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(removeBookRequest.pending, state => {
        state.isLoading = true;
      })
      .addCase(removeBookRequest.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.reqBooks = state.reqBooks.filter(
          book => book?._id !== action.payload.id
        );
      })
      .addCase(removeBookRequest.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(filterReqBook.pending, state => {
        state.isLoading = true;
      })
      .addCase(filterReqBook.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.books = action.payload;
      })
      .addCase(filterReqBook.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export const { reset } = reqBooksSlice.actions;
export default reqBooksSlice.reducer;
