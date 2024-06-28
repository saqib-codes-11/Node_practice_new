/**
 * Custom hook to handle http requests.
 * 
 * Create custom hooks by prefixing the function name with "use".
 * React concepts involved:
 * - useState
 * - useCallback
 * - creating custom hooks
 * - keeping state in a custom hook to use in multiple components
 */
import { useState, useCallback } from "react";

const useHttp = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  /**
   * Sends a request to api using useCallback and fetch.
   * Use useCallback to prevent unnecessary re-renders, and to
   * cache a function definition between renders.
   */
  const sendRequest = useCallback(async (requestConfig, applyData) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch(requestConfig.url, {
        method: requestConfig.method ? requestConfig.method : "GET",
        headers: requestConfig.headers ? requestConfig.headers : {},
        body: requestConfig.body ? requestConfig.body : null,
      });

      if (!response.ok) {
        let responseBody = (await response.json()) || {};
        throw new Error(responseBody.message);
      }

      const data = (await response.json()) || {};

      console.log(data);

      applyData(data);
    } catch (err) {
      setError(err.message || "Something went wrong!");
    }
    setIsLoading(false);
  }, []);

  return {
    isLoading,
    error,
    sendRequest,
  };
};

export default useHttp;
