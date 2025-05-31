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
    `${baseUrl}/api/admin/events?${queryParams.toString()}`,
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
  // status = "Active",
  limit = 10,
}) => {
  const queryParams = new URLSearchParams({
    page,
    // status,
    limit,
  });
  const response = await axios.get(
    `${baseUrl}/api/user/events?${queryParams.toString()}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response.data;
};

export const sendOtp = async (value) => {
  const response = await axios.post(`${baseUrl}/api/auth/send-verification`, {
    attribute: value,
  });
  return response.data;
};

export const verifyOtp = async (identifier, code, channel = "email") => {
  const endpoint = "verify"; // Matches the screenshot
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

export const logOut = async (token) => {
  if (!token) {
    throw new Error("Token not found. Please log in again.");
  }

  try {
    const response = await axios.post(
      `${baseUrl}/api/auth/logout`,
      {}, // Empty body for POST
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data; // Expected: { success: true, message: "Successfully logged out" }
  } catch (error) {
    throw new Error(
      error.response?.data?.error || "Failed to log out. Please try again."
    );
  }
};

export const eventSubmissions = async ({ token, page = 1, limit = 10 }) => {
  const queryParams = new URLSearchParams({
    page,
    limit,
  });
  const response = await axios.get(
    `${baseUrl}/api/admin/submissions?${queryParams.toString()}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response.data;
};

export const viewUserSubmission = async (token) => {
  const response = await axios.get(`${baseUrl}/api/user/submissions`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

export const viewProfile = async (token) => {
  const response = await axios.get(`${baseUrl}/api/user/profile`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};
