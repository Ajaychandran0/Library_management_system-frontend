import { Route, Routes, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { lazy, Suspense } from "react";

import LoadingPage from "./components/common/Loading/LoadingPage";
const AdminLayout = lazy(() => import("./components/admin/AdminLayout"));
const AdminDashboard = lazy(() => import("./pages/AdminDashboard"));
const PageNotFound = lazy(() => import("./pages/PageNotFound"));
const AdminSignin = lazy(() => import("./pages/AdminSignin"));
const ListMembers = lazy(() => import("./features/admin/members/ListMembers"));
const AddMember = lazy(() => import("./features/admin/members/AddMember"));
const EditMember = lazy(() => import("./features/admin/members/EditMember"));
const ListCategories = lazy(() =>
  import("./features/admin/category/ListCategories")
);
const AddCategory = lazy(() => import("./features/admin/category/AddCategory"));
const EditCategory = lazy(() =>
  import("./features/admin/category/EditCategory")
);
const ListBooks = lazy(() => import("./features/admin/books/ListBooks"));
const AddBook = lazy(() => import("./features/admin/books/AddBooks"));
const EditBook = lazy(() => import("./features/admin/books/EditBooks"));
const ListRequestedBooks = lazy(() =>
  import("./features/admin/requestedBooks/ListRequestedBooks")
);
const ListIssuedBooks = lazy(() =>
  import("./features/admin/issuedBooks/ListIssuedBooks")
);
const IssueNewBook = lazy(() =>
  import("./features/admin/issuedBooks/IssueNewBook")
);
const AddLostBook = lazy(() =>
  import("./features/admin/lostBooks/AddLostBook")
);
const ListLostBooks = lazy(() =>
  import("./features/admin/lostBooks/ListLostBooks")
);
const ListAllOverdueItems = lazy(() =>
  import("./features/admin/returnedBooks/ListAllOverdueItems")
);

function AdminApp() {
  const { admin } = useSelector(state => state.admin);

  return (
    <Routes>
      <Route
        path="/login"
        element={
          admin ? (
            <Navigate to="/admin" />
          ) : (
            <Suspense fallback={<LoadingPage />}>
              <AdminSignin />
            </Suspense>
          )
        }
      />
      <Route
        path="/"
        element={
          admin ? (
            <Suspense fallback={<LoadingPage />}>
              <AdminLayout />
            </Suspense>
          ) : (
            <Suspense fallback={<LoadingPage />}>
              <AdminSignin />
            </Suspense>
          )
        }
      >
        <Route
          index
          element={
            <Suspense fallback={<LoadingPage />}>
              <AdminDashboard />
            </Suspense>
          }
        />

        <Route path="members">
          <Route
            index
            element={
              <Suspense fallback={<LoadingPage />}>
                <ListMembers />
              </Suspense>
            }
          />
          <Route
            path="add"
            element={
              <Suspense fallback={<LoadingPage />}>
                <AddMember />
              </Suspense>
            }
          />
          <Route
            path="edit"
            element={
              <Suspense fallback={<LoadingPage />}>
                <EditMember />
              </Suspense>
            }
          />
        </Route>

        <Route path="categories">
          <Route
            index
            element={
              <Suspense fallback={<LoadingPage />}>
                <ListCategories />
              </Suspense>
            }
          />
          <Route
            path="add"
            element={
              <Suspense fallback={<LoadingPage />}>
                <AddCategory />
              </Suspense>
            }
          />
          <Route
            path="edit"
            element={
              <Suspense fallback={<LoadingPage />}>
                <EditCategory />
              </Suspense>
            }
          />
        </Route>

        <Route path="books">
          <Route
            index
            element={
              <Suspense fallback={<LoadingPage />}>
                <ListBooks />
              </Suspense>
            }
          />
          <Route
            path="add"
            element={
              <Suspense fallback={<LoadingPage />}>
                <AddBook />
              </Suspense>
            }
          />
          <Route
            path="edit"
            element={
              <Suspense fallback={<LoadingPage />}>
                <EditBook />
              </Suspense>
            }
          />
        </Route>

        <Route path="book-transactions">
          <Route
            path="book-requests"
            element={
              <Suspense fallback={<LoadingPage />}>
                <ListRequestedBooks />
              </Suspense>
            }
          />
          <Route
            path="return-books"
            element={
              <Suspense fallback={<LoadingPage />}>
                <ListIssuedBooks />
              </Suspense>
            }
          />
          <Route
            path="issue-books"
            element={
              <Suspense fallback={<LoadingPage />}>
                <IssueNewBook />
              </Suspense>
            }
          />
          <Route
            path="fine"
            element={
              <Suspense fallback={<LoadingPage />}>
                <ListAllOverdueItems />
              </Suspense>
            }
          />
        </Route>

        <Route path="lost_books">
          <Route
            index
            element={
              <Suspense fallback={<LoadingPage />}>
                <ListLostBooks />
              </Suspense>
            }
          />
          <Route
            path="add"
            element={
              <Suspense fallback={<LoadingPage />}>
                <AddLostBook />
              </Suspense>
            }
          />
        </Route>

        <Route
          path="*"
          element={
            <Suspense fallback={<LoadingPage />}>
              <PageNotFound />
            </Suspense>
          }
        />
      </Route>
    </Routes>
  );
}

export default AdminApp;
