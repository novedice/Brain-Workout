import { useEffect, useState } from 'react';
import { getUserResults } from '../api/result-requerests';
import { Canvas } from '../components/Canvas';
import { UPDATE_ALL_RESULTS } from '../constants';
import { findActiveDays } from '../functions/findActiveDays';
import { findStreaks } from '../functions/findStreaks';
import { resultsForStatistic } from '../functions/resultsForStatistic';
import { useAppDispatch, useTypeSelector } from '../hooks/useTypeSelector';
import { ILeader, IOrderedArray } from '../types/interfaces';
import '../assets/statistic/fire-blue.jpeg';
import '../assets/statistic/fire-red.jpeg';
import { FormattedMessage } from 'react-intl';
import { getLeaders } from '../api/leaders-requests';
import { BlockNotLoggedIn } from '../components/BlockNotLoggedIn';
import './statisticPage.css';
import { allGames } from '../game-content/allGames';
import React from 'react';
import '../assets/categories-pics/statistic.jpeg';

export function StatisticPage() {
  const { loggedIn } = useTypeSelector((state) => state.loggedInInfo);
  const user = useTypeSelector((state) => state.userInfo);
  const [orderedRes, setOrderedRes] = useState<IOrderedArray[]>([]);
  const [streaks, setStreaks] = useState([0, 0]);
  const [curLead, setCurLead] = useState<
    { game: string; gameID: number; leaders: ILeader[] }[]
  >([]);
  const dispatch = useAppDispatch();

  const reciveResults = async () => {
    const response = await getUserResults();
    if (response) {
      console.log('results', response);
      dispatch({ payload: response, type: UPDATE_ALL_RESULTS });
      setOrderedRes(resultsForStatistic(response));
      setStreaks(findStreaks(findActiveDays(response)));
    }
  };
  const leaders = async () => {
    const resLeaders: { game: string; gameID: number; leaders: ILeader[] }[] =
      [];
    for (let i = 0; i < allGames.length; i++) {
      const leadResp = await getLeaders(i + 1);
      if (leadResp) {
        // console.log('leaders resp', leadResp);
        resLeaders.push({
          game: allGames[i].path,
          gameID: allGames[i].id,
          leaders: leadResp,
        });
        // console.log('resLeaders:', resLeaders);
        // console.log('curl', curLead);
      }
    }
    setCurLead(resLeaders);
  };

  useEffect(() => {
    reciveResults();
    leaders();
  }, []);

  return (
    <>
      <div className="page-container">
        {!loggedIn && <BlockNotLoggedIn />}
        {loggedIn && (
          <div className="statistic-container">
            <div className="statistic-page">
              <div className="statistic-h2 upper-case">
                <img
                  className="small-img"
                  src="statistic.jpeg"
                  alt="statistic"
                ></img>
                <FormattedMessage id="to_statistic" />
              </div>
              <div className="statistic-block ">
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
              <div></div>
              {orderedRes
                .sort((a, b) => b.results.length - a.results.length)
                .map((gameResults) => {
                  return (
                    <section
                      key={gameResults.gameId}
                      className="statistic-block"
                    >
                      <div className="mb-3">
                        <p className="upper-case text-xl">
                          {gameResults.gameName}
                        </p>
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
                      <div className="game-statistic">
                        {gameResults.results.length !== 0 && (
                          <div className="mb-4 h-[276px] w-[504px] border-2">
                            <Canvas
                              canvasId={`game-${gameResults.gameId}`}
                              results={gameResults.results}
                            />
                          </div>
                        )}
                        <div className="result-table-container">
                          <table className="result-table">
                            <thead className="result-table-head">
                              <tr>
                                <th>Best results</th>
                              </tr>
                              <tr>
                                <th>{gameResults.gameName}</th>
                              </tr>
                            </thead>
                            <tbody>
                              {curLead.length
                                ? curLead
                                    .filter(
                                      (gamelead) =>
                                        gamelead.gameID === gameResults.gameId
                                    )[0]
                                    .leaders?.map((leader, index) => (
                                      <React.Fragment key={index}>
                                        <tr>
                                          <td>{index + 1}</td>
                                          <td colSpan={2}>{leader.value}</td>
                                          <td colSpan={3}>{leader.nickname}</td>
                                        </tr>
                                      </React.Fragment>
                                    ))
                                : null}
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </section>
                  );
                })}
            </div>
          </div>
        )}
      </div>
    </>
  );
}
