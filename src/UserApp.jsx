import { Route, Routes, Navigate } from "react-router-dom";
import { store } from "./app/store";
import Layout from "./components/member/Layout";
import UserHome from "./pages/UserHome";
import PageNotFound from "./pages/PageNotFound";
import UserSignin from "./pages/UserSignin";
import About from "./pages/About";
// import StudentRegistrationForm from "./features/admin/members/test";
import ListAllCategories from "./features/member/category/ListAllCategories";
import ListBooksByCategory from "./features/member/books/ListBooksByCategory";
import MemberAccountPage from "./features/member/account/MemberAccountPage";
import RequestedBooksPage from "./features/member/requestedBooks/RequestedBooks";
import BorrowedHistory from "./features/member/borrowedHistory/ListBorrowedBookHistory";
import Wishlist from "./features/member/wishlist/Wishlist";
import BorrowedBooks from "./features/member/borrowedBooks/BorrowedBooks";
import LostBooks from "./features/member/lostBooks/LostBooks";
import OverdueItemsLlist from "./features/member/fine/OverdueItemsList";
import SingleBookPage from "./features/member/books/SingleBookPage";
import { getWishlistIds } from "./features/member/wishlist/wishlistSlice";

import { useSelector } from "react-redux";

function UserApp() {
  const { member } = useSelector(state => state.auth);
  if (member) store.dispatch(getWishlistIds());

  return (
    <Routes>
      <Route
        path="/login"
        element={member ? <Navigate to="/" /> : <UserSignin />}
      />
      <Route path="/" element={<Layout />}>
        <Route index element={<UserHome />} />
        <Route path="/about" element={<About />} />
        <Route path="/books/:bookId" element={<SingleBookPage />} />
        <Route path="categories" element={<ListAllCategories />} />
        <Route path="categories/:category" element={<ListBooksByCategory />} />
        <Route path="account" element={<MemberAccountPage />} />
        <Route
          path="account/requested_books"
          element={<RequestedBooksPage />}
        />
        <Route path="account/wishlist" element={<Wishlist />} />
        <Route path="account/borrowed_books" element={<BorrowedHistory />} />
        <Route path="account/books_in_possession" element={<BorrowedBooks />} />
        <Route path="account/lost_books" element={<LostBooks />} />
        <Route path="/account/fine" element={<OverdueItemsLlist />} />
        <Route path="*" element={<PageNotFound />} />
      </Route>
    </Routes>
  );
}

export default UserApp;
