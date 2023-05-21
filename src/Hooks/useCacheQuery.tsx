import { useEffect, useState } from "react";

function useCacheQuery({ url: postFixUrl, isEnabled = false, headers }: IProps) {
  const baseUrl = "https://jsonplaceholder.typicode.com/";
  const cacheUrl = `${baseUrl}${postFixUrl}`;
  const abortController = new AbortController();
  const signal = abortController.signal;
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [data, setData] = useState([]);

  async function checkCache(url: string) {
    const cache = await caches.open("mf-app");
    const isMatch = await cache.match(url);

    return { cache, isMatch };
  }

  async function start() {
    try {
      const { isMatch, cache } = await checkCache(cacheUrl);

      if (isMatch) {
        console.log(JSON.stringify(`Cache match for ${cacheUrl}`));
        const res = await isMatch.json();
        setData(res);
      } else {
        const response = await fetchData(cacheUrl, cache);
        setData(response);
      }
    } catch (error) {
      setError(true);
    } finally {
      setLoading(false);
    }
  }

  async function setCahce(url: string, cache: Cache, response: Response) {
    cache.put(url, response.clone());
  }

  async function fetchData(url: string, cache: Cache) {
    const response = await fetch(url, { headers: { ...headers }, signal });
    await setCahce(url, cache, response);
    const res = await response.json();
    return res;
  }

  async function refetch() {
    try {
      if (isEnabled) {
        setLoading(true);
        const { cache, isMatch } = await checkCache(cacheUrl);
        if (isMatch) {
          cache.delete(cacheUrl);
        }
        const response = await fetchData(cacheUrl, cache);
        setData(response);
      }
    } catch (error) {
      setError(true);
    } finally {
      setLoading(false);
    }
  }

  async function cancel() {
    abortController.abort();
  }

  useEffect(() => {
    if (isEnabled) {
      setLoading(true);
      start();
    }

    return () => {
      // console.log("unmounting");
      // abortController.abort();
    };
  }, [isEnabled]);

  return { data, loading, error, cancel, refetch };
}

interface IProps {
  url: string;
  isEnabled?: boolean;
  headers?: any;
}

export default useCacheQuery;
