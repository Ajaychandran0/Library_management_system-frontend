import { configureStore } from "@reduxjs/toolkit";
import adminReducer from "../features/admin/auth/authSlice";
import authReducer from "../features/member/auth/authSlice";
import membersReducer from "../features/admin/members/memberSlice";
import categoryReducer from "../features/admin/category/categorySlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    admin: adminReducer,
    members: membersReducer,
    categories: categoryReducer,
  },
});
