import React from 'react';
import { FormattedMessage } from 'react-intl';
import '../../../assets/speed-match-game/pause.jpeg';
import '../../../assets/speed-match-game/play.png';
import { StatusGameType } from '../../../types/types';

interface IButtonPause {
  statusGame: StatusGameType;
  setStatusGame: React.Dispatch<React.SetStateAction<StatusGameType>>;
}

export const ButtonPause = ({ statusGame, setStatusGame }: IButtonPause) => {
  return (
    <>
      <button
        className="mr-3 flex h-[40px] w-[150px] items-center justify-around self-center rounded-lg  bg-gray-300 align-middle duration-300 hover:bg-red-200"
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
