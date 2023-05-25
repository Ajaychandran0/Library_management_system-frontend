import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import requestedBookService from "./requestedBookService";

const initialState = {
  requests: [],
  isError: false,
  isLoading: false,
  isSuccess: false,
  message: "",
  totalBooks: 0,
};

const generateAsyncThunk = (name, serviceCall) => {
  return createAsyncThunk(`reqbooks/${name}`, async (arg = "_", thunkAPI) => {
    try {
      const token = thunkAPI.getState().admin.admin.token;
      return await serviceCall(token, arg);
    } catch (error) {
      const message = error.message || error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  });
};

export const getAllBookRequests = generateAsyncThunk(
  "getAllRequests",
  requestedBookService.getAllBookRequests
);
export const issueBook = generateAsyncThunk(
  "issueBook",
  requestedBookService.issueBook
);
export const filterReqBook = generateAsyncThunk(
  "filter",
  requestedBookService.filterBook
);

export const adminReqBooksSlice = createSlice({
  name: "adminBookReqs",
  initialState,
  reducers: {
    reset: () => initialState,
  },
  extraReducers: builder => {
    builder

      .addCase(getAllBookRequests.pending, state => {
        state.isLoading = true;
      })
      .addCase(getAllBookRequests.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.totalBooks = action.payload.totalItems;
        state.requests = action.payload.requests;
      })
      .addCase(getAllBookRequests.rejected, (state, action) => {
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

export const { reset } = adminReqBooksSlice.actions;
export default adminReqBooksSlice.reducer;
