import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import returnedBookService from "./returnedBookService";

const initialState = {
  returnedBooks: [],
  returnError: false,
  returnLoading: false,
  returnSuccess: false,
  returnMessage: "",
  totalreturnedBooks: 0,
};

const generateAsyncThunk = (name, serviceCall) => {
  return createAsyncThunk(
    `returnedBooks/${name}`,
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

export const getReturnedBooksByMember = generateAsyncThunk(
  "getByMember",
  returnedBookService.getReturnedBooksByMember
);
export const returnBook = generateAsyncThunk(
  "return",
  returnedBookService.returnBook
);

export const ReturnedBooksSlice = createSlice({
  name: "returnedBooks",
  initialState,
  reducers: {
    returnReset: () => initialState,
  },
  extraReducers: builder => {
    builder

      .addCase(getReturnedBooksByMember.pending, state => {
        state.returnLoading = true;
      })
      .addCase(getReturnedBooksByMember.fulfilled, (state, action) => {
        state.returnLoading = false;
        state.returnSuccess = true;
        state.totalreturnedBooks = action.payload.totalItems;
        state.returnedBooks = action.payload.returnedBooks;
      })
      .addCase(getReturnedBooksByMember.rejected, (state, action) => {
        state.returnLoading = false;
        state.returnError = true;
        state.returnMessage = action.payload;
      })
      .addCase(returnBook.pending, state => {
        state.returnLoading = true;
      })
      .addCase(returnBook.fulfilled, state => {
        state.returnLoading = false;
        state.returnSuccess = true;
        state.returnMessage = "Book Returned Successfully";
      })
      .addCase(returnBook.rejected, (state, action) => {
        state.returnLoading = false;
        state.returnError = true;
        state.returnMessage = action.payload;
      });
  },
});

export const { returnReset } = ReturnedBooksSlice.actions;
export default ReturnedBooksSlice.reducer;
