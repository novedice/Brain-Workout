import React from 'react';
import { FormattedMessage } from 'react-intl';
import '../../../assets/speed-match-game/pause.jpeg';
import '../../../assets/speed-match-game/play.png';
import { StatusGameType } from '../../../types/types';

interface IButtonPause {
  statusGame: StatusGameType;
  setStatusGame: React.Dispatch<React.SetStateAction<StatusGameType>>;
  // paused: boolean;
  // setPaused: React.Dispatch<React.SetStateAction<boolean>>;
}

export const ButtonPause = ({ statusGame, setStatusGame }: IButtonPause) => {
  return (
    <>
      <button
        className="mr-3 flex h-[50px] w-[150px] items-center justify-around self-center rounded-lg border-8 border-blue-300  bg-gray-200 align-middle"
        onClick={() =>
          setStatusGame(statusGame === 'Started' ? 'Paused' : 'Started')
        }
      >
        {statusGame !== 'Paused' ? (
          <FormattedMessage id="pause" />
        ) : (
          <FormattedMessage id="play" />
        )}
        <img
          className="h-[34px] w-[34px] bg-blue-300"
          src={statusGame === 'Paused' ? 'play.png' : 'pause.jpeg'}
        ></img>
      </button>
    </>
  );
};
