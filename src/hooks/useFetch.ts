import { useEffect, useCallback, useState } from 'react';
import { useErrorBoundary } from 'react-error-boundary';

type HttpMethod = 'GET' | 'POST';

interface FetchOptions {
  method?: HttpMethod;
  body?: any;
  headers?: HeadersInit;
}

const useFetch = (fetchUrl: string, options?: FetchOptions) => {
  const { showBoundary } = useErrorBoundary();
  const [dataFetched, setDataFetched] = useState<any>(null);

  const fetchData = useCallback(async () => {
    try {
      const response = await fetch(fetchUrl, {
        method: options?.method || 'GET',
        body: options?.body,
        headers: options?.headers,
      });
      const data = await response.json();
      setDataFetched(data);
    } catch (error) {
      showBoundary(error);
    }
  }, [fetchUrl, options, showBoundary]);

  useEffect(() => {
    fetchData();
  }, [fetchData, fetchUrl]);

  return dataFetched;
};

export default useFetch;
