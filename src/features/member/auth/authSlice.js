import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import authService from "./authService";

// Get member from localStorage
const member = JSON.parse(localStorage.getItem("member"));

const initialState = {
  member: member ? member : null,
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

// Login member
export const login = createAsyncThunk(
  "auth/login",
  async (member, thunkAPI) => {
    try {
      return await authService.login(member);
    } catch (error) {
      const message =
        (error.response && error.reponse.data && error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Logout member
export const logout = createAsyncThunk("auth/logout", async () => {
  await authService.logout();
});

export const authSlice = createSlice({
  name: "auth",
  initialState,

  reducers: {
    reset: state => {
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = false;
      state.message = "";
    },
  },
  extraReducers: builder => {
    builder
      .addCase(login.pending, state => {
        state.isLoading = true;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.member = action.payload;
      })
      .addCase(login.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.member = null;
      })
      .addCase(logout.fulfilled, state => {
        state.member = null;
      });
  },
});

export const { reset } = authSlice.actions;
export default authSlice.reducer;
