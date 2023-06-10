import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import lostBookService from "./lostBookService";

const initialState = {
  lostBooks: [],
  isError: false,
  isLoading: false,
  isSuccess: false,
  message: "",
  totalBooks: 0,
};

const generateAsyncThunk = (name, serviceCall) => {
  return createAsyncThunk(
    `memberLostBooks/${name}`,
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

export const getMemberLostBooks = generateAsyncThunk(
  "getAll",
  lostBookService.getMemberLostBooks
);

export const memberLostBookSlice = createSlice({
  name: "memberLostBooks",
  initialState,
  reducers: {
    reset: () => initialState,
  },
  extraReducers: builder => {
    builder

      .addCase(getMemberLostBooks.pending, state => {
        state.isLoading = true;
      })
      .addCase(getMemberLostBooks.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.totalBooks = action.payload.totalItems;
        state.lostBooks = action.payload.lostBooks;
      })
      .addCase(getMemberLostBooks.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export const { reset } = memberLostBookSlice.actions;
export default memberLostBookSlice.reducer;
