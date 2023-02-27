import { SetStateAction, useEffect } from 'react';
import { FormattedMessage } from 'react-intl';
import { createResult } from '../../../api/result-requerests';
import { ADD_RESULT } from '../../../constants';
import { useAppDispatch } from '../../../hooks/useTypeSelector';
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

  // const reciveResults = async () => {
  //   const response = await getUserResults();
  //   if (response) {
  //     dispatch({ payload: response, type: UPDATE_ALL_RESULTS });
  //     setOrderedRes(resultsForStatistic(response));
  //     setStreaks(findStreaks(findActiveDays(response)));
  //   }
  // };

  const result = async () => {
    if (score !== 0 && statusGame === 'Finished') {
      const res = await createResult({ gameId: gameID, value: score });
      if (res) {
        console.log('res', res);
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
        <div>
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
          <table className="result-table">
            <thead className="result-table-head">
              <tr>
                <th className="leaders-header" colSpan={6}>
                  <FormattedMessage id="your_best_results" />
                </th>
              </tr>
            </thead>
            <tbody>
              {/* {curLead?.length
                ? curLead
                    .filter(
                      (gamelead) => gamelead.gameID === gameResults.gameId
                    )[0]
                    .leaders?.sort((a, b) =>
                      gameResults.gameId === 1 || gameResults.gameId === 11
                        ? a.value - b.value
                        : b.value - a.value
                    )
                    .map((leader, index) => (
                      <React.Fragment key={index}>
                        <tr>
                          <td className="td-in-leaders position">
                            {index + 1}
                          </td>
                          <td className="td-in-leaders leader-name" colSpan={3}>
                            {leader.nickname}
                          </td>
                          <td
                            className="td-in-leaders leader-score"
                            colSpan={2}
                          >
                            {leader.value}
                          </td>
                        </tr>
                      </React.Fragment>
                    ))
                : null} */}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};
