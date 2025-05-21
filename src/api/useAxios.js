import { useState } from "react";

const useAxios = (apiFunction) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const callApi = async (...params) => {
    setLoading(true);
    setError(null);
    try {
      const response = await apiFunction(...params);
      return response.data;
    } catch (err) {
      setError(err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { callApi, loading, error };
};

export default useAxios;
