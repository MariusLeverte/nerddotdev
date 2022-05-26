import { useCallback, useEffect, useState } from "react";
import { getClient } from "../libs/sanity/sanity.server";

const useSanityData = <Value>(query: string, preview?: boolean) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<unknown>(null);
  const [data, setData] = useState<Value | null>(null);

  const getSanityData = useCallback(async () => {
    try {
      setLoading(true);
      const data = await getClient(!!preview).fetch(query);
      setData(data);
    } catch (error) {
      console.error(error);
      setError(error);
    } finally {
      setLoading(false);
    }
  }, [preview, query]);

  useEffect(() => {
    if (loading || data || error) return;

    getSanityData();
  }, [getSanityData, data, loading, error]);

  return { data, loading, error };
};

export default useSanityData;
