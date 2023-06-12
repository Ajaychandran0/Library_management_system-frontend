import axios from "axios";

const API_URL = `${import.meta.env.VITE_SERVER_API_URL}/returned_books`;

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

// get history of all books member borrowed
const getBorrowedHistory = async (token, filter) => {
  const config = {
    ...setHeader(token),
    params: filter,
    method: "GET",
    url: API_URL,
  };
  return await sendRequest(config);
};

const filterBorrowedHistory = async (token, filter) => {
  const config = {
    ...setHeader(token),
    params: filter,
    method: "GET",
    url: `${API_URL}/filter`,
  };
  return await sendRequest(config);
};

const getMemberOverdueItems = async token => {
  const config = {
    ...setHeader(token),
    method: "GET",
    url: `${API_URL}/overdueItems`,
  };
  return await sendRequest(config);
};

const borrowedHistoryService = {
  getBorrowedHistory,
  filterBorrowedHistory,
  getMemberOverdueItems,
};

export default borrowedHistoryService;
