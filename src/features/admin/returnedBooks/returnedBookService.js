import axios from "axios";

const API_URL = `${import.meta.env.VITE_SERVER_API_URL}/admin/returned_books`;

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
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    throw new Error(message);
  }
};

// get all book requests
const getReturnedBooksByMember = async (token, filter) => {
  const config = {
    ...setHeader(token),
    params: filter,
    method: "GET",
    url: API_URL,
  };
  return await sendRequest(config);
};

const returnBook = async (token, data) => {
  const config = {
    ...setHeader(token),
    method: "POST",
    data,
    url: API_URL,
  };
  return await sendRequest(config);
};

const returnedBookService = {
  getReturnedBooksByMember,
  returnBook,
};

export default returnedBookService;
