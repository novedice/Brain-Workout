import React from 'react';
import { FormattedMessage } from 'react-intl';
import { StatusGameType } from '../../../types/types';

interface IButtonStartAgainProps {
  // started: boolean;
  // setStarted: React.Dispatch<React.SetStateAction<boolean>>;
  // statusGame: StatusGameType;
  setStatusGame: React.Dispatch<React.SetStateAction<StatusGameType>>;
  startGame: () => void;
  // paused: boolean;
  // setPaused: React.Dispatch<React.SetStateAction<boolean>>;
}

export const ButtonStartAgain = ({
  setStatusGame,
  // statusGame,
  startGame,
}: // setPaused,
// paused,
IButtonStartAgainProps) => {
  return (
    <>
      <button
        className="mr-3 h-[50px] w-[150px] self-center rounded-lg border-8 border-blue-300 bg-gray-200"
        onClick={() => {
          setStatusGame('Started');
          // setStarted(true);
          // setPaused(false);
          startGame();
        }}
      >
        <FormattedMessage id="start_again" />
      </button>
    </>
  );
};
