import { configureStore } from "@reduxjs/toolkit";
import adminReducer from "../features/admin/auth/authSlice";
import authReducer from "../features/member/auth/authSlice";
import membersReducer from "../features/admin/members/memberSlice";
import categoryReducer from "../features/admin/category/categorySlice";
import booksReducer from "../features/admin/books/bookSlice";
import reqBooksReducer from "../features/member/requestedBooks/requestedBooksSlice";
import wishlistReducer from "../features/member/wishlist/wishlistSlice";
import adminReqBooksReducer from "../features/admin/requestedBooks/requestedBookSlice";
import issuedBooksReducer from "../features/admin/issuedBooks/issuedBookSlice";
import borrowedBooksReducer from "../features/member/borrowedBooks/borrowedBookSlice";
import returnedBooksReducer from "../features/admin/returnedBooks/returnedBookSlice";
import borrowedHistoryReducer from "../features/member/borrowedHistory/borrowedHistorySlice";
import lostBooksReducer from "../features/admin/lostBooks/lostBookSlice";
import memberLostBookReducer from "../features/member/lostBooks/lostBookSlice";
import memberAccountReducer from "../features/member/account/memberAccountSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    admin: adminReducer,
    members: membersReducer,
    categories: categoryReducer,
    books: booksReducer,
    reqBooks: reqBooksReducer,
    wishlist: wishlistReducer,
    adminBookReqs: adminReqBooksReducer,
    issuedBooks: issuedBooksReducer,
    borrowedBooks: borrowedBooksReducer,
    returnedBooks: returnedBooksReducer,
    borrowedHistory: borrowedHistoryReducer,
    lostBooks: lostBooksReducer,
    memberLostBooks: memberLostBookReducer,
    memberAccount: memberAccountReducer,
  },
});
