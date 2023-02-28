import React from 'react';
import { SetStateAction, useEffect, useState } from 'react';
import { FormattedMessage } from 'react-intl';
import { createResult, getUserResults } from '../../../api/result-requerests';
import { ADD_RESULT } from '../../../constants';
import { resultsForStatistic } from '../../../functions/resultsForStatistic';
import { useAppDispatch } from '../../../hooks/useTypeSelector';
import { IOrderedArray } from '../../../types/interfaces';
import { StatusGameType } from '../../../types/types';
import { ButtonStart } from './ButtonStart';
import './finishGameTable.css';

interface IFinishGameTableProps {
  score: number;
  rightAnswers: number;
  totalAnswers: number;
  speed: number;
  statusGame: StatusGameType;
  setStatusGame: React.Dispatch<SetStateAction<StatusGameType>>;
  startGame: () => void;
  gameName: string;
  gameID: number;
  resultsName?: string;
}

export const FinishGameTable = ({
  score,
  rightAnswers,
  totalAnswers,
  speed,
  statusGame,
  setStatusGame,
  startGame,
  gameID,
  gameName,
  resultsName,
}: IFinishGameTableProps) => {
  const dispatch = useAppDispatch();
  const [gameResults, setGameResults] = useState<IOrderedArray[]>([]);
  const [resDate, setResDate] = useState('');

  const result = async () => {
    if (score !== 0 && statusGame === 'Finished') {
      const res = await createResult({ gameId: gameID, value: score });
      if (res) {
        setResDate(res.createdAt);
        dispatch({
          payload: [
            {
              gameId: res.gameId,
              value: res.value,
              createdAt: res.createdAt,
              userId: res.userId,
              id: res.id,
            },
          ],
          type: ADD_RESULT,
        });
      }
      const resultsResponse = await getUserResults();
      if (resultsResponse) {
        setGameResults(resultsForStatistic(resultsResponse));
      }
      let saveScore: number = 0;
      const localScore = localStorage.getItem(gameName);
      if (localScore) {
        if (score > Number(localScore)) {
          saveScore = score;
        } else {
          saveScore = Number(localScore);
        }
      }
      localStorage.setItem(gameName, String(saveScore));
      return res;
    }
  };
  useEffect(() => {
    if (statusGame === 'Finished') {
      result();
    }
  }, [statusGame]);

  return (
    <>
      <div
        className="finish-game"
        style={{ background: 'rgb(59 130 246 / 0.5)' }}
      >
        <div className="result-box">
          <p className="upper-case finish-game-name">
            <FormattedMessage id={gameName} />
          </p>
          <p className="finish-game-score">
            <FormattedMessage
              id={`${resultsName ? resultsName : 'score'}`}
              values={{ n: score }}
            />
          </p>
          {rightAnswers !== 0 && (
            <>
              <p className="finish-game-score">
                <FormattedMessage
                  id="correct_answers"
                  values={{ n: rightAnswers, m: totalAnswers }}
                />
              </p>
              <p className="finish-game-score">
                <FormattedMessage
                  id="accuracy"
                  values={{
                    n: ((rightAnswers * 100) / totalAnswers).toFixed(0),
                  }}
                />
              </p>
            </>
          )}
          <p className="finish-game-score">
            {speed !== 0 && (
              <FormattedMessage
                id="average_speed"
                values={{
                  n: (speed / totalAnswers).toFixed(0),
                }}
              />
            )}
          </p>
          <ButtonStart
            startGame={startGame}
            setStatusGame={setStatusGame}
            statusGame={statusGame}
          />
        </div>
        <div>
          <table className="finish-result-table">
            <thead className="result-table-head">
              <tr>
                <th className="leaders-header" colSpan={8}>
                  <FormattedMessage id="your_best_results" />
                </th>
              </tr>
            </thead>
            <tbody>
              {gameResults?.length
                ? gameResults
                    .filter((gameResult) => gameResult.gameId === gameID)[0]
                    .results?.sort((a, b) =>
                      gameID === 1 || gameID === 11
                        ? a.value - b.value
                        : b.value - a.value
                    )
                    .map((gameRes, index) => (
                      <React.Fragment key={index}>
                        <tr
                          className={`${
                            gameRes.value === score &&
                            gameRes.createdAt === resDate
                              ? 'result-now'
                              : ''
                          }`}
                        >
                          <td className="td-in-leaders position" colSpan={2}>
                            {index + 1}
                          </td>
                          <td
                            className="td-in-leaders leader-score"
                            colSpan={4}
                          >
                            {gameRes.value}
                          </td>
                          <td className="td-in-leaders leader-time" colSpan={2}>
                            {new Date(gameRes.createdAt).toDateString()}
                          </td>
                        </tr>
                      </React.Fragment>
                    ))
                : null}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};
