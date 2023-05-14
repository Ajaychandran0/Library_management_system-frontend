import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import memberService from "./memberService";

const initialState = {
  members: [],
  isError: false,
  isLoading: false,
  isSuccess: false,
  message: "",
};

const generateAsyncThunk = (name, serviceCall) => {
  return createAsyncThunk(`members/${name}`, async (arg = "_", thunkAPI) => {
    try {
      const token = thunkAPI.getState().admin.admin.token;
      return await serviceCall(token, arg);
    } catch (error) {
      const message =
        (error.response && error.reponse.data && error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  });
};

// addNewMember(member)
export const addNewMember = generateAsyncThunk(
  "add",
  memberService.addNewMember
);
// getMembers()
export const getMembers = generateAsyncThunk(
  "getAll",
  memberService.getMembers
);
// deleteMember(memberId)
export const deleteMember = generateAsyncThunk(
  "delete",
  memberService.deleteMember
);
// blockMember(memberId)
export const blockMember = generateAsyncThunk(
  "block",
  memberService.blockMember
);
// filterMember(search)
export const filterMember = generateAsyncThunk(
  "filter",
  memberService.filterMember
);

export const membersSlice = createSlice({
  name: "members",
  initialState,
  reducers: {
    reset: () => initialState,
  },
  extraReducers: builder => {
    builder
      .addCase(addNewMember.pending, state => {
        state.isLoading = true;
      })
      .addCase(addNewMember.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.members.push(action.payload);
      })
      .addCase(addNewMember.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(getMembers.pending, state => {
        state.isLoading = true;
      })
      .addCase(getMembers.fulfilled, (state, action) => {
        state.isLoading = false;
        state.members = action.payload.members;
      })
      .addCase(getMembers.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(deleteMember.pending, state => {
        state.isLoading = true;
      })
      .addCase(deleteMember.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.members = state.members.filter(
          member => member._id !== action.payload.id
        );
      })
      .addCase(deleteMember.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(blockMember.pending, state => {
        state.isLoading = true;
      })
      .addCase(blockMember.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.members = state.members.map(member => {
          if (member._id !== action.payload._id) return member;
          return action.payload;
        });
      })
      .addCase(blockMember.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(filterMember.pending, state => {
        state.isLoading = true;
      })
      .addCase(filterMember.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.members = action.payload;
      })
      .addCase(filterMember.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export const { reset } = membersSlice.actions;
export default membersSlice.reducer;
