import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import lostBookService from "./lostBookService";

const initialState = {
  lostBooks: [],
  lostError: false,
  lostLoading: false,
  lostSuccess: false,
  lostMessage: "",
  totalLostBooks: 0,
};

const generateAsyncThunk = (name, serviceCall) => {
  return createAsyncThunk(`lostBooks/${name}`, async (arg = "_", thunkAPI) => {
    try {
      const token = thunkAPI.getState().admin.admin.token;
      return await serviceCall(token, arg);
    } catch (error) {
      const message = error.message || error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  });
};

export const getAllLostBooks = generateAsyncThunk(
  "getAll",
  lostBookService.getAllLostBooks
);
export const addToLostBooks = generateAsyncThunk(
  "add",
  lostBookService.addToLostBooks
);

export const lostBooksSlice = createSlice({
  name: "lostBooks",
  initialState,
  reducers: {
    lostReset: () => initialState,
  },
  extraReducers: builder => {
    builder

      .addCase(getAllLostBooks.pending, state => {
        state.lostLoading = true;
      })
      .addCase(getAllLostBooks.fulfilled, (state, action) => {
        state.lostLoading = false;
        state.lostSuccess = true;
        state.totalLostBooks = action.payload.totalItems;
        state.lostBooks = action.payload.lostBooks;
      })
      .addCase(getAllLostBooks.rejected, (state, action) => {
        state.lostLoading = false;
        state.lostError = true;
        state.lostMessage = action.payload;
      })
      .addCase(addToLostBooks.pending, state => {
        state.lostLoading = true;
      })
      .addCase(addToLostBooks.fulfilled, state => {
        state.lostLoading = false;
        state.lostSuccess = true;
        state.lostMessage = "Book added to lost books successfully";
      })
      .addCase(addToLostBooks.rejected, (state, action) => {
        state.lostLoading = false;
        state.lostError = true;
        state.lostMessage = action.payload;
      });
  },
});

export const { lostReset } = lostBooksSlice.actions;
export default lostBooksSlice.reducer;
