import axios from "axios";

const API_URL = `${import.meta.env.VITE_SERVER_API_URL}/admin/books`;

// add a new book
const addNewBook = async (userData, token) => {
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${token} admin`,
      },
    };
    const response = await axios.post(API_URL, userData, config);
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.log(error);
    throw new Error(error.response.data.message);
  }
};

// get all books
const getBooks = async token => {
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${token} admin`,
      },
    };
    const response = await axios.get(API_URL, config);
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
};

const bookService = {
  addNewBook,
  getBooks,
};

export default bookService;
