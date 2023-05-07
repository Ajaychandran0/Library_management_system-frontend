import { Route, Routes } from "react-router-dom";
import Layout from "./components/member/Layout";
import AdminLayout from "./components/admin/AdminLayout";
import AdminDashboard from "./pages/AdminDashboard";
import UserHome from "./pages/UserHome";
import PageNotFound from "./pages/PageNotFound";
import AdminSignin from "./pages/AdminSignin";
import UserSignin from "./pages/UserSignin";
import ListMembers from "./features/admin/members/ListMembers";
import AddMember from "./features/admin/members/AddMember";
// import StudentRegistrationForm from "./features/admin/members/test";
import ListCategories from "./features/admin/category/ListCategories";
import AddCategory from "./features/admin/category/AddCategory";
import ListBooks from "./features/admin/books/ListBooks";
import AddBook from "./features/admin/books/AddBooks";

function App() {
  return (
    <Routes>
      <Route path="/admin/login" element={<AdminSignin />} />
      <Route path="/admin" element={<AdminLayout />}>
        <Route index element={<AdminDashboard />} />

        <Route path="members">
          <Route index element={<ListMembers />} />
          <Route path="add" element={<AddMember />} />
          {/* <Route path="requests" element={<StudentRegistrationForm />} /> */}
        </Route>

        <Route path="categories">
          <Route index element={<ListCategories />} />
          <Route path="add" element={<AddCategory />} />
        </Route>

        <Route path="books">
          <Route index element={<ListBooks />} />
          <Route path="add-book" element={<AddBook />} />
        </Route>
      </Route>

      <Route path="/login" element={<UserSignin />} />
      <Route path="/" element={<Layout />}>
        <Route index element={<UserHome />} />
      </Route>

      <Route path="*" element={<PageNotFound />} />
    </Routes>
  );
}

export default App;
