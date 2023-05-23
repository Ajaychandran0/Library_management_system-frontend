import axios from "axios";

const API_URL = `${import.meta.env.VITE_SERVER_API_URL}/books`;

// get all books
const getBooks = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    throw new Error(message);
  }
};

const bookService = {
  getBooks,
};

export default bookService;
