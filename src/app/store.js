import { configureStore } from "@reduxjs/toolkit";
import adminReducer from "../features/admin/adminSlice";

export const store = configureStore({
  reducer: {
    admin: adminReducer,
  },
});
