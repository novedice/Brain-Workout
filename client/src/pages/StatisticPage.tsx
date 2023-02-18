import { useEffect, useState } from 'react';
import { getUserResults } from '../api/result-requerests';
import { Canvas } from '../components/Canvas';
import { UPDATE_ALL_RESULTS } from '../constants';
import { findActiveDays } from '../functions/findActiveDays';
import { findStreaks } from '../functions/findStreaks';
import { resultsForStatistic } from '../functions/resultsForStatistic';
import { useAppDispatch, useTypeSelector } from '../hooks/useTypeSelector';
import { IOrderedArray } from '../types/interfaces';
import '../assets/statistic/fire-blue.jpeg';
import '../assets/statistic/fire-red.jpeg';
import { FormattedMessage } from 'react-intl';

export function StatisticPage() {
  const user = useTypeSelector((state) => state.userInfo);
  const [orderedRes, setOrderedRes] = useState<IOrderedArray[]>([]);
  const [streaks, setStreaks] = useState([0, 0]);
  const dispatch = useAppDispatch();

  const reciveResults = async () => {
    const response = await getUserResults();
    if (response) {
      dispatch({ payload: response, type: UPDATE_ALL_RESULTS });
      setOrderedRes(resultsForStatistic(response));
      setStreaks(findStreaks(findActiveDays(response)));
    }
  };

  useEffect(() => {
    reciveResults();
  }, []);

  return (
    <>
      <div className="statistic-page bg-slate-200 p-3">
        <div className="statistic-container ml-auto mr-auto flex h-full w-[80%] flex-col overflow-y-auto border-2 p-5 ">
          <div className="upper-case text-xl">
            <FormattedMessage id="to_statistic" />
          </div>
          <div className="user-info item mb-4 flex w-full flex-col rounded bg-white p-4">
            <p className="upper-case mb-3 text-lg">
              <FormattedMessage id="name" />: {user.nickname}
            </p>
            <div className="flex">
              <p className="mb-1 mr-1 text-sm">
                <FormattedMessage
                  id="your_best_streak"
                  values={{ count: streaks[1] }}
                />
              </p>
              <img className="max-h-5 w-[30px]" src="fire-blue.jpeg"></img>
            </div>
            <div className="flex">
              <p className="mb-1 mr-2">
                <FormattedMessage
                  id="your_streak"
                  values={{ count: streaks[0] }}
                />
              </p>
              <img className="max-h-5 w-[17px]" src="fire-red.jpeg"></img>
            </div>
          </div>
          {orderedRes
            .sort((a, b) => b.results.length - a.results.length)
            .map((gameResults) => {
              return (
                <section
                  key={gameResults.gameId}
                  className="mb-4 rounded border-4 border-blue-300 bg-white p-4"
                >
                  <div className="mb-3">
                    <p className="upper-case text-xl">{gameResults.gameName}</p>
                    <p>
                      <FormattedMessage
                        id="best_result"
                        values={{ score: gameResults.bestScore }}
                      />
                    </p>
                    <p>
                      <FormattedMessage
                        id="times_played"
                        values={{ times: gameResults.results.length }}
                      />
                    </p>
                  </div>
                  {gameResults.results.length !== 0 && (
                    <div className="mb-4 h-[276px] w-[504px] border-2">
                      <Canvas
                        canvasId={`game-${gameResults.gameId}`}
                        results={gameResults.results}
                      />
                    </div>
                  )}
                </section>
              );
            })}
        </div>
      </div>
    </>
  );
}
