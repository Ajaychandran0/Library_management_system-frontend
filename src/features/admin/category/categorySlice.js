import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  addCategory,
  fetchCategories,
  deleteCategoryById,
  blockCategoryById,
  searchCategory,
} from "./categoryService";

const initialState = {
  categories: [],
  isError: false,
  isLoading: false,
  isSuccess: false,
  message: "",
  totalCategories: 0,
};

const generateAsyncThunk = (name, serviceCall) => {
  return createAsyncThunk(`category/${name}`, async (arg = "_", thunkAPI) => {
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

// addNewCategory(category)
export const addNewCategory = generateAsyncThunk("add", addCategory);
// getAllCategories()
export const getAllCategories = generateAsyncThunk("getAll", fetchCategories);
// deleteCategory(categoryId)
export const deleteCategory = generateAsyncThunk("delete", deleteCategoryById);
// blockCategory(categoryId)
export const blockCategory = generateAsyncThunk("block", blockCategoryById);
// filterCategory(search)
export const filterCategory = generateAsyncThunk("filter", searchCategory);

export const categorySlice = createSlice({
  name: "category",
  initialState,
  reducers: {
    reset: () => initialState,
  },
  extraReducers: builder => {
    builder
      .addCase(addNewCategory.pending, state => {
        state.isLoading = true;
      })
      .addCase(addNewCategory.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.categories.push(action.payload);
      })
      .addCase(addNewCategory.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(getAllCategories.pending, state => {
        state.isLoading = true;
      })
      .addCase(getAllCategories.fulfilled, (state, action) => {
        state.isLoading = false;
        state.totalCategories = action.payload.totalItems;
        state.categories = action.payload.categories;
      })
      .addCase(getAllCategories.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(deleteCategory.pending, state => {
        state.isLoading = true;
      })
      .addCase(deleteCategory.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.categories = state.categories.filter(
          category => category._id !== action.payload.id
        );
      })
      .addCase(deleteCategory.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(blockCategory.pending, state => {
        state.isLoading = true;
      })
      .addCase(blockCategory.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.categories = state.categories.map(category => {
          if (category._id !== action.payload._id) return category;
          return action.payload;
        });
      })
      .addCase(blockCategory.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(filterCategory.pending, state => {
        state.isLoading = true;
      })
      .addCase(filterCategory.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.categories = action.payload;
      })
      .addCase(filterCategory.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export const { reset } = categorySlice.actions;
export default categorySlice.reducer;
