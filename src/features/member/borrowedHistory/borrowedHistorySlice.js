import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import borrowedHistoryService from "./borrowedHistoryService";

const initialState = {
  borrowedHistory: [],
  overdueItems: [],
  isError: false,
  isLoading: false,
  isSuccess: false,
  message: "",
  totalBooks: 0,
  totalPages: 0,
  itemsPerPage: 0,
};

const generateAsyncThunk = (name, serviceCall) => {
  return createAsyncThunk(
    `borrowedHistory/${name}`,
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

export const getBorrowedHistory = generateAsyncThunk(
  "getAll",
  borrowedHistoryService.getBorrowedHistory
);
export const filterBorrowedHistory = generateAsyncThunk(
  "filter",
  borrowedHistoryService.filterBorrowedHistory
);
export const getMemberOverdueItems = generateAsyncThunk(
  "overdueItems",
  borrowedHistoryService.getMemberOverdueItems
);

export const borrowedHistorySlice = createSlice({
  name: "borrowedHistory",
  initialState,
  reducers: {
    reset: () => initialState,
  },
  extraReducers: builder => {
    builder
      .addCase(getBorrowedHistory.pending, state => {
        state.isLoading = true;
      })
      .addCase(getBorrowedHistory.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.totalBooks = action.payload.totalItems;
        state.totalPages = action.payload.totalPages;
        state.itemsPerPage = action.payload.itemsPerPage;
        state.borrowedHistory = action.payload.returnedBooks;
      })
      .addCase(getBorrowedHistory.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(filterBorrowedHistory.pending, state => {
        state.isLoading = true;
      })
      .addCase(filterBorrowedHistory.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.totalBooks = action.payload.totalItems;
        state.totalPages = action.payload.totalPages;
        state.itemsPerPage = action.payload.itemsPerPage;
        state.borrowedHistory = action.payload.returnedBooks;
      })
      .addCase(filterBorrowedHistory.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(getMemberOverdueItems.pending, state => {
        state.isLoading = true;
      })
      .addCase(getMemberOverdueItems.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.overdueItems = action.payload.overdueItems;
      })
      .addCase(getMemberOverdueItems.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export const { reset } = borrowedHistorySlice.actions;
export default borrowedHistorySlice.reducer;
