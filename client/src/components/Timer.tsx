// import { useState } from 'react';

import { FormattedMessage } from 'react-intl';
import { StatusGameType } from '../types/types';

interface ITimerProps {
  seconds: number;
  // started: boolean;
  // finished: boolean;
  statusGame: StatusGameType;
  setStatusGame: React.Dispatch<React.SetStateAction<StatusGameType>>;
  // setFinished: React.Dispatch<React.SetStateAction<boolean>>;
  // setStarted: React.Dispatch<React.SetStateAction<boolean>>;
  setSeconds: React.Dispatch<React.SetStateAction<number>>;
  // paused: boolean;
}

export const Timer = ({
  seconds,
  statusGame,
  setStatusGame,
  // started,
  // finished,
  // setFinished,
  // setStarted,
  // paused,
  setSeconds,
}: ITimerProps) => {
  setTimeout(() => {
    if (seconds > 0 && statusGame === 'Started') {
      setSeconds(seconds - 1);
    }
    if (seconds <= 1 && statusGame === 'Started') {
      setStatusGame('Finished');
      // setFinished(true);
      // setStarted(false);
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
