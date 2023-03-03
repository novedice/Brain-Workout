import React from 'react';
import { StatusGameType } from '../../../types/types';
import { ButtonPause } from './ButtonPause';
import { ButtonStartAgain } from './ButtonStartAgain';
import './PauseComponent.css';

interface IGamePausedProps {
  setStatusGame: React.Dispatch<React.SetStateAction<StatusGameType>>;
  statusGame: StatusGameType;
  startGame: () => void;
}

export const GamePaused = ({
  setStatusGame,
  statusGame,
  startGame,
}: IGamePausedProps) => {
  return (
    <>
      <div className="pause-wrap">
        <ButtonPause statusGame={statusGame} setStatusGame={setStatusGame} />
        <ButtonStartAgain setStatusGame={setStatusGame} startGame={startGame} />
      </div>
    </>
  );
};
