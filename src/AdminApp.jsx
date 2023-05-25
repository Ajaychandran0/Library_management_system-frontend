import { Route, Routes, Navigate } from "react-router-dom";

import AdminLayout from "./components/admin/AdminLayout";
import AdminDashboard from "./pages/AdminDashboard";
import PageNotFound from "./pages/PageNotFound";
import AdminSignin from "./pages/AdminSignin";
import ListMembers from "./features/admin/members/ListMembers";
import AddMember from "./features/admin/members/AddMember";
import EditMember from "./features/admin/members/EditMember";
import ListCategories from "./features/admin/category/ListCategories";
import AddCategory from "./features/admin/category/AddCategory";
import EditCategory from "./features/admin/category/EditCategory";
import ListBooks from "./features/admin/books/ListBooks";
import AddBook from "./features/admin/books/AddBooks";
import EditBook from "./features/admin/books/EditBooks";
import ListRequestedBooks from "./features/admin/requestedBooks/ListRequestedBooks";
import { useSelector } from "react-redux";

function AdminApp() {
  const { admin } = useSelector(state => state.admin);

  return (
    <Routes>
      <Route
        path="/login"
        element={admin ? <Navigate to="/admin" /> : <AdminSignin />}
      />
      <Route path="/" element={admin ? <AdminLayout /> : <AdminSignin />}>
        <Route index element={<AdminDashboard />} />

        <Route path="members">
          <Route index element={<ListMembers />} />
          <Route path="add" element={<AddMember />} />
          <Route path="edit" element={<EditMember />} />
          {/* <Route path="requests" element={<StudentRegistrationForm />} /> */}
        </Route>

        <Route path="categories">
          <Route index element={<ListCategories />} />
          <Route path="add" element={<AddCategory />} />
          <Route path="edit" element={<EditCategory />} />
        </Route>

        <Route path="books">
          <Route index element={<ListBooks />} />
          <Route path="add" element={<AddBook />} />
          <Route path="edit" element={<EditBook />} />
        </Route>

        <Route path="book-transactions">
          <Route path="book-requests" element={<ListRequestedBooks />} />
        </Route>

        <Route path="*" element={<PageNotFound />} />
      </Route>
    </Routes>
  );
}

export default AdminApp;
