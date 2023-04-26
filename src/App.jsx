import Layout from "./components/member/Layout";
import AdminLayout from "./components/admin/AdminLayout";
import AdminDashboard from "./pages/AdminDashboard";
import UserHome from "./pages/UserHome";
import PageNotFound from "./pages/PageNotFound";
import { Route, Routes } from "react-router-dom";
import AdminSignin from "./pages/AdminSignin";
import UserSignin from "./pages/UserSignin";

function App() {
  return (
    <Routes>
      <Route path="/admin/login" element={<AdminSignin />} />
      <Route path="/admin" element={<AdminLayout />}>
        <Route index element={<AdminDashboard />} />
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
