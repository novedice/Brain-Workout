// import { ButtonStart } from "./ButtonStart";

import React from 'react';
import { ButtonPause } from './ButtonPause';
// import { ButtonStart } from './ButtonStart';
import { ButtonStartAgain } from './ButtonStartAgain';
import './PauseComponent.css';

interface IGamePausedProps {
  paused: boolean;
  // started: boolean;
  setStarted: React.Dispatch<React.SetStateAction<boolean>>;
  setPaused: React.Dispatch<React.SetStateAction<boolean>>;
  startGame: () => void;
}

export const GamePaused = ({
  paused,
  setPaused,
  // started,
  setStarted,
  startGame,
}: IGamePausedProps) => {
  return (
    <>
      <div className="pause-wrap">
        <ButtonPause paused={paused} setPaused={setPaused} />
        <ButtonStartAgain
          setPaused={setPaused}
          setStarted={setStarted}
          startGame={startGame}
        />
      </div>
    </>
  );
};
