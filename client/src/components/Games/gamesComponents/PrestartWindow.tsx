import React from 'react';
import { FormattedMessage } from 'react-intl';
import { StatusGameType } from '../../../types/types';
import { ButtonStart } from './ButtonStart';
import './prestart.css';

interface IPrestartWindowProps {
  gameName: string;
  statusGame: StatusGameType;
  setStatusGame: React.Dispatch<React.SetStateAction<StatusGameType>>;
  startGame: () => void;
  gameDescription: string;
  setHowToPlay?: React.Dispatch<React.SetStateAction<boolean>>;
  gameImg?: string;
}

export const PrestartWindow = ({
  gameName,
  statusGame,
  setStatusGame,
  startGame,
  gameDescription,
  setHowToPlay,
  gameImg,
}: IPrestartWindowProps) => {
  return (
    <>
      <div className="prestart-container">
        <div className="name-of-the-game">
          <FormattedMessage id={gameName} />
        </div>
        {gameImg && <img src={`${gameImg}`}></img>}
        <div className="game-description">
          <FormattedMessage id={gameDescription} />
          {
            'train your task-switching ability by shifting focus between where the leaves point and how they move.'
          }
        </div>
        <div className="buttons-prestart">
          {setHowToPlay && (
            <button
              className="how-to-play-button"
              onClick={() => {
                setHowToPlay(true);
              }}
            >
              How to play
            </button>
          )}
          <ButtonStart
            startGame={startGame}
            setStatusGame={setStatusGame}
            statusGame={statusGame}
          />
        </div>
      </div>
    </>
  );
};
