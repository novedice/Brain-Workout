// import { useState } from 'react';

import { FormattedMessage } from 'react-intl';

interface ITimerProps {
  seconds: number;
  started: boolean;
  finished: boolean;
  setFinished: React.Dispatch<React.SetStateAction<boolean>>;
  setStarted: React.Dispatch<React.SetStateAction<boolean>>;
  setSeconds: React.Dispatch<React.SetStateAction<number>>;

  paused: boolean;
}

export const Timer = ({
  seconds,
  started,
  finished,
  setFinished,
  setStarted,
  paused,
  setSeconds,
}: ITimerProps) => {
  setTimeout(() => {
    if (seconds > 0 && started && !paused) {
      setSeconds(seconds - 1);
    }
    if (seconds <= 1 && started && !finished) {
      setFinished(true);
      setStarted(false);
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
