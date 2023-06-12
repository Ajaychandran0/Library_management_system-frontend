import axios from "axios";

const API_URL = `${import.meta.env.VITE_SERVER_API_URL}/account`;

const setHeader = token => ({
  headers: {
    Authorization: `Bearer ${token}`,
  },
});

const sendRequest = async config => {
  try {
    const response = await axios(config);
    return response.data;
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    throw new Error(message);
  }
};

// get account details of a member
const getMemberDetails = async token => {
  const config = {
    ...setHeader(token),
    method: "GET",
    url: API_URL,
  };
  return await sendRequest(config);
};

const memberAccountService = {
  getMemberDetails,
};

export default memberAccountService;
