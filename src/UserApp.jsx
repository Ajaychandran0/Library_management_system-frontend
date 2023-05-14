import { Route, Routes, Navigate } from "react-router-dom";
import Layout from "./components/member/Layout";
import UserHome from "./pages/UserHome";
import PageNotFound from "./pages/PageNotFound";
import UserSignin from "./pages/UserSignin";
// import StudentRegistrationForm from "./features/admin/members/test";
import ListAllCategories from "./features/member/category/ListAllCategories";

import { useSelector } from "react-redux";

function UserApp() {
  const { member } = useSelector(state => state.auth);

  return (
    <Routes>
      <Route
        path="/login"
        element={member ? <Navigate to="/" /> : <UserSignin />}
      />
      <Route path="/" element={<Layout />}>
        <Route index element={<UserHome />} />
        <Route path="categories" element={<ListAllCategories />} />
        <Route path="*" element={<PageNotFound />} />
      </Route>
    </Routes>
  );
}

export default UserApp;
