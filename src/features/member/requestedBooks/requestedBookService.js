import axios from "axios";

const API_URL = `${import.meta.env.VITE_SERVER_API_URL}/requested_books`;

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

// request a book
const requestBook = async (token, bookId) => {
  const config = {
    ...setHeader(token),
    method: "POST",
    url: `${API_URL}/${bookId}`,
  };
  return await sendRequest(config);
};

// get all books
const getReqBooks = async token => {
  const config = {
    ...setHeader(token),
    method: "GET",
    url: API_URL,
  };
  return await sendRequest(config);
};

// delete book by id
const removeBookRequest = async (token, bookId) => {
  const config = {
    ...setHeader(token),
    method: "DELETE",
    url: `${API_URL}/${bookId}`,
  };
  return await sendRequest(config);
};

const requestedBookService = {
  requestBook,
  getReqBooks,
  removeBookRequest,
};

export default requestedBookService;
