import { FormattedMessage } from 'react-intl';
import { StatusGameType } from '../types/types';

interface ITimerProps {
  seconds: number;
  statusGame: StatusGameType;
  setStatusGame: React.Dispatch<React.SetStateAction<StatusGameType>>;
  setSeconds: React.Dispatch<React.SetStateAction<number>>;
}

export const Timer = ({
  seconds,
  statusGame,
  setStatusGame,
  setSeconds,
}: ITimerProps) => {
  setTimeout(() => {
    if (seconds > 0 && statusGame === 'Started') {
      setSeconds(seconds - 1);
    }
    if (seconds <= 1 && statusGame === 'Started') {
      setStatusGame('Finished');
    }
  }, 1000);

  return (
    <>
      <p>
        <FormattedMessage id="time_left" values={{ n: seconds }} />
      </p>
    </>
  );
};
