import axios from "axios";

const API_URL = `${import.meta.env.VITE_SERVER_API_URL}/categories`;

// get all categories
const getAllCategories = async () => {
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

const categoryService = {
  getAllCategories,
};

export default categoryService;
