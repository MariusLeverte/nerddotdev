import { useCallback, useEffect, useState } from "react";
import { getClient } from "../libs/sanity/sanity.server";
type QueryParams = { [key: string]: any };

const useSanityData = <Value>(
  query: string | { query: string; params: QueryParams },
  preview?: boolean,
  lazy?: boolean
) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<unknown>(null);
  const [data, setData] = useState<Value | null>(null);

  const getSanityData = useCallback(async () => {
    try {
      setLoading(true);
      if (typeof query === "string") {
        const data = await getClient(!!preview).fetch(query);
        setData(data);
      } else {
        const data = await getClient(!!preview).fetch(
          query.query,
          query.params
        );
        setData(data);
      }
    } catch (error) {
      console.error(error);
      setError(error);
    } finally {
      setLoading(false);
    }
  }, [preview, query]);

  useEffect(() => {
    if (loading || data || error) return;
    if (lazy) return;

    getSanityData();
  }, [getSanityData, data, loading, error, lazy]);

  return { fetchData: getSanityData, data, loading, error };
};

export default useSanityData;
