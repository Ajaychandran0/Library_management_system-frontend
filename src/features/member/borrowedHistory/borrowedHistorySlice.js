import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import borrowedHistoryService from "./borrowedHistoryService";

const initialState = {
  borrowedHistory: [],
  isError: false,
  isLoading: false,
  isSuccess: false,
  message: "",
  totalBooks: 0,
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
        state.borrowedHistory = action.payload.returnedBooks;
      })
      .addCase(getBorrowedHistory.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export const { reset } = borrowedHistorySlice.actions;
export default borrowedHistorySlice.reducer;
