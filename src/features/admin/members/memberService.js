import axios from "axios";

const API_URL = `${import.meta.env.VITE_SERVER_API_URL}/admin/members`;

// Register a member
const addNewMember = async userData => {
  try {
    const response = await axios.post(API_URL, userData);
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.log(error);
    throw new Error(error.response.data.message);
  }
};

// get all members
const getMembers = async token => {
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const response = await axios.get(API_URL, config);
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
};

const authService = {
  addNewMember,
  getMembers,
};

export default authService;
