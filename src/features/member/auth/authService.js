// Services are strictly for making http requests, sending data back and setting data in localStorage

import axios from "axios";

const API_URL = `${import.meta.env.VITE_SERVER_API_URL}/`;

// Login member
const login = async memberData => {
  try {
    const response = await axios.post(API_URL + "login", memberData);

    if (response.data) {
      localStorage.setItem("member", JSON.stringify(response.data.token));
    }
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message || error.message);
  }
};

// Logout member
const logout = () => {
  localStorage.removeItem("member");
};

const authService = {
  logout,
  login,
};

export default authService;
