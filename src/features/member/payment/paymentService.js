import axios from "axios";

const API_URL = `${import.meta.env.VITE_SERVER_API_URL}/payment`;

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

const getPaymentUrl = async (token, overdueItemId) => {
  const config = {
    ...setHeader(token),
    data: { overdueItemId },
    method: "POST",
    url: `${API_URL}/overdue`,
  };
  return await sendRequest(config);
};

const updatePaymentSuccess = async (token, overdueId) => {
  const config = {
    ...setHeader(token),
    data: { overdueId },
    method: "PATCH",
    url: `${API_URL}/overdue`,
  };
  return await sendRequest(config);
};

const paymentService = {
  getPaymentUrl,
  updatePaymentSuccess,
};

export default paymentService;
