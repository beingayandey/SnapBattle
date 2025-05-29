import axios from "axios";
export const baseUrl = import.meta.env.VITE_API_BASE_URL;

export const loginUser = async (loginId, password) => {
  const response = await axios.post(`${baseUrl}/api/auth/login`, {
    ...(loginId.includes("@") ? { email: loginId } : { username: loginId }),
    password,
  });
  return response.data;
};
export const signupUser = async (data) => {
  const response = await axios.post(`${baseUrl}/api/auth/register`, {
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
  const response = await axios.post(`${baseUrl}/api/admin/event/create`, data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

export const getCategoryList = async (token) => {
  const response = await axios.get(`${baseUrl}/api/admin/category/list`, {
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
    `${baseUrl}/api/admin/event/list?${queryParams.toString()}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response.data;
};

export const getUserCountry = async () => {
  const response = await axios.get(
    "https://ipinfo.io/json?token=89434a11fa82d7"
  );
  return response.data;
};

export const forgotPassword = async (email) => {
  const response = await axios.post(`${baseUrl}/api/auth/forgot-password`, {
    email,
  });
  return response.data;
};

export const resetPassword = async (
  token,
  email,
  password,
  password_confirmation
) => {
  const response = await axios.post(`${baseUrl}/api/auth/reset-password`, {
    token,
    email,
    password,
    password_confirmation,
  });
  return response.data;
};

export const getUserEvents = async ({
  token,
  page = 1,
  status = "Active",
  limit = 10,
}) => {
  const queryParams = new URLSearchParams({
    page,
    status,
    limit,
  });
  const response = await axios.get(
    `${baseUrl}/api/user/event/list?${queryParams.toString()}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response.data;
};

export const sendOtp = async (email) => {
  const response = await axios.post(`${baseUrl}/api/auth/send-otp`, {
    email,
  });
  return response.data;
};
export const verifyOtp = async (identifier, code, channel = "email") => {
  const endpoint = "verify-otp"; // Matches the screenshot
  const response = await axios.post(
    `${baseUrl}/api/auth/${endpoint}`,
    {
      code, // e.g., "558861"
      channel, // e.g., "phone" or "email"
    },
    {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      transformRequest: [(data) => new URLSearchParams(data)],
    }
  );
  return response.data;
};
