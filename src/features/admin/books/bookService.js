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
    return error.response.data.message;
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
    method: "GET",
    url: API_URL,
  };
  return await sendRequest(config);
};

// edit book by id
const editBook = async (token, updatedBook) => {
  const bookId = updatedBook._id;
  delete updatedBook._id;

  const config = {
    ...setHeader(token),
    data: updatedBook,
    method: "PUT",
    url: `${API_URL}/${bookId}`,
  };
  return await sendRequest(config);
};

// delete book by id
const deleteBook = async (token, id) => {
  const config = {
    ...setHeader(token),
    method: "DELETE",
    url: `${API_URL}/${id}`,
  };
  return await sendRequest(config);
};

const bookService = {
  addNewBook,
  getBooks,
  editBook,
  deleteBook,
};

export default bookService;
