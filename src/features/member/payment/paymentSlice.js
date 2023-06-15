import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import paymentService from "./paymentService";

const initialState = {
  paymentError: false,
  paymentLoading: false,
  paymentSuccess: false,
  paymentMessage: "",
  paymentURL: "",
  overdueId: "",
};

const generateAsyncThunk = (name, serviceCall) => {
  return createAsyncThunk(`payment/${name}`, async (arg = "_", thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.member;
      return await serviceCall(token, arg);
    } catch (error) {
      const paymentMessage = error.paymentMessage || error.toString();
      return thunkAPI.rejectWithValue(paymentMessage);
    }
  });
};

export const getPaymentUrl = generateAsyncThunk(
  "overdue",
  paymentService.getPaymentUrl
);
export const updatePaymentSuccess = generateAsyncThunk(
  "success",
  paymentService.updatePaymentSuccess
);

export const paymentSlice = createSlice({
  name: "payment",
  initialState,
  reducers: {
    reset: () => initialState,
    throwPaymentError: (state, action) => {
      state.paymentMessage = action.payload;
      state.paymentError = true;
    },
    setPaymentSuccess: (state, action) => {
      state.paymentMessage = "payment successful";
      state.overdueId = action.payload;
      state.paymentSuccess = true;
    },
  },
  extraReducers: builder => {
    builder

      .addCase(getPaymentUrl.pending, state => {
        state.paymentLoading = true;
      })
      .addCase(getPaymentUrl.fulfilled, (state, action) => {
        state.paymentLoading = false;
        state.paymentSuccess = true;
        state.paymentURL = action.payload.paymentUrl;
        state.sessionId = action.payload.sessionId;
      })
      .addCase(getPaymentUrl.rejected, (state, action) => {
        state.paymentLoading = false;
        state.paymentError = true;
        state.paymentMessage = action.payload;
      })
      .addCase(updatePaymentSuccess.pending, state => {
        state.paymentLoading = true;
      })
      .addCase(updatePaymentSuccess.fulfilled, state => {
        state.paymentLoading = false;
        state.paymentSuccess = true;
        state.paymentMessage = "updatedSuccessfully";
      })
      .addCase(updatePaymentSuccess.rejected, (state, action) => {
        state.paymentLoading = false;
        state.paymentError = true;
        state.paymentMessage = action.payload;
      });
  },
});

export const { reset, throwPaymentError, setPaymentSuccess } =
  paymentSlice.actions;
export default paymentSlice.reducer;
