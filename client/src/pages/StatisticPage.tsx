import { useEffect, useState } from 'react';
import { getUserResults, IResultResponse } from '../api/result-requerests';
import { useAppDispatch } from '../hooks/useTypeSelector';
// import { useTypeSelector } from "../hooks/useTypeSelector";
// import { IResults } from '../types/interfaces';

export function StatisticPage() {
  // const userResults = useTypeSelector(state => state.resultsInfo);
  const [resultsNow, setResultsNow] = useState<IResultResponse[]>();
  const [error, setError] = useState('');
  const dispatch = useAppDispatch();
  const { userResults, resError } = getUserResults();
  const reciveResults = async () => {
    const response = await getUserResults();
    if (response) {
      // dispatch();
    }
  };

  useEffect(() => {
    if (userResults?.length) {
      setResultsNow(userResults);
    }
    if (resError) {
      setError(resError);
    }
  }, [userResults?.length]);

  return (
    <>
      <div>Statistic</div>
      {resultsNow &&
        resultsNow.map((res) => {
          return (
            <div key={res.id}>
              <p>{res.gameId}</p>
              <p>{res.createdAt}</p>
              <p>{res.value}</p>
            </div>
          );
        })}
      {error && <p>{error}</p>}
    </>
  );
}
