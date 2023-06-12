import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import memberAccountService from "./memberAccountService";

const initialState = {
  memberDetails: {},
  isError: false,
  isLoading: false,
  isSuccess: false,
  message: "",
};

const generateAsyncThunk = (name, serviceCall) => {
  return createAsyncThunk(
    `memberAccount/${name}`,
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

export const getMemberDetails = generateAsyncThunk(
  "get",
  memberAccountService.getMemberDetails
);

export const memberAccountSlice = createSlice({
  name: "memberAccount",
  initialState,
  reducers: {
    reset: () => initialState,
  },
  extraReducers: builder => {
    builder

      .addCase(getMemberDetails.pending, state => {
        state.isLoading = true;
      })
      .addCase(getMemberDetails.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.memberDetails = action.payload.memberDetails;
      })
      .addCase(getMemberDetails.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export const { reset } = memberAccountSlice.actions;
export default memberAccountSlice.reducer;
