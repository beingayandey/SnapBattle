import { useState } from "react";
import axios from "axios";

const useAxios = () => {
  // State variables to store the response, error and loading status
  const [response, setResponse] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  // Create an axios instance with the base URL and headers
  const prefix = "api";
  const axiosInstance = axios.create({
    baseURL: `${import.meta.env.VITE_API_BASE_URL}/${prefix}`,
  });

  // Add interceptors to add the authorization token to the headers
  axiosInstance.interceptors.request.use(
    (config) => {
      // Add the authorization token if it exists in local storage
      config.headers["Accept"] = "application/json";
      config.headers["Authorization"] =
        localStorage.getItem("token") &&
        `Bearer ${localStorage.getItem("token")}`;
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  axiosInstance.interceptors.response.use(
    (config) => {
      // Return the response as is
      return config;
    },
    (error) => {
      // Return the error as is
      return Promise.reject(error);
    }
  );

  // The main api handler function
  const apiHandler = async ({
    url,
    headers = {},
    method,
    data = {},
    params = {},
  }) => {
    // Set the loading state to true
    setLoading(true);

    try {
      // Make the API call and store the response
      const result = await axiosInstance({
        url,
        headers,
        method,
        data,
        params,
      });
      setResponse(result.data);
      setError(null);
    } catch (error) {
      // Store the error in the error state
      setError(error.response ? error.response.data : error.message);
      setResponse(null);
    } finally {
      // Set the loading state to false
      setLoading(false);
    }
  };

  return { response, error, loading, apiHandler };
};

export default useAxios;
