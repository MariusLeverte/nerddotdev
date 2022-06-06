import {
  DocumentData,
  getDocs,
  Query,
  QuerySnapshot,
} from "firebase/firestore";
import { useCallback, useMemo, useState } from "react";

export const useCollectionDataOnce = <T = DocumentData>() => {
  const [value, setValue] = useState<QuerySnapshot<T> | null>(null);

  const loadData = useCallback(
    async (query: Query<T>) => {
      if (value) return;

      try {
        const querySnapshot = await getDocs(query);
        setValue(querySnapshot);
      } catch (error) {
        console.error(error);
      }
    },
    [value]
  );

  const values = useMemo(() => {
    if (!value) return;

    return value.docs.map((doc) => doc.data());
  }, [value]);

  return useMemo(() => {
    return {
      data: values,
      loadData,
    };
  }, [values, loadData]);
};
