import { Route, Routes, Navigate } from "react-router-dom";
import { store } from "./app/store";
import { lazy, Suspense } from "react";
import { getWishlistIds } from "./features/member/wishlist/wishlistSlice";
import { useSelector } from "react-redux";

const Layout = lazy(() => import("./components/member/Layout"));
const UserHome = lazy(() => import("./pages/UserHome"));
const PageNotFound = lazy(() => import("./pages/PageNotFound"));
const UserSignin = lazy(() => import("./pages/UserSignin"));
const About = lazy(() => import("./pages/About"));
const ListAllCategories = lazy(() =>
  import("./features/member/category/ListAllCategories")
);
const ListBooksByCategory = lazy(() =>
  import("./features/member/books/ListBooksByCategory")
);
const MemberAccountPage = lazy(() =>
  import("./features/member/account/MemberAccountPage")
);
const RequestedBooksPage = lazy(() =>
  import("./features/member/requestedBooks/RequestedBooks")
);
const BorrowedHistory = lazy(() =>
  import("./features/member/borrowedHistory/ListBorrowedBookHistory")
);
const Wishlist = lazy(() => import("./features/member/wishlist/Wishlist"));
const BorrowedBooks = lazy(() =>
  import("./features/member/borrowedBooks/BorrowedBooks")
);
const LostBooks = lazy(() => import("./features/member/lostBooks/LostBooks"));
const OverdueItemsLlist = lazy(() =>
  import("./features/member/borrowedHistory/OverdueItemsList")
);
const SingleBookPage = lazy(() =>
  import("./features/member/books/SingleBookPage")
);
const PaymentHandler = lazy(() =>
  import("./features/member/payment/paymentHandler")
);

function UserApp() {
  const { member } = useSelector(state => state.auth);
  if (member) store.dispatch(getWishlistIds());

  return (
    <Routes>
      <Route
        path="/login"
        element={
          member ? (
            <Navigate to="/" />
          ) : (
            <Suspense fallback="Loading...">
              <UserSignin />
            </Suspense>
          )
        }
      />
      <Route
        path="/"
        element={
          <Suspense fallback="Loading...">
            <Layout />
          </Suspense>
        }
      >
        <Route
          index
          element={
            <Suspense>
              <UserHome />
            </Suspense>
          }
        />
        <Route
          path="/about"
          element={
            <Suspense fallback="Loading...">
              <About />
            </Suspense>
          }
        />
        <Route
          path="/books/:bookId"
          element={
            <Suspense fallback="Loading...">
              <SingleBookPage />
            </Suspense>
          }
        />
        <Route
          path="categories"
          element={
            <Suspense fallback="Loading...">
              <ListAllCategories />
            </Suspense>
          }
        />
        <Route
          path="categories/:category"
          element={
            <Suspense fallback="Loading...">
              <ListBooksByCategory />
            </Suspense>
          }
        />
        <Route
          path="account"
          element={
            <Suspense fallback="Loading...">
              <MemberAccountPage />
            </Suspense>
          }
        />
        <Route
          path="account/requested_books"
          element={
            <Suspense fallback="Loading...">
              <RequestedBooksPage />
            </Suspense>
          }
        />
        <Route
          path="account/wishlist"
          element={
            <Suspense fallback="Loading...">
              <Wishlist />
            </Suspense>
          }
        />
        <Route
          path="account/borrowed_books"
          element={
            <Suspense fallback="Loading...">
              <BorrowedHistory />
            </Suspense>
          }
        />
        <Route
          path="account/books_in_possession"
          element={
            <Suspense fallback="Loading...">
              <BorrowedBooks />
            </Suspense>
          }
        />
        <Route
          path="account/lost_books"
          element={
            <Suspense fallback="Loading...">
              <LostBooks />
            </Suspense>
          }
        />
        <Route
          path="/account/overdue"
          element={
            <Suspense fallback="Loading...">
              <OverdueItemsLlist />
            </Suspense>
          }
        />
        <Route
          path="/payment"
          element={
            <Suspense fallback="Loading...">
              <PaymentHandler />
            </Suspense>
          }
        />
        <Route
          path="*"
          element={
            <Suspense fallback="Loading...">
              <PageNotFound />
            </Suspense>
          }
        />
      </Route>
    </Routes>
  );
}

export default UserApp;
