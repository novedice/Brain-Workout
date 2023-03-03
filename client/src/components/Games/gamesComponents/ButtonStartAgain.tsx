import React from 'react';
import { FormattedMessage } from 'react-intl';
import { StatusGameType } from '../../../types/types';

interface IButtonStartAgainProps {
  setStatusGame: React.Dispatch<React.SetStateAction<StatusGameType>>;
  startGame: () => void;
}

export const ButtonStartAgain = ({
  setStatusGame,
  startGame,
}: IButtonStartAgainProps) => {
  return (
    <>
      <button
        className="mr-3 h-[50px] w-[150px] self-center rounded-lg border-8 bg-gray-200"
        onClick={() => {
          setStatusGame('Started');
          startGame();
        }}
      >
        <FormattedMessage id="start_again" />
      </button>
    </>
  );
};
