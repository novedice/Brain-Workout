import React, { useEffect, useState } from 'react';
import { FormattedMessage } from 'react-intl';
import { useTypeSelector } from '../../../hooks/useTypeSelector';
import { LOCALES } from '../../../i18n/locales';
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
  gameImgRus?: string;
  gameImgEn?: string;
}

export const PrestartWindow = ({
  gameName,
  statusGame,
  setStatusGame,
  startGame,
  gameDescription,
  setHowToPlay,
  gameImgRus,
  gameImgEn,
}: IPrestartWindowProps) => {
  const [currentImg, setCurrentImg] = useState(gameImgEn);
  const user = useTypeSelector((state) => state.userInfo);

  useEffect(() => {
    setCurrentImg(user.lang === LOCALES.ENGLISH ? gameImgEn : gameImgRus);
  }, [user.lang]);

  return (
    <>
      <div className="prestart-container">
        <div className="name-of-the-game">
          <FormattedMessage id={gameName} />
        </div>
        {currentImg && (
          <img className="prestart-image" src={`${currentImg}`}></img>
        )}
        <div className="game-description">
          <FormattedMessage id={gameDescription} />
          {/* {
            'train your task-switching ability by shifting focus between where the leaves point and how they move.'
          } */}
        </div>
        <div className="buttons-prestart">
          {setHowToPlay && (
            <button
              className="how-to-play-button duration-300 hover:bg-red-200"
              onClick={() => {
                setHowToPlay(true);
              }}
            >
              <FormattedMessage id="how_to_play" />
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
