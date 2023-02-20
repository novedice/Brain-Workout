import { SetStateAction, useEffect } from 'react';
import { FormattedMessage } from 'react-intl';
import { createResult } from '../../../api/result-requerests';
import { ADD_RESULT } from '../../../constants';
import { useAppDispatch } from '../../../hooks/useTypeSelector';
// import { writeResults } from '../gameFunctions/finishGame';
// import { createResult } from '../../../api/result-requerests';
// import { ADD_RESULT } from '../../../constants';
// import {
//   useAppDispatch,
//   useTypeSelector,
// } from '../../../hooks/useTypeSelector';
// import { IResults } from '../../../types/interfaces';
import { ButtonStart } from './ButtonStart';

interface IFinishGameTableProps {
  score: number;
  rightAnswers: number;
  totalAnswers: number;
  speed: number;
  started: boolean;
  setStarted: React.Dispatch<SetStateAction<boolean>>;
  startGame: () => void;
  gameName: string;
  gameID: number;
  finished: boolean;
}

export const FinishGameTable = ({
  score,
  rightAnswers,
  totalAnswers,
  speed,
  started,
  setStarted,
  startGame,
  gameID,
  gameName,
  finished,
}: IFinishGameTableProps) => {
  const dispatch = useAppDispatch();

  const result = async () => {
    if (score !== 0 && finished) {
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
    result();
  }, [finished]);

  return (
    <>
      <div className="flex h-full w-full flex-col items-center justify-center bg-gray-300">
        <p className="upper-case">
          <FormattedMessage id={gameName} />
        </p>
        <p>
          <FormattedMessage id="score" values={{ n: score }} />
        </p>
        {rightAnswers !== 0 && (
          <>
            <p>
              <FormattedMessage
                id="correct_answers"
                values={{ n: rightAnswers, m: totalAnswers }}
              />
            </p>
            <p>
              <FormattedMessage
                id="accuracy"
                values={{
                  n: ((rightAnswers * 100) / totalAnswers).toFixed(0),
                }}
              />
            </p>
          </>
        )}
        <p>
          {speed !== 0 && (
            <FormattedMessage
              id="average_speed"
              values={{
                n: (speed / totalAnswers).toFixed(0),
              }}
            />
          )}
        </p>
        {/* <button onClick={handleResults}>Make results</button> */}
        <ButtonStart
          startGame={startGame}
          setStarted={setStarted}
          started={started}
        />
      </div>
    </>
  );
};
