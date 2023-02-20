import React from 'react';
import { FormattedMessage } from 'react-intl';
import '../../../assets/speed-match-game/pause.jpeg';
import '../../../assets/speed-match-game/play.png';

interface IButtonPause {
  paused: boolean;
  setPaused: React.Dispatch<React.SetStateAction<boolean>>;
}

export const ButtonPause = ({ paused, setPaused }: IButtonPause) => {
  return (
    <>
      <button
        className="mr-3 flex h-[50px] w-[150px] items-center justify-around self-center rounded-lg border-8 border-blue-300  bg-gray-200 align-middle"
        onClick={() => setPaused(!paused)}
      >
        {paused ? (
          <FormattedMessage id="play" />
        ) : (
          <FormattedMessage id="pause" />
        )}
        <img
          className="h-[34px] w-[34px] bg-blue-300"
          src={paused ? 'play.png' : 'pause.jpeg'}
        ></img>
      </button>
    </>
  );
};
