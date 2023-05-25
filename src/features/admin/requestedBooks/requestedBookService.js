import axios from "axios";

const API_URL = `${import.meta.env.VITE_SERVER_API_URL}/admin/requested_books`;

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
const getAllBookRequests = async token => {
  const config = {
    ...setHeader(token),
    method: "GET",
    url: API_URL,
  };
  return await sendRequest(config);
};

const issueBook = async (token, { bookId, memberId }) => {
  const config = {
    ...setHeader(token),
    data: { bookId, memberId },
    method: "PUT",
    url: API_URL,
  };
  console.log(config, " in isssue book ");
  //   return await sendRequest(config);
};

const requestedBookService = {
  getAllBookRequests,
  issueBook,
};

export default requestedBookService;
