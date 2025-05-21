import axios from "axios";
export const baseURL = import.meta.env.VITE_API_BASE_URL;
console.log("Base URL:", baseURL);

const api = axios.create({
  baseURL: `${baseURL}/api`,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

export const loginUser = (email, password) =>
  api.post("/login", { email, password });

export const registerUser = (data) => api.post("/register", data);

export const getUser = () =>
  api.get("/user", {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
