import axios from "axios";

const API_URL = `${import.meta.env.VITE_SERVER_API_URL}/admin/books`;

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

// add a new book
const addNewBook = async (token, bookData) => {
  const config = {
    ...setHeader(token),
    data: bookData,
    method: "POST",
    url: API_URL,
  };
  return await sendRequest(config);
};

// get all books
const getBooks = async (token, filter) => {
  const config = {
    ...setHeader(token),
    params: filter,
    method: "get",
    url: API_URL,
  };
  return await sendRequest(config);
};

const bookService = {
  addNewBook,
  getBooks,
};

export default bookService;
