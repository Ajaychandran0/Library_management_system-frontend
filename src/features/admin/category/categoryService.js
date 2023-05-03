import axios from "axios";

const API_URL = `${import.meta.env.VITE_SERVER_API_URL}/admin/categories`;

// add new category
const addNewcategory = async userData => {
  try {
    const response = await axios.post(API_URL, userData);
    return response.data;
  } catch (error) {
    console.log(error);
    throw new Error(error.response.data.message);
  }
};

// get all categories
const getAllCategories = async token => {
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const response = await axios.get(API_URL, config);
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
};

const categoryService = {
  addNewcategory,
  getAllCategories,
};

export default categoryService;
