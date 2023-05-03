import axios from "axios";

const API_URL = `${import.meta.env.VITE_SERVER_API_URL}/admin/`;

// Login Admin
const login = async adminData => {
  try {
    const response = await axios.post(API_URL + "login", adminData);

    if (response.data) {
      localStorage.setItem("admin", JSON.stringify(response.data));
    }
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
};

// Logout Admin
const logout = () => {
  localStorage.removeItem("admin");
};

const adminService = {
  logout,
  login,
};

export default adminService;
