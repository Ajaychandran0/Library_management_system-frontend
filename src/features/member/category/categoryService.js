import axios from "axios";

const API_URL = `${import.meta.env.VITE_SERVER_API_URL}/categories`;

// get all categories
const getAllCategories = async () => {
  try {
    const response = await axios.get(API_URL);
    console.log(response.data);
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
};

const categoryService = {
  getAllCategories,
};

export default categoryService;
