import { SetStateAction } from 'react';
import { FormattedMessage } from 'react-intl';
import { ButtonStart } from './ButtonStart';

interface IFinishGameTableProps {
  score: number;
  rightAnswers: number;
  wrongAnswers: number;
  speed: number;
  started: boolean;
  setStarted: React.Dispatch<SetStateAction<boolean>>;
  startGame: () => void;
  gameID: string;
}

export const FinishGameTable = ({
  score,
  rightAnswers,
  wrongAnswers,
  speed,
  started,
  setStarted,
  startGame,
  gameID,
}: IFinishGameTableProps) => {
  return (
    <>
      <div className="flex h-full w-full flex-col items-center justify-center bg-gray-300">
        <p className="upper-case">
          <FormattedMessage id={gameID} />
        </p>
        <p>
          <FormattedMessage id="score" values={{ n: score }} />
        </p>
        <p>
          <FormattedMessage
            id="correct_answers"
            values={{ n: rightAnswers, m: rightAnswers + wrongAnswers }}
          />
        </p>
        <p>
          <FormattedMessage
            id="accuracy"
            values={{
              n: ((rightAnswers * 100) / (rightAnswers + wrongAnswers)).toFixed(
                0
              ),
            }}
          />
        </p>
        <p>
          {speed !== 0 && (
            <FormattedMessage
              id="average_speed"
              values={{
                n: (speed / (rightAnswers + wrongAnswers)).toFixed(0),
              }}
            />
          )}
        </p>
        <ButtonStart
          startGame={startGame}
          setStarted={setStarted}
          started={started}
        />
      </div>
    </>
  );
};
