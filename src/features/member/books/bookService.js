import axios from "axios";

const API_URL = `${import.meta.env.VITE_SERVER_API_URL}/books`;

// get all books
const getBooks = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
};

const bookService = {
  getBooks,
};

export default bookService;
