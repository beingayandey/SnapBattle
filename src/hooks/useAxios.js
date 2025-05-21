import { useState } from 'react';
import axios from 'axios';

const useAxios = () => {

  const [response, setResponse] = useState(null)
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(false)

  const prefix = 'api';
  const axiosInstance = axios.create({
    baseURL: `${import.meta.env.VITE_API_BASE_URL}/${prefix}`,
  })

  axiosInstance.interceptors.request.use((config) => {
    config.headers['Accept'] = 'application/json';
    config.headers['Authorization'] = localStorage.getItem('token') && `Bearer ${localStorage.getItem('token')}`;
    return config;
  }, (error) => {
    return Promise.reject(error);
  })

  axiosInstance.interceptors.response.use((config) => {
    return config;
  }, (error) => {
    return Promise.reject(error);
  })

  const apiHandler = async ({ url, headers = {}, method, data = {}, params = {} }) => {

    setLoading(true);

    try {
      const result = await axiosInstance({
        url,
        headers,
        method,
        data,
        params,
      })
      setResponse(result.data);
      setError(null);

    } catch (error) {
      setError(error.response.data.errors);
      setResponse(null);

    } finally {
      setLoading(false);
    }
  }

  return { response, error, loading, apiHandler }
}

export default useAxios