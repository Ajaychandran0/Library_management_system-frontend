import axios from "axios";

const API_URL = `${import.meta.env.VITE_SERVER_API_URL}/wishlist`;

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

// add a book to wishlist
const addToWishlist = async (token, bookId) => {
  const config = {
    ...setHeader(token),
    method: "POST",
    url: `${API_URL}/${bookId}`,
  };
  return await sendRequest(config);
};

// get all wishlist item ids
const getWishlistIds = async token => {
  const config = {
    ...setHeader(token),
    method: "GET",
    url: `${API_URL}/id`,
  };
  return await sendRequest(config);
};

// get wishlist
const getWishlist = async token => {
  const config = {
    ...setHeader(token),
    method: "GET",
    url: API_URL,
  };
  return await sendRequest(config);
};

// rmove an item from wishlist
const removeFromWishlist = async (token, bookId) => {
  const config = {
    ...setHeader(token),
    method: "DELETE",
    url: `${API_URL}/${bookId}`,
  };
  return await sendRequest(config);
};

const wishlistService = {
  addToWishlist,
  getWishlistIds,
  getWishlist,
  removeFromWishlist,
};

export default wishlistService;
