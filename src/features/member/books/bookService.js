import axios from "axios";

const API_URL = `${import.meta.env.VITE_SERVER_API_URL}/books`;

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

const getBooks = async ({ filter }) => {
  const config = {
    params: filter,
    method: "GET",
    url: API_URL,
  };
  return await sendRequest(config);
};

const filterBooks = async ({ filter }) => {
  const config = {
    params: filter,
    method: "GET",
    url: `${API_URL}/filter`,
  };
  return await sendRequest(config);
};

const bookService = {
  getBooks,
  filterBooks,
};

export default bookService;
