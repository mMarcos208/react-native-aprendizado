import {useEffect, useState} from 'react';
import {api} from '../settings/api';

export const useAxios = <T>(url: string) => {
  const [data, setData] = useState<T[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      const result = await api.get<T[]>(url);
      setData(result.data);
      setIsLoading(false);
    };
    fetchData();
  }, [url]);

  return {
    isLoading,
    data,
  };
};
