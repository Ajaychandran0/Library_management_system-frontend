import axios from "axios";

const API_URL = `${import.meta.env.VITE_SERVER_API_URL}/admin/categories`;

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
    throw new Error(error.response.data.message);
  }
};

// add new category
export const addCategory = async (token, categoryData) => {
  const config = {
    ...setHeader(token),
    data: categoryData,
    method: "POST",
    url: API_URL,
  };
  return await sendRequest(config);
};

// get all categories
export const fetchCategories = async (token, filter) => {
  const config = {
    ...setHeader(token),
    params: filter,
    method: "GET",
    url: API_URL,
  };
  return await sendRequest(config);
};

// delete category by id
export const deleteCategoryById = async (token, catId) => {
  const config = {
    ...setHeader(token),
    method: "DELETE",
    url: `${API_URL}/${catId}`,
  };
  return await sendRequest(config);
};

// set category status to false
export const blockCategoryById = async (token, catId) => {
  const config = {
    ...setHeader(token),
    method: "PATCH",
    url: `${API_URL}/${catId}`,
  };
  return await sendRequest(config);
};

// search category with search keyworks
export const searchCategory = async (token, search) => {
  const config = {
    ...setHeader(token),
    method: "GET",
    url: `${API_URL}/${search}`,
  };
  return await sendRequest(config);
};
