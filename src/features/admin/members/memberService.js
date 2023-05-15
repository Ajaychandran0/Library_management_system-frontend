import axios from "axios";

const API_URL = `${import.meta.env.VITE_SERVER_API_URL}/admin/members`;

const setHeader = token => ({
  headers: {
    Authorization: `Bearer ${token} admin`,
  },
});

const sendRequest = async config => {
  try {
    const response = await axios(config);
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
};

// Register a member
const addNewMember = async (token, userData) => {
  const config = {
    ...setHeader(token),
    data: userData,
    method: "POST",
    url: API_URL,
  };
  return await sendRequest(config);
};

// get all members
const getMembers = async (token, filter) => {
  const config = {
    ...setHeader(token),
    params: filter,
    method: "GET",
    url: API_URL,
  };
  return await sendRequest(config);
};

const memberService = {
  addNewMember,
  getMembers,
};

export default memberService;
