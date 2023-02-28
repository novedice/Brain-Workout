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
import '../assets/Blue-Fire-PNG.png';
import '../assets/fire.png';

export function StatisticPage() {
  const { loggedIn } = useTypeSelector((state) => state.loggedInInfo);
  const user = useTypeSelector((state) => state.userInfo);
  const [orderedRes, setOrderedRes] = useState<IOrderedArray[]>([]);
  const [streaks, setStreaks] = useState([0, 0]);
  const [curLead, setCurLead] = useState<
    { game: string; gameID: number; gameImg: string; leaders: ILeader[] }[]
  >([]);
  const dispatch = useAppDispatch();

  const reciveResults = async () => {
    const response = await getUserResults();
    if (response) {
      dispatch({ payload: response, type: UPDATE_ALL_RESULTS });
      setOrderedRes(resultsForStatistic(response));
      setStreaks(findStreaks(findActiveDays(response)));
    }
  };
  const leaders = async () => {
    const resLeaders: {
      game: string;
      gameID: number;
      gameImg: string;
      leaders: ILeader[];
    }[] = [];
    for (let i = 0; i < allGames.length; i++) {
      const leadResp = await getLeaders(allGames[i].id);
      if (leadResp) {
        resLeaders.push({
          game: allGames[i].path,
          gameID: allGames[i].id,
          leaders: leadResp,
          gameImg: allGames[i].srcEn as string,
        });
      }
    }
    setCurLead(resLeaders);
  };

  useEffect(() => {
    if (loggedIn) {
      reciveResults();
      leaders();
    }
  }, [loggedIn]);

  // useEffect(() => {
  //   if (loggedIn) {
  //     reciveResults();
  //     leaders();
  //   }
  // }, []);

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
                <p className="upper-case h2-game">
                  <FormattedMessage id="name" />: {user.nickname}
                </p>
                <div className="streak-wrap">
                  <p className="text-cursive streak">
                    <FormattedMessage
                      id="your_best_streak"
                      values={{ count: streaks[1] }}
                    />
                  </p>
                  <img className=" w-[50px]" src="Blue-Fire-PNG.png"></img>
                </div>
                <div className="streak-wrap">
                  <p className="text-cursive streak">
                    <FormattedMessage
                      id="your_streak"
                      values={{ count: streaks[0] }}
                    />
                  </p>
                  <img className="max-h-5 w-[17px]" src="fire.png"></img>
                </div>
              </div>
              {orderedRes
                .sort((a, b) => b.results.length - a.results.length)
                .map((gameResults) => {
                  return (
                    <section
                      key={gameResults.gameId}
                      className="statistic-block"
                    >
                      <div className="h2-game">
                        <img
                          className="small-img-game"
                          src={`${
                            allGames.filter(
                              (game) => game.id === gameResults.gameId
                            )[0].srcEn
                          }`}
                          alt={`${gameResults.gameId}`}
                        />
                        <p className="upper-case text-xl">
                          {gameResults.gameName}
                        </p>
                      </div>
                      <div className="best-results">
                        <div>
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
                      </div>
                      <div className="game-statistic">
                        {gameResults.results.length !== 0 && (
                          <div className="graphics">
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
                                <th className="leaders-header" colSpan={6}>
                                  <FormattedMessage id="best_results" />
                                </th>
                              </tr>
                            </thead>
                            <tbody>
                              {curLead?.length
                                ? curLead
                                    ?.filter(
                                      (gamelead) =>
                                        gamelead?.gameID === gameResults.gameId
                                    )[0]
                                    ?.leaders?.filter((lead, id) => id < 8)
                                    .sort((a, b) =>
                                      gameResults.gameId === 1 ||
                                      gameResults.gameId === 11
                                        ? a.value - b.value
                                        : b.value - a.value
                                    )
                                    .map((leader, index) => (
                                      <React.Fragment key={index}>
                                        <tr>
                                          <td className="td-in-leaders position">
                                            {index + 1}
                                          </td>
                                          <td
                                            className="td-in-leaders leader-name"
                                            colSpan={3}
                                          >
                                            {leader.nickname
                                              ? leader.nickname
                                              : 'no result yet...'}
                                          </td>
                                          <td
                                            className="td-in-leaders leader-score"
                                            colSpan={2}
                                          >
                                            {leader.value
                                              ? leader.value
                                              : '000'}
                                          </td>
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
