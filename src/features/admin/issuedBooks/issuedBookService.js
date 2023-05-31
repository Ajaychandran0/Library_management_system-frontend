import axios from "axios";

const API_URL = `${import.meta.env.VITE_SERVER_API_URL}/admin/issued_books`;

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
const getAllIssuedBooks = async (token, filter) => {
  const config = {
    ...setHeader(token),
    params: filter,
    method: "GET",
    url: API_URL,
  };
  return await sendRequest(config);
};

const issueBook = async (token, data) => {
  const config = {
    ...setHeader(token),
    method: "POST",
    data,
    url: API_URL,
  };
  return await sendRequest(config);
};

const issuedBookService = {
  getAllIssuedBooks,
  issueBook,
};

export default issuedBookService;
