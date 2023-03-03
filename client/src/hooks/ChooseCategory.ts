import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

export const useCategory = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [parsedParams, setParsedParams] = useState<Record<string, string>>({});

  useEffect(() => {
    const params: Record<string, string> = {};
    searchParams.forEach((value, key) => {
      params[key] = value;
    });

    setParsedParams(params);
  }, [searchParams]);

  const updateSearchParams = (key: string, value: string) => {
    setSearchParams({ ...parsedParams, [key]: value });
  };

  return { updateSearchParams };
};
