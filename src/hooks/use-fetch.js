import { useCallback, useMemo, useState } from 'react';

const useFetch = (applyData) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const abortController = useMemo(() => new AbortController(), []);
  const sendRequest = useCallback(
    async (requestConfig) => {
      try {
        setIsLoading(true);
        setError(null);
        const request = await fetch(requestConfig.url, {
          method: requestConfig.method ? requestConfig.method : 'GET',
          headers: requestConfig.headers ? requestConfig.headers : {},
          signal: abortController.signal,
          body: requestConfig.body ? JSON.stringify(requestConfig.body) : null,
        });
        if (!request.ok) {
          throw new Error('Request Failed');
        }
        const data = await request.json();
        applyData(data);
        setIsLoading(false);
      } catch (error) {
        setIsLoading(false);
        setError(error);
      }
    },
    [applyData, abortController]
  );

  const abortRequest = useCallback(() => {
    abortController.abort();
  }, [abortController]);

  return {
    isLoading,
    error,
    sendRequest,
    abortRequest: abortRequest,
  };
};

export default useFetch;
