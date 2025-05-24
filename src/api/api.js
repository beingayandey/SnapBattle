import axios from "axios";
export const baseUrl = import.meta.env.VITE_API_BASE_URL;

export const loginUser = async (loginId, password) => {
  const response = await axios.post(`${baseUrl}/api/login`, {
    ...(loginId.includes("@") ? { email: loginId } : { username: loginId }),
    password,
  });
  return response.data;
};
export const signupUser = async (data) => {
  const response = await axios.post(`${baseUrl}/api/register`, {
    first_name: data.first_name,
    last_name: data.last_name,
    email: data.email,
    phone: data.phoneNumber,
    password: data.password,
    password_confirmation: data.confirmPassword,
  });
  return response.data;
};

export const createEvent = async (data, token) => {
  const response = await axios.post(`${baseUrl}/api/event/create`, data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

export const getCategoryList = async (token) => {
  const response = await axios.get(`${baseUrl}/api/category/list`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

export const getEventList = async ({ token, page = 1, status, limit = 10 }) => {
  const queryParams = new URLSearchParams({ page, limit });
  if (status) {
    queryParams.append("status", status);
  }

  const response = await axios.get(
    `${baseUrl}/api/event/list?${queryParams.toString()}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response.data;
};
