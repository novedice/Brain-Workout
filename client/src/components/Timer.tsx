// import { useState } from 'react';

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
  // const [secondsLeft, setSecondsLeft] = useState(seconds);

  setTimeout(() => {
    if (seconds > 0 && started && !paused) {
      // setSecondsLeft(secondsLeft - 1);
      setSeconds(seconds - 1);
    }
    if (seconds <= 1 && started && !finished) {
      setFinished(true);
      setStarted(false);
    }
  }, 1000);

  return (
    <>
      <p>{`Time left: ${seconds}`}</p>
    </>
  );
};
