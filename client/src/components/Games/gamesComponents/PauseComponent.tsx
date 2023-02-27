// import { ButtonStart } from "./ButtonStart";

import React from 'react';
import { StatusGameType } from '../../../types/types';
import { ButtonPause } from './ButtonPause';
// import { ButtonStart } from './ButtonStart';
import { ButtonStartAgain } from './ButtonStartAgain';
import './PauseComponent.css';

interface IGamePausedProps {
  // paused: boolean;
  setStatusGame: React.Dispatch<React.SetStateAction<StatusGameType>>;
  statusGame: StatusGameType;
  // started: boolean;
  // setStarted: React.Dispatch<React.SetStateAction<boolean>>;
  // setPaused: React.Dispatch<React.SetStateAction<boolean>>;
  startGame: () => void;
}

export const GamePaused = ({
  // paused,
  setStatusGame,
  statusGame,
  // setPaused,
  // started,
  // setStarted,
  startGame,
}: IGamePausedProps) => {
  return (
    <>
      <div className="pause-wrap">
        <ButtonPause statusGame={statusGame} setStatusGame={setStatusGame} />
        <ButtonStartAgain
          // setPaused={setPaused}
          // setStarted={setStarted}
          setStatusGame={setStatusGame}
          startGame={startGame}
        />
      </div>
    </>
  );
};
