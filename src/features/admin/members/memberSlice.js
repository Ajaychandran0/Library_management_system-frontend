import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import memberService from "./memberService";

const initialState = {
  members: [],
  isError: false,
  isLoading: false,
  isSuccess: false,
  message: "",
};

// Add new member (give new memberships)
export const addNewMember = createAsyncThunk(
  "members/add",
  async (member, thunkAPI) => {
    try {
      return await memberService.addNewMember(member);
    } catch (error) {
      const message =
        (error.response && error.reponse.data && error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const getMembers = createAsyncThunk(
  "members/getAll",
  async (_, thunkAPI) => {
    try {
      const token = thunkAPI.getState().admin.admin.token;
      return await memberService.getMembers(token);
    } catch (error) {
      const message =
        (error.response && error.reponse.data && error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const deleteMember = createAsyncThunk(
  "members/delete",
  async (memberId, thunkAPI) => {
    try {
      const token = thunkAPI.getState().admin.admin.token;
      return await memberService.deleteMember(memberId, token);
    } catch (error) {
      const message =
        (error.response && error.reponse.data && error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const blockMember = createAsyncThunk(
  "members/block",
  async (memberId, thunkAPI) => {
    try {
      const token = thunkAPI.getState().admin.admin.token;
      return await memberService.blockMember(memberId, token);
    } catch (error) {
      const message =
        (error.response && error.reponse.data && error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const filterMember = createAsyncThunk(
  "members/filter",
  async (search, thunkAPI) => {
    try {
      const token = thunkAPI.getState().admin.admin.token;
      return await memberService.filterMember(search, token);
    } catch (error) {
      const message =
        (error.response && error.reponse.data && error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const membersSlice = createSlice({
  name: "members",
  initialState,
  reducers: {
    reset: () => initialState,
    notSuccess: state => {
      console.log(state, "Hey this is stupid");
      return { ...state, isSuccess: false };
    },
  },
  extraReducers: builder => {
    builder
      .addCase(addNewMember.pending, state => {
        state.isLoading = true;
      })
      .addCase(addNewMember.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        console.log(action.payload, "in add member successful state");
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

export const { reset, notSuccess } = membersSlice.actions;
export default membersSlice.reducer;
